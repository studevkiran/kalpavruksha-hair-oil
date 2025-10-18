import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-brand-gold-50 via-brand-amber-50 to-orange-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-gold-300/40 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-amber-300/40 rounded-full blur-3xl animate-float-slower" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-orange-300/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Oil drops animation */}
        <div className="absolute top-10 left-1/4 w-4 h-4 bg-brand-amber-600 rounded-full animate-oil-drop" style={{ animationDelay: '0s' }} />
        <div className="absolute top-20 right-1/3 w-3 h-3 bg-brand-gold-600 rounded-full animate-oil-drop" style={{ animationDelay: '1s' }} />
        <div className="absolute top-32 left-1/2 w-5 h-5 bg-orange-600 rounded-full animate-oil-drop" style={{ animationDelay: '2s' }} />
        <div className="absolute top-5 right-1/4 w-3 h-3 bg-brand-amber-700 rounded-full animate-oil-drop" style={{ animationDelay: '1.5s' }} />
        
        {/* Floating leaves */}
        <div className="absolute top-0 left-1/4 text-4xl animate-leaf-fall" style={{ animationDelay: '0s' }}>🍃</div>
        <div className="absolute top-0 right-1/3 text-3xl animate-leaf-fall" style={{ animationDelay: '2s' }}>🌿</div>
        <div className="absolute top-0 left-2/3 text-4xl animate-leaf-fall" style={{ animationDelay: '4s' }}>🍂</div>
      </div>

      <div className="container-section relative z-10 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6 animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold-100 text-brand-brown-800 font-semibold text-sm shadow-md">
              <span className="inline-block w-2 h-2 bg-brand-amber-600 rounded-full animate-pulse"></span>
              NEW LAUNCH
            </span>
            
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
              <span className="text-brand-brown-800">Kalpavruksha</span>
              <br />
              <span className="bg-gradient-to-r from-brand-amber-700 to-brand-gold-600 bg-clip-text text-transparent">
                Hair Oil
              </span>
            </h1>

            <div className="space-y-3">
              <p className="text-2xl sm:text-3xl font-semibold text-brand-amber-700">
                51 Magical Ingredients
              </p>
              <p className="text-lg text-gray-700 max-w-xl leading-relaxed">
                Nature's most powerful blend of <strong>46 sacred herbs</strong> and <strong>5 nourishing oils</strong>, handcrafted with ancient wisdom to transform your hair naturally.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="badge">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                100% Natural
              </div>
              <div className="badge">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                0% Chemicals
              </div>
              <div className="badge">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Hand Made
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#products" className="btn-primary group">
                Shop Now
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="#ingredients" className="btn-outline">
                View Ingredients
              </a>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-brand-gold-200">
              <div>
                <div className="text-3xl font-bold text-brand-amber-600">10k+</div>
                <div className="text-sm text-brand-brown-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-amber-600">4.8★</div>
                <div className="text-sm text-brand-brown-600">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-amber-600">90%</div>
                <div className="text-sm text-brand-brown-600">Repeat Buyers</div>
              </div>
            </div>
          </div>

          {/* Right: Product Image */}
          <div className="relative lg:block hidden">
            <div className="relative z-10 animate-scale-in">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold-400/30 to-brand-amber-400/30 rounded-full blur-3xl" />
                
                {/* Product bottle */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    src="/images/Screenshot 2025-10-18 at 23.07.28.png" 
                    alt="Kalpavruksha Hair Oil - Nature's Best" 
                    width={400}
                    height={400}
                    className="drop-shadow-2xl animate-float object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute top-10 -left-10 bg-white px-4 py-2 rounded-full shadow-nature animate-fade-in">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-semibold text-sm">In Stock</span>
              </div>
            </div>
            
            <div className="absolute bottom-20 -right-10 bg-white px-6 py-3 rounded-2xl shadow-warm animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-2xl font-bold text-brand-amber-700">₹250</div>
              <div className="text-xs text-gray-600">Starting Price</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
