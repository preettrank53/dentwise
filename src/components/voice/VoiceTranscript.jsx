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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-80 overflow-hidden w-full max-w-lg mx-auto">
      
      {/* Transcript Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <span className="text-sm font-medium text-gray-700">Conversation</span>
        {transcript.length > 0 && (
          <button 
            onClick={onClear}
            className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {transcript.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <MessageSquare className="h-8 w-8 text-gray-300 mb-2" />
            <p className="text-sm text-gray-400">Conversation will appear here</p>
            {isActive && (
              <p className="text-xs text-gray-300 mt-1">Start speaking to begin...</p>
            )}
          </div>
        ) : (
          transcript.map((msg) => (
            <div 
              key={msg.id}
              className={`flex flex-col animate-fade-in ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <span className={`text-[10px] text-gray-400 font-medium mb-1 ${msg.role === 'user' ? 'text-right' : 'text-left ml-9'}`}>
                {msg.role === 'user' ? 'You' : 'Riley'}
              </span>
              
              <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} w-full items-end gap-2`}>
                
                {msg.role === 'assistant' && (
                  <div className="h-6 w-6 shrink-0 gradient-primary rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-bold leading-none">R</span>
                  </div>
                )}
                
                <div 
                  className={`px-4 py-2.5 max-w-[80%] text-sm ${
                    msg.role === 'user' 
                      ? 'bg-cyan-500 text-white rounded-2xl rounded-tr-sm shadow-sm'
                      : 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-2xl rounded-tl-sm'
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
             <span className="text-[10px] text-gray-400 font-medium mb-1 ml-9">Riley</span>
             <div className="flex justify-start w-full items-end gap-2">
               <div className="h-6 w-6 shrink-0 gradient-primary rounded-full flex items-center justify-center shadow-sm">
                 <span className="text-white text-xs font-bold leading-none">R</span>
               </div>
               
               <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3.5 flex gap-1">
                 <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                 <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce animation-delay-100"></span>
                 <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></span>
               </div>
             </div>
           </div>
        )}

        <div ref={bottomRef} />
      </div>

    </div>
  )
}
