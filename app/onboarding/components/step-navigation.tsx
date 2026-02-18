'use client'

import { useOnboarding } from '../onboarding-context'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepNavigationProps {
  onNext: () => void
  canProceed: boolean
  isLastStep?: boolean
  nextLabel?: string
  hideBack?: boolean
}

export function StepNavigation({
  onNext,
  canProceed,
  isLastStep = false,
  nextLabel = 'Save & Continue',
  hideBack = false
}: StepNavigationProps) {
  const { currentStep, setCurrentStep } = useOnboarding()

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 pt-6 border-t border-border mt-8">
      {!hideBack && currentStep > 1 ? (
        <Button
          variant="ghost"
          onClick={handleBack}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
      ) : (
        <div />
      )}

      <Button
        onClick={onNext}
        disabled={!canProceed}
        size="lg"
        className={cn(
          'px-8',
          isLastStep && 'bg-accent hover:bg-accent/90 text-accent-foreground'
        )}
      >
        {nextLabel}
      </Button>
    </div>
  )
}
