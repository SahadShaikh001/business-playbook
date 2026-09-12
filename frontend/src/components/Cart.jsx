import { useNavigate } from "react-router-dom";
import {
  X,
  LockKeyhole,
  Zap,
  ArrowUpRight,
} from "lucide-react";

function Cart() {
  const navigate = useNavigate();

  return (
    <main className="cart-page">

      <div className="cart-page-header">

        <button
          className="cart-back"
          onClick={() =>
            navigate("/")
          }
          aria-label="Close cart"
        >
          <X size={25} />
        </button>

        <h1>Your Cart</h1>

      </div>

      <div className="cart-page-content">

        <div className="cart-empty">

          <div className="cart-empty-icon">
            🛍
          </div>

          <h2>
            Your cart is empty.
          </h2>

          <p>
            Choose a book or grab
            the complete collection.
          </p>

          <button
            className="cart-browse"
            onClick={() =>
              navigate("/")
            }
          >
            EXPLORE BOOKS
            <ArrowUpRight size={16} />
          </button>

        </div>

      </div>

      <div className="cart-page-bottom">

        <input
          type="text"
          className="coupon-input"
          placeholder="Coupon code (optional)"
        />

        <div className="cart-total">
          <span>TOTAL</span>
          <strong>₹0</strong>
        </div>

        <button
          className="checkout-button"
          onClick={() => {
           setCartOpen(false);
            navigate("/checkout");
          }}
          type="button"
        >
          CHECKOUT
          <ArrowUpRight size={18} />
        </button>          

        <div className="cart-info">

          <div>
            <LockKeyhole size={14} />
            <span>
              Secure checkout · UPI,
              Cards & Netbanking
            </span>
          </div>

          <div>
            <Zap size={14} />
            <span>
              Instant digital delivery
            </span>
          </div>

        </div>

      </div>

    </main>
  );
}

export default Cart;