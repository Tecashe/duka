// 'use client'

// import Link from 'next/link'
// import { ShoppingCart } from 'lucide-react'
// import { Product, formatKES } from '@/lib/products'
// import { Button } from '@/components/ui/button'
// import { useCart } from '@/contexts/cart-context'
// import { useState } from 'react'

// interface ProductCardProps {
//   product: Product
// }
// //
// export function ProductCard({ product }: ProductCardProps) {
//   const { addToCart } = useCart()
//   const [isAdding, setIsAdding] = useState(false)

//   const handleAddToCart = async (e: React.MouseEvent) => {
//     e.preventDefault()
//     e.stopPropagation()

//     if (!product.inStock) return

//     setIsAdding(true)
//     addToCart(product, 1)

//     // Brief feedback animation
//     setTimeout(() => setIsAdding(false), 600)
//   }

//   const productInitial = product.name.charAt(0).toUpperCase()

//   // Generate color based on product ID for consistent placeholder colors
//   const colors = [
//     'bg-amber-200',
//     'bg-orange-200',
//     'bg-rose-200',
//     'bg-yellow-200',
//     'bg-red-200',
//   ]
//   const colorClass = colors[parseInt(product.id) % colors.length]

//   return (
//     <Link
//       href={`/store/product/${product.id}`}
//       className={`group block rounded-xl border bg-card overflow-hidden transition-all hover:shadow-lg ${!product.inStock ? 'opacity-60' : ''
//         }`}
//     >
//       <div className="relative">
//         {/* Product Image Placeholder */}
//         <div
//           className={`aspect-square ${colorClass} flex items-center justify-center relative`}
//         >
//           <span className="text-6xl font-bold text-white/40">{productInitial}</span>

//           {!product.inStock && (
//             <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-semibold px-3 py-1 rounded-full">
//               Out of Stock
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="p-4 space-y-3">
//         <div className="space-y-1">
//           <h3 className="font-semibold text-base line-clamp-2 leading-tight">
//             {product.name}
//           </h3>
//           <p className="text-xl font-bold text-primary">{formatKES(product.price)}</p>
//         </div>

//         <Button
//           onClick={handleAddToCart}
//           disabled={!product.inStock || isAdding}
//           className="w-full"
//           size="lg"
//         >
//           {isAdding ? (
//             <>Added!</>
//           ) : !product.inStock ? (
//             <>Out of Stock</>
//           ) : (
//             <>
//               <ShoppingCart className="w-4 h-4 mr-2" />
//               Add to Cart
//             </>
//           )}
//         </Button>
//       </div>
//     </Link>
//   )
// }


'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Product, formatKES } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/cart-context'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const inStock = product.stock > 0

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!inStock) return

    setIsAdding(true)
    addToCart(product, 1)

    setTimeout(() => setIsAdding(false), 600)
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
    <Link
      href={`/store/product/${product.id}`}
      className={`group block rounded-xl border bg-card overflow-hidden transition-all hover:shadow-lg ${!inStock ? 'opacity-60' : ''
        }`}
    >
      <div className="relative">
        <div className={`aspect-square ${colorClass} flex items-center justify-center relative`}>
          <span className="text-6xl font-bold text-white/40">{productInitial}</span>
          {!inStock && (
            <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-semibold px-3 py-1 rounded-full">
              Out of Stock
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-base line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <p className="text-xl font-bold text-primary">{formatKES(product.price)}</p>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={!inStock || isAdding}
          className="w-full"
          size="lg"
        >
          {isAdding ? (
            <>Added!</>
          ) : !inStock ? (
            <>Out of Stock</>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </Link>
  )
}