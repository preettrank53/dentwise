'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getAllAppointments, updateAppointmentStatus, getAdminStats } from '@/actions/admin.actions'

export function useGetAllAppointments(filters) {
  return useQuery({
    queryKey: ['admin-appointments', filters],
    queryFn: () => getAllAppointments(filters),
  })
}

export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, status }) => updateAppointmentStatus(id, status),
    onSuccess: (data) => {
      if (data?.status === 'COMPLETED') {
        toast.success('Marked as Complete', {
          description: 'Appointment status updated to completed.',
          duration: 3000,
        })
      } else {
        toast.success('Status Updated', {
          description: 'Appointment status has been updated.',
          duration: 3000,
        })
      }
      queryClient.invalidateQueries({ queryKey: ['admin-appointments'] })
    },
    onError: (error) => {
      toast.error('Update Failed', {
        description: error.message || 'Could not update status.',
        duration: 4000,
      })
    }
  })
}

export function useGetAdminStats() {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => getAdminStats(),
  })
}
