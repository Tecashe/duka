'use client'

import { useOnboarding } from './onboarding-context'
import { ProgressBar } from './components/progress-bar'
import { Step1BusinessProfile } from './components/step-1-business-profile'
import { Step2Template } from './components/step-2-template'
import { Step3MPesa } from './components/step-3-mpesa'
import { Step4Trial } from './components/step-4-trial'
import { Step5Product } from './components/step-5-product'
import { Step6Live } from './components/step-6-live'

export default function OnboardingPage() {
  const { currentStep } = useOnboarding()

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BusinessProfile />
      case 2:
        return <Step2Template />
      case 3:
        return <Step3MPesa />
      case 4:
        return <Step4Trial />
      case 5:
        return <Step5Product />
      case 6:
        return <Step6Live />
      default:
        return <Step1BusinessProfile />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <ProgressBar />
      
      <main className="mx-auto max-w-3xl px-4 py-8 md:py-12">
        <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm">
          {renderStep()}
        </div>
      </main>
    </div>
  )
}
