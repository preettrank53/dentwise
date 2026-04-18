'use client'

import { useQuery, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getUserSubscription,
  createCheckoutSession,
  createBillingPortalSession
} from '@/actions/stripe.actions'

export function useGetUserSubscription() {
  return useQuery({
    queryKey: ['user-subscription'],
    queryFn: () => getUserSubscription(),
  })
}

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: (planKey) => createCheckoutSession(planKey),
    onSuccess: (data) => {
      if (data?.url) {
        window.location.href = data.url
      }
    },
    onError: (error) => {
      console.error('Failed to create checkout session:', error)
      toast.error('Payment Setup Failed', {
        description: 'Could not start checkout. Please try again.',
        duration: 5000,
      })
    }
  })
}

export function useCreateBillingPortal() {
  return useMutation({
    mutationFn: () => createBillingPortalSession(),
    onSuccess: (data) => {
      if (data?.url) {
        window.location.href = data.url
      }
    },
    onError: (error) => {
      console.error('Failed to create billing portal:', error)
      toast.error('Portal Access Failed', {
        description: 'Could not open billing portal. Try again.',
        duration: 5000,
      })
    }
  })
}
