'use client'

import { Store } from '@/lib/stores'
import { ShoppingCart } from 'lucide-react'
import { useTemplateCart } from '@/lib/template-cart'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function MinimalTemplate({ store }: { store: Store }) {
  const { items, addItem } = useTemplateCart(store.subdomain)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const formatPrice = (price: number) => `KES ${price.toLocaleString()}`

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <Link href={`/store/${store.subdomain}`} className="font-serif text-xl text-gray-900">
            {store.businessName}
          </Link>
          <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <ShoppingCart className="w-5 h-5 text-gray-900" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* No Hero - Just Straight to Products */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Business Description */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-gray-600 text-lg leading-relaxed">{store.description}</p>
        </div>

        <div className="h-px bg-gray-200 mb-16" />

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {store.products.filter(p => p.isActive).map((product) => (
            <div key={product.id} className="group">
              {/* Product Card - Clean White with Thin Border */}
              <div className="border border-gray-200 bg-white transition-all hover:border-gray-400">
                {/* Product Image Placeholder */}
                <div className="aspect-square bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-2xl font-serif text-gray-400">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 font-serif">{product.category}</p>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-gray-900 font-medium mb-2 leading-relaxed">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-black font-medium">
                      {formatPrice(product.price)}
                    </span>
                    {product.stock > 0 ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addItem({
                          productId: product.id,
                          name: product.name,
                          price: product.price,
                          storeName: store.businessName,
                        })}
                        className="border-black text-black hover:bg-black hover:text-white transition-colors"
                      >
                        Add
                      </Button>
                    ) : (
                      <span className="text-sm text-gray-400">Out of stock</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Store Info */}
        <div className="mt-24 pt-12 border-t border-gray-200">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div>
              <h3 className="font-serif text-lg text-gray-900 mb-2">Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                {store.offerDelivery && `We deliver across Nairobi for ${formatPrice(store.deliveryFee)}.`}
                {store.offerPickup && store.offerDelivery && ' '}
                {store.offerPickup && `Pick up available at ${store.pickupLocation}.`}
              </p>
            </div>
            {store.whatsapp && (
              <div>
                <h3 className="font-serif text-lg text-gray-900 mb-2">Questions?</h3>
                <a 
                  href={`https://wa.me/${store.whatsapp}`}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Chat with us on WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-gray-200 mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-center">
          <p className="text-xs text-gray-400">
            Powered by{' '}
            <a href="/" className="hover:text-gray-600 transition-colors">
              Duka
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
