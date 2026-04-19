import React from 'react'
import { Crown } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PlanBadge({ plan = 'FREE', className }) {
  if (plan === 'AI_PRO') {
    return (
      <span className={cn("bg-[#EDF5F8] text-[#1A2832] border border-[#BAD7E1] rounded-[4px] px-2 py-0.5 text-xs font-medium inline-flex items-center gap-1.5 uppercase tracking-wider", className)}>
        <Crown className="h-3 w-3" /> AI Pro
      </span>
    )
  }

  if (plan === 'BASIC') {
    return (
      <span className={cn("bg-[#EDF5F8] text-[#4A7D96] border border-[#BAD7E1] rounded-[4px] px-2 py-0.5 text-xs font-medium inline-flex items-center gap-1.5 uppercase tracking-wider", className)}>
        Basic
      </span>
    )
  }

  // FREE fallback
  return (
    <span className={cn("bg-[#F5F5F5] text-[#6B7280] border border-[#D0D0D0] rounded-[4px] px-2 py-0.5 text-xs font-medium inline-flex items-center gap-1.5 uppercase tracking-wider", className)}>
      Free
    </span>
  )
}
