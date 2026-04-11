import React from 'react'

export default function VoiceLoading() {
  return (
    <div className="page-container pb-20 pt-8">
      
      {/* HEADER SKELETON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="h-8 w-32 bg-gray-200 rounded-full animate-pulse" />
      </div>

      {/* TWO COLUMN MATCHING LAYOUT SKELETON */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center gap-5">
            <div className="h-28 w-28 rounded-full bg-gray-200 animate-pulse mx-auto" />
            <div className="space-y-2 flex flex-col items-center">
              <div className="h-5 w-24 bg-gray-200 rounded-xl animate-pulse" />
              <div className="h-4 w-32 bg-gray-200 rounded-xl animate-pulse" />
            </div>
            
            <div className="h-24 w-24 animate-pulse mt-4" /> {/* waveform space */}
            
            <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse mx-auto mt-2" />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center mb-3">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-80 w-full rounded-2xl bg-gray-100 animate-pulse" />
          
          <div className="mt-2 space-y-3">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="flex flex-wrap gap-2">
              <div className="h-10 w-48 rounded-xl bg-gray-100 animate-pulse" />
              <div className="h-10 w-56 rounded-xl bg-gray-100 animate-pulse" />
              <div className="h-10 w-40 rounded-xl bg-gray-100 animate-pulse" />
              <div className="h-10 w-44 rounded-xl bg-gray-100 animate-pulse" />
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
