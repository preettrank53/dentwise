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
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      
      {/* Welcome Banner */}
      <Card className="relative overflow-hidden border-0 shadow-lg shadow-cyan-100/50">
        <div className="gradient-primary p-6 md:p-10 text-white relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-black italic">
              Welcome back, {session.user?.name}!
            </h1>
            <p className="text-white/90 max-w-md text-lg leading-relaxed">
              Managing your dental health has never been easier. 
              {upcomingCount > 0 
                ? `You have ${upcomingCount} upcoming appointment${upcomingCount > 1 ? 's' : ''} scheduled.`
                : "Your health overview is looking great. You're all caught up for now!"}
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
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="card-hover border-0 shadow-sm">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={cn('h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner', stat.color)}>
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-black italic text-primary">{stat.value}</p>
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
              className="gradient-primary text-white border-0 h-16 text-lg font-bold group shadow-lg shadow-cyan-200"
              asChild
            >
              <Link href="/appointments">
                <Plus className="mr-2 h-6 w-6" />
                Book Now
                <ArrowRight className="ml-2 h-5 w-5 opacity-50 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-16 text-lg font-bold border-2 border-cyan-100 hover:bg-cyan-50/50 hover:border-primary transition-all rounded-xl"
              asChild
            >
              <Link href="/voice">
                <Mic className="mr-2 h-6 w-6 text-primary" />
                Talk to AI
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black italic text-primary flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              Recent Appointments
            </h2>
            
            {recentAppointments.length > 0 ? (
              <Card className="border-0 shadow-sm overflow-hidden bg-white">
                <CardContent className="p-0">
                  {recentAppointments.map((app, index) => (
                    <div key={app.id}>
                      <div className="p-6 flex items-center justify-between group hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 border shadow-sm">
                            <AvatarImage src={app.doctor.imageURL} />
                            <AvatarFallback><User /></AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-lg leading-tight">{app.doctor.name}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                              <span>{new Date(app.dateTime).toLocaleDateString()}</span>
                              <span className="h-1 w-1 bg-muted-foreground/30 rounded-full" />
                              <span>{new Date(app.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          </div>
                        </div>
                        <Badge 
                          className={cn(
                            "font-bold uppercase text-[10px] tracking-widest px-3 py-1",
                            app.status === 'CONFIRMED' ? "bg-cyan-100 text-cyan-700 hover:bg-cyan-100" : 
                            app.status === 'COMPLETED' ? "bg-green-100 text-green-700 hover:bg-green-100" :
                            "bg-red-100 text-red-700 hover:bg-red-100"
                          )}
                        >
                          {app.status}
                        </Badge>
                      </div>
                      {index < recentAppointments.length - 1 && <Separator className="opacity-50" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2 border-dashed bg-muted/20 py-12">
                <CardContent className="flex flex-col items-center justify-center text-center gap-4">
                  <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Calendar className="h-7 w-7 text-muted-foreground/30" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-lg">No appointments yet</p>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Your recent activity will appear here once you book your first visit.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="font-bold border-2" asChild>
                    <Link href="/appointments">Book Appointment</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Right: Promotion or Tips Card */}
        <div className="lg:col-span-1">
          <Card className="gradient-primary text-white border-0 shadow-xl p-6 h-full flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10">
              <Badge className="bg-white/20 text-white border-0 mb-4 font-bold shadow-sm">NEW FEATURE</Badge>
              <h3 className="text-2xl font-black italic mb-4 leading-tight">Elevate Your Care with AI Pro</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Get 24/7 access to your AI Dental Assistant, priority booking, and personalized oral health tracking.
              </p>
              <Button className="bg-white text-primary font-black w-full hover:bg-white/90 shadow-lg group-hover:scale-[1.02] transition-transform">
                Upgrade Now
              </Button>
            </div>
            {/* Background elements */}
            <Crown className="absolute -bottom-6 -right-6 h-48 w-48 text-white/10 rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-transform duration-700" />
          </Card>
        </div>

      </div>

    </div>
  )
}
