'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <a href="#" className="logo">
        <img
          src="/images/logo.webp"
          alt="CCR Kennels Logo"
          width={50}
          height={38}
        />
        <div className="logo-text">
          <span>CCR Kennels</span>
          <span>Italian Cane Corso</span>
        </div>
      </a>

      <ul className={`nav-links ${menuOpen ? 'active' : ''}`} id="navLinks">
        <li><a href="#home" onClick={closeMenu}>Home</a></li>
        <li><a href="#about" onClick={closeMenu}>About</a></li>
        <li><a href="#available" onClick={closeMenu}>Puppies</a></li>
        <li><a href="#gallery" onClick={closeMenu}>Gallery</a></li>
        <li><a href="#testimonials" onClick={closeMenu}>Reviews</a></li>
        <li><a href="/adoption-application" onClick={closeMenu}>Apply Here</a></li>
        <li><a href="#faq" onClick={closeMenu}>FAQ</a></li>
        <li><a href="/blog" onClick={closeMenu}>Blog</a></li>
        <li><a href="/spring-litter-2026.html" onClick={closeMenu} style={{ color: '#c9a227', fontWeight: 700 }}>Spring Litter</a></li>
        <li>
          <a
            href="/adoption-application"
            className="nav-cta"
            onClick={closeMenu}
          >
            Apply Now
          </a>
        </li>
      </ul>

      <button
        className={`mobile-menu-btn ${menuOpen ? 'active' : ''}`}
        id="mobileMenuBtn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  )
}
