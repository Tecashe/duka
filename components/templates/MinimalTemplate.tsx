'use client'

import { Store } from '@/lib/stores'
import { ShoppingCart, Menu, X, ShoppingBag, Check, Truck, MapPin, Phone, Instagram } from 'lucide-react'
import { useTemplateCart } from '@/lib/template-cart'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'

export function MinimalTemplate({ store }: { store: Store }) {
  const { items, addItem } = useTemplateCart(store.subdomain)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const formatPrice = (price: number) => `KES ${price.toLocaleString()}`

  // Default Navigation (In future, this comes from store settings)
  const navigation = [
    { label: 'Home', href: `/store/${store.subdomain}` },
    { label: 'Shop', href: '#products' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* --- Dynamic Header --- */}
      <header className="border-b border-gray-100 sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/store/${store.subdomain}`} className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            {store.businessName}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                onClick={(e) => {
                  if (link.href.startsWith('#')) {
                    e.preventDefault()
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Cart Trigger */}
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group">
              <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-black" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white absolute w-full left-0 px-4 py-4 shadow-xl space-y-4">
            {navigation.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-lg font-medium text-gray-800 py-2 border-b border-gray-50 last:border-0"
                onClick={(e) => {
                  setIsMobileMenuOpen(false)
                  if (link.href.startsWith('#')) {
                    e.preventDefault()
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* --- Main Content --- */}
      <main>
        {/* Business Description / Hero Lite */}
        <section className="py-20 px-4 text-center bg-gray-50/50">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              {store.businessName}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {store.description}
            </p>
          </div>
        </section>

        <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Latest Products</h2>
            <div className="h-px flex-1 bg-gray-200 ml-8 hidden sm:block"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {store.products.filter(p => p.isActive).map((product) => (
              <div key={product.id} className="group flex flex-col">
                {/* Product Image */}
                <div className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden relative mb-4">
                  {product.images && product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl font-bold text-gray-400">{product.name.charAt(0)}</span>
                        </div>
                        <span className="text-sm">No Image</span>
                      </div>
                    </div>
                  )}
                  {/* Quick Add Button */}
                  {product.stock > 0 && (
                    <button
                      onClick={() => addItem({
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        storeName: store.businessName,
                      })}
                      className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-lg translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Product details */}
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{product.category}</p>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-600 transition-colors">{product.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-base font-semibold text-gray-900">{formatPrice(product.price)}</span>
                    {product.stock <= 0 && <span className="text-xs text-red-500 font-medium">Out of Stock</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-gray-900 text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Us</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                {store.description}
                <br /><br />
                We are committed to providing the best quality products at affordable prices.
                Our journey started with a simple mission: to make shopping easier and more accessible for everyone.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-1">100%</h4>
                  <p className="text-sm text-gray-500">Quality Guarantee</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-1">24/7</h4>
                  <p className="text-sm text-gray-500">Customer Support</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-bold mb-4">Why Shop With Us?</h3>
              <ul className="space-y-4">
                {[
                  'Fast & Reliable Delivery',
                  'Secure Payment Options',
                  'Friendly Customer Service',
                  'Authentic Products'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact / Delivery Section */}
        <section id="contact" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery & Pickup</h2>
                  <div className="space-y-6">
                    {store.offerDelivery && (
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">Delivery Available</h4>
                          <p className="text-gray-600 mt-1">We deliver to your doorstep for {formatPrice(store.deliveryFee)}.</p>
                        </div>
                      </div>
                    )}
                    {store.offerPickup && (
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">Store Pickup</h4>
                          <p className="text-gray-600 mt-1">Visit us at: {store.pickupLocation}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
                  <p className="text-gray-600 mb-8">Have questions about our products or your order? We're here to help.</p>
                  {store.whatsapp && (
                    <a
                      href={`https://wa.me/${store.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20ba5a] transition-colors gap-3"
                    >
                      <Phone className="w-5 h-5" />
                      Chat on WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- Dynamic Footer --- */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1.5">
              <Link href={`/store/${store.subdomain}`} className="text-2xl font-bold tracking-tight text-gray-900 block mb-6">
                {store.businessName}
              </Link>
              <p className="text-gray-500 leading-relaxed mb-6 max-w-sm">
                {store.description}
              </p>
              <div className="flex gap-4">
                {/* Social placeholders */}
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-colors cursor-pointer">
                    <Instagram className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6">Shop</h4>
              <ul className="space-y-4">
                <li><Link href="#products" className="text-gray-500 hover:text-black transition-colors">All Products</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-black transition-colors">New Arrivals</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-black transition-colors">Featured</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6">Support</h4>
              <ul className="space-y-4">
                <li><Link href="#contact" className="text-gray-500 hover:text-black transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-black transition-colors">FAQs</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-black transition-colors">Shipping Info</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-black transition-colors">Returns</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6">Legal</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-gray-500 hover:text-black transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-black transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} {store.businessName}. All rights reserved.
            </p>
            <p className="text-xs text-gray-300 flex items-center gap-1">
              Powered by <span className="font-bold text-gray-900">Duka</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
