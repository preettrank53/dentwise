import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeaderSkeleton } from '@/components/ui/PageSkeleton'

export default function VoiceLoading() {
  return (
    <main className="page-container section-padding space-y-6">
      <PageHeaderSkeleton />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-8 text-center flex flex-col items-center">
          <div className="h-28 w-28 rounded-[12px] bg-[#E2EDF2] animate-pulse mx-auto" />
          <Skeleton className="h-5 w-20 rounded mx-auto mt-4" />
          <Skeleton className="h-4 w-28 rounded mx-auto mt-2" />
          
          <div className="h-24 w-24 rounded-[12px] bg-[#F8FAFB] border border-[#E2EDF2] animate-pulse mx-auto mt-6" />
          <div className="h-12 w-44 rounded-[6px] bg-[#E2EDF2] animate-pulse mx-auto mt-4" />
        </div>

        <div className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-4">
          <Skeleton className="h-5 w-36 rounded mb-4" />
          <div className="h-64 w-full rounded-[8px] bg-[#F8FAFB] animate-pulse" />
          
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="h-10 w-36 rounded-[6px] bg-[#E2EDF2] animate-pulse" />
            <div className="h-10 w-36 rounded-[6px] bg-[#E2EDF2] animate-pulse" />
            <div className="h-10 w-36 rounded-[6px] bg-[#E2EDF2] animate-pulse" />
            <div className="h-10 w-36 rounded-[6px] bg-[#E2EDF2] animate-pulse" />
          </div>
        </div>

      </div>
    </main>
  )
}
