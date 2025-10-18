import { NextResponse } from 'next/server'
import { Cashfree, CFEnvironment } from 'cashfree-pg'
import { prisma } from '@/lib/prisma'

// Initialize Cashfree
const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID!,
  process.env.CASHFREE_SECRET_KEY!
)

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const orderId = searchParams.get('order_id')

  if (!orderId) {
    return NextResponse.json({ message: 'Missing order_id' }, { status: 400 })
  }

  try {
    // Fetch order details from Cashfree
    const response = await cashfree.PGFetchOrder(orderId)
    const orderData = response.data

    // Update order status in database based on Cashfree response
    const status = orderData.order_status === 'PAID' ? 'paid' : 
                   orderData.order_status === 'ACTIVE' ? 'pending' : 
                   'failed'

    await prisma.order.update({
      where: { razorpayOrderId: orderId },
      data: { status }
    })

    // Redirect based on payment status
    if (status === 'paid') {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/?payment=success`)
    } else {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/?payment=failed`)
    }
  } catch (e: any) {
    console.error('Verify error:', e)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/?payment=error`)
  }
}

export async function POST(req: Request) {
  // Handle Cashfree webhooks
  const body = await req.json().catch(() => ({}))
  const { order_id, order_status } = body?.data || {}

  if (!order_id) {
    return NextResponse.json({ message: 'Missing order_id' }, { status: 400 })
  }

  try {
    const status = order_status === 'PAID' ? 'paid' : 
                   order_status === 'ACTIVE' ? 'pending' : 
                   'failed'

    await prisma.order.update({
      where: { razorpayOrderId: order_id },
      data: { status }
    })

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('Webhook error:', e)
    return NextResponse.json({ message: 'Failed to process webhook' }, { status: 500 })
  }
}
