import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/store/(.*)',
  '/demo(.*)',
  '/api/webhooks/(.*)',
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const host = req.headers.get('host') || ''
  const currentHost = host
    .replace('.localhost:3000', '')
    .replace('.vercel.app', '')
    .replace('.duka.co.ke', '')
    .replace(':3000', '')
    .split('.')[0] // Get first subdomain part

  // Check if it's a main platform domain
  const isMainDomain =
    currentHost === 'www' ||
    currentHost === 'duka' ||
    currentHost === 'localhost' ||
    currentHost === 'app' ||
    host.startsWith('localhost:') ||
    host.includes('vercel.app') && !host.includes('-')

  // If it's a subdomain store, rewrite to /store/[subdomain]
  if (!isMainDomain && currentHost && currentHost !== host) {
    const url = req.nextUrl.clone()
    url.pathname = `/store/${currentHost}${url.pathname}`
    return NextResponse.rewrite(url)
  }

  // Protect dashboard routes
  if (req.nextUrl.pathname.startsWith('/dashboard') || req.nextUrl.pathname.startsWith('/onboarding')) {
    await auth.protect()
  }

  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
