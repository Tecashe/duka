'use client'

import Link from 'next/link'
import { ShoppingCart, Store } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { storeInfo } from '@/lib/products'

export function StoreHeader() {
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/store" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Store className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-lg">{storeInfo.name}</span>
          </Link>

          <Link href="/store/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        <div className="pb-3 text-sm text-muted-foreground">
          {storeInfo.category} · {storeInfo.location}
        </div>
      </div>
    </header>
  )
}
