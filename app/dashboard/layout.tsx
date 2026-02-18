'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ThemeProvider } from '@/components/theme-provider'
import { useTheme } from 'next-themes'
import { NotificationCenter } from '@/components/dashboard/notification-center'
import { ThemeToggle } from '@/components/dashboard/theme-toggle'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'
import { 
  Home, 
  ShoppingBag, 
  Package, 
  Settings, 
  ExternalLink, 
  Menu, 
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  TrendingUp
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navigationItems = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: 'Orders',
    href: '/dashboard/orders',
    icon: ShoppingBag,
  },
  {
    name: 'Products',
    href: '/dashboard/products',
    icon: Package,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

function DashboardLayoutInner({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('sidebar-collapsed')
    if (stored) {
      setSidebarCollapsed(stored === 'true')
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed
    setSidebarCollapsed(newState)
    localStorage.setItem('sidebar-collapsed', String(newState))
  }

  // Placeholder data
  const businessName = 'Mama Grace Fashions'
  const storeUrl = 'mamagrace.duka.co.ke'
  const initials = 'MG'

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 -ml-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">D</span>
              </div>
              <span className="font-semibold text-foreground">Duka</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <NotificationCenter />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <>
            <div 
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden" 
              onClick={() => setSidebarOpen(false)}
            />
            <div 
              className="fixed inset-y-0 left-0 w-72 bg-card border-r border-border z-40 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                {/* Mobile Sidebar Header */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 ring-2 ring-primary/10">
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{businessName}</p>
                      <p className="text-xs text-muted-foreground truncate">{storeUrl}</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all',
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        )}
                      >
                        <Icon className="w-5 h-5 shrink-0" />
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>

                {/* Mobile Sidebar Footer */}
                <div className="p-4 border-t border-border space-y-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2"
                  >
                    <a href={`https://${storeUrl}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      View My Store
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2 text-muted-foreground"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside 
          className={cn(
            'hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-border lg:bg-card transition-all duration-300 ease-in-out shadow-sm',
            sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'
          )}
        >
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Desktop Sidebar Header */}
            <div className={cn(
              'flex items-center justify-between p-6 border-b border-border',
              sidebarCollapsed && 'justify-center'
            )}>
              {!sidebarCollapsed ? (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">D</span>
                    </div>
                    <span className="text-xl font-semibold tracking-tight text-foreground">Duka</span>
                  </div>
                  <button
                    onClick={toggleSidebar}
                    className="p-1.5 hover:bg-muted rounded-md transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={toggleSidebar}
                  className="p-1.5 hover:bg-muted rounded-md transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* User Profile */}
            {!sidebarCollapsed && (
              <div className="p-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors w-full">
                      <Avatar className="w-10 h-10 ring-2 ring-primary/10">
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-semibold text-foreground truncate">{businessName}</p>
                        <p className="text-xs text-muted-foreground truncate">{storeUrl}</p>
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Analytics
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {sidebarCollapsed && (
              <div className="p-4 flex justify-center">
                <Avatar className="w-10 h-10 ring-2 ring-primary/10">
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}

            {/* Desktop Navigation */}
            <nav className={cn('flex-1 space-y-1 overflow-y-auto', sidebarCollapsed ? 'px-2' : 'px-4')}>
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                      sidebarCollapsed && 'justify-center'
                    )}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {!sidebarCollapsed && <span>{item.name}</span>}
                    {sidebarCollapsed && (
                      <span className="absolute left-16 bg-popover px-2 py-1 rounded-md shadow-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-border">
                        {item.name}
                      </span>
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop Sidebar Footer */}
            <div className={cn('p-4 border-t border-border space-y-2', sidebarCollapsed && 'px-2')}>
              {!sidebarCollapsed ? (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2"
                >
                  <a href={`https://${storeUrl}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    View Store
                  </a>
                </Button>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="w-full"
                >
                  <a href={`https://${storeUrl}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div 
          className={cn(
            'flex-1 transition-all duration-300 ease-in-out',
            sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
          )}
        >
          {/* Desktop Top Bar */}
          <div className="hidden lg:flex sticky top-0 z-30 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
            <div className="flex items-center justify-between w-full px-6 h-16">
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  {navigationItems.find(item => pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href)))?.name || 'Dashboard'}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <NotificationCenter />
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Page Content */}
          <main className="p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
            <Breadcrumbs />
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-card/95 backdrop-blur-md border-t border-border z-40 shadow-lg">
        <div className="grid grid-cols-4 h-16">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 transition-colors relative',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-b-full" />
                )}
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </ThemeProvider>
  )
}
