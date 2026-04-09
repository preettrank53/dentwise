import React from 'react'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import BookingWizard from '@/components/appointments/BookingWizard'

export const metadata = {
  title: 'Book Appointment | Dentwise',
  description: 'Schedule your next dental visit with our expert doctors.',
}

export default async function AppointmentsPage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <main className="page-container section-padding min-h-screen">
      <header className="mb-12 text-center sm:text-left">
        <h1 className="text-4xl font-black italic text-primary mb-2">
          Book an Appointment
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Schedule your next dental visit in minutes. Choose your preferred doctor 
          and find a time that works best for you.
        </p>
      </header>

      <section className="animate-in fade-in duration-700">
        <BookingWizard />
      </section>
    </main>
  )
}
