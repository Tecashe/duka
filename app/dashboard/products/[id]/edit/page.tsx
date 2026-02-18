'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Camera, Image as ImageIcon, X, Check, ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { formatKES, products as mockProducts } from '@/lib/products'

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  
  // Find product by ID
  const product = mockProducts.find(p => p.id === params.id)
  
  const [isLoading, setIsLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [images, setImages] = useState<{ id: string; url: string; isMain: boolean }[]>(
    product?.images.map((url, idx) => ({ id: Math.random().toString(), url, isMain: idx === 0 })) || []
  )
  const [uploadingImage, setUploadingImage] = useState(false)
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'Fashion & Clothing',
    price: product?.price.toString() || '',
    compareAtPrice: product?.compareAtPrice?.toString() || '',
    description: product?.description || '',
    stock: product?.stock.toString() || '1',
    trackStock: product?.trackStock ?? true,
    visible: product?.visible ?? true,
  })

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button onClick={() => router.push('/dashboard/products')}>
          Back to Products
        </Button>
      </div>
    )
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    for (const file of Array.from(files)) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          description: `${file.name} exceeds 10MB limit`,
        })
        return
      }
    }

    setUploadingImage(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newImages = Array.from(files).map((file, idx) => ({
      id: Math.random().toString(),
      url: URL.createObjectURL(file),
      isMain: images.length === 0 && idx === 0,
    }))

    setImages(prev => [...prev, ...newImages])
    setUploadingImage(false)
    
    toast({
      description: (
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Image optimized</span>
        </div>
      ),
      duration: 2000,
    })
  }

  const removeImage = (id: string) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id)
      if (filtered.length > 0 && !filtered.some(img => img.isMain)) {
        filtered[0].isMain = true
      }
      return filtered
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (images.length === 0) {
      toast({
        variant: 'destructive',
        description: 'At least one photo is required',
      })
      return
    }

    if (!formData.name || !formData.price) {
      toast({
        variant: 'destructive',
        description: 'Please fill in all required fields',
      })
      return
    }

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      description: 'Changes saved successfully',
      duration: 3000,
    })

    router.push('/dashboard/products')
  }

  const handleDelete = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      description: 'Product deleted',
      duration: 3000,
    })

    router.push('/dashboard/products')
  }

  const previewStockBadge = () => {
    const stock = parseInt(formData.stock) || 0
    if (stock === 0) return <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
    if (stock <= 5) return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 text-xs">Low Stock ({stock})</Badge>
    return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 text-xs">In Stock ({stock})</Badge>
  }

  const nameCharCount = formData.name.length
  const descCharCount = formData.description.length

  // Calculate "last updated"
  const lastUpdated = new Date(product.updatedAt)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24))
  const lastUpdatedText = diffDays === 0 ? 'today' : diffDays === 1 ? 'yesterday' : `${diffDays} days ago`

  return (
    <div className="max-w-4xl mx-auto pb-24 lg:pb-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Edit Product</h1>
        <p className="text-sm text-muted-foreground">Last updated: {lastUpdatedText}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photos - Desktop */}
        <Card className="hidden lg:block">
          <CardHeader>
            <CardTitle>Photos</CardTitle>
            <CardDescription>Add photos — first photo is your main image</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {images.length === 0 ? (
              <label className="border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition">
                <Camera className="w-12 h-12 text-muted-foreground mb-4" />
                <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-2">Add photos — first photo is your main image</p>
                <p className="text-xs text-muted-foreground">JPG, PNG, WEBP. Max 10MB each</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            ) : (
              <div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((image) => (
                    <div key={image.id} className="relative flex-shrink-0">
                      <img src={image.url} alt="" className="w-24 h-24 object-cover rounded-lg" />
                      {image.isMain && (
                        <Badge className="absolute top-1 left-1 text-xs">Main Photo</Badge>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {images.length < 4 && (
                    <label className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/50 flex-shrink-0">
                      <Camera className="w-6 h-6 text-muted-foreground" />
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
                {uploadingImage && (
                  <p className="text-sm text-muted-foreground mt-2">Optimising image...</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Photos - Mobile (Accordion) */}
        <Accordion type="single" collapsible defaultValue="photos" className="lg:hidden">
          <AccordionItem value="photos">
            <AccordionTrigger className="text-lg font-semibold">Photos</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((image) => (
                    <div key={image.id} className="relative flex-shrink-0">
                      <img src={image.url} alt="" className="w-20 h-20 object-cover rounded-lg" />
                      {image.isMain && (
                        <Badge className="absolute top-1 left-1 text-[10px] px-1 py-0">Main</Badge>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {images.length < 4 && (
                    <label className="w-20 h-20 border-2 border-dashed rounded-lg flex items-center justify-center active:bg-muted/50 flex-shrink-0">
                      <Camera className="w-5 h-5 text-muted-foreground" />
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
                {uploadingImage && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <span>Optimising image...</span>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Product Details - Desktop */}
        <Card className="hidden lg:block">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Product Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                maxLength={80}
                required
              />
              <p className="text-xs text-muted-foreground text-right">{nameCharCount}/80</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData(prev => ({ ...prev, category: v }))}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fashion & Clothing">Fashion & Clothing</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Footwear">Footwear</SelectItem>
                  <SelectItem value="Bags">Bags</SelectItem>
                  <SelectItem value="Home & Living">Home & Living</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">
                  Price <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">KES</span>
                  <Input
                    id="price"
                    type="number"
                    inputMode="decimal"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="pl-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="compareAtPrice">Original price (optional)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">KES</span>
                  <Input
                    id="compareAtPrice"
                    type="number"
                    inputMode="decimal"
                    value={formData.compareAtPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, compareAtPrice: e.target.value }))}
                    className="pl-12"
                    placeholder="Shows as a sale"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                maxLength={500}
                rows={4}
                placeholder="Describe your product — size, material, colours available..."
              />
              <p className="text-xs text-muted-foreground text-right">{descCharCount}/500</p>
            </div>
          </CardContent>
        </Card>

        {/* Product Details - Mobile (Accordion) */}
        <Accordion type="single" collapsible defaultValue="details" className="lg:hidden">
          <AccordionItem value="details">
            <AccordionTrigger className="text-lg font-semibold">Product Details</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name-mobile">
                  Product Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name-mobile"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  maxLength={80}
                  required
                />
                <p className="text-xs text-muted-foreground text-right">{nameCharCount}/80</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category-mobile">Category</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData(prev => ({ ...prev, category: v }))}>
                  <SelectTrigger id="category-mobile">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fashion & Clothing">Fashion & Clothing</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                    <SelectItem value="Footwear">Footwear</SelectItem>
                    <SelectItem value="Bags">Bags</SelectItem>
                    <SelectItem value="Home & Living">Home & Living</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price-mobile">
                  Price <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">KES</span>
                  <Input
                    id="price-mobile"
                    type="number"
                    inputMode="decimal"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="pl-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="compareAtPrice-mobile">Original price (optional)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">KES</span>
                  <Input
                    id="compareAtPrice-mobile"
                    type="number"
                    inputMode="decimal"
                    value={formData.compareAtPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, compareAtPrice: e.target.value }))}
                    className="pl-12"
                    placeholder="Shows as a sale"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description-mobile">Description</Label>
                <Textarea
                  id="description-mobile"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  maxLength={500}
                  rows={4}
                  placeholder="Describe your product — size, material, colours available..."
                />
                <p className="text-xs text-muted-foreground text-right">{descCharCount}/500</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Stock & Availability - Desktop */}
        <Card className="hidden lg:block">
          <CardHeader>
            <CardTitle>Stock & Availability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                type="number"
                inputMode="numeric"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Track stock</p>
                <p className="text-sm text-muted-foreground">Update inventory as orders come in</p>
              </div>
              <Switch
                checked={formData.trackStock}
                onCheckedChange={(v) => setFormData(prev => ({ ...prev, trackStock: v }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Visible on store</p>
                <p className="text-sm text-muted-foreground">Show this product to buyers</p>
              </div>
              <Switch
                checked={formData.visible}
                onCheckedChange={(v) => setFormData(prev => ({ ...prev, visible: v }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Stock & Availability - Mobile (Accordion) */}
        <Accordion type="single" collapsible defaultValue="stock" className="lg:hidden">
          <AccordionItem value="stock">
            <AccordionTrigger className="text-lg font-semibold">Stock & Availability</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="stock-mobile">Stock Quantity</Label>
                <Input
                  id="stock-mobile"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Track stock</p>
                  <p className="text-sm text-muted-foreground">Update inventory as orders come in</p>
                </div>
                <Switch
                  checked={formData.trackStock}
                  onCheckedChange={(v) => setFormData(prev => ({ ...prev, trackStock: v }))}
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Visible on store</p>
                  <p className="text-sm text-muted-foreground">Show this product to buyers</p>
                </div>
                <Switch
                  checked={formData.visible}
                  onCheckedChange={(v) => setFormData(prev => ({ ...prev, visible: v }))}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Live Preview */}
        <Card>
          <CardHeader className="cursor-pointer lg:cursor-default" onClick={() => setShowPreview(!showPreview)}>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription className="lg:block hidden">Preview how this looks on your store</CardDescription>
              </div>
              <button type="button" className="lg:hidden">
                {showPreview ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
          </CardHeader>
          <CardContent className={`${showPreview ? 'block' : 'hidden'} lg:block`}>
            <div className="border rounded-lg p-4 bg-muted/30">
              <div className="max-w-xs mx-auto space-y-3">
                {images.length > 0 ? (
                  <img src={images[0].url} alt="" className="w-full aspect-square object-cover rounded-lg" />
                ) : (
                  <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">
                    {formData.name || 'Product Name'}
                  </h3>
                  <div className="flex items-center gap-2">
                    {formData.compareAtPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatKES(parseInt(formData.compareAtPrice))}
                      </span>
                    )}
                    <span className="text-primary font-bold">
                      {formData.price ? formatKES(parseInt(formData.price)) : 'KES 0'}
                    </span>
                  </div>
                  {previewStockBadge()}
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-4">
                This is how buyers will see your product
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Permanently delete this product from your store</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              type="button"
              variant="outline" 
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => setDeleteDialog(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Product
            </Button>
          </CardContent>
        </Card>

        {/* Desktop Actions */}
        <div className="hidden lg:block">
          <Button type="submit" size="lg" disabled={isLoading} className="w-full">
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t lg:hidden z-50">
        <Button 
          type="submit" 
          size="lg" 
          disabled={isLoading}
          onClick={handleSubmit}
          className="w-full"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Delete Dialog */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {product.name}?</DialogTitle>
            <DialogDescription>
              This cannot be undone. Orders containing this product will not be affected.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete Product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
