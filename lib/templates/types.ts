// export type PageType = 'home' | 'about' | 'shop' | 'contact' | 'faq' | 'blog'

// export interface TemplatePage {
//   id: PageType
//   name: string
//   enabled: boolean
//   sections: TemplateSection[]
// }

// export interface TemplateSection {
//   id: string
//   type: 'hero' | 'features' | 'products' | 'about' | 'testimonials' | 'cta' | 'contact' | 'faq' | 'gallery' | 'stats'
//   title: string
//   content: {
//     heading?: string
//     subheading?: string
//     description?: string
//     buttonText?: string
//     buttonLink?: string
//     items?: any[]
//     image?: string
//   }
// }

// export interface WebsiteTemplate {
//   id: string
//   name: string
//   description: string
//   category: 'minimal' | 'bold' | 'vibrant' | 'elegant' | 'modern'
//   thumbnail: string
//   colors: {
//     primary: string
//     secondary: string
//     accent: string
//     background: string
//     text: string
//   }
//   fonts: {
//     heading: string
//     body: string
//   }
//   pages: TemplatePage[]
//   previewImages: {
//     desktop: string
//     mobile: string
//   }
// }

// ─────────────────────────────────────────────────────────────────────────────
// Page & Template Category Types
// ─────────────────────────────────────────────────────────────────────────────

export type PageType =
  | 'home'
  | 'about'
  | 'shop'
  | 'contact'
  | 'faq'
  | 'blog'

export type TemplateCategory =
  | 'minimal'
  | 'bold'
  | 'vibrant'
  | 'elegant'
  | 'modern'
  | 'marketplace'
  | 'fashion'
  | 'food'
  | 'electronics'
  | 'beauty'

export type SectionType =
  | 'hero'
  | 'features'
  | 'products'
  | 'about'
  | 'testimonials'
  | 'cta'
  | 'contact'
  | 'faq'
  | 'gallery'
  | 'stats'
  | 'grid'
  | 'banner'
  | 'content'
  | 'split'
  | 'form'           // ← add
  | 'contact-info'   // ← add

export type HeroLayout = 'banner' | 'centered' | 'split' | 'fullscreen'

export type ContentLayout = 'centered' | 'image-left' | 'image-right' | 'two-column'

// ─────────────────────────────────────────────────────────────────────────────
// Section Content Shapes
// ─────────────────────────────────────────────────────────────────────────────

export interface HeroContent {
  heading: string
  subheading?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  image?: string
  layout?: HeroLayout
}

export interface GridItem {
  title: string
  description?: string
  image?: string
  link?: string
  icon?: string
}

export interface GridContent {
  heading?: string
  subheading?: string
  columns?: 2 | 3 | 4
  items: GridItem[]
}

export interface BannerContent {
  heading: string
  text?: string
  buttonText?: string
  buttonLink?: string
  bgColor?: string
  textColor?: string
  image?: string
}

export interface ContentSection {
  heading?: string
  text?: string
  image?: string
  layout?: ContentLayout
  buttonText?: string
  buttonLink?: string
}

export interface SplitFormField {
  type: 'form'
  heading?: string
  fields: string[]
  buttonText?: string
}

export interface SplitContactInfo {
  type: 'contact-info'
  heading?: string
  email?: string
  phone?: string
  address?: string
  hours?: string
}

export interface SplitContent {
  left: SplitFormField | SplitContactInfo | ContentSection
  right: SplitFormField | SplitContactInfo | ContentSection
}

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqContent {
  heading?: string
  subheading?: string
  items: FaqItem[]
}

export interface StatItem {
  label: string
  value: string
}

export interface StatsContent {
  heading?: string
  stats: StatItem[]
}

export interface FeatureItem {
  title: string
  description?: string
  icon?: string
  image?: string
}

export interface FeaturesContent {
  heading?: string
  subheading?: string
  items: FeatureItem[]
}

export interface TestimonialItem {
  name: string
  role?: string
  text: string
  avatar?: string
  rating?: number
}

export interface TestimonialsContent {
  heading?: string
  items: TestimonialItem[]
}

export interface CtaContent {
  heading: string
  text?: string
  buttonText?: string
  buttonLink?: string
  bgColor?: string
}

export interface GalleryContent {
  heading?: string
  images: string[]
  columns?: 2 | 3 | 4
}

// Union of all possible content shapes — used as the type for section.content
export type SectionContent =
  | HeroContent
  | GridContent
  | BannerContent
  | ContentSection
  | SplitContent
  | FaqContent
  | StatsContent
  | FeaturesContent
  | TestimonialsContent
  | CtaContent
  | GalleryContent
  | Record<string, unknown>

// ─────────────────────────────────────────────────────────────────────────────
// Core Template Structures
// ─────────────────────────────────────────────────────────────────────────────

export interface TemplateSection {
  id: string
  type: SectionType
  /** Optional display title for the section (e.g. in a builder UI) */
  title?: string
  enabled: boolean
  content: SectionContent
}

export interface TemplatePage {
  /** Typed page IDs for known pages; string fallback for custom pages */
  id: PageType | string
  name: string
  slug: string
  enabled: boolean
  sections: TemplateSection[]
}

export interface TemplateColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  muted?: string
  border?: string
}

/** Original simple fonts shape — kept for backwards compatibility */
export interface TemplateFonts {
  heading: string
  body: string
}

/** Richer typography config — prefer this over TemplateFonts for new templates */
export interface TemplateTypography {
  headingFont: string
  bodyFont: string
  baseFontSize?: string
}

export interface TemplatePreviewImages {
  desktop: string
  mobile: string
}

export interface WebsiteTemplate {
  id: string
  name: string
  description: string
  category: TemplateCategory
  /** @deprecated Use `preview` instead */
  thumbnail?: string
  preview?: string
  colors: TemplateColors
  /** @deprecated Use `typography` instead */
  fonts?: TemplateFonts
  typography?: TemplateTypography
  pages: TemplatePage[]
  previewImages?: TemplatePreviewImages
}