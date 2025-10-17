import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body || {}
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ message: 'Missing payment verification fields' }, { status: 400 })
  }

  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) return NextResponse.json({ message: 'Server not configured' }, { status: 500 })

  const hmac = crypto
    .createHmac('sha256', secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex')

  const valid = hmac === razorpay_signature

  try {
    await prisma.order.update({
      where: { razorpayOrderId: razorpay_order_id },
      data: { status: valid ? 'paid' : 'failed' }
    })
  } catch (e) {
    // ignore update error
  }

  if (!valid) return NextResponse.json({ message: 'Invalid signature' }, { status: 400 })
  return NextResponse.json({ ok: true })
}
