import { NextResponse } from 'next/server'
import { getRazorpay } from '@/lib/razorpay'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const { amount, currency = 'INR', name = 'Kalpavruksha Hair Oil', quantity = 1 } = body || {}
  if (!amount || amount < 100) return NextResponse.json({ message: 'Invalid amount' }, { status: 400 })

  try {
    const razorpay = getRazorpay()
    const order = await razorpay.orders.create({ amount, currency, notes: { name, quantity: String(quantity) } })
    await prisma.order.create({ data: { razorpayOrderId: order.id, amount, currency, status: 'created' } })
    return NextResponse.json(order)
  } catch (e: any) {
    return NextResponse.json({ message: e.message || 'Failed to create order' }, { status: 500 })
  }
}
