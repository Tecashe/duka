'use client'

import { Store } from '@/lib/stores'
import { ShoppingCart, Phone } from 'lucide-react'
import { useTemplateCart } from '@/lib/template-cart'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function VibrantTemplate({ store }: { store: Store }) {
  const { items, addItem } = useTemplateCart(store.subdomain)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const formatPrice = (price: number) => `KES ${price.toLocaleString()}`

  const getProductColor = (index: number) => {
    const colors = [
      'bg-orange-100',
      'bg-amber-100',
      'bg-yellow-100',
      'bg-rose-100',
      'bg-pink-100',
      'bg-purple-100',
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Warm Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href={`/store/${store.subdomain}`} className="text-2xl font-bold text-gray-900">
            {store.businessName}
          </Link>
          <button className="relative p-3 hover:bg-orange-50 rounded-full transition-colors">
            <ShoppingCart className="w-6 h-6 text-gray-900" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Warm Hero */}
      <section className="bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance">
            {store.businessName}
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto text-balance">
            {store.description}
          </p>
          {store.whatsapp && (
            <Button
              size="lg"
              onClick={() => window.open(`https://wa.me/${store.whatsapp}`, '_blank')}
              className="bg-white text-orange-600 hover:bg-orange-50 font-bold rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Phone className="w-5 h-5 mr-2" />
              Chat With Us
            </Button>
          )}
        </div>
      </section>

      {/* Products Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-gray-900">
          Shop Our Collection
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {store.products.filter(p => p.isActive).map((product, index) => (
            <div key={product.id} className="group">
              {/* Product Card - Warm & Rounded */}
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Product Image Placeholder */}
                <div className={`aspect-square ${getProductColor(index)} flex items-center justify-center relative`}>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 font-medium px-4">
                      {product.category}
                    </p>
                  </div>
                  {product.stock <= 5 && product.stock > 0 && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Only {product.stock} left!
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 text-balance">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    {product.compareAtPrice ? (
                      <>
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                        <span className="text-2xl font-bold text-orange-600">
                          {formatPrice(product.price)}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                  
                  {product.stock > 0 ? (
                    <Button
                      onClick={() => addItem({
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        storeName: store.businessName,
                      })}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-full py-6 shadow-md hover:shadow-lg transition-all"
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Button disabled className="w-full rounded-full" variant="secondary">
                      Out of Stock
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Store Info */}
        <div className="mt-16 bg-white rounded-2xl shadow-md p-8 sm:p-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Delivery Info</h3>
              <p className="text-gray-700 leading-relaxed">
                {store.offerDelivery && `We deliver across Nairobi for just ${formatPrice(store.deliveryFee)}.`}
                {store.offerPickup && store.offerDelivery && ' '}
                {store.offerPickup && `You can also pick up your order at ${store.pickupLocation}.`}
              </p>
            </div>
            {store.whatsapp && (
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Questions?</h3>
                <a 
                  href={`https://wa.me/${store.whatsapp}`}
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Send us a message
                </a>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Warm Footer */}
      <footer className="bg-gradient-to-r from-orange-100 to-amber-100 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-gray-700">
            Proudly powered by{' '}
            <a href="/" className="text-orange-600 hover:text-orange-700 font-bold transition-colors">
              Duka
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
