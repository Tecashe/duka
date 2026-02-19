import { prisma } from '@/lib/prisma'
import { mockStores } from '@/lib/stores'
import { getTemplateComponent } from '@/components/templates/template-registry'
import { StoreNotFound } from '@/components/StoreNotFound'

async function getStoreData(subdomain: string) {
  // Try database first if Prisma is available
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

      if (!store || !store.visible) {
        return null
      }

      return {
        id: store.id,
        subdomain: store.subdomain,
        businessName: store.name,
        description: store.description || '',
        category: store.category,
        template: store.template,
        primaryColor: '#000000',
        mpesaNumber: store.mpesaNumber || '',
        mpesaType: (store.mpesaType as 'till' | 'paybill') || 'till',
        deliveryFee: store.deliveryFee,
        offerDelivery: store.allowDelivery,
        offerPickup: store.allowPickup,
        pickupLocation: store.pickupAddress || undefined,
        products: store.products.map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description || '',
          price: p.price,
          compareAtPrice: p.compareAtPrice || undefined,
          stock: p.stock,
          images: p.images,
          category: p.category || 'General',
          isActive: p.visible
        }))
      }
    } catch (error) {
      console.error('[store] Database error:', error)
    }
  }

  // Fallback to mock data for demo purposes
  console.log('[store] Using mock data. Connect database for live data.')
  const mockStore = Object.values(mockStores).find(s => s.subdomain === subdomain)
  return mockStore || null
}

export default async function StorePage({ params }: { params: Promise<{ subdomain: string }> }) {
  const { subdomain } = await params
  const store = await getStoreData(subdomain)

  if (!store) {
    return <StoreNotFound subdomain={subdomain} />
  }

  const TemplateComponent = getTemplateComponent(store.template)
  return <TemplateComponent store={store} />
}
