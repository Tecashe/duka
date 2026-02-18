'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface OnboardingData {
  // Step 1: Business Profile
  businessName: string
  businessSlug: string
  businessCategory: string
  businessDescription: string
  
  // Step 2: Template
  selectedTemplate: 'minimal' | 'bold' | 'vibrant' | null
  
  // Step 3: M-Pesa
  mpesaType: 'till' | 'paybill'
  mpesaNumber: string
  mpesaConfirmed: boolean
  
  // Step 4: Trial Activation
  trialActivated: boolean
  paymentReference: string
  
  // Step 5: First Product
  productPhoto: string | null
  productName: string
  productPrice: string
  productDescription: string
  productStock: number
  
  // Step 6: Complete
  storeUrl: string
}

interface OnboardingContextType {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 7
  
  const [data, setData] = useState<OnboardingData>({
    businessName: '',
    businessSlug: '',
    businessCategory: '',
    businessDescription: '',
    selectedTemplate: null,
    mpesaType: 'till',
    mpesaNumber: '',
    mpesaConfirmed: false,
    trialActivated: false,
    paymentReference: 'ACT-38472',
    productPhoto: null,
    productName: '',
    productPrice: '',
    productDescription: '',
    productStock: 1,
    storeUrl: '',
  })

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }

  return (
    <OnboardingContext.Provider 
      value={{ data, updateData, currentStep, setCurrentStep, totalSteps }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error('useOnboarding must be used within OnboardingProvider')
  }
  return context
}
