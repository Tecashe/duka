import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function StoreNotFound({ subdomain }: { subdomain: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-6">🏪</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-balance">
          Hmm, we couldn't find {subdomain}.duka.co.ke
        </h1>
        <p className="text-gray-600 mb-8 text-balance leading-relaxed">
          This store may have moved or doesn't exist yet. Want to create your own store in minutes?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/register">
              Create your own store
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              Go to Duka
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
