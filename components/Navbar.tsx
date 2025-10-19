'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const { openCart, cartCount } = useCart()

  return (
    <header className="border-b border-brand-gold-200 sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container-section flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 group-hover:scale-110 transition-transform">
            <Image src="/images/logo.jpeg" alt="Kalpavruksha" fill className="object-contain" />
          </div>
          <div>
            <span className="font-heading text-2xl font-bold text-brand-amber-600 tracking-wide">Kalpavruksha</span>
            <p className="text-xs text-brand-brown-600">Nature's Gift</p>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-brand-brown-700 hover:text-brand-gold-600 font-medium transition-colors">Home</a>
          <a href="#products" className="text-brand-brown-700 hover:text-brand-gold-600 font-medium transition-colors">Products</a>
          <a href="#ingredients" className="text-brand-brown-700 hover:text-brand-gold-600 font-medium transition-colors">Ingredients</a>
          <a href="#about" className="text-brand-brown-700 hover:text-brand-gold-600 font-medium transition-colors">About Us</a>
          <Link href="/track-order" className="text-brand-brown-700 hover:text-brand-gold-600 font-medium transition-colors">Track Order</Link>
          <a href="#contact" className="text-brand-brown-700 hover:text-brand-gold-600 font-medium transition-colors">Contact</a>
        </nav>
        
        <button
          onClick={openCart}
          className="relative p-3 hover:bg-brand-gold-50 rounded-full transition-colors"
          aria-label="Open cart"
        >
          <ShoppingBag className="w-6 h-6 text-brand-amber-600" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-brand-amber-600 rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
