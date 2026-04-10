'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

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
      throw new Error('User not found')
    }

    return user
  } catch (error) {
    console.error('Error fetching user profile:', error)
    throw new Error('Failed to fetch user profile')
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

    const { name, phone } = formData

    if (!name || name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long')
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: name.trim(),
        phone: phone ? phone.trim() : null,
      }
    })

    return updatedUser
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw new Error(error.message || 'Failed to update profile')
  }
}
