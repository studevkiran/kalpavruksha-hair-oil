import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-light/70 to-white pointer-events-none" />
      <div className="container-section relative pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="grid md:grid-cols-2 items-center gap-10">
          <div>
            <span className="badge mb-4">NEW</span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
              Kalpavruksha Hair Oil
            </h1>
            <p className="mt-4 text-lg text-gray-700 max-w-prose">
              51 Magical Ingredients – 46 herbs + 5 nourishing oils. 100% natural, crafted to promote hair growth,
              control hair fall and dandruff, and soothe excess body heat. Hand made and chemical free.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Buy Now
              </button>
              <a href="#ingredients" className="inline-flex items-center text-brand-green font-medium">See Ingredients →</a>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-gray-700">
              <li className="badge">Suitable for all hair types</li>
              <li className="badge">Clinically inspired formula</li>
              <li className="badge">Hand made</li>
              <li className="badge">Chemical free</li>
            </ul>
          </div>
          <div className="relative h-80 sm:h-96 md:h-[28rem]">
            <Image src="/images/label.svg" alt="Kalpavruksha Hair Oil Bottle" fill className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  )
}
