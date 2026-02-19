'use client'

import { useState } from 'react'
import { useOnboarding } from '../onboarding-context'
import { StepNavigation } from './step-navigation'
import { allTemplates } from '@/lib/templates'
import { Check, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

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

const templateGradients: Record<string, string> = {
  'sleek-minimal': 'from-slate-200 to-slate-300',
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

export function Step2Template() {
  const { data, updateData, setCurrentStep } = useOnboarding()
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [previewId, setPreviewId] = useState<string | null>(null)

  const canProceed = data.selectedTemplate !== null
  const categories = ['all', ...Array.from(new Set(allTemplates.map(t => t.category)))]
  const filtered = categoryFilter === 'all' ? allTemplates : allTemplates.filter(t => t.category === categoryFilter)
  const previewTemplate = allTemplates.find(t => t.id === previewId)
  const selectedTpl = allTemplates.find(t => t.id === data.selectedTemplate)

  return (
    <div className="space-y-5">
      <p className="text-muted-foreground text-sm">
        Choose a design that fits your brand. You can switch templates anytime from the dashboard.
      </p>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-all border',
              categoryFilter === cat
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-background border-border text-muted-foreground hover:border-primary/40'
            )}
          >
            {categoryLabels[cat] || cat}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[420px] overflow-y-auto pr-1">
        {filtered.map(template => {
          const isSelected = data.selectedTemplate === template.id
          const gradient = templateGradients[template.id] || 'from-gray-300 to-gray-400'
          return (
            <div key={template.id} className="space-y-2">
              <button
                onClick={() => updateData({ selectedTemplate: template.id })}
                className={cn(
                  'w-full rounded-xl border-2 transition-all overflow-hidden relative group focus:outline-none',
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20 shadow-md'
                    : 'border-border hover:border-primary/50'
                )}
              >
                {/* Gradient preview */}
                <div className={`h-28 bg-gradient-to-br ${gradient} relative`}>
                  {/* Skeleton overlay */}
                  <div className="absolute inset-0 flex flex-col">
                    <div className="h-6 bg-black/20 flex items-center px-2 gap-1.5">
                      <div className="w-10 h-1.5 bg-white/60 rounded-full" />
                      <div className="ml-auto flex gap-1">
                        <div className="w-4 h-1 bg-white/40 rounded-full" />
                        <div className="w-4 h-1 bg-white/40 rounded-full" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center gap-1 px-2">
                      <div className="w-2/3 h-2 bg-white/70 rounded-full" />
                      <div className="w-1/2 h-1.5 bg-white/50 rounded-full" />
                      <div className="w-10 h-3 bg-white/80 rounded-md mt-0.5" />
                    </div>
                    <div className="h-8 px-2 pb-1 grid grid-cols-3 gap-1">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="bg-black/20 rounded h-full" />
                      ))}
                    </div>
                  </div>

                  {/* Selected checkmark */}
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 h-5 w-5 bg-primary rounded-full flex items-center justify-center shadow">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}

                  {/* Preview hover */}
                  <div
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    onClick={e => { e.stopPropagation(); setPreviewId(template.id) }}
                  >
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 text-gray-800 text-xs font-semibold rounded-full">
                      <Eye className="w-3 h-3" /> Preview
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div className="px-2.5 py-2 bg-background text-left">
                  <p className="font-semibold text-xs text-foreground leading-tight">{template.name}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {[template.colors.primary, template.colors.secondary, template.colors.accent].map((color, i) => (
                      <div key={i} className="w-3 h-3 rounded-full border border-white shadow-sm" style={{ background: color }} />
                    ))}
                    <span className="text-[10px] text-muted-foreground ml-auto capitalize">{template.category}</span>
                  </div>
                </div>
              </button>
            </div>
          )
        })}
      </div>

      {/* Selected indicator */}
      {selectedTpl && (
        <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{selectedTpl.name}</p>
            <p className="text-xs text-muted-foreground">{selectedTpl.description}</p>
          </div>
        </div>
      )}

      {/* Inline Preview Panel */}
      {previewTemplate && (
        <div className="p-4 border rounded-2xl bg-white dark:bg-gray-900 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">{previewTemplate.name} Preview</h3>
            <button onClick={() => setPreviewId(null)} className="text-xs text-muted-foreground hover:text-foreground">✕ Close</button>
          </div>
          <div
            className="h-48 rounded-xl overflow-hidden relative border"
            style={{ background: `linear-gradient(135deg, ${previewTemplate.colors.primary}, ${previewTemplate.colors.secondary})` }}
          >
            <div className="absolute inset-0 flex flex-col">
              <div className="h-10 px-4 flex items-center" style={{ background: previewTemplate.colors.background + 'EE' }}>
                <span className="text-sm font-black" style={{ color: previewTemplate.colors.primary }}>{data.businessName || 'Your Store'}</span>
                <div className="ml-auto flex gap-3">
                  {['Shop', 'About', 'Contact'].map(l => (
                    <span key={l} className="text-[10px]" style={{ color: previewTemplate.colors.muted || '#888' }}>{l}</span>
                  ))}
                </div>
              </div>
              <div
                className="flex-1 flex flex-col items-center justify-center gap-2"
                style={{ background: `linear-gradient(135deg, ${previewTemplate.colors.primary}55, ${previewTemplate.colors.secondary}44)` }}
              >
                <div className="text-lg font-bold text-white">{data.businessName || 'Your Store'}</div>
                <div className="text-xs text-white/80">{previewTemplate.name} Template</div>
                <button className="px-4 py-1.5 rounded-lg text-xs font-bold" style={{ background: previewTemplate.colors.primary, color: '#fff' }}>
                  Shop Now
                </button>
              </div>
              <div className="h-14 px-3 pb-2 grid grid-cols-4 gap-1.5" style={{ background: previewTemplate.colors.background }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="rounded-md border" style={{ background: previewTemplate.colors.accent + '44', borderColor: previewTemplate.colors.border || '#e5e7eb' }} />
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => { updateData({ selectedTemplate: previewTemplate.id }); setPreviewId(null) }}
            className="w-full py-2 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: previewTemplate.colors.primary }}
          >
            Select {previewTemplate.name}
          </button>
        </div>
      )}

      <StepNavigation onNext={() => canProceed && setCurrentStep(3)} canProceed={canProceed} />
    </div>
  )
}
