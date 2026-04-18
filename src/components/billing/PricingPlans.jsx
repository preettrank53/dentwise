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
              "bg-white rounded-2xl border shadow-sm p-6 sm:p-8 flex flex-col gap-6 relative transition-all duration-200 hover:shadow-md",
              isFeatured ? "border-cyan-500 border-2 shadow-lg shadow-cyan-100 mt-6 md:mt-0" : "border-gray-100"
            )}
          >
            {isFeatured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-sm whitespace-nowrap">
                Most Popular
              </div>
            )}
            
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-gray-900">{plan.name}</h3>
                {isCurrent && (
                  <Badge variant="secondary" className="bg-cyan-50 text-cyan-700 hover:bg-cyan-50 border-0 text-xs shadow-sm font-bold px-2 py-0.5 rounded-md">
                    ✓ Active
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {planKey === 'FREE' ? 'Essential tools.' : planKey === 'BASIC' ? 'For active care.' : 'Ultimate tracking.'}
              </p>
              
               <div className="pt-2 flex items-end gap-1">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-sm text-gray-500 mb-1 font-medium">
                  {planKey === 'FREE' ? 'forever' : 'per month'}
                </span>
              </div>
            </div>

            <Button
              disabled={isCurrent || isAnyLoading}
              onClick={() => !isCurrent && handleAction(planKey, planRank, currentRank)}
              variant={isCurrent || planRank < currentRank ? 'outline' : 'default'}
              className={cn(
                "w-full rounded-xl h-11 font-bold shadow-sm transition-all",
                (!isCurrent && planRank > currentRank) ? "gradient-primary text-white hover:opacity-90 shadow-cyan-200" :
                planRank < currentRank ? "border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" :
                "border-gray-200 text-gray-600"
              )}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {btnText}
            </Button>

            <ul className="space-y-3 flex-1 mt-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-cyan-500 shrink-0" />
                  <span className="text-sm text-gray-600 font-medium leading-normal">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
