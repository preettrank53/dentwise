'use client'

import React, { useState, useEffect, useRef } from 'react'
import useVapi, { CALL_STATUS } from '@/hooks/useVapi'
import VoiceWaveform from './VoiceWaveform'
import CallButton from './CallButton'
import VoiceTranscript from './VoiceTranscript'
import { RILEY_INFO } from '@/lib/vapiConfig'
import { AlertCircle, MessageSquare, MicOff } from 'lucide-react'
import { toast } from 'sonner'

export default function VoiceInterface() {
  const {
    callStatus,
    isSpeaking,
    isUserSpeaking,
    volumeLevel,
    transcript,
    error,
    startCall,
    endCall,
    clearTranscript,
    isIdle,
    isConnecting,
    isActive,
    isEnding,
  } = useVapi()

  const [duration, setDuration] = useState(0)
  const [toastMessage, setToastMessage] = useState(null)
  const prevStatusRef = useRef(callStatus)

  useEffect(() => {
    if (callStatus === CALL_STATUS.ACTIVE && prevStatusRef.current !== CALL_STATUS.ACTIVE) {
      toast.success('Connected to Riley', {
        description: 'Your AI dental assistant is ready',
        duration: 3000,
      })
    } else if (callStatus === CALL_STATUS.IDLE && prevStatusRef.current === CALL_STATUS.ACTIVE) {
      toast('Call ended', {
        description: 'Conversation complete',
        duration: 2000,
      })
    }
    prevStatusRef.current = callStatus
  }, [callStatus])

  useEffect(() => {
    if (error) {
      toast.error('Connection failed', {
        description: error,
        duration: 5000,
      })
    }
  }, [error])

  // Call duration array
  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1)
      }, 1000)
    } else {
      setDuration(0)
      if (interval) clearInterval(interval)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const handleSuggestedQuestion = (question) => {
    startCall()
    setToastMessage(`Call started! Now ask: "${question}"`)
    setTimeout(() => setToastMessage(null), 5000)
  }

  const isMicError = error && (error.toLowerCase().includes('microphone') || error.toLowerCase().includes('permission'))

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
      {toastMessage && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1A2832] text-white text-sm font-medium px-4 py-2 rounded-[6px] shadow-lg z-50 animate-fade-up">
          {toastMessage}
        </div>
      )}

      <div className="flex flex-col gap-6">
        <div className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-6 sm:p-8 flex flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-3">
            <div className={`h-24 w-24 sm:h-28 sm:w-28 rounded-[12px] bg-[#F8FAFB] border border-[#E2EDF2] flex items-center justify-center transition-all duration-300 ${isActive || isConnecting ? 'ring-2 ring-[#BAD7E1]' : ''}`}>
              <div className="h-16 w-16 sm:h-20 sm:w-20 bg-[#EDF5F8] border border-[#BAD7E1] rounded-[12px] flex items-center justify-center shadow-sm">
                <span className="text-2xl sm:text-3xl font-semibold text-[#4A7D96]">R</span>
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-xl font-semibold text-[#1A2832]">{RILEY_INFO.name}</h2>
              <p className="text-sm text-[#7A9BAD]">{RILEY_INFO.role}</p>
            </div>

            <div className="mt-1">
              {isActive || isConnecting ? (
                <span className="bg-[#F0FAF4] text-[#2D7A4F] border border-[#A8D5B5] rounded-[4px] px-2 py-0.5 text-xs font-medium uppercase tracking-wide">
                  Live
                </span>
              ) : (
                <span className="bg-[#F8FAFB] text-[#7A9BAD] border border-[#E2EDF2] rounded-[4px] px-2 py-0.5 text-xs font-medium uppercase tracking-wide">
                  Ready
                </span>
              )}
            </div>
          </div>

          <VoiceWaveform 
            isSpeaking={isSpeaking}
            isUserSpeaking={isUserSpeaking}
            volumeLevel={volumeLevel}
            callStatus={callStatus}
          />

          <div className="mt-2 flex flex-col items-center w-full">
            <CallButton 
              callStatus={callStatus}
              onStart={startCall}
              onEnd={endCall}
              isSpeaking={isSpeaking}
            />

            {error && !isMicError && (
              <div className="bg-[#FDF2F2] border border-[#E8A09A] rounded-[8px] p-3 text-center w-full mt-4">
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  <AlertCircle className="text-[#C0392B] h-4 w-4" />
                  <span className="text-sm text-[#C0392B] font-medium">{error}</span>
                </div>
                <button 
                  onClick={startCall}
                  className="text-xs text-[#C0392B] underline hover:opacity-80"
                >
                  Try again
                </button>
              </div>
            )}

            {error && isMicError && (
               <div className="bg-[#FDF2F2] border border-[#E8A09A] rounded-[8px] p-4 text-center w-full mt-4 flex flex-col items-center gap-2">
                 <div className="h-10 w-10 bg-[#FBEAEA] text-[#C0392B] rounded-[8px] flex items-center justify-center mb-1">
                   <MicOff className="h-5 w-5" />
                 </div>
                 <h4 className="font-semibold text-[#1A2832]">Microphone Access Required</h4>
                 <p className="text-sm text-[#4A6572] mb-2">Please allow microphone access in your browser settings</p>
                 <span className="text-xs text-[#7A9BAD] bg-white px-3 py-1.5 rounded-[6px] border border-[#E2EDF2]">
                   Click the lock icon in your browser address bar → Allow Microphone
                 </span>
               </div>
            )}
            
            <div className={`mt-4 row flex items-center gap-4 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden mt-0'}`}>
               <div className="bg-[#F8FAFB] border border-[#E2EDF2] rounded-[6px] px-3 py-1 text-sm font-mono text-[#4A6572] flex items-center gap-2">
                 <span className="h-2 w-2 rounded-[4px] bg-[#2D7A4F] animate-pulse" />
                 Live Call
               </div>
               <div className="bg-[#F8FAFB] border border-[#E2EDF2] rounded-[6px] px-3 py-1 text-sm font-mono text-[#4A6572] font-medium">
                 {formatTime(duration)}
               </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[12px] border border-[#E2EDF2] p-4">
          <h4 className="text-xs font-medium text-[#4A6572] mb-2 uppercase tracking-wide">Tips</h4>
          <ul className="text-xs text-[#7A9BAD] space-y-1.5 list-disc pl-4">
            <li>Speak clearly and naturally</li>
            <li>Ask about services or pricing</li>
            <li>Riley cannot book appointments</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-[#7A9BAD]" />
            <span className="text-sm font-medium text-[#4A6572]">Live Transcript</span>
          </div>
          {transcript.length > 0 && (
            <span className="bg-[#F8FAFB] border border-[#E2EDF2] text-[#7A9BAD] text-xs font-medium rounded-[4px] px-2 py-0.5 tracking-wide">
              {transcript.length} {transcript.length === 1 ? 'message' : 'messages'}
            </span>
          )}
        </div>

        <VoiceTranscript 
          transcript={transcript}
          isActive={isActive}
          onClear={clearTranscript}
        />

        {isIdle && (
          <div className="mt-2 opacity-0-initial animate-fade-up animation-delay-100">
            <h4 className="text-sm font-medium text-[#4A6572] mb-3">Try asking Riley...</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "What services do you offer?",
                "How much does whitening cost?",
                "What should I expect at my first visit?",
                "Do you offer payment plans?"
              ].map((question, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="bg-white border border-[#D0E4EA] rounded-[6px] px-4 py-2 text-sm text-[#4A6572] hover:border-[#BAD7E1] hover:bg-[#EDF5F8] cursor-pointer transition-colors duration-150 text-left"
                >
                  "{question}"
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
