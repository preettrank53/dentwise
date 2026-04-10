'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  CalendarPlus,
  CalendarCheck,
  Mic,
  User,
  LogOut,
  Stethoscope,
} from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Book Appointment', href: '/appointments', icon: CalendarPlus },
    { label: 'My Appointments', href: '/appointments/my', icon: CalendarCheck },
    { label: 'AI Assistant', href: '/voice', icon: Mic },
    { label: 'Profile', href: '/profile', icon: User },
  ]

  // Improved active state logic to strictly resolve overlapping routes
  const isActive = (href) => {
    // Exact match for the main dashboard entries
    if (href === '/dashboard' || href === '/') {
      return pathname === '/dashboard' || pathname === '/'
    }
    
    // Strict match for base appointments to avoid highlighting when on /appointments/my
    if (href === '/appointments') {
      return pathname === '/appointments'
    }

    // For other routes (Profile, Voice, etc.), startsWith is fine
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 h-screen sticky top-0 bg-white border-r border-gray-100 shrink-0 shadow-sm">
        {/* Logo area */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl gradient-primary shadow-[0_4px_10px_rgba(6,182,212,0.3)]">
            <Stethoscope className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold text-gradient">Dentwise</span>
        </div>

        {/* Nav section */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative',
                  active
                    ? 'bg-cyan-50 text-cyan-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                {/* Active right border pushed to container edge */}
                {active && (
                  <span className="absolute top-0 right-[-12px] bottom-0 w-0.5 bg-cyan-500 rounded-l-full" />
                )}
                <Icon className={cn('h-4 w-4 shrink-0 hover-transition', active ? 'text-cyan-600' : 'text-gray-400 group-hover:text-gray-600')} />
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom user section */}
        <div className="mt-auto">
          <Button
            asChild
            className="gradient-primary text-white rounded-xl mx-3 mb-3 px-4 py-2.5 text-sm font-medium w-[calc(100%-1.5rem)] hidden md:flex h-auto justify-start"
          >
            <Link href="/appointments">
              <CalendarPlus className="mr-2 h-4 w-4" />
              Book Now
            </Link>
          </Button>
          <div className="border-t border-gray-100 p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-9 w-9 rounded-xl border border-gray-100 shadow-sm">
                <AvatarImage src={session?.user?.image} />
                <AvatarFallback className="bg-cyan-50 text-cyan-700 font-bold text-xs rounded-xl">
                  {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {session?.user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500 capitalize truncate">
                  {session?.user?.role?.toLowerCase() || 'patient'}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full text-left text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl px-3 py-2 flex items-center gap-2 transition-colors"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 flex md:hidden items-center justify-around z-50 px-2 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        {navLinks.map((link) => {
          const Icon = link.icon
          const active = isActive(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center justify-center w-full h-full text-center transition-all"
            >
              <Icon className={cn('h-6 w-6 transition-colors', active ? 'text-cyan-600' : 'text-gray-400')} />
            </Link>
          )
        })}
      </nav>
    </>
  )
}
