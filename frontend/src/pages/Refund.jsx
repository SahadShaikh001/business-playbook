import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Refund() {
  const navigate = useNavigate();

  return (
    <main className="legal-page">
      <div className="legal-container">

        <button
          className="legal-back"
          onClick={() => navigate("/")}
          type="button"
        >
          <ArrowLeft size={16} />
          BACK TO BUSINESS PLAYBOOK
        </button>

        <header className="legal-header">
          <p className="eyebrow">LEGAL</p>

          <h1>
            Refund <i>Policy.</i>
          </h1>

          <p>Last updated: September 2026</p>
        </header>

        <div className="legal-content">

          <section>
            <span className="legal-number">01</span>
            <h2>General Policy</h2>

            <p>
              We want you to have a positive experience with Business
              Playbook products. Because many of our products are digital
              and can be accessed electronically, digital purchases may
              generally not be eligible for refunds after delivery or access.
            </p>
          </section>

          <section>
            <span className="legal-number">02</span>
            <h2>Digital Products</h2>

            <p>
              Digital products such as PDFs and Kindle-compatible books are
              considered delivered when access or delivery instructions are
              provided to the email address submitted during checkout.
            </p>

            <p>
              If you experience a genuine technical problem preventing access
              to a purchased product, please contact our support team so we
              can investigate and assist you.
            </p>
          </section>

          <section>
            <span className="legal-number">03</span>
            <h2>Physical Products</h2>

            <p>
              If a physical product arrives damaged, defective, or materially
              different from the product ordered, please contact us within a
              reasonable period after delivery with relevant order information
              and photographs where appropriate.
            </p>
          </section>

          <section>
            <span className="legal-number">04</span>
            <h2>Incorrect Information</h2>

            <p>
              Customers are responsible for providing accurate email, billing
              and delivery information during checkout.
            </p>

            <p>
              We may not be responsible for failed delivery caused by
              incorrect information supplied by the customer.
            </p>
          </section>

          <section>
            <span className="legal-number">05</span>
            <h2>Refund Requests</h2>

            <p>
              Refund requests should include your order details, the reason
              for the request and any relevant supporting information.
            </p>

            <p>
              Each request will be reviewed according to the circumstances
              of the purchase and applicable law.
            </p>
          </section>

          <section>
            <span className="legal-number">06</span>
            <h2>Processing Refunds</h2>

            <p>
              Where a refund is approved, the refund will generally be
              processed through the original payment method or another
              appropriate method.
            </p>
          </section>

          <section className="legal-contact">
            <span className="legal-number">07</span>
            <h2>Contact</h2>

            <p>
              For refund or order-related questions, contact our support team:
            </p>

            <a
              href="mailto:support@businessplaybook.com"
              className="legal-email"
            >
              <Mail size={16} />
              support@businessplaybook.com
            </a>
          </section>

        </div>

        <div className="legal-footer">
          <div className="legal-footer-note">
            <ShieldCheck size={16} />
            <span>
              Your purchase is protected by our refund policy.
            </span>
          </div>

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

export default Refund;