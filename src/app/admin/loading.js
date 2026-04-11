import React from 'react'

export default function AdminLoading() {
  return (
    <div className="space-y-8">
      {/* HEADER SKELETON */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="space-y-2 text-right">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse ml-auto" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse ml-auto" />
        </div>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 rounded-2xl animate-pulse bg-gray-100 border border-gray-100" />
        ))}
      </div>

      {/* CHARTS ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="h-80 rounded-2xl animate-pulse bg-gray-100 lg:col-span-2 border border-gray-100" />
        <div className="h-80 rounded-2xl animate-pulse bg-gray-100 lg:col-span-1 border border-gray-100" />
      </div>

      {/* CHARTS ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64 rounded-2xl animate-pulse bg-gray-100 border border-gray-100" />
        <div className="h-64 rounded-2xl animate-pulse bg-gray-100 border border-gray-100" />
      </div>
    </div>
  )
}
