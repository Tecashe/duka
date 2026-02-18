'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Truck, Store, ChevronDown, ChevronUp } from 'lucide-react'
import { StoreHeader } from '@/components/store/store-header'
import { StoreFooter } from '@/components/store/store-footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { formatKES, storeInfo } from '@/lib/products'
import { useCart } from '@/contexts/cart-context'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal } = useCart()
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [summaryExpanded, setSummaryExpanded] = useState(false)
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    deliveryType: 'delivery' as 'delivery' | 'pickup',
    address: '',
    instructions: ''
  })

  const deliveryFee = formData.deliveryType === 'delivery' ? 200 : 0
  const total = subtotal + deliveryFee

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPlacingOrder(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Generate order reference
    const orderRef = `ORD-2026-${Math.floor(Math.random() * 90000) + 10000}`
    
    // Navigate to payment page
    router.push(`/store/order/${orderRef}/pay?total=${total}`)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (items.length === 0) {
    router.push('/store/cart')
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Contact Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="0712 345 678"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="h-12"
                />
                <p className="text-xs text-muted-foreground">
                  For M-Pesa confirmation and order updates
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-12"
                />
                <p className="text-xs text-muted-foreground">
                  Optional — for order updates
                </p>
              </div>
            </Card>

            {/* Delivery Options */}
            <Card className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Delivery Options</h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, deliveryType: 'delivery' }))}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    formData.deliveryType === 'delivery'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Truck className={`w-8 h-8 mb-3 ${
                    formData.deliveryType === 'delivery' ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <div className="font-semibold mb-1">Delivery</div>
                  <div className="text-sm text-muted-foreground">
                    KES 200 delivery fee
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, deliveryType: 'pickup' }))}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    formData.deliveryType === 'pickup'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Store className={`w-8 h-8 mb-3 ${
                    formData.deliveryType === 'pickup' ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <div className="font-semibold mb-1">Pickup</div>
                  <div className="text-sm text-muted-foreground">
                    No delivery fee
                  </div>
                </button>
              </div>

              {formData.deliveryType === 'delivery' ? (
                <div className="space-y-2 pt-4">
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="Enter your delivery address..."
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="resize-none"
                  />
                </div>
              ) : (
                <div className="pt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-1">Pickup Location:</p>
                  <p className="text-sm text-muted-foreground">
                    {storeInfo.pickupAddress}
                  </p>
                </div>
              )}
            </Card>

            {/* Special Instructions */}
            <Card className="p-6 space-y-4">
              <h2 className="text-xl font-bold">
                Special Instructions <span className="text-muted-foreground font-normal">(Optional)</span>
              </h2>
              
              <Textarea
                id="instructions"
                name="instructions"
                placeholder="Any special requests or notes..."
                value={formData.instructions}
                onChange={handleInputChange}
                rows={3}
                className="resize-none"
              />
            </Card>

            {/* Mobile Place Order Button */}
            <div className="lg:hidden">
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-lg"
                disabled={isPlacingOrder}
              >
                {isPlacingOrder ? 'Processing...' : `Place Order → ${formatKES(total)}`}
              </Button>
            </div>
          </form>

          {/* Order Summary - Sticky on desktop */}
          <div className="lg:col-span-1">
            {/* Mobile: Collapsible */}
            <Card className="lg:hidden p-4 mb-4">
              <button
                type="button"
                onClick={() => setSummaryExpanded(!summaryExpanded)}
                className="w-full flex items-center justify-between"
              >
                <span className="font-bold">Order Summary</span>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">{formatKES(total)}</span>
                  {summaryExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {summaryExpanded && (
                <div className="mt-4 pt-4 border-t space-y-3">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {product.name} × {quantity}
                      </span>
                      <span className="font-medium">
                        {formatKES(product.price * quantity)}
                      </span>
                    </div>
                  ))}
                  
                  <div className="pt-3 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">{formatKES(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="font-medium">{formatKES(deliveryFee)}</span>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Desktop: Always visible */}
            <Card className="hidden lg:block p-6 space-y-4 sticky top-24">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="space-y-3 py-4 border-t">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {product.name} × {quantity}
                    </span>
                    <span className="font-medium">
                      {formatKES(product.price * quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-4 border-t">
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
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-primary">
                  {formatKES(total)}
                </span>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isPlacingOrder}
                onClick={handleSubmit}
              >
                {isPlacingOrder ? 'Processing...' : 'Place Order →'}
              </Button>
            </Card>
          </div>
        </div>
      </main>

      <StoreFooter />
    </div>
  )
}
