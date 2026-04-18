import React from 'react'
import { PageHeaderSkeleton, TableRowSkeleton } from '@/components/ui/PageSkeleton'

export default function AdminDoctorsLoading() {
  return (
    <main className="page-container section-padding space-y-6">
      <PageHeaderSkeleton />

      {/* Table Container Skeleton */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {/* Header Row */}
        <div className="h-12 w-full bg-gray-50 animate-pulse border-b border-gray-100" />
        
        {/* Table Rows */}
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
