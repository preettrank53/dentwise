'use client'

import React from 'react'
import Link from 'next/link'
import { Calendar, CheckCircle, Clock, ChevronRight } from 'lucide-react'

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)
  
  if (seconds < 60) return 'Just now'
  
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
  
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })
}

export default function RecentActivityFeed({ activities = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-full flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Recent Activity</h3>
          <p className="text-sm text-gray-500">Latest appointments</p>
        </div>
        <Link href="/admin/appointments" className="text-sm text-cyan-600 font-medium hover:text-cyan-700 transition-colors">
          View All
        </Link>
      </div>

      {!activities || activities.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center my-auto">
          <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
            <Clock className="h-6 w-6 text-gray-400" />
          </div>
          <p className="font-medium text-gray-900">No recent activity</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {activities.slice(0, 10).map((activity, idx) => {
            const isConfirmed = activity.action === 'CONFIRMED'
            const isCompleted = activity.action === 'COMPLETED'
            
            return (
              <div 
                key={activity.id} 
                className={`flex items-start gap-4 py-3 ${idx !== Math.min(activities.length, 10) - 1 ? 'border-b border-gray-50' : ''}`}
              >
                {/* Left Icon */}
                <div className={`h-9 w-9 shrink-0 rounded-full flex items-center justify-center ${
                  isConfirmed ? 'bg-cyan-50' : isCompleted ? 'bg-green-50' : 'bg-gray-100'
                }`}>
                  {isConfirmed && <Calendar className="h-4 w-4 text-cyan-600" />}
                  {isCompleted && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {!isConfirmed && !isCompleted && <Clock className="h-4 w-4 text-gray-500" />}
                </div>

                {/* Middle Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <p className="text-sm font-medium text-gray-900 truncate pr-2">
                    {activity.patientName} booked with {activity.doctorName}
                    <span className={`inline-flex items-center ml-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isConfirmed ? 'bg-cyan-50 text-cyan-700' :
                      isCompleted ? 'bg-green-50 text-green-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {activity.action}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {getTimeAgo(activity.time)}
                  </p>
                </div>

                {/* Right Arrow */}
                <div className="shrink-0 pt-1 flex items-center justify-center">
                  <ChevronRight className="h-4 w-4 text-gray-300" />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
