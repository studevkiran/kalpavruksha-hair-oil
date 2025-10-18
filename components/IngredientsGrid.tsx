export default function IngredientsGrid() {
  const ingredients = [
    { name: 'Amla', icon: '🌱', color: 'from-emerald-400 to-green-600' },
    { name: 'Rosemary', icon: '🍃', color: 'from-lime-400 to-green-500' },
    { name: 'Bhringaraj', icon: '🌿', color: 'from-teal-400 to-emerald-600' },
    { name: 'Tulsi', icon: '🌿', color: 'from-green-400 to-emerald-700' },
    { name: 'Hibiscus', icon: '🌺', color: 'from-pink-400 to-rose-600' },
    { name: 'Henna', icon: '🍂', color: 'from-amber-400 to-orange-600' },
    { name: 'Brahmi', icon: '🌿', color: 'from-green-300 to-teal-600' },
    { name: 'Neem', icon: '🌳', color: 'from-lime-500 to-green-700' },
    { name: 'Onion', icon: '🧅', color: 'from-purple-400 to-violet-600' },
    { name: 'Moringa', icon: '🌿', color: 'from-emerald-400 to-green-600' },
    { name: 'Flaxseed', icon: '🌾', color: 'from-yellow-400 to-amber-600' },
    { name: 'Aloe Vera', icon: '🪴', color: 'from-teal-300 to-green-600' },
    { name: 'Curry Leaf', icon: '🍃', color: 'from-lime-400 to-green-600' },
    { name: 'Lavancha', icon: '💜', color: 'from-purple-400 to-indigo-600' },
    { name: 'Jatamansi', icon: '🌸', color: 'from-pink-300 to-purple-500' },
    { name: '+ 36 more', icon: '✨', color: 'from-amber-400 to-yellow-600' },
  ]

  return (
    <section id="ingredients" className="py-20 bg-gradient-to-b from-brand-gold-50 via-cream-50 to-brand-amber-50 relative overflow-hidden">
      {/* Floating herbs decoration */}
      <div className="absolute top-16 left-10 text-6xl opacity-10 animate-float">🌿</div>
      <div className="absolute top-32 right-16 text-6xl opacity-10 animate-float" style={{ animationDelay: '0.5s' }}>🌱</div>
      <div className="absolute bottom-24 left-1/4 text-6xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>🍃</div>
      <div className="absolute bottom-16 right-1/3 text-6xl opacity-10 animate-float" style={{ animationDelay: '1.5s' }}>🌺</div>
      
      <div className="container-section">
        <div className="text-center mb-16 space-y-4">
          <h2 className="section-title text-brand-brown-800">Nature's Finest Ingredients</h2>
          <p className="section-subtitle">
            <span className="font-bold text-brand-amber-600">46 Sacred Herbs</span> + <span className="font-bold text-brand-gold-600">5 Nourishing Oils</span>
          </p>
          <p className="text-brand-brown-600 max-w-3xl mx-auto text-lg">
            Each ingredient is carefully selected from pristine sources and blended using time-honored techniques to create the perfect harmony for your hair.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4">
          {ingredients.map((item, index) => (
            <div
              key={item.name}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Gradient Background */}
              <div className={`bg-gradient-to-br ${item.color} p-6 h-32 flex flex-col items-center justify-center`}>
                {/* Icon */}
                <div className="text-5xl mb-2 group-hover:scale-125 transition-transform duration-500 drop-shadow-lg">
                  {item.icon}
                </div>
              </div>
              
              {/* Name Label */}
              <div className="p-3 bg-white">
                <h3 className="font-bold text-brand-brown-800 text-sm text-center group-hover:text-brand-amber-600 transition-colors">
                  {item.name}
                </h3>
              </div>
              
              {/* Glow Effect on Hover */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity -z-10`}></div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-brand-gold-100 to-brand-amber-100 text-brand-brown-800 font-semibold shadow-lg border-2 border-brand-gold-300">
            <svg className="w-6 h-6 text-brand-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-base">All ingredients are lab-tested, ethically sourced, and 100% natural</span>
          </div>
        </div>
      </div>
    </section>
  )
}
