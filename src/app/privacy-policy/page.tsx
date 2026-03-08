import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | CCR Kennels',
  description: 'Privacy Policy for CCR Kennels — how we collect, use, and protect your information.',
}

export default function PrivacyPolicy() {
  return (
    <>
      <div className="bg-pattern" />
      <nav className="navbar scrolled" style={{ position: 'relative', background: 'var(--overlay-dark)' }}>
        <Link href="/" className="logo">
          <img
            src="/images/logo.webp"
            alt="CCR Kennels Logo"
          />
          <div className="logo-text">
            <span>CCR Kennels</span>
            <span>Italian Cane Corso</span>
          </div>
        </Link>
        <Link href="/" className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.6rem 1.5rem' }}>
          <i className="fas fa-arrow-left" /> Back to Home
        </Link>
      </nav>

      <main className="policy-page">
        <div className="policy-container">
          <div className="policy-header">
            <span className="section-label">Legal</span>
            <h1>Privacy Policy</h1>
            <p className="policy-date">Last updated: March 7, 2026</p>
          </div>

          <div className="policy-body">
            <section className="policy-section">
              <h2>1. Introduction</h2>
              <p>
                CCR Kennels, LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates
                the website <strong>www.ccrcorsos.com</strong> (the &ldquo;Site&rdquo;). This Privacy
                Policy explains how we collect, use, disclose, and safeguard your information when
                you visit our Site or submit inquiries through our contact and waitlist forms.
              </p>
              <p>
                By using our Site, you agree to the collection and use of information in accordance
                with this policy. If you do not agree, please do not use the Site.
              </p>
            </section>

            <section className="policy-section">
              <h2>2. Information We Collect</h2>
              <h3>Information You Provide Directly</h3>
              <p>When you fill out our contact form, waitlist form, or puppy application, we may collect:</p>
              <ul>
                <li>First and last name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Your message or inquiry details</li>
                <li>Puppy preference (sex, color)</li>
              </ul>
              <h3>Information Collected Automatically</h3>
              <p>
                When you visit our Site, certain information may be collected automatically,
                including your IP address, browser type, operating system, referring URLs, pages
                visited, and time spent on the Site. This is collected through cookies and
                third-party analytics tools described below.
              </p>
            </section>

            <section className="policy-section">
              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your inquiries and questions</li>
                <li>Process and evaluate puppy applications</li>
                <li>Notify waitlist members of upcoming litter availability</li>
                <li>Send litter updates, photos, and go-home information to reserved puppy families</li>
                <li>Improve our website and user experience</li>
                <li>Comply with applicable legal obligations</li>
              </ul>
              <p>
                We do <strong>not</strong> sell, rent, or trade your personal information to third
                parties for marketing purposes.
              </p>
            </section>

            <section className="policy-section">
              <h2>4. Cookies &amp; Analytics</h2>
              <p>
                Our Site may use cookies — small text files stored on your device — to improve
                functionality and analyze traffic. We may use the following third-party services:
              </p>
              <ul>
                <li>
                  <strong>Google Analytics 4</strong> — collects anonymized data about how visitors
                  use our Site (pages visited, time on site, device type). Google&apos;s privacy
                  policy is available at{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    policies.google.com/privacy
                  </a>.
                </li>
                <li>
                  <strong>Microsoft Clarity</strong> — records anonymized session data including
                  heatmaps and click patterns to help us improve the Site. Microsoft&apos;s privacy
                  policy is available at{' '}
                  <a href="https://privacy.microsoft.com" target="_blank" rel="noopener noreferrer">
                    privacy.microsoft.com
                  </a>.
                </li>
                <li>
                  <strong>Netlify</strong> — our Site is hosted on Netlify, which processes form
                  submissions on our behalf. Netlify&apos;s privacy policy is available at{' '}
                  <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">
                    netlify.com/privacy
                  </a>.
                </li>
              </ul>
              <p>
                You may opt out of Google Analytics by installing the{' '}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                  Google Analytics Opt-out Browser Add-on
                </a>. Most browsers also allow you to refuse or delete cookies through their settings.
              </p>
            </section>

            <section className="policy-section">
              <h2>5. Form Submissions &amp; Communications</h2>
              <p>
                When you submit a contact form, waitlist signup, or puppy application through our
                Site, that data is transmitted to and stored by Netlify on our behalf. We use this
                information solely to respond to your inquiry or process your application. We do not
                use submitted information for unsolicited marketing.
              </p>
              <p>
                If you join our waitlist, you consent to receiving communications from CCR Kennels
                regarding upcoming litter availability. You may opt out at any time by contacting
                us directly.
              </p>
            </section>

            <section className="policy-section">
              <h2>6. Data Security</h2>
              <p>
                We take reasonable precautions to protect your personal information. Our Site is
                served over HTTPS (SSL encryption), and form data is handled by Netlify&apos;s
                secure infrastructure. However, no method of internet transmission is 100% secure,
                and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="policy-section">
              <h2>7. Children&apos;s Privacy</h2>
              <p>
                Our Site is not directed to children under the age of 13. We do not knowingly
                collect personal information from children. If you believe a child has provided us
                with personal information, please contact us and we will promptly delete it.
              </p>
            </section>

            <section className="policy-section">
              <h2>8. Third-Party Links</h2>
              <p>
                Our Site contains links to third-party websites (such as pet transport services,
                AKC, Facebook, Instagram, and TikTok). We are not responsible for the privacy
                practices of those sites and encourage you to review their privacy policies
                separately.
              </p>
            </section>

            <section className="policy-section">
              <h2>9. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Request access to the personal data we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt out of future communications from us</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:ccrkennels2022@gmail.com">ccrkennels2022@gmail.com</a>.
              </p>
            </section>

            <section className="policy-section">
              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this
                page with an updated &ldquo;Last updated&rdquo; date. Continued use of the Site
                after any changes constitutes your acceptance of the revised policy.
              </p>
            </section>

            <section className="policy-section">
              <h2>11. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <ul>
                <li><strong>Business:</strong> CCR Kennels, LLC</li>
                <li><strong>Email:</strong> <a href="mailto:ccrkennels2022@gmail.com">ccrkennels2022@gmail.com</a></li>
                <li><strong>Phone:</strong> <a href="tel:7069737697">(706) 973-7697</a></li>
                <li><strong>Address:</strong> 1602 Woods Ln, Centralia, IL 62801</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <footer>
        <div className="footer-bottom" style={{ maxWidth: '100%', padding: '1.5rem 5%' }}>
          <p>&copy; 2024 CCR Kennels, LLC. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/">Home</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
