'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { handlePrismaError } from '@/lib/prismaErrors'

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
    if (error?.code?.startsWith?.('P')) {
      throw new Error(handlePrismaError(error))
    }
    throw new Error(error.message || 'Failed to fetch available slots')
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

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) throw new Error('User not found')

    if (!formData?.doctorId || typeof formData.doctorId !== 'string') {
      throw new Error('Please select a doctor')
    }
    if (!formData?.dateTime || typeof formData.dateTime !== 'string') {
      throw new Error('Please select a date and time')
    }

    const dt = new Date(formData.dateTime)
    if (isNaN(dt.getTime())) {
      throw new Error('Invalid date')
    }
    if (dt <= new Date()) {
      throw new Error('Appointment must be in the future')
    }

    const day = dt.getDay()
    if (day === 0 || day === 6) {
      throw new Error('Appointments are only available Monday to Friday')
    }

    const hour = dt.getHours()
    if (hour < 9 || hour >= 17) {
      throw new Error('Appointments available between 9:00 AM and 5:00 PM')
    }

    const doctor = await prisma.doctor.findFirst({
      where: {
        id: formData.doctorId,
        isActive: true,
      }
    })

    if (!doctor) {
      throw new Error('Doctor not found or not accepting appointments')
    }

    const conflict = await prisma.appointment.findFirst({
      where: {
        doctorId: formData.doctorId,
        dateTime: dt,
        status: {
          not: 'CANCELLED'
        }
      }
    })

    if (conflict) {
      throw new Error('This time slot is no longer available. Please choose another time.')
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        doctorId: formData.doctorId,
        dateTime: dt,
        reason: formData.reason?.trim() || null,
        note: formData.note?.trim() || null,
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
    if (error?.code?.startsWith?.('P')) {
      throw new Error(handlePrismaError(error))
    }
    throw new Error(error.message || 'Something went wrong')
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
        doctor: {
          select: {
            id: true,
            name: true,
            specialty: true,
            imageURL: true,
          }
        }
      },
      orderBy: {
        dateTime: 'desc'
      }
    })

    return appointments
  } catch (error) {
    console.error('getUserAppointments Error:', error)
    if (error?.code?.startsWith?.('P')) {
      throw new Error(handlePrismaError(error))
    }
    throw new Error(error.message || 'Failed to load your appointments')
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

    if (!appointmentId || typeof appointmentId !== 'string') {
      throw new Error('Invalid appointment')
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })
    if (!user) {
      throw new Error('User not found')
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId }
    })

    if (!appointment) throw new Error('Appointment not found')

    if (appointment.userId !== user.id) {
      throw new Error('Unauthorized: This is not your appointment')
    }

    if (appointment.status !== 'CONFIRMED') {
      throw new Error('Only confirmed appointments can be cancelled')
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
    if (error?.code?.startsWith?.('P')) {
      throw new Error(handlePrismaError(error))
    }
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
    if (error?.code?.startsWith?.('P')) {
      throw new Error(handlePrismaError(error))
    }
    throw new Error(error.message || 'Failed to fetch booked slots')
  }
}

/**
 * 6. rescheduleAppointment(appointmentId, newDateTime)
 * Reschedules a confirmed appointment owned by the logged-in user.
 */
export async function rescheduleAppointment(appointmentId, newDateTime) {
  try {
    const session = await auth()
    if (!session) {
      throw new Error('Unauthorized')
    }

    if (!appointmentId || typeof appointmentId !== 'string') {
      throw new Error('Invalid appointment ID')
    }

    if (!newDateTime) {
      throw new Error('Please select a new date and time')
    }

    const dt = new Date(newDateTime)
    if (isNaN(dt.getTime())) {
      throw new Error('Invalid date format')
    }

    if (dt <= new Date()) {
      throw new Error('New appointment must be in the future')
    }

    const day = dt.getDay()
    if (day === 0 || day === 6) {
      throw new Error('Appointments are only available Monday to Friday')
    }

    const hour = dt.getHours()
    if (hour < 9 || hour >= 17) {
      throw new Error('Appointments available between 9:00 AM and 5:00 PM')
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email }
    })

    if (!user) {
      throw new Error('User not found')
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        doctor: true,
      },
    })

    if (!appointment) {
      throw new Error('Appointment not found')
    }

    if (appointment.userId !== user.id) {
      throw new Error('Unauthorized: This is not your appointment')
    }

    if (appointment.status !== 'CONFIRMED') {
      throw new Error('Only confirmed appointments can be rescheduled')
    }

    const currentTime = new Date(appointment.dateTime).getTime()
    if (currentTime === dt.getTime()) {
      throw new Error('New time is the same as current appointment time')
    }

    const conflict = await prisma.appointment.findFirst({
      where: {
        doctorId: appointment.doctorId,
        dateTime: dt,
        status: { not: 'CANCELLED' },
        id: { not: appointmentId },
      }
    })

    if (conflict) {
      throw new Error('This time slot is already taken. Please choose a different time.')
    }

    const updated = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        dateTime: dt,
        updatedAt: new Date(),
      },
      include: {
        doctor: {
          select: {
            id: true,
            name: true,
            specialty: true,
            imageURL: true,
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    })

    fetch(
      process.env.NEXTAUTH_URL + '/api/send-reschedule-email',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          patientName: updated.user.name,
          patientEmail: updated.user.email,
          doctorName: updated.doctor.name,
          doctorSpecialty: updated.doctor.specialty,
          newDate: updated.dateTime,
          oldDate: appointment.dateTime,
        })
      }
    ).catch(console.error)

    return updated
  } catch (error) {
    if (error.code?.startsWith('P')) {
      throw new Error(handlePrismaError(error))
    }
    throw new Error(error.message || 'Failed to reschedule appointment')
  }
}
