import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { getUserStore } from '@/lib/actions/store'
import { getStoreOrders } from '@/lib/actions/orders'
import { OrdersList } from './orders-list'
//
export default async function OrdersListPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const store = await getUserStore(user.id)

  if (!store) {
    redirect('/onboarding')
  }

  const orders = await getStoreOrders(store.id)

  return <OrdersList initialOrders={orders} storeId={store.id} />
}
