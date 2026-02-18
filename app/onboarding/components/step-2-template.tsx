'use client'

import { useState } from 'react'
import { useOnboarding } from '../onboarding-context'
import { StepNavigation } from './step-navigation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const templates = [
  {
    id: 'minimal' as const,
    name: 'Minimal',
    tagline: 'Clean white design with thin fonts',
    colors: { header: '#ffffff', accent: '#f5f5f5', text: '#1a1a1a' }
  },
  {
    id: 'bold' as const,
    name: 'Bold',
    tagline: 'Dark header with large product images',
    colors: { header: '#1a1a1a', accent: '#2a2a2a', text: '#ffffff' }
  },
  {
    id: 'vibrant' as const,
    name: 'Vibrant',
    tagline: 'Colorful with rounded corners',
    colors: { header: '#1a6b3c', accent: '#f5a623', text: '#ffffff' }
  }
]

export function Step2Template() {
  const { data, updateData, setCurrentStep } = useOnboarding()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewTemplate, setPreviewTemplate] = useState<typeof templates[0] | null>(null)

  const canProceed = data.selectedTemplate !== null

  const handleNext = () => {
    if (canProceed) {
      setCurrentStep(3)
    }
  }

  const handlePreview = (template: typeof templates[0]) => {
    setPreviewTemplate(template)
    setPreviewOpen(true)
  }

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-balance">
        Choose a design that fits your brand. You can customize it later.
      </p>

      {/* Template Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {templates.map((template) => {
          const isSelected = data.selectedTemplate === template.id

          return (
            <div key={template.id} className="space-y-3">
              <button
                onClick={() => updateData({ selectedTemplate: template.id })}
                className={cn(
                  'w-full aspect-[3/4] rounded-lg border-2 transition-all overflow-hidden relative group',
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/50'
                )}
              >
                {/* Template Preview Mockup */}
                <div className="w-full h-full flex flex-col">
                  <div 
                    className="h-1/4 border-b"
                    style={{ backgroundColor: template.colors.header }}
                  >
                    <div className="p-3 flex items-center justify-between">
                      <div 
                        className="h-2 w-16 rounded"
                        style={{ backgroundColor: template.colors.text, opacity: 0.3 }}
                      />
                      <div 
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: template.colors.text, opacity: 0.3 }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 p-3 bg-background">
                    <div className="grid grid-cols-2 gap-2 h-full">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="rounded overflow-hidden">
                          <div 
                            className="aspect-square rounded"
                            style={{ backgroundColor: template.colors.accent }}
                          />
                          <div className="h-1.5 w-3/4 bg-muted rounded mt-1.5" />
                          <div className="h-1 w-1/2 bg-muted rounded mt-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 h-6 w-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}

                {/* Preview Button Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePreview(template)
                    }}
                    className="pointer-events-auto"
                  >
                    Preview
                  </Button>
                </div>
              </button>

              <div className="text-center">
                <p className="font-semibold text-foreground">{template.name}</p>
                <p className="text-sm text-muted-foreground text-balance">
                  {template.tagline}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Template Display */}
      {data.selectedTemplate && (
        <div className="p-4 bg-secondary/50 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">
            Selected:{' '}
            <span className="font-semibold text-foreground">
              {templates.find((t) => t.id === data.selectedTemplate)?.name}
            </span>
          </p>
        </div>
      )}

      <StepNavigation onNext={handleNext} canProceed={canProceed} />

      {/* Preview Modal */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{previewTemplate?.name} Template</DialogTitle>
          </DialogHeader>
          {previewTemplate && (
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-lg border overflow-hidden">
                <div className="w-full h-full flex flex-col">
                  <div 
                    className="h-1/4 border-b flex items-center justify-between px-6"
                    style={{ backgroundColor: previewTemplate.colors.header }}
                  >
                    <div 
                      className="h-4 rounded px-4 flex items-center justify-center font-semibold text-sm"
                      style={{ 
                        backgroundColor: previewTemplate.colors.text, 
                        color: previewTemplate.colors.header,
                        opacity: 0.9
                      }}
                    >
                      {data.businessName || 'Your Store'}
                    </div>
                    <div 
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: previewTemplate.colors.text, opacity: 0.3 }}
                    />
                  </div>
                  <div className="flex-1 p-6 bg-background">
                    <div className="grid grid-cols-2 gap-4 h-full">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="space-y-2">
                          <div 
                            className="aspect-square rounded-lg"
                            style={{ backgroundColor: previewTemplate.colors.accent }}
                          />
                          <div className="h-3 w-3/4 bg-muted rounded" />
                          <div className="h-2 w-1/2 bg-muted rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                This is how your store will look with the {previewTemplate.name} template
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
