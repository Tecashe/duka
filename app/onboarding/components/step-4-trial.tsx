'use client'

import { useState } from 'react'
import { useOnboarding } from '../onboarding-context'
import { StepNavigation } from './step-navigation'
import { Button } from '@/components/ui/button'
import { Loader2, Check, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Step4Trial() {
  const { data, updateData, setCurrentStep } = useOnboarding()
  const [isChecking, setIsChecking] = useState(false)
  const [showTimeout, setShowTimeout] = useState(false)

  const handlePaymentSent = async () => {
    setIsChecking(true)
    setShowTimeout(false)

    // Simulate payment verification
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsChecking(false)
    updateData({ trialActivated: true })

    // Auto-advance after showing success
    setTimeout(() => {
      setCurrentStep(5)
    }, 2000)
  }

  const handleSimulateTimeout = () => {
    setShowTimeout(true)
    setIsChecking(false)
  }

  const canProceed = data.trialActivated

  const handleNext = () => {
    if (canProceed) {
      setCurrentStep(5)
    }
  }

  if (data.trialActivated) {
    return (
      <div className="space-y-6">
        {/* Success State */}
        <div className="py-12 text-center space-y-4">
          <div className="h-20 w-20 bg-primary rounded-full flex items-center justify-center mx-auto animate-in zoom-in duration-500">
            <Check className="h-10 w-10 text-primary-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-foreground">Payment confirmed!</h3>
            <p className="text-muted-foreground text-balance">
              Your 14-day trial is now active. Advancing to next step...
            </p>
          </div>
        </div>

        <StepNavigation onNext={handleNext} canProceed={canProceed} nextLabel="Continue" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-foreground text-balance leading-relaxed">
          To activate your <span className="font-semibold">14-day free trial</span>, send KES 200 via M-Pesa. 
          This confirms your payment details and starts your trial — no charges until Day 15.
        </p>
      </div>

      {/* Payment Instructions Card */}
      <div className="border-2 border-primary rounded-lg overflow-hidden">
        <div className="bg-primary/10 px-5 py-3 border-b border-primary/20">
          <p className="font-semibold text-foreground">Payment Instructions</p>
        </div>
        <div className="p-5 space-y-4">
          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Amount:</span>
              <span className="text-2xl font-bold text-foreground">KES 200</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Paybill:</span>
              <span className="text-xl font-mono font-semibold text-foreground">522522</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Account/Reference:</span>
              <span className="text-xl font-mono font-semibold text-primary">
                {data.paymentReference}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-step Guide */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">How to pay:</p>
        <ol className="space-y-2.5">
          {[
            'Open M-Pesa on your phone',
            'Select Lipa na M-Pesa → Paybill',
            'Enter the Paybill and Account numbers above',
            'Enter KES 200 and your M-Pesa PIN',
            'Confirm and send'
          ].map((step, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-semibold text-primary">{index + 1}</span>
              </div>
              <span className="text-sm text-muted-foreground leading-relaxed pt-0.5">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Payment Sent Button */}
      {!isChecking && !showTimeout && (
        <Button
          onClick={handlePaymentSent}
          size="lg"
          className="w-full h-12"
        >
          I've sent the payment
        </Button>
      )}

      {/* Checking State */}
      {isChecking && (
        <div className="p-6 bg-secondary/50 rounded-lg border border-border">
          <div className="flex flex-col items-center gap-4 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <div className="space-y-1">
              <p className="font-medium text-foreground">Checking payment...</p>
              <p className="text-sm text-muted-foreground">
                This usually takes 10–30 seconds
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Timeout State */}
      {showTimeout && (
        <div className="p-5 bg-destructive/10 border-2 border-destructive rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-medium text-foreground">Payment not detected yet</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Check your M-Pesa messages to confirm the payment went through. 
                If you sent it, please try again in a moment, or contact support if the issue persists.
              </p>
              <Button
                onClick={handlePaymentSent}
                size="sm"
                variant="outline"
                className="mt-3"
              >
                Check Again
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Demo timeout link */}
      {!isChecking && !showTimeout && (
        <button
          onClick={handleSimulateTimeout}
          className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
        >
          Simulate Timeout (Demo)
        </button>
      )}

      <StepNavigation onNext={handleNext} canProceed={canProceed} />
    </div>
  )
}
