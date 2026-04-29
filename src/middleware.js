import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const { pathname } = req.nextUrl

  const isAuthRoute = pathname.startsWith('/login')
  const isAdminRoute = pathname.startsWith('/admin')

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  if (isAdminRoute && token) {
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
