'use server'

import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function createProduct(data: {
  name: string
  description?: string
  price: number
  compareAtPrice?: number
  stock: number
  trackStock: boolean
  visible: boolean
  category?: string
  images: string[]
}) {
  const session = await requireAuth()

  // Get user's store
  const store = await prisma.store.findUnique({
    where: { userId: session.id }
  })

  if (!store) {
    throw new Error('Store not found')
  }

  const product = await prisma.product.create({
    data: {
      ...data,
      storeId: store.id
    }
  })

  revalidatePath('/dashboard/products')
  revalidatePath(`/store/${store.subdomain}`)
  return product
}

export async function updateProduct(productId: string, data: {
  name?: string
  description?: string
  price?: number
  compareAtPrice?: number
  stock?: number
  trackStock?: boolean
  visible?: boolean
  category?: string
  images?: string[]
}) {
  const session = await requireAuth()

  // Verify ownership
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      store: { userId: session.id }
    },
    include: { store: true }
  })

  if (!product) {
    throw new Error('Product not found or unauthorized')
  }

  const updated = await prisma.product.update({
    where: { id: productId },
    data
  })

  revalidatePath('/dashboard/products')
  revalidatePath(`/store/${product.store.subdomain}`)
  return updated
}

// export async function deleteProduct(productId: string) {
//   const session = await requireAuth()

//   const product = await prisma.product.findFirst({
//     where: {
//       id: productId,
//       store: { userId: session.id }
//     },
//     include: { store: true }
//   })

//   if (!product) {
//     throw new Error('Product not found or unauthorized')
//   }

//   await prisma.product.delete({
//     where: { id: productId }
//   })

//   revalidatePath('/dashboard/products')
//   revalidatePath(`/store/${product.store.subdomain}`)
// }

export async function deleteProduct(productId: string) {
  try {
    const session = await requireAuth()

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        store: { userId: session.id },
      },
      include: { store: true },
    })

    if (!product) {
      return { success: false, error: 'Product not found or unauthorized' }
    }

    await prisma.product.delete({
      where: { id: productId },
    })

    revalidatePath('/dashboard/products')
    revalidatePath(`/store/${product.store.subdomain}`)

    return { success: true, error: null }
  } catch {
    return { success: false, error: 'Failed to delete product' }
  }
}

export async function getStoreProducts(storeId: string) {
  return prisma.product.findMany({
    where: { storeId },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getProduct(productId: string) {
  return prisma.product.findUnique({
    where: { id: productId },
    include: { store: true }
  })
}

// export async function toggleProductVisibility(productId: string) {
//   const session = await requireAuth()

//   const product = await prisma.product.findFirst({
//     where: {
//       id: productId,
//       store: { userId: session.id }
//     },
//     include: { store: true }
//   })

//   if (!product) {
//     throw new Error('Product not found or unauthorized')
//   }

//   const updated = await prisma.product.update({
//     where: { id: productId },
//     data: { visible: !product.visible }
//   })

//   revalidatePath('/dashboard/products')
//   revalidatePath(`/store/${product.store.subdomain}`)
//   return updated
// }

// export async function toggleProductVisibility(productId: string) {
//   try {
//     const session = await requireAuth()
//     const product = await prisma.product.findFirst({
//       where: {
//         id: productId,
//         store: { userId: session.id },
//       },
//       include: { store: true },
//     })

//     if (!product) {
//       return { success: false, error: 'Product not found or unauthorized' }
//     }

//     await prisma.product.update({
//       where: { id: productId },
//       data: { visible: !product.visible },
//     })

//     revalidatePath('/dashboard/products')
//     revalidatePath(`/store/${product.store.subdomain}`)

//     return { success: true }
//   } catch (error) {
//     return { success: false, error: 'Failed to update product visibility' }
//   }
// }

export async function toggleProductVisibility(productId: string) {
  try {
    const session = await requireAuth()

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        store: { userId: session.id },
      },
      include: { store: true },
    })

    if (!product) {
      return { success: false, error: 'Product not found or unauthorized' }
    }

    await prisma.product.update({
      where: { id: productId },
      data: { visible: !product.visible },
    })

    revalidatePath('/dashboard/products')
    revalidatePath(`/store/${product.store.subdomain}`)

    return { success: true, error: null }
  } catch {
    return { success: false, error: 'Failed to update product visibility' }
  }
}