'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function PaymentStatus() {
  const searchParams = useSearchParams()
  const [show, setShow] = useState(false)
  const payment = searchParams.get('payment')

  useEffect(() => {
    if (payment) {
      setShow(true)
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => setShow(false), 10000)
      return () => clearTimeout(timer)
    }
  }, [payment])

  if (!show || !payment) return null

  const messages = {
    success: {
      title: '🎉 Payment Successful!',
      description: 'Thank you for your order! You will receive a confirmation shortly.',
      bg: 'bg-green-50',
      border: 'border-green-500',
      text: 'text-green-800'
    },
    failed: {
      title: '❌ Payment Failed',
      description: 'Your payment could not be processed. Please try again.',
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-800'
    },
    error: {
      title: '⚠️ Payment Error',
      description: 'An error occurred during payment. Please contact support if money was deducted.',
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      text: 'text-yellow-800'
    }
  }

  const msg = messages[payment as keyof typeof messages] || messages.error

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md animate-slide-in-right">
      <div className={`${msg.bg} ${msg.text} border-l-4 ${msg.border} p-4 rounded-lg shadow-lg`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{msg.title}</h3>
            <p className="text-sm">{msg.description}</p>
          </div>
          <button
            onClick={() => setShow(false)}
            className="ml-4 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
