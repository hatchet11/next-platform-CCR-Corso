'use client'

import { useState, useEffect } from 'react'

const adults = [
  { src: '/images/gallery/legion-liberty-house-1.jpg', alt: 'Legion and Liberty in front of the house', title: 'Legion & Liberty' },
  { src: '/images/gallery/legion-liberty-house-2.jpg', alt: 'Legion and Liberty looking up', title: 'Legion & Liberty' },
  { src: '/images/gallery/legion-liberty-grass.jpg', alt: 'Legion and Liberty on the grass', title: 'Legion & Liberty' },
  { src: '/images/gallery/liberty-grass.jpg', alt: 'Liberty relaxing on the grass', title: 'Liberty' },
  { src: '/images/gallery/dogs-swimming.jpg', alt: 'Dogs swimming in the pond', title: 'Pond Day' },
  { src: '/images/gallery/dogs-sunset-pond.jpg', alt: 'Dogs at the pond at sunset', title: 'Sunset Swim' },
  { src: '/images/gallery/legion-tree.jpg', alt: 'Legion on a fallen tree', title: 'Legion' },
  { src: '/images/gallery/legion-bath.jpg', alt: 'Legion after a bath', title: 'Bath Day' },
]

const puppies = [
  // Mom with litter
  { src: '/images/gallery/mom-newborns-1.jpg', alt: 'Liberty with her newborn puppies', title: 'New Litter' },
  { src: '/images/gallery/mom-newborns-2.jpg', alt: 'Mom nursing her newborn puppies', title: 'Day 1' },
  { src: '/images/gallery/mom-nursing.jpg', alt: 'Mom with her newborns', title: 'Mom & Pups' },
  // Individual newborns
  { src: '/images/gallery/pup-newborn-hand.jpg', alt: 'Tiny newborn Cane Corso puppy', title: 'Day 1' },
  { src: '/images/gallery/pup-newborn-pink.jpg', alt: 'Newborn puppy — pink collar', title: 'Pink Girl' },
  { src: '/images/gallery/pup-newborn-red.jpg', alt: 'Newborn puppy — red collar', title: 'Red Boy' },
  { src: '/images/gallery/pup-newborn-blue.jpg', alt: 'Newborn puppy — blue collar', title: 'Blue Boy' },
  { src: '/images/gallery/pup-newborn-orange.jpg', alt: 'Newborn puppy — orange collar', title: 'Orange Boy' },
  { src: '/images/gallery/pup-newborn-black-pink.jpg', alt: 'Newborn black puppy — pink collar', title: 'Pink Girl' },
  { src: '/images/gallery/pup-newborn-front.jpg', alt: 'Newborn puppy front portrait', title: 'Chocolate Girl' },
  // 3-week pupdate series
  { src: '/images/gallery/pup-3wk-grey.jpg', alt: 'Grey puppy — 3 weeks old', title: 'Pupdate: 3 Weeks' },
  { src: '/images/gallery/pup-3wk-blue.jpg', alt: 'Blue puppy — 3 weeks old', title: 'Pupdate: 3 Weeks' },
  { src: '/images/gallery/pup-3wk-darkgrey.jpg', alt: 'Dark grey puppy — 3 weeks old', title: 'Pupdate: 3 Weeks' },
  { src: '/images/gallery/pup-3wk-grey-purple.jpg', alt: 'Grey puppy purple collar — 3 weeks old', title: 'Pupdate: 3 Weeks' },
  { src: '/images/gallery/pup-3wk-black.jpg', alt: 'Black puppy — 3 weeks old', title: 'Pupdate: 3 Weeks' },
  { src: '/images/gallery/pup-3wk-black-pink.jpg', alt: 'Black puppy pink collar — 3 weeks old', title: 'Pupdate: 3 Weeks' },
  { src: '/images/gallery/pup-3wk-black-green.jpg', alt: 'Black puppy green collar — 3 weeks old', title: 'Pupdate: 3 Weeks' },
  { src: '/images/gallery/pup-3wk-brindle-red.jpg', alt: 'Brindle puppy red collar — 3 weeks old', title: 'Pupdate: 3 Weeks' },
  { src: '/images/gallery/pup-3wk-brindle-orange.jpg', alt: 'Brindle puppy orange collar — 3 weeks old', title: 'Pupdate: 3 Weeks' },
]

const families = [
  { src: '/images/gallery/family-mom-boys.jpg', alt: 'Liberty with her litter and two boys', title: 'Meet the Litter' },
  { src: '/images/gallery/family-boy-puppies.jpg', alt: 'Boy holding puppies outside', title: 'Puppy Love' },
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
            <div className="gallery-section-divider"><span>Adult Dogs</span></div>
            <PhotoGrid photos={adults} onOpen={openLightbox} />
            <div className="gallery-section-divider"><span>Puppies</span></div>
            <PhotoGrid photos={puppies} onOpen={openLightbox} />
            <div className="gallery-section-divider"><span>Happy Families</span></div>
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
