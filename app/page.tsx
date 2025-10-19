import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import TrustBadges from '@/components/TrustBadges'
import ProductShowcase from '@/components/ProductShowcase'
import IngredientsGrid from '@/components/IngredientsGrid'
import Benefits from '@/components/Benefits'
import StorySection from '@/components/StorySection'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import PaymentStatus from '@/components/PaymentStatus'
import { Suspense } from 'react'

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <PaymentStatus />
      </Suspense>
      <Navbar />
      <div id="home">
        <HeroSection />
      </div>
      <TrustBadges />
      <ProductShowcase />
      <IngredientsGrid />
      <Benefits />
      <div id="about">
        <StorySection />
      </div>
      <Testimonials />
      <div id="contact">
        <Footer />
      </div>
    </>
  )
}
