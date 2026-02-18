'use server'

import { prisma, isPrismaAvailable } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

function generateOrderReference(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = 'ORD-'
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export async function createOrder(data: {
  storeId: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  deliveryMethod: 'delivery' | 'pickup'
  deliveryAddress?: string
  deliveryFee: number
  items: Array<{
    productId: string
    quantity: number
    price: number
    productName: string
  }>
  subtotal: number
  total: number
}) {
  const reference = generateOrderReference()

  const order = await prisma.order.create({
    data: {
      reference,
      storeId: data.storeId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      deliveryMethod: data.deliveryMethod,
      deliveryAddress: data.deliveryAddress,
      deliveryFee: data.deliveryFee,
      subtotal: data.subtotal,
      total: data.total,
      items: {
        create: data.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          productName: item.productName
        }))
      },
      timeline: {
        create: {
          status: 'pending',
          note: 'Order placed by customer'
        }
      }
    },
    include: {
      items: true,
      store: true
    }
  })

  // Update product stock if tracking
  for (const item of data.items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId }
    })

    if (product?.trackStock) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } }
      })
    }
  }

  revalidatePath(`/store/${order.store.subdomain}`)
  return order
}

export async function updateOrderStatus(orderId: string, status: string, note?: string) {
  const session = await requireAuth()

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      store: { userId: session.id }
    },
    include: { store: true }
  })

  if (!order) {
    throw new Error('Order not found or unauthorized')
  }

  const updateData: any = { status }

  if (status === 'confirmed') {
    updateData.confirmedAt = new Date()
    updateData.paymentStatus = 'paid'
  } else if (status === 'delivered') {
    updateData.deliveredAt = new Date()
  }

  const updated = await prisma.order.update({
    where: { id: orderId },
    data: updateData
  })

  await prisma.orderTimeline.create({
    data: {
      orderId,
      status,
      note: note || `Order ${status}`
    }
  })

  revalidatePath('/dashboard/orders')
  revalidatePath(`/dashboard/orders/${order.reference}`)
  return updated
}

export async function confirmPayment(orderId: string, mpesaReceipt: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { store: true }
  })

  if (!order) {
    throw new Error('Order not found')
  }

  const updated = await prisma.order.update({
    where: { id: orderId },
    data: {
      paymentStatus: 'paid',
      mpesaReceipt,
      status: 'confirmed',
      confirmedAt: new Date()
    }
  })

  await prisma.orderTimeline.create({
    data: {
      orderId,
      status: 'confirmed',
      note: `Payment confirmed - ${mpesaReceipt}`
    }
  })

  revalidatePath(`/store/${order.store.subdomain}/order/${order.reference}`)
  return updated
}

export async function getStoreOrders(storeId: string) {
  if (!isPrismaAvailable) {
    const { mockOrders } = await import('@/lib/db-fallback')
    return mockOrders.filter(o => o.storeId === storeId)
  }

  const session = await requireAuth()

  const store = await prisma.store.findFirst({
    where: { id: storeId, userId: session.id }
  })

  if (!store) {
    throw new Error('Store not found or unauthorized')
  }

  return prisma.order.findMany({
    where: { storeId },
    include: {
      items: { include: { product: true } }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getOrder(reference: string) {
  return prisma.order.findUnique({
    where: { reference },
    include: {
      items: { include: { product: true } },
      timeline: { orderBy: { createdAt: 'desc' } },
      store: true
    }
  })
}

export async function getOrderForSeller(reference: string) {
  const session = await requireAuth()

  return prisma.order.findFirst({
    where: {
      reference,
      store: { userId: session.id }
    },
    include: {
      items: { include: { product: true } },
      timeline: { orderBy: { createdAt: 'desc' } },
      store: true
    }
  })
}

export async function cancelOrder(orderId: string, reason: string) {
  const session = await requireAuth()

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      store: { userId: session.id }
    },
    include: { items: true }
  })

  if (!order) {
    throw new Error('Order not found or unauthorized')
  }

  if (['dispatched', 'delivered'].includes(order.status)) {
    throw new Error('Cannot cancel order in this status')
  }

  // Restore stock
  for (const item of order.items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId }
    })

    if (product?.trackStock) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { increment: item.quantity } }
      })
    }
  }

  const updated = await prisma.order.update({
    where: { id: orderId },
    data: { status: 'cancelled' }
  })

  await prisma.orderTimeline.create({
    data: {
      orderId,
      status: 'cancelled',
      note: reason
    }
  })

  revalidatePath('/dashboard/orders')
  return updated
}
