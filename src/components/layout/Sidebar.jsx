'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  LayoutDashboard,
  Calendar,
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
    { label: 'Appointments', href: '/appointments', icon: Calendar },
    { label: 'AI Assistant', href: '/voice', icon: Mic },
    { label: 'Profile', href: '/profile', icon: User },
  ]

  const isActive = (href) => {
    if (href === '/' && pathname !== '/') return false
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 h-screen sticky top-0 border-r bg-white p-4 shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 py-4 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary shadow-sm">
            <Stethoscope className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold text-gradient">Dentwise</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group',
                  active
                    ? 'gradient-primary text-white shadow-md shadow-cyan-100'
                    : 'text-muted-foreground hover:bg-gray-50 hover:text-foreground'
                )}
              >
                <Icon className={cn('h-4 w-4 shrink-0', active ? 'text-white' : 'group-hover:text-cyan-600')} />
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="mt-auto flex flex-col gap-4">
          <Separator />
          <div className="flex items-center gap-3 px-2">
            <Avatar className="h-9 w-9 border">
              <AvatarImage src={session?.user?.image} />
              <AvatarFallback className="gradient-primary text-white text-xs">
                {session?.user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-semibold truncate">
                {session?.user?.name || 'User'}
              </p>
              <p className="text-[10px] text-muted-foreground truncate uppercase tracking-wider font-bold">
                {session?.user?.role || 'Patient'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/5 gap-3"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex md:hidden items-center justify-around z-50 px-2 pb-safe">
        {navLinks.map((link) => {
          const Icon = link.icon
          const active = isActive(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 w-full h-full text-[10px] font-medium transition-all',
                active ? 'text-cyan-600' : 'text-muted-foreground'
              )}
            >
              <div className={cn(
                'flex items-center justify-center w-10 h-10 rounded-xl transition-all',
                active ? 'bg-cyan-50' : ''
              )}>
                <Icon className={cn('h-5 w-5', active ? 'text-cyan-600' : '')} />
              </div>
            </Link>
          )
        })}
        {/* Mobile Profile/SignOut Toggle shortcut or Avatar can go here */}
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex flex-col items-center justify-center w-full h-full"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl">
            <LogOut className="h-5 w-5 text-muted-foreground" />
          </div>
        </button>
      </nav>
    </>
  )
}
