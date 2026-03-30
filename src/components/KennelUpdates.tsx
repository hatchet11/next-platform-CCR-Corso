'use client'

import { useEffect, useState } from 'react'

type Update = { id: string; title: string; body: string; createdAt: string }

export default function KennelUpdates() {
  const [updates, setUpdates] = useState<Update[]>([])

  useEffect(() => {
    fetch('/api/updates')
      .then(r => r.json())
      .then(data => setUpdates(Array.isArray(data) ? data.slice(0, 3) : []))
      .catch(() => {})
  }, [])

  if (updates.length === 0) return null

  return (
    <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '3rem 5%' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <span className="section-label">From the Kennel</span>
          <h2>Latest Updates</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {updates.map(u => (
            <div key={u.id} style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem 1.5rem' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>
                {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '8px' }}>{u.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, whiteSpace: 'pre-wrap' }}>{u.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
