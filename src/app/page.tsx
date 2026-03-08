import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustBadges from '@/components/TrustBadges'
import About from '@/components/About'
import AvailablePuppies from '@/components/AvailablePuppies'
import Services from '@/components/Services'
import Gallery from '@/components/Gallery'
import Waitlist from '@/components/Waitlist'
import ProcessTimeline from '@/components/ProcessTimeline'
import CTA from '@/components/CTA'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import FloatingContact from '@/components/FloatingContact'
import ScrollAnimations from '@/components/ScrollAnimations'

export default function Home() {
  return (
    <>
      <div className="bg-pattern" />
      <Navbar />
      <Hero />
      <TrustBadges />
      <About />
      <AvailablePuppies />
      <Services />
      <Gallery />
      <ProcessTimeline />
      <Waitlist />
      <CTA />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <BackToTop />
      <FloatingContact />
      <ScrollAnimations />
    </>
  )
}
