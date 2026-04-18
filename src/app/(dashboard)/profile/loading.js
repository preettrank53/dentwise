import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeaderSkeleton } from '@/components/ui/PageSkeleton'

export default function ProfileLoading() {
  return (
    <main className="page-container section-padding space-y-6">
      <PageHeaderSkeleton />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Profile Card) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
          <div className="h-24 w-24 rounded-full bg-gray-200 animate-pulse mx-auto" />
          <Skeleton className="h-5 w-32 rounded mx-auto mt-4" />
          <Skeleton className="h-4 w-48 rounded mx-auto mt-2" />
          
          <div className="grid grid-cols-2 gap-4 w-full border-t border-gray-100 pt-6 mt-6">
            <Skeleton className="h-8 w-16 rounded mx-auto" />
            <Skeleton className="h-8 w-16 rounded mx-auto" />
          </div>
        </div>

        {/* Right Column (Form Fields) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <Skeleton className="h-4 w-24 rounded mb-2" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
            <div>
              <Skeleton className="h-4 w-24 rounded mb-2" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
            <div>
              <Skeleton className="h-4 w-24 rounded mb-2" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
            <div>
              <Skeleton className="h-4 w-24 rounded mb-2" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
