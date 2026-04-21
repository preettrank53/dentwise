import LoginPageClient from '@/components/auth/LoginPageClient'

export const metadata = {
  title: 'Sign In',
  description: 'Sign in to Dentwise to book appointments and manage your dental health.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginPage() {
  return <LoginPageClient />
}
