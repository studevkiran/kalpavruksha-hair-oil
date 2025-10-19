import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')

    // Build query parameters for Cashfree API
    const params: any = {
      limit: 100, // Max orders per request
    }

    if (startDate) {
      params.start_date = startDate
    }
    if (endDate) {
      params.end_date = endDate
    }

    // Use sandbox or production URL based on environment
    const baseUrl = process.env.CASHFREE_ENV === 'PRODUCTION' 
      ? 'https://api.cashfree.com/pg' 
      : 'https://sandbox.cashfree.com/pg'

    // Fetch orders from Cashfree
    const response = await fetch(
      `${baseUrl}/orders?${new URLSearchParams(params)}`,
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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Cashfree API error:', errorData)
      throw new Error(errorData.message || 'Failed to fetch orders from Cashfree')
    }

    const data = await response.json()

    // Fetch detailed information for each order (including order_note and order_tags)
    const ordersWithDetails = await Promise.all(
      (data.orders || []).map(async (order: any) => {
        try {
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
            return detailData
          }
          
          return order
        } catch (err) {
          console.error(`Failed to fetch details for order ${order.order_id}:`, err)
          return order
        }
      })
    )

    return NextResponse.json({
      orders: ordersWithDetails,
      count: ordersWithDetails.length,
    })
  } catch (error: any) {
    console.error('Admin orders API error:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to fetch orders', orders: [] },
      { status: 500 }
    )
  }
}
