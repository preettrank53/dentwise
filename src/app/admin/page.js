import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { 
  getAdminStats, 
  getAppointmentTrends, 
  getDoctorPerformance, 
  getRevenueStats, 
  getRecentActivity 
} from '@/actions/admin.actions'

export const metadata = {
  title: 'Analytics — Admin',
  description: 'Dentwise admin analytics dashboard.',
  robots: {
    index: false,
    follow: false,
  },
}

import AppointmentTrendsChart from '@/components/admin/AppointmentTrendsChart'
import DoctorPerformanceChart from '@/components/admin/DoctorPerformanceChart'
import RevenueChart from '@/components/admin/RevenueChart'
import RecentActivityFeed from '@/components/admin/RecentActivityFeed'
import DoctorStatsTable from '@/components/admin/DoctorStatsTable'

import { 
  Stethoscope, 
  UserCheck, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Users,
  RefreshCw,
  Download
} from 'lucide-react'

export default async function AdminAnalyticsPage() {
  const session = await auth()
  
  if (!session) {
    redirect('/login')
  }

  if (session.user.email !== process.env.ADMIN_EMAIL) {
    redirect('/')
  }

  const [
    stats,
    trends,
    doctorPerformance,
    revenueStats,
    recentActivity
  ] = await Promise.all([
    getAdminStats(),
    getAppointmentTrends(),
    getDoctorPerformance(),
    getRevenueStats(),
    getRecentActivity(),
  ])

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  })

  return (
    <div className="space-y-8">
      {/* SECTION 1 - PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time clinic overview</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-900 font-medium">{currentDate}</p>
          <p className="text-sm text-gray-500 flex items-center justify-end gap-1.5 mt-0.5">
            <RefreshCw className="h-3.5 w-3.5" />
            Last updated: {currentTime}
          </p>
        </div>
      </div>

      {/* SECTION 2 - STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-4 flex flex-col gap-2">
          <div className="rounded-xl p-2 w-fit mb-1 bg-[#EDF5F8] text-[#619BB6]">
            <Stethoscope className="h-5 w-5" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalDoctors}</p>
          <p className="text-xs text-gray-500">Total Doctors</p>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-4 flex flex-col gap-2">
          <div className="rounded-xl p-2 w-fit mb-1 bg-green-50 text-green-500">
            <UserCheck className="h-5 w-5" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.activeDoctors}</p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        
        {/* Card 3 */}
        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-4 flex flex-col gap-2">
          <div className="rounded-xl p-2 w-fit mb-1 bg-blue-50 text-blue-500">
            <Calendar className="h-5 w-5" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalAppointments}</p>
          <p className="text-xs text-gray-500">All Time</p>
        </div>
        
        {/* Card 4 */}
        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-4 flex flex-col gap-2">
          <div className="rounded-xl p-2 w-fit mb-1 bg-amber-50 text-amber-500">
            <Clock className="h-5 w-5" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.confirmedAppointments}</p>
          <p className="text-xs text-gray-500">Upcoming</p>
        </div>
        
        {/* Card 5 */}
        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-4 flex flex-col gap-2">
          <div className="rounded-xl p-2 w-fit mb-1 bg-green-50 text-green-500">
            <CheckCircle className="h-5 w-5" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.completedAppointments}</p>
          <p className="text-xs text-gray-500">Done</p>
        </div>
        
        {/* Card 6 */}
        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-4 flex flex-col gap-2">
          <div className="rounded-xl p-2 w-fit mb-1 bg-purple-50 text-purple-500">
            <Users className="h-5 w-5" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
          <p className="text-xs text-gray-500">Patients</p>
        </div>
      </div>

      {/* SECTION 3 - CHARTS ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AppointmentTrendsChart data={trends} />
        </div>
        <div className="lg:col-span-1">
          <RevenueChart data={revenueStats} />
        </div>
      </div>

      {/* SECTION 4 - CHARTS ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <DoctorPerformanceChart data={doctorPerformance} />
        </div>
        <div>
          <RecentActivityFeed activities={recentActivity} />
        </div>
      </div>

      {/* SECTION 5 - DOCTOR STATS TABLE */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Doctor Performance Details</h2>
            <p className="text-sm text-gray-500">Sortable by any column</p>
          </div>
        </div>
        <DoctorStatsTable data={doctorPerformance} />
      </div>

      {/* SECTION 6 - QUICK ACTIONS ROW */}
      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100">
        <Link 
          href="/admin/doctors"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Users className="h-4 w-4" />
          Manage Doctors
        </Link>
        <Link 
          href="/admin/appointments"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Calendar className="h-4 w-4" />
          View Appointments
        </Link>
        <button 
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ml-auto"
        >
          <Download className="h-4 w-4" />
          Export Data
        </button>
      </div>

    </div>
  )
}
