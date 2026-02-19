/**
 * Template Registry
 * Maps template IDs → React components.
 * Any unrecognised ID falls back to UniversalTemplate.
 */
import React from 'react'
import { MinimalTemplate } from './MinimalTemplate'
import { BoldTemplate } from './BoldTemplate'
import { VibrantTemplate } from './VibrantTemplate'
import { UniversalTemplate } from './UniversalTemplate'
import type { Store } from '@/lib/stores'

type TemplateComponent = React.ComponentType<{ store: Store }>

const registry: Record<string, TemplateComponent> = {
    // Legacy
    'minimal': MinimalTemplate,
    'bold': BoldTemplate,
    'vibrant': VibrantTemplate,
    // Original data-driven templates
    'sleek-minimal': MinimalTemplate,
    'bold-artisan': BoldTemplate,
    'vibrant-market': VibrantTemplate,
    // All new templates use UniversalTemplate with their own styling
    'luxury-fashion': UniversalTemplate,
    'restaurant': UniversalTemplate,
    'agency-pro': UniversalTemplate,
    'tech-saas': UniversalTemplate,
    'beauty-wellness': UniversalTemplate,
    'fitness-gym': UniversalTemplate,
    'artisan-craft': UniversalTemplate,
    'electronics-store': UniversalTemplate,
    'fresh-grocery': UniversalTemplate,
    'real-estate': UniversalTemplate,
    'elegant-fashion': UniversalTemplate,
    'modern-tech': UniversalTemplate,
    'fresh-organic': UniversalTemplate,
}

export function getTemplateComponent(templateId: string): TemplateComponent {
    return registry[templateId] ?? UniversalTemplate
}
