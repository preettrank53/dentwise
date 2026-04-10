'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUserProfile, updateUserProfile } from '@/actions/user.actions'

export function useGetUserProfile() {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: () => getUserProfile(),
  })
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData) => updateUserProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] })
      queryClient.invalidateQueries({ queryKey: ['user-appointments'] })
    },
    onError: (error) => {
      console.error('Failed to update user profile:', error)
    }
  })
}
