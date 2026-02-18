'use client'

import { useState, useRef } from 'react'
import { useOnboarding } from '../onboarding-context'
import { StepNavigation } from './step-navigation'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Camera, Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function Step5Product() {
  const { data, updateData, setCurrentStep } = useOnboarding()
  const [isOptimizing, setIsOptimizing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create preview URL
    const reader = new FileReader()
    reader.onloadend = () => {
      setIsOptimizing(true)
      
      // Simulate image optimization
      setTimeout(() => {
        updateData({ productPhoto: reader.result as string })
        setIsOptimizing(false)
      }, 1000)
    }
    reader.readAsDataURL(file)
  }

  const canProceed = 
    data.productPhoto !== null &&
    data.productName.trim() !== '' &&
    data.productPrice.trim() !== '' &&
    parseInt(data.productPrice) > 0

  const handleNext = () => {
    if (canProceed) {
      setCurrentStep(6)
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-balance">
        Add your first product so customers can start buying right away.
      </p>

      {/* Photo Upload */}
      <div className="space-y-2">
        <Label className="text-base font-medium">
          Product Photo <span className="text-destructive">*</span>
        </Label>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="sr-only"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isOptimizing}
          className={cn(
            'w-full aspect-square max-h-80 rounded-lg border-2 border-dashed transition-all overflow-hidden relative',
            data.productPhoto
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 hover:bg-muted/50'
          )}
        >
          {isOptimizing ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Optimising image...</p>
            </div>
          ) : data.productPhoto ? (
            <>
              <Image
                src={data.productPhoto}
                alt="Product preview"
                fill
                className="object-cover"
              />
              <div className="absolute top-3 right-3 h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <Check className="h-5 w-5 text-primary-foreground" />
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <Camera className="h-8 w-8" />
              </div>
              <p className="text-base font-medium">Tap to add a photo</p>
              <p className="text-sm">JPG, PNG, or WEBP</p>
            </div>
          )}
        </button>

        {data.productPhoto && !isOptimizing && (
          <div className="flex items-center gap-1.5 text-sm text-primary">
            <Check className="h-3.5 w-3.5" />
            <span>Image optimised</span>
          </div>
        )}
      </div>

      {/* Product Name */}
      <div className="space-y-2">
        <Label htmlFor="productName" className="text-base font-medium">
          Product Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="productName"
          type="text"
          placeholder="e.g., Blue Denim Jacket"
          value={data.productName}
          onChange={(e) => updateData({ productName: e.target.value })}
          className="h-12 text-base"
        />
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label htmlFor="productPrice" className="text-base font-medium">
          Price <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-semibold text-muted-foreground">
            KES
          </span>
          <Input
            id="productPrice"
            type="number"
            inputMode="numeric"
            placeholder="1500"
            value={data.productPrice}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '')
              updateData({ productPrice: value })
            }}
            className="h-12 text-base pl-16 font-mono"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="productDescription" className="text-base font-medium">
          Description <span className="text-muted-foreground text-sm font-normal">(Optional)</span>
        </Label>
        <Textarea
          id="productDescription"
          placeholder="Tell buyers what makes this product special"
          value={data.productDescription}
          onChange={(e) => updateData({ productDescription: e.target.value })}
          className="min-h-24 text-base resize-none"
        />
      </div>

      {/* Stock Quantity */}
      <div className="space-y-2">
        <Label htmlFor="productStock" className="text-base font-medium">
          Stock Quantity
        </Label>
        <Input
          id="productStock"
          type="number"
          inputMode="numeric"
          min="1"
          value={data.productStock}
          onChange={(e) => {
            const value = parseInt(e.target.value) || 1
            updateData({ productStock: Math.max(1, value) })
          }}
          className="h-12 text-base font-mono"
        />
      </div>

      {/* Product Preview */}
      {canProceed && (
        <div className="p-5 bg-secondary/50 rounded-lg border border-border space-y-3">
          <p className="text-sm font-medium text-foreground">Preview on your store:</p>
          <div className="flex gap-4 p-4 bg-card rounded-lg border border-border">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
              {data.productPhoto && (
                <Image
                  src={data.productPhoto}
                  alt={data.productName}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">{data.productName}</p>
              <p className="text-lg font-bold text-primary mt-1">
                KES {parseInt(data.productPrice).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {data.productStock} in stock
              </p>
            </div>
          </div>
        </div>
      )}

      <StepNavigation onNext={handleNext} canProceed={canProceed} />
    </div>
  )
}
