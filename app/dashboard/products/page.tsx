import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { getUserStore, getStoreProducts } from '@/lib/actions/store'
import { ProductsList } from './products-list'

export default async function ProductsListPage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }

  const store = await getUserStore(user.id)

  if (!store) {
    redirect('/onboarding')
  }

  const products = await getStoreProducts(store.id)

  return <ProductsList initialProducts={products} storeId={store.id} />
}
