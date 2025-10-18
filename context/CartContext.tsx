'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface CartItem {
  id: string
  name: string
  size: string
  price: number
  quantity: number
  image: string
}

interface CartContextType {
  cartItems: CartItem[]
  isCartOpen: boolean
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  cartTotal: number
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Default cart items - both variants with quantity 0
const defaultCartItems: CartItem[] = [
  {
    id: 'kalpavruksha-100ml',
    name: 'Kalpavruksha Hair Oil',
    size: '100ml',
    price: 250,
    quantity: 0,
    image: '/images/Screenshot 2025-10-17 at 23.45.39.png'
  },
  {
    id: 'kalpavruksha-200ml',
    name: 'Kalpavruksha Hair Oil',
    size: '200ml',
    price: 599,
    quantity: 0,
    image: '/images/Screenshot 2025-10-17 at 23.45.39.png'
  }
]

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(defaultCartItems)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id)
      if (existingItem) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    // Allow quantity to be 0 or more (no removing from cart)
    if (quantity < 0) return
    
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    // Reset all quantities to 0 instead of clearing items
    setCartItems(prev => prev.map(item => ({ ...item, quantity: 0 })))
  }

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
