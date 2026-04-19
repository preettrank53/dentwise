'use client'

import React, { useEffect, useRef } from 'react'
import { MessageSquare, Trash2 } from 'lucide-react'

export default function VoiceTranscript({ 
  transcript = [], 
  isActive, 
  onClear 
}) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [transcript])

  const isRileyTyping = isActive && transcript.length > 0 && transcript[transcript.length - 1].role === 'user'

  return (
    <div className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] flex flex-col h-80 overflow-hidden w-full">
      <div className="px-4 py-3 border-b border-[#E2EDF2] flex justify-between items-center bg-[#F8FAFB]">
        <span className="text-sm font-medium text-[#4A6572]">Conversation</span>
        {transcript.length > 0 && (
          <button 
            onClick={onClear}
            className="text-xs text-[#7A9BAD] hover:text-[#C0392B] flex items-center gap-1 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {transcript.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <MessageSquare className="h-8 w-8 text-[#D0E4EA] mb-2" />
            <p className="text-sm text-[#7A9BAD]">Conversation will appear here</p>
            {isActive && (
              <p className="text-xs text-[#A8C4CF] mt-1">Start speaking to begin...</p>
            )}
          </div>
        ) : (
          transcript.map((msg) => (
            <div 
              key={msg.id}
              className={`flex flex-col animate-fade-in ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <span className={`text-[10px] text-[#7A9BAD] font-medium mb-1 ${msg.role === 'user' ? 'text-right' : 'text-left ml-8'}`}>
                {msg.role === 'user' ? 'You' : 'Riley'}
              </span>
              
              <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} w-full items-end gap-2`}>
                
                {msg.role === 'assistant' && (
                  <div className="h-6 w-6 shrink-0 bg-[#EDF5F8] border border-[#BAD7E1] rounded-[8px] flex items-center justify-center shadow-sm">
                    <span className="text-[#4A7D96] text-xs font-semibold leading-none">R</span>
                  </div>
                )}
                
                <div 
                  className={`px-4 py-2.5 max-w-[80%] text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#619BB6] text-white rounded-[12px] rounded-tr-[4px] shadow-sm'
                      : 'bg-white border border-[#E2EDF2] shadow-sm text-[#1A2832] rounded-[12px] rounded-tl-[4px]'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          ))
        )}

        {isRileyTyping && (
           <div className="flex flex-col items-start animate-fade-in">
             <span className="text-[10px] text-[#7A9BAD] font-medium mb-1 ml-8">Riley</span>
             <div className="flex justify-start w-full items-end gap-2">
               <div className="h-6 w-6 shrink-0 bg-[#EDF5F8] border border-[#BAD7E1] rounded-[8px] flex items-center justify-center shadow-sm">
                 <span className="text-[#4A7D96] text-xs font-semibold leading-none">R</span>
               </div>
               
               <div className="bg-white border border-[#E2EDF2] shadow-sm rounded-[12px] rounded-tl-[4px] px-4 py-3.5 flex gap-1">
                 <span className="h-2 w-2 bg-[#7A9BAD] rounded-[4px] animate-bounce"></span>
                 <span className="h-2 w-2 bg-[#7A9BAD] rounded-[4px] animate-bounce animation-delay-100"></span>
                 <span className="h-2 w-2 bg-[#7A9BAD] rounded-[4px] animate-bounce animation-delay-200"></span>
               </div>
             </div>
           </div>
        )}

        <div ref={bottomRef} />
      </div>

    </div>
  )
}
