import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  Menu,
  X,
  ShoppingBag,
  ArrowUpRight,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

import { useCart } from "../context/CartContext";


/* =========================================================
   NAVBAR
========================================================= */

function Navbar() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartCount,
    cartTotal,
    subtotal,
    discount,
    total,
    coupon,
    applyCoupon,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();


  const [menuOpen, setMenuOpen] =
    useState(false);

  const [cartOpen, setCartOpen] =
    useState(false);

  const [couponInput, setCouponInput] =
    useState("");

  const [couponMessage, setCouponMessage] =
    useState("");


  /* =======================================================
     OPEN CART EVENT
  ======================================================= */

  useEffect(() => {
    const openCart = () => {
      setCartOpen(true);
    };

    window.addEventListener(
      "cart:open",
      openCart
    );

    return () => {
      window.removeEventListener(
        "cart:open",
        openCart
      );
    };
  }, []);


  /* =======================================================
     BODY SCROLL LOCK
  ======================================================= */

  useEffect(() => {
    if (menuOpen || cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, cartOpen]);


  /* =======================================================
     SCROLL
  ======================================================= */

  const scrollTo = (id) => {
    setMenuOpen(false);

    setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };


  /* =======================================================
     CART
  ======================================================= */

  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };


  /* =======================================================
     CHECKOUT
  ======================================================= */

  const handleCheckout = () => {
    if (!cartItems.length) {
      return;
    }

    setCartOpen(false);

    navigate("/checkout");
  };


  /* =======================================================
     COUPON
  ======================================================= */

  const handleCoupon = () => {
    const result =
      applyCoupon(couponInput);

    setCouponMessage(
      result.message
    );

    if (result.success) {
      setCouponInput("");
    }
  };


  /* =======================================================
     FORMAT PRICE
  ======================================================= */

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString(
      "en-IN"
    );
  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="navbar">

        <div className="navbar-container">

          {/* =================================================
              BRAND
          ================================================= */}

          <button
            className="brand"
            onClick={() =>
              scrollTo("home")
            }
            type="button"
          >

            <span className="brand-mark">
              BP.
            </span>

            <span className="brand-name">
              BUSINESS PLAYBOOK
            </span>

          </button>


          {/* =================================================
              DESKTOP NAV
          ================================================= */}

          <nav className="desktop-nav">

            <button
              onClick={() =>
                scrollTo("pricing")
              }
              type="button"
            >
              THE BOOKS
            </button>

            <button
              onClick={() =>
                scrollTo("author")
              }
              type="button"
            >
              AUTHOR
            </button>

            <button
              onClick={() =>
                scrollTo("faq")
              }
              type="button"
            >
              FAQ
            </button>

          </nav>


          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="nav-actions">

            {/* CART */}

            <button
              className="cart-button"
              onClick={openCart}
              type="button"
              aria-label="Open cart"
            >

              <ShoppingBag size={18} />

              {cartCount > 0 && (
                <span className="cart-count">
                  {cartCount}
                </span>
              )}

            </button>


            {/* BUY */}

            <button
              className="nav-buy"
              onClick={() =>
                scrollTo("pricing")
              }
              type="button"
            >
              GET ALL 3 BOOKS — ₹499
              <ArrowUpRight size={15} />
            </button>


            {/* MOBILE MENU */}

            <button
              className="menu-button"
              onClick={() =>
                setMenuOpen(
                  (value) => !value
                )
              }
              type="button"
              aria-label={
                menuOpen
                  ? "Close menu"
                  : "Open menu"
              }
            >

              {menuOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}

            </button>

          </div>

        </div>


        {/* ===================================================
            MOBILE MENU
        =================================================== */}

        <div
          className={`fullscreen-menu ${
            menuOpen
              ? "fullscreen-menu-open"
              : ""
          }`}
        >

          <div className="fullscreen-menu-inner">

            <div className="mobile-menu-label">
              MENU
            </div>


            <button
              onClick={() =>
                scrollTo("pricing")
              }
              type="button"
            >
              <span>THE BOOKS</span>
              <ArrowUpRight size={18} />
            </button>


            <button
              onClick={() =>
                scrollTo("author")
              }
              type="button"
            >
              <span>AUTHOR</span>
              <ArrowUpRight size={18} />
            </button>


            <button
              onClick={() =>
                scrollTo("faq")
              }
              type="button"
            >
              <span>FAQ</span>
              <ArrowUpRight size={18} />
            </button>


            <button
              className="mobile-menu-buy"
              onClick={() =>
                scrollTo("pricing")
              }
              type="button"
            >

              <span>
                GET ALL 3 BOOKS
              </span>

              <strong>
                ₹499
                <ArrowUpRight
                  size={19}
                />
              </strong>

            </button>

          </div>

        </div>

      </header>


      {/* =====================================================
          CART OVERLAY
      ===================================================== */}

      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={closeCart}
        />
      )}


      {/* =====================================================
          CART DRAWER
      ===================================================== */}

      <aside
        className={`cart-drawer ${
          cartOpen
            ? "cart-drawer-open"
            : ""
        }`}
      >

        {/* ===================================================
            CART HEADER
        =================================================== */}

        <div className="cart-header">

          <div>

            <span className="cart-header-label">
              YOUR SELECTION
            </span>

            <h2>
              Your Cart
            </h2>

          </div>

          <button
            onClick={closeCart}
            type="button"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>

        </div>


        {/* ===================================================
            EMPTY CART
        =================================================== */}

        {cartItems.length === 0 ? (

          <div className="cart-empty">

            <ShoppingBag size={38} />

            <h3>
              Your cart is empty
            </h3>

            <p>
              Add a book — or grab all
              three and upgrade your
              thinking.
            </p>

            <button
              className="cart-browse"
              onClick={() => {
                closeCart();
                scrollTo("pricing");
              }}
              type="button"
            >
              EXPLORE THE BOOKS
              <ArrowUpRight size={16} />
            </button>

          </div>

        ) : (

          /* =================================================
             CART CONTENT
          ================================================= */

          <>

            <div className="cart-items">

              {cartItems.map((item) => (

                <div
                  className="cart-item"
                  key={item.id}
                >

                  {/* =========================================
                      BUNDLE
                  ========================================= */}

                  {item.bundleItems?.length > 0 ? (

                    <div className="cart-bundle">

                      {/* BUNDLE HEADER */}

                      <div className="cart-bundle-header">

                        <div>

                          <span className="cart-bundle-label">
                            3-BOOK BUNDLE
                          </span>

                          <h3>
                            {item.title}
                          </h3>

                        </div>


                        <button
                          className="remove-item"
                          onClick={() =>
                            removeItem(
                              item.id
                            )
                          }
                          type="button"
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash2
                            size={15}
                          />
                        </button>

                      </div>


                      {/* =====================================
                          THREE BOOKS
                      ===================================== */}

                      <div className="cart-bundle-books">

                        {item.bundleItems.map(
                          (book) => (

                            <div
                              className="cart-bundle-book"
                              key={book.id}
                            >

                              <div className="cart-book-image">

                                <img
                                  src={
                                    book.image
                                  }
                                  alt={
                                    book.title
                                  }
                                />

                              </div>


                              <div className="cart-book-details">

                                <h4>
                                  {book.title}
                                </h4>

                                <span>
                                  ₹
                                  {formatPrice(
                                    book.price
                                  )}
                                </span>

                              </div>

                            </div>

                          )
                        )}

                      </div>


                      {/* =====================================
                          BUNDLE SUMMARY
                      ===================================== */}

                      <div className="cart-bundle-summary">

                        <div className="bundle-value-row">

                          <span>
                            Individual value
                          </span>

                          <del>
                            ₹897
                          </del>

                        </div>


                        <div className="bundle-price-row">

                          <span>
                            Bundle price
                          </span>

                          <strong>
                            ₹499
                          </strong>

                        </div>


                        <div className="bundle-save">
                          ✦ You save ₹398 with this bundle
                        </div>

                      </div>


                      {/* =====================================
                          QUANTITY
                      ===================================== */}

                      <div className="cart-item-actions">

                        <div className="quantity-control">

                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }
                            type="button"
                          >
                            <Minus size={13} />
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.id
                              )
                            }
                            type="button"
                          >
                            <Plus size={13} />
                          </button>

                        </div>

                      </div>

                    </div>

                  ) : (

                    /* =======================================
                       NORMAL SINGLE PRODUCT
                    ======================================= */

                    <div className="cart-single-item">

                      <div className="cart-item-image">

                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                          />
                        )}

                      </div>


                      <div className="cart-item-info">

                        <h3>
                          {item.title}
                        </h3>

                        <span>
                          ₹
                          {formatPrice(
                            item.price
                          )}
                        </span>

                      </div>


                      <div className="cart-item-actions">

                        <div className="quantity-control">

                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }
                            type="button"
                          >
                            <Minus size={13} />
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.id
                              )
                            }
                            type="button"
                          >
                            <Plus size={13} />
                          </button>

                        </div>


                        <button
                          className="remove-item"
                          onClick={() =>
                            removeItem(
                              item.id
                            )
                          }
                          type="button"
                        >
                          <Trash2
                            size={15}
                          />
                        </button>

                      </div>

                    </div>

                  )}

                </div>

              ))}

            </div>


            {/* =================================================
                CART BOTTOM
            ================================================= */}

            <div className="cart-bottom">

              {/* COUPON */}

              <div className="coupon-area">

                <div className="coupon-input-row">

                  <input
                    type="text"
                    value={couponInput}
                    onChange={(event) =>
                      setCouponInput(
                        event.target.value
                      )
                    }
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter"
                      ) {
                        handleCoupon();
                      }
                    }}
                    placeholder="Coupon code (optional)"
                  />

                  <button
                    onClick={handleCoupon}
                    type="button"
                  >
                    APPLY
                  </button>

                </div>


                {couponMessage && (
                  <p
                    className={
                      coupon ===
                      "PLAYBOOK10"
                        ? "coupon-success"
                        : "coupon-error"
                    }
                  >
                    {couponMessage}
                  </p>
                )}

              </div>


              {/* DISCOUNT */}

              {discount > 0 && (
                <div className="cart-discount-row">

                  <span>
                    Coupon discount
                  </span>

                  <strong>
                    −₹
                    {formatPrice(
                      discount
                    )}
                  </strong>

                </div>
              )}


              {/* TOTAL */}

              <div className="cart-total">

                <span>
                  TOTAL
                </span>

                <div>

                  <strong>
                    ₹
                    {formatPrice(
                      total
                    )}
                  </strong>

                  {coupon ? (
                    <del>
                      ₹
                      {formatPrice(
                        subtotal
                      )}
                    </del>
                  ) : (
                    cartItems.some(
                      (item) =>
                        item.bundleItems
                          ?.length > 0
                    ) && (
                      <del>
                        ₹897
                      </del>
                    )
                  )}

                </div>

              </div>


              {/* CHECKOUT */}

              <button
                className="checkout-button"
                onClick={handleCheckout}
                type="button"
              >
                <span>
                  CHECKOUT — ₹
                  {formatPrice(
                    total
                  )}
                </span>

                <ArrowUpRight
                  size={18}
                />
              </button>


              {/* INFORMATION */}

              <div className="cart-info">

                <div>
                  <span>🔒</span>
                  <span>
                    PhonePe · UPI · Cards
                    & Netbanking
                  </span>
                </div>

                <div>
                  <span>⚡</span>
                  <span>
                    Instant email delivery
                    · Digital books
                  </span>
                </div>

              </div>

            </div>

          </>

        )}

      </aside>

    </>
  );
}

export default Navbar;