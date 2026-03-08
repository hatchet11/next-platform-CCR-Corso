import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Purchase Agreement | CCR Kennels',
  description: 'CCR Kennels Purchase Agreement — terms and conditions for the purchase of an Italian Cane Corso puppy from CCR Kennels of Southern Illinois.',
}

const sections = [
  {
    num: 1,
    title: 'Prospective Family Evaluation',
    text: `CCR Kennels conducts interviews with each prospective family to ensure they are a suitable match for a Cane Corso puppy and understand the commitment involved. This may include completing a questionnaire or adoption application.`,
  },
  {
    num: 2,
    title: 'Time Commitment & Responsibilities',
    text: `Purchasers acknowledge the significant time, financial, and emotional investment required for a Cane Corso. A stable and caring environment is crucial for a happy and well-adjusted dog. We prioritize placing our puppies in the best possible homes.`,
  },
  {
    num: 3,
    title: 'Training & Socialization',
    text: `Buyers are encouraged to enroll their puppy in obedience classes and provide proper socialization opportunities. This contributes to a well-behaved and socially competent dog.`,
  },
  {
    num: 4,
    title: 'Buyer Responsibility',
    text: `The BUYER is responsible for the care, training, and socialization of the puppy. This includes adhering to appropriate training practices and actively addressing any behavioral concerns.`,
  },
  {
    num: 5,
    title: 'Temperament & Match',
    text: `CCR Kennels will not place a puppy with a family if we believe the temperament of either the puppy or the family is not a suitable match.`,
  },
  {
    num: 6,
    title: 'Building a Relationship',
    text: `CCR Kennels strives to build long-lasting relationships with all our new families. We consider our puppies as part of our family and want to see them thrive in a loving home.`,
  },
  {
    num: 7,
    title: 'Buyer Commitment',
    text: `The BUYER confirms that they have adequately prepared themselves and their home for this specific breed. The BUYER is committed to providing the ongoing training and care necessary for the puppy's well-being. Under no circumstances shall the BUYER abandon, sell, surrender to a shelter, or terminate the life of the puppy or dog due to issues related to temperament, size, or color.`,
  },
  {
    num: 8,
    title: 'Return Policy',
    text: `Should the BUYER find themselves unable to care for the puppy or dog, they agree to return the animal to the breeder at their own expense without any financial restitution.`,
  },
  {
    num: 9,
    title: 'No Guarantees on Traits',
    text: `CCR Kennels of Southern Illinois does not guarantee the temperament, size, color, or show potential of the puppy.`,
  },
  {
    num: 10,
    title: 'Deposit & Payment',
    text: `A monetary deposit of $500 is required to reserve a puppy. The BUYER may make payments until the puppies reach 8 weeks of age. The final payment is due at that time, and all shipping or pick-up arrangements must be completed and paid in full. Acceptable payment methods include cash, CashApp, or Venmo.`,
  },
  {
    num: 11,
    title: 'Signing of Agreement',
    text: `Signing of this Purchase Agreement is conducted at the time of deposit transaction. The Health Guarantee Contract will be signed separately at the time of pickup.`,
  },
  {
    num: 12,
    title: 'Extended Stay',
    text: `Puppies held beyond the scheduled pick-up date may incur an extended stay fee, or may be offered to another prospective family at our discretion, rendering the original contract null and void.`,
  },
  {
    num: 13,
    title: 'Non-Refundable Deposit',
    text: `The deposit is non-refundable unless there is a health issue concerning the puppy. In such cases, the BUYER may transfer their deposit and any payments made toward another available puppy.`,
  },
  {
    num: 14,
    title: 'Agreement to All Terms',
    text: `By placing a deposit on a puppy, the BUYER agrees to all terms and conditions outlined in this Purchase Agreement and the kennel's sales policy. There are no exceptions to these terms.`,
  },
  {
    num: 15,
    title: 'Breach of Agreement',
    text: `Any civil action will be held at the Marion County Courthouse, District 5, Circuit 4th — 100 E. Main Street, Salem, IL 62881.`,
  },
]

export default function PurchaseAgreement() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', background: 'var(--primary-black)', padding: '6rem 1rem 4rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontFamily: 'Cinzel,serif', color: 'var(--accent-gold)', fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>CCR Kennels of Southern Illinois</span>
            <h1 style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(1.8rem,4vw,2.6rem)', margin: '0.5rem 0 1rem', color: 'var(--text-light)' }}>
              Purchase Agreement
            </h1>
            <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto', lineHeight: '1.8', fontSize: '0.95rem' }}>
              This document outlines the terms and conditions for the purchase of a Cane Corso puppy from CCR Kennels. Please read all terms carefully before placing a deposit.
            </p>
          </div>

          {/* Key highlights */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
            {[
              { icon: '💰', title: '$500 Deposit', desc: 'Required to reserve your puppy. Payments accepted until 8 weeks of age.' },
              { icon: '🤝', title: 'Signed at Deposit', desc: 'This agreement is signed at the time of your deposit transaction.' },
              { icon: '📄', title: 'Health Guarantee', desc: 'A separate Health Guarantee Contract is signed at the time of pickup.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ background: 'rgba(201,162,39,0.05)', border: '1px solid rgba(201,162,39,0.2)', borderRadius: '10px', padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{icon}</div>
                <div style={{ fontFamily: 'Cinzel,serif', color: 'var(--accent-gold)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>{title}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.6' }}>{desc}</div>
              </div>
            ))}
          </div>

          {/* Important notice */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,162,39,0.15)', borderRadius: '10px', padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--accent-gold)', fontSize: '1.1rem', flexShrink: 0, marginTop: '2px' }}>⚠️</div>
            <div>
              <div style={{ fontFamily: 'Cinzel,serif', color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>Important Notice</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.8', margin: 0 }}>
                Please ensure you are fully prepared for the time commitment, training, and financial responsibilities associated with a large, dominant breed puppy before placing a deposit. This breed is not suitable for novice dog owners and should be socialized with people, young children, and other dogs regularly as a puppy and throughout adulthood.
              </p>
            </div>
          </div>

          {/* Contract terms */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,162,39,0.12)', borderRadius: '12px', padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'Cinzel,serif', color: 'var(--accent-gold)', fontSize: '1.1rem', marginBottom: '1.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(201,162,39,0.2)', letterSpacing: '0.08em' }}>
              TERMS &amp; CONDITIONS
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {sections.map(({ num, title, text }) => (
                <div key={num} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ minWidth: '28px', height: '28px', borderRadius: '50%', background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.3)', color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>{num}</div>
                  <div>
                    <div style={{ fontFamily: 'Cinzel,serif', color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '0.3rem', letterSpacing: '0.04em' }}>{title}</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.8', margin: 0 }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Signing notice */}
          <div style={{ background: 'rgba(201,162,39,0.06)', border: '1px solid rgba(201,162,39,0.25)', borderRadius: '10px', padding: '1.5rem', textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontFamily: 'Cinzel,serif', color: 'var(--accent-gold)', fontSize: '1rem', marginBottom: '0.5rem' }}>Ready to Place a Deposit?</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.8', margin: '0 auto 1.25rem', maxWidth: '540px' }}>
              This agreement is signed at the time of deposit. Fill out your adoption application first, and we will be in touch to walk you through the next steps.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/adoption-application" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.75rem', background: 'var(--accent-gold)', color: '#000', fontFamily: 'Cinzel,serif', fontSize: '0.85rem', fontWeight: 700, borderRadius: '4px', textDecoration: 'none', letterSpacing: '0.05em' }}>
                🐾 Apply Now
              </a>
              <a href="mailto:ccrkennels2022@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.75rem', background: 'transparent', color: 'var(--accent-gold)', border: '1px solid var(--accent-gold)', fontFamily: 'Cinzel,serif', fontSize: '0.85rem', fontWeight: 700, borderRadius: '4px', textDecoration: 'none', letterSpacing: '0.05em' }}>
                ✉ Contact Us
              </a>
            </div>
          </div>

          {/* Legal footer */}
          <p style={{ color: '#444', fontSize: '0.78rem', textAlign: 'center', lineHeight: '1.7' }}>
            By placing a deposit, the BUYER agrees to all terms stated in this agreement. Civil actions shall be held at Marion County Courthouse, 100 E. Main Street, Salem, IL 62881.
          </p>

        </div>
      </div>
      <Footer />
    </>
  )
}
