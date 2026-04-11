import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export default async function AdminLayout({ children }) {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  const isAdmin = session.user?.email === process.env.ADMIN_EMAIL
  if (!isAdmin) {
    redirect('/')
  }

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [totalUsers, thisMonthAppointments] = await Promise.all([
    prisma.user.count(),
    prisma.appointment.count({ where: { dateTime: { gte: startOfMonth } } })
  ])

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <AdminSidebar 
        totalPatients={totalUsers} 
        thisMonthCount={thisMonthAppointments} 
      />

      {/* Main Administrative Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0">
        
        {/* Dynamic Client Header */}
        <AdminHeader 
          adminName={session.user?.name} 
          adminImage={session.user?.image} 
        />

        {/* Dynamic Admin View */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto w-full px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
