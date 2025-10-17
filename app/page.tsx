import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Badges from '@/components/Badges'
import IngredientsGrid from '@/components/IngredientsGrid'
import Benefits from '@/components/Benefits'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Badges />
      <IngredientsGrid />
      <Benefits />
      <CTA />
      <Footer />
    </>
  )
}
