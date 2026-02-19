export * from './types'

// ── Original 6 Templates ─────────────────────────────────────────────────────
export { elegantFashionTemplate } from './elegant-fashion'
export { modernTechTemplate } from './modern-tech'
export { freshOrganicTemplate } from './fresh-organic'
export { boldArtisanTemplate } from './bold-artisan'
export { sleekMinimalTemplate } from './sleek-minimal'
export { vibrantMarketTemplate } from './vibrant-market'

// ── New Market Templates ──────────────────────────────────────────────────────
export { luxuryFashionTemplate } from './luxury-fashion'
export { restaurantTemplate } from './restaurant'
export { agencyProTemplate } from './agency-pro'
export { techSaasTemplate } from './tech-saas'
export { beautyWellnessTemplate } from './beauty-wellness'
export { fitnessGymTemplate } from './fitness-gym'
export { artisanCraftTemplate } from './artisan-craft'
export { electronicsCastTemplate } from './electronics-store'
export { freshGroceryTemplate } from './fresh-grocery-v2'
export { realEstateTemplate } from './real-estate'

import { elegantFashionTemplate } from './elegant-fashion'
import { modernTechTemplate } from './modern-tech'
import { freshOrganicTemplate } from './fresh-organic'
import { boldArtisanTemplate } from './bold-artisan'
import { sleekMinimalTemplate } from './sleek-minimal'
import { vibrantMarketTemplate } from './vibrant-market'
import { luxuryFashionTemplate } from './luxury-fashion'
import { restaurantTemplate } from './restaurant'
import { agencyProTemplate } from './agency-pro'
import { techSaasTemplate } from './tech-saas'
import { beautyWellnessTemplate } from './beauty-wellness'
import { fitnessGymTemplate } from './fitness-gym'
import { artisanCraftTemplate } from './artisan-craft'
import { electronicsCastTemplate } from './electronics-store'
import { freshGroceryTemplate } from './fresh-grocery-v2'
import { realEstateTemplate } from './real-estate'
import { WebsiteTemplate } from './types'

export const allTemplates: WebsiteTemplate[] = [
  // Original
  sleekMinimalTemplate,
  boldArtisanTemplate,
  vibrantMarketTemplate,
  elegantFashionTemplate,
  modernTechTemplate,
  freshOrganicTemplate,
  // New
  luxuryFashionTemplate,
  restaurantTemplate,
  agencyProTemplate,
  techSaasTemplate,
  beautyWellnessTemplate,
  fitnessGymTemplate,
  artisanCraftTemplate,
  electronicsCastTemplate,
  freshGroceryTemplate,
  realEstateTemplate,
]

export function getTemplateById(id: string): WebsiteTemplate | undefined {
  return allTemplates.find(t => t.id === id)
}
