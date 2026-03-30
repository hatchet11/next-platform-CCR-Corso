'use client'

import { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    await fetch('/api/send-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'Contact Form',
        signerName: `${data.get('firstName')} ${data.get('lastName')}`,
        signerDate: new Date().toLocaleDateString(),
        fields: {
          'First Name': data.get('firstName') as string,
          'Last Name': data.get('lastName') as string,
          'Email': data.get('email') as string,
          'Phone': data.get('phone') as string,
          'Interested In': data.get('interest') as string,
          'Message': data.get('message') as string,
        },
      }),
    })

    setSubmitted(true)
  }

  return (
    <section className="contact-section" id="contact">
      <div className="section-header">
        <span className="section-label">Get In Touch</span>
        <h2>Contact Us</h2>
        <p>
          Ready to welcome a Corso into your family? Have questions? We&apos;d love to hear from
          you!
        </p>
      </div>
      <div className="contact-container">
        <div className="contact-info">
          <h3>Let&apos;s Connect</h3>
          <p>
            Whether you&apos;re interested in an upcoming litter, have questions about the breed, or
            just want to learn more about CCR Kennels, we&apos;re here to help. Reach out anytime!
          </p>
          <div className="contact-details">
            <div className="contact-item">
              <i className="fas fa-phone" />
              <div className="contact-item-text">
                <strong>Phone</strong>
                <a href="tel:7069737697">(706) 973-7697</a>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope" />
              <div className="contact-item-text">
                <strong>Email</strong>
                <a href="mailto:ccrkennels2022@gmail.com">ccrkennels2022@gmail.com</a>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt" />
              <div className="contact-item-text">
                <strong>Location</strong>
                <span>1602 Woods Ln, Centralia, IL 62801</span>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-clock" />
              <div className="contact-item-text">
                <strong>Response Time</strong>
                <span>Usually within 24 hours</span>
              </div>
            </div>
          </div>
          <div className="social-links">
            <a
              href="https://www.facebook.com/people/CCR-Kennels/61550619435436/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              href="https://www.instagram.com/ccr_kennels_of_soil/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </a>
            <a
              href="https://www.tiktok.com/@ccr_kennels"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="TikTok"
            >
              <i className="fab fa-tiktok" />
            </a>
          </div>
        </div>

        <div className="contact-form">
          <h3>Send Us a Message</h3>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <i className="fas fa-paw" style={{ fontSize: '3rem', color: 'var(--accent-gold)', marginBottom: '1rem', display: 'block' }} />
              <h4 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>Message Sent!</h4>
              <p style={{ color: 'var(--text-muted)' }}>We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form
              id="contactForm"
              onSubmit={handleSubmit}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input type="text" id="firstName" name="firstName" required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input type="text" id="lastName" name="lastName" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" name="phone" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="interest">I&apos;m Interested In</label>
                <select id="interest" name="interest">
                  <option value="">Select an option</option>
                  <option value="upcoming">Upcoming Litters</option>
                  <option value="available">Available Puppies</option>
                  <option value="stud">Stud Service</option>
                  <option value="question">General Question</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell us about yourself and what you're looking for..."
                />
              </div>
              <button type="submit" className="form-submit">
                <i className="fas fa-paper-plane" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
