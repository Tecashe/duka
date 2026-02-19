'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    ShoppingCart, Menu, X, ShoppingBag, Check, Truck, MapPin,
    Phone, Instagram, Facebook, Twitter, Star, ArrowRight,
    ChevronDown, Heart, Zap, Shield, Package, Mail
} from 'lucide-react'
import { useTemplateCart } from '@/lib/template-cart'
import { getTemplateById } from '@/lib/templates'
import type { Store } from '@/lib/stores'

// ─── Cart Sheet ───────────────────────────────────────────────────────────────
function CartSheet({ isOpen, onClose, storeColors }: {
    isOpen: boolean
    onClose: () => void
    storeColors: StoreColors
}) {
    const { items, removeItem, updateQuantity, total, clearCart } = useTemplateCart('')

    if (!isOpen) return null

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={onClose} />
            <div className="fixed right-0 top-0 h-full w-full max-w-md z-50 shadow-2xl flex flex-col"
                style={{ background: storeColors.background }}>
                <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: storeColors.border }}>
                    <h2 className="text-xl font-bold" style={{ color: storeColors.text }}>Cart ({items.length})</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-black/10">
                        <X className="w-5 h-5" style={{ color: storeColors.text }} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {items.length === 0 ? (
                        <div className="text-center py-16">
                            <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-20" style={{ color: storeColors.primary }} />
                            <p className="font-medium opacity-50" style={{ color: storeColors.text }}>Your cart is empty</p>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.productId} className="flex gap-4 p-4 rounded-2xl border" style={{ borderColor: storeColors.border }}>
                                <div className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl font-black"
                                    style={{ background: storeColors.primary + '20', color: storeColors.primary }}>
                                    {item.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm truncate" style={{ color: storeColors.text }}>{item.name}</p>
                                    <p className="font-bold mt-1" style={{ color: storeColors.primary }}>KES {item.price.toLocaleString()}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                            className="w-6 h-6 rounded-full flex items-center justify-center border font-bold text-sm"
                                            style={{ borderColor: storeColors.border, color: storeColors.text }}>−</button>
                                        <span className="text-sm font-medium w-6 text-center" style={{ color: storeColors.text }}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                            className="w-6 h-6 rounded-full flex items-center justify-center border font-bold text-sm"
                                            style={{ borderColor: storeColors.border, color: storeColors.text }}>+</button>
                                    </div>
                                </div>
                                <button onClick={() => removeItem(item.productId)} className="p-1 opacity-40 hover:opacity-100">
                                    <X className="w-4 h-4" style={{ color: storeColors.text }} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
                {items.length > 0 && (
                    <div className="p-6 border-t space-y-4" style={{ borderColor: storeColors.border }}>
                        <div className="flex justify-between text-lg font-bold" style={{ color: storeColors.text }}>
                            <span>Total</span>
                            <span style={{ color: storeColors.primary }}>KES {total.toLocaleString()}</span>
                        </div>
                        <button className="w-full py-4 rounded-2xl font-bold text-white text-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                            style={{ background: storeColors.primary }}>
                            Checkout via WhatsApp
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface StoreColors {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    muted: string
    border: string
}

function hex2luma(hex: string) {
    const c = hex.replace('#', '')
    const r = parseInt(c.substring(0, 2), 16)
    const g = parseInt(c.substring(2, 4), 16)
    const b = parseInt(c.substring(4, 6), 16)
    return (r * 299 + g * 587 + b * 114) / 1000
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function UniversalTemplate({ store }: { store: Store }) {
    const { items, addItem } = useTemplateCart(store.subdomain)
    const cartCount = items.reduce((sum, i) => sum + i.quantity, 0)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)
    const [wishlist, setWishlist] = useState<string[]>([])
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    const template = getTemplateById(store.template)

    const colors: StoreColors = {
        primary: template?.colors?.primary || '#4F46E5',
        secondary: template?.colors?.secondary || '#7C3AED',
        accent: template?.colors?.accent || '#F3F4F6',
        background: template?.colors?.background || '#FFFFFF',
        text: template?.colors?.text || '#111827',
        muted: template?.colors?.muted || '#6B7280',
        border: template?.colors?.border || '#E5E7EB',
    }

    const isDark = hex2luma(colors.background) < 128
    const heroTextColor = '#FFFFFF'
    const fmt = (p: number) => `KES ${p.toLocaleString()}`

    const activeProducts = store.products.filter(p => p.isActive)

    const navLinks = [
        { label: 'Home', href: '#home' },
        { label: 'Shop', href: '#products' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
    ]

    const toggleWishlist = (id: string) => {
        setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    }

    const scrollTo = (href: string) => {
        if (href.startsWith('#')) {
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
        }
        setMobileOpen(false)
    }

    // Template-specific hero content from template data
    const homePage = template?.pages?.find(p => p.id === 'home')
    const heroSection = homePage?.sections?.find(s => s.type === 'hero' && s.enabled)
    const heroContent = heroSection?.content as any

    const heroHeading = heroContent?.heading || `Welcome to ${store.businessName}`
    const heroSubheading = heroContent?.subheading || store.description || 'Discover our curated collection of quality products.'
    const heroBtn = heroContent?.buttonText || 'Shop Now'

    // Features
    const features = [
        { icon: Shield, label: 'Secure Payments', desc: 'M-Pesa & card accepted' },
        { icon: Truck, label: 'Fast Delivery', desc: `Delivery fee: ${fmt(store.deliveryFee || 0)}` },
        { icon: Package, label: 'Quality Products', desc: 'Hand-picked & verified' },
        { icon: Phone, label: '24/7 Support', desc: 'Always here to help' },
    ]

    // FAQs
    const faqs = [
        { q: 'How do I place an order?', a: 'Browse our products, add items to your cart, then checkout. We\'ll contact you via WhatsApp to confirm.' },
        { q: 'What payment methods do you accept?', a: 'We accept M-Pesa (Till/Paybill), cash on delivery, and bank transfers.' },
        { q: 'Do you offer delivery?', a: store.offerDelivery ? `Yes! We deliver. Delivery fee: ${fmt(store.deliveryFee || 0)}.` : 'We offer pickup only. Contact us for more details.' },
        { q: 'What is your return policy?', a: 'We offer a 7-day return policy on all products. Items must be unused and in original packaging.' },
    ]

    return (
        <div className="min-h-screen" style={{ background: colors.background, color: colors.text, fontFamily: "'Inter', system-ui, sans-serif" }}>

            {/* ── CART SHEET ── */}
            <CartSheet isOpen={cartOpen} onClose={() => setCartOpen(false)} storeColors={colors} />

            {/* ── NAVIGATION ── */}
            <header className="sticky top-0 z-40 border-b backdrop-blur-xl"
                style={{ background: colors.background + 'F0', borderColor: colors.border }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link href={`/store/${store.subdomain}`} className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg"
                            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                            {store.businessName.charAt(0)}
                        </div>
                        <span className="text-lg font-black tracking-tight hidden sm:block" style={{ color: colors.text }}>
                            {store.businessName}
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map(l => (
                            <button key={l.label} onClick={() => scrollTo(l.href)}
                                className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
                                style={{ color: colors.text }}>
                                {l.label}
                            </button>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button onClick={() => setCartOpen(true)}
                            className="relative flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                            style={{ background: colors.primary }}>
                            <ShoppingCart className="w-4 h-4" />
                            <span className="hidden sm:inline">Cart</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 text-[10px] font-bold rounded-full flex items-center justify-center text-white"
                                    style={{ background: colors.secondary }}>
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <button className="md:hidden p-2 rounded-lg" onClick={() => setMobileOpen(!mobileOpen)}>
                            {mobileOpen ? <X className="w-5 h-5" style={{ color: colors.text }} /> : <Menu className="w-5 h-5" style={{ color: colors.text }} />}
                        </button>
                    </div>
                </div>

                {/* Mobile nav */}
                {mobileOpen && (
                    <div className="md:hidden border-t px-4 py-3 space-y-1" style={{ background: colors.background, borderColor: colors.border }}>
                        {navLinks.map(l => (
                            <button key={l.label} onClick={() => scrollTo(l.href)}
                                className="w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors hover:opacity-70"
                                style={{ color: colors.text }}>
                                {l.label}
                            </button>
                        ))}
                    </div>
                )}
            </header>

            {/* ── HERO SECTION ── */}
            <section id="home" className="relative overflow-hidden"
                style={{ minHeight: '88vh', display: 'flex', alignItems: 'center' }}>

                {/* Background layers */}
                <div className="absolute inset-0"
                    style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 60%, ${colors.accent} 100%)` }} />
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 -translate-y-1/2 translate-x-1/3"
                    style={{ background: colors.background }} />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 translate-y-1/2 -translate-x-1/4"
                    style={{ background: colors.background }} />
                {/* Dot grid texture */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
                    <div className="max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold mb-8">
                            <Zap className="w-4 h-4" />
                            {activeProducts.length > 0 ? `${activeProducts.length} Products Available` : 'New Store'}
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] mb-6 text-white"
                            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}>
                            {heroHeading}
                        </h1>
                        <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
                            {heroSubheading}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button onClick={() => scrollTo('#products')}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-2xl"
                                style={{ background: colors.background, color: colors.primary }}>
                                {heroBtn}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button onClick={() => scrollTo('#about')}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white/50 text-white transition-all hover:bg-white/10">
                                Learn More
                            </button>
                        </div>

                        {/* Stats */}
                        {activeProducts.length > 0 && (
                            <div className="flex flex-wrap gap-8 mt-14">
                                {[
                                    { value: `${activeProducts.length}+`, label: 'Products' },
                                    { value: '100%', label: 'Quality' },
                                    { value: '24/7', label: 'Support' },
                                ].map(stat => (
                                    <div key={stat.label}>
                                        <div className="text-3xl font-black text-white">{stat.value}</div>
                                        <div className="text-sm text-white/60 font-medium mt-0.5">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50">
                    <span className="text-white text-xs font-medium">Scroll</span>
                    <div className="w-px h-8 bg-white/50"></div>
                </div>
            </section>

            {/* ── TRUST BAR ── */}
            <section className="border-y" style={{ background: colors.accent, borderColor: colors.border }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {features.map((f, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: colors.primary + '20' }}>
                                    <f.icon className="w-5 h-5" style={{ color: colors.primary }} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold" style={{ color: colors.text }}>{f.label}</p>
                                    <p className="text-xs" style={{ color: colors.muted }}>{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PRODUCTS SECTION ── */}
            <section id="products" className="py-24 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                            style={{ background: colors.primary + '15', color: colors.primary }}>
                            Our Collection
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: colors.text }}>
                            {store.template?.includes('restaurant') ? '🍽️ Our Menu' :
                                store.template?.includes('real-estate') ? '🏠 Featured Listings' :
                                    store.template?.includes('grocery') ? '🛒 Fresh Today' : 'Featured Products'}
                        </h2>
                        <p className="text-lg max-w-xl mx-auto" style={{ color: colors.muted }}>
                            {activeProducts.length > 0
                                ? `Explore our ${activeProducts.length} carefully curated products`
                                : 'Products will appear here once added'}
                        </p>
                    </div>

                    {activeProducts.length === 0 ? (
                        <div className="text-center py-24 rounded-3xl border-2 border-dashed"
                            style={{ borderColor: colors.border }}>
                            <div className="text-7xl mb-6">🛍️</div>
                            <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>No Products Yet</h3>
                            <p style={{ color: colors.muted }}>Add products from your dashboard to see them here</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {activeProducts.map(product => (
                                <div key={product.id}
                                    className="group rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                    style={{ borderColor: colors.border, background: colors.background }}>

                                    {/* Image */}
                                    <div className="relative aspect-square overflow-hidden"
                                        style={{ background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}15)` }}>
                                        {product.images?.[0] ? (
                                            <img src={product.images[0]} alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-6xl font-black"
                                                    style={{ color: colors.primary + '30' }}>
                                                    {product.name.charAt(0)}
                                                </span>
                                            </div>
                                        )}

                                        {/* Badges */}
                                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                                            {product.compareAtPrice && product.compareAtPrice > product.price && (
                                                <span className="px-2.5 py-1 rounded-xl text-xs font-bold text-white"
                                                    style={{ background: colors.secondary }}>
                                                    SALE {Math.round((1 - product.price / product.compareAtPrice) * 100)}% OFF
                                                </span>
                                            )}
                                            {product.stock <= 5 && product.stock > 0 && (
                                                <span className="px-2.5 py-1 rounded-xl text-xs font-bold text-white bg-amber-500">
                                                    Only {product.stock} left
                                                </span>
                                            )}
                                        </div>

                                        {/* Actions on hover */}
                                        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
                                            <button
                                                onClick={() => toggleWishlist(product.id)}
                                                className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md bg-white/90 backdrop-blur-sm">
                                                <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`}
                                                    style={wishlist.includes(product.id) ? {} : { color: colors.muted }} />
                                            </button>
                                        </div>

                                        {/* Add to cart */}
                                        {product.stock > 0 && (
                                            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                <button
                                                    onClick={() => { addItem({ productId: product.id, name: product.name, price: product.price, storeName: store.businessName }); setCartOpen(true) }}
                                                    className="w-full py-3.5 font-bold text-sm text-white flex items-center justify-center gap-2"
                                                    style={{ background: colors.primary }}>
                                                    <ShoppingCart className="w-4 h-4" />
                                                    Add to Cart
                                                </button>
                                            </div>
                                        )}

                                        {product.stock <= 0 && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                                                <span className="px-4 py-2 rounded-xl font-bold text-white text-sm bg-black/60">Out of Stock</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="p-5">
                                        <p className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                                            style={{ color: colors.primary }}>{product.category}</p>
                                        <h3 className="font-bold text-base mb-3 line-clamp-2" style={{ color: colors.text }}>{product.name}</h3>
                                        {product.description && (
                                            <p className="text-xs mb-3 line-clamp-2" style={{ color: colors.muted }}>{product.description}</p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-xl font-black" style={{ color: colors.primary }}>{fmt(product.price)}</span>
                                                {product.compareAtPrice && product.compareAtPrice > product.price && (
                                                    <span className="text-sm line-through ml-2 opacity-40" style={{ color: colors.text }}>
                                                        {fmt(product.compareAtPrice)}
                                                    </span>
                                                )}
                                            </div>
                                            {product.stock > 0 && (
                                                <div className="flex items-center gap-1 text-xs" style={{ color: colors.muted }}>
                                                    <Check className="w-3 h-3" style={{ color: '#22c55e' }} />
                                                    In Stock
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── ABOUT SECTION ── */}
            <section id="about" className="py-24 px-4 sm:px-6" style={{ background: colors.accent }}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* Left: visual */}
                        <div className="relative">
                            <div className="aspect-square rounded-3xl overflow-hidden"
                                style={{ background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)` }}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[120px] font-black opacity-20"
                                        style={{ color: colors.primary }}>{store.businessName.charAt(0)}</span>
                                </div>
                                {/* Floating cards */}
                                <div className="absolute bottom-8 left-8 right-8 p-5 rounded-2xl shadow-xl"
                                    style={{ background: colors.background }}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg"
                                            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                                            {store.businessName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm" style={{ color: colors.text }}>{store.businessName}</p>
                                            <p className="text-xs" style={{ color: colors.muted }}>Trusted Store</p>
                                        </div>
                                        <div className="ml-auto flex text-yellow-400">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Top right badge */}
                            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl flex flex-col items-center justify-center text-white font-black text-2xl shadow-xl"
                                style={{ background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})` }}>
                                <span>100%</span>
                                <span className="text-[9px] font-semibold opacity-80">QUALITY</span>
                            </div>
                        </div>

                        {/* Right: content */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
                                style={{ background: colors.primary + '15', color: colors.primary }}>
                                About Us
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-black mb-6" style={{ color: colors.text }}>
                                Why Choose {store.businessName}?
                            </h2>
                            <p className="text-lg leading-relaxed mb-10" style={{ color: colors.muted }}>
                                {store.description || `At ${store.businessName}, we are passionate about bringing you quality products that make a difference in your daily life. Every item in our collection is carefully selected and verified.`}
                            </p>

                            <div className="space-y-4 mb-10">
                                {[
                                    'Verified quality products',
                                    'Secure M-Pesa payments',
                                    'Fast & reliable delivery',
                                    'Dedicated customer support',
                                    '7-day hassle-free returns',
                                ].map(item => (
                                    <div key={item} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                                            style={{ background: colors.primary }}>
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="font-medium" style={{ color: colors.text }}>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <button onClick={() => scrollTo('#products')}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
                                style={{ background: colors.primary }}>
                                Shop Our Products
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FAQ SECTION ── */}
            <section className="py-24 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                            style={{ background: colors.primary + '15', color: colors.primary }}>
                            FAQ
                        </div>
                        <h2 className="text-4xl font-black" style={{ color: colors.text }}>Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="rounded-2xl border overflow-hidden transition-all"
                                style={{ borderColor: colors.border }}>
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold"
                                    style={{ background: openFaq === i ? colors.primary : colors.background, color: openFaq === i ? '#FFF' : colors.text }}>
                                    {faq.q}
                                    <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-4 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === i && (
                                    <div className="px-6 py-5 text-base leading-relaxed border-t"
                                        style={{ color: colors.muted, borderColor: colors.border, background: colors.accent }}>
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section className="py-24 px-4 sm:px-6 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                        Ready to Shop with {store.businessName}?
                    </h2>
                    <p className="text-xl text-white/80 mb-10">
                        Explore our full collection and enjoy a seamless shopping experience.
                    </p>
                    <button onClick={() => scrollTo('#products')}
                        className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-2xl"
                        style={{ background: colors.background, color: colors.primary }}>
                        Browse Products
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>

            {/* ── CONTACT SECTION ── */}
            <section id="contact" className="py-24 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                            style={{ background: colors.primary + '15', color: colors.primary }}>
                            Get in Touch
                        </div>
                        <h2 className="text-4xl font-black" style={{ color: colors.text }}>Contact Us</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* M-Pesa */}
                        <div className="p-8 rounded-3xl border text-center"
                            style={{ borderColor: colors.border, background: colors.accent }}>
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                                style={{ background: '#4CAF50' }}>
                                <span className="text-white font-black text-lg">M</span>
                            </div>
                            <h3 className="text-lg font-bold mb-2" style={{ color: colors.text }}>M-Pesa Payment</h3>
                            <p className="text-sm mb-3" style={{ color: colors.muted }}>
                                {store.mpesaType === 'till' ? 'Till Number' : 'Paybill Number'}
                            </p>
                            <p className="text-2xl font-black" style={{ color: '#4CAF50' }}>
                                {store.mpesaNumber || 'N/A'}
                            </p>
                        </div>

                        {/* Delivery */}
                        <div className="p-8 rounded-3xl border text-center"
                            style={{ borderColor: colors.border, background: colors.accent }}>
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                                style={{ background: colors.primary }}>
                                <Truck className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-bold mb-2" style={{ color: colors.text }}>Delivery & Pickup</h3>
                            {store.offerDelivery && (
                                <div className="mb-2">
                                    <p className="text-sm font-semibold" style={{ color: colors.text }}>
                                        Delivery: {fmt(store.deliveryFee || 0)}
                                    </p>
                                </div>
                            )}
                            {store.offerPickup && (
                                <div className="flex items-start gap-2 mt-2">
                                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                                    <p className="text-sm" style={{ color: colors.muted }}>{store.pickupLocation || 'Contact us for location'}</p>
                                </div>
                            )}
                            {!store.offerDelivery && !store.offerPickup && (
                                <p className="text-sm" style={{ color: colors.muted }}>Contact us for options</p>
                            )}
                        </div>

                        {/* WhatsApp */}
                        <div className="p-8 rounded-3xl border text-center"
                            style={{ borderColor: colors.border, background: colors.accent }}>
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                                style={{ background: '#25D366' }}>
                                <Phone className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-bold mb-2" style={{ color: colors.text }}>Talk to Us</h3>
                            <p className="text-sm mb-5" style={{ color: colors.muted }}>Have questions? Chat with us directly</p>
                            {store.mpesaNumber ? (
                                <a href={`https://wa.me/254${store.mpesaNumber}`} target="_blank" rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5"
                                    style={{ background: '#25D366' }}>
                                    <Phone className="w-4 h-4" />
                                    WhatsApp Us
                                </a>
                            ) : (
                                <p className="text-sm font-medium" style={{ color: colors.muted }}>Contact info not set</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="border-t pt-16 pb-8 px-4 sm:px-6" style={{ background: colors.text, borderColor: colors.border }}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                        {/* Brand */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2.5 mb-5">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg"
                                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                                    {store.businessName.charAt(0)}
                                </div>
                                <span className="text-xl font-black text-white">{store.businessName}</span>
                            </div>
                            <p className="text-sm leading-relaxed mb-6 text-white/50 max-w-sm">
                                {store.description || `Your trusted destination for quality products and excellent service.`}
                            </p>
                            <div className="flex gap-3">
                                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:-translate-y-0.5"
                                        style={{ background: 'rgba(255,255,255,0.1)' }}>
                                        <Icon className="w-4 h-4 text-white/70" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="font-bold mb-5 text-white">Quick Links</h4>
                            <ul className="space-y-3">
                                {['Home', 'Shop', 'About', 'Contact'].map(l => (
                                    <li key={l}>
                                        <button onClick={() => scrollTo('#' + l.toLowerCase())}
                                            className="text-sm text-white/50 hover:text-white transition-colors">
                                            {l}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="font-bold mb-5 text-white">Legal</h4>
                            <ul className="space-y-3">
                                {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Shipping Policy'].map(l => (
                                    <li key={l}>
                                        <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{l}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-white/40">
                            © {new Date().getFullYear()} {store.businessName}. All rights reserved.
                        </p>
                        <p className="text-xs text-white/30">
                            Powered by <span className="font-bold" style={{ color: colors.primary }}>Duka</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
