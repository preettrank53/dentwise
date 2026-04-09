'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  toggleDoctorStatus,
} from '@/actions/doctor.actions'

/**
 * Hook to fetch all active doctors
 */
export const useGetDoctors = () => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: () => getDoctors(),
  })
}

/**
 * Hook to fetch a single doctor by ID
 * @param {string} id - The doctor ID
 */
export const useGetDoctorById = (id) => {
  return useQuery({
    queryKey: ['doctors', id],
    queryFn: () => getDoctorById(id),
    enabled: !!id,
  })
}

/**
 * Hook to create a new doctor
 */
export const useCreateDoctor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData) => createDoctor(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
    },
    onError: (error) => {
      console.error('Error creating doctor:', error)
    },
  })
}

/**
 * Hook to update an existing doctor
 */
export const useUpdateDoctor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, formData }) => updateDoctor(id, formData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
      queryClient.invalidateQueries({ queryKey: ['doctors', variables.id] })
    },
    onError: (error) => {
      console.error('Error updating doctor:', error)
    },
  })
}

/**
 * Hook to toggle a doctor's active status
 */
export const useToggleDoctorStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => toggleDoctorStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
    },
    onError: (error) => {
      console.error('Error toggling doctor status:', error)
    },
  })
}
