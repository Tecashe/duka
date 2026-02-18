export * from './types'
export { elegantFashionTemplate } from './elegant-fashion'
export { modernTechTemplate } from './modern-tech'
export { freshOrganicTemplate } from './fresh-organic'
export { boldArtisanTemplate } from './bold-artisan'
export { sleekMinimalTemplate } from './sleek-minimal'
export { vibrantMarketTemplate } from './vibrant-market'

import { elegantFashionTemplate } from './elegant-fashion'
import { modernTechTemplate } from './modern-tech'
import { freshOrganicTemplate } from './fresh-organic'
import { boldArtisanTemplate } from './bold-artisan'
import { sleekMinimalTemplate } from './sleek-minimal'
import { vibrantMarketTemplate } from './vibrant-market'
import { WebsiteTemplate } from './types'

export const allTemplates: WebsiteTemplate[] = [
  elegantFashionTemplate,
  modernTechTemplate,
  freshOrganicTemplate,
  boldArtisanTemplate,
  sleekMinimalTemplate,
  vibrantMarketTemplate,
]

export function getTemplateById(id: string): WebsiteTemplate | undefined {
  return allTemplates.find(t => t.id === id)
}
