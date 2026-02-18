export interface Product {
  id: string
  name: string
  price: number
  compareAtPrice?: number
  description: string
  stock: number
  trackStock: boolean
  visible: boolean
  category: string
  images: string[]
  createdAt: string
  updatedAt: string
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Ankara Wrap Dress',
    price: 2800,
    description: 'A beautiful, versatile Ankara wrap dress handcrafted in Nairobi. Available in sizes S–XL. Perfect for office, church, or casual outings.',
    stock: 12,
    trackStock: true,
    visible: true,
    category: 'Dresses',
    images: ['/products/ankara-dress.jpg'],
    createdAt: '2026-02-15T10:30:00Z',
    updatedAt: '2026-02-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Kitenge Blazer',
    price: 4500,
    description: 'Stylish Kitenge blazer perfect for professional and casual wear.',
    stock: 3,
    trackStock: true,
    visible: true,
    category: 'Outerwear',
    images: ['/products/kitenge-blazer.jpg'],
    createdAt: '2026-02-14T14:20:00Z',
    updatedAt: '2026-02-14T14:20:00Z'
  },
  {
    id: '3',
    name: 'Beaded Maasai Necklace',
    price: 1200,
    description: 'Traditional handcrafted beaded necklace from Maasai artisans.',
    stock: 28,
    trackStock: true,
    visible: true,
    category: 'Accessories',
    images: ['/products/maasai-necklace.jpg'],
    createdAt: '2026-02-13T09:15:00Z',
    updatedAt: '2026-02-13T09:15:00Z'
  },
  {
    id: '4',
    name: 'Linen Jumpsuit',
    price: 3600,
    description: 'Comfortable linen jumpsuit for everyday elegance.',
    stock: 0,
    trackStock: true,
    visible: true,
    category: 'Jumpsuits',
    images: ['/products/linen-jumpsuit.jpg'],
    createdAt: '2026-02-12T16:45:00Z',
    updatedAt: '2026-02-12T16:45:00Z'
  },
  {
    id: '5',
    name: 'African Print Headwrap',
    price: 650,
    description: 'Vibrant African print headwrap, versatile styling.',
    stock: 45,
    trackStock: true,
    visible: true,
    category: 'Accessories',
    images: ['/products/headwrap.jpg'],
    createdAt: '2026-02-11T11:30:00Z',
    updatedAt: '2026-02-11T11:30:00Z'
  },
  {
    id: '6',
    name: 'Batik Midi Skirt',
    price: 2100,
    description: 'Hand-dyed batik midi skirt with elegant patterns.',
    stock: 7,
    trackStock: true,
    visible: true,
    category: 'Skirts',
    images: ['/products/batik-skirt.jpg'],
    createdAt: '2026-02-10T13:20:00Z',
    updatedAt: '2026-02-10T13:20:00Z'
  },
  {
    id: '7',
    name: 'Sisal Basket Bag',
    price: 1800,
    description: 'Eco-friendly handwoven sisal basket bag.',
    stock: 0,
    trackStock: true,
    visible: false,
    category: 'Bags',
    images: ['/products/basket-bag.jpg'],
    createdAt: '2026-02-09T08:00:00Z',
    updatedAt: '2026-02-09T08:00:00Z'
  },
  {
    id: '8',
    name: 'Kanga Throw Shawl',
    price: 950,
    description: 'Traditional kanga throw shawl with beautiful prints.',
    stock: 2,
    trackStock: true,
    visible: true,
    category: 'Accessories',
    images: ['/products/kanga-shawl.jpg'],
    createdAt: '2026-02-08T15:10:00Z',
    updatedAt: '2026-02-08T15:10:00Z'
  },
  {
    id: '9',
    name: 'Maasai Beaded Bracelet',
    price: 800,
    description: 'Beautiful handcrafted Maasai beaded bracelet.',
    stock: 60,
    trackStock: true,
    visible: true,
    category: 'Accessories',
    images: ['/products/bracelet.jpg'],
    createdAt: '2026-02-07T10:00:00Z',
    updatedAt: '2026-02-07T10:00:00Z'
  },
  {
    id: '10',
    name: 'Kikoy Beach Wrap',
    price: 1400,
    description: 'Light and breezy kikoy perfect for the beach.',
    stock: 15,
    trackStock: true,
    visible: true,
    category: 'Accessories',
    images: ['/products/kikoy.jpg'],
    createdAt: '2026-02-06T12:30:00Z',
    updatedAt: '2026-02-06T12:30:00Z'
  },
  {
    id: '11',
    name: 'Chitenge Trousers',
    price: 2300,
    description: 'Stylish chitenge print trousers for everyday wear.',
    stock: 4,
    trackStock: true,
    visible: true,
    category: 'Bottoms',
    images: ['/products/trousers.jpg'],
    createdAt: '2026-02-05T09:45:00Z',
    updatedAt: '2026-02-05T09:45:00Z'
  },
  {
    id: '12',
    name: 'Woven Leather Sandals',
    price: 3200,
    description: 'Handcrafted woven leather sandals.',
    stock: 9,
    trackStock: true,
    visible: true,
    category: 'Footwear',
    images: ['/products/sandals.jpg'],
    createdAt: '2026-02-04T14:00:00Z',
    updatedAt: '2026-02-04T14:00:00Z'
  }
]

export const storeInfo = {
  name: 'Mama Grace Fashions',
  description: 'Affordable, quality fashion for every Kenyan woman. Based in Nairobi.',
  category: 'Fashion & Clothing',
  location: 'Nairobi',
  template: 'Vibrant',
  whatsapp: '+254712345678',
  pickupAddress: 'Ngong Road, Nairobi',
  tillNumber: '123456'
}

export function formatKES(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`
}
