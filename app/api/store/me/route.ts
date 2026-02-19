import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

async function getUserId(): Promise<string | null> {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('auth-token')?.value
        if (!token) return null
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-dev-secret')
        const { payload } = await jwtVerify(token, secret)
        return (payload.userId as string) || null
    } catch {
        return null
    }
}

// GET /api/store/me — returns current user's store info
export async function GET() {
    const userId = await getUserId()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const store = await prisma.store.findFirst({ where: { userId } })
        if (!store) return NextResponse.json({ error: 'Store not found' }, { status: 404 })
        return NextResponse.json({
            id: store.id,
            subdomain: store.subdomain,
            template: store.template,
            name: store.name,
        })
    } catch {
        return NextResponse.json({ template: 'sleek-minimal', subdomain: '' })
    }
}
