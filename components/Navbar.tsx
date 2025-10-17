import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <header className="border-b border-gray-100/60 sticky top-0 z-50 bg-white/80 backdrop-blur">
      <div className="container-section flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.svg" alt="Kalpavruksha" width={40} height={40} />
          <span className="font-heading text-xl tracking-wide">Kalpavruksha</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6">
          <Link href="#ingredients" className="hover:text-brand-green">Ingredients</Link>
          <Link href="#benefits" className="hover:text-brand-green">Benefits</Link>
          <Link href="/buy" className="hover:text-brand-green">Buy</Link>
          <Link href="/contact" className="hover:text-brand-green">Contact</Link>
        </nav>
        <Link href="/buy" className="btn-primary">Buy Now</Link>
      </div>
    </header>
  )
}
