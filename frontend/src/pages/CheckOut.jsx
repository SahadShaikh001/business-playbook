import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  LockKeyhole,
  Mail,
  MapPin,
  ShieldCheck,
  Tag,
  User,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { useCart } from "../context/CartContext";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const RAZORPAY_KEY =
  import.meta.env.VITE_RAZORPAY_KEY_ID || "";

const COUNTRIES = [
  "India",
  "United States (US)",
  "United Kingdom (UK)",
  "Canada",
  "Australia",
  "United Arab Emirates",
  "Singapore",
  "Germany",
  "France",
  "Japan",
];

const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

function price(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function Checkout() {
  const {
    cartItems,
    cartCount,
    actualSubtotal,
    subtotal,
    bundleSaving,
    discount,
    total,
    coupon,
    applyCoupon,
    clearCart,
  } = useCart();

  const [couponOpen, setCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState(coupon || "");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: "India",
    state: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    notes: "",
  });

  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentError, setPaymentError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  /* ======================================================
     RAZORPAY SCRIPT
  ====================================================== */

  useEffect(() => {
    if (window.Razorpay) return;

    const script = document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  /* ======================================================
     UPDATE FORM
  ====================================================== */

  const update = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    setPaymentError("");
  };

  /* ======================================================
     VALIDATION
  ====================================================== */

  const validate = () => {
    const next = {};

    if (!form.firstName.trim()) {
      next.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
      next.lastName = "Last name is required";
    }

    if (!form.country) {
      next.country = "Country is required";
    }

    if (!form.state) {
      next.state = "State is required";
    }

    if (!form.email.trim()) {
      next.email = "Email address is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      next.email = "Enter a valid email address";
    }

    if (!form.address.trim()) {
      next.address = "Billing address is required";
    }

    if (!form.city.trim()) {
      next.city = "City is required";
    }

    if (!form.pincode.trim()) {
      next.pincode = "PIN code is required";
    } else if (!/^\d{6}$/.test(form.pincode.trim())) {
      next.pincode = "Enter a valid 6-digit PIN";
    }

    if (!agree) {
      next.agree =
        "Please accept the terms and conditions";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  /* ======================================================
     COUPON
  ====================================================== */

  const applyCouponCode = () => {
    const code = couponCode.trim().toUpperCase();

    if (!code) return;

    applyCoupon(code);
  };

  /* ======================================================
     LOAD RAZORPAY
  ====================================================== */

  const loadRazorpay = () => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve();
        return;
      }

      let tries = 0;

      const interval = setInterval(() => {
        tries++;

        if (window.Razorpay) {
          clearInterval(interval);
          resolve();
        }

        if (tries > 50) {
          clearInterval(interval);
          reject(
            new Error("Razorpay could not be loaded.")
          );
        }
      }, 100);
    });
  };

  /* ======================================================
     PLACE ORDER
  ====================================================== */

  const handlePlaceOrder = async () => {
    setPaymentError("");

    if (!cartItems.length) {
      setPaymentError("Your cart is empty.");
      return;
    }

    if (!validate()) {
      setPaymentError(
        "Please complete all required billing details."
      );
      return;
    }

    if (!RAZORPAY_KEY) {
      setPaymentError(
        "Razorpay is not configured. Please add VITE_RAZORPAY_KEY_ID to your .env file."
      );
      return;
    }

    try {
      setProcessing(true);

      await loadRazorpay();

      /* CREATE ORDER */

      const response = await fetch(
        `${API_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: total,
            currency: "INR",

            items: cartItems.map((item) => ({
              id: item.id,
              title: item.title,
              price: item.price,
              quantity: 1,
            })),

            customer: {
              firstName: form.firstName,
              lastName: form.lastName,
              email: form.email,
            },

            billing: {
              country: form.country,
              state: form.state,
              address: form.address,
              city: form.city,
              pincode: form.pincode,
            },

            notes: form.notes,
            coupon: coupon || null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to create payment order."
        );
      }

      const order = await response.json();

      const orderId = order.orderId || order.id;

      if (!orderId) {
        throw new Error(
          "Payment order was not created correctly."
        );
      }

      /* RAZORPAY */

      const razorpay = new window.Razorpay({
        key: RAZORPAY_KEY,

        amount: order.amount,

        currency: order.currency || "INR",

        name: "Business Playbook",

        description:
          cartCount === 3
            ? "Business Playbook — Complete Collection"
            : "Business Playbook Digital Product",

        order_id: orderId,

        prefill: {
          name:
            `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
        },

        notes: {
          customer:
            `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          state: form.state,
          city: form.city,
          pincode: form.pincode,
        },

        theme: {
          color: "#c6a15b",
        },

        modal: {
          ondismiss: () => {
            setProcessing(false);
          },
        },

        handler: async (payment) => {
          try {
            const verify = await fetch(
              `${API_URL}/api/payment/verify-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_order_id:
                    payment.razorpay_order_id,

                  razorpay_payment_id:
                    payment.razorpay_payment_id,

                  razorpay_signature:
                    payment.razorpay_signature,

                  amount: total,

                  customer: {
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                  },

                  billing: {
                    country: form.country,
                    state: form.state,
                    address: form.address,
                    city: form.city,
                    pincode: form.pincode,
                  },

                  items: cartItems,
                  coupon: coupon || null,
                }),
              }
            );

            if (!verify.ok) {
              throw new Error(
                "Payment verification failed."
              );
            }

            const result = await verify.json();

            if (
              result.success === false ||
              result.verified === false
            ) {
              throw new Error(
                "Payment could not be verified."
              );
            }

            setPaymentId(
              payment.razorpay_payment_id || ""
            );

            clearCart();
            setSuccess(true);
          } catch (error) {
            console.error(error);

            setPaymentError(
              error.message ||
                "Payment verification failed."
            );
          } finally {
            setProcessing(false);
          }
        },
      });

      razorpay.on(
        "payment.failed",
        (response) => {
          setPaymentError(
            response?.error?.description ||
              "Payment failed. Please try again."
          );

          setProcessing(false);
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(error);

      setPaymentError(
        error.message ||
          "Something went wrong. Please try again."
      );

      setProcessing(false);
    }
  };

  /* ======================================================
     SUCCESS
  ====================================================== */

  if (success) {
    return (
      <div className="checkout-page">
        <CheckoutHeader />

        <div className="checkout-success">
          <div className="checkout-success-card">
            <div className="checkout-success-icon">
              <CheckCircle2 size={42} />
            </div>

            <span className="checkout-label">
              PAYMENT SUCCESSFUL
            </span>

            <h1>
              Thank you for
              <br />
              <em>your order.</em>
            </h1>

            <p>
              Your Business Playbook purchase has been
              confirmed. Your digital product details will
              be sent to your email address.
            </p>

            <div className="checkout-success-email">
              <Mail size={16} />
              {form.email}
            </div>

            {paymentId && (
              <div className="checkout-payment-id">
                Payment ID
                <strong>{paymentId}</strong>
              </div>
            )}

            <Link
              to="/"
              className="checkout-success-btn"
            >
              <ArrowLeft size={16} />
              BACK TO SHOP
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ======================================================
     EMPTY CART
  ====================================================== */

  if (!cartItems.length) {
    return (
      <div className="checkout-page">
        <CheckoutHeader />

        <div className="checkout-empty">
          <ShoppingBagIcon />

          <span className="checkout-label">
            YOUR CART
          </span>

          <h1>
            Your cart is
            <br />
            <em>empty.</em>
          </h1>

          <p>
            Add a Business Playbook product before
            proceeding to checkout.
          </p>

          <Link
            to="/"
            className="checkout-success-btn"
          >
            <ArrowLeft size={16} />
            BACK TO SHOP
          </Link>
        </div>
      </div>
    );
  }

  /* ======================================================
     CHECKOUT
  ====================================================== */

  return (
    <div className="checkout-page">
      <CheckoutHeader />

      <main className="checkout-container">
        <div className="checkout-navigation">
          <Link to="/">
            <ArrowLeft size={15} />
            Back to shop
          </Link>

          <div>
            <LockKeyhole size={14} />
            Secure checkout
          </div>
        </div>

        {/* COUPON */}

        <div className="checkout-coupon-bar">
          <div className="checkout-coupon-question">
            <Tag size={16} />

            <span>Have a coupon?</span>

            {!coupon && (
              <button
                type="button"
                onClick={() =>
                  setCouponOpen(!couponOpen)
                }
              >
                Click here to enter your code

                <ChevronDown
                  size={14}
                  className={
                    couponOpen
                      ? "coupon-arrow-open"
                      : ""
                  }
                />
              </button>
            )}

            {coupon && (
              <span className="coupon-applied">
                {coupon} applied
              </span>
            )}
          </div>

          {couponOpen && !coupon && (
            <div className="checkout-coupon-input">
              <input
                value={couponCode}
                onChange={(event) =>
                  setCouponCode(
                    event.target.value.toUpperCase()
                  )
                }
                placeholder="Coupon code"
              />

              <button
                type="button"
                onClick={applyCouponCode}
              >
                APPLY
              </button>
            </div>
          )}
        </div>

        <div className="checkout-or">
          <span>OR</span>
        </div>

        <div className="checkout-layout">
          {/* =================================================
              LEFT
          ================================================= */}

          <section className="checkout-details">
            <div className="checkout-heading">
              <span className="checkout-label">
                BILLING DETAILS
              </span>

              <h1>
                Complete your
                <br />
                <em>order.</em>
              </h1>
            </div>

            {/* BILLING */}

            <div className="checkout-card">
              <div className="checkout-card-title">
                <span>01</span>

                <div>
                  <h2>Billing details</h2>

                  <p>
                    Please enter your billing
                    information.
                  </p>
                </div>
              </div>

              <div className="checkout-fields two">
                <CheckoutField
                  label="First name"
                  required
                  value={form.firstName}
                  onChange={(value) =>
                    update("firstName", value)
                  }
                  placeholder="First name"
                  icon={<User size={14} />}
                  error={errors.firstName}
                />

                <CheckoutField
                  label="Last name"
                  required
                  value={form.lastName}
                  onChange={(value) =>
                    update("lastName", value)
                  }
                  placeholder="Last name"
                  icon={<User size={14} />}
                  error={errors.lastName}
                />
              </div>

              <div className="checkout-fields two">
                <CheckoutSelect
                  label="Country / Region"
                  required
                  value={form.country}
                  onChange={(value) =>
                    update("country", value)
                  }
                  options={COUNTRIES}
                  error={errors.country}
                />

                <CheckoutSelect
                  label="State"
                  required
                  value={form.state}
                  onChange={(value) =>
                    update("state", value)
                  }
                  options={INDIAN_STATES}
                  placeholder="Select a state"
                  error={errors.state}
                />
              </div>

              <CheckoutField
                label="Billing address"
                required
                value={form.address}
                onChange={(value) =>
                  update("address", value)
                }
                placeholder="House number, street and area"
                icon={<MapPin size={14} />}
                error={errors.address}
              />

              <div className="checkout-fields two">
                <CheckoutField
                  label="City"
                  required
                  value={form.city}
                  onChange={(value) =>
                    update("city", value)
                  }
                  placeholder="City"
                  error={errors.city}
                />

                <CheckoutField
                  label="PIN code"
                  required
                  value={form.pincode}
                  onChange={(value) =>
                    update("pincode", value)
                  }
                  placeholder="6-digit PIN"
                  inputMode="numeric"
                  error={errors.pincode}
                />
              </div>

              <CheckoutField
                label="Email address"
                required
                type="email"
                value={form.email}
                onChange={(value) =>
                  update("email", value)
                }
                placeholder="you@example.com"
                icon={<Mail size={14} />}
                error={errors.email}
              />
            </div>

            {/* ADDITIONAL */}

            <div className="checkout-card">
              <div className="checkout-card-title">
                <span>02</span>

                <div>
                  <h2>
                    Additional information
                  </h2>

                  <p>
                    Optional information for your
                    order.
                  </p>
                </div>
              </div>

              <div className="checkout-field">
                <label>
                  Order notes{" "}
                  <small>(optional)</small>
                </label>

                <textarea
                  value={form.notes}
                  onChange={(event) =>
                    update(
                      "notes",
                      event.target.value
                    )
                  }
                  placeholder="Notes about your order..."
                  rows="2"
                />
              </div>
            </div>

            {/* PAYMENT */}

            <div className="checkout-card checkout-payment-card">
              <div className="checkout-card-title">
                <span>03</span>

                <div>
                  <h2>Payment</h2>

                  <p>
                    All payments are securely
                    processed.
                  </p>
                </div>
              </div>

              <div className="checkout-gateway">
                <div className="checkout-gateway-icon">
                  <CreditCard size={20} />
                </div>

                <div className="checkout-gateway-info">
                  <strong>
                    Razorpay Secure Payment
                  </strong>

                  <span>
                    UPI · Debit & Credit Cards ·
                    NetBanking · Wallets
                  </span>
                </div>

                <ShieldCheck size={19} />
              </div>

              <label className="checkout-agreement">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(event) => {
                    setAgree(
                      event.target.checked
                    );

                    setErrors((prev) => ({
                      ...prev,
                      agree: "",
                    }));
                  }}
                />

                <span>
                  I have read and agree to the
                  website{" "}
                  <Link to="/terms">
                    terms and conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy">
                    privacy policy
                  </Link>
                  .
                </span>
              </label>

              {errors.agree && (
                <div className="checkout-inline-error">
                  <AlertCircle size={14} />
                  {errors.agree}
                </div>
              )}

              {paymentError && (
                <div className="checkout-error">
                  <AlertCircle size={16} />
                  <span>{paymentError}</span>
                </div>
              )}
            </div>
          </section>

          {/* =================================================
              RIGHT — ORDER
          ================================================= */}

          <aside className="checkout-order">
            <div className="checkout-order-header">
              <div>
                <span className="checkout-label">
                  YOUR ORDER
                </span>

                <h2>Order summary</h2>
              </div>

              <span className="checkout-order-count">
                {cartCount}
              </span>
            </div>

            <div className="checkout-order-products">
              {cartItems.map((item) => (
                <div
                  className="checkout-order-product"
                  key={item.id}
                >
                  <div className="checkout-order-image">
                    <img
                      src={
                        item.image || item.cover
                      }
                      alt={item.title}
                    />
                  </div>

                  <div className="checkout-order-name">
                    <strong>{item.title}</strong>

                    <span>× 1</span>
                  </div>

                  <strong>
                    {price(item.price)}
                  </strong>
                </div>
              ))}
            </div>

            <div className="checkout-order-prices">
              <div>
                <span>Product subtotal</span>
                <strong>
                  {price(actualSubtotal)}
                </strong>
              </div>

              {bundleSaving > 0 && (
                <div className="checkout-saving">
                  <span>Collection saving</span>

                  <strong>
                    −{price(bundleSaving)}
                  </strong>
                </div>
              )}

              <div>
                <span>Subtotal</span>
                <strong>{price(subtotal)}</strong>
              </div>

              {discount > 0 && (
                <div className="checkout-saving">
                  <span>Coupon discount</span>

                  <strong>
                    −{price(discount)}
                  </strong>
                </div>
              )}
            </div>

            <div className="checkout-total">
              <span>Total</span>

              <strong>{price(total)}</strong>
            </div>

            <div className="checkout-order-payment">
              <div className="checkout-payment-logo">
                <CreditCard size={17} />
              </div>

              <div>
                <strong>Razorpay</strong>

                <span>
                  All UPI apps, cards, NetBanking and
                  wallets accepted.
                </span>
              </div>
            </div>

            <div className="checkout-digital">
              <CheckCircle2 size={16} />

              <div>
                <strong>Digital delivery</strong>

                <span>
                  No shipping required. Your purchase
                  is delivered digitally.
                </span>
              </div>
            </div>

            <button
              className="checkout-place-order"
              type="button"
              onClick={handlePlaceOrder}
              disabled={processing}
            >
              {processing ? (
                <>
                  <Loader2
                    size={17}
                    className="checkout-spinner"
                  />
                  PROCESSING...
                </>
              ) : (
                <>
                  <LockKeyhole size={17} />
                  PLACE ORDER — {price(total)}
                </>
              )}
            </button>

            <p className="checkout-secure-text">
              <LockKeyhole size={12} />
              Secure payment powered by Razorpay
            </p>
          </aside>
        </div>

        {/* FOOTER */}

        <footer className="checkout-footer">
          <Link to="/privacy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>

          <Link to="/refund">
            Refund Policy
          </Link>

          <span>© 2026 Business Playbook</span>
        </footer>
      </main>
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

function CheckoutHeader() {
  return (
    <header className="checkout-header">
      <Link to="/" className="checkout-logo">
        BP<span>.</span>
      </Link>

      <div className="checkout-header-secure">
        <LockKeyhole size={14} />
        SECURE CHECKOUT
      </div>
    </header>
  );
}

/* =========================================================
   INPUT FIELD
========================================================= */

function CheckoutField({
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  error,
  inputMode,
}) {
  return (
    <div className="checkout-field">
      <label>
        {label}

        {required && <b>*</b>}
      </label>

      <div
        className={`checkout-input ${
          error ? "has-error" : ""
        }`}
      >
        {icon}

        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          inputMode={inputMode}
        />
      </div>

      {error && (
        <small className="checkout-field-error">
          {error}
        </small>
      )}
    </div>
  );
}

/* =========================================================
   SELECT
========================================================= */

function CheckoutSelect({
  label,
  required,
  value,
  onChange,
  options,
  placeholder = "Select a country / region",
  error,
}) {
  return (
    <div className="checkout-field">
      <label>
        {label}

        {required && <b>*</b>}
      </label>

      <div
        className={`checkout-input ${
          error ? "has-error" : ""
        }`}
      >
        <MapPin size={14} />

        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
        >
          {placeholder && (
            <option value="">
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown size={13} />
      </div>

      {error && (
        <small className="checkout-field-error">
          {error}
        </small>
      )}
    </div>
  );
}

/* =========================================================
   EMPTY CART ICON
========================================================= */

function ShoppingBagIcon() {
  return (
    <div className="checkout-empty-icon">
      <Tag size={42} />
    </div>
  );
}

export default Checkout;