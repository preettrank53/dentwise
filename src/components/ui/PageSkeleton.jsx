import React from 'react'
import { Skeleton } from './skeleton'

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="h-10 w-10 rounded-xl bg-gray-200" />
        <Skeleton className="h-4 w-20 rounded" />
      </div>
      <div>
        <Skeleton className="h-8 w-16 rounded-lg mb-2" />
        <Skeleton className="h-3 w-24 rounded" />
      </div>
    </div>
  )
}

export function AppointmentCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-xl bg-gray-200 shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32 rounded" />
        <Skeleton className="h-3 w-48 rounded" />
      </div>
      <Skeleton className="h-6 w-20 rounded-full shrink-0" />
    </div>
  )
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-50">
      <Skeleton className="h-10 w-10 rounded-xl bg-gray-200 shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32 rounded" />
        <Skeleton className="h-3 w-24 rounded" />
      </div>
      <Skeleton className="h-6 w-20 rounded-full shrink-0 mx-4" />
      <Skeleton className="h-8 w-24 rounded-xl shrink-0" />
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <Skeleton className="h-5 w-40 rounded mb-1" />
      <Skeleton className="h-3 w-24 rounded" />
      <div className="mt-6 h-64 w-full rounded-xl bg-gray-100 animate-pulse" />
    </div>
  )
}

export function PageHeaderSkeleton() {
  return (
    <div className="flex justify-between items-start mb-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 rounded-xl" />
        <Skeleton className="h-4 w-64 rounded" />
      </div>
      <Skeleton className="h-10 w-32 rounded-xl" />
    </div>
  )
}
