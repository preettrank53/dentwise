'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

/**
 * 1. getAvailableTimeSlots(doctorId, date)
 * Generates 30-min slots from 9 AM to 5 PM and checks availability.
 */
export async function getAvailableTimeSlots(doctorId, date) {
  try {
    if (!doctorId || !date) throw new Error('Doctor ID and Date are required')

    const selectedDate = new Date(date)
    selectedDate.setHours(0, 0, 0, 0)

    const nextDate = new Date(selectedDate)
    nextDate.setDate(selectedDate.getDate() + 1)

    // 1. Generate all possible slots (9:00 AM to 5:00 PM)
    const allSlots = []
    const startHour = 9
    const endHour = 17 // 5 PM

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute of [0, 30]) {
        const slotDate = new Date(selectedDate)
        slotDate.setHours(hour, minute, 0, 0)
        
        const timeString = slotDate.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })

        allSlots.push({
          time: timeString,
          datetime: slotDate,
          isBooked: false
        })
      }
    }

    // 2. Fetch existing appointments for the doctor on that date
    const bookedAppointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        dateTime: {
          gte: selectedDate,
          lt: nextDate,
        },
        status: {
          not: 'CANCELLED'
        }
      },
      select: {
        dateTime: true
      }
    })

    const bookedTimes = bookedAppointments.map(app => app.dateTime.getTime())

    // 3. Compare and mark as booked
    const results = allSlots.map(slot => ({
      ...slot,
      isBooked: bookedTimes.includes(slot.datetime.getTime())
    }))

    return results
  } catch (error) {
    console.error('getAvailableTimeSlots Error:', error)
    throw new Error('Failed to fetch available slots')
  }
}

/**
 * 2. createAppointment(formData)
 * Securely creates an appointment after checking for conflicts.
 */
export async function createAppointment(formData) {
  try {
    const session = await auth()
    if (!session?.user?.email) throw new Error('Unauthorized')

    const { doctorId, dateTime, reason, note } = formData

    if (!doctorId || !dateTime) {
      throw new Error('Missing required fields')
    }
    
    const validReason = reason || 'General Consultation'

    // Get the user from DB
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) throw new Error('User not found')

    // Check for slot conflict
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        doctorId,
        dateTime: new Date(dateTime),
        status: {
          not: 'CANCELLED'
        }
      }
    })

    if (existingAppointment) {
      throw new Error('This slot is already taken. Please choose another time.')
    }

    // Create the appointment
    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        doctorId,
        dateTime: new Date(dateTime),
        reason: validReason,
        note: note || '',
        duration: 30,
        status: 'CONFIRMED'
      },
      include: {
        user: true,
        doctor: true
      }
    })

    revalidatePath('/dashboard/appointments')
    revalidatePath('/admin')
    
    return appointment
  } catch (error) {
    console.error('createAppointment Error:', error)
    // Pass along user-friendly error messages
    if (error.message.includes('taken')) throw error
    throw new Error(error.message || 'Failed to create appointment')
  }
}

/**
 * 3. getUserAppointments()
 * Fetches all appointments for the logged-in user.
 */
export async function getUserAppointments() {
  try {
    const session = await auth()
    if (!session?.user?.email) throw new Error('Unauthorized')

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) throw new Error('User not found')

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: user.id
      },
      include: {
        doctor: true
      },
      orderBy: {
        dateTime: 'desc'
      }
    })

    return appointments
  } catch (error) {
    console.error('getUserAppointments Error:', error)
    throw new Error('Failed to load your appointments')
  }
}

/**
 * 4. cancelAppointment(appointmentId)
 * Marks an appointment as CANCELLED after ownership check.
 */
export async function cancelAppointment(appointmentId) {
  try {
    const session = await auth()
    if (!session?.user?.email) throw new Error('Unauthorized')

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId }
    })

    if (!appointment) throw new Error('Appointment not found')

    // Security check: Verify ownership
    if (appointment.userId !== user.id && session.user.role !== 'ADMIN') {
      throw new Error('You do not have permission to cancel this appointment')
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: 'CANCELLED'
      }
    })

    revalidatePath('/dashboard/appointments')
    revalidatePath('/admin')

    return updatedAppointment
  } catch (error) {
    console.error('cancelAppointment Error:', error)
    throw new Error(error.message || 'Failed to cancel appointment')
  }
}

/**
 * 5. getBookedSlotsForDoctor(doctorId, date)
 * Helper to fetch all booked slots for a specific date.
 */
export async function getBookedSlotsForDoctor(doctorId, date) {
  try {
    const targetDate = new Date(date)
    targetDate.setHours(0, 0, 0, 0)

    const nextDate = new Date(targetDate)
    nextDate.setDate(targetDate.getDate() + 1)

    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        dateTime: {
          gte: targetDate,
          lt: nextDate
        },
        status: 'CONFIRMED'
      },
      select: {
        dateTime: true
      }
    })

    return appointments.map(app => app.dateTime)
  } catch (error) {
    console.error('getBookedSlotsForDoctor Error:', error)
    throw new Error('Failed to fetch booked slots')
  }
}
