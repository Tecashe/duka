'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MinimalTemplate } from './templates/MinimalTemplate'
import { BoldTemplate } from './templates/BoldTemplate'
import { VibrantTemplate } from './templates/VibrantTemplate'
import { Store, Template } from '@/lib/stores'
import { Check, Maximize2 } from 'lucide-react'

interface TemplatePreviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentTemplate: Template
  onApply: (template: Template) => void
  storeData: Store
}

export function TemplatePreviewModal({
  open,
  onOpenChange,
  currentTemplate,
  onApply,
  storeData
}: TemplatePreviewModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(currentTemplate)
  const [fullPreviewTemplate, setFullPreviewTemplate] = useState<Template | null>(null)

  const templates: Array<{ id: Template; name: string; description: string }> = [
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean, editorial design with no clutter'
    },
    {
      id: 'bold',
      name: 'Bold',
      description: 'High-energy design with strong contrast'
    },
    {
      id: 'vibrant',
      name: 'Vibrant',
      description: 'Warm, inviting design with playful colors'
    }
  ]

  const renderTemplate = (template: Template) => {
    const store: Store = { ...storeData, template }
    switch (template) {
      case 'minimal':
        return <MinimalTemplate store={store} />
      case 'bold':
        return <BoldTemplate store={store} />
      case 'vibrant':
        return <VibrantTemplate store={store} />
    }
  }

  const handleApply = () => {
    onApply(selectedTemplate)
    onOpenChange(false)
  }

  if (fullPreviewTemplate) {
    return (
      <Dialog open={true} onOpenChange={() => setFullPreviewTemplate(null)}>
        <DialogContent className="max-w-[95vw] h-[95vh] p-0">
          <div className="absolute top-4 right-16 z-50">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setFullPreviewTemplate(null)}
            >
              Close Preview
            </Button>
          </div>
          <div className="w-full h-full overflow-auto">
            {renderTemplate(fullPreviewTemplate)}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Your Store Template</DialogTitle>
          <DialogDescription>
            Click a template to preview it full-screen with your actual store data
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 sm:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`group relative cursor-pointer rounded-lg border-2 transition-all ${
                selectedTemplate === template.id
                  ? 'border-primary shadow-lg'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              {/* Mini Preview */}
              <div className="overflow-hidden rounded-t-lg border-b bg-gray-50">
                <div
                  className="origin-top-left scale-[0.15] w-[600px] h-[400px] pointer-events-none"
                  style={{ transformOrigin: '0 0', width: '600px' }}
                >
                  {renderTemplate(template.id)}
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      {template.name}
                      {currentTemplate === template.id && (
                        <Badge variant="secondary" className="text-xs">
                          Current
                        </Badge>
                      )}
                      {selectedTemplate === template.id && selectedTemplate !== currentTemplate && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {template.description}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFullPreviewTemplate(template.id)
                  }}
                >
                  <Maximize2 className="w-4 h-4" />
                  Preview Full Size
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            disabled={selectedTemplate === currentTemplate}
          >
            {selectedTemplate === currentTemplate ? 'Already Applied' : 'Apply Template'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
