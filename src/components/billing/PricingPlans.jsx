'use client'

import React, { useState } from 'react'
import { PLANS } from '@/lib/plans'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { useCreateCheckoutSession, useCreateBillingPortal } from '@/hooks/useStripe'
import { cn } from '@/lib/utils'

export default function PricingPlans({ currentPlan = 'FREE' }) {
  const { mutate: checkout, isPending: isCheckingOut } = useCreateCheckoutSession()
  const { mutate: portal, isPending: isPortalLoading } = useCreateBillingPortal()
  const [loadingPlan, setLoadingPlan] = useState(null)

  const handleAction = (planKey, planRank, currentRank) => {
    setLoadingPlan(planKey)
    if (planRank > currentRank) {
      checkout(planKey, { onError: () => setLoadingPlan(null) })
    } else {
      portal(undefined, { onError: () => setLoadingPlan(null) })
    }
  }

  const planOrder = ['FREE', 'BASIC', 'AI_PRO']
  const currentRank = planOrder.indexOf(currentPlan)

  const getPriceSuffix = (planKey) => (planKey === 'FREE' ? 'forever' : 'per month')

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {planOrder.map((planKey, index) => {
        const plan = PLANS[planKey]
        const planRank = index
        const isCurrent = planKey === currentPlan
        const isFeatured = planKey === 'BASIC'
        
        let btnText = ""
        if (isCurrent) btnText = "Current Plan"
        else if (planRank < currentRank) btnText = planKey === 'FREE' ? "Downgrade to Free" : "Downgrade"
        else btnText = `Upgrade to ${plan.name}`

        const isLoading = loadingPlan === planKey
        const isAnyLoading = loadingPlan !== null || isCheckingOut || isPortalLoading

        return (
          <div 
            key={planKey}
            className={cn(
              "bg-white rounded-[12px] border shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-6 sm:p-8 flex flex-col gap-6 relative transition-all duration-200 hover:shadow-[0_4px_12px_rgba(26,40,50,0.08)]",
              isFeatured ? "border-[#619BB6] border-2" : "border-[#E2EDF2]"
            )}
          >
            {isFeatured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#619BB6] text-white text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-[4px] shadow-sm whitespace-nowrap">
                Most Popular
              </div>
            )}
            
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg text-[#1A2832]">{plan.name}</h3>
                {isCurrent && (
                  <Badge variant="secondary" className="bg-[#EDF5F8] text-[#4A7D96] hover:bg-[#EDF5F8] border border-[#BAD7E1] text-xs shadow-sm font-medium px-2 py-0.5 rounded-[4px]">
                    ✓ Active
                  </Badge>
                )}
              </div>
              <p className="text-sm text-[#4A6572]">
                {planKey === 'FREE' ? 'Essential tools.' : planKey === 'BASIC' ? 'For active care.' : 'Ultimate tracking.'}
              </p>
              
               <div className="pt-2 flex items-end gap-1">
                <span className="text-3xl sm:text-4xl font-semibold text-[#1A2832]">${plan.price}</span>
                <span className="text-sm text-[#7A9BAD] mb-1 font-medium">
                  {getPriceSuffix(planKey)}
                </span>
              </div>
            </div>

            <Button
              disabled={isCurrent || isAnyLoading}
              onClick={() => !isCurrent && handleAction(planKey, planRank, currentRank)}
              variant={isCurrent || planRank < currentRank ? 'outline' : 'default'}
              className={cn(
                "w-full rounded-[6px] h-11 font-medium shadow-sm transition-colors",
                (!isCurrent && planRank > currentRank) ? "bg-[#619BB6] text-white hover:bg-[#4A7D96] border-0" :
                planRank < currentRank ? "border-[#E8A09A] text-[#C0392B] hover:bg-[#FDF2F2] hover:text-[#C0392B]" :
                "border-[#D0E4EA] text-[#4A6572] hover:bg-[#EDF5F8]"
              )}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {btnText}
            </Button>

            <ul className="space-y-3 flex-1 mt-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#619BB6] shrink-0" />
                  <span className="text-sm text-[#4A6572] leading-normal">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
