'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    ShoppingCart, Menu, X, ShoppingBag, Check, Truck, MapPin,
    Phone, Instagram, Facebook, Twitter, Linkedin, Star,
    ArrowRight, ChevronDown
} from 'lucide-react'
import { useTemplateCart } from '@/lib/template-cart'
import { getTemplateById } from '@/lib/templates'
import type { Store } from '@/lib/stores'
import type {
    HeroContent, GridContent, BannerContent, ContentSection,
    FeaturesContent, TestimonialsContent, CtaContent, FaqContent,
    StatsContent, GalleryContent, SplitContent, TemplateSection
} from '@/lib/templates/types'

// ─── Helper: detect content shape ────────────────────────────────────────────
const isHero = (c: unknown): c is HeroContent =>
    typeof c === 'object' && c !== null && 'heading' in c && ('layout' in c || 'buttonLink' in c || !('stats' in c))
const isGrid = (c: unknown): c is GridContent =>
    typeof c === 'object' && c !== null && 'items' in c && Array.isArray((c as GridContent).items) && !('heading' in c && 'stats' in c)
const isBanner = (c: unknown): c is BannerContent =>
    typeof c === 'object' && c !== null && 'heading' in c && 'bgColor' in c
const isStats = (c: unknown): c is StatsContent =>
    typeof c === 'object' && c !== null && 'stats' in c
const isFeatures = (c: unknown): c is FeaturesContent =>
    typeof c === 'object' && c !== null && 'items' in c && Array.isArray((c as FeaturesContent).items)
const isTestimonials = (c: unknown): c is TestimonialsContent =>
    typeof c === 'object' && c !== null && 'items' in c && Array.isArray((c as TestimonialsContent).items) && (c as TestimonialsContent).items[0] && 'text' in (c as TestimonialsContent).items[0]
const isCta = (c: unknown): c is CtaContent =>
    typeof c === 'object' && c !== null && 'heading' in c && 'bgColor' in c && !('text' in c && 'image' in c)
const isFaq = (c: unknown): c is FaqContent =>
    typeof c === 'object' && c !== null && 'items' in c && Array.isArray((c as FaqContent).items) && (c as FaqContent).items[0] && 'question' in (c as FaqContent).items[0]
const isContent = (c: unknown): c is ContentSection =>
    typeof c === 'object' && c !== null && ('text' in c || 'layout' in c) && !('stats' in c)
const isSplit = (c: unknown): c is SplitContent =>
    typeof c === 'object' && c !== null && 'left' in c && 'right' in c

// ─── Theme helper ─────────────────────────────────────────────────────────────
interface TemplateColors {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    muted?: string
    border?: string
}

function useTemplateStyles(colors: TemplateColors) {
    useEffect(() => {
        const r = document.documentElement
        r.style.setProperty('--tp-primary', colors.primary)
        r.style.setProperty('--tp-secondary', colors.secondary)
        r.style.setProperty('--tp-accent', colors.accent)
        r.style.setProperty('--tp-bg', colors.background)
        r.style.setProperty('--tp-text', colors.text)
        r.style.setProperty('--tp-muted', colors.muted || '#888888')
        r.style.setProperty('--tp-border', colors.border || '#e5e7eb')
        return () => {
            document.documentElement.removeAttribute('style')
        }
    }, [colors])
}

// ─── Section Renderers ────────────────────────────────────────────────────────
function HeroSection({ content, colors, storeName }: { content: HeroContent; colors: TemplateColors; storeName: string }) {
    const isFullscreen = content.layout === 'fullscreen' || content.layout === 'banner'
    const isCentered = content.layout === 'centered'
    const isDark = isDarkColor(colors.background)

    return (
        <section
            className="relative overflow-hidden"
            style={{
                background: content.image
                    ? `linear-gradient(to bottom right, ${colors.secondary}22, ${colors.primary}33), ${colors.background}`
                    : `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                minHeight: isFullscreen ? '90vh' : '60vh',
                display: 'flex', alignItems: 'center'
            }}
        >
            {content.image && (
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(135deg, ${colors.primary}BB, ${colors.secondary}88)` }}
                    />
                </div>
            )}

            <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full ${isCentered ? 'text-center' : ''}`}>
                <div className={`max-w-3xl ${isCentered ? 'mx-auto' : ''}`}>
                    <h1
                        className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight"
                        style={{ color: content.image ? '#FFFFFF' : (isDark ? colors.text : '#FFFFFF') }}
                    >
                        {content.heading}
                    </h1>
                    {content.subheading && (
                        <p
                            className="text-xl sm:text-2xl mb-4 opacity-90 leading-relaxed"
                            style={{ color: content.image ? '#F0F0F0' : (isDark ? colors.text + 'CC' : '#FFFFFF') + 'DD' }}
                        >
                            {content.subheading}
                        </p>
                    )}
                    {content.description && (
                        <p
                            className="text-lg mb-8 opacity-80"
                            style={{ color: content.image ? '#E0E0E0' : '#FFFFFFAA' }}
                        >
                            {content.description}
                        </p>
                    )}
                    {(content.buttonText || content.secondaryButtonText) && (
                        <div className={`flex flex-wrap gap-4 ${isCentered ? 'justify-center' : ''}`}>
                            {content.buttonText && (
                                <Link
                                    href={content.buttonLink || '/shop'}
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 hover:shadow-xl"
                                    style={{ background: '#FFFFFF', color: colors.primary }}
                                >
                                    {content.buttonText}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            )}
                            {content.secondaryButtonText && (
                                <Link
                                    href={content.secondaryButtonLink || '/about'}
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base border-2 border-white/60 text-white transition-all hover:bg-white/10"
                                >
                                    {content.secondaryButtonText}
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

function isDarkColor(hex: string): boolean {
    const c = hex.replace('#', '')
    const r = parseInt(c.substring(0, 2), 16)
    const g = parseInt(c.substring(2, 4), 16)
    const b = parseInt(c.substring(4, 6), 16)
    return (r * 299 + g * 587 + b * 114) / 1000 < 128
}

function GridSection({ content, colors }: { content: GridContent; colors: TemplateColors }) {
    const cols = content.columns || 3
    const gridClass = cols === 4 ? 'grid-cols-2 md:grid-cols-4' : cols === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
    return (
        <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
            {content.heading && <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3" style={{ color: colors.text }}>{content.heading}</h2>}
            {content.subheading && <p className="text-center mb-12 text-lg" style={{ color: colors.muted }}>{content.subheading}</p>}
            {!content.subheading && content.heading && <div className="mb-12" />}
            <div className={`grid ${gridClass} gap-6`}>
                {content.items.map((item, i) => (
                    <div
                        key={i}
                        className="group rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                        style={{ borderColor: colors.border || '#e5e7eb', background: colors.accent + '22' }}
                    >
                        {item.image && (
                            <div className="aspect-[4/3] overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                            </div>
                        )}
                        <div className="p-6">
                            {item.icon && !item.image && (
                                <div className="text-4xl mb-3">{item.icon}</div>
                            )}
                            <h3 className="font-bold text-lg mb-1" style={{ color: colors.text }}>{item.title}</h3>
                            {item.description && <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>{item.description}</p>}
                            {item.link && (
                                <Link href={item.link} className="inline-flex items-center gap-1 mt-3 text-sm font-semibold" style={{ color: colors.primary }}>
                                    View <ArrowRight className="w-3 h-3" />
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

function BannerSection({ content, colors }: { content: BannerContent; colors: TemplateColors }) {
    return (
        <section
            className="py-16 px-4 sm:px-6"
            style={{ background: content.bgColor || colors.primary }}
        >
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">{content.heading}</h2>
                {content.text && <p className="text-lg mb-8 text-white/80">{content.text}</p>}
                {content.buttonText && (
                    <Link
                        href={content.buttonLink || '/shop'}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5"
                        style={{ background: '#FFFFFF', color: content.bgColor || colors.primary }}
                    >
                        {content.buttonText} <ArrowRight className="w-4 h-4" />
                    </Link>
                )}
            </div>
        </section>
    )
}

function FeaturesSection({ content, colors }: { content: FeaturesContent; colors: TemplateColors }) {
    return (
        <section className="py-20 px-4 sm:px-6" style={{ background: colors.accent + '33' }}>
            <div className="max-w-7xl mx-auto">
                {content.heading && <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3" style={{ color: colors.text }}>{content.heading}</h2>}
                {content.subheading && <p className="text-center mb-12 text-lg" style={{ color: colors.muted }}>{content.subheading}</p>}
                {!content.subheading && content.heading && <div className="mb-12" />}
                <div className={`grid grid-cols-1 sm:grid-cols-2 ${content.items.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-8`}>
                    {content.items.map((item, i) => (
                        <div key={i} className="text-center p-6">
                            {item.icon && <div className="text-4xl mb-4">{item.icon}</div>}
                            {item.image && <img src={item.image} alt={item.title} className="w-16 h-16 rounded-full object-cover mx-auto mb-4" onError={(e) => { e.currentTarget.style.display = 'none' }} />}
                            {!item.icon && !item.image && (
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: colors.primary + '20' }}>
                                    <Check className="w-7 h-7" style={{ color: colors.primary }} />
                                </div>
                            )}
                            <h3 className="font-bold text-lg mb-2" style={{ color: colors.text }}>{item.title}</h3>
                            {item.description && <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>{item.description}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function StatsSection({ content, colors }: { content: StatsContent; colors: TemplateColors }) {
    return (
        <section className="py-20 px-4 sm:px-6" style={{ background: colors.secondary }}>
            <div className="max-w-7xl mx-auto">
                {content.heading && <h2 className="text-3xl font-bold text-center mb-12 text-white">{content.heading}</h2>}
                <div className={`grid grid-cols-2 md:grid-cols-${Math.min(content.stats.length, 4)} gap-8`}>
                    {content.stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{stat.value}</div>
                            <div className="text-sm font-medium text-white/70">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function TestimonialsSection({ content, colors }: { content: TestimonialsContent; colors: TemplateColors }) {
    return (
        <section className="py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {content.heading && <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12" style={{ color: colors.text }}>{content.heading}</h2>}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {content.items.map((item, i) => (
                        <div key={i} className="p-8 rounded-2xl border" style={{ borderColor: colors.border || '#e5e7eb', background: colors.background }}>
                            {item.rating && (
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: item.rating }).map((_, j) => (
                                        <Star key={j} className="w-4 h-4 fill-current" style={{ color: colors.secondary }} />
                                    ))}
                                </div>
                            )}
                            <p className="text-base leading-relaxed mb-6 italic" style={{ color: colors.muted }}>"{item.text}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ background: colors.primary }}>
                                    {item.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-sm" style={{ color: colors.text }}>{item.name}</p>
                                    {item.role && <p className="text-xs" style={{ color: colors.muted }}>{item.role}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function CtaSection({ content, colors }: { content: CtaContent; colors: TemplateColors }) {
    return (
        <section className="py-20 px-4 sm:px-6" style={{ background: content.bgColor || colors.primary }}>
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">{content.heading}</h2>
                {content.text && <p className="text-lg mb-8 text-white/80">{content.text}</p>}
                {content.buttonText && (
                    <Link
                        href={content.buttonLink || '/contact'}
                        className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 hover:shadow-xl"
                        style={{ background: '#FFFFFF', color: content.bgColor || colors.primary }}
                    >
                        {content.buttonText} <ArrowRight className="w-4 h-4" />
                    </Link>
                )}
            </div>
        </section>
    )
}

function FaqSection({ content, colors }: { content: FaqContent; colors: TemplateColors }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    return (
        <section className="py-20 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
                {content.heading && <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12" style={{ color: colors.text }}>{content.heading}</h2>}
                <div className="space-y-3">
                    {content.items.map((item, i) => (
                        <div key={i} className="border rounded-xl overflow-hidden" style={{ borderColor: colors.border || '#e5e7eb' }}>
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full text-left px-6 py-5 flex items-center justify-between font-semibold"
                                style={{ color: colors.text }}
                            >
                                {item.question}
                                <ChevronDown className={`w-5 h-5 transition-transform shrink-0 ml-4 ${openIndex === i ? 'rotate-180' : ''}`} style={{ color: colors.muted }} />
                            </button>
                            {openIndex === i && (
                                <div className="px-6 pb-5 text-base leading-relaxed" style={{ color: colors.muted }}>
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function ContentSectionRenderer({ content, colors }: { content: ContentSection; colors: TemplateColors }) {
    const isRight = content.layout === 'image-right'
    const isCentered = content.layout === 'centered'
    return (
        <section className="py-20 px-4 sm:px-6">
            <div className={`max-w-7xl mx-auto ${isCentered ? 'text-center max-w-3xl' : 'grid md:grid-cols-2 gap-16 items-center'}`}>
                {!isCentered && content.image && !isRight && (
                    <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                        <img src={content.image} alt={content.heading || ''} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                    </div>
                )}
                <div>
                    {content.heading && <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: colors.text }}>{content.heading}</h2>}
                    {content.text && <p className="text-lg leading-relaxed mb-8" style={{ color: colors.muted }}>{content.text}</p>}
                    {content.buttonText && (
                        <Link
                            href={content.buttonLink || '/about'}
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all"
                            style={{ background: colors.primary, color: '#FFFFFF' }}
                        >
                            {content.buttonText} <ArrowRight className="w-4 h-4" />
                        </Link>
                    )}
                </div>
                {!isCentered && content.image && isRight && (
                    <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                        <img src={content.image} alt={content.heading || ''} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                    </div>
                )}
            </div>
        </section>
    )
}

function SplitSection({ content, colors }: { content: SplitContent; colors: TemplateColors }) {
    const { left, right } = content
    return (
        <section className="py-20 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
                {[left, right].map((side, idx) => (
                    <div key={idx} className="p-8 rounded-2xl border" style={{ borderColor: colors.border || '#e5e7eb' }}>
                        {'heading' in side && side.heading && <h3 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>{side.heading}</h3>}
                        {'type' in side && side.type === 'form' && 'fields' in side && (
                            <div className="space-y-4">
                                {(side.fields as string[]).map((field) => (
                                    <div key={field}>
                                        <label className="block text-sm font-medium mb-1 capitalize" style={{ color: colors.text }}>
                                            {field.replace(/_/g, ' ')}
                                        </label>
                                        {field === 'message' ? (
                                            <textarea rows={4} className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: colors.border || '#e5e7eb', background: colors.accent + '22', color: colors.text }} />
                                        ) : (
                                            <input type="text" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: colors.border || '#e5e7eb', background: colors.accent + '22', color: colors.text }} />
                                        )}
                                    </div>
                                ))}
                                {'buttonText' in side && (
                                    <button className="w-full py-3 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5" style={{ background: colors.primary }}>
                                        {'buttonText' in side ? side.buttonText as string : 'Submit'}
                                    </button>
                                )}
                            </div>
                        )}
                        {'type' in side && side.type === 'contact-info' && (
                            <div className="space-y-4 text-sm" style={{ color: colors.muted }}>
                                {'email' in side && side.email && <div className="flex items-center gap-3"><span className="text-lg">✉️</span><span>{side.email as string}</span></div>}
                                {'phone' in side && side.phone && <div className="flex items-center gap-3"><span className="text-lg">📞</span><span>{side.phone as string}</span></div>}
                                {'address' in side && side.address && <div className="flex items-center gap-3"><MapPin className="w-5 h-5 shrink-0" style={{ color: colors.primary }} /><span>{side.address as string}</span></div>}
                                {'hours' in side && side.hours && <div className="flex items-center gap-3"><span className="text-lg">🕐</span><span>{side.hours as string}</span></div>}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

// ─── Section Dispatcher ──────────────────────────────────────────────────────
function SectionRenderer({ section, colors }: { section: TemplateSection; colors: TemplateColors }) {
    if (!section.enabled) return null
    const c = section.content
    if (section.type === 'hero' && isHero(c)) return <HeroSection content={c} colors={colors} storeName="" />
    if (section.type === 'grid' && isGrid(c)) return <GridSection content={c} colors={colors} />
    if (section.type === 'banner' && isBanner(c)) return <BannerSection content={c} colors={colors} />
    if (section.type === 'features' && isFeatures(c)) return <FeaturesSection content={c} colors={colors} />
    if (section.type === 'stats' && isStats(c)) return <StatsSection content={c} colors={colors} />
    if (section.type === 'testimonials' && isTestimonials(c)) return <TestimonialsSection content={c} colors={colors} />
    if (section.type === 'cta' && isCta(c)) return <CtaSection content={c} colors={colors} />
    if (section.type === 'faq' && isFaq(c)) return <FaqSection content={c} colors={colors} />
    if (section.type === 'content' && isContent(c)) return <ContentSectionRenderer content={c} colors={colors} />
    if (section.type === 'split' && isSplit(c)) return <SplitSection content={c} colors={colors} />
    return null
}

// ─── Main Component ──────────────────────────────────────────────────────────
export function UniversalTemplate({ store }: { store: Store }) {
    const { items, addItem } = useTemplateCart(store.subdomain)
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const [mobileOpen, setMobileOpen] = useState(false)

    // Get template data
    const template = getTemplateById(store.template)
    const colors: TemplateColors = template?.colors || {
        primary: '#6C63FF',
        secondary: '#FF6584',
        accent: '#F8F8FF',
        background: '#FFFFFF',
        text: '#1A1A1A',
        muted: '#6B7280',
        border: '#E5E7EB',
    }

    useTemplateStyles(colors)

    const isDark = isDarkColor(colors.background)
    const textColor = isDark ? colors.text : colors.text
    const bgColor = colors.background

    // Get home page sections
    const homePage = template?.pages?.find(p => p.id === 'home')
    const homePageEnabled = homePage?.sections?.filter(s => s.enabled) || []

    // Nav links
    const navLinks = [
        { label: 'Home', href: `/store/${store.subdomain}` },
        { label: 'Shop', href: '#products' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
    ]

    const formatPrice = (price: number) => `KES ${price.toLocaleString()}`

    return (
        <div className="min-h-screen" style={{ background: bgColor, color: textColor, fontFamily: 'Inter, system-ui, sans-serif' }}>

            {/* ── Header ── */}
            <header
                className="sticky top-0 z-50 border-b backdrop-blur-md"
                style={{ background: bgColor + 'EE', borderColor: colors.border || '#e5e7eb' }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 py-4 flex items-center justify-between">
                    <Link href={`/store/${store.subdomain}`}>
                        <span className="text-2xl font-black tracking-tight" style={{ color: colors.primary }}>
                            {store.businessName}
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm font-medium transition-colors hover:opacity-70"
                                style={{ color: textColor }}
                                onClick={(e) => {
                                    if (link.href.startsWith('#')) {
                                        e.preventDefault()
                                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                                    }
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <a
                            href="#products"
                            onClick={(e) => { e.preventDefault(); document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' }) }}
                            className="relative p-2.5 rounded-full transition-colors"
                            style={{ background: colors.primary + '15' }}
                        >
                            <ShoppingCart className="w-5 h-5" style={{ color: colors.primary }} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full" style={{ background: colors.primary }}>
                                    {cartCount}
                                </span>
                            )}
                        </a>
                        <button
                            className="md:hidden p-2.5 rounded-full"
                            style={{ background: colors.primary + '15' }}
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <X className="w-5 h-5" style={{ color: colors.primary }} /> : <Menu className="w-5 h-5" style={{ color: colors.primary }} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                {mobileOpen && (
                    <div className="md:hidden border-t px-4 py-4 space-y-3" style={{ background: bgColor, borderColor: colors.border || '#e5e7eb' }}>
                        {navLinks.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="block py-2.5 text-base font-medium border-b last:border-0"
                                style={{ color: textColor, borderColor: colors.border || '#e5e7eb' }}
                                onClick={(e) => {
                                    setMobileOpen(false)
                                    if (link.href.startsWith('#')) {
                                        e.preventDefault()
                                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                                    }
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}
            </header>

            {/* ── Template Sections (Home page) ── */}
            {homePageEnabled.length > 0 ? (
                homePageEnabled.map(section => (
                    <SectionRenderer key={section.id} section={section} colors={colors} />
                ))
            ) : (
                // Fallback hero when no template pages defined
                <section
                    className="py-32 px-4 text-center"
                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                >
                    <h1 className="text-5xl font-bold text-white mb-4">{store.businessName}</h1>
                    <p className="text-xl text-white/80 mb-8">{store.description}</p>
                    <a href="#products" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base bg-white" style={{ color: colors.primary }}>
                        Shop Now <ArrowRight className="w-4 h-4" />
                    </a>
                </section>
            )}

            {/* ── Products Section ── */}
            <section id="products" className="py-20 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-12" style={{ color: textColor }}>
                        {store.template?.includes('restaurant') ? 'Our Menu' : store.template?.includes('real-estate') ? 'Featured Listings' : 'Our Products'}
                    </h2>
                    {store.products.filter(p => p.isActive).length === 0 ? (
                        <div className="text-center py-20 border-2 border-dashed rounded-2xl" style={{ borderColor: colors.border || '#e5e7eb' }}>
                            <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-30" style={{ color: colors.primary }} />
                            <p className="text-lg font-medium opacity-50" style={{ color: textColor }}>No products yet</p>
                            <p className="text-sm opacity-40 mt-1" style={{ color: textColor }}>Add products from your dashboard to see them here</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {store.products.filter(p => p.isActive).map(product => (
                                <div key={product.id} className="group rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 hover:shadow-xl" style={{ borderColor: colors.border || '#e5e7eb', background: colors.background }}>
                                    <div className="aspect-[4/3] overflow-hidden relative" style={{ background: colors.accent + '33' }}>
                                        {product.images && product.images[0] ? (
                                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-5xl font-black opacity-20" style={{ color: colors.primary }}>{product.name.charAt(0)}</span>
                                            </div>
                                        )}
                                        {product.stock > 0 && (
                                            <button
                                                onClick={() => addItem({ productId: product.id, name: product.name, price: product.price, storeName: store.businessName })}
                                                className="absolute bottom-3 right-3 p-3 rounded-full shadow-lg text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                                                style={{ background: colors.primary }}
                                            >
                                                <ShoppingBag className="w-4 h-4" />
                                            </button>
                                        )}
                                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                                            <div className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold text-white" style={{ background: colors.secondary }}>
                                                SALE
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <p className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-50" style={{ color: textColor }}>{product.category}</p>
                                        <h3 className="font-bold text-base mb-2" style={{ color: textColor }}>{product.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-lg font-bold" style={{ color: colors.primary }}>{formatPrice(product.price)}</span>
                                                {product.compareAtPrice && product.compareAtPrice > product.price && (
                                                    <span className="text-sm line-through ml-2 opacity-40" style={{ color: textColor }}>{formatPrice(product.compareAtPrice)}</span>
                                                )}
                                            </div>
                                            {product.stock <= 0 && <span className="text-xs font-medium text-red-500">Out of Stock</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── About Section ── */}
            <section id="about" className="py-24 px-4 sm:px-6" style={{ background: colors.secondary + '15' }}>
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: textColor }}>About {store.businessName}</h2>
                        <p className="text-lg leading-relaxed mb-8" style={{ color: colors.muted }}>{store.description || 'We are committed to providing the best products and service to our customers.'}</p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-5 rounded-2xl" style={{ background: colors.primary + '15' }}>
                                <div className="text-3xl font-black" style={{ color: colors.primary }}>100%</div>
                                <div className="text-sm font-medium mt-1 opacity-70" style={{ color: textColor }}>Quality Guarantee</div>
                            </div>
                            <div className="p-5 rounded-2xl" style={{ background: colors.primary + '15' }}>
                                <div className="text-3xl font-black" style={{ color: colors.primary }}>24/7</div>
                                <div className="text-sm font-medium mt-1 opacity-70" style={{ color: textColor }}>Customer Support</div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {['Authentic Quality Products', 'Fast & Reliable Service', 'Secure Payments', 'Dedicated Support Team'].map(item => (
                            <div key={item} className="flex items-center gap-4 p-4 rounded-xl border" style={{ borderColor: colors.border || '#e5e7eb', background: colors.background }}>
                                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: colors.primary + '20' }}>
                                    <Check className="w-4 h-4" style={{ color: colors.primary }} />
                                </div>
                                <span className="font-medium" style={{ color: textColor }}>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Contact / Delivery Section ── */}
            <section id="contact" className="py-24 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12 rounded-3xl border" style={{ borderColor: colors.border || '#e5e7eb', background: colors.accent + '22' }}>
                        <div>
                            <h2 className="text-2xl font-bold mb-8" style={{ color: textColor }}>Delivery & Pickup</h2>
                            <div className="space-y-6">
                                {store.offerDelivery && (
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: colors.primary + '20' }}>
                                            <Truck className="w-5 h-5" style={{ color: colors.primary }} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-1" style={{ color: textColor }}>We Deliver</h4>
                                            <p className="text-sm" style={{ color: colors.muted }}>Delivery fee: {formatPrice(store.deliveryFee)}</p>
                                        </div>
                                    </div>
                                )}
                                {store.offerPickup && (
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: colors.primary + '20' }}>
                                            <MapPin className="w-5 h-5" style={{ color: colors.primary }} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-1" style={{ color: textColor }}>Store Pickup</h4>
                                            <p className="text-sm" style={{ color: colors.muted }}>{store.pickupLocation}</p>
                                        </div>
                                    </div>
                                )}
                                {!store.offerDelivery && !store.offerPickup && (
                                    <p className="text-sm" style={{ color: colors.muted }}>Contact us for delivery options.</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-8" style={{ color: textColor }}>Contact Us</h2>
                            <p className="text-sm mb-6" style={{ color: colors.muted }}>Have questions? We'd love to hear from you.</p>
                            {(store as any).whatsapp && (
                                <a
                                    href={`https://wa.me/${(store as any).whatsapp}`}
                                    target="_blank" rel="noreferrer"
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white w-full sm:w-auto transition-all hover:-translate-y-0.5"
                                    style={{ background: '#25D366' }}
                                >
                                    <Phone className="w-5 h-5" />
                                    Chat on WhatsApp
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="border-t pt-16 pb-8 px-4 sm:px-6" style={{ background: bgColor, borderColor: colors.border || '#e5e7eb' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="md:col-span-2">
                            <h3 className="text-2xl font-black mb-4" style={{ color: colors.primary }}>{store.businessName}</h3>
                            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: colors.muted }}>{store.description}</p>
                            <div className="flex gap-3">
                                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:-translate-y-0.5" style={{ background: colors.primary + '15' }}>
                                        <Icon className="w-4 h-4" style={{ color: colors.primary }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4" style={{ color: textColor }}>Quick Links</h4>
                            <ul className="space-y-3">
                                {['Home', 'Shop', 'About', 'Contact'].map(l => (
                                    <li key={l}><a href="#" className="text-sm hover:opacity-70 transition-opacity" style={{ color: colors.muted }}>{l}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4" style={{ color: textColor }}>Legal</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-sm hover:opacity-70" style={{ color: colors.muted }}>Privacy Policy</a></li>
                                <li><a href="#" className="text-sm hover:opacity-70" style={{ color: colors.muted }}>Terms of Service</a></li>
                                <li><a href="#" className="text-sm hover:opacity-70" style={{ color: colors.muted }}>Shipping Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: colors.border || '#e5e7eb' }}>
                        <p className="text-sm" style={{ color: colors.muted }}>
                            © {new Date().getFullYear()} {store.businessName}. All rights reserved.
                        </p>
                        <p className="text-xs flex items-center gap-1.5" style={{ color: colors.muted }}>
                            Powered by <span className="font-bold" style={{ color: colors.primary }}>Duka</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
