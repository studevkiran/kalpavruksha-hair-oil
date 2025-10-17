'use client'
import { useState, useEffect } from 'react'

interface Testimonial {
  name: string
  review: string
  rating: number
  image?: string
  verified: boolean
}

const testimonials: Testimonial[] = [
  {
    name: 'Priya Sharma',
    review: 'My daughter is only seven, but her hair is very healthy using this oil. Dryness and split ends reduced completely. I trust Kalpavruksha oil!',
    rating: 5,
    verified: true,
  },
  {
    name: 'Anita Desai',
    review: 'This is good quality hair oil, very effective. It makes my hair grow quicker and feels so natural.',
    rating: 5,
    verified: true,
  },
  {
    name: 'Kavita Rao',
    review: 'Super oil! Gives shine to my hair and freshness all day with a nice smell. I use many hair oils but this is the best and most trustable.',
    rating: 5,
    verified: true,
  },
  {
    name: 'Meera Patel',
    review: 'Love this hair oil! After trying many different oils, this is the one I\'ll use for the long run. Good growth and smells great.',
    rating: 5,
    verified: true,
  },
  {
    name: 'Rajesh Kumar',
    review: 'Kalpavruksha oil is so nice with very good results. Yes, it\'s 100% natural. No hair fall and good hair growth for me.',
    rating: 5,
    verified: true,
  },
  {
    name: 'Divya Singh',
    review: 'After using this oil, my hair fall stopped completely and I got many baby hairs. The natural ingredients really work!',
    rating: 5,
    verified: true,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3))
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isPaused])

  const visibleTestimonials = testimonials.slice(
    currentIndex * 3,
    currentIndex * 3 + 3
  )

  return (
    <section className="py-20 bg-gradient-to-b from-brand-green-50 via-brand-cream to-brand-green-100 relative overflow-hidden">
      {/* Floating leaves decoration */}
      <div className="absolute top-10 left-10 text-4xl animate-float-slow opacity-30">🍃</div>
      <div className="absolute top-20 right-20 text-4xl animate-float-slower opacity-30">🌿</div>
      <div className="absolute bottom-20 left-1/4 text-4xl animate-float-slow opacity-30" style={{ animationDelay: '2s' }}>🍂</div>
      
      <div className="container-section">
        <div className="text-center mb-16 space-y-4">
          <h2 className="section-title">Happy Customers</h2>
          <p className="section-subtitle">
            Real results from real people who trust Kalpavruksha
          </p>
          <div className="flex items-center justify-center gap-2 text-lg">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-bold text-brand-forest">4.8 out of 5</span>
            <span className="text-gray-600">(2,500+ reviews)</span>
          </div>
        </div>

        <div
          className="grid md:grid-cols-3 gap-6 mb-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card space-y-4 hover:shadow-warm transition-all duration-500 animate-review-slide relative"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Small oil drop decoration */}
              <div className="absolute -top-2 right-8 w-2 h-2 rounded-full bg-brand-green-400/60 animate-oil-drop"></div>
              {/* Rating */}
              <div className="flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-700 leading-relaxed">{testimonial.review}</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-green-400 to-brand-earth-400 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-brand-forest">{testimonial.name}</p>
                  {testimonial.verified && (
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified Buyer
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2">
          {[...Array(Math.ceil(testimonials.length / 3))].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index
                  ? 'bg-brand-forest w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
