import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import Sidebar from '@/components/layout/Sidebar'
import { Bell } from 'lucide-react'

export default async function DashboardLayout({ children }) {
  const session = await auth()

  if (!session?.user?.email) {
    redirect('/login')
  }

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const firstName = session.user?.name?.split(' ')[0] || 'User'

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFB]">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-[#E2EDF2] px-6 flex items-center justify-between shrink-0">
          <p className="text-sm font-medium text-[#1A2832] truncate">
            {greeting}, {firstName}
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-9 w-9 rounded-[6px] border border-[#E2EDF2] bg-white hover:bg-[#EDF5F8] flex items-center justify-center transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-[18px] w-[18px] text-[#7A9BAD]" />
            </button>

            <div className="h-8 w-8 rounded-full border border-[#E2EDF2] overflow-hidden shrink-0 bg-white">
              {session.user?.image ? (
                <img src={session.user.image} alt={session.user.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-[#EDF5F8] text-[#4A7D96] font-semibold text-xs">
                  {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFB] pb-20 md:pb-0">
          <div className="max-w-6xl mx-auto w-full px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
