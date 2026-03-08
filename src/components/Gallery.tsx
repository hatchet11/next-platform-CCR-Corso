'use client'

import { useState, useEffect } from 'react'

const adults = [
  {
    src: 'https://static.wixstatic.com/media/a1daef_88d23b183c834d8087dfa25c1238b404~mv2.png',
    alt: 'Legion and Liberty - CCR Kennels Cane Corso',
    title: 'Legion & Liberty',
  },
  {
    src: 'https://static.wixstatic.com/media/a1daef_1d1fb333150841b08bee8fb00f87fbaf~mv2.png',
    alt: 'Liberty Pedigree',
    title: 'Liberty',
  },
  {
    src: 'https://static.wixstatic.com/media/a1daef_b3f7394a1ce147d88ab60faf91cedee3~mv2.jpg',
    alt: 'Adult Cane Corso',
    title: 'Legion',
  },
]

const puppies = [
  {
    src: 'https://static.wixstatic.com/media/a1daef_e03b4720efbc4c8886864092a53d206e~mv2.jpeg',
    alt: 'Cane Corso Puppy',
    title: 'Puppy',
  },
  {
    src: 'https://static.wixstatic.com/media/a1daef_2ef72d7e0d6d453a96926ad727150a63~mv2.jpeg',
    alt: 'Cane Corso Puppies',
    title: 'Litter',
  },
  {
    src: 'https://static.wixstatic.com/media/a1daef_294445d6a89b48da838405d60ba0e710~mv2.jpeg',
    alt: 'Cane Corso Puppies',
    title: 'Siblings',
  },
  {
    src: 'https://static.wixstatic.com/media/a1daef_f3c2c55e69634c7699d8dbe1c54c4737~mv2.jpeg',
    alt: 'Cane Corso Puppy',
    title: 'Growing Strong',
  },
  {
    src: 'https://static.wixstatic.com/media/a1daef_8b3382e38fa14b3c9b8ae3309a86ac41~mv2.jpeg',
    alt: 'Cane Corso Puppy',
    title: 'Sweet Face',
  },
  {
    src: 'https://static.wixstatic.com/media/a1daef_3504914e104a453292365e42c543e99d~mv2.jpeg',
    alt: 'Cane Corso Puppy',
    title: 'Pup',
  },
]

const families = [
  {
    src: 'https://static.wixstatic.com/media/a1daef_9cbff718d7ca4ac987b05c91199568c6~mv2.jpg',
    alt: 'Happy Cane Corso Family',
    title: 'New Home',
  },
  {
    src: 'https://static.wixstatic.com/media/a1daef_678ac9395e96401ea93a3ab284f00cdf~mv2.jpg',
    alt: 'Cane Corso with Family',
    title: 'Forever Home',
  },
  {
    src: 'https://static.wixstatic.com/media/a1daef_a80c38ab024544c6a739f61edc9af97d~mv2.jpg',
    alt: 'Cane Corso Growing Up',
    title: 'Growing Up',
  },
]

type Photo = { src: string; alt: string; title: string }

const tabs = [
  { label: 'All Photos', filter: 'all' },
  { label: 'Adult Dogs', filter: 'adults' },
  { label: 'Puppies', filter: 'puppies' },
  { label: 'Happy Families', filter: 'families' },
]

function PhotoGrid({ photos, onOpen }: { photos: Photo[]; onOpen: (src: string, alt: string) => void }) {
  return (
    <div className="gallery-grid">
      {photos.map((photo) => (
        <div
          className="gallery-item"
          key={photo.src}
          onClick={() => onOpen(photo.src, photo.alt)}
        >
          <img src={photo.src} alt={photo.alt} loading="lazy" />
          <div className="gallery-item-overlay">
            <h4>{photo.title}</h4>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightboxSrc, setLightboxSrc] = useState('')
  const [lightboxAlt, setLightboxAlt] = useState('')
  const [lightboxOpen, setLightboxOpen] = useState(false)

  function openLightbox(src: string, alt: string) {
    setLightboxSrc(src)
    setLightboxAlt(alt)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  function closeLightbox() {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <section className="gallery-section" id="gallery">
        <div className="section-header">
          <span className="section-label">Our Dogs</span>
          <h2>Meet Our Corsos</h2>
          <p>Browse photos of our beautiful Italian Cane Corsos, past litters, and happy puppy families.</p>
        </div>

        <div className="gallery-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.filter}
              className={`gallery-tab ${activeFilter === tab.filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab.filter)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeFilter === 'all' ? (
          <>
            <div className="gallery-section-divider">
              <span>Adult Dogs</span>
            </div>
            <PhotoGrid photos={adults} onOpen={openLightbox} />

            <div className="gallery-section-divider">
              <span>Puppies</span>
            </div>
            <PhotoGrid photos={puppies} onOpen={openLightbox} />

            <div className="gallery-section-divider">
              <span>Happy Families</span>
            </div>
            <PhotoGrid photos={families} onOpen={openLightbox} />
          </>
        ) : activeFilter === 'adults' ? (
          <PhotoGrid photos={adults} onOpen={openLightbox} />
        ) : activeFilter === 'puppies' ? (
          <PhotoGrid photos={puppies} onOpen={openLightbox} />
        ) : (
          <PhotoGrid photos={families} onOpen={openLightbox} />
        )}
      </section>

      <div
        className={`lightbox ${lightboxOpen ? 'active' : ''}`}
        onClick={(e) => e.target === e.currentTarget && closeLightbox()}
      >
        <button className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
          <i className="fas fa-times" />
        </button>
        {lightboxSrc && <img src={lightboxSrc} alt={lightboxAlt} />}
      </div>
    </>
  )
}
