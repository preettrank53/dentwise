'use client'

import React from 'react'
import { Phone, PhoneOff, Loader2 } from 'lucide-react'

export default function CallButton({ 
  callStatus, 
  onStart, 
  onEnd, 
  isSpeaking 
}) {
  const isIdle = callStatus === 'idle'
  const isConnecting = callStatus === 'connecting'
  const isActive = callStatus === 'active'
  const isEnding = callStatus === 'ending'

  return (
    <div className="relative inline-flex flex-col items-center transition-transform duration-200">
      <div className="relative">
        
        {isActive && (
          <>
            <div className="absolute inset-0 rounded-full bg-red-400/20 animate-ripple animation-delay-0 pointer-events-none" />
            <div className="absolute inset-0 rounded-full bg-red-400/20 animate-ripple animation-delay-300 pointer-events-none" />
            <div className="absolute inset-0 rounded-full bg-red-400/20 animate-ripple animation-delay-500 pointer-events-none" />
          </>
        )}
        
        {isIdle && (
          <button 
            onClick={onStart}
            className="relative z-10 h-16 w-16 rounded-full gradient-primary flex items-center justify-center hover:scale-105 shadow-lg hover:shadow-cyan-200 transition-all duration-200"
          >
            <Phone className="text-white h-6 w-6" />
          </button>
        )}

        {isConnecting && (
          <button 
            disabled
            className="relative z-10 h-16 w-16 rounded-full bg-amber-500 flex items-center justify-center animate-pulse transition-all duration-200 cursor-not-allowed"
          >
            <Loader2 className="animate-spin text-white h-6 w-6" />
          </button>
        )}

        {isActive && (
          <button 
            onClick={onEnd}
            className="relative z-10 h-16 w-16 rounded-full bg-red-500 flex items-center justify-center hover:scale-105 shadow-lg hover:shadow-red-200 transition-all duration-200"
          >
            <PhoneOff className="text-white h-6 w-6" />
          </button>
        )}

        {isEnding && (
          <button 
            disabled
            className="relative z-10 h-16 w-16 rounded-full bg-gray-400 flex items-center justify-center transition-all duration-200 cursor-not-allowed"
          >
            <Loader2 className="animate-spin text-white h-6 w-6" />
          </button>
        )}
      </div>

      <div className="mt-2 text-center h-5">
        {isIdle && <span className="text-sm text-gray-600 font-medium">Talk to Riley</span>}
        {isConnecting && <span className="text-sm text-gray-600 font-medium">Connecting...</span>}
        {isActive && <span className="text-sm text-red-600 font-medium">End Call</span>}
        {isEnding && <span className="text-sm text-gray-500 font-medium">Ending...</span>}
      </div>
    </div>
  )
}
