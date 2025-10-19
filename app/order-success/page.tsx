'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Copy, Package, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const [copied, setCopied] = useState(false)

  const copyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!orderId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600">No order found</p>
          <Link href="/" className="text-amber-600 hover:text-amber-700 mt-4 inline-block">
            Go to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white text-center">
            <CheckCircle className="w-20 h-20 mx-auto mb-4 animate-bounce" />
            <h1 className="text-3xl font-bold mb-2">Order Placed Successfully! 🎉</h1>
            <p className="text-green-100">Thank you for your purchase</p>
          </div>

          {/* Order ID Section */}
          <div className="p-8">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2 font-medium">Your Order ID:</p>
              <div className="flex items-center gap-3">
                <code className="flex-1 bg-white px-4 py-3 rounded-lg font-mono text-lg font-bold text-gray-900 border border-amber-300">
                  {orderId}
                </code>
                <button
                  onClick={copyOrderId}
                  className="px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                💡 Save this Order ID to track your order
              </p>
            </div>

            {/* What's Next */}
            <div className="space-y-4 mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Package className="w-6 h-6 text-amber-600" />
                What happens next?
              </h2>
              
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Order Confirmation</p>
                    <p className="text-sm text-gray-600">We've received your order and will start processing it soon</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Processing</p>
                    <p className="text-sm text-gray-600">Your Kalpavruksha Hair Oil will be carefully packed</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Shipping</p>
                    <p className="text-sm text-gray-600">We'll ship to your delivery address</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold">
                    4
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Delivery</p>
                    <p className="text-sm text-gray-600">Enjoy your natural hair care!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Track Order Button */}
            <Link
              href={`/track-order?order_id=${orderId}` as any}
              className="block w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl text-center mb-4"
            >
              📦 Track Your Order
            </Link>

            {/* Contact Section */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-3">
              <h3 className="font-bold text-gray-900 mb-3">Need Help?</h3>
              
              <a
                href="https://wa.me/917795914892"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>WhatsApp: +91 77959 14892</span>
              </a>

              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5" />
                <span>Email: support@kalpavruksha.com</span>
              </div>
            </div>

            {/* Continue Shopping */}
            <Link
              href="/"
              className="block w-full text-center mt-6 text-amber-700 hover:text-amber-800 font-semibold"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  )
}
