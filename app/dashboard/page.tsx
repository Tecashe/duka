import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { prisma, isPrismaAvailable } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TrendingUp, DollarSign, ShoppingBag, Package, Plus, Share2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react'
import { CopyUrlButton } from './components/copy-url-button'

async function getDashboardData(userId: string) {
  if (!isPrismaAvailable) {
    console.log('[v0] Using demo data. Connect database for live data.')
    // Returnmock data for demo
    return {
      store: {
        id: 'demo-store',
        name: 'Mama Grace Fashions',
        subdomain: 'mamagrace',
        description: 'Quality African fashion'
      },
      stats: {
        totalRevenue: 0,
        monthRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        lowStock: 0
      },
      recentOrders: []
    }
  }

  const store = await prisma.store.findFirst({
    where: { userId },
    include: {
      products: { where: { visible: true } },
      orders: {
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            include: { product: true }
          }
        }
      }
    }
  })

  if (!store) return null

  // Calculate stats
  const totalRevenue = await prisma.order.aggregate({
    where: {
      storeId: store.id,
      paymentStatus: 'paid'
    },
    _sum: { total: true },
    _count: true
  })

  const thisMonthRevenue = await prisma.order.aggregate({
    where: {
      storeId: store.id,
      paymentStatus: 'paid',
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    },
    _sum: { total: true }
  })

  const lowStockProducts = store.products.filter((p: { trackStock: any; stock: number }) => p.trackStock && p.stock <= 5).length

  return {
    store,
    stats: {
      totalRevenue: totalRevenue._sum.total || 0,
      totalOrders: totalRevenue._count,
      activeProducts: store.products.length,
      lowStockProducts,
      thisMonthRevenue: thisMonthRevenue._sum.total || 0
    },
    recentOrders: store.orders
  }
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const data = await getDashboardData(user.id)

  if (!data) {
    // No store yet - redirect to onboarding
    redirect('/onboarding')
  }

  const { store, stats, recentOrders } = data

  const storeUrl = `duka-my.vercel.app/store/${store.subdomain}`
  const storeFullUrl = `https://duka-my.vercel.app/store/${store.subdomain}`

  const dashboardStats = [
    {
      title: 'Total Revenue',
      value: `KES ${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive' as const,
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: ShoppingBag,
      change: `${recentOrders.length} recent`,
      changeType: 'positive' as const,
    },
    {
      title: 'Active Products',
      value: stats.activeProducts.toString(),
      icon: Package,
      change: stats.lowStockProducts ? `${stats.lowStockProducts} low stock` : 'All in stock',
      changeType: stats.lowStockProducts > 0 ? 'warning' as const : 'positive' as const,
    },
    {
      title: 'This Month',
      value: `KES ${stats.thisMonthRevenue.toLocaleString()}`,
      icon: TrendingUp,
      change: '+18.2%',
      changeType: 'positive' as const,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Welcome back, {user.name}</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with {store.name}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href={storeFullUrl} target="_blank">
              <Share2 className="h-4 w-4 mr-2" />
              View Store
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/dashboard/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      {/* Store URL Card */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Your store URL</p>
              <p className="text-lg font-mono font-medium">{storeUrl}</p>
            </div>
            <div className="flex gap-2">
              <CopyUrlButton url={storeFullUrl} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs mt-1 ${stat.changeType === 'positive' ? 'text-primary' :
                stat.changeType === 'warning' ? 'text-amber-600' :
                  'text-muted-foreground'
                }`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest customer orders</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/orders">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No orders yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Share your store link to start receiving orders
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Phone</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order: { id: Key | null | undefined; orderRef: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; customerName: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; customerPhone: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; total: { toLocaleString: () => string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }; status: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; paymentStatus: string; createdAt: string | number | Date }) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Link
                          href={`/dashboard/orders/${order.orderRef}`}
                          className="font-medium hover:underline"
                        >
                          {order.orderRef}
                        </Link>
                      </TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell className="hidden sm:table-cell">{order.customerPhone}</TableCell>
                      <TableCell className="text-right font-medium">
                        KES {order.total.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          order.status === 'delivered' ? 'default' :
                            order.status === 'dispatched' ? 'secondary' :
                              order.paymentStatus === 'pending' ? 'outline' :
                                'default'
                        }>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                        {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
