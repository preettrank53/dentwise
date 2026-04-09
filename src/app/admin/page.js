import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Stethoscope, 
  UserCheck, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Users, 
  ArrowRight,
  Plus,
  CreditCard
} from 'lucide-react'
import { cn } from '@/utils/cn'

export default async function AdminDashboardPage() {
  // Parallel Fetching using Promise.all
  const [
    totalDoctors,
    activeDoctors,
    totalAppointments,
    confirmedAppointments,
    completedAppointments,
    totalUsers,
    recentAppointments
  ] = await Promise.all([
    prisma.doctor.count(),
    prisma.doctor.count({ where: { isActive: true } }),
    prisma.appointment.count(),
    prisma.appointment.count({ where: { status: 'CONFIRMED' } }),
    prisma.appointment.count({ where: { status: 'COMPLETED' } }),
    prisma.user.count({ where: { role: 'PATIENT' } }),
    prisma.appointment.findMany({
      take: 5,
      orderBy: { dateTime: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        doctor: { select: { name: true, specialty: true } }
      }
    })
  ])

  const stats = [
    { label: 'Total Doctors', value: totalDoctors, icon: Stethoscope, color: 'bg-cyan-50 text-cyan-600' },
    { label: 'Active Doctors', value: activeDoctors, icon: UserCheck, color: 'bg-green-50 text-green-600' },
    { label: 'Total Appointments', value: totalAppointments, icon: Calendar, color: 'bg-blue-50 text-blue-600' },
    { label: 'Confirmed', value: confirmedAppointments, icon: Clock, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Completed', value: completedAppointments, icon: CheckCircle, color: 'bg-green-50 text-green-600' },
    { label: 'Total Patients', value: totalUsers, icon: Users, color: 'bg-purple-50 text-purple-600' },
  ]

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">System Overview</h1>
        <p className="text-muted-foreground mt-1">Real-time statistics and administrative insights for Dentwise.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="card-hover border-none shadow-sm ring-1 ring-gray-100">
              <CardContent className="p-5 flex flex-col gap-3">
                <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center shrink-0', stat.color)}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Appointments Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-bold flex items-center gap-2">
              Recent Appointments
              <Badge variant="secondary" className="font-bold">{recentAppointments.length}</Badge>
            </h2>
            <Button variant="link" size="sm" asChild className="text-cyan-600">
              <Link href="/admin/appointments">View all appointments</Link>
            </Button>
          </div>

          <Card className="border-none shadow-sm ring-1 ring-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              {recentAppointments.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground flex flex-col items-center gap-2">
                  <Calendar className="h-10 w-10 opacity-20" />
                  <p>No appointments recorded yet.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Patient</th>
                      <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Doctor</th>
                      <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest text-right">Date & Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentAppointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-gray-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-900 text-sm">{apt.user.name}</span>
                            <span className="text-[10px] text-muted-foreground">{apt.user.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm text-gray-700">Dr. {apt.doctor.name}</span>
                            <span className="text-[10px] text-cyan-600 font-bold uppercase">{apt.doctor.specialty}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex flex-col items-end gap-1.5">
                            <span className="text-xs font-mono font-bold text-gray-600">
                              {new Date(apt.dateTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <Badge className={cn(
                              'text-[8px] h-4 uppercase font-black px-1.5 border-none shadow-none',
                              apt.status === 'CONFIRMED' ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-100' : 'bg-green-50 text-green-600 ring-1 ring-green-100'
                            )}>
                              {apt.status}
                            </Badge>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Card>
        </div>

        {/* Quick Actions Panel */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold px-1">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            <Button size="lg" variant="outline" className="justify-between h-auto py-5 group border-gray-200 hover:border-cyan-200 hover:bg-cyan-50/30 transition-all shadow-none" asChild>
              <Link href="/admin/doctors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
                    <Plus className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm text-gray-900">Add New Doctor</p>
                    <p className="text-[10px] text-muted-foreground font-medium">Register a clinic professional</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-cyan-500 transition-colors" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" className="justify-between h-auto py-5 group border-gray-200 hover:bg-gray-50 transition-all shadow-none" asChild>
              <Link href="/admin/appointments">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm text-gray-900 text-left">Manage Schedule</p>
                    <p className="text-[10px] text-muted-foreground font-medium">Review all clinic sessions</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
              </Link>
            </Button>
          </div>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-none shadow-xl text-white p-6 relative overflow-hidden ring-1 ring-white/10">
            <div className="relative z-10 space-y-2">
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-cyan-400">Subscription Insights</p>
              <h3 className="text-xl font-bold italic tracking-tight italic">Stripe Billing Integration</h3>
              <p className="text-xs text-gray-400 max-w-[200px] leading-relaxed">
                Automate your clinic revenue and manage patient plans seamlessly.
              </p>
              <Button size="sm" className="bg-white text-gray-900 hover:bg-cyan-50 font-bold border-none mt-4 h-8 px-4">
                View Billing Overview
              </Button>
            </div>
            <CreditCard className="absolute -bottom-4 -right-4 h-24 w-24 text-white/5 rotate-12" />
          </Card>
        </div>
      </div>
    </div>
  )
}
