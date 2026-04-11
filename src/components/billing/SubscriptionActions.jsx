'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useCreateBillingPortal } from '@/hooks/useStripe'
import { Loader2 } from 'lucide-react'

export default function SubscriptionActions({ plan }) {
  const { mutate: createPortal, isPending } = useCreateBillingPortal()

  if (plan === 'FREE') {
    return (
      <Button asChild className="gradient-primary text-white rounded-xl shadow-sm px-6 font-bold h-10 w-full sm:w-auto mt-4 sm:mt-0">
        <Link href="/billing">Upgrade Plan</Link>
      </Button>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
      {plan === 'BASIC' && (
        <Button asChild className="gradient-primary text-white rounded-xl shadow-sm font-bold w-full sm:w-auto h-10 px-6">
          <Link href="/billing">Upgrade</Link>
        </Button>
      )}
      <Button 
        variant="outline" 
        className="rounded-xl border-gray-200 w-full sm:w-auto h-10 px-6 font-bold text-gray-700"
        onClick={() => createPortal()}
        disabled={isPending}
      >
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Manage Billing
      </Button>
    </div>
  )
}
