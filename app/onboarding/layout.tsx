'use client'

import { OnboardingProvider } from './onboarding-context'

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </OnboardingProvider>
  )
}
