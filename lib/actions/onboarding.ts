'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
//
export async function completeOnboarding(data: {
  businessName: string
  businessSlug: string
  businessCategory: string
  businessDescription: string
  selectedTemplate: 'minimal' | 'bold' | 'vibrant'
  mpesaType: 'till' | 'paybill'
  mpesaNumber: string
  productName: string
  productPrice: number
  productDescription: string
  productStock: number
  productPhoto?: string | null
}) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    // Check if slug is available
    const existingStore = await prisma.store.findUnique({
      where: { subdomain: data.businessSlug }
    })

    if (existingStore) {
      return { success: false, error: 'Store URL already taken' }
    }

    // Create store and first product in a transaction
    const store = await prisma.store.create({
      data: {
        userId: user.id,
        name: data.businessName,
        subdomain: data.businessSlug,
        description: data.businessDescription,
        category: data.businessCategory,
        template: data.selectedTemplate,
        mpesaType: data.mpesaType,
        mpesaNumber: data.mpesaNumber,

        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
        products: {
          create: {
            name: data.productName,
            description: data.productDescription,
            price: data.productPrice,
            stock: data.productStock,
            trackStock: true,
            visible: true,
            images: data.productPhoto ? [data.productPhoto] : []
          }
        }
      },
      include: {
        products: true
      }
    })

    revalidatePath('/dashboard')
    revalidatePath(`/store/${data.businessSlug}`)

    return {
      success: true,
      store: {
        id: store.id,
        subdomain: store.subdomain,
        name: store.name
      }
    }
  } catch (error) {
    console.error('[v0] Onboarding error:', error)
    return { success: false, error: 'Failed to complete onboarding' }
  }
}
