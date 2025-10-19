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
  const [manualOrderId, setManualOrderId] = useState('')
  const [showAddOrder, setShowAddOrder] = useState(false)
  const [pendingStatusChanges, setPendingStatusChanges] = useState<Record<string, string>>({})
  const [updatingOrders, setUpdatingOrders] = useState<Set<string>>(new Set())

  // Auto-load all orders on mount
  useEffect(() => {
    loadAllOrders()
  }, [])

  const loadAllOrders = async () => {
    setLoading(true)
    try {
      // Get order IDs from localStorage (saved by owner manually or from past visits)
      const savedOrderIds = JSON.parse(localStorage.getItem('tracked_order_ids') || '[]')
      
      // Step 1: Try to get order IDs from tracking API (may not work on Vercel)
      let orderIds = [...savedOrderIds]
      try {
        const trackingResponse = await fetch('/api/order-tracking')
        const data = await trackingResponse.json()
        if (data.orderIds && data.orderIds.length > 0) {
          // Merge with localStorage
          orderIds = [...new Set([...data.orderIds, ...savedOrderIds])]
        }
      } catch (e) {
        console.log('Tracking API not available, using localStorage only')
      }

      if (!orderIds || orderIds.length === 0) {
        setOrders([])
        setLoading(false)
        return
      }

      // Step 2: Fetch details for all orders
      const ordersResponse = await fetch(`/api/admin/orders?order_ids=${orderIds.join(',')}`)
      const data = await ordersResponse.json()

      console.log('Orders API response:', data)

      if (data.orders && data.orders.length > 0) {
        // Save valid order IDs back to localStorage
        const validOrderIds = data.orders.map((o: any) => o.order_id)
        localStorage.setItem('tracked_order_ids', JSON.stringify(validOrderIds))
        
        // Transform orders to include fulfillment status from localStorage
        const ordersWithDetails = data.orders.map((order: any) => {
          const fulfillmentStatus = localStorage.getItem(`order_${order.order_id}_fulfillment`) || 'pending'
          
          // Parse delivery address from order_note
          const deliveryMatch = order.order_note?.match(/📍 DELIVERY:\s*(.+?)(?=\n|$)/s)
          const deliveryText = deliveryMatch ? deliveryMatch[1].trim() : ''
          
          // Extract customer info from order_tags
          const tags = order.order_tags || {}
          
          // Parse products from order_note (format: "Product Name - Size (quantity)")
          const orderNote = order.order_note || ''
          const products: Array<{ name: string; quantity: number; price: number }> = []
          
          // Try to parse product info from order_note
          if (orderNote && !orderNote.includes('📍')) {
            // Format: "Kalpavruksha Hair Oil - 100ml (1), Kalpavruksha Hair Oil - 200ml (2)"
            const productParts = orderNote.split(/📍|,/).filter((part: string) => part.trim())
            productParts.forEach((part: string) => {
              const match = part.match(/(.+?)\s*-\s*(.+?)\s*\((\d+)\)/)
              if (match) {
                products.push({
                  name: `${match[1].trim()} - ${match[2].trim()}`,
                  quantity: parseInt(match[3]),
                  price: match[2].includes('200ml') ? 399 : 249 // Default prices
                })
              }
            })
          }
          
          // If no products found, add default
          if (products.length === 0) {
            products.push({
              name: 'Kalpavruksha Hair Oil',
              quantity: 1,
              price: Math.round(order.order_amount)
            })
          }

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

  const addManualOrder = async () => {
    if (!manualOrderId.trim()) return
    
    try {
      // Get existing order IDs from localStorage
      const savedOrderIds = JSON.parse(localStorage.getItem('tracked_order_ids') || '[]')
      
      // Add new order ID
      const updatedIds = [manualOrderId.trim(), ...savedOrderIds.filter((id: string) => id !== manualOrderId.trim())]
      localStorage.setItem('tracked_order_ids', JSON.stringify(updatedIds))
      
      // Reload orders
      setManualOrderId('')
      setShowAddOrder(false)
      await loadAllOrders()
    } catch (error) {
      console.error('Error adding order:', error)
    }
  }

  const updateFulfillmentStatus = (orderId: string, status: string) => {
    // Store pending change (not saved until Update button clicked)
    setPendingStatusChanges(prev => ({ ...prev, [orderId]: status }))
    setOrders(orders.map(order => 
      order.orderId === orderId ? { ...order, fulfillmentStatus: status } : order
    ))
  }

  const saveStatusUpdate = async (orderId: string) => {
    const newStatus = pendingStatusChanges[orderId] || orders.find(o => o.orderId === orderId)?.fulfillmentStatus
    if (!newStatus) return

    try {
      // Save to Vercel KV (online storage)
      const response = await fetch('/api/order-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus })
      })

      if (!response.ok) {
        throw new Error('Failed to save status')
      }

      // Also save to localStorage as backup
      const allStatuses = JSON.parse(localStorage.getItem('order_fulfillment_status') || '{}')
      allStatuses[orderId] = newStatus
      localStorage.setItem('order_fulfillment_status', JSON.stringify(allStatuses))
      localStorage.setItem(`order_${orderId}_fulfillment`, newStatus)

      // Clear pending change
      setPendingStatusChanges(prev => {
        const updated = { ...prev }
        delete updated[orderId]
        return updated
      })

      // Show brief confirmation
      setUpdatingOrders(prev => new Set(prev).add(orderId))
      setTimeout(() => {
        setUpdatingOrders(prev => {
          const updated = new Set(prev)
          updated.delete(orderId)
          return updated
        })
      }, 2000)
    } catch (error) {
      console.error('Error saving status:', error)
      alert('Failed to update status. Please try again.')
    }
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
                onClick={() => setShowAddOrder(!showAddOrder)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Package className="w-4 h-4" />
                Add Order
              </button>
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

          {/* Add Order Manual Input */}
          {showAddOrder && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Add Order Manually</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  id="manualOrderId"
                  name="manualOrderId"
                  placeholder="Enter Order ID (e.g., order_1760894670561)"
                  value={manualOrderId}
                  onChange={(e) => setManualOrderId(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addManualOrder()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Order ID input"
                />
                <button
                  onClick={addManualOrder}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddOrder(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                💡 Copy the Order ID from Cashfree dashboard or order success page
              </p>
            </div>
          )}

          {/* Filters */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="searchOrders"
                  name="searchOrders"
                  placeholder="Search by Order ID, Name, or Phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  aria-label="Search orders"
                />
              </div>
            </div>

            <select
              id="statusFilter"
              name="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              aria-label="Filter by status"
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
                        id={`fulfillment-${order.orderId}`}
                        name={`fulfillment-${order.orderId}`}
                        value={order.fulfillmentStatus}
                        onChange={(e) => updateFulfillmentStatus(order.orderId, e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border-2 font-medium focus:ring-2 focus:ring-amber-500 ${
                          getStatusColor(order.fulfillmentStatus)
                        }`}
                        aria-label={`Fulfillment status for order ${order.orderId}`}
                      >
                        <option value="pending">⏳ Pending</option>
                        <option value="processing">📦 Processing</option>
                        <option value="shipped">🚚 Shipped</option>
                        <option value="delivered">✅ Delivered</option>
                      </select>
                      
                      {/* Update Button */}
                      {pendingStatusChanges[order.orderId] && (
                        <button
                          onClick={() => saveStatusUpdate(order.orderId)}
                          disabled={updatingOrders.has(order.orderId)}
                          className="w-full mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-green-400"
                        >
                          {updatingOrders.has(order.orderId) ? '✓ Updated!' : 'Update Status'}
                        </button>
                      )}
                      
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
