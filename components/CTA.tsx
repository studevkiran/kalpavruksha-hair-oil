import Link from 'next/link'

export default function CTA() {
  return (
    <section className="container-section py-12">
      <div className="rounded-2xl bg-gradient-to-r from-brand-green to-emerald-600 p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-heading text-2xl sm:text-3xl font-semibold">Ready to nourish your hair?</h3>
          <p className="mt-2 text-white/90">Order Kalpavruksha Hair Oil today. Hand made. Chemical free.</p>
        </div>
        <Link href="/buy" className="btn-primary bg-white text-brand-green hover:bg-white/90">Buy Now</Link>
      </div>
    </section>
  )
}
