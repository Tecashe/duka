'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  const tabs = [
    { name: 'Store Settings', href: '/dashboard/settings/store' },
    { name: 'Account Settings', href: '/dashboard/settings/account' },
  ]

  return (
    <div className="space-y-6">
      <div className="border-b border-border">
        <div className="flex gap-4 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                {tab.name}
              </Link>
            )
          })}
        </div>
      </div>
      {children}
    </div>
  )
}
