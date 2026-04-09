import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import Sidebar from '@/components/layout/Sidebar'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function DashboardLayout({ children }) {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  // Determine greeting based on time of day
  const hour = new Date().getHours()
  let greeting = 'Good morning'
  if (hour >= 12 && hour < 17) greeting = 'Good afternoon'
  else if (hour >= 17) greeting = 'Good evening'

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0">
        
        {/* Top Header */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
          <div className="flex flex-col">
            <h1 className="font-bold text-lg hidden md:block">
              {greeting}, {session.user?.name?.split(' ')[0]}
            </h1>
            <p className="text-xs text-muted-foreground md:hidden">
              {greeting}, {session.user?.name?.split(' ')[0]}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </Button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
