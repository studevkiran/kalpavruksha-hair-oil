'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Package, Search, CheckCircle, Clock, Truck, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface OrderData {
  order_id: string
  order_amount: number
  order_status: string
  created_at: string
  order_note: string
  fulfillment_status?: string
  payment_session_id?: string
  order_tags?: {
    customer_name?: string
    [key: string]: any
  }
  customer_details?: {
    customer_name?: string
    [key: string]: any
  }
}

function TrackOrderContent() {
  const searchParams = useSearchParams()
  const initialOrderId = searchParams.get('order_id') || ''
  
  const [orderIdInput, setOrderIdInput] = useState(initialOrderId)
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialOrderId) {
      trackOrder(initialOrderId)
    }
  }, [initialOrderId])

  const trackOrder = async (orderId?: string) => {
    const idToTrack = orderId || orderIdInput.trim()
    
    if (!idToTrack) {
      setError('Please enter your Order ID')
      return
    }

    setLoading(true)
    setError('')
    setOrderData(null)

    try {
      const response = await fetch(`/api/admin/orders?order_ids=${idToTrack}`)
      const data = await response.json()

      if (data.orders && data.orders.length > 0) {
        const order = data.orders[0]
        
        // Get fulfillment status from localStorage
        const savedStatuses = localStorage.getItem('order_fulfillment_status')
        if (savedStatuses) {
          const statuses = JSON.parse(savedStatuses)
          order.fulfillment_status = statuses[order.order_id] || 'pending'
        }
        
        setOrderData(order)
      } else {
        setError('Order not found. Please check your Order ID.')
      }
    } catch (err) {
      setError('Failed to track order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const extractProducts = (orderNote: string) => {
    if (!orderNote) return 'Your order'
    const products = orderNote.split('📍 DELIVERY:')[0].trim()
    return products || 'Your order'
  }

  const getStatusInfo = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Delivered' }
      case 'shipped':
        return { icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Shipped' }
      case 'processing':
        return { icon: Package, color: 'text-amber-600', bg: 'bg-amber-50', label: 'Processing' }
      default:
        return { icon: Clock, color: 'text-gray-600', bg: 'bg-gray-50', label: 'Pending' }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Track Your Order 📦</h1>
          <p className="text-gray-600">Enter your Order ID to check the status</p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              placeholder="Enter your Order ID (e.g., order_1234567890)"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
              onKeyPress={(e) => e.key === 'Enter' && trackOrder()}
            />
            <button
              onClick={() => trackOrder()}
              disabled={loading}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              {loading ? 'Tracking...' : 'Track'}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}
        </div>

        {/* Order Details */}
        {orderData && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Order Header */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 text-white">
              <p className="text-sm opacity-90 mb-1">Order ID</p>
              <p className="font-mono font-bold text-lg">{orderData.order_id}</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="grid md:grid-cols-2 gap-6 pb-6 border-b border-gray-200">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Order Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Customer Name:</span>
                      <p className="font-semibold text-gray-900">{orderData.order_tags?.customer_name || orderData.customer_details?.customer_name || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Product:</span>
                      <p className="font-semibold text-gray-900">{extractProducts(orderData.order_note)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Amount:</span>
                      <p className="font-semibold text-green-600">₹{orderData.order_amount}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Payment Status</h3>
                  <div className="space-y-2">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${
                      orderData.payment_session_id || orderData.order_status === 'PAID' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      <CheckCircle className="w-4 h-4" />
                      {orderData.payment_session_id || orderData.order_status === 'PAID' ? 'Paid' : 'Pending'}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Order placed on {new Date(orderData.created_at).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Delivery Status</h3>
                
                <div className="relative">
                  {/* Timeline */}
                  <div className="space-y-4">
                    {/* Pending */}
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        orderData.fulfillment_status === 'pending' ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'
                      }`}>
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold">Order Received</p>
                        <p className="text-sm text-gray-500">{new Date(orderData.created_at).toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Processing */}
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        orderData.fulfillment_status === 'processing' ? 'bg-amber-500 text-white' :
                        ['shipped', 'delivered'].includes(orderData.fulfillment_status || '') ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold">Processing</p>
                        <p className="text-sm text-gray-500">
                          {['processing', 'shipped', 'delivered'].includes(orderData.fulfillment_status || '') 
                            ? 'Your order is being prepared' 
                            : 'Waiting to process'}
                        </p>
                      </div>
                    </div>

                    {/* Shipped */}
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        orderData.fulfillment_status === 'shipped' ? 'bg-blue-500 text-white' :
                        orderData.fulfillment_status === 'delivered' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold">Shipped</p>
                        <p className="text-sm text-gray-500">
                          {['shipped', 'delivered'].includes(orderData.fulfillment_status || '')
                            ? 'On the way to you'
                            : 'Not yet shipped'}
                        </p>
                      </div>
                    </div>

                    {/* Delivered */}
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        orderData.fulfillment_status === 'delivered' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold">Delivered</p>
                        <p className="text-sm text-gray-500">
                          {orderData.fulfillment_status === 'delivered'
                            ? 'Successfully delivered!'
                            : 'Not yet delivered'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-6">
                <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
                
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Products:</span>
                    <span className="font-semibold">{extractProducts(orderData.order_note)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className={`font-semibold ${
                      orderData.order_status === 'PAID' ? 'text-green-600' : 'text-amber-600'
                    }`}>
                      {orderData.order_status === 'PAID' ? '✅ Paid' : orderData.order_status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-900 font-bold">Total Amount:</span>
                    <span className="text-xl font-bold text-amber-600">₹{orderData.order_amount}</span>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Need help?</strong> Contact us on WhatsApp
                </p>
                <a
                  href="https://wa.me/917795914892"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                >
                  💬 Chat with Us
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Back to Home */}
        <Link
          href="/"
          className="block text-center mt-8 text-amber-700 hover:text-amber-800 font-semibold"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  )
}
