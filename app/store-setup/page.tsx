'use client'

import { useState } from 'react'
import { TemplateSelector } from '@/components/store-setup/template-selector'
import { BulkProductUpload } from '@/components/store-setup/bulk-product-upload'
import { PageCustomizer } from '@/components/store-setup/page-customizer'
import { AIContentGenerator } from '@/components/store-setup/ai-content-generator'
import { getTemplateById } from '@/lib/templates'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function StoreSetupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [setupData, setSetupData] = useState({
    templateId: '',
    businessName: 'My Store',
    businessCategory: 'Fashion & Apparel',
    products: [],
    pages: [],
    aiContent: null
  })

  const steps = [
    { number: 1, title: 'Choose Template', description: 'Select your website design' },
    { number: 2, title: 'Add Products', description: 'Upload your product catalog' },
    { number: 3, title: 'Customize Pages', description: 'Edit pages and content' },
    { number: 4, title: 'AI Enhancement', description: 'Generate professional content' },
    { number: 5, title: 'Review & Launch', description: 'Preview and go live' }
  ]
  //
  const currentTemplate = setupData.templateId ? getTemplateById(setupData.templateId) : null

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!setupData.templateId
      case 2:
        return setupData.products.length > 0
      case 3:
        return setupData.pages.length > 0
      default:
        return true
    }
  }

  const nextStep = () => {
    if (canProceed() && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progressPercentage = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Store Setup Wizard</h1>
              <p className="text-muted-foreground">Create your professional online store in minutes</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Step {currentStep} of {steps.length}</p>
              <p className="font-semibold">{steps[currentStep - 1].title}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={cn(
                    'flex-1 text-center transition-colors',
                    step.number < currentStep && 'text-primary',
                    step.number === currentStep && 'text-foreground font-semibold',
                    step.number > currentStep && 'text-muted-foreground'
                  )}
                >
                  <div className="flex items-center justify-center mb-1">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
                        step.number < currentStep && 'bg-primary text-primary-foreground',
                        step.number === currentStep && 'bg-primary text-primary-foreground ring-4 ring-primary/20',
                        step.number > currentStep && 'bg-muted text-muted-foreground'
                      )}
                    >
                      {step.number < currentStep ? <Check className="h-4 w-4" /> : step.number}
                    </div>
                  </div>
                  <p className="text-xs hidden md:block">{step.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {currentStep === 1 && (
            <TemplateSelector
              selectedTemplate={setupData.templateId}
              onSelect={(templateId) => setSetupData({ ...setupData, templateId })}
            />
          )}

          {currentStep === 2 && (
            <BulkProductUpload
              onProductsAdd={(products: any) => setSetupData({ ...setupData, products })}
            />
          )}

          {currentStep === 3 && currentTemplate && (
            <PageCustomizer
              template={currentTemplate}
              onComplete={(pages) => setSetupData({ ...setupData, pages })}
            />
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <AIContentGenerator
                businessName={setupData.businessName}
                businessCategory={setupData.businessCategory}
                onGenerate={(content) => setSetupData({ ...setupData, aiContent: content as any })}
              />
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  AI content generation helps create professional website copy automatically.
                </p>
                <Button variant="outline" onClick={nextStep}>
                  Skip for Now
                </Button>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center space-y-4 py-12">
                <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Your Store is Ready!</h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Review your setup and launch your store when ready. You can always customize more later.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-6 border rounded-lg text-center space-y-2">
                  <p className="text-3xl font-bold text-primary">{setupData.products.length}</p>
                  <p className="text-sm text-muted-foreground">Products Added</p>
                </div>
                <div className="p-6 border rounded-lg text-center space-y-2">
                  <p className="text-3xl font-bold text-primary">{setupData.pages.filter((p: any) => p.enabled).length}</p>
                  <p className="text-sm text-muted-foreground">Pages Enabled</p>
                </div>
                <div className="p-6 border rounded-lg text-center space-y-2">
                  <p className="text-3xl font-bold text-primary">{currentTemplate?.name}</p>
                  <p className="text-sm text-muted-foreground">Template Selected</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" size="lg">
                  Preview Store
                </Button>
                <Button className="flex-1" size="lg">
                  Launch Store
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      {currentStep < 5 && (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-card p-4">
          <div className="container mx-auto flex items-center justify-between max-w-5xl">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <p className="text-sm text-muted-foreground hidden md:block">
              {steps[currentStep - 1].description}
            </p>

            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="gap-2"
            >
              {currentStep === steps.length - 1 ? 'Review' : 'Next'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
