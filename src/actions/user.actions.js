'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { profileSchema, validate } from '@/lib/validations'
import { handlePrismaError } from '@/lib/prismaErrors'

/**
 * Fetch the logged-in user's profile with appointment count
 */
export async function getUserProfile() {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      throw new Error('Unauthorized')
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        _count: {
          select: { appointments: true }
        }
      }
    })

    if (!user) {
      throw new Error('User account not found. Please sign in again.')
    }

    return user
  } catch (error) {
    console.error('Error fetching user profile:', error)
    if (error?.code?.startsWith?.('P')) {
      throw new Error(handlePrismaError(error))
    }
    throw new Error(error.message || 'Something went wrong')
  }
}

/**
 * Update the logged-in user's name and phone number
 */
export async function updateUserProfile(formData) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      throw new Error('Unauthorized')
    }

    const validation = validate(profileSchema, formData)
    if (!validation.success) {
      throw new Error(Object.values(validation.errors)[0])
    }

    if (validation.data.name.trim().length < 2) {
      throw new Error('Name cannot be just spaces')
    }

    const clean = {
      name: validation.data.name.trim(),
      phone: validation.data.phone?.trim() || null,
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: clean.name,
        phone: clean.phone,
      }
    })

    return updatedUser
  } catch (error) {
    console.error('Error updating user profile:', error)
    if (error?.code?.startsWith?.('P')) {
      throw new Error(handlePrismaError(error))
    }
    throw new Error(error.message || 'Something went wrong')
  }
}

/**
 * Delete logged-in user account and dependent appointments.
 * Placeholder action for future account deletion UI.
 */
export async function deleteAccount() {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      throw new Error('Unauthorized')
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!user) {
      throw new Error('User account not found. Please sign in again.')
    }

    await prisma.appointment.deleteMany({
      where: { userId: user.id },
    })

    await prisma.user.delete({
      where: { id: user.id },
    })

    return { success: true }
  } catch (error) {
    console.error('Error deleting account:', error)
    if (error?.code?.startsWith?.('P')) {
      throw new Error(handlePrismaError(error))
    }
    throw new Error(error.message || 'Something went wrong')
  }
}
