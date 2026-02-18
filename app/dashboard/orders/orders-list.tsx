'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search, Phone } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'

type OrderStatus = 'pending_payment' | 'paid' | 'processing' | 'dispatched' | 'delivered' | 'cancelled'

interface Order {
  id: string
  orderRef: string
  customerName: string
  customerPhone: string
  total: number
  status: OrderStatus
  paymentStatus: string
  createdAt: Date
  items: { productName: string; quantity: number }[]
}

const statusConfig: Record<OrderStatus, { label: string; className: string; color: string }> = {
  pending_payment: { label: 'Pending Payment', className: 'bg-yellow-100 text-yellow-800', color: 'border-yellow-500' },
  paid: { label: 'Paid', className: 'bg-green-100 text-green-800', color: 'border-green-500' },
  processing: { label: 'Processing', className: 'bg-blue-100 text-blue-800', color: 'border-blue-500' },
  dispatched: { label: 'Dispatched', className: 'bg-purple-100 text-purple-800', color: 'border-purple-500' },
  delivered: { label: 'Delivered', className: 'bg-gray-100 text-gray-800', color: 'border-gray-500' },
  cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800', color: 'border-red-500' },
}

function getOrderStatusCounts(orders: Order[]) {
  return {
    all: orders.length,
    pending_payment: orders.filter(o => o.status === 'pending_payment').length,
    paid: orders.filter(o => o.status === 'paid').length,
    processing: orders.filter(o => o.status === 'processing').length,
    dispatched: orders.filter(o => o.status === 'dispatched').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  }
}

function formatOrderItems(items: { productName: string; quantity: number }[]) {
  if (items.length === 1) {
    return `${items[0].productName} × ${items[0].quantity}`
  }
  return `${items[0].productName} +${items.length - 1} more`
}

export function OrdersList({ initialOrders, storeId }: { initialOrders: Order[], storeId: string }) {
  const [selectedFilter, setSelectedFilter] = useState<OrderStatus | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [orders] = useState<Order[]>(initialOrders)
  const [showNewOrderToast, setShowNewOrderToast] = useState(false)

  const statusCounts = getOrderStatusCounts(orders)

  // Filter orders
  const filteredOrders = orders.filter(order => {
    // Filter by status
    if (selectedFilter !== 'all' && order.status !== selectedFilter) {
      return false
    }

    // Filter by searchquery
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        order.orderRef.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.customerPhone.includes(query)
      )
    }

    return true
  })

  // Show new order notification after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewOrderToast(true)
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (showNewOrderToast) {
      const timer = setTimeout(() => {
        setShowNewOrderToast(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [showNewOrderToast])

  const filters: { key: OrderStatus | 'all', label: string, count: number }[] = [
    { key: 'all', label: 'All', count: statusCounts.all },
    { key: 'pending_payment', label: 'Pending Payment', count: statusCounts.pending_payment },
    { key: 'paid', label: 'Paid', count: statusCounts.paid },
    { key: 'processing', label: 'Processing', count: statusCounts.processing },
    { key: 'dispatched', label: 'Dispatched', count: statusCounts.dispatched },
    { key: 'delivered', label: 'Delivered', count: statusCounts.delivered },
    { key: 'cancelled', label: 'Cancelled', count: statusCounts.cancelled },
  ]

  return (
    <div className="space-y-6">
      {/* New Order Toast Notification */}
      {showNewOrderToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
          <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-4 min-w-[320px]">
            <div className="flex-1">
              <p className="font-semibold">New order! Wanjiru Kamau</p>
              <p className="text-sm text-green-50">KES 2,800</p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              asChild
              onClick={() => setShowNewOrderToast(false)}
            >
              <Link href="/dashboard/orders/ORD-2026-00851">View</Link>
            </Button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Orders
        </h1>
      </div>

      {/* Filter Tabs */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-2 min-w-max pb-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              className={cn(
                'px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2',
                selectedFilter === filter.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {filter.label}
              <Badge
                variant="secondary"
                className={cn(
                  'ml-1',
                  selectedFilter === filter.key
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-background/50'
                )}
              >
                {filter.count}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by customer name or reference..."
          className="pl-10 h-12 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Mobile: Order Cards */}
      <div className="lg:hidden space-y-3">
        {filteredOrders.map((order) => {
          const config = statusConfig[order.status]
          return (
            <Link
              key={order.orderRef}
              href={`/dashboard/orders/${order.orderRef}`}
              className={cn(
                'block bg-card border-l-4 rounded-lg p-4 space-y-3 transition-all hover:shadow-md',
                config.color
              )}
            >
              {/* Top Row: Reference + Status */}
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono font-semibold text-foreground">
                  {order.orderRef}
                </span>
                <Badge className={cn('shrink-0', config.className)}>
                  {config.label}
                </Badge>
              </div>

              {/* Customer Info */}
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-foreground">{order.customerName}</span>
                <span className="text-muted-foreground">•</span>
                <a
                  href={`tel:${order.customerPhone.replace(/\s/g, '')}`}
                  className="text-muted-foreground hover:text-primary flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Phone className="w-3 h-3" />
                  {order.customerPhone}
                </a>
              </div>

              {/* Products Summary */}
              <p className="text-sm text-muted-foreground">
                {formatOrderItems(order.items)}
              </p>

              {/* Amount + Time */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">
                  KES {order.total.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Desktop: Table */}
      <div className="hidden lg:block bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Reference</TableHead>
              <TableHead className="font-semibold">Customer</TableHead>
              <TableHead className="font-semibold">Products</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => {
              const config = statusConfig[order.status]
              return (
                <TableRow
                  key={order.orderRef}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => window.location.href = `/dashboard/orders/${order.orderRef}`}
                >
                  <TableCell className="font-mono font-semibold">
                    {order.orderRef}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{order.customerName}</span>
                      <span className="text-xs text-muted-foreground">{order.customerPhone}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-[300px]">
                    {formatOrderItems(order.items)}
                  </TableCell>
                  <TableCell className="font-semibold text-primary">
                    KES {order.total.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={config.className}>
                      {config.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">
                    {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredOrders.length} of {orders.length} orders
        </p>
      </div>
    </div>
  )
}
