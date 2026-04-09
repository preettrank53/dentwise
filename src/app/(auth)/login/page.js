'use client'

import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Stethoscope } from 'lucide-react'

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cyan-50/30 p-4">
      <Card className="w-full max-w-md border shadow-xl bg-white">
        <CardHeader className="flex flex-col items-center gap-4 pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-sm text-muted-foreground max-w-[280px]">
              Sign in to manage your dental appointments and AI consultations
            </p>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-6 pt-2">
          <Separator />

          <Button
            size="lg"
            variant="outline"
            className="w-full h-12 flex items-center gap-3 font-medium border-gray-200 hover:bg-gray-50 transition-all active:scale-[0.98]"
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Continue with Google
          </Button>

          <div className="text-center px-4">
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              By signing in, you agree to our{' '}
              <a href="/terms" className="underline hover:text-cyan-600">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="underline hover:text-cyan-600">Privacy Policy</a>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
