export default function TrustBadges() {
  return (
    <div className="trust-section">
      <div className="trust-badges">
        <a className="trust-badge" href="https://marketplace.akc.org/breeder/cody-rose-172424" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <i className="fas fa-certificate" />
          <div className="trust-badge-text">
            <strong>AKC Registered</strong>
            <span>Champion Bloodlines</span>
          </div>
        </a>
        <div className="trust-badge">
          <i className="fas fa-dna" />
          <div className="trust-badge-text">
            <strong>DNA Health Tested</strong>
            <span>Genetic Screening</span>
          </div>
        </div>
        <div className="trust-badge">
          <i className="fas fa-shield-alt" />
          <div className="trust-badge-text">
            <strong>2-Year Guarantee</strong>
            <span>Health Warranty</span>
          </div>
        </div>
        <div className="trust-badge">
          <i className="fas fa-truck" />
          <div className="trust-badge-text">
            <strong>Nationwide Shipping</strong>
            <span>Safe Delivery</span>
          </div>
        </div>
      </div>
    </div>
  )
}
