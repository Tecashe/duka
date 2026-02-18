import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink } from 'lucide-react'

export default function DemoPage() {
  const stores = [
    {
      name: 'FreshFarm Organics',
      subdomain: 'freshfarm',
      template: 'Minimal',
      description: 'Clean, editorial design with no clutter',
      color: 'bg-gray-100'
    },
    {
      name: 'TechKeja Electronics',
      subdomain: 'techkeja',
      template: 'Bold',
      description: 'High-energy design with strong contrast',
      color: 'bg-gray-900'
    },
    {
      name: 'Mama Grace Fashions',
      subdomain: 'mamagrace',
      template: 'Vibrant',
      description: 'Warm, inviting design with playful colors',
      color: 'bg-gradient-to-br from-amber-400 to-orange-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Template Demo
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Preview all three Duka storefront templates with real mock stores
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <p className="font-medium mb-1">Development Mode</p>
            <p>
              In production, these stores would be at{' '}
              <span className="font-mono">freshfarm.duka.co.ke</span>,{' '}
              <span className="font-mono">techkeja.duka.co.ke</span>, etc.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stores.map((store) => (
            <Card key={store.subdomain} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`h-32 ${store.color}`} />
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-lg">{store.name}</CardTitle>
                  <Badge variant="secondary" className="shrink-0">
                    {store.template}
                  </Badge>
                </div>
                <CardDescription>{store.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full" variant="outline">
                  <Link href={`/store/${store.subdomain}`}>
                    View Store
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
