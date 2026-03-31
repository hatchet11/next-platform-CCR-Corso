export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Ready to Welcome a Corso Into Your Family?</h2>
        <p>
          Complete our adoption application to begin the process. We review all applications
          carefully to ensure our puppies go to loving, prepared homes.
        </p>
        <div className="cta-buttons">
          <a
            href="/adoption-application"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-large"
          >
            <i className="fas fa-file-alt" />
            Submit Application
          </a>
          <a href="#contact" className="btn btn-secondary">
            <i className="fas fa-question-circle" />
            Have Questions?
          </a>
        </div>
        <div className="forms-grid">
          <a
            href="/purchase-agreement"
            target="_blank"
            rel="noopener noreferrer"
            className="form-link"
          >
            <i className="fas fa-file-contract" />
            <span>Purchase Agreement &amp; Health Guarantee</span>
          </a>
          <a
            href="/security-deposit"
            target="_blank"
            rel="noopener noreferrer"
            className="form-link"
          >
            <i className="fas fa-hand-holding-usd" />
            <span>Security Deposit Form</span>
          </a>
        </div>
        <p className="cta-note">
          <i className="fas fa-info-circle" />
          Applications are reviewed within 48 hours. A deposit secures your puppy.
        </p>
      </div>
    </section>
  )
}
