const steps = [
  {
    number: '01',
    icon: 'fas fa-file-alt',
    title: 'Submit Application',
    description:
      'Download and complete our puppy application. Tell us about yourself, your home, and your experience with dogs. This helps us ensure our puppies go to the right families.',
    action: {
      label: 'Download Application',
      url: 'https://68d44440-23aa-4cf9-9540-9a5a9aa9e1f5.filesusr.com/ugd/a1daef_2afc7c66278544a69068d974a0cf995b.pdf',
    },
  },
  {
    number: '02',
    icon: 'fas fa-search',
    title: 'Application Review',
    description:
      'We carefully review every application within 48 hours. We may reach out with additional questions. Our goal is to find the perfect match — for you and for the puppy.',
    action: null,
  },
  {
    number: '03',
    icon: 'fas fa-check-circle',
    title: 'Approval & Deposit',
    description:
      'Once approved, a $500.00 non-refundable security deposit reserves your spot. No payment is accepted before approval. We accept payment via Zelle, Venmo, or cash.',
    action: {
      label: 'Download Deposit Form',
      url: 'https://68d44440-23aa-4cf9-9540-9a5a9aa9e1f5.filesusr.com/ugd/a1daef_4b4e47c2dbb448b58a49b63f515860f6.pdf',
    },
  },
  {
    number: '04',
    icon: 'fas fa-camera',
    title: 'Puppy Updates',
    description:
      "From birth through go-home day, we send regular photos and videos of your puppy's growth and development. You'll watch your pup grow week by week.",
    action: null,
  },
  {
    number: '05',
    icon: 'fas fa-file-signature',
    title: 'Purchase Agreement',
    description:
      'Before go-home day, we finalize your Purchase Agreement & Health Guarantee. This outlines our 2-year health warranty, care requirements, and responsibilities on both sides.',
    action: {
      label: 'Preview Agreement',
      url: 'https://68d44440-23aa-4cf9-9540-9a5a9aa9e1f5.filesusr.com/ugd/a1daef_ce8ff670475d4df78c398010430adcbf.pdf',
    },
  },
  {
    number: '06',
    icon: 'fas fa-home',
    title: 'Go-Home Day',
    description:
      "At 8 weeks old your puppy is ready! Pick up in person at our home in Centralia, IL — always our first choice — or we'll help coordinate transport. Your puppy goes home with a full care package and lifetime breeder support. Please note: the remaining balance of the total purchase price is due in full prior to the puppy leaving our care. All funds must be fully cleared and confirmed by the financial institution before any puppy is released — no exceptions.",
    action: null,
  },
]

export default function ProcessTimeline() {
  return (
    <section className="process-section" id="process">
      <div className="section-header">
        <span className="section-label">How It Works</span>
        <h2>The Adoption Process</h2>
        <p>
          We make the process straightforward and transparent from start to go-home day.
          Here&apos;s exactly what to expect.
        </p>
      </div>

      <div className="timeline">
        {steps.map((step, i) => (
          <div className="timeline-item" key={step.number}>
            <div className="timeline-left">
              <div className="timeline-number">{step.number}</div>
              {i < steps.length - 1 && <div className="timeline-connector" />}
            </div>
            <div className="timeline-card">
              <div className="timeline-icon">
                <i className={step.icon} />
              </div>
              <div className="timeline-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {step.action && (
                  <a
                    href={step.action.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="timeline-link"
                  >
                    <i className="fas fa-external-link-alt" />
                    {step.action.label}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="process-cta">
        <p>Ready to get started?</p>
        <a
          href="https://68d44440-23aa-4cf9-9540-9a5a9aa9e1f5.filesusr.com/ugd/a1daef_2afc7c66278544a69068d974a0cf995b.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-large"
        >
          <i className="fas fa-file-alt" />
          Start Your Application
        </a>
      </div>
    </section>
  )
}
