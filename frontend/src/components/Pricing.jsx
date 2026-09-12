import {
  Check,
  ArrowUpRight,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { books } from "../data/content";

function Pricing() {
  const { addToCart } = useCart();

  // =========================================
  // ADD BOOK TO CART
  // =========================================

  const handleAddToCart = (book) => {
    if (!book.available || book.price === null) {
      return;
    }

    addToCart({
      id: book.id,
      title: book.title,
      price: book.price,
      image: book.images?.cover || null,
      description: book.description,
    });

    // Open cart drawer
    window.dispatchEvent(
      new Event("cart:open")
    );
  };

  return (
    <section
      id="pricing"
      className="pricing section"
    >

      {/* =========================================
          SECTION HEADING
      ========================================= */}

      <div className="section-heading centered">

        <p className="eyebrow">
          OUR BOOKS
        </p>

        <h2>
          Choose your
          <br />
          <i>next read.</i>
        </h2>

        <p>
          Practical books designed to help you
          build better focus, discipline, confidence
          and mindset.
        </p>

      </div>


      {/* =========================================
          BOOK GRID
      ========================================= */}

      <div className="pricing-grid">

        {books.map((book, index) => (

          <article
            className={`price-card ${
              index === 0 ? "featured" : ""
            }`}
            key={book.id}
          >

            {/* =====================================
                FEATURED LABEL
            ===================================== */}

            {index === 0 && (
              <div className="featured-label">
                FEATURED
              </div>
            )}


            {/* =====================================
                BOOK COVER
            ===================================== */}

            <img
  src={
    index === 0
      ? book.images?.cover
      : book.images?.mockup
  }
  alt={`${book.title} book`}
  loading="lazy"
/>


            {/* =====================================
                BOOK TYPE + CATEGORY
            ===================================== */}

            <div className="price-meta">

              <span className="price-tag">
                {book.type}
              </span>

              <span className="price-category">
                {book.category}
              </span>

            </div>


            {/* =====================================
                BOOK TITLE
            ===================================== */}

            <h3>
              {book.title}
            </h3>


            {/* =====================================
                SUBTITLE
            ===================================== */}

            {book.subtitle && (
              <p className="price-subtitle">
                {book.subtitle}
              </p>
            )}


            {/* =====================================
                AUTHOR
            ===================================== */}

            {book.author && (
              <p className="price-author">
                By {book.author}
              </p>
            )}


            {/* =====================================
                DESCRIPTION
            ===================================== */}

            <p className="price-description">
              {book.description}
            </p>


            {/* =====================================
                FEATURES
            ===================================== */}

            <ul>

              <li>
                <Check size={17} />
                <span>
                  Digital access
                </span>
              </li>

              <li>
                <Check size={17} />
                <span>
                  Instant delivery
                </span>
              </li>

              <li>
                <Check size={17} />
                <span>
                  Phone, tablet & computer
                </span>
              </li>

              <li>
                <Check size={17} />
                <span>
                  One-time purchase
                </span>
              </li>

            </ul>


            {/* =====================================
                PRICE
            ===================================== */}

            <div className="price">

              {book.price !== null ? (
                <>
                  <span className="current-price">
                    ₹{book.price.toLocaleString("en-IN")}
                  </span>

                  {book.oldPrice && (
                    <del>
                      ₹{book.oldPrice.toLocaleString("en-IN")}
                    </del>
                  )}
                </>
              ) : (
                <span className="price-coming">
                  Price coming soon
                </span>
              )}

            </div>


            {/* =====================================
                ADD TO CART BUTTON
            ===================================== */}

            <button
              className={`button full ${
                index === 0
                  ? "light"
                  : "dark"
              }`}
              onClick={() =>
                handleAddToCart(book)
              }
              type="button"
              disabled={
                !book.available ||
                book.price === null
              }
            >

              <ShoppingBag size={17} />

              <span>
                {book.available &&
                book.price !== null
                  ? "ADD TO CART"
                  : "COMING SOON"}
              </span>

              <ArrowUpRight size={18} />

            </button>

          </article>

        ))}

      </div>

    </section>
  );
}

export default Pricing;