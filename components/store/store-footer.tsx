import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { storeInfo } from '@/lib/products'

export function StoreFooter() {
  const whatsappLink = `https://wa.me/${storeInfo.whatsapp.replace(/[^0-9]/g, '')}`

  return (
    <footer className="border-t mt-16 py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Contact Seller on WhatsApp</span>
          </Link>

          <p className="text-sm text-muted-foreground">
            Powered by <span className="font-semibold text-foreground">Duka</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
