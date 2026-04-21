import React from 'react'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AppointmentsTable from '@/components/admin/AppointmentsTable'
import ExportButton from '@/components/admin/ExportButton'

export const metadata = {
  title: 'Appointments — Admin',
  robots: {
    index: false,
    follow: false,
  },
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
        <div className="flex flex-col items-start sm:items-end gap-1">
          <ExportButton />
          <p className="text-xs text-[#A8C4CF]">Exports all appointments</p>
        </div>
      </header>

      <section>
        <AppointmentsTable />
      </section>
    </main>
  )
}
