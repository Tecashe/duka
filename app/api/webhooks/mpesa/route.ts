import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// M-Pesa callback handler
// This will be called by Safaricom when a payment is completed
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('[v0] M-Pesa callback received:', body)

    // Extract M-Pesa transaction details
    // Structure varies based on M-Pesa API (Till/Paybill)
    const {
      TransactionType,
      TransID, // M-Pesa receipt number
      TransAmount,
      BillRefNumber, // Order reference
      MSISDN, // Customer phone
      TransTime
    } = body.Body?.stkCallback?.CallbackMetadata || body

    if (!TransID || !BillRefNumber) {
      console.log('[v0] Invalid M-Pesa callback data')
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }

    // Find order by reference
    const order = await prisma.order.findUnique({
      where: { reference: BillRefNumber },
      include: { store: true }
    })

    if (!order) {
      console.log('[v0] Order not found:', BillRefNumber)
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Update order with payment details
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: 'paid',
        mpesaReceipt: TransID,
        status: 'confirmed',
        confirmedAt: new Date()
      }
    })

    // Add timeline entry
    await prisma.orderTimeline.create({
      data: {
        orderId: order.id,
        status: 'confirmed',
        note: `Payment received - ${TransID}`
      }
    })

    console.log('[v0] Payment confirmed for order:', order.reference)

    // TODO: Send confirmation SMS/Email to customer
    // TODO: Send notification to store owner

    return NextResponse.json({ 
      ResultCode: 0,
      ResultDesc: 'Success'
    })
  } catch (error) {
    console.error('[v0] M-Pesa webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
