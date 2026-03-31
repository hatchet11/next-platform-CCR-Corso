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
        href="https://whatsapp.com/channel/0029Vb7sKhQKWEKzTmBqqi2h"
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
