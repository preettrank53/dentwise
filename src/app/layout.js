import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Providers from '@/components/layout/Providers'
import { auth } from '@/lib/auth'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Dentwise — Smart Dental Care',
  description: 'Book appointments, manage your dental health, and get AI-powered dental advice.',
}

export default async function RootLayout({ children }) {
  const session = await auth()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
