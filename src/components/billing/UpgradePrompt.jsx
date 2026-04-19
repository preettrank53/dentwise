import React from 'react'
import Link from 'next/link'
import { Lock, Mic, Brain, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function UpgradePrompt({ feature, requiredPlan, description }) {
  return (
    <div className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] max-w-md mx-auto p-8 flex flex-col items-center gap-6 text-center">
      <div className="bg-[#F8FAFB] border border-[#E2EDF2] rounded-[8px] p-4 inline-flex items-center justify-center">
        <Lock className="h-8 w-8 text-[#7A9BAD]" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-[#1A2832]">Unlock {feature}</h2>
        <p className="text-[#4A6572] text-sm max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      <div className="bg-[#EDF5F8] text-[#1A2832] border border-[#BAD7E1] rounded-[4px] px-3 py-1 text-xs font-medium tracking-wider uppercase">
        Requires {requiredPlan}
      </div>

      <div className="bg-[#F8FAFB] border border-[#E2EDF2] rounded-[8px] p-4 w-full space-y-3 text-left">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-[6px] p-2 border border-[#E2EDF2] shrink-0">
            <Mic className="h-4 w-4 text-[#619BB6]" />
          </div>
          <span className="text-sm text-[#4A6572]">Real-time voice conversations</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-[6px] p-2 border border-[#E2EDF2] shrink-0">
            <Brain className="h-4 w-4 text-[#619BB6]" />
          </div>
          <span className="text-sm text-[#4A6572]">AI dental advice instantly</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-[6px] p-2 border border-[#E2EDF2] shrink-0">
            <Clock className="h-4 w-4 text-[#619BB6]" />
          </div>
          <span className="text-sm text-[#4A6572]">Available 24/7</span>
        </div>
      </div>

      <div className="w-full space-y-3 pt-2">
        <Button asChild className="bg-[#619BB6] text-white rounded-[6px] w-full h-11 font-medium hover:bg-[#4A7D96] transition-colors border-0">
          <Link href="/billing">Upgrade to {requiredPlan} - $19/mo</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-[6px] w-full h-11 font-medium border-[#D0E4EA] text-[#4A6572] hover:bg-[#EDF5F8]">
          <Link href="/billing">View All Plans</Link>
        </Button>
      </div>

      <p className="text-xs text-[#7A9BAD] mt-2 font-medium">
        Cancel anytime | Secure payment via Stripe
      </p>

    </div>
  )
}
