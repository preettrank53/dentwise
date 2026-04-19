'use client'

import React, { useState, useEffect } from 'react'
import { getStatusMessage } from '@/lib/vapiConfig'

export default function VoiceWaveform({ 
  isSpeaking, 
  isUserSpeaking, 
  volumeLevel, 
  callStatus 
}) {
  const [bars, setBars] = useState(Array(12).fill(4))

  useEffect(() => {
    let interval;
    if (isSpeaking || isUserSpeaking) {
      interval = setInterval(() => {
        setBars((prev) => 
          prev.map(() => {
            const baseHeight = 4
            const randomHeight = baseHeight + Math.random() * 40 * (volumeLevel + 0.3)
            return Math.min(randomHeight, 48)
          })
        )
      }, 100)
    } else {
      setBars(Array(12).fill(4))
      if (interval) clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isSpeaking, isUserSpeaking, volumeLevel])

  // Determine bar color
  let barColorClass = 'bg-[#D0E4EA]'
  if (isSpeaking) {
    barColorClass = 'bg-[#619BB6]'
  } else if (isUserSpeaking) {
    barColorClass = 'bg-[#4A7D96]'
  }

  const isActive = callStatus === 'active'
  
  const ringClass = isActive 
    ? 'ring-2 ring-[#BAD7E1] animate-pulse' 
    : 'ring-1 ring-[#E2EDF2]'

  let dotColorClass = 'bg-[#A8C4CF]'
  if (callStatus === 'connecting') dotColorClass = 'bg-[#B7791F] animate-pulse'
  else if (callStatus === 'active') dotColorClass = 'bg-[#2D7A4F] animate-pulse'
  else if (callStatus === 'ending') dotColorClass = 'bg-[#C0392B] animate-pulse'

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`h-24 w-24 rounded-[12px] bg-[#F8FAFB] border border-[#E2EDF2] flex items-end justify-center gap-0.5 pb-3 transition-shadow duration-300 ${ringClass}`}>
        {bars.map((height, i) => (
          <div 
            key={i}
            className={`w-1 rounded-[4px] mx-0.5 transition-all duration-100 ${barColorClass}`}
            style={{ height: `${height}px`, minHeight: '4px', maxHeight: '48px' }}
          />
        ))}
      </div>
      
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-[4px] ${dotColorClass}`} />
        <span className="text-xs text-[#7A9BAD] font-medium">
          {getStatusMessage(callStatus)}
        </span>
      </div>
    </div>
  )
}
