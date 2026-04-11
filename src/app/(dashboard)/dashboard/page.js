import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  Crown, 
  ArrowRight, 
  Mic,
  Plus,
  User
} from 'lucide-react'
import { cn } from '@/lib/utils'

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
      color: 'bg-cyan-50 text-cyan-600' 
    },
    { 
      label: 'Upcoming', 
      value: upcomingCount.toString(), 
      icon: Clock, 
      color: 'bg-blue-50 text-blue-600' 
    },
    { 
      label: 'Completed', 
      value: completedCount.toString(), 
      icon: CheckCircle, 
      color: 'bg-green-50 text-green-600' 
    },
    { 
      label: 'Sub Plan', 
      value: subscription?.plan || 'FREE', 
      icon: Crown, 
      color: 'bg-purple-50 text-purple-600' 
    },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden border-0 shadow-sm rounded-2xl">
        <div className="gradient-primary p-6 md:p-10 text-white relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-black italic">
              Welcome back, {session.user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-white/90 max-w-md text-lg leading-relaxed">
              {upcomingCount > 0 
                ? `You have ${upcomingCount} upcoming appointment${upcomingCount > 1 ? 's' : ''}`
                : "Ready to book your first appointment?"}
            </p>
          </div>
          <div className="hidden sm:block">
            <Avatar className="h-24 w-24 border-4 border-white/20 shadow-2xl ring-4 ring-white/10">
              <AvatarImage src={session.user?.image} />
              <AvatarFallback className="bg-white/10 text-white text-3xl font-bold">
                {session.user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-shadow hover:shadow-md">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm', stat.color)}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Quick Actions & Recent Activity */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button 
              size="lg" 
              className="gradient-primary text-white border-0 h-16 text-lg font-bold group shadow-md shadow-cyan-100 hover:shadow-lg rounded-2xl transition-all"
              asChild
            >
              <Link href="/appointments">
                <Plus className="mr-2 h-6 w-6" />
                Book New Appointment
                <ArrowRight className="ml-2 h-5 w-5 opacity-50 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-16 text-lg font-bold border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-all rounded-2xl shadow-sm hover:shadow"
              asChild
            >
              <Link href="/appointments/my">
                <Calendar className="mr-2 h-6 w-6 text-gray-500" />
                View My Appointments
              </Link>
            </Button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Appointments</h2>
              <Link href="/appointments/my" className="text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors">
                View All
              </Link>
            </div>
            
            {recentAppointments.length > 0 ? (
              <div className="divide-y divide-gray-50">
                {recentAppointments.map((app) => (
                  <div key={app.id} className="flex flex-wrap sm:flex-nowrap items-center gap-4 py-4 px-2 first:pt-0 last:pb-0 hover:bg-gray-50/50 transition-colors rounded-xl mx-[-8px]">
                    <Avatar className="h-10 w-10 border border-gray-100 shrink-0">
                      <AvatarImage src={app.doctor.imageURL} />
                      <AvatarFallback className="bg-gray-100 text-gray-500 font-medium">DR</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{app.doctor.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate gap-1 flex items-center">
                        {new Date(app.dateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        <span className="w-1 h-1 rounded-full bg-gray-300 inline-block mx-1" />
                        {new Date(app.dateTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                      </p>
                    </div>
                    <Badge 
                      className={cn(
                        "ml-auto rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-medium tracking-wider uppercase border-0 shrink-0",
                        app.status === 'CONFIRMED' && "bg-cyan-50 text-cyan-700 hover:bg-cyan-50",
                        app.status === 'COMPLETED' && "bg-green-50 text-green-700 hover:bg-green-50",
                        app.status === 'CANCELLED' && "bg-gray-100 text-gray-500 hover:bg-gray-100"
                      )}
                    >
                      {app.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                  <Calendar className="h-6 w-6 text-gray-400" />
                </div>
                <p className="font-medium text-gray-900 mb-1">No recent appointments</p>
                <p className="text-sm text-gray-500 max-w-[250px] mb-4">
                  When you book a dental visit, it will appear here.
                </p>
                <Button variant="outline" size="sm" className="rounded-xl border-gray-200" asChild>
                  <Link href="/appointments">Book Now</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Promotion or Tips Card */}
        <div className="lg:col-span-1">
          <Card className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden relative group h-full flex flex-col items-center text-center justify-center">
            <div className="h-16 w-16 bg-cyan-50 rounded-2xl flex items-center justify-center mb-4 text-cyan-600 transition-transform group-hover:scale-110 duration-500">
              <Mic className="h-8 w-8" />
            </div>
            <Badge className="bg-cyan-50 text-cyan-700 border-0 mb-3 font-bold hover:bg-cyan-50 px-3 py-1">AI ASSISTANT</Badge>
            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">Need help booking?</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 px-2">
              Talk to our intelligent voice assistant to schedule or modify your next dental visit hands-free.
            </p>
            <Button className="gradient-primary text-white rounded-xl font-bold w-full shadow-md shadow-cyan-100 hover:shadow-lg transition-all" asChild>
               <Link href="/voice">Talk to AI Assistant</Link>
            </Button>
          </Card>
        </div>

      </div>

    </div>
  )
}
