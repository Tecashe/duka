'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Plus, MoreVertical, Trash2, Edit, EyeOff, Check } from 'lucide-react'
import { toggleProductVisibility, deleteProduct } from '@/lib/actions/products'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

type FilterType = 'all' | 'active' | 'hidden' | 'low-stock'
type SortType = 'newest' | 'oldest' | 'price-high' | 'price-low' | 'stock'
//
interface Product {
  id: string
  name: string
  price: number
  stock: number
  visible: boolean
  images: string[]
  createdAt: Date
}

export function ProductsList({ initialProducts, storeId }: { initialProducts: Product[], storeId: string }) {
  const { toast } = useToast()
  const router = useRouter()
  const [products, setProducts] = useState(initialProducts)
  const [filter, setFilter] = useState<FilterType>('all')
  const [sort, setSort] = useState<SortType>('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; productId?: string; productName?: string }>({ open: false })
  const [isDeleting, setIsDeleting] = useState(false)

  // Filter products
  const filteredProducts = products.filter(product => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    if (filter === 'active') return product.visible
    if (filter === 'hidden') return !product.visible
    if (filter === 'low-stock') return product.stock <= 5
    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'price-high':
        return b.price - a.price
      case 'price-low':
        return a.price - b.price
      case 'stock':
        return a.stock - b.stock
      default:
        return 0
    }
  })
  const handleToggleVisibility = async (productId: string, currentVisibility: boolean) => {
    const result = await toggleProductVisibility(productId)

    if (result.success) {
      setProducts(products.map(p =>
        p.id === productId ? { ...p, visible: !currentVisibility } : p
      ))
      toast({
        title: currentVisibility ? 'Product hidden' : 'Product visible',
        description: currentVisibility
          ? 'Product is now hidden from customers'
          : 'Product is now visible to customers',
      })
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      })
    }
  }



  // const handleToggleVisibility = async (productId: string, currentVisibility: boolean) => {
  //   const result = await toggleProductVisibility(productId, !currentVisibility)

  //   if (result.success) {
  //     setProducts(products.map(p =>
  //       p.id === productId ? { ...p, visible: !currentVisibility } : p
  //     ))
  //     toast({
  //       title: currentVisibility ? 'Product hidden' : 'Product visible',
  //       description: currentVisibility ? 'Product is now hidden from customers' : 'Product is now visible to customers',
  //     })
  //   } else {
  //     toast({
  //       title: 'Error',
  //       description: result.error,
  //       variant: 'destructive'
  //     })
  //   }
  // }

  const handleDelete = async () => {
    if (!deleteDialog.productId) return

    setIsDeleting(true)
    const result = await deleteProduct(deleteDialog.productId)

    if (result.success) {
      setProducts(products.filter(p => p.id !== deleteDialog.productId))
      toast({
        title: 'Product deleted',
        description: 'Product has been permanently deleted',
      })
      setDeleteDialog({ open: false })
      router.refresh()
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive'
      })
    }
    setIsDeleting(false)
  }

  const filterCounts = {
    all: products.length,
    active: products.filter(p => p.visible).length,
    hidden: products.filter(p => !p.visible).length,
    lowStock: products.filter(p => p.stock <= 5).length,
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground mt-1">
              Manage your product catalog
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>

        {/* Filters & Stats */}
        <div className="flex flex-col gap-4">
          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { value: 'all', label: 'All', count: filterCounts.all },
              { value: 'active', label: 'Active', count: filterCounts.active },
              { value: 'hidden', label: 'Hidden', count: filterCounts.hidden },
              { value: 'low-stock', label: 'Low Stock', count: filterCounts.lowStock },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value as FilterType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${filter === tab.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
              >
                {tab.label}
                <Badge variant="outline" className={filter === tab.value ? 'bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20' : ''}>
                  {tab.count}
                </Badge>
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={sort} onValueChange={(value) => setSort(value as SortType)}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="stock">Stock: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Summary Pills */}
          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary" className="px-3 py-1.5">
              {products.length} Total Products
            </Badge>
            {filterCounts.lowStock > 0 && (
              <Badge variant="outline" className="px-3 py-1.5 bg-amber-50 text-amber-700 border-amber-200">
                {filterCounts.lowStock} Low Stock
              </Badge>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                {searchQuery ? 'No products found matching your search' :
                  filter !== 'all' ? 'No products in this category' :
                    'No products yet. Add your first product to get started!'}
              </p>
              {!searchQuery && filter === 'all' && (
                <Button asChild className="mt-4">
                  <Link href="/dashboard/products/new">Add Product</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map((product) => {
              const initials = product.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

              return (
                <Card key={product.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="relative aspect-square bg-secondary flex items-center justify-center">
                      {product.images[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-4xl font-bold text-muted-foreground">{initials}</div>
                      )}
                      {!product.visible && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Badge variant="secondary">Hidden</Badge>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-balance leading-tight mb-1">{product.name}</h3>
                        <p className="text-lg font-bold text-primary">KES {product.price.toLocaleString()}</p>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className={`${product.stock <= 5 ? 'text-amber-600 font-medium' : 'text-muted-foreground'}`}>
                          Stock: {product.stock}
                        </span>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={product.visible}
                            onCheckedChange={() => handleToggleVisibility(product.id, product.visible)}
                          />
                          <span className="text-xs">{product.visible ? 'Active' : 'Hidden'}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <Link href={`/dashboard/products/${product.id}/edit`}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => setDeleteDialog({ open: true, productId: product.id, productName: product.name })}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deleteDialog.productName}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog({ open: false })} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete Product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
