'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

/**
 * Fetch all appointments with optional filters for admin dashboard
 */
export async function getAllAppointments(filters = {}) {
  try {
    const session = await auth()
    if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('Unauthorized')
    }

    const { status, search } = filters
    
    let whereClause = {}
    
    if (status && status !== 'ALL') {
      whereClause.status = status
    }
    
    if (search) {
      whereClause.OR = [
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { doctor: { name: { contains: search, mode: 'insensitive' } } }
      ]
    }

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      include: {
        user: true,
        doctor: true,
      },
      orderBy: {
        dateTime: 'desc',
      },
    })

    return appointments
  } catch (error) {
    console.error('Error fetching admin appointments:', error)
    throw new Error('Failed to fetch appointments')
  }
}

/**
 * Update the status of a specific appointment
 */
export async function updateAppointmentStatus(id, status) {
  try {
    const session = await auth()
    if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('Unauthorized')
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status },
    })

    return appointment
  } catch (error) {
    console.error('Error updating appointment status:', error)
    throw new Error('Failed to update status')
  }
}

/**
 * Fetch high-level statistics for the admin dashboard
 */
export async function getAdminStats() {
  try {
    const session = await auth()
    if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('Unauthorized')
    }

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const [
      totalDoctors,
      activeDoctors,
      totalAppointments,
      confirmedAppointments,
      completedAppointments,
      cancelledAppointments,
      totalUsers,
      thisMonthAppointments,
    ] = await Promise.all([
      prisma.doctor.count(),
      prisma.doctor.count({ where: { isActive: true } }),
      prisma.appointment.count(),
      prisma.appointment.count({ where: { status: 'CONFIRMED' } }),
      prisma.appointment.count({ where: { status: 'COMPLETED' } }),
      prisma.appointment.count({ where: { status: 'CANCELLED' } }),
      prisma.user.count(),
      prisma.appointment.count({ where: { dateTime: { gte: startOfMonth } } }),
    ])

    return {
      totalDoctors,
      activeDoctors,
      totalAppointments,
      confirmedAppointments,
      completedAppointments,
      cancelledAppointments,
      totalUsers,
      thisMonthAppointments,
    }
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    throw new Error('Failed to fetch stats')
  }
}

/**
 * Fetch last 6 months of appointment trends
 */
export async function getAppointmentTrends() {
  try {
    const session = await auth()
    if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('Unauthorized')
    }

    const months = []
    const now = new Date()
    
    // Generate an array of the last 6 months (oldest first)
    // 5 to 0 because we want the past 5 months and the current month
    for (let i = 5; i >= 0; i--) {
      const year = now.getFullYear()
      const monthIndex = now.getMonth() - i
      
      const start = new Date(year, monthIndex, 1)
      const end = new Date(year, monthIndex + 1, 0, 23, 59, 59)
      
      const monthLabel = start.toLocaleString('default', { month: 'short' })
      
      months.push({ start, end, month: monthLabel })
    }

    // Process all 6 queries in parallel
    const trendsData = await Promise.all(months.map(async ({ start, end, month }) => {
      const gte = start
      const lte = end

      const [total, confirmed, completed] = await Promise.all([
        prisma.appointment.count({ where: { dateTime: { gte, lte } } }),
        prisma.appointment.count({ where: { dateTime: { gte, lte }, status: 'CONFIRMED' } }),
        prisma.appointment.count({ where: { dateTime: { gte, lte }, status: 'COMPLETED' } })
      ])

      return {
        month,
        total,
        confirmed,
        completed
      }
    }))

    return trendsData
  } catch (error) {
    console.error('Error fetching appointment trends:', error)
    throw new Error('Failed to fetch appointment trends')
  }
}

/**
 * Fetch performance metrics for each doctor
 */
export async function getDoctorPerformance() {
  try {
    const session = await auth()
    if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('Unauthorized')
    }

    const doctors = await prisma.doctor.findMany()

    const performanceData = await Promise.all(doctors.map(async (doctor) => {
      const [totalAppointments, completed, confirmed] = await Promise.all([
        prisma.appointment.count({ where: { doctorId: doctor.id } }),
        prisma.appointment.count({ where: { doctorId: doctor.id, status: 'COMPLETED' } }),
        prisma.appointment.count({ where: { doctorId: doctor.id, status: 'CONFIRMED' } })
      ])

      const completionRate = totalAppointments > 0 
        ? Math.round((completed / totalAppointments) * 100) + '%' 
        : '0%'

      return {
        id: doctor.id,
        name: doctor.name,
        specialty: doctor.specialty,
        imageURL: doctor.imageURL,
        totalAppointments,
        completed,
        confirmed,
        completionRate
      }
    }))

    // Sort by totalAppointments descending
    performanceData.sort((a, b) => b.totalAppointments - a.totalAppointments)

    return performanceData
  } catch (error) {
    console.error('Error fetching doctor performance:', error)
    throw new Error('Failed to fetch doctor performance')
  }
}

/**
 * Calculate estimated MRR based on active subscriptions
 */
export async function getRevenueStats() {
  try {
    const session = await auth()
    if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('Unauthorized')
    }

    const [basicCount, proCount] = await Promise.all([
      prisma.subscription.count({
        where: { status: 'ACTIVE', plan: 'BASIC' }
      }),
      prisma.subscription.count({
        where: { status: 'ACTIVE', plan: 'AI_PRO' }
      })
    ])

    const basicRevenue = basicCount * 9
    const proRevenue = proCount * 19
    const totalRevenue = basicRevenue + proRevenue
    const totalPaidSubscribers = basicCount + proCount

    return {
      basicCount,
      proCount,
      basicRevenue,
      proRevenue,
      totalRevenue,
      totalPaidSubscribers
    }
  } catch (error) {
    console.error('Error fetching revenue stats:', error)
    throw new Error('Failed to fetch revenue stats')
  }
}

/**
 * Fetch most recent activity globally
 */
export async function getRecentActivity() {
  try {
    const session = await auth()
    if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('Unauthorized')
    }

    const recentAppointments = await prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        user: true,
        doctor: true
      }
    })

    const mappedActivity = recentAppointments.map(appointment => ({
      id: appointment.id,
      type: 'appointment',
      patientName: appointment.user.name,
      doctorName: appointment.doctor.name,
      action: appointment.status,
      time: appointment.createdAt
    }))

    return mappedActivity
  } catch (error) {
    console.error('Error fetching recent activity:', error)
    throw new Error('Failed to fetch recent activity')
  }
}

/**
 * Fetch all subscriptions with user details
 */
export async function getAllSubscriptions() {
  try {
    const session = await auth()
    if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('Unauthorized')
    }

    const subscriptions = await prisma.subscription.findMany({
      orderBy: { createdAt: 'desc' }
    })

    const subscriptionsWithUsers = await Promise.all(
      subscriptions.map(async (sub) => {
        const user = await prisma.user.findUnique({
          where: { id: sub.userId },
          select: { name: true, email: true, image: true }
        })

        return {
          subscriptionId: sub.id,
          userId: sub.userId,
          userName: user?.name,
          userEmail: user?.email,
          userImage: user?.image,
          plan: sub.plan,
          status: sub.status,
          stripeCustomerId: sub.stripeCustomerId,
          stripeSubscriptionId: sub.stripeSubscriptionId,
          currentPeriodEnd: sub.currentPeriodEnd,
          createdAt: sub.createdAt
        }
      })
    )

    return subscriptionsWithUsers
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    throw new Error('Failed to fetch subscriptions')
  }
}
