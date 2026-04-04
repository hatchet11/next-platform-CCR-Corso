export default function AvailablePuppies() {
  return (
    <section className="puppies-section" id="available">
      <div className="section-header">
        <span className="section-label">Puppies</span>
        <h2>Available &amp; Upcoming Litters</h2>
        <p>
          All CCR Kennels puppies are AKC registered, DNA health tested, and backed by our 2-year
          health guarantee. Submit your application to reserve your spot.
        </p>
      </div>

      <div className="litters-grid" style={{ maxWidth: '600px', margin: '0 auto 4rem' }}>
        <div className="litter-card waitlist">
          <div className="litter-header">
            <div className="litter-status">
              <span className="status-dot dot-waitlist" />
              <span className="status-badge badge-waitlist">Born — Accepting Reservations</span>
            </div>
            <div className="litter-deposit-badge">
              <span className="detail-label">Security Deposit</span>
              <span className="litter-price">$500.00</span>
            </div>
          </div>

          <h3 className="litter-title">Spring 2026 Litter</h3>

          <div className="litter-details">
            <div className="litter-detail">
              <span className="detail-label">Dam (Mother)</span>
              <span className="detail-value">Liberty</span>
            </div>
            <div className="litter-detail">
              <span className="detail-label">Sire (Father)</span>
              <span className="detail-value">Legion</span>
            </div>
            <div className="litter-detail">
              <span className="detail-label">Born</span>
              <span className="detail-value">March 30, 2026</span>
            </div>
            <div className="litter-detail">
              <span className="detail-label">Go-Home Date</span>
              <span className="detail-value">Late May 2026</span>
            </div>
          </div>

          <p className="litter-desc">
            Liberty &amp; Legion&apos;s Spring 2026 litter was born March 30, 2026! These pups will be
            ready for their forever homes 8 weeks later in late May. Reserve your puppy now
            before this litter fills up!
          </p>

          <div className="litter-notice">
            <i className="fas fa-info-circle" />
            <span>
              No payment is accepted until your puppy application has been reviewed and approved.
              A $500.00 security deposit secures your spot after approval.
            </span>
          </div>

          <a
            href="/adoption-application"
            className="btn btn-primary litter-btn"
          >
            <i className="fas fa-paw" />
            Submit Adoption Application
          </a>
        </div>
      </div>

      <div className="puppies-guarantee">
        <div className="guarantee-item">
          <i className="fas fa-certificate" />
          <span>AKC Registered</span>
        </div>
        <div className="guarantee-item">
          <i className="fas fa-dna" />
          <span>DNA Health Tested</span>
        </div>
        <div className="guarantee-item">
          <i className="fas fa-shield-alt" />
          <span>2-Year Guarantee</span>
        </div>
        <div className="guarantee-item">
          <i className="fas fa-syringe" />
          <span>Age-Appropriate Vaccines</span>
        </div>
        <div className="guarantee-item">
          <i className="fas fa-plane" />
          <span>Nationwide Shipping</span>
        </div>
      </div>
    </section>
  )
}
