'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ArrowLeft, Phone, Mail, MapPin, CheckCircle2, Circle, Loader2, AlertTriangle } from 'lucide-react'
import { sampleOrders, statusConfig, type OrderStatus, type Order } from '@/lib/orders'
import { cn } from '@/lib/utils'

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const ref = params.ref as string

  const order = sampleOrders.find(o => o.reference === ref)
  
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order?.status || 'pending_payment')
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [pendingStatus, setPendingStatus] = useState<OrderStatus | null>(null)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  if (!order) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Order not found</p>
      </div>
    )
  }

  const config = statusConfig[currentStatus]

  // Determine next logical status
  const getNextStatus = (status: OrderStatus): OrderStatus | null => {
    const flow: Record<OrderStatus, OrderStatus | null> = {
      pending_payment: 'paid',
      paid: 'confirmed',
      confirmed: 'processing',
      processing: 'dispatched',
      dispatched: 'delivered',
      delivered: null,
      cancelled: null,
      refunded: null
    }
    return flow[status]
  }

  const nextStatus = getNextStatus(currentStatus)

  const handleStatusUpdate = (newStatus: OrderStatus) => {
    setPendingStatus(newStatus)
    setShowConfirmDialog(true)
  }

  const confirmStatusUpdate = () => {
    if (!pendingStatus) return
    
    setIsUpdating(true)
    // Simulate API call
    setTimeout(() => {
      setCurrentStatus(pendingStatus)
      setShowConfirmDialog(false)
      setPendingStatus(null)
      setIsUpdating(false)
    }, 1000)
  }

  const handleCancelOrder = () => {
    setIsUpdating(true)
    setTimeout(() => {
      setCurrentStatus('cancelled')
      setShowCancelDialog(false)
      setIsUpdating(false)
    }, 1000)
  }

  const canBeCancelled = currentStatus !== 'dispatched' && currentStatus !== 'delivered' && currentStatus !== 'cancelled'

  // Build timeline with current status
  const fullTimeline = [...order.timeline]
  const statusOrder: OrderStatus[] = ['pending_payment', 'paid', 'confirmed', 'processing', 'dispatched', 'delivered']
  const currentIndex = statusOrder.indexOf(currentStatus)

  return (
    <div className="space-y-6 pb-24 lg:pb-6">
      {/* Back Navigation */}
      <Link 
        href="/dashboard/orders"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Orders
      </Link>

      {/* Order Header */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-foreground">
            {order.reference}
          </h1>
          <Badge className={cn('w-fit text-base px-4 py-1.5', config.className)}>
            {config.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {formatOrderDate(order.createdAt)}
        </p>
      </div>

      {/* Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
          <CardDescription>Track the progress of this order</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statusOrder.map((status, index) => {
              const isCompleted = index <= currentIndex
              const isCurrent = index === currentIndex
              const timelineEntry = order.timeline.find(t => t.status === status)
              const statusCfg = statusConfig[status]
              
              return (
                <div key={status} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                      isCompleted 
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}>
                      {isCompleted ? (
                        isCurrent ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5" />
                        )
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </div>
                    {index < statusOrder.length - 1 && (
                      <div className={cn(
                        'w-0.5 h-12 transition-colors',
                        isCompleted ? 'bg-primary' : 'bg-muted'
                      )} />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <p className={cn(
                      'font-medium',
                      isCompleted ? 'text-foreground' : 'text-muted-foreground'
                    )}>
                      {statusCfg.label}
                    </p>
                    {timelineEntry && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatTimelineDate(timelineEntry.timestamp)}
                        {timelineEntry.note && (
                          <p className="mt-1">{timelineEntry.note}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Status Update Controls */}
      {currentStatus !== 'delivered' && currentStatus !== 'cancelled' && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Update Order Status</CardTitle>
            <CardDescription>Move this order to the next stage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {nextStatus && (
              <Button
                className="w-full sm:w-auto"
                size="lg"
                onClick={() => handleStatusUpdate(nextStatus)}
              >
                Mark as {statusConfig[nextStatus].label} →
              </Button>
            )}
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Or change to:</span>
              <Select onValueChange={(value) => handleStatusUpdate(value as OrderStatus)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOrder
                    .filter(s => s !== currentStatus && s !== 'pending_payment')
                    .map(status => (
                      <SelectItem key={status} value={status}>
                        {statusConfig[status].label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Customer Details */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Name</p>
              <p className="font-medium">{order.customer.name}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-1">Phone</p>
              <a 
                href={`tel:${order.customer.phone.replace(/\s/g, '')}`}
                className="font-medium text-primary hover:underline flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                {order.customer.phone}
              </a>
            </div>

            {order.customer.email && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <a 
                  href={`mailto:${order.customer.email}`}
                  className="font-medium text-primary hover:underline flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  {order.customer.email}
                </a>
              </div>
            )}

            <div>
              <p className="text-sm text-muted-foreground mb-1">Delivery</p>
              <p className="font-medium capitalize">{order.deliveryType}</p>
            </div>

            {order.deliveryAddress && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Address</p>
                <p className="font-medium flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{order.deliveryAddress}</span>
                </p>
              </div>
            )}

            {order.specialInstructions && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Special Instructions</p>
                <p className="font-medium text-amber-700 dark:text-amber-400 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{order.specialInstructions}</span>
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {item.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    KES {item.unitPrice.toLocaleString()} × {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    KES {item.lineTotal.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">KES {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-medium">KES {order.deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span className="text-primary">KES {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Details */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Payment Status</p>
            <Badge className={order.payment?.status === 'paid' ? 'bg-green-600 text-white' : 'bg-amber-100 text-amber-800'}>
              {order.payment?.status === 'paid' ? 'Paid ✓' : 'Pending'}
            </Badge>
          </div>

          {order.payment?.mpesaReceipt && (
            <>
              <div>
                <p className="text-sm text-muted-foreground mb-1">M-Pesa Receipt</p>
                <p className="font-mono font-semibold">{order.payment.mpesaReceipt}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Paid By</p>
                <p className="font-medium">{order.payment.paidBy}</p>
              </div>

              {order.payment.paidAt && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Confirmed At</p>
                  <p className="font-medium">{formatTimelineDate(order.payment.paidAt)}</p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      {canBeCancelled && (
        <Card className="border-red-200 dark:border-red-900">
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-400">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
              onClick={() => setShowCancelDialog(true)}
            >
              Cancel Order
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Status Update Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Order Status?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingStatus && (
                <>
                  Mark this order as <strong>{statusConfig[pendingStatus].label}</strong>? 
                  The customer will be notified of this change.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmStatusUpdate}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Confirm'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancel Order Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this order?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The customer will be notified that their order has been cancelled.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>No, keep order</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancelOrder}
              disabled={isUpdating}
              className="bg-red-600 hover:bg-red-700"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Cancelling...
                </>
              ) : (
                'Yes, cancel order'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Mobile Sticky Action Button */}
      {nextStatus && currentStatus !== 'delivered' && currentStatus !== 'cancelled' && (
        <div className="lg:hidden fixed bottom-20 left-0 right-0 p-4 bg-background border-t z-40">
          <Button
            className="w-full"
            size="lg"
            onClick={() => handleStatusUpdate(nextStatus)}
          >
            Mark as {statusConfig[nextStatus].label} →
          </Button>
        </div>
      )}
    </div>
  )
}

function formatOrderDate(date: Date): string {
  const now = Date.now()
  const diff = now - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  let timeAgo = ''
  if (minutes < 60) timeAgo = `${minutes} minutes ago`
  else if (hours < 24) timeAgo = `${hours} hour${hours > 1 ? 's' : ''} ago`
  else timeAgo = `${days} day${days > 1 ? 's' : ''} ago`

  const dateStr = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  return `${timeAgo} — ${dateStr} at ${timeStr}`
}

function formatTimelineDate(date: Date): string {
  const dateStr = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  return `${timeStr}, ${dateStr}`
}
