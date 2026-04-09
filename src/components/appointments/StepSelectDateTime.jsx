'use client'

import React, { useMemo } from 'react'
import { useGetAvailableSlots } from '@/hooks/useAppointments'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { Calendar as CalendarIcon, Clock, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  onSelectReason
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Date Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <CalendarIcon className="h-4 w-4" />
          <span>Select a Date</span>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {nextWorkingDays.map((date) => {
            const isSelected = selectedDate?.toDateString() === date.toDateString()
            return (
              <button
                key={date.toISOString()}
                onClick={() => onSelectDate(date)}
                className={cn(
                  "flex flex-col items-center justify-center min-w-[80px] h-24 rounded-2xl border-2 transition-all shrink-0",
                  isSelected 
                    ? "gradient-primary border-transparent text-white shadow-md scale-105" 
                    : "bg-white border-border hover:border-primary/50 text-muted-foreground"
                )}
              >
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className="text-2xl font-black py-0.5">
                  {date.getDate()}
                </span>
                <span className="text-[10px] font-bold">
                  {date.toLocaleDateString('en-US', { month: 'short' })}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Time Slot Selection */}
      {selectedDate && (
        <div className="space-y-4 animate-in fade-in duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Clock className="h-4 w-4" />
              <span>Available Slots</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
              {availableSlotsCount} slots available
            </span>
          </div>

          {slotsLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-10 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {slots?.map((slot) => {
                const isSelected = selectedTime?.datetime === slot.datetime
                return (
                  <Button
                    key={slot.datetime}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    disabled={slot.isBooked}
                    onClick={() => onSelectTime(slot)}
                    className={cn(
                      "h-10 border-2 font-medium relative overflow-hidden transition-all",
                      slot.isBooked && "bg-muted text-muted-foreground/50 border-transparent cursor-not-allowed opacity-60",
                      isSelected && "gradient-primary border-transparent scale-105"
                    )}
                  >
                    {slot.isBooked ? (
                      <span className="line-through text-xs italic">Booked</span>
                    ) : (
                      <div className="flex items-center gap-1">
                        {isSelected && <Check className="h-3 w-3" />}
                        {slot.time}
                      </div>
                    )}
                  </Button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Reason for Visit */}
      {selectedTime && (
        <div className="space-y-4 animate-in fade-in duration-500">
          <label className="block text-sm font-semibold text-primary">
            Reason for visit (optional)
          </label>
          <Textarea
            placeholder="Describe your dental concern (e.g., Toothache, Regular checkup, Cleaning...)"
            className="min-h-[100px] bg-white border-2 focus:border-primary transition-all resize-none rounded-xl"
            onChange={(e) => onSelectReason(e.target.value)}
          />
        </div>
      )}
    </div>
  )
}
