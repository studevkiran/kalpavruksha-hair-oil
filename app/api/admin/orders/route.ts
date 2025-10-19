import { NextResponse } from 'next/server'
import { Cashfree, CFEnvironment } from 'cashfree-pg'

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
  try {
    const { searchParams } = new URL(req.url)
    const orderIds = searchParams.get('order_ids')?.split(',') || []

    console.log('Admin Orders API - Fetching specific orders:', { orderIds })
    console.log('Cashfree environment:', environment)

    if (orderIds.length === 0) {
      return NextResponse.json({
        orders: [],
        count: 0,
        message: 'Please provide order_ids parameter. Get order IDs from Cashfree dashboard.'
      })
    }

    // Fetch detailed information for each order using Cashfree SDK
    const ordersWithDetails = await Promise.all(
      orderIds.map(async (orderId: string) => {
        try {
          const trimmedOrderId = orderId.trim()
          console.log(`Fetching details for order: ${trimmedOrderId}`)
          
          // Use Cashfree SDK to fetch order
          const response = await cashfree.PGFetchOrder(trimmedOrderId)
          const orderData = response.data

          console.log(`Order ${trimmedOrderId} fetched:`, {
            has_order_note: !!orderData.order_note,
            has_order_tags: !!orderData.order_tags,
            status: orderData.order_status
          })
          
          return orderData
        } catch (err: any) {
          console.error(`Failed to fetch order ${orderId}:`, err.message || err)
          return null
        }
      })
    )

    // Filter out null results
    const validOrders = ordersWithDetails.filter(order => order !== null)

    console.log(`Returning ${validOrders.length} orders`)

    return NextResponse.json({
      orders: validOrders,
      count: validOrders.length,
    })
  } catch (error: any) {
    console.error('Admin orders API error:', error)
    console.error('Error stack:', error.stack)
    return NextResponse.json(
      { 
        message: error.message || 'Failed to fetch orders', 
        orders: [],
        error: error.toString(),
        stack: error.stack 
      },
      { status: 500 }
    )
  }
}
