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

  const mobileNavLinks = navLinks.filter((link) => link.href !== '/admin/subscriptions')

  return (
    <>
      {/* Desktop Admin Sidebar */}
      <aside className="hidden md:flex w-60 bg-[#1A2832] border-r border-[#243542] flex-col h-screen sticky top-0">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-[#243542] flex items-center gap-2.5">
          <div className="bg-[#619BB6] rounded-[8px] h-8 w-8 flex items-center justify-center">
            <Stethoscope className="h-4 w-4 text-white" />
          </div>
          <span className="text-white font-semibold text-lg">Dentwise</span>
          <span className="bg-[#619BB6]/20 text-[#BAD7E1] border border-[#619BB6]/30 rounded-[4px] px-1.5 py-0.5 text-[10px] font-medium ml-auto">
            Admin
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <p className="px-3 mb-2 mt-5 text-[10px] font-semibold text-[#4A6572] uppercase tracking-widest">
            Menu
          </p>

          <div className="space-y-0.5">
            {navLinks.map((link) => {
              const Icon = link.icon
              const active = isActive(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-[6px] text-sm font-medium transition-all duration-150 border-l-2 border-transparent',
                    active
                      ? 'text-white bg-[#243542] border-l-[#619BB6] pl-[10px]'
                      : 'text-[#7A9BAD] hover:bg-[#243542] hover:text-[#BAD7E1]'
                  )}
                >
                  <Icon className={cn('h-[18px] w-[18px]', active ? 'text-[#619BB6]' : 'text-[#4A6572]')} />
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Mini stats */}
          <div className="mx-3 mt-4 mb-2 bg-[#243542] rounded-[8px] p-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-[#4A6572]">Total Patients</span>
              <span className="text-[11px] font-semibold text-[#BAD7E1]">{totalPatients}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-[#4A6572]">This Month</span>
              <span className="text-[11px] font-semibold text-[#BAD7E1]">{thisMonthCount}</span>
            </div>
          </div>
        </nav>

        {/* Bottom user */}
        <div className="border-t border-[#243542] p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 rounded-full border border-[#243542]">
              <AvatarImage src={session?.user?.image} />
              <AvatarFallback className="bg-[#243542] text-[#BAD7E1] text-xs rounded-full">
                {session?.user?.name?.charAt(0).toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#BAD7E1] truncate">{session?.user?.name || 'Admin'}</p>
              <p className="text-xs text-[#4A6572] truncate">{session?.user?.email}</p>
            </div>
          </div>

          <div className="flex gap-2 mt-1 items-center">
            <Link href="/" className="flex items-center gap-1.5 text-xs text-[#4A6572] hover:text-[#BAD7E1] transition-colors">
              <ArrowLeft className="h-3 w-3" />
              Back to App
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-1.5 text-xs text-[#4A6572] hover:text-red-400 ml-auto transition-colors"
            >
              <LogOut className="h-3 w-3" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1A2832] border-t border-[#243542] flex md:hidden h-16 z-50 justify-around items-center">
        {mobileNavLinks.map((link) => {
          const Icon = link.icon
          const active = isActive(link.href)
          return (
            <Link key={link.href} href={link.href} className="flex flex-col items-center gap-1">
              <Icon className={cn('h-5 w-5', active ? 'text-[#619BB6]' : 'text-[#4A6572]')} />
            </Link>
          )
        })}
      </nav>
    </>
  )
}
