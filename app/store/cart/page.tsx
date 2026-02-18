'use client'

import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { StoreHeader } from '@/components/store/store-header'
import { StoreFooter } from '@/components/store/store-footer'
import { Button } from '@/components/ui/button'
import { formatKES } from '@/lib/products'
import { useCart } from '@/contexts/cart-context'
import { Card } from '@/components/ui/card'

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart()

  const deliveryFee = 200
  const total = items.length > 0 ? subtotal + deliveryFee : 0

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <StoreHeader />
        <main className="flex-1 container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Your cart is empty</h1>
              <p className="text-muted-foreground">
                Add some products to get started
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="/store">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <StoreFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
        <p className="text-muted-foreground mb-8">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => {
              const productInitial = product.name.charAt(0).toUpperCase()
              const colors = [
                'bg-amber-200',
                'bg-orange-200',
                'bg-rose-200',
                'bg-yellow-200',
                'bg-red-200',
              ]
              const colorClass = colors[parseInt(product.id) % colors.length]
              const lineTotal = product.price * quantity

              return (
                <Card key={product.id} className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link
                      href={`/store/product/${product.id}`}
                      className="flex-shrink-0"
                    >
                      <div
                        className={`w-24 h-24 rounded-lg ${colorClass} flex items-center justify-center`}
                      >
                        <span className="text-3xl font-bold text-white/40">
                          {productInitial}
                        </span>
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0 space-y-3">
                      <div>
                        <Link
                          href={`/store/product/${product.id}`}
                          className="font-semibold hover:text-primary transition-colors line-clamp-2"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatKES(product.price)} each
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          
                          <span className="w-8 text-center font-semibold">
                            {quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            disabled={quantity >= 10}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        {/* Line Total */}
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            {formatKES(lineTotal)}
                          </p>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 -ml-2"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 space-y-4 sticky top-24">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="space-y-3 py-4 border-t border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatKES(subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery fee</span>
                  <span className="font-medium">
                    {formatKES(deliveryFee)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-primary">
                  {formatKES(total)}
                </span>
              </div>

              <Button size="lg" className="w-full" asChild>
                <Link href="/store/checkout">Proceed to Checkout</Link>
              </Button>

              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link href="/store">Continue Shopping</Link>
              </Button>
            </Card>
          </div>
        </div>
      </main>

      <StoreFooter />
    </div>
  )
}
