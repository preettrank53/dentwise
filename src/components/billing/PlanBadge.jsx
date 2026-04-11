import React from 'react'
import { Crown } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PlanBadge({ plan = 'FREE', className }) {
  if (plan === 'AI_PRO') {
    return (
      <span className={cn("bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-3 py-1 text-xs font-medium inline-flex items-center gap-1.5 uppercase tracking-wider", className)}>
        <Crown className="h-3 w-3" /> AI Pro
      </span>
    )
  }

  if (plan === 'BASIC') {
    return (
      <span className={cn("bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-full px-3 py-1 text-xs font-medium inline-flex items-center gap-1.5 uppercase tracking-wider", className)}>
        Basic
      </span>
    )
  }

  // FREE fallback
  return (
    <span className={cn("bg-gray-100 text-gray-600 border border-gray-200 rounded-full px-3 py-1 text-xs font-medium inline-flex items-center gap-1.5 uppercase tracking-wider", className)}>
      Free
    </span>
  )
}
