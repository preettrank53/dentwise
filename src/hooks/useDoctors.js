'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
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
      toast.success('Doctor Added', {
        description: 'New doctor has been added to the roster.',
        duration: 3000,
      })
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
    },
    onError: (error) => {
      console.error('Error creating doctor:', error)
      toast.error('Failed to Add Doctor', {
        description: error.message,
        duration: 4000,
      })
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
      toast.success('Doctor Updated', {
        description: 'Doctor information saved successfully.',
        duration: 3000,
      })
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
      queryClient.invalidateQueries({ queryKey: ['doctors', variables.id] })
    },
    onError: (error) => {
      console.error('Error updating doctor:', error)
      toast.error('Update Failed', {
        description: error.message,
        duration: 4000,
      })
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
    onSuccess: (data) => {
      if (data?.isActive) {
        toast.success('Doctor Activated', {
          description: `${data.name} is now accepting appointments.`,
          duration: 3000,
        })
      } else if (data && !data.isActive) {
        toast('Doctor Deactivated', {
          description: `${data.name} has been deactivated.`,
          duration: 3000,
        })
      }
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
    },
    onError: (error) => {
      console.error('Error toggling doctor status:', error)
      toast.error('Status Change Failed', {
        description: error.message,
        duration: 4000,
      })
    },
  })
}
