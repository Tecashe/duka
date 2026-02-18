'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles, RefreshCw } from 'lucide-react'

interface AIDescriptionGeneratorProps {
  context: {
    name: string
    category?: string
  }
  onGenerate: (description: string) => void
  placeholder?: string
}

const categoryDescriptions: Record<string, string> = {
  'Fashion & Clothing': 'Bringing bold African prints and contemporary Kenyan fashion to your wardrobe. Quality pieces for every occasion, from office to weekend.',
  'Food & Beverages': 'Farm-fresh, locally sourced produce and foods delivered straight to your door. We believe in honest food from honest farms.',
  'Electronics & Accessories': 'Your trusted source for genuine electronics and accessories in Kenya. Quality products, fair prices, fast delivery.',
  'Beauty & Personal Care': 'Natural, skin-loving beauty products curated for Kenyan skin tones. Look and feel your best every day.',
  'Home & Garden': 'Quality home essentials and garden supplies for Kenyan homes. Create a space you love.',
  'Health & Wellness': 'Supporting your health journey with quality products and expert care. Your wellness, our priority.',
  'Sports & Fitness': 'Gear up for your fitness goals with quality sports equipment and accessories. Stay active, stay strong.',
  'Books & Stationery': 'Everything you need for learning, creativity, and organization. From books to office supplies.',
  'Toys & Kids': 'Safe, fun, and educational toys for Kenyan children. Spark imagination and joy.',
  'default': 'Quality products, honest prices, and service you can trust. Based in Kenya, built for Kenya.'
}

const productDescriptions = [
  'A must-have {product} crafted with quality materials. Perfect for everyday use. Available now — order yours today and enjoy fast delivery across Kenya.',
  'This {product} is designed to exceed your expectations. Quality you can trust, value you can see. Get yours delivered right to your door.',
  'Experience the quality of this premium {product}. Carefully selected for Kenyan customers. Order now for fast, reliable delivery.',
  'Transform your day with this exceptional {product}. Built to last, priced to please. Available for immediate delivery across Nairobi.',
]

export function AIDescriptionGenerator({ context, onGenerate, placeholder }: AIDescriptionGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedText, setGeneratedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const typewriterEffect = async (text: string) => {
    setGeneratedText('')
    setIsTyping(true)
    
    for (let i = 0; i < text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30))
      setGeneratedText(text.slice(0, i + 1))
    }
    
    setIsTyping(false)
  }

  const generateDescription = async () => {
    setIsGenerating(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    let description: string
    
    if (context.category) {
      // Business description
      description = categoryDescriptions[context.category] || categoryDescriptions['default']
    } else {
      // Product description
      const template = productDescriptions[Math.floor(Math.random() * productDescriptions.length)]
      description = template.replace('{product}', context.name.toLowerCase())
    }
    
    setIsGenerating(false)
    await typewriterEffect(description)
  }

  const acceptDescription = () => {
    onGenerate(generatedText)
    setGeneratedText('')
  }

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={generateDescription}
        disabled={isGenerating || isTyping}
        className="gap-2"
      >
        {isGenerating ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Generate with AI
          </>
        )}
      </Button>

      {generatedText && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-3">
          <p className="text-sm text-gray-700 leading-relaxed">
            {generatedText}
            {isTyping && <span className="inline-block w-1 h-4 bg-primary ml-1 animate-pulse" />}
          </p>
          
          {!isTyping && (
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                onClick={acceptDescription}
                className="bg-primary hover:bg-primary/90"
              >
                Use This
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generateDescription}
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Regenerate
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
