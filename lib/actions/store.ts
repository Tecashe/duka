'use server'

import { prisma, isPrismaAvailable } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function createStore(data: {
  subdomain: string
  name: string
  description?: string
  category: string
}) {
  if (!isPrismaAvailable) {
    return { success: false, error: 'Database not connected. Please set up database first.' }
  }

  const session = await requireAuth()

  // Check if subdomain is available
  const existing = await prisma.store.findUnique({
    where: { subdomain: data.subdomain }
  })

  if (existing) {
    throw new Error('Subdomain already taken')
  }

  // Check if user already has a store
  const userStore = await prisma.store.findUnique({
    where: { userId: session.id }
  })

  if (userStore) {
    throw new Error('User already has a store')
  }

  const store = await prisma.store.create({
    data: {
      ...data,
      userId: session.id,
      trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    }
  })

  revalidatePath('/dashboard')
  return store
}

export async function updateStore(storeId: string, data: {
  name?: string
  description?: string
  logoUrl?: string
  template?: string
  mpesaType?: string
  mpesaNumber?: string
  mpesaAccountName?: string
  allowDelivery?: boolean
  deliveryFee?: number
  allowPickup?: boolean
  pickupAddress?: string
}) {
  const session = await requireAuth()

  // Verify ownership
  const store = await prisma.store.findFirst({
    where: { id: storeId, userId: session.id }
  })

  if (!store) {
    throw new Error('Store not found or unauthorized')
  }

  const updated = await prisma.store.update({
    where: { id: storeId },
    data
  })

  revalidatePath('/dashboard/settings')
  revalidatePath(`/store/${store.subdomain}`)
  return updated
}

export async function getStoreBySubdomain(subdomain: string) {
  if (!isPrismaAvailable) return null
  
  return prisma.store.findUnique({
    where: { subdomain, visible: true },
    include: {
      products: {
        where: { visible: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  })
}

export async function getUserStore(userId?: string) {
  if (!isPrismaAvailable) {
    // Return mock store for demo
    const { mockStores } = await import('@/lib/db-fallback')
    return mockStores[0] || null
  }
  
  const session = userId ? { id: userId } : await requireAuth()

  return prisma.store.findUnique({
    where: { userId: session.id },
    include: {
      products: {
        orderBy: { createdAt: 'desc' }
      },
      _count: {
        select: { orders: true, products: true }
      }
    }
  })
}

export async function checkSubdomainAvailability(subdomain: string): Promise<boolean> {
  const reserved = ['www', 'api', 'admin', 'dashboard', 'app', 'store', 'shop']
  if (reserved.includes(subdomain.toLowerCase())) {
    return false
  }

  if (!isPrismaAvailable) return true

  const existing = await prisma.store.findUnique({
    where: { subdomain }
  })

  return !existing
}

export async function getStoreProducts(storeId: string) {
  if (!isPrismaAvailable) {
    const { mockProducts } = await import('@/lib/db-fallback')
    return mockProducts.filter(p => p.storeId === storeId)
  }

  return prisma.product.findMany({
    where: { storeId },
    orderBy: { createdAt: 'desc' }
  })
}
