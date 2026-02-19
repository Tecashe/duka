'use client'

import { useState, useEffect } from 'react'
import { useOnboarding } from '../onboarding-context'
import { completeOnboarding } from '@/lib/actions/onboarding'
import { Button } from '@/components/ui/button'
import { Check, Copy, Share2, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function Step6Live() {
  const { data } = useOnboarding()
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [isSaving, setIsSaving] = useState(true)
  const [saveError, setSaveError] = useState('')

  const storeUrl = data.storeUrl || `https://duka-my.vercel.app/store/${data.businessSlug}`

  useEffect(() => {
    // Savestore to database
    async function saveStore() {
      console.log('[v0] Client: Starting saveStore...')
      try {
        console.log('[v0] Client: Calling completeOnboarding...')
        const result = await completeOnboarding({
          businessName: data.businessName,
          businessSlug: data.businessSlug,
          businessCategory: data.businessCategory,
          businessDescription: data.businessDescription,
          selectedTemplate: data.selectedTemplate || 'vibrant',
          mpesaType: data.mpesaType,
          mpesaNumber: data.mpesaNumber,
          productName: data.productName,
          productPrice: parseFloat(data.productPrice),
          productDescription: data.productDescription,
          productStock: data.productStock,
          productPhoto: data.productPhoto
        })

        if (!result.success) {
          setSaveError(result.error || 'Failed to save store')
          setIsSaving(false)
          return
        }

        // Success! Show animation
        console.log('[v0] Client: Store saved successfully!')
        setIsSaving(false)
        setShowAnimation(true)
      } catch (error) {
        console.error('[v0] Save store error:', error)
        setSaveError('Network error. Please refresh and try again.')
        setIsSaving(false)
      }
    }

    saveStore()
  }, [])

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(storeUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(`Check out my store: ${storeUrl}`)
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }

  const handleGoToDashboard = () => {
    router.push('/dashboard')
  }

  if (isSaving) {
    return (
      <div className="text-center space-y-6 py-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-balance">Setting up your store...</h1>
          <p className="text-muted-foreground">This will only take a moment</p>
        </div>
      </div>
    )
  }

  if (saveError) {
    return (
      <div className="text-center space-y-6 py-12">
        <div className="h-24 w-24 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
          <span className="text-4xl">⚠️</span>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-balance">Something went wrong</h1>
          <p className="text-muted-foreground">{saveError}</p>
        </div>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Celebration */}
      <div className="text-center space-y-6 py-8">
        <div
          className={`h-24 w-24 bg-primary rounded-full flex items-center justify-center mx-auto transition-all duration-700 ${showAnimation ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
            }`}
        >
          <Check className="h-12 w-12 text-primary-foreground" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Your store is live!</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Start sharing your link and get your first orders
          </p>
        </div>
      </div>

      {/* Store URL */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-foreground">Your Store Link</Label>
        <div className="p-4 bg-primary/10 border-2 border-primary rounded-lg">
          <p className="text-lg font-mono font-semibold text-primary text-center break-all">
            {data.storeUrl}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleCopyLink}
            variant="outline"
            size="lg"
            className="h-12 gap-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Link
              </>
            )}
          </Button>
          <Button
            onClick={handleWhatsAppShare}
            size="lg"
            className="h-12 gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white"
          >
            <Share2 className="h-4 w-4" />
            Share on WhatsApp
          </Button>
        </div>
      </div>

      {/* Product Preview */}
      {data.productPhoto && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Your first product:</p>
          <div className="p-5 bg-card rounded-lg border-2 border-border">
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                <Image
                  src={data.productPhoto}
                  alt={data.productName}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-lg">{data.productName}</p>
                <p className="text-2xl font-bold text-primary mt-2">
                  KES {parseInt(data.productPrice).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* What Happens Next */}
      <div className="space-y-4 p-5 bg-secondary/50 rounded-lg border border-border">
        <p className="font-semibold text-foreground">What happens next</p>
        <ul className="space-y-3">
          {[
            'Orders appear in your dashboard instantly',
            'You&apos;ll get an email for every new order',
            'Your trial lasts 14 days — no charges until Day 15'
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA to Dashboard */}
      <Button
        onClick={handleGoToDashboard}
        size="lg"
        className="w-full h-14 text-lg font-semibold gap-2"
      >
        Go to My Dashboard
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </Button>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={className}>{children}</p>
}
