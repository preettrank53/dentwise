import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const isLoggedIn = !!token

  const { pathname } = req.nextUrl

  const isAuthRoute = pathname.startsWith('/login')
  const isDashboardRoute =
    pathname.startsWith('/appointments') ||
    pathname.startsWith('/voice') ||
    pathname.startsWith('/profile')
  const isAdminRoute = pathname.startsWith('/admin')

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (isAdminRoute && isLoggedIn) {
    const userEmail = token?.email
    const adminEmail = process.env.ADMIN_EMAIL
    if (userEmail !== adminEmail) {
      return NextResponse.redirect(new URL('/', req.nextUrl))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
