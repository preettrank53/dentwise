'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function DashboardError({ error, reset }) {
  useEffect(() => {
    console.error('Dashboard error:', error)
  }, [error])

  return (
    <div className="min-h-[70vh] bg-[#F8FAFB] px-4">
      <div className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-sm p-10 max-w-md mx-auto mt-16 text-center">
        <div className="h-16 w-16 mx-auto bg-[#FDF2F2] rounded-[12px] p-4 flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-[#C0392B]" />
        </div>
        <h1 className="text-2xl font-semibold text-[#1A2832] mt-6">Dashboard Error</h1>
        <p className="text-sm text-[#7A9BAD] leading-relaxed mt-2">
          Something went wrong loading your dashboard. Please try again.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-[#619BB6] text-white rounded-[6px] px-5 py-2.5 text-sm font-medium hover:bg-[#4A7D96] transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border border-[#619BB6] text-[#619BB6] rounded-[6px] px-5 py-2.5 text-sm font-medium hover:bg-[#EDF5F8] transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
