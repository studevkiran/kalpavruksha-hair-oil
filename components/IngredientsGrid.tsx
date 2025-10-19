import Image from 'next/image'

export default function IngredientsGrid() {
  const ingredients = [
    { name: 'Amla', image: '/images/Amla (Indian Gooseberry).png' },
    { name: 'Rosemary', image: '/images/Rosemary.png' },
    { name: 'Bhringaraj', image: '/images/Bringaraj (Eclipta Alba).png' },
    { name: 'Tulsi', image: '/images/tulsi.png' },
    { name: 'Hibiscus', image: '/images/Hibiscus.png' },
    { name: 'Henna', image: '/images/Henna.png' },
    { name: 'Brahmi', image: '/images/brahmi0.png' },
    { name: 'Neem', image: '/images/neem.png' },
    { name: 'Onion', image: '/images/onion.png' },
    { name: 'Moringa', image: '/images/moringa.png' },
    { name: 'Flaxseed', image: '/images/flaxseed.png' },
    { name: 'Aloe Vera', image: '/images/aloe vera.png' },
    { name: 'Curry Leaf', image: '/images/curry leaf.png' },
    { name: 'Lavancha', image: '/images/lavancha.png' },
    { name: 'Jatamansi', image: '/images/jatamansi.png' },
    { name: 'Methi', image: '/images/methi.png' },
    { name: 'Ashwagandha', image: '/images/ashwagandha.png' },
    { name: 'Guduchi', image: '/images/guduchi.png' },
    { name: 'Shatavari', image: '/images/shatavari.png' },
    { name: 'Vidari', image: '/images/vidari.png' },
    { name: 'Shikakai', image: '/images/shikakai.png' },
    { name: 'Reitha', image: '/images/reitha.png' },
    { name: 'Kapoor Kachli', image: '/images/kapoor kachli.png' },
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
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer animate-fade-up bg-white border-2 border-brand-gold-200"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image */}
              <div className="relative h-32 bg-gradient-to-br from-brand-gold-50 to-brand-amber-50 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Name Label */}
              <div className="p-3 bg-white">
                <h3 className="font-bold text-brand-brown-800 text-sm text-center group-hover:text-brand-amber-600 transition-colors">
                  {item.name}
                </h3>
              </div>
              
              {/* Glow Effect on Hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold-400 to-brand-amber-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity -z-10"></div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-brand-gold-100 to-brand-amber-100 text-brand-brown-800 font-semibold shadow-lg border-2 border-brand-gold-300">
            <svg className="w-6 h-6 text-brand-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-base">20 premium ingredients shown • 31 more herbs blend perfectly</span>
          </div>
        </div>
      </div>
    </section>
  )
}
