'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function AppointmentsError({ error, reset }) {
  useEffect(() => {
    console.error('Booking error:', error)
  }, [error])

  return (
    <div className="min-h-[70vh] bg-[#F8FAFB] px-4">
      <div className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-sm p-10 max-w-md mx-auto mt-16 text-center">
        <div className="h-16 w-16 mx-auto bg-[#FDF2F2] rounded-[12px] p-4 flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-[#C0392B]" />
        </div>
        <h1 className="text-2xl font-semibold text-[#1A2832] mt-6">Booking Error</h1>
        <p className="text-sm text-[#7A9BAD] leading-relaxed mt-2">
          Something went wrong with the booking system. Your appointment was not created.
        </p>

        <div className="bg-[#FEF9EE] border border-[#E8C87A] rounded-[8px] p-4 text-sm text-[#B7791F] mt-4 text-left">
          If you were in the middle of booking please check My Appointments before trying again to avoid duplicates.
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-[#619BB6] text-white rounded-[6px] px-5 py-2.5 text-sm font-medium hover:bg-[#4A7D96] transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/appointments/my"
            className="border border-[#619BB6] text-[#619BB6] rounded-[6px] px-5 py-2.5 text-sm font-medium hover:bg-[#EDF5F8] transition-colors"
          >
            View My Appointments
          </Link>
        </div>
      </div>
    </div>
  )
}
