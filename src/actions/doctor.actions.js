'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { doctorSchema, validate } from '@/lib/validations'
import { handlePrismaError } from '@/lib/prismaErrors'

/**
 * Fetch all active doctors ordered by newest first
 */
export async function getDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        specialty: true,
        bio: true,
        imageURL: true,
        gender: true,
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
    })
    return doctors
  } catch (error) {
    console.error('Error in getDoctors:', error)
    if (error?.code?.startsWith?.('P')) {
      throw new Error(handlePrismaError(error))
    }
    throw new Error(error.message || 'Something went wrong')
  }
}

/**
 * Fetch a single doctor by ID
 */
export async function getDoctorById(id) {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id },
    })

    if (!doctor) {
      throw new Error('Doctor not found')
    }

    return doctor
  } catch (error) {
    console.error('Error in getDoctorById:', error)
    if (error?.code?.startsWith?.('P')) {
      throw new Error(handlePrismaError(error))
    }
    throw new Error(error.message || 'Failed to fetch doctor details')
  }
}

/**
 * Create a new doctor record
 */
export async function createDoctor(formData) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      throw new Error('Unauthorized')
    }
    if (session.user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('Unauthorized: Admin access required')
    }

    const validation = validate(doctorSchema, formData)
    if (!validation.success) {
      throw new Error(Object.values(validation.errors)[0])
    }

    const existing = await prisma.doctor.findUnique({
      where: { email: validation.data.email }
    })
    if (existing) {
      throw new Error('A doctor with this email already exists')
    }

    const { name, email, specialty, bio, imageURL, gender } = validation.data

    const doctor = await prisma.doctor.create({
      data: {
        name,
        email,
        specialty,
        bio,
        imageURL,
        gender,
      },
    })

    return doctor
  } catch (error) {
    console.error('Error in createDoctor:', error)
    if (error?.code?.startsWith?.('P')) {
      throw new Error(handlePrismaError(error))
    }

    throw new Error(error.message || 'Something went wrong')
  }
}

/**
 * Update an existing doctor record
 */
export async function updateDoctor(id, formData) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      throw new Error('Unauthorized')
    }
    if (session.user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('Unauthorized: Admin access required')
    }

    const updateValidation = validate(doctorSchema.partial(), formData)
    if (!updateValidation.success) {
      throw new Error(Object.values(updateValidation.errors)[0])
    }

    // Check if doctor exists first
    const existingDoctor = await prisma.doctor.findUnique({
      where: { id },
    })

    if (!existingDoctor) {
      throw new Error('Doctor not found')
    }

    const updatedDoctor = await prisma.doctor.update({
      where: { id },
      data: updateValidation.data,
    })

    return updatedDoctor
  } catch (error) {
    console.error('Error in updateDoctor:', error)
    if (error?.code?.startsWith?.('P')) {
      throw new Error(handlePrismaError(error))
    }
    throw new Error(error.message || 'Something went wrong')
  }
}

/**
 * Toggle the active status of a doctor
 */
export async function toggleDoctorStatus(id) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      throw new Error('Unauthorized')
    }
    if (session.user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('Unauthorized: Admin access required')
    }

    if (!id || typeof id !== 'string') {
      throw new Error('Invalid doctor ID')
    }

    const doctor = await prisma.doctor.findUnique({
      where: { id },
      select: { isActive: true },
    })

    if (!doctor) {
      throw new Error('Doctor not found')
    }

    const updatedDoctor = await prisma.doctor.update({
      where: { id },
      data: {
        isActive: !doctor.isActive,
      },
    })

    return updatedDoctor
  } catch (error) {
    console.error('Error in toggleDoctorStatus:', error)
    if (error?.code?.startsWith?.('P')) {
      throw new Error(handlePrismaError(error))
    }
    throw new Error(error.message || 'Something went wrong')
  }
}
