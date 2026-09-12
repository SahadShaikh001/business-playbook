import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Mail,
  ShieldCheck,
} from "lucide-react";

function Footer() {
  const navigate = useNavigate();

  /* =========================================
     SCROLL TO HOME SECTION
  ========================================= */

  const scrollTo = (id) => {
    const goToSection = () => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    // Already on Home page
    if (window.location.pathname === "/") {
      goToSection();
      return;
    }

    // Go Home first, then scroll
    navigate("/");

    setTimeout(() => {
      goToSection();
    }, 150);
  };

  /* =========================================
     HOME
  ========================================= */

  const goHome = () => {
    navigate("/");

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  /* =========================================
     LEGAL PAGES
  ========================================= */

  const goToLegalPage = (path) => {
    navigate(path);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  /* =========================================
     EMAIL
  ========================================= */

  const sendEmail = () => {
    window.location.href =
      "mailto:lakshaymittal1805@gmail.com";
  };

  /* =========================================
     INSTAGRAM
  ========================================= */

  const openInstagram = () => {
    window.open(
      "https://www.instagram.com/psychologyinreal/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =========================================
     EXPLORE BOOKS
  ========================================= */

  const handleExploreBooks = () => {
    scrollTo("pricing");
  };

  return (
    <footer className="footer">

      {/* =====================================
          FOOTER CTA
      ===================================== */}

      <div className="footer-cta">

        <div className="footer-cta-content">

          <div className="footer-cta-copy">

            <p className="footer-eyebrow">
              BUILD YOUR PLAYBOOK
            </p>

            <h2>
              Read less.
              <br />
              <i>Apply more.</i>
            </h2>

          </div>

          <button
            className="footer-cta-button"
            onClick={handleExploreBooks}
            type="button"
          >
            <span>
              EXPLORE THE BOOKS
            </span>

            <ArrowUpRight size={17} />
          </button>

        </div>

      </div>


      {/* =====================================
          MAIN FOOTER
      ===================================== */}

      <div className="footer-main">

        {/* ===================================
            BRAND
        =================================== */}

        <div className="footer-brand">

          <button
            className="footer-brand-button"
            onClick={goHome}
            type="button"
            aria-label="Go to Business Playbook home"
          >

            <span className="footer-brand-mark">
              BP
            </span>

            <span className="footer-brand-name">
              BUSINESS PLAYBOOK
            </span>

          </button>


          <p className="footer-brand-description">
            Premium practical books built around
            confidence, focus, discipline, mindset
            and personal growth.
          </p>


          <p className="footer-brand-tagline">
            Written to be used,
            <br />
            not just finished.
          </p>

        </div>


        {/* ===================================
            EXPLORE
        =================================== */}

        <div className="footer-section">

          <h3>
            EXPLORE
          </h3>


          <button
            onClick={() =>
              scrollTo("pricing")
            }
            type="button"
          >
            The Books
          </button>


          <button
            onClick={() =>
              scrollTo("author")
            }
            type="button"
          >
            Author
          </button>


          <button
            onClick={() =>
              scrollTo("faq")
            }
            type="button"
          >
            FAQ
          </button>


          <button
            onClick={() =>
              scrollTo("reviews")
            }
            type="button"
          >
            Reviews
          </button>

        </div>


        {/* ===================================
            LEGAL
        =================================== */}

        <div className="footer-section">

          <h3>
            LEGAL
          </h3>


          <button
            onClick={() =>
              goToLegalPage("/terms")
            }
            type="button"
          >
            Terms & Conditions
          </button>


          <button
            onClick={() =>
              goToLegalPage("/privacy")
            }
            type="button"
          >
            Privacy Policy
          </button>


          <button
            onClick={() =>
              goToLegalPage("/refund")
            }
            type="button"
          >
            Refund Policy
          </button>

        </div>


        {/* ===================================
            CONTACT
        =================================== */}

        <div className="footer-section footer-contact">

          <h3>
            CONTACT
          </h3>


          {/* EMAIL */}

          <button
            className="footer-contact-link"
            onClick={sendEmail}
            type="button"
          >

            <Mail size={14} />

            <span>
              lakshaymittal1805@gmail.com
            </span>

          </button>


          {/* INSTAGRAM */}

          <button
            className="footer-contact-link"
            onClick={openInstagram}
            type="button"
          >

            <span
              className="footer-instagram-icon"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                />
              </svg>
            </span>

            <span>
              @psychologyinreal
            </span>

          </button>


          <p className="footer-support">
            For questions, support and
            purchase assistance.
          </p>

        </div>

      </div>


      {/* =====================================
          DIVIDER
      ===================================== */}

      <div className="footer-divider" />


      {/* =====================================
          FOOTER BOTTOM
      ===================================== */}

      <div className="footer-bottom">

        <span>
          © 2026 Business Playbook.
          All rights reserved.
        </span>


        <div className="footer-trust">

          <span>
            <ShieldCheck size={13} />
            Secure payments
          </span>


          <span className="footer-dot">
            ·
          </span>


          <span>
            Instant digital delivery
          </span>

        </div>

      </div>

    </footer>
  );
}

export default Footer;