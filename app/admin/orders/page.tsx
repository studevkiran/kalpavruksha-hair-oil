'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'

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
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const fetchOrders = async () => {
    setLoading(true)
    setError('')
    
    try {
      const params = new URLSearchParams()
      if (startDate) params.append('start_date', startDate)
      if (endDate) params.append('end_date', endDate)
      
      const response = await fetch(`/api/admin/orders?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders')
      }
      
      const data = await response.json()
      setOrders(data.orders || [])
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
      'Status',
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
          <h2 className="text-lg font-semibold mb-4">Filter Orders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchOrders}
                disabled={loading}
                className="w-full px-6 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Loading...' : '🔍 Fetch Orders'}
              </button>
            </div>
            <div className="flex items-end">
              <button
                onClick={exportToCSV}
                disabled={orders.length === 0}
                className="w-full px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
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
              <p className="text-lg mb-2">No orders found</p>
              <p className="text-sm">Select a date range and click "Fetch Orders"</p>
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
                      Status
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
                        {order.order_id}
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
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.order_status === 'PAID' 
                            ? 'bg-green-100 text-green-800'
                            : order.order_status === 'ACTIVE'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {order.order_status}
                        </span>
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
