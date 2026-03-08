export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <div className="cta-badge">
          <i className="fas fa-clipboard-list" />
          Start Your Journey
        </div>
        <h2>Ready to Welcome a Corso Into Your Family?</h2>
        <p>
          Complete our adoption application to begin the process. We review all applications
          carefully to ensure our puppies go to loving, prepared homes.
        </p>
        <div className="cta-buttons">
          <a
            href="https://68d44440-23aa-4cf9-9540-9a5a9aa9e1f5.filesusr.com/ugd/a1daef_2afc7c66278544a69068d974a0cf995b.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-large"
          >
            <i className="fas fa-file-download" />
            Download Application
          </a>
          <a href="#contact" className="btn btn-secondary">
            <i className="fas fa-question-circle" />
            Have Questions?
          </a>
        </div>
        <div className="forms-grid">
          <a
            href="https://68d44440-23aa-4cf9-9540-9a5a9aa9e1f5.filesusr.com/ugd/a1daef_ce8ff670475d4df78c398010430adcbf.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="form-link"
          >
            <i className="fas fa-file-contract" />
            <span>Purchase Agreement &amp; Health Guarantee</span>
          </a>
          <a
            href="https://68d44440-23aa-4cf9-9540-9a5a9aa9e1f5.filesusr.com/ugd/a1daef_4b4e47c2dbb448b58a49b63f515860f6.pdf"
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
