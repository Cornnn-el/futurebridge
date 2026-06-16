import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Characters from '@/components/Characters'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import Pitch from '@/components/Pitch'
import { Cta, Footer } from '@/components/CtaFooter'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Characters />
      <HowItWorks />
      <Features />
      <Pitch />
      <Cta />
      <Footer />
    </>
  )
}
