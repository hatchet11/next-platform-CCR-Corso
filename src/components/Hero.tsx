export default function Hero() {
  return (
    <section className="hero" id="home">
      <img
        className="hero-bg"
        src="/images/hero-bg.webp"
        alt=""
        fetchPriority="high"
        aria-hidden="true"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-badge">
          <i className="fas fa-medal" />
          Veteran Owned &amp; Operated
        </div>
        <h1>
          Premium <span>Italian Cane Corso</span> Puppies
        </h1>
        <p className="hero-subtitle">
          AKC registered champion bloodlines, DNA health tested, with a 2-year health guarantee.
          Raising healthy, happy Corsos in Southern Illinois.
        </p>
        <div className="hero-buttons">
          <a
            href="/adoption-application"
            className="btn btn-primary"
          >
            <i className="fas fa-paw" />
            Submit Adoption Application
          </a>
          <a href="#gallery" className="btn btn-secondary">
            <i className="fas fa-paw" />
            View Our Dogs
          </a>
        </div>
      </div>
      <a href="#about" className="hero-scroll">
        <span>Scroll Down</span>
        <i className="fas fa-chevron-down" />
      </a>
    </section>
  )
}
