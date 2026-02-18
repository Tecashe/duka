import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/api/auth/login',
  '/api/auth/register',
  '/api/webhooks',
]

export async function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  const currentHost = host
    .replace('.localhost:3000', '')
    .replace('.vercel.app', '')
    .replace('.duka.co.ke', '')
    .replace(':3000', '')
    .split('.')[0]

  const isMainDomain =
    currentHost === 'www' ||
    currentHost === 'duka' ||
    currentHost === 'duka-my' ||
    currentHost === 'localhost' ||
    currentHost === 'app' ||
    host.startsWith('localhost:') ||
    (host.includes('vercel.app') && host.includes('duka-my'))

  // 1. Handle Subdomain Routing (Stores)
  if (!isMainDomain && currentHost && currentHost !== host) {
    const url = req.nextUrl.clone()
    url.pathname = `/store/${currentHost}${url.pathname}`
    return NextResponse.rewrite(url)
  }

  // 2. Handle protected routes (Dashboard & Onboarding)
  const isProtectedRoute =
    req.nextUrl.pathname.startsWith('/dashboard') ||
    req.nextUrl.pathname.startsWith('/onboarding')

  if (isProtectedRoute) {
    const token = req.cookies.get('session')?.value

    if (!token) {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    try {
      await jwtVerify(token, JWT_SECRET)
      return NextResponse.next()
    } catch (error) {
      // Invalid token
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
