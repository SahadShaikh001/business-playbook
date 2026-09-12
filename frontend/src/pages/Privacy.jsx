import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Privacy() {
  const navigate = useNavigate();

  return (
    <main className="legal-page">
      <div className="legal-container">

        {/* Back Button */}
        <button
          className="legal-back"
          onClick={() => navigate("/")}
          type="button"
        >
          <ArrowLeft size={16} />
          <span>BACK TO BUSINESS PLAYBOOK</span>
        </button>

        {/* Header */}
        <header className="legal-header">
          <div className="legal-header-icon">
            <ShieldCheck size={22} />
          </div>

          <p className="eyebrow">LEGAL</p>

          <h1>
            Privacy <i>Policy.</i>
          </h1>

          <p className="legal-updated">
            Last updated: September 2026
          </p>
        </header>

        {/* Content */}
        <div className="legal-content">

          {/* 01 */}
          <section className="legal-section">
            <div className="legal-section-top">
              <span className="legal-number">01</span>
              <span className="legal-line" />
            </div>

            <h2>Introduction</h2>

            <p>
              Business Playbook respects your privacy and is committed to
              protecting the information you provide while using our website
              and purchasing our products.
            </p>

            <p>
              This Privacy Policy explains what information we may collect,
              how we use it and the choices available to you.
            </p>
          </section>

          {/* 02 */}
          <section className="legal-section">
            <div className="legal-section-top">
              <span className="legal-number">02</span>
              <span className="legal-line" />
            </div>

            <h2>Information We Collect</h2>

            <p>
              When you place an order, make a payment or contact us, we may
              collect information such as:
            </p>

            <ul>
              <li>Your name</li>
              <li>Email address</li>
              <li>Phone number, where required</li>
              <li>Billing information</li>
              <li>Shipping information for physical products</li>
              <li>Information you provide when contacting support</li>
            </ul>

            <p>
              We only request information that is reasonably necessary to
              provide our products and services.
            </p>
          </section>

          {/* 03 */}
          <section className="legal-section">
            <div className="legal-section-top">
              <span className="legal-number">03</span>
              <span className="legal-line" />
            </div>

            <h2>How We Use Your Information</h2>

            <p>
              Your information may be used for the following purposes:
            </p>

            <ul>
              <li>Process and manage your orders.</li>
              <li>Provide purchased digital products.</li>
              <li>Ship physical products where applicable.</li>
              <li>Respond to customer support requests.</li>
              <li>Improve our website and services.</li>
              <li>Communicate important order-related information.</li>
              <li>Prevent fraud and unauthorized activity.</li>
            </ul>
          </section>

          {/* 04 */}
          <section className="legal-section">
            <div className="legal-section-top">
              <span className="legal-number">04</span>
              <span className="legal-line" />
            </div>

            <h2>Payment Information</h2>

            <p>
              Payments may be processed through third-party payment providers.
              We do not intend to store complete payment card information on
              our website.
            </p>

            <p>
              Payment information may be handled directly by the relevant
              payment provider according to its own privacy and security
              practices.
            </p>
          </section>

          {/* 05 */}
          <section className="legal-section">
            <div className="legal-section-top">
              <span className="legal-number">05</span>
              <span className="legal-line" />
            </div>

            <h2>Cookies</h2>

            <p>
              Our website may use cookies or similar technologies to remember
              preferences, maintain website functionality and understand how
              visitors interact with the website.
            </p>

            <p>
              You may be able to control cookies through your browser
              settings. Disabling certain cookies may affect some website
              functionality.
            </p>
          </section>

          {/* 06 */}
          <section className="legal-section">
            <div className="legal-section-top">
              <span className="legal-number">06</span>
              <span className="legal-line" />
            </div>

            <h2>Data Security</h2>

            <p>
              We take reasonable measures to protect information from
              unauthorized access, alteration, disclosure or destruction.
            </p>

            <p>
              However, no method of electronic transmission or storage can be
              guaranteed to be completely secure. You should therefore
              understand that no online service can guarantee absolute
              security.
            </p>
          </section>

          {/* 07 */}
          <section className="legal-section">
            <div className="legal-section-top">
              <span className="legal-number">07</span>
              <span className="legal-line" />
            </div>

            <h2>Third-Party Services</h2>

            <p>
              Our website may use third-party services for payment processing,
              analytics, hosting, communication, security or product delivery.
            </p>

            <p>
              These providers may process information according to their own
              applicable privacy policies and terms.
            </p>
          </section>

          {/* 08 */}
          <section className="legal-section">
            <div className="legal-section-top">
              <span className="legal-number">08</span>
              <span className="legal-line" />
            </div>

            <h2>Your Choices</h2>

            <p>
              You may contact us regarding your personal information or ask
              questions about how your information is collected and handled.
            </p>

            <p>
              Where applicable, you may also request correction of inaccurate
              information or ask about the handling of your personal data.
            </p>
          </section>

          {/* 09 */}
          <section className="legal-section">
            <div className="legal-section-top">
              <span className="legal-number">09</span>
              <span className="legal-line" />
            </div>

            <h2>Contact</h2>

            <p>
              If you have questions or concerns about this Privacy Policy,
              please contact us.
            </p>

            <a
              className="legal-email"
              href="mailto:support@businessplaybook.com"
            >
              support@businessplaybook.com
            </a>
          </section>

        </div>

        {/* Bottom CTA */}
        <div className="legal-footer">
          <button
            onClick={() => navigate("/")}
            type="button"
          >
            <ArrowLeft size={16} />
            <span>RETURN TO BUSINESS PLAYBOOK</span>
          </button>
        </div>

      </div>
    </main>
  );
}

export default Privacy;