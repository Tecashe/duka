import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const session = await requireAuth()

    const store = await prisma.store.findUnique({
      where: { userId: session.id }
    })

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 })
    }

    // Get date range (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    // Parallel queries for better performance
    const [
      totalRevenue,
      monthlyRevenue,
      totalOrders,
      pendingOrders,
      totalProducts,
      lowStockProducts,
      recentOrders
    ] = await Promise.all([
      // Total all-time revenue
      prisma.order.aggregate({
        where: {
          storeId: store.id,
          paymentStatus: 'paid'
        },
        _sum: { total: true }
      }),
      // Monthly revenue
      prisma.order.aggregate({
        where: {
          storeId: store.id,
          paymentStatus: 'paid',
          createdAt: { gte: thirtyDaysAgo }
        },
        _sum: { total: true }
      }),
      // Total orders count
      prisma.order.count({
        where: { storeId: store.id }
      }),
      // Pending orders count
      prisma.order.count({
        where: {
          storeId: store.id,
          status: 'pending'
        }
      }),
      // Total products
      prisma.product.count({
        where: { storeId: store.id }
      }),
      // Low stock products
      prisma.product.count({
        where: {
          storeId: store.id,
          trackStock: true,
          stock: { lte: 5 }
        }
      }),
      // Recent orders
      prisma.order.findMany({
        where: { storeId: store.id },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          items: { include: { product: true } }
        }
      })
    ])

    return NextResponse.json({
      revenue: {
        total: totalRevenue._sum.total || 0,
        monthly: monthlyRevenue._sum.total || 0
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders
      },
      products: {
        total: totalProducts,
        lowStock: lowStockProducts
      },
      recentOrders
    })
  } catch (error) {
    console.error('[v0] Dashboard stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
