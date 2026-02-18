'use client'

import { useState } from 'react'
import { allTemplates, WebsiteTemplate } from '@/lib/templates'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Check, Eye, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TemplateSelectorProps {
  selectedTemplate?: string
  onSelect: (templateId: string) => void
}

export function TemplateSelector({ selectedTemplate, onSelect }: TemplateSelectorProps) {
  const [previewTemplate, setPreviewTemplate] = useState<WebsiteTemplate | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Choose Your Website Template</h2>
        <p className="text-muted-foreground">
          Select a professionally designed template that matches your brand. You can customize everything later.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allTemplates.map((template) => (
          <div
            key={template.id}
            className={cn(
              'group relative border-2 rounded-xl overflow-hidden transition-all hover:shadow-lg',
              selectedTemplate === template.id
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-border hover:border-primary/50'
            )}
          >
            {/* Template Preview Image */}
            <div className="relative aspect-[4/3] bg-muted">
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${template.colors.primary} 0%, ${template.colors.accent} 100%)`
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2 text-white">
                  <Palette className="h-12 w-12 mx-auto opacity-90" />
                  <p className="font-semibold text-lg">{template.name}</p>
                  <p className="text-sm opacity-90">{template.category}</p>
                </div>
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setPreviewTemplate(template)}
                  className="gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  onClick={() => onSelect(template.id)}
                  className="gap-2"
                >
                  {selectedTemplate === template.id ? (
                    <>
                      <Check className="h-4 w-4" />
                      Selected
                    </>
                  ) : (
                    'Select'
                  )}
                </Button>
              </div>

              {/* Selected Badge */}
              {selectedTemplate === template.id && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary text-primary-foreground gap-1">
                    <Check className="h-3 w-3" />
                    Selected
                  </Badge>
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="p-4 bg-card space-y-3">
              <div>
                <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {template.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Colors:</span>
                <div className="flex gap-1">
                  {[template.colors.primary, template.colors.accent, template.colors.secondary].map((color, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                {template.pages.filter(p => p.enabled).length} pages included
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          {previewTemplate && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{previewTemplate.name}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <p className="text-muted-foreground">{previewTemplate.description}</p>

                {/* Color Palette */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Color Palette</h3>
                  <div className="flex gap-3">
                    <div className="space-y-1">
                      <div
                        className="w-16 h-16 rounded-lg border"
                        style={{ backgroundColor: previewTemplate.colors.primary }}
                      />
                      <p className="text-xs text-center text-muted-foreground">Primary</p>
                    </div>
                    <div className="space-y-1">
                      <div
                        className="w-16 h-16 rounded-lg border"
                        style={{ backgroundColor: previewTemplate.colors.accent }}
                      />
                      <p className="text-xs text-center text-muted-foreground">Accent</p>
                    </div>
                    <div className="space-y-1">
                      <div
                        className="w-16 h-16 rounded-lg border"
                        style={{ backgroundColor: previewTemplate.colors.secondary }}
                      />
                      <p className="text-xs text-center text-muted-foreground">Secondary</p>
                    </div>
                  </div>
                </div>

                {/* Pages Included */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Pages Included</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {previewTemplate.pages.map((page) => (
                      <div
                        key={page.id}
                        className={cn(
                          'p-3 rounded-lg border text-sm',
                          page.enabled ? 'bg-card' : 'bg-muted opacity-50'
                        )}
                      >
                        <p className="font-medium">{page.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {page.sections.length} sections
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Sections */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Sample Sections</h3>
                  <div className="space-y-3">
                    {previewTemplate.pages[0]?.sections.slice(0, 3).map((section) => (
                      <div key={section.id} className="p-4 border rounded-lg bg-card">
                        <p className="font-medium mb-1">{section.title}</p>
                        {section.content.heading && (
                          <p className="text-sm text-muted-foreground">
                            {section.content.heading}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => {
                      onSelect(previewTemplate.id)
                      setPreviewTemplate(null)
                    }}
                    className="flex-1"
                  >
                    Select This Template
                  </Button>
                  <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
