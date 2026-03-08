'use client'

import { useState } from 'react'

const testimonials = [
  {
    stars: 5,
    text: "We couldn't be happier with our Corso from CCR Kennels! The entire process was professional and caring. Our puppy arrived healthy, well-socialized, and has the most amazing temperament. The ongoing support from the breeders has been invaluable.",
    name: 'The Johnson Family',
    location: 'Texas',
    year: '2025',
  },
  {
    stars: 5,
    text: "CCR Kennels is the real deal. Our male Corso is everything we hoped for — stunning conformation, great temperament, and perfectly healthy. The documentation and health testing gave us total confidence. We'll be back for our next Corso without hesitation.",
    name: 'Marcus & Diana R.',
    location: 'Florida',
    year: '2025',
  },
  {
    stars: 5,
    text: "As first-time Cane Corso owners we had a hundred questions. CCR Kennels answered every single one — before AND after we brought our girl home. The lifetime breeder support is not just a selling point, it's genuine. Couldn't recommend them more highly.",
    name: 'The Williams Family',
    location: 'Georgia',
    year: '2024',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="section-header">
        <span className="section-label">Happy Families</span>
        <h2>What Our Families Say</h2>
        <p>Read testimonials from families who have welcomed a CCR Kennels puppy into their homes.</p>
      </div>

      <div className="testimonials-container">
        <div className="testimonial-slide">
          <div className="testimonial-stars">
            {Array.from({ length: testimonials[current].stars }).map((_, i) => (
              <i key={i} className="fas fa-star" />
            ))}
          </div>
          <p className="testimonial-text">&ldquo;{testimonials[current].text}&rdquo;</p>
          <div className="testimonial-author">
            <div className="testimonial-author-info">
              <h4>{testimonials[current].name}</h4>
              <span>{testimonials[current].location} &bull; Puppy Owner {testimonials[current].year}</span>
            </div>
          </div>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="review-cta">
        <p>Happy with your CCR Kennels experience?</p>
        <a
          href="https://search.google.com/local/writereview?placeid=ChIJCCR-Kennels"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary review-btn"
        >
          <i className="fab fa-google" />
          Leave Us a Google Review
        </a>
        <a
          href="https://www.facebook.com/people/CCR-Kennels/61550619435436/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary review-btn"
        >
          <i className="fab fa-facebook-f" />
          Review on Facebook
        </a>
      </div>
    </section>
  )
}
