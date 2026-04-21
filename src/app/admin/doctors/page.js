import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import DoctorsTable from '@/components/admin/DoctorsTable'
import DoctorManagementHeader from '@/components/admin/DoctorManagementHeader'

export const metadata = {
  title: 'Doctor Management — Admin',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminDoctorsPage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  const isAdmin = session.user?.email === process.env.ADMIN_EMAIL
  if (!isAdmin) {
    redirect('/')
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <DoctorManagementHeader />

      <div className="bg-white rounded-xl shadow-sm border p-1">
        <DoctorsTable />
      </div>
    </div>
  )
}
