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
  ChevronRight,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const navLinks = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Doctors', href: '/admin/doctors', icon: Users },
    { label: 'Appointments', href: '/admin/appointments', icon: Calendar },
    { label: 'Subscriptions', href: '/admin/subscriptions', icon: CreditCard },
  ]

  const isActive = (href) => {
    if (href === '/admin' && pathname !== '/admin') return false
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop Admin Sidebar */}
      <aside className="hidden md:flex flex-col w-60 h-screen sticky top-0 bg-gray-900 text-white p-4 shrink-0 transition-all border-r border-gray-800">
        {/* Logo & Admin Badge */}
        <div className="flex items-center gap-2 px-2 py-6 mb-4 mt-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 shadow-lg shadow-cyan-500/20">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white leading-none">Dentwise</span>
            <div className="mt-1">
              <Badge variant="outline" className="text-[10px] h-4 py-0 px-1.5 border-cyan-500/50 text-cyan-400 bg-cyan-500/5 font-extrabold uppercase">
                Admin Panel
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1.5 mt-4">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-2">Main Menu</p>
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group',
                  active
                    ? 'bg-white text-gray-900 shadow-xl shadow-black/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                )}
              >
                <Icon className={cn('h-4 w-4 shrink-0 transition-transform group-hover:scale-110', active ? 'text-gray-900 font-bold' : '')} />
                {link.label}
                {active && <ChevronRight className="ml-auto h-3 w-3 opacity-50" />}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto flex flex-col gap-4">
          <Separator className="bg-gray-800" />
          <div className="flex items-center gap-3 px-2">
            <Avatar className="h-9 w-9 border-2 border-gray-800">
              <AvatarImage src={session?.user?.image} />
              <AvatarFallback className="bg-cyan-500 text-white text-xs font-bold">
                {session?.user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-semibold truncate leading-none">
                {session?.user?.name || 'Admin'}
              </p>
              <p className="text-[10px] text-gray-500 truncate mt-1">
                {session?.user?.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="justify-center text-gray-400 hover:text-white hover:bg-gray-800 gap-2 text-[11px] h-9 px-0"
            >
              <Link href="/">
                <ArrowLeft className="h-3 w-3" />
                App
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut({ callbackUrl: '/' })}
              className="justify-center text-gray-400 hover:text-red-400 hover:bg-red-500/10 gap-2 text-[11px] h-9 px-0"
            >
              <LogOut className="h-3 w-3" />
              Sign out
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-gray-900 border-t border-gray-800 flex md:hidden items-center justify-around z-50 px-2 pb-safe">
        {navLinks.map((link) => {
          const Icon = link.icon
          const active = isActive(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 w-full h-full text-[10px] font-medium transition-all',
                active ? 'text-white' : 'text-gray-500'
              )}
            >
              <div className={cn(
                'flex items-center justify-center w-10 h-10 rounded-xl transition-all',
                active ? 'bg-gray-800 text-cyan-400' : ''
              )}>
                <Icon className="h-5 w-5" />
              </div>
            </Link>
          )
        })}
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex flex-col items-center justify-center w-full h-full text-gray-500"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl">
            <LogOut className="h-5 w-5" />
          </div>
        </button>
      </nav>
    </>
  )
}
