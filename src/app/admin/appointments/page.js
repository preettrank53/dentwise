import React from 'react'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AppointmentsTable from '@/components/admin/AppointmentsTable'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export const metadata = {
  title: 'Appointments — Dentwise Admin',
  description: 'Manage all clinic appointments and update their status.',
}

export default async function AdminAppointmentsPage() {
  const session = await auth()

  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    redirect('/')
  }

  return (
    <main className="p-4 md:p-8 space-y-6 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all clinic appointments</p>
        </div>
        <Button variant="outline" className="rounded-xl font-medium border-gray-200 shadow-sm">
          <Download className="h-4 w-4 mr-2 text-gray-500" />
          Export
        </Button>
      </header>

      <section>
        <AppointmentsTable />
      </section>
    </main>
  )
}
