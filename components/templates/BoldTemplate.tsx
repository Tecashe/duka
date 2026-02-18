'use client'

import { Store } from '@/lib/stores'
import { ShoppingCart, ChevronDown } from 'lucide-react'
import { useTemplateCart } from '@/lib/template-cart'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function BoldTemplate({ store }: { store: Store }) {
  const { items, addItem } = useTemplateCart(store.subdomain)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const formatPrice = (price: number) => `KES ${price.toLocaleString()}`

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Dark Bold Header */}
      <header className="bg-[#1a1a2e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href={`/store/${store.subdomain}`} className="text-xl font-bold">
            {store.businessName}
          </Link>
          <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Large Bold Hero */}
      <section className="bg-[#1a1a2e] text-white py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            {store.businessName}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            {store.description}
          </p>
          <Button
            size="lg"
            onClick={scrollToProducts}
            className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Shop Now
          </Button>
          <button
            onClick={scrollToProducts}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          >
            <ChevronDown className="w-8 h-8 text-gray-400" />
          </button>
        </div>
      </section>

      {/* Products Section */}
      <main id="products" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-wider mb-12 text-center">
          Our Products
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {store.products.filter(p => p.isActive).map((product) => (
            <div key={product.id} className="group">
              {/* Product Card - White with Strong Shadow */}
              <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                {/* Product Image Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/20">
                      <span className="text-3xl font-bold text-white">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 uppercase tracking-wider font-bold">
                      {product.category}
                    </p>
                  </div>
                  {product.compareAtPrice && (
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                      SALE
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    {product.compareAtPrice ? (
                      <>
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                        <span className="text-2xl font-bold text-primary">
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
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Button disabled className="w-full" variant="secondary">
                      Out of Stock
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Store Info */}
        <div className="mt-20 grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold uppercase tracking-wider mb-4">Delivery</h3>
            <p className="text-gray-700">
              {store.offerDelivery && `We deliver across Nairobi for ${formatPrice(store.deliveryFee)}.`}
              {store.offerPickup && store.offerDelivery && ' '}
              {store.offerPickup && `Pick up available at ${store.pickupLocation}.`}
            </p>
          </div>
          {store.whatsapp && (
            <div className="bg-primary/5 p-8 rounded-lg border-2 border-primary/20">
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-4 text-primary">Need Help?</h3>
              <a 
                href={`https://wa.me/${store.whatsapp}`}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          )}
        </div>
      </main>

      {/* Bold Footer */}
      <footer className="bg-[#1a1a2e] text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-gray-400">
            Powered by{' '}
            <a href="/" className="text-white hover:text-primary transition-colors font-bold">
              Duka
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
