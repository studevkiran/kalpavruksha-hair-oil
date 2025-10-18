import Image from 'next/image'

export default function IngredientsGrid() {
  const ingredients = [
    { name: 'Amla', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop&auto=format', gradient: 'from-emerald-400 to-green-600' },
    { name: 'Rosemary', image: 'https://images.unsplash.com/photo-1582623380351-1bed5f7bef77?w=300&h=300&fit=crop&auto=format', gradient: 'from-lime-400 to-green-500' },
    { name: 'Bhringaraj', image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=300&h=300&fit=crop&auto=format', gradient: 'from-teal-400 to-emerald-600' },
    { name: 'Tulsi', image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=300&h=300&fit=crop&auto=format', gradient: 'from-green-400 to-emerald-700' },
    { name: 'Hibiscus', image: 'https://images.unsplash.com/photo-1588242692683-40f5a5726e0e?w=300&h=300&fit=crop&auto=format', gradient: 'from-pink-400 to-rose-600' },
    { name: 'Henna', image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop&auto=format', gradient: 'from-amber-400 to-orange-600' },
    { name: 'Brahmi', image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=300&h=300&fit=crop&auto=format', gradient: 'from-green-300 to-teal-600' },
    { name: 'Neem', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=300&fit=crop&auto=format', gradient: 'from-lime-500 to-green-700' },
    { name: 'Onion', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=300&fit=crop&auto=format', gradient: 'from-purple-400 to-violet-600' },
    { name: 'Moringa', image: 'https://images.unsplash.com/photo-1593113646773-028c46db3044?w=300&h=300&fit=crop&auto=format', gradient: 'from-emerald-400 to-green-600' },
    { name: 'Flaxseed', image: 'https://images.unsplash.com/photo-1580487619810-2a9bdd2c9a7b?w=300&h=300&fit=crop&auto=format', gradient: 'from-yellow-400 to-amber-600' },
    { name: 'Aloe Vera', image: 'https://images.unsplash.com/photo-1596969983175-e104c3f5e824?w=300&h=300&fit=crop&auto=format', gradient: 'from-teal-300 to-green-600' },
    { name: 'Curry Leaf', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=300&fit=crop&auto=format', gradient: 'from-lime-400 to-green-600' },
    { name: 'Lavancha', image: 'https://images.unsplash.com/photo-1611251184192-0a9c1e21c87b?w=300&h=300&fit=crop&auto=format', gradient: 'from-purple-400 to-indigo-600' },
    { name: 'Jatamansi', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=300&fit=crop&auto=format', gradient: 'from-pink-300 to-purple-500' },
    { name: '+ 36 more', image: 'https://images.unsplash.com/photo-1508022923499-d9b0ec85f892?w=300&h=300&fit=crop&auto=format', gradient: 'from-amber-400 to-yellow-600' },
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
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer animate-fade-up bg-white"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image with overlay */}
              <div className="relative h-32 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 12.5vw"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-40 group-hover:opacity-60 transition-opacity`}></div>
              </div>
              
              {/* Name Label */}
              <div className="p-3 bg-white">
                <h3 className="font-bold text-brand-brown-800 text-sm text-center group-hover:text-brand-amber-600 transition-colors">
                  {item.name}
                </h3>
              </div>
              
              {/* Glow Effect on Hover */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity -z-10`}></div>
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
