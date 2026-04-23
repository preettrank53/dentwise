import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeaderSkeleton, StatCardSkeleton, AppointmentCardSkeleton } from '@/components/ui/PageSkeleton'

export default function DashboardLoading() {
  return (
    <main className="page-container section-padding space-y-6">
      <PageHeaderSkeleton />
      
      {/* Welcome Banner Skeleton */}
      <div className="h-40 w-full rounded-[12px] bg-gray-200 animate-pulse" />

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Quick Actions Skeleton */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-12 w-full rounded-xl bg-gray-100 animate-pulse" />
        <div className="h-12 w-full rounded-xl bg-gray-100 animate-pulse" />
      </div>

      {/* Recent Appointments */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-48 rounded" />
        <AppointmentCardSkeleton />
        <AppointmentCardSkeleton />
        <AppointmentCardSkeleton />
      </div>
    </main>
  )
}
