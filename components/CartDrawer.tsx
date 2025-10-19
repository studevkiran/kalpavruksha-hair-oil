'use client'

import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useState } from 'react'

declare global {
  interface Window {
    Cashfree?: any
  }
}

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    clearCart,
  } = useCart()

  const [isProcessing, setIsProcessing] = useState(false)
  const [showCustomerForm, setShowCustomerForm] = useState(false)
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  })

  const handleCheckout = async () => {
    // Only allow checkout if there are items with quantity > 0
    const itemsToCheckout = cartItems.filter(item => item.quantity > 0)
    
    if (itemsToCheckout.length === 0) {
      alert('Please add at least one item to your cart.')
      return
    }
    
    // Show customer details form first
    if (!showCustomerForm) {
      setShowCustomerForm(true)
      return
    }
    
    // Validate customer details
    if (!customerDetails.phone || customerDetails.phone.length !== 10) {
      alert('Please enter a valid 10-digit mobile number')
      return
    }
    
    if (!customerDetails.name) {
      alert('Please enter your name')
      return
    }
    
    if (!customerDetails.address || !customerDetails.city || !customerDetails.state || !customerDetails.pincode) {
      alert('Please fill in your complete delivery address')
      return
    }
    
    if (customerDetails.pincode.length !== 6) {
      alert('Please enter a valid 6-digit pincode')
      return
    }
    
    setIsProcessing(true)
    
    try {
      // Check if Cashfree SDK is loaded
      if (!window.Cashfree) {
        throw new Error('Payment gateway not loaded. Please refresh the page and try again.')
      }

      // Create order with cart items and customer details
      const orderData = {
        items: itemsToCheckout,
        amount: cartTotal,
        customerPhone: customerDetails.phone,
        customerName: customerDetails.name,
        customerEmail: customerDetails.email || `${customerDetails.phone}@customer.kalpavruksha.com`,
        customerAddress: customerDetails.address,
        customerCity: customerDetails.city,
        customerState: customerDetails.state,
        customerPincode: customerDetails.pincode,
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create order')
      }

      const data = await response.json()

      if (!data.sessionId || !data.orderId) {
        throw new Error('Invalid order response. Please try again.')
      }

      // Initialize Cashfree SDK
      const cashfree = await window.Cashfree({
        mode: 'sandbox' // Use 'production' for live
      })

      if (!cashfree) {
        throw new Error('Failed to initialize payment gateway')
      }

      // Checkout options
      const checkoutOptions = {
        paymentSessionId: data.sessionId,
        redirectTarget: '_self'
      }

      // Open Cashfree checkout
      cashfree.checkout(checkoutOptions).then((result: any) => {
        if (result.error) {
          console.error('Payment error:', result.error)
          alert(`Payment failed: ${result.error.message || 'Please try again.'}`)
          setIsProcessing(false)
        } else if (result.paymentDetails) {
          // Payment successful
          clearCart()
          closeCart()
          alert('Payment successful! Thank you for your order. 🎉')
          setIsProcessing(false)
        }
      }).catch((err: any) => {
        console.error('Checkout error:', err)
        alert('Payment processing failed. Please try again.')
        setIsProcessing(false)
      })
    } catch (error: any) {
      console.error('Checkout error:', error)
      alert(error.message || 'Failed to initiate checkout. Please try again.')
      setIsProcessing(false)
    }
  }

  if (!isCartOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-brand-amber-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-brand-brown-800">
              Your Cart
            </h2>
            <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 text-xs font-bold text-white bg-brand-amber-600 rounded-full">
              {cartCount}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {cartItems.map(item => (
              <div
                key={item.id}
                className={`flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 transition-all ${
                  item.quantity > 0 
                    ? 'bg-white border-brand-gold-200 shadow-sm' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                {/* Product Image */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base text-brand-brown-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">{item.size}</p>
                  <p className="font-bold text-sm sm:text-base text-brand-amber-600 mt-1">
                    ₹{item.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      disabled={item.quantity === 0}
                      className="p-1 sm:p-1.5 hover:bg-white rounded-lg transition-colors border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                    </button>
                    <span className="w-6 sm:w-8 text-center text-sm sm:text-base font-semibold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 sm:p-1.5 hover:bg-white rounded-lg transition-colors border border-gray-300"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                {item.quantity > 0 && (
                  <div className="text-right">
                    <p className="text-xs sm:text-sm text-gray-500">Total</p>
                    <p className="font-bold text-sm sm:text-base text-brand-brown-800">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
          {cartCount > 0 ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className="text-base sm:text-lg font-semibold text-gray-700">
                  Subtotal:
                </span>
                <span className="text-xl sm:text-2xl font-bold text-brand-brown-800">
                  ₹{cartTotal.toFixed(2)}
                </span>
              </div>
              
              {/* Customer Details Form */}
              {showCustomerForm && (
                <div className="mb-4 space-y-3 p-4 bg-white rounded-lg border border-brand-gold-200">
                  <h3 className="font-semibold text-brand-brown-800 mb-2">Your Details</h3>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                      placeholder="Enter your name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-gold-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-gold-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                      placeholder="your@email.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-gold-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Delivery Address *</label>
                    <textarea
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                      placeholder="House/Flat No., Building Name, Street"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-gold-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">City *</label>
                      <input
                        type="text"
                        value={customerDetails.city}
                        onChange={(e) => setCustomerDetails({...customerDetails, city: e.target.value})}
                        placeholder="City"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-gold-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">State *</label>
                      <input
                        type="text"
                        value={customerDetails.state}
                        onChange={(e) => setCustomerDetails({...customerDetails, state: e.target.value})}
                        placeholder="State"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-gold-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Pincode *</label>
                    <input
                      type="tel"
                      value={customerDetails.pincode}
                      onChange={(e) => setCustomerDetails({...customerDetails, pincode: e.target.value.replace(/\D/g, '').slice(0, 6)})}
                      placeholder="6-digit pincode"
                      maxLength={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-gold-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => setShowCustomerForm(false)}
                    className="text-xs text-brand-amber-600 hover:text-brand-amber-700"
                  >
                    ← Back to cart
                  </button>
                </div>
              )}
              
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="btn-primary w-full text-center text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : showCustomerForm ? '💳 Proceed to Payment' : '📝 Continue to Checkout'}
              </button>
            </>
          ) : (
            <div className="text-center">
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Update quantities above to add items
              </p>
            </div>
          )}
          <button
            onClick={() => {
              setShowCustomerForm(false)
              closeCart()
            }}
            className="w-full mt-3 text-center text-sm sm:text-base text-brand-amber-600 font-semibold hover:text-brand-amber-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  )
}
