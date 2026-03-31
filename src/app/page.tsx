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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is included with each puppy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every CCR Kennels puppy comes with AKC registration papers, DNA health testing documentation, veterinary health certificate, age-appropriate vaccinations and deworming, dew claws removed, tail docked, 2-year health guarantee, pedigree and AKC packet, puppy care guide, and a gift bag with food, toys, and a blanket with littermate scent.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I reserve a puppy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "To reserve a puppy, contact us via phone, email, or our contact form. We'll discuss available puppies or upcoming litters, answer your questions, and if it's a good match, we'll send you our puppy application. Once approved, a $500 non-refundable security deposit secures your puppy. No payment is accepted until your application has been reviewed and approved.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do you ship puppies nationwide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "While we don't arrange shipping directly, we help guide you through the process of setting up transport for your new puppy. We've worked with several pet transport services and can recommend trusted ground and air transport options. Ground transport is generally recommended for puppies as it tends to be less stressful. Families are also welcome to pick up their puppy in person at our home in Centralia, Illinois.",
      },
    },
    {
      '@type': 'Question',
      name: 'What health testing do you perform?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All our breeding dogs undergo comprehensive DNA genetic health testing through Embark or similar certified laboratories. We screen for breed-specific conditions including hip dysplasia, elbow dysplasia, cardiac issues, and genetic disorders. Health testing results are available upon request. Each puppy also receives a full veterinary examination before going home.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is your health guarantee?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We provide a comprehensive 2-year health guarantee covering genetic/hereditary conditions. If your puppy is diagnosed with a covered condition within two years, we offer replacement or refund options. The guarantee requires proper veterinary care, appropriate nutrition, and adherence to our care guidelines. Full terms are provided in our written contract.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are Cane Corsos good family dogs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Absolutely! Cane Corsos are loyal, affectionate, and protective family companions. They bond deeply with their families and are gentle with children when properly socialized. They do require consistent training, early socialization, and an owner who understands large guardian breeds.",
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
