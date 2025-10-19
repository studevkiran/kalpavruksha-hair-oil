import { NextResponse } from 'next/server'
import { Cashfree, CFEnvironment } from 'cashfree-pg'
import { prisma } from '@/lib/prisma'

// Determine environment - default to SANDBOX if not set
const environment = process.env.CASHFREE_ENV === 'PRODUCTION' 
  ? CFEnvironment.PRODUCTION 
  : CFEnvironment.SANDBOX

// Initialize Cashfree
const cashfree = new Cashfree(
  environment,
  process.env.CASHFREE_APP_ID!,
  process.env.CASHFREE_SECRET_KEY!
)

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const orderId = searchParams.get('order_id')
  
  // Get the actual site URL from request headers
  const host = req.headers.get('host') || 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const siteUrl = `${protocol}://${host}`

  if (!orderId) {
    return NextResponse.json({ message: 'Missing order_id' }, { status: 400 })
  }

  try {
    // Fetch order details from Cashfree
    const response = await cashfree.PGFetchOrder(orderId)
    const orderData = response.data

    // Update order status in database based on Cashfree response (optional)
    const status = orderData.order_status === 'PAID' ? 'paid' : 
                   orderData.order_status === 'ACTIVE' ? 'pending' : 
                   'failed'

    try {
      await prisma.order.update({
        where: { razorpayOrderId: orderId },
        data: { status }
      })
    } catch (dbError) {
      // Database not available - order still tracked by Cashfree
      console.log('Database not available, using Cashfree status only')
    }

    // Redirect based on payment status
    if (status === 'paid') {
      return NextResponse.redirect(`${siteUrl}/?payment=success`)
    } else {
      return NextResponse.redirect(`${siteUrl}/?payment=failed`)
    }
  } catch (e: any) {
    console.error('Verify error:', e)
    return NextResponse.redirect(`${siteUrl}/?payment=error`)
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

    try {
      await prisma.order.update({
        where: { razorpayOrderId: order_id },
        data: { status }
      })
    } catch (dbError) {
      // Database not available - webhook still received
      console.log('Database not available for webhook update')
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('Webhook error:', e)
    return NextResponse.json({ message: 'Failed to process webhook' }, { status: 500 })
  }
}
