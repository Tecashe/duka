// Fallback data when database is not available
export const isDatabaseAvailable = process.env.DATABASE_URL !== undefined

export const mockUsers = [
  {
    id: '1',
    email: 'demo@duka.com',
    name: 'Demo User',
    phone: '+254712345678',
    createdAt: new Date('2026-02-01'),
  }
]

export const mockStores = [
  {
    id: '1',
    userId: '1',
    name: 'Mama Grace Fashions',
    subdomain: 'mamagrace',
    description: 'Quality African fashion and accessories',
    category: 'Fashion & Clothing',
    template: 'vibrant',
    mpesaNumber: '5678901',
    mpesaType: 'till',
    isActive: true,
    createdAt: new Date('2026-02-01'),
  }
]

export const mockProducts = [
  {
    id: '1',
    storeId: '1',
    name: 'Ankara Wrap Dress',
    description: 'Beautiful versatile Ankara wrap dress',
    price: 2800,
    compareAtPrice: null,
    stock: 12,
    trackStock: true,
    visible: true,
    images: ['/products/ankara-dress.jpg'],
    createdAt: new Date('2026-02-15'),
    updatedAt: new Date('2026-02-15'),
  },
  {
    id: '2',
    storeId: '1',
    name: 'Kitenge Blazer',
    description: 'Stylish Kitenge blazer',
    price: 4500,
    compareAtPrice: null,
    stock: 3,
    trackStock: true,
    visible: true,
    images: ['/products/kitenge-blazer.jpg'],
    createdAt: new Date('2026-02-14'),
    updatedAt: new Date('2026-02-14'),
  }
]

export const mockOrders = [
  {
    id: '1',
    storeId: '1',
    orderRef: 'DK-20260218-001',
    customerName: 'Wanjiru Kamau',
    customerEmail: 'wanjiru@example.com',
    customerPhone: '+254722123456',
    deliveryAddress: 'Nairobi, Kenya',
    deliveryMethod: 'delivery',
    status: 'paid',
    paymentStatus: 'paid',
    mpesaReceiptNumber: 'QA12BC3456',
    total: 2800,
    createdAt: new Date('2026-02-18'),
    updatedAt: new Date('2026-02-18'),
    items: [
      {
        id: '1',
        orderId: '1',
        productId: '1',
        productName: 'Ankara Wrap Dress',
        quantity: 1,
        price: 2800,
      }
    ]
  }
]

export function getMockStats(storeId: string) {
  const storeOrders = mockOrders.filter(o => o.storeId === storeId)
  const revenue = storeOrders.reduce((sum, o) => sum + o.total, 0)
  
  return {
    revenue,
    orders: storeOrders.length,
    products: mockProducts.filter(p => p.storeId === storeId).length,
    recentOrders: storeOrders.slice(0, 5)
  }
}
