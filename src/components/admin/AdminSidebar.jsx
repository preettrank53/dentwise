'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/utils/cn'
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  ArrowLeft,
  LogOut,
  Stethoscope,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function AdminSidebar({ totalPatients = 0, thisMonthCount = 0 }) {
  const pathname = usePathname()
  const { data: session } = useSession()

  const navLinks = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Doctors', href: '/admin/doctors', icon: Users },
    { label: 'Appointments', href: '/admin/appointments', icon: Calendar },
    { label: 'Subscriptions', href: '/admin/subscriptions', icon: CreditCard },
  ]

  const isActive = (href) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  const mobileNavLinks = navLinks.filter(link => link.href !== '/admin/subscriptions')

  return (
    <>
      {/* Desktop Admin Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-gray-900 border-r border-gray-800 text-gray-100 shrink-0">
        
        {/* LOGO SECTION */}
        <div className="px-6 py-5 border-b border-gray-800 flex items-center gap-3">
          <div className="gradient-primary rounded-xl h-8 w-8 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
            <Stethoscope className="h-4 w-4 text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">Dentwise</span>
          <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ml-auto">
            Admin
          </span>
        </div>

        {/* NAV SECTION */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                  active
                    ? 'bg-gray-800 text-white border-l-2 border-cyan-500 pl-[10px]'
                    : 'text-gray-400 hover:bg-gray-800/60 hover:text-gray-200'
                )}
              >
                <Icon className={cn('h-4 w-4 shrink-0', active ? 'text-cyan-400' : 'text-gray-500')} />
                {link.label}
              </Link>
            )
          })}

          {/* DIVIDER SECTION */}
          <div className="mx-3 my-4 border-t border-gray-800" />

          {/* QUICK STATS MINI SECTION */}
          <div className="space-y-2">
            <div className="bg-gray-800 rounded-xl px-3 py-2 mx-3 flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Users className="h-3.5 w-3.5" />
                Total Patients
              </div>
              <span className="text-gray-200 font-medium text-xs">{totalPatients}</span>
            </div>
            
            <div className="bg-gray-800 rounded-xl px-3 py-2 mx-3 flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Calendar className="h-3.5 w-3.5" />
                This Month
              </div>
              <span className="text-gray-200 font-medium text-xs">{thisMonthCount}</span>
            </div>
          </div>
        </nav>

        {/* BOTTOM USER SECTION */}
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-9 w-9 rounded-xl border border-gray-700">
              <AvatarImage src={session?.user?.image} />
              <AvatarFallback className="bg-cyan-500 text-white font-bold text-xs rounded-xl">
                {session?.user?.name?.charAt(0).toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-medium text-gray-200 truncate">
                {session?.user?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500 truncate max-w-[120px]">
                {session?.user?.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to App
            </Link>
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-red-400 transition-colors text-left w-full"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE NAV (Fixed Bottom) */}
      <nav className="fixed bottom-0 left-0 right-0 h-[68px] bg-gray-900 border-t border-gray-800 flex md:hidden items-center justify-around z-50 px-2 pb-safe">
        {mobileNavLinks.map((link) => {
          const Icon = link.icon
          const active = isActive(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex flex-col items-center justify-center p-2 rounded-xl transition-all',
                active ? 'text-cyan-400' : 'text-gray-600 hover:text-gray-400'
              )}
            >
              <Icon className="h-5 w-5" />
            </Link>
          )
        })}
      </nav>
    </>
  )
}
