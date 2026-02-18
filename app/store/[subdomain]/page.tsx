import { prisma } from '@/lib/prisma'
import { mockStores } from '@/lib/stores'
import { MinimalTemplate } from '@/components/templates/MinimalTemplate'
import { BoldTemplate } from '@/components/templates/BoldTemplate'
import { VibrantTemplate } from '@/components/templates/VibrantTemplate'
import { StoreNotFound } from '@/components/StoreNotFound'

async function getStoreData(subdomain: string) {
  // Try databasefirst if Prisma is available
  if (prisma) {
    try {
      const store = await prisma.store.findUnique({
        where: { subdomain },
        include: {
          products: {
            where: { visible: true },
            orderBy: { createdAt: 'desc' }
          }
        }
      })

      if (!store || !store.isActive) {
        return null
      }

      return {
        id: store.id,
        name: store.name,
        subdomain: store.subdomain,
        description: store.description || '',
        category: store.category,
        template: store.template as 'minimal' | 'bold' | 'vibrant',
        mpesaNumber: store.mpesaNumber,
        mpesaType: store.mpesaType as 'till' | 'paybill',
        products: store.products.map(p => ({
          id: p.id,
          name: p.name,
          description: p.description || '',
          price: p.price,
          compareAtPrice: p.compareAtPrice,
          stock: p.stock,
          images: p.images,
          category: 'General'
        }))
      }
    } catch (error) {
      console.error('[v0] Database error:', error)
    }
  }

  // Fallback to mock data for demo purposes
  console.log('[v0] Using mock data. Connect database for live data.')
  const mockStore = Object.values(mockStores).find(s => s.subdomain === subdomain)
  return mockStore || null
}

export default async function StorePage({ params }: { params: Promise<{ subdomain: string }> }) {
  const { subdomain } = await params
  const store = await getStoreData(subdomain)

  if (!store) {
    return <StoreNotFound subdomain={subdomain} />
  }

  switch (store.template) {
    case 'minimal':
      return <MinimalTemplate store={store} />
    case 'bold':
      return <BoldTemplate store={store} />
    case 'vibrant':
      return <VibrantTemplate store={store} />
    default:
      return <MinimalTemplate store={store} />
  }
}
