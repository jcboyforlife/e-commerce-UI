/**
 * cart.js — Shopping Cart Logic
 * ============================================================
 * This file handles ALL cart behaviour:
 *  - cartState: the single source of truth for cart data
 *  - Adding items (or increasing quantity if already in cart)
 *  - Removing items
 *  - Updating quantities (+ / - buttons)
 *  - Clearing the entire cart
 *  - Persisting cart to localStorage (survives page refresh)
 *  - Rendering the cart sidebar UI
 *  - Updating the badge counter in the navbar
 *
 * IMPORTANT: This file must be loaded BEFORE app.js
 *            and AFTER data.js (because it uses formatPrice)
 * ============================================================
 */


/* ---- CART STATE ------------------------------------------------
   cartState is a plain object.
   items is an array of { ...product, quantity: N }
---------------------------------------------------------------- */
let cartState = {
  items: [],   // Array of product objects with a 'quantity' field
};


/* ================================================================
   LOCAL STORAGE HELPERS
   We save/load the cart from localStorage so it persists
   across page refreshes (browser memory).
================================================================ */

/**
 * saveCart()
 * Converts cartState.items to a JSON string and saves it.
 */
function saveCart() {
  localStorage.setItem("shopwave_cart", JSON.stringify(cartState.items));
}

/**
 * loadCart()
 * Reads the cart from localStorage on page load.
 * If nothing is saved yet, starts with an empty array.
 */
function loadCart() {
  const saved = localStorage.getItem("shopwave_cart");
  if (saved) {
    try {
      cartState.items = JSON.parse(saved);
    } catch {
      // If the stored data is corrupted, reset
      cartState.items = [];
    }
  }
}


/* ================================================================
   CART ACTIONS
   These functions modify cartState and then re-render the UI.
================================================================ */

/**
 * addToCart(product)
 * Adds a product to the cart, or increments quantity if it's
 * already there.
 * @param {Object} product - a product object from products array
 */
function addToCart(product) {
  // Check if this product is already in the cart
  const existingItem = cartState.items.find(item => item.id === product.id);

  if (existingItem) {
    // Already in cart → just increase quantity
    existingItem.quantity += 1;
  } else {
    // Not in cart → add it with quantity 1
    cartState.items.push({ ...product, quantity: 1 });
  }

  // Persist to localStorage
  saveCart();

  // Update UI
  renderCart();
  updateCartBadge();

  // Optional: show a brief visual feedback on the button
  flashCartButton();
}

/**
 * removeFromCart(productId)
 * Removes a product completely from the cart by its id.
 * @param {number} productId
 */
function removeFromCart(productId) {
  cartState.items = cartState.items.filter(item => item.id !== productId);
  saveCart();
  renderCart();
  updateCartBadge();
}

/**
 * updateQuantity(productId, change)
 * Increases or decreases quantity by `change` (+1 or -1).
 * If quantity drops to 0, removes the item entirely.
 * @param {number} productId
 * @param {number} change - either +1 or -1
 */
function updateQuantity(productId, change) {
  const item = cartState.items.find(item => item.id === productId);

  if (!item) return; // Safety check

  item.quantity += change;

  if (item.quantity <= 0) {
    // Remove if quantity reached zero
    removeFromCart(productId);
  } else {
    saveCart();
    renderCart();
    // No badge update needed — total item types didn't change
  }
}

/**
 * clearCart()
 * Empties the entire cart.
 */
function clearCart() {
  cartState.items = [];
  saveCart();
  renderCart();
  updateCartBadge();
}

/**
 * getCartTotal()
 * Calculates the total price across all items × quantities.
 * @returns {number}
 */
function getCartTotal() {
  return cartState.items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
}

/**
 * getTotalItemCount()
 * Returns the total number of individual items
 * (not product types — e.g. 3 shirts + 2 shoes = 5).
 * @returns {number}
 */
function getTotalItemCount() {
  return cartState.items.reduce((sum, item) => sum + item.quantity, 0);
}


/* ================================================================
   UI: RENDER CART SIDEBAR
   Rebuilds the cart item list and total every time state changes.
================================================================ */

/**
 * renderCart()
 * Clears and re-renders the cart item list and total price.
 */
function renderCart() {
  const cartItemsEl = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");

  // Clear current content
  cartItemsEl.innerHTML = "";

  if (cartState.items.length === 0) {
    // Show empty state
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛍️</div>
        <p>Your cart is empty</p>
        <small style="color: var(--clr-muted)">Add some products to get started</small>
      </div>
    `;
  } else {
    // Render each cart item
    cartState.items.forEach(item => {
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";

      // Build the HTML for one cart item row
      itemEl.innerHTML = `
        <!-- Emoji as product image -->
        <div class="cart-item-emoji">${item.emoji}</div>

        <!-- Name and price -->
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price * item.quantity)}</div>
        </div>

        <!-- Quantity controls -->
        <div class="cart-item-qty">
          <!-- Decrease button -->
          <button
            class="qty-btn"
            onclick="updateQuantity(${item.id}, -1)"
            aria-label="Decrease quantity"
          >−</button>

          <!-- Current quantity number -->
          <span class="qty-num">${item.quantity}</span>

          <!-- Increase button -->
          <button
            class="qty-btn"
            onclick="updateQuantity(${item.id}, 1)"
            aria-label="Increase quantity"
          >+</button>
        </div>
      `;

      cartItemsEl.appendChild(itemEl);
    });
  }

  // Update the total price display
  cartTotalEl.textContent = formatPrice(getCartTotal());
}


/* ================================================================
   UI: BADGE COUNTER & BUTTON FLASH
================================================================ */

/**
 * updateCartBadge()
 * Sets the number shown on the cart icon badge.
 * Animates it with a "pop" effect to draw attention.
 */
function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  const count = getTotalItemCount();

  badge.textContent = count;

  // Trigger pop animation by removing + re-adding class
  badge.classList.remove("badge-pop");
  void badge.offsetWidth; // Force reflow to restart animation
  badge.classList.add("badge-pop");
}

/**
 * flashCartButton()
 * Briefly scales up the cart icon button to confirm the action.
 */
function flashCartButton() {
  const btn = document.getElementById("cartBtn");
  btn.style.transform = "scale(1.25)";
  setTimeout(() => {
    btn.style.transform = "";
  }, 200);
}


/* ================================================================
   CART SIDEBAR OPEN / CLOSE
================================================================ */

/**
 * openCart()
 * Slides the cart sidebar in and shows the overlay.
 */
function openCart() {
  document.getElementById("cartSidebar").classList.add("open");
  document.getElementById("overlay").classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent page scroll while cart is open
}

/**
 * closeCart()
 * Slides the cart back out.
 */
function closeCart() {
  document.getElementById("cartSidebar").classList.remove("open");
  document.getElementById("overlay").classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
}


/* ================================================================
   INITIALIZE — runs when this script first loads
================================================================ */

// Load any saved cart data from previous session
loadCart();

// Hook up cart open/close buttons
document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
document.getElementById("overlay").addEventListener("click", closeCart);

// Clear cart button
document.getElementById("clearCartBtn").addEventListener("click", () => {
  if (cartState.items.length === 0) return; // Nothing to clear
  if (confirm("Clear your entire cart?")) {
    clearCart();
  }
});

// Render initial state (empty or loaded from localStorage)
renderCart();
updateCartBadge();