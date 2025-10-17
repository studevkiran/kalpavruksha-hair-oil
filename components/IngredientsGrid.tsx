export default function IngredientsGrid() {
  const ingredients = [
    { name: 'Amla', icon: '🌿' },
    { name: 'Rosemary', icon: '🌱' },
    { name: 'Bhringaraj', icon: '🍃' },
    { name: 'Tulsi', icon: '🌿' },
    { name: 'Hibiscus', icon: '🌺' },
    { name: 'Henna', icon: '🍂' },
    { name: 'Brahmi', icon: '🌿' },
    { name: 'Neem', icon: '🌳' },
    { name: 'Onion', icon: '🧅' },
    { name: 'Moringa', icon: '🌿' },
    { name: 'Flaxseed', icon: '🌾' },
    { name: 'Aloe Vera', icon: '🪴' },
    { name: 'Curry Leaf', icon: '🍃' },
    { name: 'Lavender', icon: '💜' },
    { name: 'Jatamansi', icon: '🌸' },
    { name: '+ 36 more', icon: '✨' },
  ]

  return (
    <section id="ingredients" className="py-20 bg-gradient-to-b from-brand-green-100 via-white to-brand-green-50 relative overflow-hidden">
      {/* Floating herbs decoration */}
      <div className="absolute top-16 left-10 text-5xl opacity-20 animate-herb-grow">🌿</div>
      <div className="absolute top-32 right-16 text-5xl opacity-20 animate-herb-grow" style={{ animationDelay: '0.5s' }}>🌱</div>
      <div className="absolute bottom-24 left-1/4 text-5xl opacity-20 animate-herb-grow" style={{ animationDelay: '1s' }}>🍃</div>
      <div className="absolute bottom-16 right-1/3 text-5xl opacity-20 animate-herb-grow" style={{ animationDelay: '1.5s' }}>🌺</div>
      
      <div className="container-section">
        <div className="text-center mb-16 space-y-4">
          <h2 className="section-title">Nature's Finest Ingredients</h2>
          <p className="section-subtitle">
            <span className="font-bold text-brand-forest">46 Sacred Herbs</span> + <span className="font-bold text-brand-earth-700">5 Nourishing Oils</span>
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Each ingredient is carefully selected from pristine sources and blended using time-honored techniques to create the perfect harmony for your hair.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {ingredients.map((item, index) => (
            <div
              key={item.name}
              className="group bg-gradient-to-br from-white to-brand-green-50 rounded-2xl p-5 text-center shadow-nature hover:shadow-warm hover:-translate-y-1 transition-all duration-300 border border-brand-green-100 animate-herb-grow"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 group-hover:animate-pulse transition-transform">
                {item.icon}
              </div>
              <h3 className="font-semibold text-brand-forest group-hover:text-brand-moss transition-colors">
                {item.name}
              </h3>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gold-100 text-brand-earth-800 font-semibold">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            All ingredients are lab-tested, ethically sourced, and 100% natural
          </div>
        </div>
      </div>
    </section>
  )
}
