'use client'

import { useState, useEffect } from 'react'
import { allTemplates } from '@/lib/templates'
import { Palette, Layout, FileText, Settings, Check, Loader2, Eye, Wand2, Star } from 'lucide-react'
import Link from 'next/link'

type Tab = 'templates' | 'theme' | 'pages'

const categoryLabels: Record<string, string> = {
    all: 'All',
    minimal: 'Minimal',
    bold: 'Bold',
    vibrant: 'Vibrant',
    fashion: 'Fashion',
    food: 'Food & Dining',
    electronics: 'Electronics',
    beauty: 'Beauty',
    professional: 'Professional',
    modern: 'Modern',
    elegant: 'Elegant',
    marketplace: 'Marketplace',
    handcraft: 'Handcraft',
}

// Gradient previews per template
const templateGradients: Record<string, string> = {
    'sleek-minimal': 'from-slate-100 to-slate-200',
    'bold-artisan': 'from-orange-500 to-red-600',
    'vibrant-market': 'from-yellow-400 to-orange-400',
    'elegant-fashion': 'from-purple-900 to-pink-700',
    'modern-tech': 'from-blue-600 to-indigo-700',
    'fresh-organic': 'from-green-400 to-emerald-600',
    'luxury-fashion': 'from-yellow-900 to-yellow-600',
    'restaurant': 'from-red-900 to-amber-700',
    'agency-pro': 'from-violet-700 to-pink-600',
    'tech-saas': 'from-blue-700 to-violet-700',
    'beauty-wellness': 'from-pink-400 to-rose-300',
    'fitness-gym': 'from-red-600 to-orange-500',
    'artisan-craft': 'from-amber-700 to-yellow-600',
    'electronics-store': 'from-sky-500 to-blue-700',
    'fresh-grocery': 'from-green-500 to-lime-400',
    'real-estate': 'from-teal-800 to-blue-900',
}

export default function DesignPage() {
    const [activeTab, setActiveTab] = useState<Tab>('templates')
    const [currentTemplate, setCurrentTemplate] = useState<string>('sleek-minimal')
    const [selectedTemplate, setSelectedTemplate] = useState<string>('sleek-minimal')
    const [categoryFilter, setCategoryFilter] = useState<string>('all')
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [subdomain, setSubdomain] = useState<string>('')

    // Fetch current store's template
    useEffect(() => {
        fetch('/api/store/me')
            .then(r => r.json())
            .then(data => {
                if (data.template) setCurrentTemplate(data.template)
                if (data.template) setSelectedTemplate(data.template)
                if (data.subdomain) setSubdomain(data.subdomain)
            })
            .catch(() => { })
    }, [])

    const categories = ['all', ...Array.from(new Set(allTemplates.map(t => t.category)))]
    const filtered = categoryFilter === 'all' ? allTemplates : allTemplates.filter(t => t.category === categoryFilter)

    async function applyTemplate() {
        setSaving(true)
        try {
            await fetch('/api/store/update-template', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ templateId: selectedTemplate }),
            })
            setCurrentTemplate(selectedTemplate)
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        } catch {
            // silently fail — user can retry
        } finally {
            setSaving(false)
        }
    }

    const templateChanged = selectedTemplate !== currentTemplate

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

            {/* ── Top bar ── */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Palette className="w-5 h-5 text-purple-500" />
                            Store Design
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Customize your store's look and feel</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {subdomain && (
                            <Link
                                href={`https://duka-my.vercel.app/store/${subdomain}`}
                                target="_blank"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <Eye className="w-4 h-4" />
                                View Store
                            </Link>
                        )}
                        {templateChanged && (
                            <button
                                onClick={applyTemplate}
                                disabled={saving}
                                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-all disabled:opacity-70 shadow-sm"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Wand2 className="w-4 h-4" />}
                                {saving ? 'Applying…' : saved ? 'Applied!' : 'Apply Changes'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 pb-0">
                    {([
                        { id: 'templates', label: 'Templates', icon: Layout },
                        { id: 'theme', label: 'Theme Colors', icon: Palette },
                        { id: 'pages', label: 'Pages', icon: FileText },
                    ] as const).map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${activeTab === tab.id
                                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Tab Content ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

                {/* TEMPLATES TAB */}
                {activeTab === 'templates' && (
                    <div>
                        {/* Category filter */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategoryFilter(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${categoryFilter === cat
                                        ? 'bg-purple-600 text-white shadow-sm'
                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                                        }`}
                                >
                                    {categoryLabels[cat] || cat}
                                </button>
                            ))}
                        </div>

                        {/* Template grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filtered.map(template => {
                                const isSelected = selectedTemplate === template.id
                                const isCurrent = currentTemplate === template.id
                                const gradient = templateGradients[template.id] || 'from-gray-200 to-gray-300'
                                return (
                                    <button
                                        key={template.id}
                                        onClick={() => setSelectedTemplate(template.id)}
                                        className={`text-left rounded-2xl overflow-hidden border-2 transition-all hover:-translate-y-0.5 hover:shadow-lg focus:outline-none ${isSelected
                                            ? 'border-purple-600 shadow-lg shadow-purple-100 dark:shadow-purple-900/30'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                                            }`}
                                    >
                                        {/* Preview thumbnail */}
                                        <div className={`h-44 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
                                            {/* Simulated page layout skeleton */}
                                            <div className="absolute inset-0 flex flex-col">
                                                <div className="h-8 bg-black/20 flex items-center px-3 gap-2">
                                                    <div className="w-16 h-2 bg-white/60 rounded-full" />
                                                    <div className="ml-auto flex gap-1">
                                                        <div className="w-8 h-1.5 bg-white/40 rounded-full" />
                                                        <div className="w-8 h-1.5 bg-white/40 rounded-full" />
                                                        <div className="w-8 h-1.5 bg-white/40 rounded-full" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 flex flex-col items-center justify-center gap-2 px-4">
                                                    <div className="w-3/4 h-3 bg-white/70 rounded-full" />
                                                    <div className="w-1/2 h-2 bg-white/50 rounded-full" />
                                                    <div className="w-16 h-5 bg-white/80 rounded-lg mt-1" />
                                                </div>
                                                <div className="h-16 px-3 pb-2 grid grid-cols-3 gap-1.5">
                                                    {[0, 1, 2].map(i => (
                                                        <div key={i} className="bg-black/20 rounded-md h-full" />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Badges */}
                                            {isCurrent && (
                                                <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded-md flex items-center gap-1">
                                                    <Check className="w-2.5 h-2.5" /> ACTIVE
                                                </div>
                                            )}
                                            {isSelected && !isCurrent && (
                                                <div className="absolute top-2 left-2 px-2 py-1 bg-purple-600 text-white text-[10px] font-bold rounded-md flex items-center gap-1">
                                                    <Star className="w-2.5 h-2.5" /> SELECTED
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="p-4 bg-white dark:bg-gray-900">
                                            <div className="flex items-start justify-between mb-1">
                                                <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{template.name}</h3>
                                                {isSelected && (
                                                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center shrink-0 ml-2">
                                                        <Check className="w-3 h-3 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{template.description}</p>
                                            <div className="flex items-center gap-2 mt-3">
                                                {/* Color dots from template */}
                                                {[template.colors.primary, template.colors.secondary, template.colors.accent].map((color, i) => (
                                                    <div key={i} className="w-4 h-4 rounded-full border border-white shadow-sm" style={{ background: color }} />
                                                ))}
                                                <span className="text-xs capitalize ml-auto text-gray-400">{template.category}</span>
                                            </div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* THEME TAB */}
                {activeTab === 'theme' && (
                    <ThemeEditor currentTemplateId={selectedTemplate} />
                )}

                {/* PAGES TAB */}
                {activeTab === 'pages' && (
                    <PagesManager currentTemplateId={selectedTemplate} />
                )}
            </div>
        </div>
    )
}

// ─── Theme Editor Sub-Component ──────────────────────────────────────────────
function ThemeEditor({ currentTemplateId }: { currentTemplateId: string }) {
    const template = allTemplates.find(t => t.id === currentTemplateId)
    const [colors, setColors] = useState(template?.colors || {
        primary: '#6C63FF', secondary: '#FF6584', accent: '#F8F8FF',
        background: '#FFFFFF', text: '#1A1A1A', muted: '#6B7280', border: '#E5E7EB'
    })
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        const t = allTemplates.find(t => t.id === currentTemplateId)
        if (t) setColors(t.colors)
    }, [currentTemplateId])

    const colorFields = [
        { key: 'primary', label: 'Primary Color', hint: 'Main brand color — buttons, links, accents' },
        { key: 'secondary', label: 'Secondary Color', hint: 'Complementary color for highlights' },
        { key: 'accent', label: 'Accent / Background Tint', hint: 'Subtle tinting for section backgrounds' },
        { key: 'background', label: 'Page Background', hint: 'Main page background color' },
        { key: 'text', label: 'Text Color', hint: 'Main body and heading text' },
        { key: 'muted', label: 'Muted Text', hint: 'Captions, labels, secondary text' },
        { key: 'border', label: 'Border Color', hint: 'Cards, dividers, input borders' },
    ] as const

    async function saveColors() {
        setSaving(true)
        await new Promise(r => setTimeout(r, 800)) // Simulate API
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
        setSaving(false)
    }

    return (
        <div className="max-w-2xl">
            <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Theme Colors</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Customize the colors for <strong>{template?.name}</strong>. Changes will reflect immediately on your store.</p>
            </div>

            <div className="space-y-4 mb-8">
                {colorFields.map(field => (
                    <div key={field.key} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="relative shrink-0">
                            <input
                                type="color"
                                value={colors[field.key] || '#000000'}
                                onChange={e => setColors(prev => ({ ...prev, [field.key]: e.target.value }))}
                                className="w-12 h-12 rounded-xl cursor-pointer border-0 p-0.5 bg-transparent"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="font-semibold text-sm text-gray-900 dark:text-white">{field.label}</span>
                                <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md font-mono text-gray-600 dark:text-gray-400">
                                    {colors[field.key] || '#000000'}
                                </code>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{field.hint}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Preview strip */}
            <div className="mb-8 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Live Preview</h3>
                <div className="rounded-xl overflow-hidden border" style={{ background: colors.background, borderColor: colors.border }}>
                    <div className="h-10 px-4 flex items-center" style={{ background: colors.background, borderBottom: `1px solid ${colors.border}` }}>
                        <span className="font-bold text-sm" style={{ color: colors.primary }}>My Store</span>
                        <div className="ml-auto flex gap-3">
                            {['Home', 'Shop', 'About'].map(l => <span key={l} className="text-xs" style={{ color: colors.muted }}>{l}</span>)}
                        </div>
                    </div>
                    <div className="p-6 flex flex-col items-center gap-3" style={{ background: `linear-gradient(135deg, ${colors.primary}22, ${colors.secondary}22)` }}>
                        <div className="text-xl font-bold" style={{ color: colors.text }}>Welcome to My Store</div>
                        <div className="text-sm" style={{ color: colors.muted }}>Quality products you'll love</div>
                        <button className="px-5 py-2 rounded-lg text-sm font-bold text-white" style={{ background: colors.primary }}>Shop Now</button>
                    </div>
                    <div className="grid grid-cols-3 gap-3 p-4" style={{ background: colors.background }}>
                        {['Product A', 'Product B', 'Product C'].map(p => (
                            <div key={p} className="rounded-lg p-3 border" style={{ borderColor: colors.border, background: colors.accent + '44' }}>
                                <div className="h-8 rounded-md mb-2" style={{ background: colors.secondary + '44' }} />
                                <div className="text-xs font-medium" style={{ color: colors.text }}>{p}</div>
                                <div className="text-xs font-bold mt-1" style={{ color: colors.primary }}>KES 999</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={saveColors}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all disabled:opacity-70"
            >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Palette className="w-4 h-4" />}
                {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Colors'}
            </button>
        </div>
    )
}

// ─── Pages Manager Sub-Component ─────────────────────────────────────────────
function PagesManager({ currentTemplateId }: { currentTemplateId: string }) {
    const template = allTemplates.find(t => t.id === currentTemplateId)
    const pages = template?.pages || []

    const pageIcons: Record<string, string> = {
        home: '🏠', about: '📖', shop: '🛍️', contact: '✉️', faq: '❓', blog: '📝'
    }

    return (
        <div className="max-w-2xl">
            <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Page Manager</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Pages and sections for <strong>{template?.name}</strong>. Toggle visibility and manage content.
                </p>
            </div>

            {pages.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed rounded-2xl border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">No pages defined for this template yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {pages.map(page => (
                        <div key={page.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="px-5 py-4 flex items-center gap-3">
                                <span className="text-lg">{pageIcons[page.id] || '📄'}</span>
                                <div className="flex-1">
                                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">{page.name}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{page.slug} · {page.sections?.filter(s => s.enabled).length || 0} sections</p>
                                </div>
                                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${page.enabled ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500'}`}>
                                    {page.enabled ? 'Enabled' : 'Disabled'}
                                </span>
                            </div>
                            {page.sections && page.sections.length > 0 && (
                                <div className="border-t border-gray-100 dark:border-gray-800 px-5 py-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {page.sections.map(section => (
                                        <div key={section.id} className="flex items-center gap-2 text-xs">
                                            <div className={`w-2 h-2 rounded-full shrink-0 ${section.enabled ? 'bg-green-500' : 'bg-gray-300'}`} />
                                            <span className="text-gray-600 dark:text-gray-400 truncate">{section.title}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-700 dark:text-blue-400">
                    <strong>Coming soon:</strong> Click any section to edit its content — headings, images, text, and button links directly from your dashboard.
                </p>
            </div>
        </div>
    )
}
