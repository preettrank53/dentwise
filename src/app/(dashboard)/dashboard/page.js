import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Calendar,
  Clock,
  CheckCircle,
  Crown,
  CalendarPlus,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'Dashboard',
  description: 'Your Dentwise dashboard. View upcoming appointments and manage your dental health.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect('/login')
  }

  // Get user from DB
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) redirect('/login')

  // Parallel Fetching
  const [
    totalCount,
    upcomingCount,
    completedCount,
    subscription,
    recentAppointments
  ] = await Promise.all([
    prisma.appointment.count({ where: { userId: user.id } }),
    prisma.appointment.count({ where: { userId: user.id, status: 'CONFIRMED' } }),
    prisma.appointment.count({ where: { userId: user.id, status: 'COMPLETED' } }),
    prisma.subscription.findUnique({ where: { userId: user.id } }),
    prisma.appointment.findMany({
      where: { userId: user.id },
      include: { doctor: true },
      orderBy: { dateTime: 'desc' },
      take: 3
    })
  ])

  const stats = [
    {
      label: 'Total Appointments',
      value: totalCount.toString(),
      icon: Calendar,
    },
    {
      label: 'Upcoming',
      value: upcomingCount.toString(),
      icon: Clock,
    },
    {
      label: 'Completed',
      value: completedCount.toString(),
      icon: CheckCircle,
    },
    {
      label: 'Sub Plan',
      value: subscription?.plan || 'FREE',
      icon: Crown,
    },
  ]

  const currentPlan = subscription?.plan || 'FREE'
  const showUpgradeStrip = currentPlan === 'FREE' || currentPlan === 'BASIC'

  const statusClassMap = {
    CONFIRMED: 'badge-confirmed',
    COMPLETED: 'badge-completed',
    CANCELLED: 'badge-cancelled',
    PAST_DUE: 'badge-past-due',
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <section className="bg-white rounded-[12px] border border-[#E2EDF2] border-l-4 border-l-[#619BB6] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#619BB6] mb-2">
            Welcome back
          </p>
          <h1 className="text-2xl font-semibold text-[#1A2832] tracking-tight">
            {session.user?.name || 'Patient'}
          </h1>
          <p className="text-sm text-[#4A6572] mt-1">
            {upcomingCount > 0
              ? `You have ${upcomingCount} upcoming appointment${upcomingCount > 1 ? 's' : ''}.`
              : 'Ready to book your next appointment?'}
          </p>
        </div>

        <Avatar className="h-14 w-14 rounded-full border-2 border-[#E2EDF2] shrink-0">
          <AvatarImage src={session.user?.image} />
          <AvatarFallback className="bg-[#EDF5F8] text-[#4A7D96] font-semibold rounded-full">
            {session.user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </section>

      {/* Stat Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <article key={stat.label} className="stat-card">
              <div className="stat-icon bg-[#EDF5F8] text-[#619BB6]">
                <Icon className="h-5 w-5 text-[#619BB6]" />
              </div>
              <div>
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            </article>
          )
        })}
      </section>

      {/* Quick Actions */}
      <section className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/appointments"
          className="bg-[#619BB6] text-white rounded-[6px] px-5 py-2.5 text-sm font-medium hover:bg-[#4A7D96] transition-colors flex items-center justify-center gap-2"
        >
          <CalendarPlus className="h-4 w-4" />
          Book Appointment
        </Link>

        <Link
          href="/appointments/my"
          className="bg-white text-[#619BB6] border border-[#619BB6] rounded-[6px] px-5 py-2.5 text-sm font-medium hover:bg-[#EDF5F8] transition-colors flex items-center justify-center gap-2"
        >
          <Calendar className="h-4 w-4" />
          My Appointments
        </Link>
      </section>

      {/* Recent Appointments */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-[#1A2832] uppercase tracking-wider">Recent Appointments</h2>
          <Link href="/appointments/my" className="text-xs text-[#619BB6] hover:text-[#4A7D96] font-medium">
            View all
          </Link>
        </div>

        <div className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] divide-y divide-[#F0F6F8]">
          {recentAppointments.length > 0 ? (
            recentAppointments.map((app) => (
              <div key={app.id} className="px-5 py-4 flex items-center gap-4 hover:bg-[#FAFCFD] transition-colors duration-100">
                <Avatar className="h-9 w-9 rounded-full border border-[#E2EDF2] shrink-0">
                  <AvatarImage src={app.doctor.imageURL} />
                  <AvatarFallback className="bg-[#EDF5F8] text-[#4A7D96] text-xs rounded-full">
                    DR
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#1A2832] truncate">{app.doctor.name}</p>
                  <p className="text-xs text-[#7A9BAD] mt-0.5 truncate">
                    {new Date(app.dateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    {' • '}
                    {new Date(app.dateTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                  </p>
                </div>

                <span className={cn('badge ml-auto', statusClassMap[app.status] || 'badge-cancelled')}>
                  {app.status}
                </span>
              </div>
            ))
          ) : (
            <div className="px-5 py-10 text-center">
              <p className="text-sm font-medium text-[#1A2832] mb-1">No recent appointments</p>
              <p className="text-xs text-[#7A9BAD]">When you book a visit, it will appear here.</p>
            </div>
          )}
        </div>
      </section>

      {/* AI Pro Upsell Strip */}
      {showUpgradeStrip && (
        <section className="bg-[#EDF5F8] rounded-[12px] border border-[#BAD7E1] px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-[#619BB6] shrink-0" />
            <p className="text-sm text-[#4A6572]">
              Upgrade to AI Pro for voice consultations with Riley
            </p>
          </div>

          <Link
            href="/billing"
            className="border border-[#619BB6] text-[#619BB6] rounded-[6px] px-4 py-1.5 text-xs font-medium hover:bg-[#619BB6] hover:text-white transition-colors"
          >
            Upgrade
          </Link>
        </section>
      )}
    </div>
  )
}
