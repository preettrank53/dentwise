import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeaderSkeleton } from '@/components/ui/PageSkeleton'

export default function ProfileLoading() {
  return (
    <main className="page-container section-padding space-y-6">
      <PageHeaderSkeleton />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-6 text-center">
          <div className="h-24 w-24 rounded-[12px] bg-[#E2EDF2] animate-pulse mx-auto" />
          <Skeleton className="h-5 w-32 rounded mx-auto mt-4" />
          <Skeleton className="h-4 w-48 rounded mx-auto mt-2" />
          
          <div className="grid grid-cols-2 gap-4 w-full border-t border-[#E2EDF2] pt-6 mt-6">
            <Skeleton className="h-8 w-16 rounded mx-auto" />
            <Skeleton className="h-8 w-16 rounded mx-auto" />
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-6">
          <div className="space-y-6">
            <div>
              <Skeleton className="h-4 w-24 rounded mb-2" />
              <Skeleton className="h-11 w-full rounded-[6px]" />
            </div>
            <div>
              <Skeleton className="h-4 w-24 rounded mb-2" />
              <Skeleton className="h-11 w-full rounded-[6px]" />
            </div>
            <div>
              <Skeleton className="h-4 w-24 rounded mb-2" />
              <Skeleton className="h-11 w-full rounded-[6px]" />
            </div>
            <div>
              <Skeleton className="h-4 w-24 rounded mb-2" />
              <Skeleton className="h-11 w-full rounded-[6px]" />
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
