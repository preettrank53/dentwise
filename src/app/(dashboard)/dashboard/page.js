import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  Crown, 
  ArrowRight, 
  Mic,
  Plus
} from 'lucide-react'
import { cn } from '@/utils/cn'

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  const stats = [
    { 
      label: 'Total Appointments', 
      value: '0', 
      icon: Calendar, 
      color: 'bg-cyan-50 text-cyan-600' 
    },
    { 
      label: 'Upcoming', 
      value: '0', 
      icon: Clock, 
      color: 'bg-blue-50 text-blue-600' 
    },
    { 
      label: 'Completed', 
      value: '0', 
      icon: CheckCircle, 
      color: 'bg-green-50 text-green-600' 
    },
    { 
      label: 'Sub Plan', 
      value: 'Free', 
      icon: Crown, 
      color: 'bg-purple-50 text-purple-600' 
    },
  ]

  return (
    <div className="p-4 md:p-8 space-y-8">
      
      {/* Welcome Banner */}
      <Card className="relative overflow-hidden border-0 shadow-lg shadow-cyan-50">
        <div className="gradient-primary p-6 md:p-8 text-white relative z-10 flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, {session.user?.name}!
            </h1>
            <p className="text-white/80 max-w-md">
              Your health overview is looking great. You have no urgent appointments pending for today.
            </p>
          </div>
          <div className="hidden sm:block">
            <Avatar className="h-20 w-20 border-4 border-white/20 shadow-xl">
              <AvatarImage src={session.user?.image} />
              <AvatarFallback className="bg-white/10 text-white text-2xl">
                {session.user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        {/* Background shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="card-hover">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center shrink-0', stat.color)}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          size="lg" 
          className="flex-1 gradient-primary text-white border-0 h-14 text-base font-semibold group"
          asChild
        >
          <Link href="/appointments">
            <Plus className="mr-2 h-5 w-5" />
            Book New Appointment
            <ArrowRight className="ml-2 h-4 w-4 opacity-50 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="flex-1 h-14 text-base font-semibold border-cyan-100 hover:bg-cyan-50/50"
          asChild
        >
          <Link href="/voice">
            <Mic className="mr-2 h-5 w-5 text-cyan-600" />
            Talk to AI Assistant
          </Link>
        </Button>
      </div>

      {/* Recent Appointments Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Recent Appointments</h2>
        <Card className="border-dashed border-2 py-16">
          <CardContent className="flex flex-col items-center justify-center text-center gap-4">
            <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center">
              <Calendar className="h-8 w-8 text-gray-300" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-gray-900">No appointments yet</p>
              <p className="text-sm text-muted-foreground max-w-xs">
                You haven't booked any dental appointments through Dentwise yet.
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/appointments">Book your first appointment</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
