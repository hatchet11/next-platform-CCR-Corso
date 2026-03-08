'use client'

import { useState } from 'react'

type LinkGroup = { heading: string; items: { name: string; url: string }[] }
type FAQ = { q: string; a: string; note?: string; links?: LinkGroup[] }

const faqs: FAQ[] = [
  {
    q: 'What is included with each puppy?',
    a: 'Every CCR Kennels puppy comes with: AKC registration papers, DNA health testing documentation, veterinary health certificate, age-appropriate vaccinations and deworming, dew claws removed, tail docked, 2-year health guarantee, pedigree and AKC packet, puppy care guide, and a gift bag with food, toys, and a blanket with littermate scent.',
  },
  {
    q: 'How do I reserve a puppy?',
    a: "To reserve a puppy, contact us via phone, email, or our contact form. We'll discuss available puppies or upcoming litters, answer your questions, and if it's a good match, we'll send you our puppy application. Once approved, a $500.00 non-refundable security deposit secures your puppy. No payment is accepted until your application has been reviewed and approved. We provide regular updates with photos and videos until pickup or delivery.",
  },
  {
    q: 'Do you ship puppies nationwide?',
    a: "While we don't arrange shipping directly, we are happy to help guide you through the process of setting up transport for your new puppy. All coordination, scheduling, and payment for shipping is the sole responsibility of the buyer. That said, we've worked alongside several pet transport services over the years and have seen firsthand which ones handle our puppies with the care and professionalism they deserve — we're glad to share those recommendations below.",
    note: 'Ground transport is generally recommended for puppies as it tends to be less stressful — drivers stop regularly for walks and potty breaks and send photo and video updates along the way. As always, families are warmly welcome to pick up their puppy in person at our home in Centralia, Illinois, which we always encourage when possible.',
    links: [
      {
        heading: 'Ground Transport (Recommended for Puppies)',
        items: [
          { name: 'TLC Pet Transport', url: 'https://www.tlcpettransport.com' },
          { name: 'Royal Paws', url: 'https://royalpaws.com' },
          { name: 'Nationwide Pet Transport', url: 'https://www.nationwidepettransport.com' },
          { name: "MiMi's Pet Transport", url: 'https://www.mimispettransport.com' },
          { name: 'Secure Pet Transport', url: 'https://www.securepettransport.com' },
          { name: 'Blue Collar Pet Transport', url: 'https://bluecollarpettransport.com' },
          { name: 'CitizenShipper', url: 'https://www.citizenshipper.com' },
        ],
      },
      {
        heading: 'Air Transport',
        items: [
          { name: 'Airpets International', url: 'https://www.airpets.com' },
          { name: 'Air Animal Pet Movers', url: 'https://www.airanimal.com' },
          { name: 'Happy Tails Travel', url: 'https://www.happytailstravel.com' },
          { name: 'Pet Commute', url: 'https://www.petcommute.com' },
        ],
      },
    ],
  },
  {
    q: 'What health testing do you perform?',
    a: 'All our breeding dogs undergo comprehensive DNA genetic health testing through Embark or similar certified laboratories. We screen for breed-specific conditions including hip dysplasia, elbow dysplasia, cardiac issues, and genetic disorders. Health testing results are available upon request. Each puppy also receives a full veterinary examination before going home.',
  },
  {
    q: 'What is your health guarantee?',
    a: 'We provide a comprehensive 2-year health guarantee covering genetic/hereditary conditions. If your puppy is diagnosed with a covered condition within two years, we offer replacement or refund options. The guarantee requires proper veterinary care, appropriate nutrition, and adherence to our care guidelines. Full terms are provided in our written contract.',
  },
  {
    q: 'Are Cane Corsos good family dogs?',
    a: "Absolutely! Cane Corsos are loyal, affectionate, and protective family companions. They bond deeply with their families and are gentle with children when properly socialized. They do require consistent training, early socialization, and an owner who understands large guardian breeds. We're happy to discuss if a Corso is right for your lifestyle.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="faq-section" id="faq">
      <div className="section-header">
        <span className="section-label">Questions</span>
        <h2>Frequently Asked Questions</h2>
        <p>Find answers to common questions about our puppies, process, and the Cane Corso breed.</p>
      </div>
      <div className="faq-container">
        {faqs.map((faq, i) => (
          <div className="faq-item" key={i}>
            <button
              className={`faq-question ${openIndex === i ? 'active' : ''}`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              {faq.q}
              <i className="fas fa-chevron-down" />
            </button>
            <div className={`faq-answer ${openIndex === i ? 'open' : ''}`}>
              <div className="faq-answer-content">
                {faq.links ? (
                  <>
                    <p style={{ marginBottom: '1.2rem' }}>{faq.a}</p>
                    <div className="faq-shipping-groups">
                      {faq.links.map((group) => (
                        <div key={group.heading} className="faq-shipping-group">
                          <p className="faq-shipping-heading">{group.heading}</p>
                          <div className="faq-shipping-links">
                            {group.items.map((item) => (
                              <a
                                key={item.url}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="faq-shipping-link"
                              >
                                <i className="fas fa-external-link-alt" />
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p style={{ marginTop: '1.2rem', color: 'var(--cream)' }}>{faq.note}</p>
                  </>
                ) : (
                  faq.a
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
