'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Vapi from '@vapi-ai/web'

export const CALL_STATUS = {
  IDLE: 'idle',
  CONNECTING: 'connecting', 
  ACTIVE: 'active',
  ENDING: 'ending',
}

export default function useVapi() {
  const [callStatus, setCallStatus] = useState(CALL_STATUS.IDLE)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isUserSpeaking, setIsUserSpeaking] = useState(false)
  const [transcript, setTranscript] = useState([])
  const [volumeLevel, setVolumeLevel] = useState(0)
  const [error, setError] = useState(null)

  const vapiRef = useRef(null)

  useEffect(() => {
    // 1. Create new Vapi instance
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY)
    vapiRef.current = vapi

    // 2. Define Event Handlers
    const onCallStart = () => {
      setCallStatus(CALL_STATUS.ACTIVE)
      setError(null)
    }

    const onCallEnd = () => {
      setCallStatus(CALL_STATUS.IDLE)
      setIsSpeaking(false)
      setIsUserSpeaking(false)
      setVolumeLevel(0)
    }

    const onSpeechStart = () => {
      setIsSpeaking(true)
    }

    const onSpeechEnd = () => {
      setIsSpeaking(false)
    }

    const onVolumeLevel = (volume) => {
      setVolumeLevel(volume)
    }

    const onMessage = (message) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        setTranscript((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            role: message.role,
            content: message.transcript,
          },
        ])
      }

      if (message.type === 'hang') {
        setCallStatus(CALL_STATUS.IDLE)
      }
    }

    const onError = (e) => {
      console.error('Vapi error:', e)
      setError(e.message || 'Something went wrong')
      setCallStatus(CALL_STATUS.IDLE)
    }

    // 3. Attach Event Listeners
    vapi.on('call-start', onCallStart)
    vapi.on('call-end', onCallEnd)
    vapi.on('speech-start', onSpeechStart)
    vapi.on('speech-end', onSpeechEnd)
    vapi.on('volume-level', onVolumeLevel)
    vapi.on('message', onMessage)
    vapi.on('error', onError)

    // 4. Cleanup on unmount
    return () => {
      vapi.off('call-start', onCallStart)
      vapi.off('call-end', onCallEnd)
      vapi.off('speech-start', onSpeechStart)
      vapi.off('speech-end', onSpeechEnd)
      vapi.off('volume-level', onVolumeLevel)
      vapi.off('message', onMessage)
      vapi.off('error', onError)

      vapi.stop()
      vapiRef.current = null
    }
  }, []) // Empty dependency triggers ONLY upon mount

  // ACTIONS

  const startCall = useCallback(async () => {
    if (callStatus !== CALL_STATUS.IDLE) {
      return
    }

    setCallStatus(CALL_STATUS.CONNECTING)
    setTranscript([])
    setError(null)

    try {
      await vapiRef.current.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID)
    } catch (err) {
      console.error(err)
      setError('Failed to start call. Please check your microphone.')
      setCallStatus(CALL_STATUS.IDLE)
    }
  }, [callStatus])

  const endCall = useCallback(() => {
    if (callStatus === CALL_STATUS.IDLE || callStatus === CALL_STATUS.ENDING) {
      return
    }

    setCallStatus(CALL_STATUS.ENDING)
    vapiRef.current?.stop()
  }, [callStatus])

  const clearTranscript = useCallback(() => {
    setTranscript([])
  }, [])

  return {
    callStatus,
    isSpeaking,
    isUserSpeaking,
    volumeLevel,
    transcript,
    error,
    startCall,
    endCall,
    clearTranscript,
    isIdle: callStatus === CALL_STATUS.IDLE,
    isConnecting: callStatus === CALL_STATUS.CONNECTING,
    isActive: callStatus === CALL_STATUS.ACTIVE,
    isEnding: callStatus === CALL_STATUS.ENDING,
  }
}
