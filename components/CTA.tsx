export default function CTA() {
  return (
    <section className="py-20 bg-white">
      <div className="container-section">
        <div className="relative rounded-3xl bg-gradient-to-br from-brand-forest via-brand-moss to-brand-sage p-12 md:p-16 text-white overflow-hidden shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green-700/30 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
                Ready to Transform Your Hair?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join thousands of happy customers who trust Kalpavruksha Hair Oil for naturally beautiful, healthy hair.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary bg-white text-brand-forest hover:bg-brand-cream shadow-glow"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Shop Now
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center rounded-xl border-2 border-white text-white px-6 py-3.5 font-semibold hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300"
              >
                Contact Us
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-white/20">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-semibold">100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">Money-Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
