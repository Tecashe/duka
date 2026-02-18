'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { Copy, Check, MessageCircle, Loader2 } from 'lucide-react'
import { StoreHeader } from '@/components/store/store-header'
import { StoreFooter } from '@/components/store/store-footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { formatKES, storeInfo } from '@/lib/products'

export default function PaymentPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const orderRef = params.ref as string
  const total = parseInt(searchParams.get('total') || '0')
  
  const [copied, setCopied] = useState<string | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [waitingTime, setWaitingTime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setWaitingTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleCheckPayment = async () => {
    setIsChecking(true)
    
    // Simulate payment verification (3 seconds)
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Navigate to confirmation page
    router.push(`/store/order/${orderRef}/confirmed`)
  }

  const whatsappLink = `https://wa.me/${storeInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hi, I need help with order ${orderRef}`

  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Order Reference */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Order Reference</p>
            <h1 className="text-2xl md:text-3xl font-bold font-mono">
              {orderRef}
            </h1>
          </div>

          {/* Payment Instructions Card */}
          <Card className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2">
            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                {formatKES(total)}
              </h2>
              <p className="text-muted-foreground">Amount to send via M-Pesa</p>
            </div>

            <div className="space-y-4">
              {/* Till Number */}
              <div className="bg-background rounded-lg p-4 space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Till Number
                </label>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-2xl font-bold font-mono">
                    {storeInfo.tillNumber}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopy(storeInfo.tillNumber, 'till')}
                  >
                    {copied === 'till' ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Reference */}
              <div className="bg-background rounded-lg p-4 space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Reference / Account
                </label>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xl font-bold font-mono break-all">
                    {orderRef}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex-shrink-0"
                    onClick={() => handleCopy(orderRef, 'ref')}
                  >
                    {copied === 'ref' ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Step by Step Instructions */}
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-lg">How to Pay with M-Pesa</h3>
            
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span className="pt-0.5">Open M-Pesa on your phone</span>
              </li>
              
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <span className="pt-0.5">Select "Lipa na M-Pesa"</span>
              </li>
              
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <span className="pt-0.5">Select "Buy Goods & Services" (Till)</span>
              </li>
              
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <div className="space-y-1 pt-0.5">
                  <div>Enter Till Number: <strong className="font-mono">{storeInfo.tillNumber}</strong></div>
                </div>
              </li>
              
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  5
                </span>
                <div className="space-y-1 pt-0.5">
                  <div>Enter Amount: <strong>{formatKES(total)}</strong></div>
                </div>
              </li>
              
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  6
                </span>
                <div className="space-y-1 pt-0.5">
                  <div>Enter Reference: <strong className="font-mono">{orderRef}</strong></div>
                </div>
              </li>
              
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  7
                </span>
                <span className="pt-0.5">Enter your M-Pesa PIN and confirm</span>
              </li>
            </ol>
          </Card>

          {/* Waiting State */}
          <Card className="p-6 space-y-4 text-center">
            <div className="flex justify-center">
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '200ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '400ms' }}></span>
              </div>
            </div>
            
            <p className="text-muted-foreground">
              Waiting for your payment... We'll confirm automatically
            </p>

            <Button
              size="lg"
              className="w-full"
              onClick={handleCheckPayment}
              disabled={isChecking}
            >
              {isChecking ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Checking payment...
                </>
              ) : (
                <>I've paid — check now</>
              )}
            </Button>

            {waitingTime >= 30 && (
              <div className="pt-4 space-y-3">
                <p className="text-sm text-muted-foreground">
                  Taking longer than usual? Make sure you used reference{' '}
                  <strong className="font-mono">{orderRef}</strong>
                </p>
                
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Need help? WhatsApp the seller
                  </a>
                </Button>
              </div>
            )}
          </Card>
        </div>
      </main>

      <StoreFooter />
    </div>
  )
}
