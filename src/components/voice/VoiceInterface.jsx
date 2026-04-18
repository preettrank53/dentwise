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
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
      
      {/* Toast Notification (if injected text prompt used) */}
      {toastMessage && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-lg z-50 animate-fade-up">
          {toastMessage}
        </div>
      )}

      {/* LEFT COLUMN - RILEY PANEL */}
      <div className="flex flex-col gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col items-center gap-5">
          
          {/* Riley Profile Array */}
          <div className="flex flex-col items-center gap-3">
            <div className={`h-24 w-24 sm:h-28 sm:w-28 rounded-full flex items-center justify-center transition-all duration-300 ${isActive || isConnecting ? 'ring-4 ring-cyan-500/30' : 'ring-2 ring-gray-100'}`}>
              <div className="h-20 w-20 sm:h-24 sm:w-24 gradient-primary rounded-full flex items-center justify-center shadow-lg shadow-cyan-200">
                <span className="text-3xl sm:text-4xl font-bold text-white">R</span>
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900">{RILEY_INFO.name}</h2>
              <p className="text-sm text-gray-500">{RILEY_INFO.role}</p>
            </div>

            <div className="mt-1">
              {isActive || isConnecting ? (
                <span className="bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-1 text-xs font-medium">
                  ● Live
                </span>
              ) : (
                <span className="bg-gray-50 text-gray-500 border border-gray-200 rounded-full px-3 py-1 text-xs">
                  ○ Ready
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

            {/* ERROR DISPLAY */}
            {error && !isMicError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center w-full mt-4">
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  <AlertCircle className="text-red-500 h-4 w-4" />
                  <span className="text-sm text-red-600 font-medium">{error}</span>
                </div>
                <button 
                  onClick={startCall}
                  className="text-xs text-red-700 underline hover:text-red-800"
                >
                  Try again
                </button>
              </div>
            )}

            {/* MIC ERROR OVERLAY */}
            {error && isMicError && (
               <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center w-full mt-4 flex flex-col items-center gap-2">
                 <div className="h-10 w-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-1">
                   <MicOff className="h-5 w-5" />
                 </div>
                 <h4 className="font-semibold text-gray-900">Microphone Access Required</h4>
                 <p className="text-sm text-gray-600 mb-2">Please allow microphone access in your browser settings</p>
                 <span className="text-xs text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                   Click the lock icon in your browser address bar → Allow Microphone
                 </span>
               </div>
            )}
            
            {/* CALL STATS */}
            <div className={`mt-4 row flex items-center gap-4 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden mt-0'}`}>
               <div className="bg-gray-50 rounded-lg px-3 py-1 text-sm font-mono text-gray-600 flex items-center gap-2">
                 <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                 Live Call
               </div>
               <div className="bg-gray-50 rounded-lg px-3 py-1 text-sm font-mono text-gray-600 font-medium">
                 {formatTime(duration)}
               </div>
            </div>
          </div>
        </div>

        {/* BOTTOM TIPS CARD */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <h4 className="text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">Tips</h4>
          <ul className="text-xs text-gray-500 space-y-1.5 list-disc pl-4">
            <li>Speak clearly and naturally</li>
            <li>Ask about services or pricing</li>
            <li>Riley cannot book appointments</li>
          </ul>
        </div>
      </div>

      {/* RIGHT COLUMN - TRANSCRIPT PANEL */}
      <div className="flex flex-col gap-4">
        
        {/* TRANSCRIPT HEADER */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Live Transcript</span>
          </div>
          {transcript.length > 0 && (
            <span className="bg-gray-100 text-gray-500 text-xs font-medium rounded-full px-2.5 py-1 tracking-wide">
              {transcript.length} {transcript.length === 1 ? 'message' : 'messages'}
            </span>
          )}
        </div>

        <VoiceTranscript 
          transcript={transcript}
          isActive={isActive}
          onClear={clearTranscript}
        />

        {/* SUGGESTED QUESTIONS (Only when idle) */}
        {isIdle && (
          <div className="mt-2 opacity-0-initial animate-fade-up animation-delay-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Try asking Riley...</h4>
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
                  className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-600 hover:border-cyan-300 hover:text-cyan-700 hover:bg-cyan-50 cursor-pointer transition-all duration-150 text-left"
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
