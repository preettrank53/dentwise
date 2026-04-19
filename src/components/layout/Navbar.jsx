'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Stethoscope, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const { data: session, status } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/#services' },
    { label: 'Doctors', href: '/#doctors' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Contact', href: '/#contact' },
  ]

  return (
    <header className={cn(
      'fixed top-0 z-50 w-full h-16 transition-all duration-300',
      isScrolled 
        ? 'bg-white/92 backdrop-blur-md border-b border-[#E2EDF2] shadow-[0_1px_0_rgba(26,40,50,0.06)]'
        : 'bg-transparent border-b border-transparent'
    )}>
      <div className="page-container">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-[8px] bg-[#619BB6] flex items-center justify-center">
              <Stethoscope className="h-4 w-4 text-white" />
            </div>
            <span className={cn('text-base font-semibold', isScrolled ? 'text-[#1A2832]' : 'text-[#1A2832]')}>
              Dentwise
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  isScrolled ? 'text-[#4A6572] hover:text-[#1A2832]' : 'text-[#4A6572] hover:text-[#1A2832]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {status === 'loading' ? (
              <div className="h-8 w-20 rounded-[6px] bg-[#EDF5F8] animate-pulse" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer h-8 w-8 rounded-full border border-[#E2EDF2]">
                    <AvatarImage src={session.user?.image} />
                    <AvatarFallback className="bg-[#EDF5F8] text-[#4A7D96] text-xs rounded-full">
                      {session.user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{session.user?.name}</p>
                      <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/appointments">My Appointments</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-destructive focus:text-destructive"
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'rounded-[6px] text-sm font-medium',
                    isScrolled ? 'text-[#4A6572] hover:text-[#1A2832]' : 'text-[#4A6572] hover:text-[#1A2832] hover:bg-[#EDF5F8]'
                  )}
                  asChild
                >
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button
                  size="sm"
                  className={cn(
                    'rounded-[6px] px-4 py-2 text-sm font-medium h-auto border-0',
                    isScrolled
                      ? 'bg-[#619BB6] text-white hover:bg-[#4A7D96]'
                      : 'bg-white text-[#619BB6] hover:bg-[#EDF5F8]'
                  )}
                  asChild
                >
                  <Link href="/login">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className={cn(
              'md:hidden h-9 w-9 rounded-[6px] flex items-center justify-center transition-colors',
              isScrolled ? 'border border-[#E2EDF2]' : 'border border-[#E2EDF2]'
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <X className={cn('h-5 w-5', isScrolled ? 'text-[#4A6572]' : 'text-[#4A6572]')} />
            ) : (
              <Menu className={cn('h-5 w-5', isScrolled ? 'text-[#4A6572]' : 'text-[#4A6572]')} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-b border-[#E2EDF2] px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 px-3 rounded-[6px] text-sm font-medium text-[#4A6572] hover:bg-[#EDF5F8] hover:text-[#1A2832] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[#E2EDF2] flex flex-col gap-2">
              {session ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full py-2 text-sm rounded-[6px] border border-[#619BB6] text-[#619BB6] bg-transparent hover:bg-[#EDF5F8]"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  Sign out
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full py-2 text-sm rounded-[6px] border border-[#619BB6] text-[#619BB6] bg-transparent hover:bg-[#EDF5F8]"
                    asChild
                  >
                    <Link href="/login">Sign in</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="w-full py-2 text-sm rounded-[6px] bg-[#619BB6] text-white hover:bg-[#4A7D96] border-0"
                    asChild
                  >
                    <Link href="/login">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
