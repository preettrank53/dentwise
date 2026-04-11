'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function AdminHeader({ adminName, adminImage }) {
  const pathname = usePathname()

  const getPageTitle = (path) => {
    switch(path) {
      case '/admin': return 'Analytics Dashboard'
      case '/admin/doctors': return 'Doctor Management'
      case '/admin/appointments': return 'Appointments'
      case '/admin/subscriptions': return 'Subscriptions'
      default: return 'Admin Panel'
    }
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="h-16 border-b border-gray-100 bg-white px-6 flex items-center justify-between sticky top-0 z-40">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">{getPageTitle(pathname)}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-sm text-gray-500">{currentDate}</span>
          <span className="h-1 w-1 rounded-full bg-gray-300"></span>
          <span className="text-sm font-medium text-gray-900">{adminName || 'Admin'}</span>
        </div>
        <Avatar className="h-8 w-8 rounded-xl border border-gray-100">
          <AvatarImage src={adminImage} />
          <AvatarFallback className="bg-cyan-500 text-white font-bold text-xs rounded-xl">
            {adminName ? adminName.charAt(0) : 'A'}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
