import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <header className="border-b border-brand-green-100 sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container-section flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 group-hover:scale-110 transition-transform">
            <Image src="/images/logo.svg" alt="Kalpavruksha" fill className="object-contain" />
          </div>
          <div>
            <span className="font-heading text-2xl font-bold text-brand-forest tracking-wide">Kalpavruksha</span>
            <p className="text-xs text-gray-600">Nature's Gift</p>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#products" className="text-gray-700 hover:text-brand-forest font-medium transition-colors">Products</a>
          <a href="#ingredients" className="text-gray-700 hover:text-brand-forest font-medium transition-colors">Ingredients</a>
          <a href="#benefits" className="text-gray-700 hover:text-brand-forest font-medium transition-colors">Benefits</a>
          <Link href="/contact" className="text-gray-700 hover:text-brand-forest font-medium transition-colors">Contact</Link>
        </nav>
        
        <Link href="/buy" className="btn-primary">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Shop Now
        </Link>
      </div>
    </header>
  )
}
