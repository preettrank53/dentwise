import React from 'react'

export default function BillingLoading() {
  return (
    <main className="page-container section-padding space-y-8">
      {/* Dark Hero Skeleton */}
      <div className="-mt-8 h-64 w-full bg-gray-800 animate-pulse rounded-b-none" />

      {/* 3 Pricing Card Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-8 h-96 animate-pulse bg-gray-50" />
        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-8 h-96 animate-pulse bg-gray-50" />
        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-8 h-96 animate-pulse bg-gray-50" />
      </div>

      {/* FAQ Skeleton */}
      <div className="space-y-4 pt-8">
        <div className="h-24 w-full rounded-[12px] bg-gray-100 animate-pulse" />
        <div className="h-24 w-full rounded-[12px] bg-gray-100 animate-pulse" />
        <div className="h-24 w-full rounded-[12px] bg-gray-100 animate-pulse" />
      </div>
    </main>
  )
}
