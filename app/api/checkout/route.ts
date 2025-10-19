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

console.log('Cashfree initialized with environment:', process.env.CASHFREE_ENV || 'SANDBOX (default)')

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const { 
    amount, 
    items = [], 
    currency = 'INR', 
    customerPhone, 
    customerName, 
    customerEmail,
    customerAddress,
    customerCity,
    customerState,
    customerPincode 
  } = body || {}
  
  // Get the actual site URL from request headers (works on Vercel)
  const host = req.headers.get('host') || 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const siteUrl = `${protocol}://${host}`
  
  // If amount is provided directly, use it. Otherwise calculate from items.
  const orderAmount = amount || (items.length > 0 ? items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0) : 0)
  
  if (!orderAmount || orderAmount < 1) {
    return NextResponse.json({ message: 'Invalid amount' }, { status: 400 })
  }

  try {
    // Generate unique order ID
    const orderId = `order_${Date.now()}`
    
    // Format delivery address for order note
    const deliveryAddress = customerAddress && customerCity && customerState && customerPincode
      ? `\n📍 DELIVERY: ${customerAddress}, ${customerCity}, ${customerState} - ${customerPincode}`
      : ''
    
    // Create order request for Cashfree
    const request = {
      order_amount: orderAmount,
      order_currency: currency,
      order_id: orderId,
      customer_details: {
        customer_id: customerPhone || `customer_${Date.now()}`,
        customer_phone: customerPhone || '9663565056',
        customer_name: customerName || 'Kalpavruksha Customer',
        customer_email: customerEmail || 'customer@kalpavruksha.com',
      },
      order_meta: {
        return_url: `${siteUrl}/api/verify?order_id=${orderId}`,
        notify_url: `${siteUrl}/api/verify`,
      },
      order_note: items.length > 0 
        ? `${items.map((item: any) => `${item.name} - ${item.size} (${item.quantity}x)`).join(', ')}${deliveryAddress}`
        : `Kalpavruksha Hair Oil Purchase${deliveryAddress}`,
      order_tags: {
        business_name: 'Kalpavruksha Hair Oil',
        store_name: 'Kalpavruksha',
        delivery_address: customerAddress || '',
        delivery_city: customerCity || '',
        delivery_state: customerState || '',
        delivery_pincode: customerPincode || '',
        full_address: `${customerAddress || ''}, ${customerCity || ''}, ${customerState || ''} - ${customerPincode || ''}`.trim()
      }
    }
    
    // Create order with Cashfree
    const response = await cashfree.PGCreateOrder(request)
    
    // Save order ID for tracking - using await to ensure it completes
    try {
      await fetch(`${siteUrl}/api/order-tracking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId })
      })
      console.log('Order ID saved to tracking:', orderId)
    } catch (trackingError) {
      console.error('Failed to save order ID for tracking:', trackingError)
      // Continue anyway, order is still created in Cashfree
    }
    
    // Save order to database (optional - skip if DB not available)
    try {
      await prisma.order.create({ 
        data: { 
          razorpayOrderId: orderId, // Reusing this field for Cashfree order ID
          amount: orderAmount, 
          currency, 
          status: 'created' 
        } 
      })
    } catch (dbError) {
      // Database not available (e.g., on Vercel without Postgres)
      // Order will still be tracked by Cashfree
      console.log('Database not available, order tracked by Cashfree only')
    }
    
    return NextResponse.json({
      orderId: orderId,
      sessionId: response.data.payment_session_id,
      amount: orderAmount,
      currency: currency,
    })
  } catch (e: any) {
    console.error('Checkout error:', e)
    return NextResponse.json({ message: e.message || 'Failed to create order' }, { status: 500 })
  }
}
