export type Template = 'minimal' | 'bold' | 'vibrant'

export interface StoreProduct {
  id: string
  name: string
  price: number
  compareAtPrice?: number
  description: string
  stock: number
  isActive: boolean
  images: string[]
  category: string
}

export interface Store {
  id: string
  subdomain: string
  businessName: string
  description: string
  category: string
  template: Template
  primaryColor: string
  mpesaNumber: string
  mpesaType: 'till' | 'paybill'
  logoUrl?: string
  deliveryFee: number
  offerDelivery: boolean
  offerPickup: boolean
  pickupLocation?: string
  whatsapp?: string
  products: StoreProduct[]
}

// Three mock stores — one per template
export const mockStores: Record<string, Store> = {
  'mamagrace': {
    id: '1',
    subdomain: 'mamagrace',
    businessName: 'Mama Grace Fashions',
    description: 'Affordable, quality fashion for every Kenyan woman. Based in Nairobi.',
    category: 'Fashion & Clothing',
    template: 'vibrant',
    primaryColor: '#f5a623',
    mpesaNumber: '123456',
    mpesaType: 'till',
    deliveryFee: 200,
    offerDelivery: true,
    offerPickup: true,
    pickupLocation: 'Ngong Road, Westlands, Nairobi',
    whatsapp: '254712345678',
    products: [
      { id: 'p1', name: 'Ankara Wrap Dress', price: 2800, description: 'Beautiful handcrafted Ankara wrap dress. Available S–XL.', stock: 12, isActive: true, images: [], category: 'Dresses' },
      { id: 'p2', name: 'Kitenge Blazer', price: 4500, compareAtPrice: 5500, description: 'Professional Kitenge blazer. Makes a statement.', stock: 3, isActive: true, images: [], category: 'Blazers' },
      { id: 'p3', name: 'Beaded Maasai Necklace', price: 1200, description: 'Handmade Maasai beaded necklace.', stock: 28, isActive: true, images: [], category: 'Accessories' },
      { id: 'p4', name: 'Linen Jumpsuit', price: 3600, description: 'Lightweight linen jumpsuit.', stock: 0, isActive: true, images: [], category: 'Jumpsuits' },
      { id: 'p5', name: 'African Print Headwrap', price: 650, description: 'Vibrant African print headwrap.', stock: 45, isActive: true, images: [], category: 'Accessories' },
      { id: 'p6', name: 'Batik Midi Skirt', price: 2100, description: 'Hand-dyed batik midi skirt.', stock: 7, isActive: true, images: [], category: 'Skirts' },
    ]
  },
  'techkeja': {
    id: '2',
    subdomain: 'techkeja',
    businessName: 'TechKeja Electronics',
    description: 'Genuine electronics, accessories and gadgets. Fast delivery across Nairobi.',
    category: 'Electronics & Accessories',
    template: 'bold',
    primaryColor: '#1a6b3c',
    mpesaNumber: '654321',
    mpesaType: 'paybill',
    deliveryFee: 300,
    offerDelivery: true,
    offerPickup: true,
    pickupLocation: 'Tom Mboya Street, CBD Nairobi',
    whatsapp: '254733221445',
    products: [
      { id: 'p1', name: 'Wireless Earbuds Pro', price: 3500, compareAtPrice: 4500, description: 'High quality wireless earbuds with noise cancellation. 24hr battery.', stock: 20, isActive: true, images: [], category: 'Audio' },
      { id: 'p2', name: 'Phone Charging Cable (3-in-1)', price: 850, description: 'USB-C, Lightning, and Micro USB in one cable. 1.2m length.', stock: 150, isActive: true, images: [], category: 'Cables' },
      { id: 'p3', name: 'Laptop Stand Adjustable', price: 2200, description: 'Aluminium adjustable laptop stand. Fits 11–17 inch laptops.', stock: 8, isActive: true, images: [], category: 'Accessories' },
      { id: 'p4', name: 'Power Bank 20000mAh', price: 4200, description: 'Fast charging 20000mAh power bank. 3 USB ports.', stock: 0, isActive: true, images: [], category: 'Power' },
      { id: 'p5', name: 'Mechanical Keyboard', price: 6500, compareAtPrice: 8000, description: 'RGB mechanical keyboard. Blue switches. Plug and play.', stock: 5, isActive: true, images: [], category: 'Keyboards' },
      { id: 'p6', name: 'Webcam 1080p HD', price: 3800, description: 'Full HD webcam with built-in microphone. Plug and play.', stock: 12, isActive: true, images: [], category: 'Cameras' },
    ]
  },
  'freshfarm': {
    id: '3',
    subdomain: 'freshfarm',
    businessName: 'FreshFarm Organics',
    description: 'Farm-fresh organic produce delivered to your door. Straight from our farm in Limuru.',
    category: 'Food & Beverages',
    template: 'minimal',
    primaryColor: '#2d6a4f',
    mpesaNumber: '789012',
    mpesaType: 'till',
    deliveryFee: 150,
    offerDelivery: true,
    offerPickup: false,
    whatsapp: '254722887334',
    products: [
      { id: 'p1', name: 'Organic Sukuma Wiki (500g)', price: 80, description: 'Fresh organic sukuma wiki. Harvested this morning.', stock: 200, isActive: true, images: [], category: 'Vegetables' },
      { id: 'p2', name: 'Farm Eggs (Tray of 30)', price: 650, description: 'Free-range farm eggs. No antibiotics.', stock: 50, isActive: true, images: [], category: 'Eggs & Dairy' },
      { id: 'p3', name: 'Organic Avocados (6 pack)', price: 320, description: 'Ripe Hass avocados from our Limuru farm.', stock: 80, isActive: true, images: [], category: 'Fruits' },
      { id: 'p4', name: 'Mixed Vegetable Box', price: 750, description: 'Weekly veg box — carrots, spinach, tomatoes, onions, capsicum.', stock: 30, isActive: true, images: [], category: 'Bundles' },
      { id: 'p5', name: 'Raw Honey (500ml)', price: 900, compareAtPrice: 1100, description: 'Pure raw honey from our beehives. No additives.', stock: 25, isActive: true, images: [], category: 'Honey' },
      { id: 'p6', name: 'Organic Tomatoes (1kg)', price: 120, description: 'Vine-ripened organic tomatoes.', stock: 0, isActive: true, images: [], category: 'Vegetables' },
    ]
  }
}

export function getStoreBySubdomain(subdomain: string): Store | null {
  return mockStores[subdomain] || null
}
