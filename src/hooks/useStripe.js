'use client'

import { useQuery, useMutation } from '@tanstack/react-query'
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
    }
  })
}
