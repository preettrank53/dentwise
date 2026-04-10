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
