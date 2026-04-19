'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useGetUserSubscription } from '@/hooks/useStripe'
import {
  LayoutDashboard,
  CalendarPlus,
  CalendarCheck,
  Mic,
  User,
  LogOut,
  Stethoscope,
  CreditCard
} from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { data: subscription, isLoading, isError } = useGetUserSubscription()
  const currentPlan = (isLoading || isError || !subscription) ? 'FREE' : subscription.plan

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Book Appointment', href: '/appointments', icon: CalendarPlus },
    { label: 'My Appointments', href: '/appointments/my', icon: CalendarCheck },
    { label: 'Billing', href: '/billing', icon: CreditCard },
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
      <aside className="hidden md:flex w-60 bg-white border-r border-[#E2EDF2] flex-col h-screen sticky top-0 shrink-0">
        {/* Logo area */}
        <div className="px-6 py-5 border-b border-[#E2EDF2] flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-[8px] bg-[#619BB6] flex items-center justify-center">
            <Stethoscope className="h-4 w-4 text-white" />
          </div>
          <span className="text-[#1A2832] font-semibold text-lg">Dentwise</span>
        </div>

        {/* Nav section */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          <p className="px-3 mb-2 mt-1 text-[10px] font-semibold text-[#A8C4CF] uppercase tracking-widest">
            Navigation
          </p>
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'sidebar-link',
                  active && 'active'
                )}
              >
                <Icon className={cn('h-[18px] w-[18px] shrink-0', active ? 'text-[#619BB6]' : 'text-[#7A9BAD]')} />
                <span className={cn('text-sm font-medium', active ? 'text-[#619BB6]' : 'text-[#4A6572]')}>
                  {link.label}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom user section */}
        <div className="mt-auto border-t border-[#E2EDF2] p-4 space-y-3">
          <Link
            href="/appointments"
            className="mx-3 mb-3 mt-2 border border-[#619BB6] text-[#619BB6] bg-transparent hover:bg-[#EDF5F8] rounded-[6px] py-2 px-4 text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <CalendarPlus className="h-4 w-4" />
            Book Appointment
          </Link>

          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={session?.user?.image} />
                <AvatarFallback className="bg-[#EDF5F8] text-[#4A7D96] font-semibold text-xs rounded-full">
                  {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-medium text-[#1A2832] truncate">{session?.user?.name || 'User'}</p>
              <p className="text-xs text-[#7A9BAD] capitalize truncate">{session?.user?.role?.toLowerCase() || 'patient'}</p>
            </div>
          </div>

          <span className={cn('badge', currentPlan === 'FREE' ? 'badge-free' : 'badge-basic')}>
            {currentPlan === 'FREE' ? 'Free' : 'Basic'}
          </span>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="btn-ghost w-full justify-start text-xs text-[#7A9BAD] hover:text-[#C0392B] hover:bg-[#FDF2F2]"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2EDF2] flex md:hidden h-16 z-50 justify-around items-center px-2">
        {navLinks.map((link) => {
          const Icon = link.icon
          const active = isActive(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2 min-h-[44px]"
            >
              <Icon className={cn('h-5 w-5', active ? 'text-[#619BB6]' : 'text-[#A8C4CF]')} />
              {active && (
                <span className="text-[10px] font-medium text-[#619BB6]">
                  {link.label.split(' ')[0]}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
