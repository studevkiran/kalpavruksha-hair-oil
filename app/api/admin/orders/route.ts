import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')

    console.log('Admin Orders API - Fetching orders:', { startDate, endDate })

    // Use sandbox or production URL based on environment
    const baseUrl = process.env.CASHFREE_ENV === 'PRODUCTION' 
      ? 'https://api.cashfree.com/pg' 
      : 'https://sandbox.cashfree.com/pg'

    // Build query parameters for Cashfree API
    // Note: Cashfree doesn't support date filtering in orders list API
    // We'll fetch all recent orders and filter client-side if needed
    const params: any = {
      limit: 100, // Max orders per request
    }

    const url = `${baseUrl}/orders?${new URLSearchParams(params)}`
    console.log('Fetching from:', url)

    // Fetch orders from Cashfree
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-client-id': process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json',
      },
    })

    console.log('Cashfree API response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Cashfree API error response:', errorText)
      
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }
      
      throw new Error(errorData.message || `Cashfree API returned ${response.status}`)
    }

    const data = await response.json()
    console.log('Cashfree API response:', { 
      orderCount: data?.length || data?.orders?.length || 0,
      hasOrders: !!data?.orders 
    })

    // Get orders array from response
    const orders = data.orders || data || []
    console.log('Processing orders:', orders.length)

    if (orders.length === 0) {
      console.log('No orders found in Cashfree')
      return NextResponse.json({
        orders: [],
        count: 0,
        message: 'No orders found. Make sure you have created test orders in Cashfree.'
      })
    }

    // Fetch detailed information for each order (including order_note and order_tags)
    const ordersWithDetails = await Promise.all(
      orders.map(async (order: any) => {
        try {
          console.log(`Fetching details for order: ${order.order_id}`)
          const detailResponse = await fetch(
            `${baseUrl}/orders/${order.order_id}`,
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

          if (detailResponse.ok) {
            const detailData = await detailResponse.json()
            console.log(`Order ${order.order_id} details:`, {
              has_order_note: !!detailData.order_note,
              has_order_tags: !!detailData.order_tags,
              status: detailData.order_status
            })
            return detailData
          }
          
          console.log(`Could not fetch details for ${order.order_id}, using basic info`)
          return order
        } catch (err) {
          console.error(`Failed to fetch details for order ${order.order_id}:`, err)
          return order
        }
      })
    )

    console.log(`Returning ${ordersWithDetails.length} orders`)

    return NextResponse.json({
      orders: ordersWithDetails,
      count: ordersWithDetails.length,
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
