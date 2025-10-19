'use client'

import { useState, useEffect } from 'react'
import { Package, CheckCircle, Truck, Clock, Copy, Download, RefreshCw, Search } from 'lucide-react'

interface OrderDetail {
  orderId: string
  amount: number
  currency: string
  orderStatus: string
  paymentStatus: string
  customerName: string
  customerPhone: string
  customerEmail: string
  deliveryAddress: string
  deliveryCity: string
  deliveryState: string
  deliveryPincode: string
  products: Array<{ name: string; quantity: number; price: number }>
  createdAt: string
  fulfillmentStatus: string
}

export default function OwnerDashboard() {
  const [orders, setOrders] = useState<OrderDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Auto-load all orders on mount
  useEffect(() => {
    loadAllOrders()
  }, [])

  const loadAllOrders = async () => {
    setLoading(true)
    try {
      // Step 1: Get all tracked order IDs
      const trackingResponse = await fetch('/api/order-tracking')
      const { orderIds } = await trackingResponse.json()

      if (!orderIds || orderIds.length === 0) {
        setOrders([])
        setLoading(false)
        return
      }

      // Step 2: Fetch details for all orders
      const ordersResponse = await fetch(`/api/admin/orders?order_ids=${orderIds.join(',')}`)
      const data = await ordersResponse.json()

      if (data.success && data.orders) {
        // Transform orders to include fulfillment status from localStorage
        const ordersWithDetails = data.orders.map((order: any) => {
          const fulfillmentStatus = localStorage.getItem(`order_${order.order_id}_fulfillment`) || 'pending'
          
          // Parse delivery address from order_note
          const deliveryMatch = order.order_note?.match(/📍 DELIVERY:(.*?)(?=\n\n|$)/s)
          const deliveryText = deliveryMatch ? deliveryMatch[1].trim() : ''
          
          // Extract customer info from order_tags
          const tags = order.order_tags || {}
          
          // Parse products from order_note
          const productsMatch = order.order_note?.match(/🛍️ PRODUCTS:(.*?)(?=📍|$)/s)
          const productsText = productsMatch ? productsMatch[1].trim() : ''
          const productLines = productsText.split('\n').filter((line: string) => line.includes('x ₹'))
          const products = productLines.map((line: string) => {
            const match = line.match(/- (.+?) x ₹([\d,]+) \(Qty: (\d+)\)/)
            if (match) {
              return {
                name: match[1].trim(),
                price: parseInt(match[2].replace(/,/g, '')),
                quantity: parseInt(match[3])
              }
            }
            return { name: 'Unknown', price: 0, quantity: 0 }
          })

          return {
            orderId: order.order_id,
            amount: order.order_amount,
            currency: order.order_currency,
            orderStatus: order.order_status,
            paymentStatus: order.payment_session_id ? 'PAID' : 'PENDING',
            customerName: tags.customer_name || 'N/A',
            customerPhone: tags.customer_phone || 'N/A',
            customerEmail: order.customer_details?.customer_email || tags.customer_email || 'N/A',
            deliveryAddress: tags.delivery_address || deliveryText.split('\n')[0] || 'N/A',
            deliveryCity: tags.delivery_city || 'N/A',
            deliveryState: tags.delivery_state || 'N/A',
            deliveryPincode: tags.delivery_pincode || 'N/A',
            products: products,
            createdAt: order.created_at,
            fulfillmentStatus: fulfillmentStatus
          }
        })

        setOrders(ordersWithDetails)
      }
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateFulfillmentStatus = (orderId: string, status: string) => {
    localStorage.setItem(`order_${orderId}_fulfillment`, status)
    setOrders(orders.map(order => 
      order.orderId === orderId ? { ...order, fulfillmentStatus: status } : order
    ))
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const exportToCSV = () => {
    const headers = [
      'Order ID', 'Date', 'Customer Name', 'Phone', 'Email', 
      'Products', 'Amount', 'Payment Status', 'Fulfillment Status',
      'Delivery Address', 'City', 'State', 'Pincode'
    ]

    const rows = filteredOrders.map(order => [
      order.orderId,
      new Date(order.createdAt).toLocaleDateString(),
      order.customerName,
      order.customerPhone,
      order.customerEmail,
      order.products.map(p => `${p.name} (${p.quantity})`).join('; '),
      `${order.currency} ${order.amount}`,
      order.paymentStatus,
      order.fulfillmentStatus,
      order.deliveryAddress,
      order.deliveryCity,
      order.deliveryState,
      order.deliveryPincode
    ])

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm)

    const matchesStatus = statusFilter === 'all' || order.fulfillmentStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'processing': return 'text-blue-600 bg-blue-50'
      case 'shipped': return 'text-purple-600 bg-purple-50'
      case 'delivered': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'processing': return <Package className="w-4 h-4" />
      case 'shipped': return <Truck className="w-4 h-4" />
      case 'delivered': return <CheckCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-amber-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading all orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Owner Dashboard
              </h1>
              <p className="text-gray-600">
                Total Orders: <span className="font-semibold text-amber-600">{orders.length}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={loadAllOrders}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                disabled={filteredOrders.length === 0}
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by Order ID, Name, or Phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchTerm || statusFilter !== 'all' ? 'No matching orders found' : 'No orders yet'}
            </h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Orders will appear here automatically when customers make purchases'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.orderId} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Order Info */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">Order ID</h3>
                        <button
                          onClick={() => copyToClipboard(order.orderId, order.orderId)}
                          className="text-amber-600 hover:text-amber-700"
                          title="Copy Order ID"
                        >
                          {copiedId === order.orderId ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <p className="font-mono text-sm text-gray-600 break-all">{order.orderId}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Date</h3>
                      <p className="text-gray-600">
                        {new Date(order.createdAt).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Amount</h3>
                      <p className="text-xl font-bold text-green-600">
                        {order.currency} {order.amount.toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Payment Status</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        order.paymentStatus === 'PAID' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>

                  {/* Middle Column - Customer & Delivery */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Customer Details</h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium">Name:</span> {order.customerName}
                        </p>
                        <p className="text-gray-600 flex items-center justify-between">
                          <span><span className="font-medium">Phone:</span> {order.customerPhone}</span>
                          <button
                            onClick={() => copyToClipboard(order.customerPhone, `phone-${order.orderId}`)}
                            className="text-amber-600 hover:text-amber-700"
                          >
                            {copiedId === `phone-${order.orderId}` ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Email:</span> {order.customerEmail}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Delivery Address</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>{order.deliveryAddress}</p>
                        <p>{order.deliveryCity}, {order.deliveryState} - {order.deliveryPincode}</p>
                        <button
                          onClick={() => copyToClipboard(
                            `${order.deliveryAddress}\n${order.deliveryCity}, ${order.deliveryState} - ${order.deliveryPincode}`,
                            `address-${order.orderId}`
                          )}
                          className="flex items-center gap-1 text-amber-600 hover:text-amber-700 mt-2"
                        >
                          {copiedId === `address-${order.orderId}` ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Address</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Products & Status */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Products</h3>
                      <div className="space-y-2">
                        {order.products.map((product, idx) => (
                          <div key={idx} className="text-sm bg-gray-50 p-2 rounded">
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-gray-600">
                              Qty: {product.quantity} × ₹{product.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Fulfillment Status</h3>
                      <select
                        value={order.fulfillmentStatus}
                        onChange={(e) => updateFulfillmentStatus(order.orderId, e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border-2 font-medium focus:ring-2 focus:ring-amber-500 ${
                          getStatusColor(order.fulfillmentStatus)
                        }`}
                      >
                        <option value="pending">⏳ Pending</option>
                        <option value="processing">📦 Processing</option>
                        <option value="shipped">🚚 Shipped</option>
                        <option value="delivered">✅ Delivered</option>
                      </select>
                      
                      <div className="flex items-center gap-2 mt-3 text-sm">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded ${getStatusColor(order.fulfillmentStatus)}`}>
                          {getStatusIcon(order.fulfillmentStatus)}
                          <span className="capitalize">{order.fulfillmentStatus}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
