'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, FileSpreadsheet, Plus, X, Image as ImageIcon, Download } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Product {
  name: string
  description: string
  price: string
  stock: string
  images: File[]
}

interface BulkProductUploadProps {
  onProductsAdd: (products: Product[]) => void
}

export function BulkProductUpload({ onProductsAdd }: BulkProductUploadProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [currentProduct, setCurrentProduct] = useState<Product>({
    name: '',
    description: '',
    price: '',
    stock: '',
    images: []
  })

  const addProduct = () => {
    if (currentProduct.name && currentProduct.price) {
      setProducts([...products, currentProduct])
      setCurrentProduct({
        name: '',
        description: '',
        price: '',
        stock: '',
        images: []
      })
    }
  }

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index))
  }

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files)
      setCurrentProduct({
        ...currentProduct,
        images: [...currentProduct.images, ...newImages]
      })
    }
  }

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        const lines = text.split('\n').slice(1) // Skip header
        const csvProducts: Product[] = lines
          .filter(line => line.trim())
          .map(line => {
            const [name, description, price, stock] = line.split(',')
            return {
              name: name.trim(),
              description: description.trim(),
              price: price.trim(),
              stock: stock.trim(),
              images: []
            }
          })
        setProducts([...products, ...csvProducts])
      }
      reader.readAsText(file)
    }
  }

  const downloadCSVTemplate = () => {
    const template = 'Product Name,Description,Price,Stock\nSample Product,A great product,2500,10\n'
    const blob = new Blob([template], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'products-template.csv'
    a.click()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Add Your Products</h2>
        <p className="text-muted-foreground">
          Add products one by one or upload multiple products using CSV
        </p>
      </div>

      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="csv">CSV Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Product</CardTitle>
              <CardDescription>Enter product details and click Add to list</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Ankara Wrap Dress"
                    value={currentProduct.name}
                    onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (KES) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="2500"
                    value={currentProduct.price}
                    onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your product..."
                  value={currentProduct.description}
                  onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="10"
                    value={currentProduct.stock}
                    onChange={(e) => setCurrentProduct({...currentProduct, stock: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Product Images</Label>
                  <div className="flex gap-2">
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => document.getElementById('images')?.click()}
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Upload Images ({currentProduct.images.length})
                    </Button>
                  </div>
                </div>
              </div>

              <Button onClick={addProduct} className="w-full" disabled={!currentProduct.name || !currentProduct.price}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product to List
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="csv" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload CSV File</CardTitle>
              <CardDescription>
                Upload a CSV file with your products. Download the template to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" onClick={downloadCSVTemplate} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download CSV Template
              </Button>

              <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
                <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <Input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => document.getElementById('csv-upload')?.click()}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload CSV File
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    CSV format: Product Name, Description, Price, Stock
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Products List */}
      {products.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Added Products ({products.length})</CardTitle>
            <CardDescription>Review your products before proceeding</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {products.map((product, index) => (
                <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold">{product.name}</h4>
                        {product.description && (
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {product.description}
                          </p>
                        )}
                        <div className="flex gap-3 mt-2">
                          <Badge variant="secondary">KES {product.price}</Badge>
                          {product.stock && (
                            <Badge variant="outline">Stock: {product.stock}</Badge>
                          )}
                          {product.images.length > 0 && (
                            <Badge variant="outline">
                              {product.images.length} image{product.images.length !== 1 ? 's' : ''}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProduct(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              className="w-full mt-4"
              onClick={() => onProductsAdd(products)}
              size="lg"
            >
              Continue with {products.length} Product{products.length !== 1 ? 's' : ''}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
