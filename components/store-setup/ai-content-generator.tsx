'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Sparkles, Loader2, Copy, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface AIContentGeneratorProps {
  businessName: string
  businessCategory: string
  onGenerate: (content: {
    heading: string
    description: string
    tagline: string
  }) => void
}

export function AIContentGenerator({ businessName, businessCategory, onGenerate }: AIContentGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generated, setGenerated] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  const generateContent = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation with sophisticated placeholder content
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const templates = {
      'Fashion & Apparel': {
        heading: `Discover ${businessName}`,
        tagline: 'Where Style Meets Elegance',
        description: `Welcome to ${businessName}, your premier destination for fashion-forward pieces that blend timeless elegance with contemporary flair. Every item in our curated collection is selected to help you express your unique style with confidence.`
      },
      'Electronics & Gadgets': {
        heading: `${businessName} - Innovation at Your Fingertips`,
        tagline: 'Powering Your Digital Life',
        description: `At ${businessName}, we bring you the latest in technology and innovation. From cutting-edge smartphones to smart home devices, discover genuine products backed by warranty and expert support that keeps you connected.`
      },
      'Food & Beverages': {
        heading: `Fresh from ${businessName}`,
        tagline: 'Nourishing Life, One Bite at a Time',
        description: `Experience the difference of farm-fresh quality with ${businessName}. We're passionate about delivering the finest organic produce and artisanal foods straight to your door, supporting local farmers while nourishing your family.`
      },
      'Beauty & Cosmetics': {
        heading: `${businessName} - Your Beauty Journey Begins Here`,
        tagline: 'Celebrate Your Natural Beauty',
        description: `Discover ${businessName}'s carefully curated collection of premium beauty and skincare products. From everyday essentials to special occasion glamour, we help you look and feel your absolute best with products that love your skin.`
      },
      'Home & Garden': {
        heading: `Transform Your Space with ${businessName}`,
        tagline: 'Creating Homes, Building Dreams',
        description: `At ${businessName}, we believe your home should be your sanctuary. Explore our thoughtfully selected collection of furniture, decor, and garden essentials that turn houses into homes filled with comfort and style.`
      },
      'default': {
        heading: `Welcome to ${businessName}`,
        tagline: 'Quality You Can Trust',
        description: `Discover exceptional products and service at ${businessName}. We're committed to bringing you the best selection, competitive prices, and customer care that goes above and beyond. Your satisfaction is our success.`
      }
    }

    const content = templates[businessCategory as keyof typeof templates] || templates.default
    
    setGenerated(content)
    setIsGenerating(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const applyContent = () => {
    if (generated) {
      onGenerate(generated)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Content Generator
          </CardTitle>
          <CardDescription>
            Generate professional website content powered by AI
          </CardDescription>
        </div>
        <Badge variant="secondary">Beta</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!generated && (
          <>
            <div className="space-y-2">
              <Label>Business Information</Label>
              <div className="grid gap-2">
                <Input value={businessName} disabled placeholder="Business Name" />
                <Input value={businessCategory} disabled placeholder="Category" />
              </div>
            </div>

            <Button
              onClick={generateContent}
              disabled={isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Content...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Website Content
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              AI will create a unique heading, tagline, and description for your website
            </p>
          </>
        )}

        {generated && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Hero Heading</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(generated.heading)}
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
              <Textarea
                value={generated.heading}
                onChange={(e) => setGenerated({ ...generated, heading: e.target.value })}
                rows={2}
                className="font-semibold"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Tagline</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(generated.tagline)}
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
              <Input
                value={generated.tagline}
                onChange={(e) => setGenerated({ ...generated, tagline: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Description</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(generated.description)}
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
              <Textarea
                value={generated.description}
                onChange={(e) => setGenerated({ ...generated, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={applyContent} className="flex-1">
                Apply to Website
              </Button>
              <Button variant="outline" onClick={() => setGenerated(null)}>
                Generate New
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
