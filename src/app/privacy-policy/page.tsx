import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | CCR Kennels',
  description: 'Privacy Policy for CCR Kennels — how we collect, use, and protect your information.',
  alternates: { canonical: 'https://www.ccrcorsos.com/privacy-policy' },
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
            <p className="policy-date">Last updated: March 30, 2026</p>
          </div>

          <div className="policy-body">
            <section className="policy-section">
              <h2>1. Introduction</h2>
              <p>
                CCR Kennels, LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates
                the website <strong>www.ccrcorsos.com</strong> (the &ldquo;Site&rdquo;). This Privacy
                Policy explains how we collect, use, disclose, and safeguard your information when
                you visit our Site or submit inquiries through our contact, application, or deposit forms.
              </p>
              <p>
                By using our Site, you agree to the collection and use of information in accordance
                with this policy. If you do not agree, please do not use the Site.
              </p>
            </section>

            <section className="policy-section">
              <h2>2. Information We Collect</h2>
              <h3>Information You Provide Directly</h3>
              <p>When you fill out our contact form, adoption application, or security deposit form, we may collect:</p>
              <ul>
                <li>First and last name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Mailing address</li>
                <li>Your message or inquiry details</li>
                <li>Puppy preference (sex, color, coat type)</li>
                <li>Household and living situation information</li>
                <li>Digital signature and date</li>
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
                <li>Process and evaluate puppy adoption applications</li>
                <li>Process security deposits and arrange puppy placement</li>
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
              <h2>4. Cookies, Tracking &amp; Analytics</h2>
              <p>
                Our Site uses cookies and tracking technologies to improve functionality and analyze
                traffic. We use the following third-party services:
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
                  <strong>Facebook Pixel (Meta Pixel)</strong> — we use the Meta Pixel to measure
                  advertising effectiveness and build audiences for ads. The Pixel collects
                  information about your actions on our Site (such as page views) and may associate
                  that data with your Facebook account if you are logged in. You can manage your
                  preferences through your{' '}
                  <a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer">
                    Facebook Ad Settings
                  </a>.
                  Meta&apos;s data policy is available at{' '}
                  <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">
                    facebook.com/privacy/policy
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
                  <strong>Netlify</strong> — our Site is hosted on Netlify, which serves our web
                  content and stores kennel photos and updates. Netlify&apos;s privacy policy is
                  available at{' '}
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
              <h2>5. Form Submissions &amp; Email Communications</h2>
              <p>
                When you submit a contact form, adoption application, or security deposit form
                through our Site, that data is transmitted via <strong>Resend</strong> (a
                transactional email service) directly to our inbox. Resend processes your submission
                solely for delivery purposes and does not retain or use your data for any other
                purpose. Resend&apos;s privacy policy is available at{' '}
                <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                  resend.com/legal/privacy-policy
                </a>.
              </p>
              <p>
                We use submitted information solely to respond to your inquiry or process your
                application. We do not use submitted information for unsolicited marketing.
              </p>
            </section>

            <section className="policy-section">
              <h2>6. Data Security</h2>
              <p>
                We take reasonable precautions to protect your personal information. Our Site is
                served over HTTPS (SSL encryption) and form data is transmitted via encrypted
                channels. However, no method of internet transmission is 100% secure, and we cannot
                guarantee absolute security.
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
                <li>Opt out of Facebook Pixel tracking via your Facebook Ad Settings</li>
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

      <Footer />
    </>
  )
}
