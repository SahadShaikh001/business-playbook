import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Terms() {
  const navigate = useNavigate();

  return (
    <main className="legal-page">
      <div className="legal-container">

        {/* Back */}
        <button
          className="legal-back"
          onClick={() => navigate("/")}
          type="button"
        >
          <ArrowLeft size={16} />
          BACK TO BUSINESS PLAYBOOK
        </button>

        {/* Header */}
        <header className="legal-header">
          <p className="eyebrow">LEGAL</p>

          <h1>
            Terms & <i>Conditions.</i>
          </h1>

          <p>Last updated: September 2026</p>
        </header>

        {/* Content */}
        <div className="legal-content">

          {/* 01 */}
          <section>
            <span className="legal-number">01</span>

            <h2>Introduction</h2>

            <p>
              Welcome to Business Playbook. These Terms & Conditions
              govern your use of our website and your purchase of our
              digital and physical products.
            </p>

            <p>
              By accessing this website or purchasing a product, you
              agree to these terms. If you do not agree with any part
              of these terms, please do not use the website or purchase
              our products.
            </p>
          </section>

          {/* 02 */}
          <section>
            <span className="legal-number">02</span>

            <h2>Products</h2>

            <p>
              Business Playbook offers practical books and related
              digital products. Product descriptions, prices,
              availability and included formats are displayed on the
              website at the time of purchase.
            </p>

            <p>
              Digital products may include PDF and/or Kindle-compatible
              formats, depending on the product purchased.
            </p>
          </section>

          {/* 03 */}
          <section>
            <span className="legal-number">03</span>

            <h2>Orders & Payments</h2>

            <p>
              All orders are subject to product availability and
              successful payment confirmation.
            </p>

            <p>
              Prices displayed on the website are in Indian Rupees
              (INR) unless otherwise stated. We reserve the right to
              change product prices without prior notice.
            </p>
          </section>

          {/* 04 */}
          <section>
            <span className="legal-number">04</span>

            <h2>Digital Delivery</h2>

            <p>
              Digital products are intended to be delivered
              electronically after successful payment. Delivery
              instructions may be provided through the email address
              supplied during checkout.
            </p>

            <p>
              Please ensure that your email address and other checkout
              information are accurate.
            </p>
          </section>

          {/* 05 */}
          <section>
            <span className="legal-number">05</span>

            <h2>Intellectual Property</h2>

            <p>
              All books, text, graphics, branding, designs, logos and
              other content provided through Business Playbook are
              protected by applicable intellectual property laws.
            </p>

            <p>
              Purchased digital products are for personal use unless
              written permission is provided otherwise.
            </p>

            <p>
              You may not reproduce, redistribute, resell, upload,
              publish or commercially distribute our digital products
              without permission.
            </p>
          </section>

          {/* 06 */}
          <section>
            <span className="legal-number">06</span>

            <h2>User Responsibilities</h2>

            <p>
              You agree to provide accurate information during checkout
              and to use the website and purchased products lawfully.
            </p>
          </section>

          {/* 07 */}
          <section>
            <span className="legal-number">07</span>

            <h2>Limitation of Liability</h2>

            <p>
              The information contained in Business Playbook products
              is provided for educational and informational purposes.
              Results may vary between individuals.
            </p>

            <p>
              Business Playbook does not guarantee any specific
              personal, financial, professional or business outcome
              from using our products.
            </p>
          </section>

          {/* 08 */}
          <section>
            <span className="legal-number">08</span>

            <h2>Changes to These Terms</h2>

            <p>
              We may update these Terms & Conditions from time to time.
              Any changes will be published on this page with an
              updated revision date.
            </p>
          </section>

          {/* 09 */}
          <section className="legal-contact">
            <span className="legal-number">09</span>

            <h2>Contact</h2>

            <p>
              If you have questions about these Terms & Conditions,
              please contact us.
            </p>

            <p>
              <strong>support@businessplaybook.com</strong>
            </p>
          </section>

        </div>

        {/* Bottom CTA */}
        <div className="legal-footer">
          <button
            onClick={() => navigate("/")}
            type="button"
          >
            <ArrowLeft size={16} />
            RETURN TO BUSINESS PLAYBOOK
          </button>
        </div>

      </div>
    </main>
  );
}

export default Terms;