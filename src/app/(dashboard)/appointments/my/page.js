import React from 'react'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import UserAppointmentsList from '@/components/appointments/UserAppointmentsList'

export const metadata = {
  title: 'My Appointments — Dentwise',
  description: 'View and manage your scheduled dental appointments.',
}

export default async function MyAppointmentsPage() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect('/login')
  }

  return (
    <main className="page-container section-padding min-h-screen animate-in fade-in duration-700">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black italic text-primary mb-2">
            My Appointments
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your dental visits.
          </p>
        </div>
        <Button 
          asChild 
          className="gradient-primary text-white rounded-xl px-6 shadow-md shadow-cyan-100 hover:shadow-lg transition-all"
        >
          <Link href="/appointments">
            <Plus className="mr-2 h-5 w-5" />
            Book New
          </Link>
        </Button>
      </header>

      <section>
        <UserAppointmentsList />
      </section>
    </main>
  )
}
