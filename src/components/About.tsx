export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="section-header">
        <span className="section-label">Our Story</span>
        <h2>Welcome to CCR Kennels</h2>
        <p>
          Veteran-owned and family-operated, we&apos;re dedicated to raising exceptional Italian Cane
          Corsos with love, care, and commitment to the breed.
        </p>
      </div>
      <div className="about-content">
        <div className="about-image">
          <img
            src="/images/about.webp"
            alt="CCR Kennels - Italian Cane Corso"
            loading="lazy"
          />
        </div>
        <div className="about-text">
          <h3>The Home of Happy Corsos</h3>
          <p>
            At CCR Kennels, located in beautiful Southern Illinois, we are passionate about breeding
            and raising healthy, well-tempered Italian Cane Corsos. As a veteran-owned business, we
            bring discipline, dedication, and integrity to everything we do.
          </p>
          <p>
            Our dogs are raised as family members, socialized from birth, and given the best
            nutrition and veterinary care. We carefully select our breeding pairs for health,
            temperament, and adherence to breed standards.
          </p>
          <p>
            Every puppy that leaves our home is AKC registered, DNA health tested, fully vaccinated,
            and comes with our comprehensive 2-year health guarantee. We&apos;re committed to
            supporting our puppy families for life.
          </p>
          <div className="about-features">
            <div className="about-feature">
              <i className="fas fa-heart" />
              <span>Family Raised</span>
            </div>
            <div className="about-feature">
              <i className="fas fa-home" />
              <span>Home Environment</span>
            </div>
            <div className="about-feature">
              <i className="fas fa-user-md" />
              <span>Vet Checked</span>
            </div>
            <div className="about-feature">
              <i className="fas fa-award" />
              <span>Champion Lines</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
