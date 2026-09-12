import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

/* =========================================================
   CART CONTEXT
========================================================= */

const CartContext = createContext(null);


/* =========================================================
   STORAGE KEY
========================================================= */

const CART_STORAGE_KEY =
  "business_playbook_cart";


/* =========================================================
   VALID BOOKS
========================================================= */

const VALID_BOOK_IDS = [
  "how-to-attract-women",
  "dopamine-detox",
  "unlock-focus",
];


/* =========================================================
   FIXED BOOK PRICE
========================================================= */

const BOOK_PRICE = 199;


/* =========================================================
   COLLECTION PRICES
========================================================= */

const COLLECTION_PRICE = {
  0: 0,
  1: 199,
  2: 399,
  3: 499,
};


/* =========================================================
   CLEAN CART
=========================================================

   Rules:
   - Only 3 books are allowed
   - Each book can exist only once
   - Quantity is always 1
   - Every book costs ₹199
   - Old "complete-collection" products are removed
   - Unknown products are removed
========================================================= */

const cleanCart = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  const uniqueItems = [];

  items.forEach((item) => {
    if (!item?.id) {
      return;
    }

    /* Only allow our 3 real books */
    if (!VALID_BOOK_IDS.includes(item.id)) {
      return;
    }

    /* Prevent duplicate books */
    const alreadyExists =
      uniqueItems.some(
        (existing) =>
          existing.id === item.id
      );

    if (alreadyExists) {
      return;
    }

    uniqueItems.push({
      id: item.id,

      title:
        item.title || "",

      /* ALWAYS ₹199 */
      price: BOOK_PRICE,

      image:
        item.image ||
        item.images?.cover ||
        null,

      description:
        item.description || "",

      /* Quantity is ALWAYS 1 */
      quantity: 1,
    });
  });

  return uniqueItems;
};


/* =========================================================
   CART PROVIDER
========================================================= */

export function CartProvider({
  children,
}) {

  /* =======================================================
     CART STATE
  ======================================================= */

  const [cartItems, setCartItems] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            CART_STORAGE_KEY
          );

        if (!saved) {
          return [];
        }

        const parsed =
          JSON.parse(saved);

        return cleanCart(parsed);

      } catch (error) {

        console.error(
          "Unable to load cart:",
          error
        );

        return [];
      }
    });


  /* =======================================================
     COUPON STATE
  ======================================================= */

  const [coupon, setCoupon] =
    useState("");


  /* =======================================================
     SAVE CART
  ======================================================= */

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error(
        "Unable to save cart:",
        error
      );
    }
  }, [cartItems]);


  /* =======================================================
     ADD ONE BOOK
  =======================================================

     Example:

     addToCart(book)

     If book already exists:
     → Nothing happens

     No quantity system.
========================================================= */

  const addToCart = (product) => {

    if (!product?.id) {
      return;
    }

    /* Only our 3 books */
    if (
      !VALID_BOOK_IDS.includes(
        product.id
      )
    ) {
      return;
    }

    setCartItems((items) => {

      /* Check if book already exists */
      const exists =
        items.some(
          (item) =>
            item.id === product.id
        );

      if (exists) {
        return items;
      }

      const newBook = {
        id: product.id,

        title:
          product.title || "",

        /* NEVER use product.price */
        price: BOOK_PRICE,

        image:
          product.image ||
          product.images?.cover ||
          null,

        description:
          product.description || "",

        quantity: 1,
      };

      return [
        ...items,
        newBook,
      ];
    });
  };


  /* =======================================================
     ADD MULTIPLE BOOKS
  =======================================================

     Used by:

     GET ALL 3 BOOKS — ₹499

     Books are stored individually:

     Book 1 → ₹199
     Book 2 → ₹199
     Book 3 → ₹199

     Cart automatically applies:

     3 books → ₹499
========================================================= */

  const addBooksToCart = (products) => {

    if (!Array.isArray(products)) {
      return;
    }

    setCartItems((items) => {

      const existingIds =
        new Set(
          items.map(
            (item) => item.id
          )
        );

      const newBooks =
        products
          .filter((product) => {

            if (!product?.id) {
              return false;
            }

            if (
              !VALID_BOOK_IDS.includes(
                product.id
              )
            ) {
              return false;
            }

            if (
              existingIds.has(
                product.id
              )
            ) {
              return false;
            }

            return true;
          })
          .map((product) => ({
            id: product.id,

            title:
              product.title || "",

            /* ALWAYS ₹199 */
            price: BOOK_PRICE,

            image:
              product.image ||
              product.images?.cover ||
              null,

            description:
              product.description ||
              "",

            quantity: 1,
          }));

      return [
        ...items,
        ...newBooks,
      ];
    });
  };


  /* =======================================================
     DELETE ONE BOOK
  ======================================================= */

  const removeItem = (id) => {

    setCartItems((items) =>
      items.filter(
        (item) =>
          item.id !== id
      )
    );
  };


  /* =======================================================
     CLEAR ENTIRE CART
  ======================================================= */

  const clearCart = () => {

    setCartItems([]);

    setCoupon("");
  };


  /* =======================================================
     BOOK COUNT
  ======================================================= */

  const bookCount =
    Math.min(
      cartItems.length,
      3
    );


  /* =======================================================
     CART COUNT
  ======================================================= */

  const cartCount =
    bookCount;


  /* =======================================================
     ACTUAL INDIVIDUAL VALUE
  =======================================================

     1 × ₹199 = ₹199
     2 × ₹199 = ₹398
     3 × ₹199 = ₹597
  ======================================================= */

  const actualSubtotal =
    bookCount * BOOK_PRICE;


  /* =======================================================
     COLLECTION PRICE
  =======================================================

     0 books → ₹0
     1 book  → ₹199
     2 books → ₹399
     3 books → ₹499

     IMPORTANT:
     There is NO ₹599 anywhere.
  ======================================================= */

  const collectionTotal =
    COLLECTION_PRICE[bookCount] || 0;


  /* =======================================================
     SAVING
  =======================================================

     1 book:
     ₹199 → ₹199 = ₹0 saving

     2 books:
     ₹398 → ₹399 = ₹0 saving

     3 books:
     ₹597 → ₹499 = ₹98 saving
  ======================================================= */

  const bundleSaving =
    Math.max(
      0,
      actualSubtotal -
        collectionTotal
    );


  /* =======================================================
     COUPON DISCOUNT
  =======================================================

     PLAYBOOK10
     = 10% off collection price
  ======================================================= */

  const discount =
    coupon === "PLAYBOOK10"
      ? Math.round(
          collectionTotal * 0.1
        )
      : 0;


  /* =======================================================
     FINAL TOTAL
  ======================================================= */

  const total =
    Math.max(
      0,
      collectionTotal -
        discount
    );


  /* =======================================================
     CART TOTAL
  ======================================================= */

  const cartTotal =
    total;


  /* =======================================================
     SUBTOTAL
  ======================================================= */

  const subtotal =
    collectionTotal;


  /* =======================================================
     APPLY COUPON
  ======================================================= */

  const applyCoupon = (code) => {

    const normalizedCode =
      String(code || "")
        .trim()
        .toUpperCase();


    /* Empty code */

    if (!normalizedCode) {

      setCoupon("");

      return {
        success: false,

        message:
          "Please enter a coupon code.",
      };
    }


    /* Valid coupon */

    if (
      normalizedCode ===
      "PLAYBOOK10"
    ) {

      /* Cart must contain a book */

      if (bookCount === 0) {

        setCoupon("");

        return {
          success: false,

          message:
            "Add a book before applying a coupon.",
        };
      }


      setCoupon(
        normalizedCode
      );


      return {
        success: true,

        message:
          "Coupon applied — 10% discount added.",
      };
    }


    /* Invalid coupon */

    setCoupon("");

    return {
      success: false,

      message:
        "Invalid coupon code.",
    };
  };


  /* =======================================================
     REMOVE COUPON
  ======================================================= */

  const removeCoupon = () => {
    setCoupon("");
  };


  /* =======================================================
     CONTEXT PROVIDER
  ======================================================= */

  return (
    <CartContext.Provider
      value={{

        /* -----------------------------------------------
           CART
        ----------------------------------------------- */

        cartItems,

        cartCount,

        bookCount,


        /* -----------------------------------------------
           PRICES
        ----------------------------------------------- */

        subtotal,

        actualSubtotal,

        collectionTotal,

        bundleSaving,

        discount,

        total,

        cartTotal,


        /* -----------------------------------------------
           COUPON
        ----------------------------------------------- */

        coupon,

        applyCoupon,

        removeCoupon,


        /* -----------------------------------------------
           ACTIONS
        ----------------------------------------------- */

        addToCart,

        addBooksToCart,

        removeItem,

        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


/* =========================================================
   USE CART
========================================================= */

export function useCart() {

  const context =
    useContext(
      CartContext
    );

  if (!context) {

    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}