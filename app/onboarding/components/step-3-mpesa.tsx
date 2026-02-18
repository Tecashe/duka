'use client'

import { useState, useEffect } from 'react'
import { useOnboarding } from '../onboarding-context'
import { StepNavigation } from './step-navigation'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { AlertCircle, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Step3MPesa() {
  const { data, updateData, setCurrentStep } = useOnboarding()
  const [error, setError] = useState('')

  useEffect(() => {
    // Validate on change
    if (data.mpesaNumber) {
      const number = data.mpesaNumber.replace(/\D/g, '')
      if (number.length > 0 && number.length < 5) {
        setError('Number must be at least 5 digits')
      } else {
        setError('')
      }
    } else {
      setError('')
    }
  }, [data.mpesaNumber])

  const handleNumberChange = (value: string) => {
    // Only allow numbers
    const cleaned = value.replace(/\D/g, '')
    updateData({ mpesaNumber: cleaned, mpesaConfirmed: false })
  }

  const handleConfirm = () => {
    if (data.mpesaNumber.length >= 5) {
      updateData({ mpesaConfirmed: true })
    }
  }

  const canProceed = data.mpesaConfirmed

  const handleNext = () => {
    if (canProceed) {
      setCurrentStep(4)
    }
  }

  const helpText = data.mpesaType === 'till'
    ? "Your Till Number is 5–7 digits. Find it in your M-Pesa Merchant menu under 'My Account'."
    : "Your Paybill Number is 5–6 digits. It was assigned when you registered your business with Safaricom."

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-balance">
        Connect your M-Pesa account to receive payments from customers.
      </p>

      {/* M-Pesa Type Selection */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Payment Method</Label>
        <RadioGroup
          value={data.mpesaType}
          onValueChange={(value: 'till' | 'paybill') => {
            updateData({ mpesaType: value, mpesaNumber: '', mpesaConfirmed: false })
          }}
          className="grid grid-cols-2 gap-4"
        >
          <label
            htmlFor="till"
            className={cn(
              'flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-all',
              data.mpesaType === 'till'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            )}
          >
            <RadioGroupItem value="till" id="till" className="sr-only" />
            <span className="font-semibold text-base">Till Number</span>
            <span className="text-sm text-muted-foreground mt-1">For individuals</span>
          </label>

          <label
            htmlFor="paybill"
            className={cn(
              'flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-all',
              data.mpesaType === 'paybill'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            )}
          >
            <RadioGroupItem value="paybill" id="paybill" className="sr-only" />
            <span className="font-semibold text-base">Paybill Number</span>
            <span className="text-sm text-muted-foreground mt-1">For businesses</span>
          </label>
        </RadioGroup>
      </div>

      {/* Number Input */}
      <div className="space-y-2">
        <Label htmlFor="mpesaNumber" className="text-base font-medium">
          {data.mpesaType === 'till' ? 'Till Number' : 'Paybill Number'}{' '}
          <span className="text-destructive">*</span>
        </Label>
        <Input
          id="mpesaNumber"
          type="tel"
          inputMode="numeric"
          placeholder={data.mpesaType === 'till' ? 'e.g., 123456' : 'e.g., 54321'}
          value={data.mpesaNumber}
          onChange={(e) => handleNumberChange(e.target.value)}
          disabled={data.mpesaConfirmed}
          className="h-12 text-base font-mono text-lg"
        />

        {/* Help Text */}
        <p className="text-sm text-muted-foreground leading-relaxed">{helpText}</p>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Confirmation Box */}
      {data.mpesaNumber.length >= 5 && !data.mpesaConfirmed && !error && (
        <div className="p-5 bg-accent/10 border-2 border-accent rounded-lg space-y-4">
          <div className="space-y-2">
            <p className="font-medium text-foreground">Please confirm</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Payments from your buyers will be sent to{' '}
              <span className="font-semibold text-foreground">
                {data.mpesaType === 'till' ? 'Till' : 'Paybill'} {data.mpesaNumber}
              </span>
              . Please double-check this is correct — you can't change it without contacting support.
            </p>
          </div>
          <Button
            onClick={handleConfirm}
            className="w-full h-12 bg-primary hover:bg-primary/90"
          >
            Confirm & Continue
          </Button>
        </div>
      )}

      {/* Confirmed State */}
      {data.mpesaConfirmed && (
        <div className="p-5 bg-primary/10 border-2 border-primary rounded-lg">
          <div className="flex items-start gap-3">
            <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">M-Pesa Connected</p>
              <p className="text-sm text-muted-foreground">
                {data.mpesaType === 'till' ? 'Till' : 'Paybill'} {data.mpesaNumber} is ready to receive payments
              </p>
            </div>
          </div>
        </div>
      )}

      <StepNavigation onNext={handleNext} canProceed={canProceed} />
    </div>
  )
}
