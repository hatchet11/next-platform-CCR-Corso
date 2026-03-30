import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustBadges from '@/components/TrustBadges'
import About from '@/components/About'
import AvailablePuppies from '@/components/AvailablePuppies'
import Services from '@/components/Services'
import Gallery from '@/components/Gallery'
import KennelUpdates from '@/components/KennelUpdates'
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
      <div style={{
        background: '#cc0000',
        color: '#fff',
        textAlign: 'center',
        padding: '14px 20px',
        fontSize: '1.1rem',
        fontWeight: 700,
        letterSpacing: '0.08em',
        fontFamily: 'Cinzel, serif',
        position: 'relative',
        zIndex: 9999,
      }}>
        🐾 PUPPIES BIRTH DAY — TODAY! &nbsp;03/30/2026 &nbsp;🐾
      </div>
      <Navbar />
      <Hero />
      <KennelUpdates />
      <TrustBadges />
      <About />
      <AvailablePuppies />
      <Services />
      <Gallery />
      <ProcessTimeline />
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
