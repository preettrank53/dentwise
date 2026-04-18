import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import Sidebar from '@/components/layout/Sidebar'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function DashboardLayout({ children }) {
  const session = await auth()

  if (!session?.user?.email) {
    redirect('/login')
  }

  // Determine greeting based on time of day
  const hour = new Date().getHours()
  let greeting = 'Good morning'
  if (hour >= 12 && hour < 17) greeting = 'Good afternoon'
  else if (hour >= 17) greeting = 'Good evening'

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50/50">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        
        {/* Top Header */}
        <header className="h-14 md:h-16 border-b border-gray-100 bg-white px-4 md:px-6 flex items-center justify-between sticky top-0 z-40 shrink-0 shadow-sm">
          <div className="flex flex-col min-w-0">
            <h1 className="font-bold text-base md:text-lg text-gray-900 truncate max-w-[150px] sm:max-w-none">
              {greeting}, {session.user?.name?.split(' ')[0]}
            </h1>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <Button variant="ghost" size="icon" className="relative text-gray-500 h-8 w-8 md:h-9 md:w-9 rounded-xl hover:bg-gray-50 border border-gray-100 shadow-sm transition-all">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </Button>
            <div className="h-8 w-8 md:h-9 md:w-9 rounded-xl border border-gray-100 overflow-hidden shadow-sm shrink-0 bg-gray-50">
              {session.user?.image ? (
                <img src={session.user.image} alt={session.user.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-cyan-50 text-cyan-700 font-bold text-xs md:text-sm">
                  {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 pb-20 md:pb-0">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
