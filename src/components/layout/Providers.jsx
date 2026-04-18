'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'
import { useState } from 'react'

export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position="bottom-right"
          expand={false}
          richColors
          toastOptions={{
            style: {
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              fontSize: '14px',
            },
            classNames: {
              toast: 'font-sans',
              title: 'font-semibold',
              description: 'text-gray-500',
            },
          }}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  )
}
