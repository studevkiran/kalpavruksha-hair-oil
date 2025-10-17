export default function IngredientsGrid() {
  const ingredients = [
    'Amla', 'Rosemary', 'Bhringaraj', 'Tulsi', 'Hibiscus', 'Henna', 'Brahmi', 'Neem', 'Onion', 'Moringa',
    'Flaxseed', 'Aloe vera', 'Curry leaf', 'Lavancha', 'Jatamansi', 'etc.'
  ]
  return (
    <section id="ingredients" className="container-section py-12">
      <h2 className="font-heading text-2xl sm:text-3xl font-semibold">Key Ingredients</h2>
      <p className="mt-2 text-gray-700">46 Herbs + 5 Nourishing Oils</p>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {ingredients.map((item) => (
          <div key={item} className="rounded-lg border border-gray-100 p-3 text-center text-gray-800 bg-white shadow-sm">
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}
