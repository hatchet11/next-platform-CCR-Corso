'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function SecurityDeposit() {
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    await fetch('/api/send-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'Security Deposit Request',
        signerName: `${data.get('first-name')} ${data.get('last-name')}`,
        signerDate: new Date().toLocaleDateString(),
        fields: {
          'First Name': data.get('first-name') as string,
          'Last Name': data.get('last-name') as string,
          'Email': data.get('email') as string,
          'Phone': data.get('phone') as string,
          'Litter': data.get('litter') as string,
          'Sex Preference': data.get('sex-preference') as string,
          'Color Preference': data.get('color-preference') as string,
          'Payment Method': data.get('payment-method') as string,
          'Additional Notes': data.get('notes') as string,
        },
      }),
    })
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '100px', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ display: 'inline-block', background: 'var(--accent-gold)', color: '#000', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.35rem 1rem', borderRadius: '3px', marginBottom: '1rem' }}>
              Step 3 of 6
            </span>
            <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Security Deposit Form
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
              Congratulations on your approval! A <strong style={{ color: 'var(--accent-gold)' }}>$500 non-refundable security deposit</strong> reserves your spot in our upcoming litter. Please complete this form and we will follow up with payment instructions.
            </p>
          </div>

          {/* Deposit Notice */}
          <div style={{ background: 'rgba(201,162,39,0.08)', border: '1px solid rgba(201,162,39,0.3)', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <i className="fas fa-info-circle" style={{ color: 'var(--accent-gold)', marginTop: '2px', flexShrink: 0 }} />
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--text-primary)' }}>Payment is not collected through this form.</strong> After submitting, we will contact you with payment instructions. We accept <strong>Zelle, Venmo, and cash</strong>. Your spot is not reserved until the deposit is received and confirmed.
            </div>
          </div>

          {submitted ? (
            <div style={{ background: 'rgba(201,162,39,0.08)', border: '1px solid rgba(201,162,39,0.3)', borderRadius: '10px', padding: '3rem 2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🐾</div>
              <h2 style={{ fontFamily: 'Cinzel, serif', color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>Deposit Request Received!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                Thank you! We have received your security deposit request and will reach out within <strong>24 hours</strong> with payment instructions to complete your reservation.
              </p>
              <a href="/" style={{ display: 'inline-block', background: 'var(--accent-gold)', color: '#000', padding: '0.75rem 2rem', borderRadius: '6px', fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '0.05em' }}>
                Back to Home
              </a>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '2rem' }}
            >

              {/* Personal Info */}
              <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                Your Information
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                    First Name <span style={{ color: 'var(--accent-gold)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    required
                    placeholder="Jane"
                    style={{ width: '100%', padding: '0.7rem 1rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.95rem', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                    Last Name <span style={{ color: 'var(--accent-gold)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    required
                    placeholder="Doe"
                    style={{ width: '100%', padding: '0.7rem 1rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.95rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                    Email <span style={{ color: 'var(--accent-gold)' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email address"
                    autoComplete="off"
                    style={{ width: '100%', padding: '0.7rem 1rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.95rem', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                    Phone <span style={{ color: 'var(--accent-gold)' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="(555) 555-5555"
                    style={{ width: '100%', padding: '0.7rem 1rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.95rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Litter & Puppy Preference */}
              <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', color: 'var(--text-primary)', margin: '2rem 0 1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                Reservation Details
              </h2>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                  Litter <span style={{ color: 'var(--accent-gold)' }}>*</span>
                </label>
                <select
                  name="litter"
                  required
                  style={{ width: '100%', padding: '0.7rem 1rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.95rem', boxSizing: 'border-box' }}
                >
                  <option value="">Select a litter</option>
                  <option value="Spring 2026 — Liberty × Legion">Spring 2026 — Liberty × Legion (Expected April 2026)</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                    Sex Preference
                  </label>
                  <select
                    name="sex-preference"
                    style={{ width: '100%', padding: '0.7rem 1rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.95rem', boxSizing: 'border-box' }}
                  >
                    <option value="No preference">No preference</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                    Color Preference
                  </label>
                  <select
                    name="color-preference"
                    style={{ width: '100%', padding: '0.7rem 1rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.95rem', boxSizing: 'border-box' }}
                  >
                    <option value="No preference">No preference</option>
                    <option value="Black">Black</option>
                    <option value="Gray/Blue">Gray / Blue</option>
                    <option value="Fawn">Fawn</option>
                    <option value="Brindle">Brindle</option>
                    <option value="Black brindle">Black brindle</option>
                    <option value="Formentino">Formentino</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                  Preferred Payment Method <span style={{ color: 'var(--accent-gold)' }}>*</span>
                </label>
                <select
                  name="payment-method"
                  required
                  style={{ width: '100%', padding: '0.7rem 1rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.95rem', boxSizing: 'border-box' }}
                >
                  <option value="">Select payment method</option>
                  <option value="Zelle">Zelle</option>
                  <option value="Venmo">Venmo</option>
                  <option value="Cash">Cash (local pickup only)</option>
                </select>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Any questions or additional information you'd like us to know..."
                  style={{ width: '100%', padding: '0.7rem 1rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.95rem', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>

              {/* Agreement */}
              <div style={{ background: 'rgba(201,162,39,0.06)', border: '1px solid rgba(201,162,39,0.2)', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.75rem' }}>
                <label style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', cursor: 'pointer', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  <input type="checkbox" name="agrees-to-terms" value="yes" required style={{ marginTop: '3px', flexShrink: 0, accentColor: 'var(--accent-gold)' }} />
                  I understand the $500 security deposit is <strong style={{ color: 'var(--text-primary)' }}>non-refundable</strong> and secures my spot in the selected litter. I agree to the terms of the{' '}
                  <a href="/purchase-agreement" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)' }}>Purchase Agreement</a>. <span style={{ color: 'var(--accent-gold)' }}>*</span>
                </label>
              </div>

              <button
                type="submit"
                style={{ width: '100%', padding: '0.95rem', background: 'var(--accent-gold)', color: '#000', border: 'none', borderRadius: '8px', fontFamily: 'Cinzel, serif', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <i className="fas fa-hand-holding-usd" />
                Submit Deposit Request
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
