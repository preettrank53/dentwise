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
      <Button asChild className="bg-[#619BB6] text-white rounded-[6px] shadow-sm px-6 font-medium h-10 w-full sm:w-auto mt-4 sm:mt-0 hover:bg-[#4A7D96] border-0">
        <Link href="/billing">Upgrade Plan</Link>
      </Button>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
      {plan === 'BASIC' && (
        <Button asChild className="bg-[#619BB6] text-white rounded-[6px] shadow-sm font-medium w-full sm:w-auto h-10 px-6 hover:bg-[#4A7D96] border-0">
          <Link href="/billing">Upgrade</Link>
        </Button>
      )}
      <Button 
        variant="outline" 
        className="rounded-[6px] border-[#D0E4EA] w-full sm:w-auto h-10 px-6 font-medium text-[#4A6572] hover:bg-[#EDF5F8]"
        onClick={() => createPortal()}
        disabled={isPending}
      >
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Manage Billing
      </Button>
    </div>
  )
}
