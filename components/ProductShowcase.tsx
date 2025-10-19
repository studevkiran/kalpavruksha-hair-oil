'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { ShoppingCart } from 'lucide-react'

interface Variant {
  size: string
  price: number
  originalPrice: number
  badge?: string
}

const variants: Variant[] = [
  {
    size: '100ml',
    price: 250,
    originalPrice: 350,
    badge: '🔥 Launch Offer',
  },
  {
    size: '200ml',
    price: 599,
    originalPrice: 699,
    badge: 'Bestseller',
  },
]

export default function ProductShowcase() {
  const [selectedVariant, setSelectedVariant] = useState(variants[1]) // Default to 200ml
  const { openCart } = useCart()

  const savings = selectedVariant.originalPrice - selectedVariant.price

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-brand-gold-50 via-white to-brand-amber-50">
      <div className="container-section">
        <div className="text-center mb-16 space-y-4">
          <h2 className="section-title">Choose Your Perfect Size</h2>
          <p className="section-subtitle">
            Premium quality hair oil with 51 natural ingredients
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-brand-gold-200">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="relative h-96 md:h-auto bg-gradient-to-br from-brand-gold-100 to-brand-amber-100 p-8">
                {/* Badge */}
                {selectedVariant.badge && (
                  <div className="absolute top-6 right-6 z-10">
                    <span className="inline-flex px-4 py-2 rounded-full bg-brand-amber-600 text-white text-sm font-bold shadow-lg">
                      {selectedVariant.badge}
                    </span>
                  </div>
                )}

                {/* Animated oil drops */}
                <div className="absolute top-20 left-1/4 w-3 h-3 rounded-full bg-brand-amber-600/60 animate-oil-drop" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-10 right-1/3 w-2 h-2 rounded-full bg-brand-gold-600/50 animate-oil-drop" style={{ animationDelay: '1.2s' }}></div>
                
                <Image
                  src="/images/Screenshot 2025-10-17 at 23.45.39.png"
                  alt="Kalpavruksha Hair Oil"
                  fill
                  className="object-contain p-4 hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Details */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <h3 className="font-heading text-3xl font-bold text-brand-brown-800 mb-3">
                  Kalpavruksha Hair Oil
                </h3>
                <p className="text-brand-amber-700 text-lg font-semibold mb-6">
                  51 Magical Ingredients
                </p>

                {/* Variant Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-brand-brown-700 mb-3">
                    Select Quantity:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {variants.map((variant) => (
                      <button
                        key={variant.size}
                        onClick={() => setSelectedVariant(variant)}
                        className={`py-4 px-6 rounded-xl border-2 transition-all duration-300 ${
                          selectedVariant.size === variant.size
                            ? 'border-brand-amber-600 bg-brand-gold-50 shadow-md scale-105'
                            : 'border-gray-200 hover:border-brand-gold-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-bold text-brand-brown-800 text-xl">{variant.size}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Box with Animation */}
                <div className="mb-6 p-5 bg-gradient-to-br from-brand-gold-50 to-brand-amber-50 rounded-xl border-2 border-brand-gold-300 shadow-lg relative overflow-hidden transition-all duration-500 hover:shadow-xl">
                  {/* Animated background shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></div>
                  
                  <div className="relative">
                    <div className="flex items-baseline justify-between mb-3">
                      <div className="flex items-baseline gap-3">
                        <span className="text-5xl font-bold text-brand-brown-800 transition-all duration-300">
                          ₹{selectedVariant.price}
                        </span>
                        <span className="text-xl text-gray-400 line-through transition-all duration-300">
                          ₹{selectedVariant.originalPrice}
                        </span>
                      </div>
                      {selectedVariant.badge && (
                        <span className="inline-flex px-3 py-1 rounded-full bg-brand-amber-600 text-white text-xs font-bold">
                          {selectedVariant.badge}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-green-600 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Save ₹{savings} ({Math.round((savings / selectedVariant.originalPrice) * 100)}% off)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>46 Sacred Herbs + 5 Nourishing Oils</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>100% Natural, Chemical-Free Formula</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Handmade with Ancient Wisdom</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free Shipping on All Orders</span>
                  </li>
                </ul>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    4.9 (2,050+ reviews)
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={openCart}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Open Cart to Order
                </button>
                <p className="text-sm text-center text-gray-600 mt-2">
                  All variants available in cart - select your quantities
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">Questions about the product?</p>
          <a href="#contact" className="btn-outline">
            Contact Us for Guidance
          </a>
        </div>
      </div>
    </section>
  )
}
