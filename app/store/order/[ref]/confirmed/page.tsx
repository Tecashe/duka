'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Check, MessageCircle, Package, Truck, CheckCircle2 } from 'lucide-react'
import { StoreHeader } from '@/components/store/store-header'
import { StoreFooter } from '@/components/store/store-footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useCart } from '@/contexts/cart-context'
import { formatKES, storeInfo } from '@/lib/products'

export default function OrderConfirmedPage() {
  const params = useParams()
  const { items, subtotal, clearCart } = useCart()
  const orderRef = params.ref as string

  // Clear cart on mount (order is complete)
  useEffect(() => {
    // Give a small delay for better UX
    const timer = setTimeout(() => {
      clearCart()
    }, 1000)

    return () => clearTimeout(timer)
  }, [clearCart])

  const deliveryFee = 200
  const total = subtotal + deliveryFee

  const whatsappLink = `https://wa.me/${storeInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hi, I have a question about order ${orderRef}`

  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Success Animation */}
          <div className="text-center space-y-4">
            <div className="inline-flex">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-in zoom-in-50 duration-500">
                <Check className="w-10 h-10 text-primary animate-in zoom-in-75 duration-700 delay-200" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">
                Order Confirmed!
              </h1>
              <p className="text-lg text-muted-foreground">
                Thank you! Your order has been received.
              </p>
            </div>

            <div className="inline-block">
              <p className="text-sm text-muted-foreground">Order Reference</p>
              <p className="text-xl font-bold font-mono">{orderRef}</p>
            </div>
          </div>

          {/* Order Summary */}
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold">What You Ordered</h2>
            
            <div className="space-y-3 py-4 border-t">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatKES(product.price)} × {quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {formatKES(product.price * quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 py-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatKES(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-medium">{formatKES(deliveryFee)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="font-bold text-lg">Total Paid</span>
              <span className="font-bold text-2xl text-primary">
                {formatKES(total)}
              </span>
            </div>
          </Card>

          {/* What Happens Next */}
          <Card className="p-6 space-y-6">
            <h2 className="text-xl font-bold">What Happens Next</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-semibold mb-1">Seller Confirms Payment</h3>
                  <p className="text-sm text-muted-foreground">
                    {storeInfo.name} will verify your M-Pesa payment
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Package className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-semibold mb-1">Order Preparation</h3>
                  <p className="text-sm text-muted-foreground">
                    Your items will be carefully prepared and packaged
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Truck className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-semibold mb-1">Dispatched for Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll be contacted when your order is on the way
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm">
                <strong>Note:</strong> The seller will contact you on{' '}
                <span className="font-mono">your provided phone number</span> to confirm
                delivery details.
              </p>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="flex-1" asChild>
              <Link href="/store">Continue Shopping</Link>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              asChild
            >
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Questions? WhatsApp Seller
              </a>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center text-sm text-muted-foreground space-y-1">
            <p>Keep your order reference for tracking: <strong className="font-mono">{orderRef}</strong></p>
            <p>You'll receive updates via SMS on your registered phone number</p>
          </div>
        </div>
      </main>

      <StoreFooter />
    </div>
  )
}
