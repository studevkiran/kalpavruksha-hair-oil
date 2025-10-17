import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import TrustBadges from '@/components/TrustBadges'
import ProductShowcase from '@/components/ProductShowcase'
import IngredientsGrid from '@/components/IngredientsGrid'
import Benefits from '@/components/Benefits'
import StorySection from '@/components/StorySection'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrustBadges />
      <ProductShowcase />
      <IngredientsGrid />
      <Benefits />
      <StorySection />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  )
}
