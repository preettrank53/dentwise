'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getAvailableTimeSlots,
  createAppointment,
  getUserAppointments,
  cancelAppointment,
  getBookedSlotsForDoctor,
} from '@/actions/appointment.actions'

/**
 * 1. Hook to fetch available time slots for a doctor on a specific date
 * @param {string} doctorId
 * @param {string|Date} date
 */
export const useGetAvailableSlots = (doctorId, date) => {
  return useQuery({
    queryKey: ['slots', doctorId, date],
    queryFn: () => getAvailableTimeSlots(doctorId, date),
    enabled: !!doctorId && !!date,
    staleTime: 30000, // 30 seconds
  })
}

/**
 * 2. Hook to fetch all appointments for the current logged-in user
 */
export const useGetUserAppointments = () => {
  return useQuery({
    queryKey: ['user-appointments'],
    queryFn: () => getUserAppointments(),
  })
}

/**
 * 3. Hook to create a new appointment
 */
export const useCreateAppointment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData) => createAppointment(formData),
    onSuccess: () => {
      toast.success('Appointment Booked!', {
        description: 'Check your email for confirmation details.',
        duration: 5000,
      })
      // Invalidate current user's appointments
      queryClient.invalidateQueries({ queryKey: ['user-appointments'] })
      // Invalidate all slot queries since availability has changed
      queryClient.invalidateQueries({ 
        queryKey: ['slots'],
        exact: false 
      })
    },
    onError: (error) => {
      console.error('Error creating appointment:', error)
      toast.error('Booking Failed', {
        description: error.message || 'Something went wrong. Please try again.',
        duration: 5000,
      })
    },
  })
}

/**
 * 4. Hook to cancel an existing appointment
 */
export const useCancelAppointment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (appointmentId) => cancelAppointment(appointmentId),
    onSuccess: () => {
      toast.success('Appointment Cancelled', {
        description: 'Your appointment has been cancelled successfully.',
        duration: 4000,
      })
      queryClient.invalidateQueries({ queryKey: ['user-appointments'] })
      // Notice: We don't necessarily invalidate slots here unless 
      // the business requirement specifies that cancelled slots return to pool instantly.
      // The user prompt specifically says invalidate user-appointments only for cancellation.
    },
    onError: (error) => {
      console.error('Error cancelling appointment:', error)
      toast.error('Cancellation Failed', {
        description: error.message || 'Could not cancel. Try again.',
        duration: 4000,
      })
    },
  })
}

/**
 * 5. Hook to fetch raw booked slots for a doctor on a specific date
 * @param {string} doctorId
 * @param {string|Date} date
 */
export const useGetBookedSlots = (doctorId, date) => {
  return useQuery({
    queryKey: ['booked-slots', doctorId, date],
    queryFn: () => getBookedSlotsForDoctor(doctorId, date),
    enabled: !!doctorId && !!date,
  })
}
