'use client'

import { useState, useEffect } from 'react'
import { Download, Package, CheckCircle, XCircle, Clock, Truck } from 'lucide-react'

interface Order {
  order_id: string
  order_amount: number
  order_currency: string
  order_status: string
  created_at: string
  customer_details: {
    customer_name: string
    customer_phone: string
    customer_email: string
  }
  order_note: string
  order_tags?: {
    delivery_address?: string
    delivery_city?: string
    delivery_state?: string
    delivery_pincode?: string
    full_address?: string
  }
  fulfillment_status?: 'pending' | 'processing' | 'shipped' | 'delivered'
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [orderIdsInput, setOrderIdsInput] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'PAID' | 'ACTIVE' | 'pending' | 'shipped'>('all')

  // Load fulfillment status from localStorage
  useEffect(() => {
    const savedStatuses = localStorage.getItem('order_fulfillment_status')
    if (savedStatuses) {
      const statuses = JSON.parse(savedStatuses)
      setOrders(prevOrders => 
        prevOrders.map(order => ({
          ...order,
          fulfillment_status: statuses[order.order_id] || 'pending'
        }))
      )
    }
  }, [])

  const updateFulfillmentStatus = (orderId: string, status: 'pending' | 'processing' | 'shipped' | 'delivered') => {
    setOrders(prevOrders => {
      const updated = prevOrders.map(order => 
        order.order_id === orderId ? { ...order, fulfillment_status: status } : order
      )
      
      // Save to localStorage
      const statuses: Record<string, string> = {}
      updated.forEach(order => {
        if (order.fulfillment_status) {
          statuses[order.order_id] = order.fulfillment_status
        }
      })
      localStorage.setItem('order_fulfillment_status', JSON.stringify(statuses))
      
      return updated
    })
  }

  const fetchOrders = async () => {
    setLoading(true)
    setError('')
    
    try {
      if (!orderIdsInput.trim()) {
        throw new Error('Please enter at least one Order ID')
      }

      const params = new URLSearchParams()
      params.append('order_ids', orderIdsInput.trim())
      
      console.log('Fetching orders with params:', params.toString())
      const response = await fetch(`/api/admin/orders?${params.toString()}`)
      
      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)
      
      if (!response.ok) {
        throw new Error(data.message || `Server returned ${response.status}`)
      }
      
      setOrders(data.orders || [])
      
      if (data.message) {
        setError(data.message)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    if (orders.length === 0) {
      alert('No orders to export')
      return
    }

    // Create CSV header
    const headers = [
      'Date & Time',
      'Order ID',
      'Amount',
      'Payment Status',
      'Fulfillment Status',
      'Customer Name',
      'Customer Phone',
      'Customer Email',
      'Products',
      'Delivery Address',
      'City',
      'State',
      'Pincode',
      'Full Address'
    ]

    // Create CSV rows
    const rows = orders.map(order => {
      // Extract delivery address from order_note
      const noteMatch = order.order_note?.match(/📍 DELIVERY: (.+)/) || []
      const deliveryFromNote = noteMatch[1] || ''
      
      // Get products (everything before 📍 DELIVERY:)
      const products = order.order_note?.split('📍 DELIVERY:')[0].trim() || ''
      
      return [
        new Date(order.created_at).toLocaleString(),
        order.order_id,
        order.order_amount,
        order.order_status,
        order.fulfillment_status || 'pending',
        order.customer_details?.customer_name || '',
        order.customer_details?.customer_phone || '',
        order.customer_details?.customer_email || '',
        products,
        order.order_tags?.delivery_address || '',
        order.order_tags?.delivery_city || '',
        order.order_tags?.delivery_state || '',
        order.order_tags?.delivery_pincode || '',
        deliveryFromNote || order.order_tags?.full_address || ''
      ].map(field => `"${String(field).replace(/"/g, '""')}"`) // Escape quotes
    })

    // Combine into CSV
    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    // Download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `orders_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const extractDeliveryAddress = (order: Order) => {
    // Try to extract from order_note first
    const noteMatch = order.order_note?.match(/📍 DELIVERY: (.+)/) || []
    if (noteMatch[1]) return noteMatch[1]
    
    // Fallback to order_tags
    if (order.order_tags?.full_address) return order.order_tags.full_address
    
    // Construct from parts
    const parts = [
      order.order_tags?.delivery_address,
      order.order_tags?.delivery_city,
      order.order_tags?.delivery_state,
      order.order_tags?.delivery_pincode
    ].filter(Boolean)
    
    return parts.length > 0 ? parts.join(', ') : 'No address provided'
  }

  const extractProducts = (order: Order) => {
    if (!order.order_note) return 'No products listed'
    
    // Get everything before the delivery address marker
    const products = order.order_note.split('📍 DELIVERY:')[0].trim()
    return products || 'No products listed'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📦 Order Management
          </h1>
          <p className="text-gray-600">
            View and export orders with complete delivery addresses
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Fetch Orders</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Order IDs (comma-separated)
              </label>
              <input
                type="text"
                value={orderIdsInput}
                onChange={(e) => setOrderIdsInput(e.target.value)}
                placeholder="e.g., order_123ABC, order_456DEF, order_789GHI"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
              <p className="text-sm text-gray-500 mt-2">
                💡 Get Order IDs from your Cashfree Sandbox dashboard → Transactions
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={fetchOrders}
                disabled={loading || !orderIdsInput.trim()}
                className="px-6 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Loading...' : '🔍 Fetch Orders'}
              </button>
              <button
                onClick={exportToCSV}
                disabled={orders.length === 0}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">
              Orders ({orders.length})
            </h2>
          </div>
          
          {orders.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">No orders found</p>
              <p className="text-sm">Enter Order IDs above and click "Fetch Orders"</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivery Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fulfillment
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.order_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(order.created_at).toLocaleDateString()}<br />
                        <span className="text-xs text-gray-500">
                          {new Date(order.created_at).toLocaleTimeString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        <div className="max-w-[150px] truncate" title={order.order_id}>
                          {order.order_id}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="font-medium">{order.customer_details?.customer_name}</div>
                        <div className="text-gray-500">{order.customer_details?.customer_phone}</div>
                        <div className="text-xs text-gray-400">{order.customer_details?.customer_email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="max-w-xs">{extractProducts(order)}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="max-w-xs">
                          <div className="font-medium text-amber-700">📍 {extractDeliveryAddress(order)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        ₹{order.order_amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.order_status === 'PAID' 
                            ? 'bg-green-100 text-green-800'
                            : order.order_status === 'ACTIVE'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {order.order_status === 'PAID' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                          {order.order_status === 'ACTIVE' && <Clock className="w-3 h-3 inline mr-1" />}
                          {order.order_status === 'PAID' ? 'Paid' : order.order_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.fulfillment_status || 'pending'}
                          onChange={(e) => updateFulfillmentStatus(order.order_id, e.target.value as any)}
                          disabled={order.order_status !== 'PAID'}
                          className={`px-2 py-1 text-xs font-semibold rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                            order.fulfillment_status === 'delivered' 
                              ? 'bg-green-100 border-green-300 text-green-800'
                              : order.fulfillment_status === 'shipped'
                              ? 'bg-blue-100 border-blue-300 text-blue-800'
                              : order.fulfillment_status === 'processing'
                              ? 'bg-amber-100 border-amber-300 text-amber-800'
                              : 'bg-gray-100 border-gray-300 text-gray-800'
                          } ${order.order_status !== 'PAID' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <option value="pending">📋 Pending</option>
                          <option value="processing">⚙️ Processing</option>
                          <option value="shipped">📦 Shipped</option>
                          <option value="delivered">✅ Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
