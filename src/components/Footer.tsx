export default function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <a href="#" className="logo">
            <img
              src="/images/logo.webp"
              alt="CCR Kennels Logo"
              width={50}
              height={38}
              loading="lazy"
            />
            <div className="logo-text">
              <span>CCR Kennels</span>
              <span>Italian Cane Corso</span>
            </div>
          </a>
          <p>
            Veteran-owned Italian Cane Corso breeder in Southern Illinois. Raising healthy, happy,
            AKC registered puppies from champion bloodlines with love and dedication.
          </p>
          <div className="social-links">
            <a
              href="https://www.facebook.com/people/CCR-Kennels/61550619435436/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              href="https://www.instagram.com/ccr_kennels_of_soil/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </a>
            <a
              href="https://www.tiktok.com/@ccr_kennels"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="TikTok"
            >
              <i className="fab fa-tiktok" />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li>
              <a
                href="https://68d44440-23aa-4cf9-9540-9a5a9aa9e1f5.filesusr.com/ugd/a1daef_2afc7c66278544a69068d974a0cf995b.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            </li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Services</h4>
          <ul>
            <li><a href="#services">AKC Registration</a></li>
            <li><a href="#services">Health Testing</a></li>
            <li><a href="#services">Health Guarantee</a></li>
            <li><a href="#services">Nationwide Shipping</a></li>
            <li><a href="#services">Breeder Support</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Forms &amp; Documents</h4>
          <ul>
            <li>
              <a
                href="https://68d44440-23aa-4cf9-9540-9a5a9aa9e1f5.filesusr.com/ugd/a1daef_2afc7c66278544a69068d974a0cf995b.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Adoption Application
              </a>
            </li>
            <li>
              <a
                href="https://68d44440-23aa-4cf9-9540-9a5a9aa9e1f5.filesusr.com/ugd/a1daef_ce8ff670475d4df78c398010430adcbf.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Purchase Agreement
              </a>
            </li>
            <li>
              <a
                href="https://68d44440-23aa-4cf9-9540-9a5a9aa9e1f5.filesusr.com/ugd/a1daef_4b4e47c2dbb448b58a49b63f515860f6.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Security Deposit
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact Info</h4>
          <ul>
            <li><a href="tel:7069737697">(706) 973-7697</a></li>
            <li><a href="mailto:ccrkennels2022@gmail.com">ccrkennels2022@gmail.com</a></li>
            <li><span>Centralia, IL 62801</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 CCR Kennels, LLC. All Rights Reserved.</p>
        <div className="footer-bottom-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      <div className="footer-credit">
        <p>
          Website designed by{' '}
          <a href="mailto:Hatchet412@proton.me">Hatchet412@proton.me</a>
          {' '}&mdash; inquiries welcome for custom web design
        </p>
      </div>
    </footer>
  )
}
