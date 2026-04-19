'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Calendar, Clock, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useGetAvailableSlots, useRescheduleAppointment } from '@/hooks/useAppointments'

export default function RescheduleModal({ isOpen, onClose, appointment }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

  const rescheduleMutation = useRescheduleAppointment()

  const doctorId = appointment?.doctorId || appointment?.doctor?.id
  const doctorName = appointment?.doctor?.name || appointment?.doctorName || 'Doctor'
  const doctorSpecialty = appointment?.doctor?.specialty || appointment?.doctorSpecialty || 'Dental Specialist'

  const { data: slots, isLoading: slotsLoading } = useGetAvailableSlots(
    doctorId,
    selectedDate ? selectedDate.toISOString() : null
  )

  const nextWorkingDays = useMemo(() => {
    const days = []
    const current = new Date()
    current.setHours(0, 0, 0, 0)

    while (days.length < 5) {
      current.setDate(current.getDate() + 1)
      const dayOfWeek = current.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        days.push(new Date(current))
      }
    }

    return days
  }, [])

  useEffect(() => {
    if (isOpen) {
      setSelectedDate(null)
      setSelectedTime(null)
      rescheduleMutation.reset()
    }
  }, [isOpen])

  const availableSlotsCount = slots?.filter((slot) => !slot.isBooked).length || 0

  const currentDateTime = appointment?.dateTime ? new Date(appointment.dateTime) : null

  const currentDateLabel = currentDateTime
    ? currentDateTime.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown date'

  const currentTimeLabel = currentDateTime
    ? currentDateTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    : 'Unknown time'

  const canSubmit = !!selectedDate && !!selectedTime

  const handleSelectDate = (date) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleSubmit = () => {
    if (!canSubmit || !appointment?.id) {
      return
    }

    const newDateTime = selectedTime?.datetime
    if (!newDateTime) {
      return
    }

    rescheduleMutation.mutate(
      {
        appointmentId: appointment.id,
        newDateTime,
      },
      {
        onSuccess: () => {
          onClose()
        },
      }
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] rounded-[12px] border border-[#E2EDF2] bg-white text-[#1A2832] shadow-[0_16px_40px_rgba(26,40,50,0.16)]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-[#1A2832]">
            Reschedule Appointment
          </DialogTitle>
          <DialogDescription className="text-sm text-[#7A9BAD]">
            Select a new date and time for your appointment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="rounded-[12px] border border-[#E2EDF2] bg-[#F8FAFB] p-4">
            <p className="text-sm font-semibold text-[#1A2832]">{doctorName}</p>
            <p className="text-xs text-[#7A9BAD] mt-0.5">{doctorSpecialty}</p>
            <p className="text-xs text-[#7A9BAD] mt-3">
              Current: {currentDateLabel} at {currentTimeLabel}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-[#619BB6]" />
              <span className="text-sm font-semibold text-[#1A2832]">Select a Date</span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {nextWorkingDays.map((date) => {
                const isSelected = selectedDate?.toDateString() === date.toDateString()

                return (
                  <button
                    key={date.toISOString()}
                    type="button"
                    onClick={() => handleSelectDate(date)}
                    className={cn(
                      'flex-shrink-0 flex flex-col items-center w-14 py-2.5 px-2 rounded-[8px] border transition-all duration-150',
                      isSelected
                        ? 'bg-[#619BB6] border-[#619BB6]'
                        : 'bg-white border-[#E2EDF2] hover:border-[#BAD7E1]'
                    )}
                  >
                    <span
                      className={cn(
                        'text-[10px] font-medium uppercase',
                        isSelected ? 'text-white/70' : 'text-[#7A9BAD]'
                      )}
                    >
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span
                      className={cn(
                        'text-lg font-semibold leading-tight my-0.5',
                        isSelected ? 'text-white' : 'text-[#1A2832]'
                      )}
                    >
                      {date.getDate()}
                    </span>
                    <span
                      className={cn(
                        'text-[10px]',
                        isSelected ? 'text-white/70' : 'text-[#7A9BAD]'
                      )}
                    >
                      {date.toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {selectedDate && (
            <div>
              <div className="flex justify-between items-center mb-3 mt-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#619BB6]" />
                  <span className="text-sm font-semibold text-[#1A2832]">Available Slots</span>
                </div>
                <span className="text-xs text-[#7A9BAD]">{availableSlotsCount} slots</span>
              </div>

              {slotsLoading ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {[...Array(8)].map((_, i) => (
                    <Skeleton key={i} className="h-10 rounded-[6px]" />
                  ))}
                </div>
              ) : availableSlotsCount === 0 ? (
                <div className="rounded-[8px] border border-[#E2EDF2] bg-[#F8FAFB] p-4 text-sm text-[#7A9BAD]">
                  No available slots for this date. Please select another date.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {slots?.map((slot) => {
                    const isSelected = selectedTime?.datetime === slot.datetime

                    return (
                      <button
                        key={slot.datetime}
                        type="button"
                        disabled={slot.isBooked}
                        onClick={() => setSelectedTime(slot)}
                        className={cn(
                          'py-2.5 px-3 text-center rounded-[6px] border text-sm transition-all duration-100',
                          slot.isBooked &&
                            'bg-[#F8FAFB] border-[#E2EDF2] text-[#A8C4CF] cursor-not-allowed line-through',
                          !slot.isBooked && isSelected &&
                            'bg-[#619BB6] border-[#619BB6] text-white font-medium',
                          !slot.isBooked && !isSelected &&
                            'bg-white border-[#E2EDF2] text-[#4A6572] font-medium hover:border-[#619BB6] hover:text-[#619BB6] hover:bg-[#EDF5F8]'
                        )}
                      >
                        {slot.isBooked ? 'Booked' : slot.time}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-end gap-3 pt-2 border-t border-[#E2EDF2]">
          {rescheduleMutation.isError && (
            <div className="w-full mb-2 rounded-[6px] border border-[#E8A09A] bg-[#FDF2F2] px-3 py-2">
              <p className="form-error mt-0">
                {rescheduleMutation.error?.message || 'Could not reschedule appointment.'}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="btn-ghost rounded-[6px]"
            disabled={rescheduleMutation.isPending}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit || rescheduleMutation.isPending}
            className="btn-primary rounded-[6px]"
            style={{
              opacity: !canSubmit || rescheduleMutation.isPending ? 0.4 : 1,
            }}
          >
            {rescheduleMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Rescheduling...
              </>
            ) : (
              'Confirm Reschedule'
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
