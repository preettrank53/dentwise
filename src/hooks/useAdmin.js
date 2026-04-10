'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-appointments'] })
    },
  })
}

export function useGetAdminStats() {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => getAdminStats(),
  })
}
