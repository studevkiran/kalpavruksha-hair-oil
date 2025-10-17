import { NextResponse } from 'next/server'
import { getRazorpay } from '@/lib/razorpay'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const { amount, items = [], currency = 'INR' } = body || {}
  
  // If amount is provided directly, use it. Otherwise calculate from items.
  const orderAmount = amount || (items.length > 0 ? items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0) : 0)
  
  if (!orderAmount || orderAmount < 100) {
    return NextResponse.json({ message: 'Invalid amount' }, { status: 400 })
  }

  try {
    const razorpay = getRazorpay()
    
    // Create order notes with cart items
    const notes: any = {}
    if (items.length > 0) {
      items.forEach((item: any, index: number) => {
        notes[`item_${index + 1}`] = `${item.name} - ${item.size} (${item.quantity}x)`
      })
    }
    
    const order = await razorpay.orders.create({ 
      amount: orderAmount * 100, // Razorpay expects paise
      currency, 
      notes 
    })
    
    await prisma.order.create({ 
      data: { 
        razorpayOrderId: order.id, 
        amount: orderAmount, 
        currency, 
        status: 'created' 
      } 
    })
    
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (e: any) {
    console.error('Checkout error:', e)
    return NextResponse.json({ message: e.message || 'Failed to create order' }, { status: 500 })
  }
}
