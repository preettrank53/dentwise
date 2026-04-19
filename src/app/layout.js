import { DM_Sans } from 'next/font/google'
import './globals.css'
import Providers from '@/components/layout/Providers'

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Dentwise — Smart Dental Care',
  description: 'Book appointments, manage your dental health, and get AI-powered dental advice.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
