import React from 'react'
import { PageHeaderSkeleton, TableRowSkeleton } from '@/components/ui/PageSkeleton'

export default function AdminAppointmentsLoading() {
  return (
    <main className="page-container section-padding space-y-6">
      <PageHeaderSkeleton />

      {/* Filter Bar Skeleton */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex gap-3">
        <div className="h-10 flex-1 rounded-xl bg-gray-100 animate-pulse" />
        <div className="h-10 w-40 rounded-xl bg-gray-100 animate-pulse" />
      </div>

      {/* Table Container Skeleton */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="h-12 w-full bg-gray-50 animate-pulse border-b border-gray-100" />
        <div className="divide-y divide-gray-50">
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
        </div>
      </div>
    </main>
  )
}
