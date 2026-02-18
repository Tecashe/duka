import { WebsiteTemplate, TemplatePage } from '@/lib/templates/types'
import { SectionRenderer } from './section-renderer'

interface TemplatePageProps {
  template: WebsiteTemplate
  page: TemplatePage
  storeData: {
    name: string
    products: any[]
  }
}
//
export function TemplatePageRenderer({ template, page, storeData }: TemplatePageProps) {
  return (
    <div style={{ fontFamily: template.typography.bodyFont }}>
      {/* Render all enabled sections */}
      {page.sections
        .filter((section) => section.enabled)
        .map((section) => (
          <SectionRenderer
            key={section.id}
            section={section}
            templateColors={template.colors}
          />
        ))}
    </div>
  )
}
