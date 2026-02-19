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

// POST /api/store/update-template — updates the store's template
export async function POST(request: NextRequest) {
    const userId = await getUserId()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { templateId } = body

    if (!templateId || typeof templateId !== 'string') {
        return NextResponse.json({ error: 'Invalid template ID' }, { status: 400 })
    }

    try {
        const store = await prisma.store.findFirst({ where: { userId } })
        if (!store) return NextResponse.json({ error: 'Store not found' }, { status: 404 })

        const updated = await prisma.store.update({
            where: { id: store.id },
            data: { template: templateId },
        })

        return NextResponse.json({ success: true, template: updated.template })
    } catch (error) {
        console.error('[api/store/update-template]', error)
        return NextResponse.json({ error: 'Failed to update template' }, { status: 500 })
    }
}
