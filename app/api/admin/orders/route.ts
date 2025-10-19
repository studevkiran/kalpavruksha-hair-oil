import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const orderIds = searchParams.get('order_ids')?.split(',') || []

    console.log('Admin Orders API - Fetching specific orders:', { orderIds })

    // Use sandbox or production URL based on environment
    const env = process.env.CASHFREE_ENV || 'SANDBOX'
    const baseUrl = env === 'PRODUCTION' 
      ? 'https://api.cashfree.com/pg' 
      : 'https://sandbox.cashfree.com/pg'

    console.log('Cashfree environment:', env)
    console.log('Base URL:', baseUrl)

    if (orderIds.length === 0) {
      return NextResponse.json({
        orders: [],
        count: 0,
        message: 'Please provide order_ids parameter. Get order IDs from Cashfree dashboard.'
      })
    }

    // Fetch detailed information for each order
    const ordersWithDetails = await Promise.all(
      orderIds.map(async (orderId: string) => {
        try {
          console.log(`Fetching details for order: ${orderId}`)
          const detailResponse = await fetch(
            `${baseUrl}/orders/${orderId.trim()}`,
            {
              method: 'GET',
              headers: {
                'x-client-id': process.env.CASHFREE_APP_ID!,
                'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
                'x-api-version': '2023-08-01',
                'Content-Type': 'application/json',
              },
            }
          )

          console.log(`Order ${orderId} response status:`, detailResponse.status)

          if (detailResponse.ok) {
            const detailData = await detailResponse.json()
            console.log(`Order ${orderId} details:`, {
              has_order_note: !!detailData.order_note,
              has_order_tags: !!detailData.order_tags,
              status: detailData.order_status
            })
            return detailData
          } else {
            const errorText = await detailResponse.text()
            console.error(`Error fetching ${orderId}:`, errorText)
            return null
          }
        } catch (err) {
          console.error(`Failed to fetch details for order ${orderId}:`, err)
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
