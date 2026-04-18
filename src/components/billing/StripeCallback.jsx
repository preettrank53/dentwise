'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'
import { useSearchParams, useRouter } from 'next/navigation'

export default function StripeCallback() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast.success('Plan Upgraded!', {
        description: 'Welcome to your new plan. Enjoy the features!',
        duration: 6000,
      })
      router.replace('/profile')
    }
    
    if (searchParams.get('cancelled') === 'true') {
      toast('Checkout Cancelled', {
        description: 'No changes were made to your subscription.',
        duration: 4000,
      })
      router.replace('/profile')
    }
  }, [searchParams, router])

  return null
}
