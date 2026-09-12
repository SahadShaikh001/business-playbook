import {
  ArrowUpRight,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "../context/CartContext";

function FinalCTA() {
  const { addBooksToCart } = useCart();

  /* =====================================================
     ALL 3 AVAILABLE BOOKS
  ===================================================== */

  const threeBooks = [
    {
      id: "how-to-attract-women",
      title: "How to Attract Women",
      price: 199,
      image:
        "/images/books/how-to-attract-women-cover.jpeg",
      description:
        "A practical guide focused on confidence, communication and self-development.",
    },

    {
      id: "dopamine-detox",
      title: "30 Day Dopamine Detox Workbook",
      price: 199,
      image:
        "/images/books/dopamine-detox.jpeg",
      description:
        "A 30-day workbook designed to help you build focus and reduce distractions.",
    },

    {
      id: "unlock-focus",
      title: "How to Unlock Your Focus",
      price: 199,
      image:
        "/images/books/unlock-focus-cover.jpeg",
      description:
        "A practical guide focused on concentration, reducing distractions and better focus.",
    },
  ];

  /* =====================================================
     GET ALL BOOKS
     Adds all 3 books to cart
     Collection price = ₹499
  ===================================================== */

  const handleGetBooks = () => {
    addBooksToCart(threeBooks);

    setTimeout(() => {
      window.dispatchEvent(
        new Event("cart:open")
      );
    }, 150);
  };

  return (
    <section className="final-cta section">
      <div className="final-cta-inner">

        {/* =================================================
           EYEBROW
        ================================================= */}

        <p className="eyebrow">
          START TODAY
        </p>

        {/* =================================================
           HEADING
        ================================================= */}

        <h2>
          Your next chapter
          <br />
          <i>starts with one idea.</i>
        </h2>

        {/* =================================================
           DESCRIPTION
        ================================================= */}

        <p className="final-cta-text">
          Choose any book individually for ₹199 —
          or get all 3 books together for just ₹499
          and build your complete playbook.
        </p>

        {/* =================================================
           BUTTON
        ================================================= */}

        <div className="cta-buttons">
          <button
            className="button light"
            onClick={handleGetBooks}
            type="button"
          >
            <ShoppingBag size={18} />

            <span>
              GET ALL BOOKS
            </span>

            <strong>
              ₹499
            </strong>

            <ArrowUpRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}

export default FinalCTA;