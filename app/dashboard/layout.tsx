// Server Component — no 'use client' here so next/headers works fine
import { getCurrentUser } from '@/lib/auth'
import { prisma, isPrismaAvailable } from '@/lib/prisma'
import { ThemeProvider } from '@/components/theme-provider'
import { DashboardShell } from './dashboard-shell'

async function getStoreInfo() {
  if (!isPrismaAvailable) {
    return { businessName: 'My Store', storeUrl: 'duka-my.vercel.app/store/mystore', initials: 'MS' }
  }
  try {
    const user = await getCurrentUser()
    if (!user) return { businessName: 'My Store', storeUrl: 'duka-my.vercel.app/store/mystore', initials: 'MS' }
    const store = await prisma.store.findFirst({ where: { userId: user.id } })
    if (!store) return { businessName: 'My Store', storeUrl: 'duka-my.vercel.app/store/mystore', initials: 'MS' }
    const name = store.name || 'My Store'
    const initials = name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)
    return {
      businessName: name,
      storeUrl: `duka-my.vercel.app/store/${store.subdomain}`,
      initials,
    }
  } catch {
    return { businessName: 'My Store', storeUrl: 'duka-my.vercel.app/store/mystore', initials: 'MS' }
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const storeInfo = await getStoreInfo()
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <DashboardShell
        businessName={storeInfo.businessName}
        storeUrl={storeInfo.storeUrl}
        initials={storeInfo.initials}
      >
        {children}
      </DashboardShell>
    </ThemeProvider>
  )
}
