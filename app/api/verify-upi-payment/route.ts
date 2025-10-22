import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function POST(request: NextRequest) {
  try {
    const { orderId, transactionId, upiId, amount } = await request.json()

    if (!orderId || !transactionId || !upiId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Store UPI payment verification details
    const paymentData = {
      orderId,
      transactionId,
      upiId,
      amount,
      paymentMethod: 'upi_qr',
      status: 'pending_verification', // Will be manually verified by owner
      submittedAt: new Date().toISOString(),
      verified: false
    }

    // Store in KV with order ID as key
    await kv.set(`upi_payment_${orderId}`, JSON.stringify(paymentData))

    // Also update the order status to indicate UPI payment submitted
    const orderKey = `order_${orderId}`
    const existingOrder = await kv.get(orderKey)

    if (existingOrder) {
      const orderData = JSON.parse(existingOrder as string)
      orderData.paymentStatus = 'upi_pending_verification'
      orderData.upiTransactionId = transactionId
      orderData.upiId = upiId
      await kv.set(orderKey, JSON.stringify(orderData))
    }

    return NextResponse.json({
      success: true,
      message: 'UPI payment details submitted for verification'
    })

  } catch (error) {
    console.error('UPI payment verification error:', error)
    return NextResponse.json(
      { error: 'Failed to process UPI payment verification' },
      { status: 500 }
    )
  }
}