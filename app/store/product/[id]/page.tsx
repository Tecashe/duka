'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Minus, Plus, ShoppingCart, ZoomIn } from 'lucide-react'
import { StoreHeader } from '@/components/store/store-header'
import { StoreFooter } from '@/components/store/store-footer'
import { Button } from '@/components/ui/button'
import { products, formatKES } from '@/lib/products'
import { useCart } from '@/contexts/cart-context'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <StoreHeader />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link href="/store">Back to Store</Link>
          </Button>
        </main>
        <StoreFooter />
      </div>
    )
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)))
  }

  const handleAddToCart = () => {
    if (product.stock <= 0) return

    setIsAdding(true)
    addToCart(product, quantity)

    setTimeout(() => {
      setIsAdding(false)
      router.push('/store/cart')
    }, 600)
  }

  const productInitial = product.name.charAt(0).toUpperCase()
  const colors = [
    'bg-amber-200',
    'bg-orange-200',
    'bg-rose-200',
    'bg-yellow-200',
    'bg-red-200',
  ]
  const colorClass = colors[parseInt(product.id) % colors.length]

  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Store
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/*ProductImage */}
            <div className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="relative w-full aspect-[3/4] rounded-xl overflow-hidden group cursor-zoom-in">
                    <div
                      className={`w-full h-full ${colorClass} flex items-center justify-center`}
                    >
                      <span className="text-9xl font-bold text-white/40">
                        {productInitial}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className={`w-full aspect-[3/4] ${colorClass} rounded-lg flex items-center justify-center`}>
                    <span className="text-[12rem] font-bold text-white/40">
                      {productInitial}
                    </span>
                  </div>
                </DialogContent>
              </Dialog>

              <p className="text-sm text-muted-foreground text-center">
                Tap to zoom
              </p>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold text-balance">
                  {product.name}
                </h1>

                <div className="flex items-center gap-3">
                  <p className="text-3xl font-bold text-primary">
                    {formatKES(product.price)}
                  </p>

                  {product.stock > 0 ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-destructive">
                      <span className="w-2 h-2 rounded-full bg-destructive"></span>
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.stock > 0 ? (
                <div className="space-y-4 pt-4">
                  {/* Quantity Selector */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quantity</label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>

                      <div className="flex-1 text-center">
                        <span className="text-2xl font-bold">{quantity}</span>
                      </div>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= 10}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Maximum quantity: 10
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    size="lg"
                    className="w-full h-14 text-lg"
                    onClick={handleAddToCart}
                    disabled={isAdding}
                  >
                    {isAdding ? (
                      <>Adding to Cart...</>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="pt-4">
                  <Button
                    size="lg"
                    className="w-full h-14 text-lg"
                    disabled
                  >
                    Out of Stock — Check back soon
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <StoreFooter />
    </div>
  )
}
