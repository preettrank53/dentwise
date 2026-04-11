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
  let barColorClass = 'bg-gray-200'
  if (isSpeaking) {
    barColorClass = 'bg-gradient-to-t from-cyan-500 to-blue-500'
  } else if (isUserSpeaking) {
    barColorClass = 'bg-gradient-to-t from-purple-500 to-pink-500'
  }

  const isActive = callStatus === 'active'
  
  const ringClass = isActive 
    ? 'ring-4 ring-cyan-500/20 animate-pulse' 
    : 'ring-2 ring-gray-100'

  let dotColorClass = 'bg-gray-300'
  if (callStatus === 'connecting') dotColorClass = 'bg-amber-400 animate-pulse'
  else if (callStatus === 'active') dotColorClass = 'bg-green-500 animate-pulse'
  else if (callStatus === 'ending') dotColorClass = 'bg-red-400 animate-pulse'

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`h-24 w-24 rounded-full flex items-end justify-center gap-0.5 pb-3 transition-shadow duration-300 ${ringClass}`}>
        {bars.map((height, i) => (
          <div 
            key={i}
            className={`w-1 rounded-full mx-0.5 transition-all duration-100 ${barColorClass}`}
            style={{ height: `${height}px`, minHeight: '4px', maxHeight: '48px' }}
          />
        ))}
      </div>
      
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${dotColorClass}`} />
        <span className="text-xs text-gray-500 font-medium">
          {getStatusMessage(callStatus)}
        </span>
      </div>
    </div>
  )
}
