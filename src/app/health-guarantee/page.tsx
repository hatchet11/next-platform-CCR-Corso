import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Health Guarantee & Contract | CCR Kennels',
  description: 'CCR Kennels Health Guarantee and Purchase Contract for Italian Cane Corso puppies. 72-hour health guarantee and 24-month congenital defect guarantee.',
  alternates: { canonical: 'https://www.ccrcorsos.com/health-guarantee' },
}

const sections = [
  {
    num: 1,
    text: `The determination of when the puppy is ready to transition to its new home rests solely with the SELLER. Typically, this occurs between 8 to 10 weeks of age, contingent upon the puppy's weight and its weaning process from the mother. Under no circumstances will the puppy be permitted to leave before it is deemed ready.`,
  },
  {
    num: 2,
    text: `The SELLER guarantees that the puppy is in good health, free from known contagious diseases, and has received the vaccinations appropriate for its age at the time of this agreement. This guarantee does not cover conditions such as umbilical hernias, acquired tail or ear deformities, worms, Giardia, Coccidia, or ear yeast infections, as these are not genetic disorders and are commonly found in puppies.`,
  },
  {
    num: 3,
    text: `A qualified veterinarian has conducted a physical examination of the puppy. The SELLER offers a 72-hour Health Guarantee against any immediate life-threatening illness identified during your health examination.`,
  },
  {
    num: 4,
    text: `The BUYER agrees to schedule a veterinary appointment for the new puppy before bringing him/her home or within 72 hours of this agreement. It is the BUYER's responsibility to ensure this appointment occurs within the 72-hour guarantee period. This time frame covers the replacement of the puppy with one of equal value should a life-threatening illness be diagnosed. Cash refunds will not be issued, and the BREEDER will not be liable for any veterinary expenses incurred by the BUYER.`,
  },
  {
    num: 5,
    text: `Upon the puppy's departure from the kennel, the SELLER will provide the immunization and worming records. The BUYER will receive the AKC and/or ICCF registration papers once the SELLER has them.`,
  },
  {
    num: 6,
    text: `The SELLER provides a 24-month guarantee (commencing from the whelp date) against any life-threatening congenital defects in the puppy. In the event such a defect is identified, the puppy must be returned to the breeder, and the BUYER will receive another puppy of the same breed when one becomes available. Cash refunds are not offered.`,
  },
  {
    num: 7,
    text: `A life-threatening illness refers specifically to a condition that would lead to the immediate death of the puppy. Should the BUYER decide to withdraw from the purchase at any point, all payments made toward the puppy will be forfeited and the puppy will be relisted as available. Once a deposit is made on a puppy, the SELLER will no longer advertise that puppy for sale. Cash refunds are not provided.`,
  },
  {
    num: 8,
    text: `The SELLER does not guarantee the puppy's temperament, size, color, breeding potential, or show quality.`,
  },
  {
    num: 9,
    text: `Replacement puppies will only be provided in cases of immediate life-threatening congenital issues that arise during the health guarantee period, provided the following conditions are met: (1) The SELLER must be informed within 24 hours of the diagnosis, (2) all health records and diagnoses must be submitted to the SELLER, and (3) the SELLER reserves the right to have the puppy evaluated by a certified veterinarian of their choice to confirm the diagnosis. Cash refunds are not available.`,
  },
  {
    num: 10,
    text: `The priority for the availability of replacement puppies is determined by our waiting list and will not override any existing reservations. The SELLER makes no guarantees regarding the timing of replacement puppies. Cash refunds are not offered.`,
  },
  {
    num: 11,
    text: `The BUYER is responsible for keeping the puppy up-to-date on all vaccinations and deworming treatments. The puppy is not guaranteed against common issues such as parasites and worms, which can be easily treated with veterinary care and medication. The puppy has received all necessary medications to prevent and address these common conditions.`,
  },
  {
    num: 12,
    text: `Hypoglycemia is a serious health concern but is not covered under this health warranty. This condition typically arises from excessive activity and/or insufficient food intake, both of which are within the BUYER's control.`,
  },
  {
    num: 13,
    text: `By signing this agreement, the BUYER certifies that the dog will reside in their home — not in a kennel — and will receive adequate exercise, specialized training suitable for large dominant breeds, nutritious food, and necessary veterinary care from a licensed veterinarian. The BUYER also confirms that they are not acting as an agent in this transaction.`,
  },
  {
    num: 14,
    text: `The SELLER does not guarantee against loss of the dog due to accidental death, theft, illness, or any other circumstances beyond the SELLER's control. If the dog develops hip dysplasia or life-threatening genetic defects within 24 months of birth, the BUYER may return the dog to the SELLER for a replacement puppy of equal value, chosen by the SELLER when one becomes available. Note: it is advised that the puppy refrain from excessive jumping during the first 12 months of life, as this can contribute to dysplasia.`,
  },
  {
    num: 15,
    text: `The SELLER reserves the right to have a second veterinarian of their choosing evaluate the dog's condition before honoring the warranty. The BUYER may choose to keep the dog if they wish. Under no circumstances will the SELLER cover or assist with any veterinary expenses incurred after the purchase of the dog, including expenses related directly or indirectly to any inheritable or genetic defects.`,
  },
  {
    num: 16,
    text: `FULL BREEDING RIGHTS: If this puppy is sold with Full Registration (Breeding Rights) as stipulated in the contract, a female may not be bred until her second heat cycle or 24 months of age, whichever is later. All guarantees will be rendered null and void if the female is bred before her second heat or prior to reaching 18 months of age. Not all puppies will be sold with full breeding rights. All puppies bought with full breeding rights must obtain DNA testing and pass a PennHIP evaluation by a veterinarian prior to breeding. Buyer must use "CCR Kennels" before the chosen name when registering with AKC or ICCF.`,
  },
  {
    num: 17,
    text: `If placed as a breeding dog, the SELLER is not responsible for the bitch's or sire's ability to breed, the quality of pups, or the size of litters. It is the BUYER's sole responsibility for all bills incurred from breeding the dog.`,
  },
  {
    num: 18,
    text: `This sales contract is non-transferable. Should the BUYER relinquish ownership of the dog, transfer ownership, sell, or euthanize the dog for any reason, this sales contract shall be deemed null and void.`,
  },
  {
    num: 19,
    text: `Should the SELLER need to seek legal action against the BUYER for violations of this agreement, the BUYER will assume any and all attorney costs and court fees. This contract must be presented to the SELLER for any of its guarantees to be in effect. Any and all legal actions are to take place in Marion County, Illinois. This contract is limited between the SELLER and BUYER and is not transferable.`,
  },
]

export default function HealthGuarantee() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', background: 'var(--primary-black)', padding: '6rem 1rem 4rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontFamily: 'Cinzel,serif', color: 'var(--accent-gold)', fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>CCR Kennels of Southern Illinois</span>
            <h1 style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(1.8rem,4vw,2.6rem)', margin: '0.5rem 0 1rem', color: 'var(--text-light)' }}>
              Health Guarantee &amp; Contract
            </h1>
            <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto', lineHeight: '1.8', fontSize: '0.95rem' }}>
              Please read all terms carefully. This contract will be signed in person at the time of pickup, or a copy will be mailed to you prior to that point in the process.
            </p>
          </div>

          {/* Guarantee highlights */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
            {[
              { icon: '🐾', title: '72-Hour Health Guarantee', desc: 'Against any immediate life-threatening illness after pickup' },
              { icon: '📋', title: '24-Month Congenital Guarantee', desc: 'Against life-threatening genetic defects from whelp date' },
              { icon: '💉', title: 'Vaccinations Current', desc: 'Puppy is up-to-date on all age-appropriate vaccinations at time of sale' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ background: 'rgba(201,162,39,0.05)', border: '1px solid rgba(201,162,39,0.2)', borderRadius: '10px', padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{icon}</div>
                <div style={{ fontFamily: 'Cinzel,serif', color: 'var(--accent-gold)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>{title}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.6' }}>{desc}</div>
              </div>
            ))}
          </div>

          {/* Registration notice */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,162,39,0.15)', borderRadius: '10px', padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--accent-gold)', fontSize: '1.1rem', flexShrink: 0, marginTop: '2px' }}>ℹ️</div>
            <div>
              <div style={{ fontFamily: 'Cinzel,serif', color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Registration Options</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.7', margin: 0 }}>
                <strong style={{ color: 'var(--text-light)' }}>Full Registration (Breeding Rights):</strong> All puppies sold with full registration must use &ldquo;CCR Kennels&rdquo; before the chosen name when registering with AKC or ICCF.<br />
                <strong style={{ color: 'var(--text-light)' }}>Limited Registration:</strong> For companion/pet only. The dog must not be used for breeding.
              </p>
            </div>
          </div>

          {/* Contract terms */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,162,39,0.12)', borderRadius: '12px', padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'Cinzel,serif', color: 'var(--accent-gold)', fontSize: '1.1rem', marginBottom: '1.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(201,162,39,0.2)', letterSpacing: '0.08em' }}>
              CONTRACT TERMS &amp; CONDITIONS
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {sections.map(({ num, text }) => (
                <div key={num} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    minWidth: '28px', height: '28px', borderRadius: '50%',
                    background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.3)',
                    color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    marginTop: '2px',
                  }}>{num}</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.8', margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Signing notice */}
          <div style={{ background: 'rgba(201,162,39,0.06)', border: '1px solid rgba(201,162,39,0.25)', borderRadius: '10px', padding: '1.5rem', textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontFamily: 'Cinzel,serif', color: 'var(--accent-gold)', fontSize: '1rem', marginBottom: '0.5rem' }}>Signing This Contract</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.8', margin: '0 auto', maxWidth: '560px' }}>
              This contract will be signed by both parties <strong style={{ color: 'var(--text-light)' }}>in person at the time of pickup</strong>, or a printed copy can be mailed to you in advance. If you have any questions about these terms before that time, please reach out to us directly.
            </p>
            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:7069737697" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.5rem', background: 'var(--accent-gold)', color: '#000', fontFamily: 'Cinzel,serif', fontSize: '0.85rem', fontWeight: 700, borderRadius: '4px', textDecoration: 'none', letterSpacing: '0.05em' }}>
                📞 (706) 973-7697
              </a>
              <a href="mailto:ccrkennels2022@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.5rem', background: 'transparent', color: 'var(--accent-gold)', border: '1px solid var(--accent-gold)', fontFamily: 'Cinzel,serif', fontSize: '0.85rem', fontWeight: 700, borderRadius: '4px', textDecoration: 'none', letterSpacing: '0.05em' }}>
                ✉ Email Us
              </a>
            </div>
          </div>

          {/* Legal footer */}
          <p style={{ color: '#444', fontSize: '0.78rem', textAlign: 'center', lineHeight: '1.7' }}>
            Upon signing, both BUYER and SELLER agree to all terms stated in this contract. Any civil action shall be held in Marion County, Illinois — Marion County Courthouse, 100 E. Main Street, Salem, IL 62881.
          </p>

        </div>
      </div>
      <Footer />
    </>
  )
}
