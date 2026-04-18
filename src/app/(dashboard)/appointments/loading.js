import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeaderSkeleton } from '@/components/ui/PageSkeleton'

export default function AppointmentsLoading() {
  return (
    <main className="page-container section-padding space-y-6">
      <PageHeaderSkeleton />

      {/* Progress Indicator Skeleton */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-0.5 w-24 bg-gray-200" />
        <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-0.5 w-24 bg-gray-200" />
        <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
      </div>

      {/* Main Wizard Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="h-96 w-full bg-gray-50 animate-pulse rounded-xl" />
      </div>
    </main>
  )
}
