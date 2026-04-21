import { DM_Sans } from 'next/font/google'
import './globals.css'
import Providers from '@/components/layout/Providers'

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: '#619BB6',
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: '#1A2832',
    },
  ],
}

export const metadata = {
  title: {
    template: '%s — Dentwise',
    default: 'Dentwise — Smart Dental Care',
  },
  description: 'Book appointments with certified dental specialists, get AI-powered dental advice, and manage your oral health — all in one platform.',
  keywords: [
    'dental clinic',
    'dentist appointment',
    'online booking',
    'dental care',
    'AI dental assistant',
    'teeth whitening',
    'orthodontics',
    'dental implants',
  ],
  authors: [{ name: 'Dentwise' }],
  creator: 'Dentwise',
  publisher: 'Dentwise',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  // TODO: Replace /og-image.png with a professionally designed 1200x630 image before production launch.
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Dentwise',
    title: 'Dentwise — Smart Dental Care',
    description: 'Book appointments with certified dental specialists and get AI-powered dental advice.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dentwise — Smart Dental Care Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dentwise — Smart Dental Care',
    description: 'Book dental appointments and get AI-powered advice with Riley.',
    images: ['/og-image.png'],
    creator: '@dentwise',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-icon',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'add-your-google-verification-code',
  },
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
