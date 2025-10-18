export default function StorySection() {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-earth-50 via-brand-cream to-brand-gold-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-amber-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-earth-200/20 rounded-full blur-3xl" />
      
      <div className="container-section relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Story */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold-100 text-brand-earth-800 font-semibold text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              Our Story
            </div>

            <h2 className="section-title">
              Ancient Wisdom,
              <br />
              <span className="bg-gradient-to-r from-brand-earth-700 to-brand-gold-600 bg-clip-text text-transparent">
                Modern Science
              </span>
            </h2>

            <div className="prose prose-lg text-gray-700 space-y-4">
              <p className="leading-relaxed">
                Welcome to <strong className="text-brand-amber-600">Kalpavruksha</strong> – where nature's most powerful botanicals meet time-honored tradition. Our name comes from the sacred "wish-fulfilling tree" of ancient lore, symbolizing abundance and natural blessings.
              </p>
              
              <p className="leading-relaxed">
                For generations, our formula has been meticulously crafted using <strong>51 magical ingredients</strong> – a harmonious blend of 46 sacred herbs and 5 precious nourishing oils. Each batch is handmade with care, free from chemicals, and infused with the wisdom of Ayurvedic traditions.
              </p>

              <p className="leading-relaxed">
                What sets us apart? <strong className="text-brand-amber-600">Pure dedication to quality.</strong> Every ingredient is ethically sourced, lab-tested for purity, and combined using techniques passed down through the ages. The result? A hair oil that doesn't just nourish – it transforms.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-brand-amber-600">30+</div>
                <div className="text-sm text-gray-600">Years of Tradition</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-brand-amber-600">51</div>
                <div className="text-sm text-gray-600">Natural Ingredients</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-brand-amber-600">100%</div>
                <div className="text-sm text-gray-600">Handcrafted</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-brand-amber-600">0%</div>
                <div className="text-sm text-gray-600">Chemicals</div>
              </div>
            </div>
          </div>

          {/* Right: Visual representation */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {/* Card 1: Heritage */}
              <div className="bg-white p-6 rounded-2xl shadow-nature hover:shadow-warm transition-shadow space-y-3">
                <div className="w-12 h-12 rounded-full bg-brand-gold-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-brand-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-bold text-brand-amber-600">Ancient Recipes</h3>
                <p className="text-sm text-gray-600">Time-tested formulas from traditional Ayurveda</p>
              </div>

              {/* Card 2: Ingredients */}
              <div className="bg-white p-6 rounded-2xl shadow-nature hover:shadow-warm transition-shadow space-y-3 mt-12">
                <div className="w-12 h-12 rounded-full bg-brand-earth-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-brand-earth-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="font-bold text-brand-earth-700">Pure Botanicals</h3>
                <p className="text-sm text-gray-600">Ethically sourced from pristine forests</p>
              </div>

              {/* Card 3: Quality */}
              <div className="bg-white p-6 rounded-2xl shadow-nature hover:shadow-warm transition-shadow space-y-3">
                <div className="w-12 h-12 rounded-full bg-brand-gold-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-brand-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-brand-gold-600">Lab Certified</h3>
                <p className="text-sm text-gray-600">Rigorous testing for safety and efficacy</p>
              </div>

              {/* Card 4: Care */}
              <div className="bg-white p-6 rounded-2xl shadow-nature hover:shadow-warm transition-shadow space-y-3 mt-12">
                <div className="w-12 h-12 rounded-full bg-brand-gold-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-brand-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-brand-amber-600">Made with Love</h3>
                <p className="text-sm text-gray-600">Each batch handcrafted with utmost care</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
