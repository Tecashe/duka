import { StoreHeader } from '@/components/store/store-header'
import { StoreFooter } from '@/components/store/store-footer'
import { ProductCard } from '@/components/store/product-card'
import { products, storeInfo } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'

export default function StorePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />

      <main className="flex-1">
        {/* Hero Section with Vibrant gradient */}
        <section className="relative bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              {storeInfo.name}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {storeInfo.description}
            </p>
            <Button size="lg" className="mt-6" asChild>
              <a href="#products" className="inline-flex items-center gap-2">
                Shop Now
                <ArrowDown className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </section>

        {/* Product Grid */}
        <section id="products" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Our Products</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <StoreFooter />
    </div>
  )
}
