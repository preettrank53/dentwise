'use client'

import React, { useMemo } from 'react'
import { useGetAvailableSlots } from '@/hooks/useAppointments'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { Calendar as CalendarIcon, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import NoSlotsAvailable from './NoSlotsAvailable'

/**
 * Step 2: Select Date, Time and Provide Reason
 * @param {string} doctorId - Selected doctor ID
 * @param {Date} selectedDate - Currently selected date
 * @param {function} onSelectDate - Callback for date selection
 * @param {object} selectedTime - Currently selected slot object
 * @param {function} onSelectTime - Callback for time selection
 * @param {function} onSelectReason - Callback for reason input
 */
export default function StepSelectDateTime({
  doctorId,
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  onSelectReason,
  showDateError,
  showTimeError
}) {
  // Generate next 5 working days
  const nextWorkingDays = useMemo(() => {
    const days = []
    let current = new Date()
    current.setHours(0, 0, 0, 0)
    
    while (days.length < 5) {
      current.setDate(current.getDate() + 1)
      const dayOfWeek = current.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip Sat (6) and Sun (0)
        days.push(new Date(current))
      }
    }
    return days
  }, [])

  const { data: slots, isLoading: slotsLoading } = useGetAvailableSlots(
    doctorId, 
    selectedDate ? selectedDate.toISOString() : null
  )

  const availableSlotsCount = slots?.filter(s => !s.isBooked).length || 0

  return (
    <div className="space-y-6">
      
      {/* Date Selection */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CalendarIcon className="h-4 w-4 text-[#619BB6]" />
          <span className="text-sm font-semibold text-[#1A2832]">Select a Date</span>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1">
          {nextWorkingDays.map((date) => {
            const isSelected = selectedDate?.toDateString() === date.toDateString()
            return (
              <button
                key={date.toISOString()}
                onClick={() => onSelectDate(date)}
                className={cn(
                  'flex-shrink-0 flex flex-col items-center w-14 py-2.5 px-2 rounded-[8px] border transition-all duration-150',
                  isSelected 
                    ? 'bg-[#619BB6] border-[#619BB6]'
                    : 'bg-white border-[#E2EDF2] hover:border-[#BAD7E1]'
                )}
              >
                <span className={cn('text-[10px] font-medium uppercase', isSelected ? 'text-white/70' : 'text-[#7A9BAD]')}>
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className={cn('text-lg font-semibold leading-tight my-0.5', isSelected ? 'text-white' : 'text-[#1A2832]')}>
                  {date.getDate()}
                </span>
                <span className={cn('text-[10px]', isSelected ? 'text-white/70' : 'text-[#7A9BAD]')}>
                  {date.toLocaleDateString('en-US', { month: 'short' })}
                </span>
              </button>
            )
          })}
        </div>

        {showDateError && (
          <p className="form-error">Please select a date</p>
        )}
      </div>

      {/* Time Slot Selection */}
      {selectedDate && (
        <div>
          <div className="flex justify-between items-center mb-3 mt-5">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#619BB6]" />
              <span className="text-sm font-semibold text-[#1A2832]">Available Slots</span>
            </div>
            <span className="text-xs text-[#7A9BAD]">
              {availableSlotsCount} slots
            </span>
          </div>

          {slotsLoading ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-10 rounded-[6px]" />
              ))}
            </div>
          ) : slots && availableSlotsCount === 0 ? (
            <NoSlotsAvailable 
              selectedDate={selectedDate} 
              onSelectDate={onSelectDate} 
              doctorId={doctorId} 
            />
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slots?.map((slot) => {
                const isSelected = selectedTime?.datetime === slot.datetime
                return (
                  <button
                    key={slot.datetime}
                    type="button"
                    disabled={slot.isBooked}
                    onClick={() => onSelectTime(slot)}
                    className={cn(
                      'py-2.5 px-3 text-center rounded-[6px] border text-sm transition-all duration-100',
                      slot.isBooked && 'bg-[#F8FAFB] border-[#E2EDF2] text-[#A8C4CF] cursor-not-allowed line-through',
                      !slot.isBooked && isSelected && 'bg-[#619BB6] border-[#619BB6] text-white font-medium',
                      !slot.isBooked && !isSelected && 'bg-white border-[#E2EDF2] text-[#4A6572] font-medium hover:border-[#619BB6] hover:text-[#619BB6] hover:bg-[#EDF5F8]'
                    )}
                  >
                    {slot.isBooked ? 'Booked' : slot.time}
                  </button>
                )
              })}
            </div>
          )}

          {showTimeError && (
            <p className="form-error mt-3">Please select a time slot</p>
          )}
        </div>
      )}

      {/* Reason for Visit */}
      {selectedTime && (
        <div>
          <label className="form-label mt-5">
            Reason for Visit
            <span style={{
              color: '#A8C4CF',
              fontWeight: 400,
              marginLeft: '4px',
            }}>
              (optional)
            </span>
          </label>
          <Textarea
            placeholder="Describe your dental concern (e.g., Toothache, Regular checkup, Cleaning...)"
            rows={3}
            className="input-field resize-none"
            onChange={(e) => onSelectReason(e.target.value)}
          />
        </div>
      )}
    </div>
  )
}
