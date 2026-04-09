'use server'

import { prisma } from '@/lib/prisma'

/**
 * Fetch all active doctors ordered by newest first
 */
export async function getDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return doctors
  } catch (error) {
    console.error('Error in getDoctors:', error)
    throw new Error('Failed to fetch doctors list')
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
    throw new Error(error.message || 'Failed to fetch doctor details')
  }
}

/**
 * Create a new doctor record
 */
export async function createDoctor(formData) {
  try {
    const { name, email, specialty, bio, imageURL, gender } = formData

    // Validation
    if (!name || !email || !specialty || !imageURL || !gender) {
      throw new Error('Missing required fields: name, email, specialty, imageURL, and gender are mandatory')
    }

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
    
    // Check for unique constraint violation
    if (error.code === 'P2002') {
      throw new Error('A doctor with this email already exists')
    }
    
    throw new Error(error.message || 'Failed to create doctor record')
  }
}

/**
 * Update an existing doctor record
 */
export async function updateDoctor(id, formData) {
  try {
    // Check if doctor exists first
    const existingDoctor = await prisma.doctor.findUnique({
      where: { id },
    })

    if (!existingDoctor) {
      throw new Error('Doctor not found')
    }

    const updatedDoctor = await prisma.doctor.update({
      where: { id },
      data: formData,
    })

    return updatedDoctor
  } catch (error) {
    console.error('Error in updateDoctor:', error)
    throw new Error(error.message || 'Failed to update doctor record')
  }
}

/**
 * Toggle the active status of a doctor
 */
export async function toggleDoctorStatus(id) {
  try {
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
    throw new Error(error.message || 'Failed to toggle doctor status')
  }
}
