import React from 'react'
import { PageHeaderSkeleton, TableRowSkeleton } from '@/components/ui/PageSkeleton'

export default function AdminSubscriptionsLoading() {
  return (
    <main className="page-container section-padding space-y-6">
      <PageHeaderSkeleton />

      {/* 3 Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-32 w-full rounded-2xl bg-gray-100 animate-pulse" />
        <div className="h-32 w-full rounded-2xl bg-gray-100 animate-pulse" />
        <div className="h-32 w-full rounded-2xl bg-gray-100 animate-pulse" />
      </div>

      {/* Table Container Skeleton */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm mt-6">
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
