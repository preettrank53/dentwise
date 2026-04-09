import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/utils/cn'

export default async function AdminLayout({ children }) {
  const session = await auth()

  // 1. Strict Server-side Access Control
  if (!session) {
    redirect('/login')
  }

  const isAdmin = session.user?.email === process.env.ADMIN_EMAIL
  if (!isAdmin) {
    redirect('/')
  }

  // Current Date Formatting
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Administrative Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0">
        
        {/* Top bar header */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-4 md:px-8 border-gray-200/60 sticky top-0 z-40">
          <div className="flex flex-col">
            <h1 className="font-bold text-gray-900 tracking-tight">Admin Control Panel</h1>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest leading-none mt-0.5">
              System Management
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end mr-2">
              <p className="text-xs font-semibold text-gray-500">{currentDate}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">System Online</span>
              </div>
            </div>
            
            <div className="h-8 w-[1px] bg-gray-200 hidden lg:block" />
            
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border-2 border-white shadow-sm ring-1 ring-gray-100">
                <AvatarImage src={session.user?.image} />
                <AvatarFallback className="bg-cyan-500 text-white font-bold text-xs">
                  {session.user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dynamic Admin View */}
        <main className="flex-1 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
