'use client'

import { useOnboarding } from '../onboarding-context'
import { cn } from '@/lib/utils'

const stepTitles = [
  'Business Profile',
  'Choose Template',
  'Connect M-Pesa',
  'Activate Trial',
  'Add Product',
  'Store Live',
  'Get Started'
]

export function ProgressBar() {
  const { currentStep, totalSteps } = useOnboarding()

  return (
    <div className="w-full bg-card border-b border-border sticky top-0 z-10">
      <div className="mx-auto max-w-3xl px-4 py-6">
        {/* Step title */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground font-medium">
            Step {currentStep} of {totalSteps}
          </p>
          <h2 className="text-xl font-semibold text-foreground mt-1 text-balance">
            {stepTitles[currentStep - 1]}
          </h2>
        </div>

        {/* Progress segments */}
        <div className="flex gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isCurrent = stepNumber === currentStep
            
            return (
              <div
                key={stepNumber}
                className={cn(
                  'h-2 flex-1 rounded-full transition-all duration-300',
                  isCompleted && 'bg-primary',
                  isCurrent && 'bg-primary',
                  !isCompleted && !isCurrent && 'bg-muted'
                )}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
