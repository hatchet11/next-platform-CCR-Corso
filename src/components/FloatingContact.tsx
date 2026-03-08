'use client'

import { useState, useEffect } from 'react'

export default function FloatingContact() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`floating-contact ${visible ? 'visible' : ''}`}>
      <a
        href="https://wa.me/17069737697?text=Hi%20CCR%20Kennels!%20I%27m%20interested%20in%20a%20Cane%20Corso%20puppy."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp"
        aria-label="WhatsApp us"
      >
        <i className="fab fa-whatsapp" />
        <span>WhatsApp Us</span>
      </a>
      <a href="tel:7069737697" className="floating-btn call" aria-label="Call us">
        <i className="fas fa-phone" />
        <span>Call Now</span>
      </a>
    </div>
  )
}
