'use client'

import { useState } from 'react'

export default function Waitlist() {
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    await fetch('/api/send-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'Waitlist Signup',
        signerName: data.get('name') as string,
        signerDate: new Date().toLocaleDateString(),
        fields: {
          'Full Name': data.get('name') as string,
          'Email': data.get('email') as string,
          'Phone': data.get('phone') as string,
          'Sex Preference': data.get('preference') as string,
        },
      }),
    })
    setSubmitted(true)
  }

  return (
    <section className="waitlist-section" id="waitlist">
      <div className="waitlist-inner">
        <div className="waitlist-text">
          <span className="section-label">Stay Informed</span>
          <h2>Join the Waitlist</h2>
          <p>
            Our litters fill up fast. Join the waitlist and be the first to know when new puppies
            are available — before we post publicly.
          </p>
          <ul className="waitlist-perks">
            <li><i className="fas fa-bell" /> First access to new litter announcements</li>
            <li><i className="fas fa-camera" /> Early puppy photos &amp; updates</li>
            <li><i className="fas fa-tag" /> Priority selection of sex &amp; color</li>
            <li><i className="fas fa-envelope" /> No spam — only litter news</li>
          </ul>
        </div>

        <div className="waitlist-form-wrap">
          {submitted ? (
            <div className="waitlist-success">
              <i className="fas fa-paw" />
              <h3>You&apos;re on the list!</h3>
              <p>We&apos;ll reach out as soon as a new litter is announced.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="waitlist-form"
            >
              <div className="form-group">
                <label htmlFor="wl-name">Full Name *</label>
                <input type="text" id="wl-name" name="name" required placeholder="Jane Smith" />
              </div>
              <div className="form-group">
                <label htmlFor="wl-email">Email *</label>
                <input type="email" id="wl-email" name="email" required placeholder="jane@example.com" />
              </div>
              <div className="form-group">
                <label htmlFor="wl-phone">Phone</label>
                <input type="tel" id="wl-phone" name="phone" placeholder="(555) 000-0000" />
              </div>
              <div className="form-group">
                <label htmlFor="wl-preference">Preference</label>
                <select id="wl-preference" name="preference">
                  <option value="">No preference</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="either">Either</option>
                </select>
              </div>
              <button type="submit" className="form-submit">
                <i className="fas fa-bell" />
                Join the Waitlist
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
