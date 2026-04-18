'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
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
      toast.success('Profile Updated', {
        description: 'Your changes have been saved.',
        duration: 3000,
      })
      queryClient.invalidateQueries({ queryKey: ['user-profile'] })
      queryClient.invalidateQueries({ queryKey: ['user-appointments'] })
    },
    onError: (error) => {
      console.error('Failed to update user profile:', error)
      toast.error('Update Failed', {
        description: error.message || 'Could not save changes.',
        duration: 4000,
      })
    }
  })
}
