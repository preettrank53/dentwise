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
    <div className="relative inline-flex flex-col items-center transition-transform duration-200 w-full max-w-[180px]">
      <div className="relative w-full">
        {isIdle && (
          <button 
            onClick={onStart}
            className="relative z-10 h-12 w-full rounded-[6px] bg-[#619BB6] flex items-center justify-center gap-2 hover:bg-[#4A7D96] shadow-sm transition-colors"
          >
            <Phone className="text-white h-4 w-4" />
            <span className="text-sm font-medium text-white">Start Call</span>
          </button>
        )}

        {isConnecting && (
          <button 
            disabled
            className="relative z-10 h-12 w-full rounded-[6px] bg-[#FEF9EE] border border-[#E8C87A] flex items-center justify-center gap-2 animate-pulse transition-all duration-200 cursor-not-allowed"
          >
            <Loader2 className="animate-spin text-[#B7791F] h-4 w-4" />
            <span className="text-sm font-medium text-[#B7791F]">Connecting...</span>
          </button>
        )}

        {isActive && (
          <button 
            onClick={onEnd}
            className="relative z-10 h-12 w-full rounded-[6px] bg-[#FDF2F2] border border-[#E8A09A] flex items-center justify-center gap-2 hover:bg-[#FBEAEA] transition-colors"
          >
            <PhoneOff className="text-[#C0392B] h-4 w-4" />
            <span className="text-sm font-medium text-[#C0392B]">End Call</span>
          </button>
        )}

        {isEnding && (
          <button 
            disabled
            className="relative z-10 h-12 w-full rounded-[6px] bg-[#F8FAFB] border border-[#D0E4EA] flex items-center justify-center gap-2 transition-all duration-200 cursor-not-allowed"
          >
            <Loader2 className="animate-spin text-[#7A9BAD] h-4 w-4" />
            <span className="text-sm font-medium text-[#7A9BAD]">Ending...</span>
          </button>
        )}
      </div>

      <div className="mt-2 text-center h-5">
        {isIdle && <span className="text-xs text-[#7A9BAD] font-medium">Ready to connect</span>}
        {isConnecting && <span className="text-xs text-[#B7791F] font-medium">Connecting to Riley</span>}
        {isActive && <span className="text-xs text-[#C0392B] font-medium">Call in progress</span>}
        {isEnding && <span className="text-xs text-[#7A9BAD] font-medium">Ending session</span>}
      </div>
    </div>
  )
}
