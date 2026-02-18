'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
//
export async function updateStoreSettings(data: {
  name?: string
  description?: string
  template?: 'minimal' | 'bold' | 'vibrant'
  mpesaType?: 'till' | 'paybill'
  mpesaNumber?: string
}) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    const store = await prisma.store.findFirst({
      where: { userId: user.id }
    })

    if (!store) {
      return { success: false, error: 'Store not found' }
    }

    await prisma.store.update({
      where: { id: store.id },
      data
    })

    revalidatePath('/dashboard/settings')
    return { success: true }
  } catch (error) {
    console.error('[v0] Update store settings error:', error)
    return { success: false, error: 'Failed to update settings' }
  }
}

export async function updateAccountSettings(data: {
  name?: string
  email?: string
  phone?: string
}) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    await prisma.user.update({
      where: { id: user.id },
      data
    })

    revalidatePath('/dashboard/settings')
    return { success: true }
  } catch (error) {
    console.error('[v0] Update account settings error:', error)
    return { success: false, error: 'Failed to update account' }
  }
}

export async function changePassword(data: {
  currentPassword: string
  newPassword: string
}) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id }
    })

    if (!dbUser) {
      return { success: false, error: 'User not found' }
    }

    // Verify current password
    const isValid = await bcrypt.compare(data.currentPassword, dbUser.password)
    if (!isValid) {
      return { success: false, error: 'Current password is incorrect' }
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(data.newPassword, 10)

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    })

    return { success: true }
  } catch (error) {
    console.error('[v0] Change password error:', error)
    return { success: false, error: 'Failed to change password' }
  }
}
