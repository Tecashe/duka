import { TemplateSection } from '@/lib/templates/types'
import { HeroSection } from './sections/hero-section'
import { ContentSection } from './sections/content-section'
import { GridSection } from './sections/grid-section'
import { FormSection } from './sections/form-section'
import { TestimonialsSection } from './sections/testimonials-section'
import { FAQSection } from './sections/faq-section'
import { StatsSection } from './sections/stats-section'
import { BannerSection } from './sections/banner-section'
import { ContactInfoSection } from './sections/contact-info-section'
//
interface SectionRendererProps {
  section: TemplateSection
  templateColors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
}

export function SectionRenderer({ section, templateColors }: SectionRendererProps) {
  if (!section.enabled) return null

  switch (section.type) {
    case 'hero':
      return <HeroSection section={section} colors={templateColors} />
    case 'content':
      return <ContentSection section={section} colors={templateColors} />
    case 'grid':
      return <GridSection section={section} colors={templateColors} />
    case 'form':
      return <FormSection section={section} colors={templateColors} />
    case 'testimonials':
      return <TestimonialsSection section={section} colors={templateColors} />
    case 'faq':
      return <FAQSection section={section} colors={templateColors} />
    case 'stats':
      return <StatsSection section={section} colors={templateColors} />
    case 'banner':
      return <BannerSection section={section} colors={templateColors} />
    case 'contact-info':
      return <ContactInfoSection section={section} colors={templateColors} />
    default:
      return null
  }
}
