'use client'

import { useState } from 'react'
import { Bell, Check, ShoppingBag, Package, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

interface Notification {
  id: string
  type: 'order' | 'product' | 'system'
  title: string
  message: string
  createdAt: Date
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'New Order Received',
    message: 'Wanjiru Kamau placed an order for KES 2,800',
    createdAt: new Date(Date.now() - 1000 * 60 * 15),
    read: false
  },
  {
    id: '2',
    type: 'product',
    title: 'Low Stock Alert',
    message: 'Kitenge Blazer has only 3 units left',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false
  },
  {
    id: '3',
    type: 'order',
    title: 'Payment Confirmed',
    message: 'Order #ORD-7832 payment verified',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true
  }
]

const typeConfig = {
  order: { icon: ShoppingBag, color: 'text-primary' },
  product: { icon: Package, color: 'text-amber-500' },
  system: { icon: AlertCircle, color: 'text-blue-500' }
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [open, setOpen] = useState(false)
  
  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto py-1 px-2 text-xs"
              onClick={markAllAsRead}
            >
              Mark all read
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-[320px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => {
                const config = typeConfig[notification.type]
                const Icon = config.icon
                
                return (
                  <button
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={cn(
                      'w-full text-left p-4 hover:bg-muted/50 transition-colors',
                      !notification.read && 'bg-muted/30'
                    )}
                  >
                    <div className="flex gap-3">
                      <div className={cn('mt-0.5', config.color)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium leading-none">
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
