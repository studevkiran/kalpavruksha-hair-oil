import { NextResponse } from 'next/server'
import { saveOrderId, getAllOrderIds } from '@/lib/kv'

// GET - Retrieve all order IDs from Vercel KV
export async function GET() {
  try {
    const orderIds = await getAllOrderIds()
    return NextResponse.json({ orderIds, count: orderIds.length })
  } catch (error) {
    console.error('Error fetching order IDs from KV:', error)
    return NextResponse.json({ orderIds: [], count: 0 }, { status: 500 })
  }
}

// POST - Save order ID to Vercel KV
export async function POST(req: Request) {
  try {
    const { orderId } = await req.json()
    
    if (!orderId) {
      return NextResponse.json({ message: 'Order ID required' }, { status: 400 })
    }

    await saveOrderId(orderId)
    
    return NextResponse.json({ 
      message: 'Order ID saved successfully',
      orderId 
    })
  } catch (error) {
    console.error('Error saving order ID to KV:', error)
    return NextResponse.json({ 
      message: 'Failed to save order ID' 
    }, { status: 500 })
  }
}
