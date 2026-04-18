import React from 'react'
import { CalendarOff } from 'lucide-react'
import EmptyState from '@/components/ui/EmptyState'

export default function NoSlotsAvailable({ selectedDate, onSelectDate, doctorId }) {
  // Generate next 3 working days
  const getNextAvailableDates = () => {
    let dates = []
    let currentDate = new Date(selectedDate)
    
    while (dates.length < 3) {
      currentDate.setDate(currentDate.getDate() + 1)
      const dayIndex = currentDate.getDay()
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (dayIndex !== 0 && dayIndex !== 6) {
        dates.push(new Date(currentDate))
      }
    }
    
    return dates
  }

  const suggestedDates = getNextAvailableDates()

  return (
    <div className="flex flex-col items-center">
      <EmptyState
        icon={CalendarOff}
        title="No Slots Available"
        description="All appointment slots for this date are fully booked. Please select a different date."
        size="sm"
      />
      
      <div className="w-full max-w-sm mt-4 border-t border-gray-100 pt-6 text-center">
        <p className="text-sm font-medium text-gray-700 mb-3">Try these available dates:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {suggestedDates.map((date, idx) => (
            <button
              key={idx}
              onClick={() => onSelectDate(date)}
              className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-200 transition-colors bg-white shadow-sm"
            >
              {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
