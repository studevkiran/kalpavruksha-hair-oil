import { NextResponse } from 'next/server'
import { saveOrderStatus, getOrderStatus, getMultipleOrderStatuses } from '@/lib/kv'

// GET - Get order status(es)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const orderId = searchParams.get('order_id')
    const orderIds = searchParams.get('order_ids')?.split(',')

    if (orderIds && orderIds.length > 0) {
      // Get multiple statuses
      const statuses = await getMultipleOrderStatuses(orderIds)
      return NextResponse.json({ statuses })
    } else if (orderId) {
      // Get single status
      const status = await getOrderStatus(orderId)
      return NextResponse.json({ orderId, status })
    } else {
      return NextResponse.json({ message: 'order_id or order_ids parameter required' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error getting order status from KV:', error)
    return NextResponse.json({ message: 'Failed to get order status' }, { status: 500 })
  }
}

// POST - Save order status
export async function POST(req: Request) {
  try {
    const { orderId, status } = await req.json()
    
    if (!orderId || !status) {
      return NextResponse.json({ message: 'orderId and status required' }, { status: 400 })
    }

    await saveOrderStatus(orderId, status)
    
    return NextResponse.json({ 
      message: 'Order status saved successfully',
      orderId,
      status
    })
  } catch (error) {
    console.error('Error saving order status to KV:', error)
    return NextResponse.json({ 
      message: 'Failed to save order status' 
    }, { status: 500 })
  }
}
