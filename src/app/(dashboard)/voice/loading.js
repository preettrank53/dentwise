import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeaderSkeleton } from '@/components/ui/PageSkeleton'

export default function VoiceLoading() {
  return (
    <main className="page-container section-padding space-y-6">
      <PageHeaderSkeleton />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column (Riley Panel) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center flex flex-col items-center">
          <div className="h-28 w-28 rounded-full bg-gray-200 animate-pulse mx-auto" />
          <Skeleton className="h-5 w-20 rounded mx-auto mt-4" />
          <Skeleton className="h-4 w-28 rounded mx-auto mt-2" />
          
          <div className="h-24 w-24 rounded-full bg-gray-100 animate-pulse mx-auto mt-6" />
          <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse mx-auto mt-4" />
        </div>

        {/* Right Column (Transcript & Suggestions) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <Skeleton className="h-5 w-36 rounded mb-4" />
          <div className="h-64 w-full rounded-xl bg-gray-50 animate-pulse" />
          
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="h-10 w-36 rounded-xl bg-gray-100 animate-pulse" />
            <div className="h-10 w-36 rounded-xl bg-gray-100 animate-pulse" />
            <div className="h-10 w-36 rounded-xl bg-gray-100 animate-pulse" />
            <div className="h-10 w-36 rounded-xl bg-gray-100 animate-pulse" />
          </div>
        </div>

      </div>
    </main>
  )
}
