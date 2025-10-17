'use client'
import { useState } from 'react'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  size: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  badge?: string
  inStock: boolean
}

const products: Product[] = [
  {
    id: '100ml',
    name: 'Kalpavruksha Hair Oil',
    size: '100ml',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 1200,
    badge: 'Bestseller',
    inStock: true,
  },
  {
    id: '200ml',
    name: 'Kalpavruksha Hair Oil',
    size: '200ml',
    price: 549,
    originalPrice: 699,
    rating: 4.9,
    reviews: 850,
    badge: 'Popular',
    inStock: true,
  },
  {
    id: '500ml',
    name: 'Kalpavruksha Hair Oil',
    size: '500ml (Family Pack)',
    price: 1299,
    originalPrice: 1799,
    rating: 4.7,
    reviews: 420,
    badge: 'Value Pack',
    inStock: true,
  },
]

export default function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState(products[1].id)

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-white to-brand-green-50">
      <div className="container-section">
        <div className="text-center mb-16 space-y-4">
          <h2 className="section-title">Choose Your Perfect Size</h2>
          <p className="section-subtitle">
            Premium quality hair oil in multiple sizes to suit your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className={`product-card group cursor-pointer transform hover:-translate-y-2 ${
                selectedProduct === product.id ? 'ring-2 ring-brand-forest shadow-glow' : ''
              }`}
              onClick={() => setSelectedProduct(product.id)}
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex px-3 py-1 rounded-full bg-brand-gold-500 text-white text-xs font-bold shadow-md">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-to-br from-brand-green-50 to-brand-earth-50 p-8">
                <Image
                  src="/images/label.svg"
                  alt={`${product.name} ${product.size}`}
                  fill
                  className="object-contain p-8 group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-brand-forest">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mt-1">{product.size}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-brand-forest">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-sm font-semibold text-green-600">
                      Save ₹{product.originalPrice - product.price}
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    51 Natural Ingredients
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Chemical-Free Formula
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Free Shipping
                  </li>
                </ul>

                {/* CTA */}
                <button
                  className={`w-full ${
                    product.inStock ? 'btn-primary' : 'btn-outline opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">Not sure which size to choose?</p>
          <a href="/contact" className="btn-outline">
            Contact Us for Guidance
          </a>
        </div>
      </div>
    </section>
  )
}
