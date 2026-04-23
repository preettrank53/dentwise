'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <main className="min-h-screen bg-[#F8FAFB] flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="h-16 w-16 mx-auto bg-[#FDF2F2] rounded-[12px] p-4 flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-[#C0392B]" />
        </div>

        <h1 className="text-2xl font-semibold text-[#1A2832] mt-6">Something Went Wrong</h1>
        <p className="text-sm text-[#7A9BAD] leading-relaxed mt-2">
          An unexpected error occurred. Our team has been notified.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left bg-white border border-[#E2EDF2] rounded-[8px] p-3">
            <summary className="text-sm text-[#4A6572] cursor-pointer">Error details</summary>
            <pre className="mt-2 text-xs text-[#4A6572] whitespace-pre-wrap break-words">
              {error?.message}
              {'\n\n'}
              {error?.stack}
            </pre>
          </details>
        )}

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
    </main>
  )
}
