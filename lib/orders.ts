export type OrderStatus = 
  | 'pending_payment' 
  | 'paid' 
  | 'confirmed'
  | 'processing' 
  | 'dispatched' 
  | 'delivered' 
  | 'cancelled'
  | 'refunded'

export interface OrderItem {
  id: string
  name: string
  quantity: number
  unitPrice: number
  lineTotal: number
  image?: string
}

export interface Order {
  reference: string
  customer: {
    name: string
    phone: string
    email?: string
  }
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  total: number
  status: OrderStatus
  createdAt: Date
  deliveryType: 'pickup' | 'delivery'
  deliveryAddress?: string
  specialInstructions?: string
  payment?: {
    status: 'pending' | 'paid'
    mpesaReceipt?: string
    paidBy?: string
    paidAt?: Date
  }
  timeline: {
    status: OrderStatus
    timestamp: Date
    note?: string
  }[]
}

export const statusConfig: Record<OrderStatus, { 
  label: string
  className: string
  color: string
}> = {
  pending_payment: {
    label: 'Pending Payment',
    className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    color: 'border-amber-500'
  },
  paid: {
    label: 'Paid',
    className: 'bg-green-600 text-white',
    color: 'border-green-500'
  },
  confirmed: {
    label: 'Confirmed',
    className: 'bg-emerald-600 text-white',
    color: 'border-emerald-500'
  },
  processing: {
    label: 'Processing',
    className: 'bg-blue-600 text-white',
    color: 'border-blue-500'
  },
  dispatched: {
    label: 'Dispatched',
    className: 'bg-purple-600 text-white',
    color: 'border-purple-500'
  },
  delivered: {
    label: 'Delivered',
    className: 'bg-gray-600 text-white',
    color: 'border-gray-500'
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-600 text-white',
    color: 'border-red-500'
  },
  refunded: {
    label: 'Refunded',
    className: 'bg-orange-600 text-white',
    color: 'border-orange-500'
  }
}

// Sample order data
export const sampleOrders: Order[] = [
  {
    reference: 'ORD-2026-00851',
    customer: { name: 'Wanjiru Kamau', phone: '0712 445 678', email: 'wanjiru@email.com' },
    items: [
      { id: '1', name: 'Ankara Wrap Dress', quantity: 1, unitPrice: 2800, lineTotal: 2800 }
    ],
    subtotal: 2800,
    deliveryFee: 200,
    total: 3000,
    status: 'paid',
    createdAt: new Date(Date.now() - 12 * 60 * 1000), // 12 min ago
    deliveryType: 'delivery',
    deliveryAddress: 'Kilimani, Nairobi',
    payment: {
      status: 'paid',
      mpesaReceipt: 'RGT34GFH12',
      paidBy: '0712 445 678',
      paidAt: new Date(Date.now() - 11 * 60 * 1000)
    },
    timeline: [
      { status: 'pending_payment', timestamp: new Date(Date.now() - 12 * 60 * 1000) },
      { status: 'paid', timestamp: new Date(Date.now() - 11 * 60 * 1000), note: 'M-Pesa receipt: RGT34GFH12' }
    ]
  },
  {
    reference: 'ORD-2026-00850',
    customer: { name: 'Otieno James', phone: '0733 221 445', email: 'otieno@email.com' },
    items: [
      { id: '2', name: 'Kitenge Blazer', quantity: 1, unitPrice: 4500, lineTotal: 4500 },
      { id: '3', name: 'African Print Headwrap', quantity: 2, unitPrice: 650, lineTotal: 1300 }
    ],
    subtotal: 5800,
    deliveryFee: 200,
    total: 6000,
    status: 'processing',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hrs ago
    deliveryType: 'delivery',
    deliveryAddress: 'Apt 4B, Ngong Road, Nairobi',
    specialInstructions: 'Please call before delivering',
    payment: {
      status: 'paid',
      mpesaReceipt: 'RGT34GFHJ7',
      paidBy: '0733 221 445',
      paidAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 60000)
    },
    timeline: [
      { status: 'pending_payment', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { status: 'paid', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 60000), note: 'M-Pesa receipt: RGT34GFHJ7' },
      { status: 'confirmed', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 22 * 60000) },
      { status: 'processing', timestamp: new Date(Date.now() - 75 * 60 * 1000) }
    ]
  },
  {
    reference: 'ORD-2026-00849',
    customer: { name: 'Fatuma Abdalla', phone: '0722 887 334' },
    items: [
      { id: '4', name: 'Beaded Maasai Necklace', quantity: 3, unitPrice: 1200, lineTotal: 3600 }
    ],
    subtotal: 3600,
    deliveryFee: 0,
    total: 3600,
    status: 'dispatched',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    deliveryType: 'pickup',
    payment: {
      status: 'paid',
      mpesaReceipt: 'RGT34GFH22',
      paidBy: '0722 887 334',
      paidAt: new Date(Date.now() - 24 * 60 * 60 * 1000 + 5 * 60000)
    },
    timeline: [
      { status: 'pending_payment', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      { status: 'paid', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 5 * 60000) },
      { status: 'confirmed', timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000) },
      { status: 'processing', timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000) },
      { status: 'dispatched', timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000) }
    ]
  },
  {
    reference: 'ORD-2026-00848',
    customer: { name: 'Peter Mwangi', phone: '0711 334 556' },
    items: [
      { id: '5', name: 'Linen Jumpsuit', quantity: 1, unitPrice: 3600, lineTotal: 3600 }
    ],
    subtotal: 3600,
    deliveryFee: 200,
    total: 3800,
    status: 'pending_payment',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hrs ago
    deliveryType: 'delivery',
    deliveryAddress: 'Westlands, Nairobi',
    payment: {
      status: 'pending'
    },
    timeline: [
      { status: 'pending_payment', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) }
    ]
  },
  {
    reference: 'ORD-2026-00847',
    customer: { name: 'Grace Achieng', phone: '0700 112 334' },
    items: [
      { id: '6', name: 'Batik Midi Skirt', quantity: 2, unitPrice: 2100, lineTotal: 4200 }
    ],
    subtotal: 4200,
    deliveryFee: 200,
    total: 4400,
    status: 'paid',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hrs ago
    deliveryType: 'delivery',
    deliveryAddress: 'South C, Nairobi',
    payment: {
      status: 'paid',
      mpesaReceipt: 'RGT34GFH33',
      paidBy: '0700 112 334',
      paidAt: new Date(Date.now() - 3 * 60 * 60 * 1000 + 2 * 60000)
    },
    timeline: [
      { status: 'pending_payment', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) },
      { status: 'paid', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000 + 2 * 60000) }
    ]
  },
  {
    reference: 'ORD-2026-00846',
    customer: { name: 'Mercy Njeri', phone: '0723 445 667' },
    items: [
      { id: '7', name: 'Kanga Throw Shawl', quantity: 1, unitPrice: 950, lineTotal: 950 }
    ],
    subtotal: 950,
    deliveryFee: 200,
    total: 1150,
    status: 'delivered',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    deliveryType: 'delivery',
    deliveryAddress: 'Karen, Nairobi',
    payment: {
      status: 'paid',
      mpesaReceipt: 'RGT34GFH44',
      paidBy: '0723 445 667',
      paidAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 5 * 60000)
    },
    timeline: [
      { status: 'pending_payment', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
      { status: 'paid', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 5 * 60000) },
      { status: 'confirmed', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60000) },
      { status: 'processing', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60000) },
      { status: 'dispatched', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60000) },
      { status: 'delivered', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 6 * 60 * 60000) }
    ]
  },
  {
    reference: 'ORD-2026-00845',
    customer: { name: 'Hassan Omar', phone: '0714 556 778' },
    items: [
      { id: '1', name: 'Ankara Wrap Dress', quantity: 2, unitPrice: 2800, lineTotal: 5600 }
    ],
    subtotal: 5600,
    deliveryFee: 200,
    total: 5800,
    status: 'paid',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    deliveryType: 'delivery',
    deliveryAddress: 'Eastleigh, Nairobi',
    payment: {
      status: 'paid',
      mpesaReceipt: 'RGT34GFH55',
      paidBy: '0714 556 778',
      paidAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 3 * 60000)
    },
    timeline: [
      { status: 'pending_payment', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
      { status: 'paid', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 3 * 60000) }
    ]
  },
  {
    reference: 'ORD-2026-00844',
    customer: { name: 'Aisha Waweru', phone: '0701 223 445' },
    items: [
      { id: '3', name: 'African Print Headwrap', quantity: 1, unitPrice: 650, lineTotal: 650 }
    ],
    subtotal: 650,
    deliveryFee: 200,
    total: 850,
    status: 'cancelled',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    deliveryType: 'delivery',
    deliveryAddress: 'Ruiru, Nairobi',
    payment: {
      status: 'pending'
    },
    timeline: [
      { status: 'pending_payment', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
      { status: 'cancelled', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60000) }
    ]
  },
  {
    reference: 'ORD-2026-00843',
    customer: { name: 'Kipchoge Ruto', phone: '0733 667 889' },
    items: [
      { id: '2', name: 'Kitenge Blazer', quantity: 1, unitPrice: 4500, lineTotal: 4500 }
    ],
    subtotal: 4500,
    deliveryFee: 0,
    total: 4500,
    status: 'delivered',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    deliveryType: 'pickup',
    payment: {
      status: 'paid',
      mpesaReceipt: 'RGT34GFH66',
      paidBy: '0733 667 889',
      paidAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 10 * 60000)
    },
    timeline: [
      { status: 'pending_payment', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
      { status: 'paid', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 10 * 60000) },
      { status: 'confirmed', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 45 * 60000) },
      { status: 'processing', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 3 * 60 * 60000) },
      { status: 'dispatched', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 5 * 60 * 60000) },
      { status: 'delivered', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 8 * 60 * 60000) }
    ]
  },
  {
    reference: 'ORD-2026-00842',
    customer: { name: 'Nyambura Gicheru', phone: '0712 778 990' },
    items: [
      { id: '4', name: 'Beaded Maasai Necklace', quantity: 1, unitPrice: 1200, lineTotal: 1200 },
      { id: '7', name: 'Kanga Throw Shawl', quantity: 2, unitPrice: 950, lineTotal: 1900 }
    ],
    subtotal: 3100,
    deliveryFee: 200,
    total: 3300,
    status: 'dispatched',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    deliveryType: 'delivery',
    deliveryAddress: 'Parklands, Nairobi',
    payment: {
      status: 'paid',
      mpesaReceipt: 'RGT34GFH77',
      paidBy: '0712 778 990',
      paidAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 8 * 60000)
    },
    timeline: [
      { status: 'pending_payment', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
      { status: 'paid', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 8 * 60000) },
      { status: 'confirmed', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 60 * 60000) },
      { status: 'processing', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 4 * 60 * 60000) },
      { status: 'dispatched', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 6 * 60 * 60000) }
    ]
  }
]

export function getOrderStatusCounts(orders: Order[]) {
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

export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  
  if (seconds < 60) return `${seconds} sec ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hr${hours > 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
  const weeks = Math.floor(days / 7)
  return `${weeks} week${weeks > 1 ? 's' : ''} ago`
}

export function formatOrderItems(items: OrderItem[]): string {
  if (items.length === 1) {
    return `${items[0].name} ×${items[0].quantity}`
  }
  const first = items[0]
  const remaining = items.length - 1
  return `${first.name}${remaining > 0 ? ` + ${remaining} more item${remaining > 1 ? 's' : ''}` : ''}`
}
