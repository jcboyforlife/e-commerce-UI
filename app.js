/**
 * app.js — Main Application Logic
 * ============================================================
 * This file ties everything together:
 *  - Renders category cards
 *  - Renders product cards
 *  - Handles search (live filtering as user types)
 *  - Handles category filtering (click a category to filter)
 *  - Handles filter pills in the products section
 *  - Navbar scroll effect (adds shadow on scroll)
 *  - Hamburger menu toggle for mobile
 *  - Active nav link highlighting on scroll
 *
 * IMPORTANT: Must be loaded AFTER data.js and cart.js
 * ============================================================
 */


/* ================================================================
   STATE
   These variables track the current filter/search state.
================================================================ */

let activeCategory = "all"; // Which category is selected ("all" = show everything)
let searchQuery    = "";    // What the user has typed in the search bar


/* ================================================================
   1. RENDER CATEGORIES
   Reads the `categories` array from data.js and builds cards.
================================================================ */

/**
 * renderCategories()
 * Creates a card element for each category and injects into the DOM.
 */
function renderCategories() {
  const grid = document.getElementById("categoryGrid");
  grid.innerHTML = ""; // Clear any existing content

  // Create an "All" card first
  const allCard = createCategoryCard({
    id: "all",
    name: "All Products",
    icon: "🛍️",
    count: products.length, // Total product count
  });
  grid.appendChild(allCard);

  // Create a card for each category in the data array
  categories.forEach(category => {
    grid.appendChild(createCategoryCard(category));
  });
}

/**
 * createCategoryCard(category)
 * Builds and returns a single category <div> element.
 * @param {Object} category - { id, name, icon, count }
 * @returns {HTMLElement}
 */
function createCategoryCard(category) {
  const card = document.createElement("div");
  card.className = "category-card";

  // Mark the active category visually
  if (category.id === activeCategory) {
    card.classList.add("active");
  }

  card.innerHTML = `
    <div class="category-icon">${category.icon}</div>
    <div class="category-name">${category.name}</div>
    <div class="category-count">${category.count} items</div>
  `;

  // When clicked: update the active filter and re-render products
  card.addEventListener("click", () => {
    activeCategory = category.id;
    searchQuery = "";                              // Clear search when category changes
    document.getElementById("searchInput").value = ""; // Clear input field too
    renderCategories();   // Refresh category cards (to update active state)
    renderProducts();     // Refresh product grid with new filter
    renderFilterPills();  // Refresh filter pills

    // Smooth scroll to products section
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
  });

  return card;
}


/* ================================================================
   2. RENDER FILTER PILLS
   Small pill buttons above the product grid for quick filtering.
================================================================ */

/**
 * renderFilterPills()
 * Creates a pill for "All" plus each category.
 */
function renderFilterPills() {
  const bar = document.getElementById("filterBar");
  bar.innerHTML = "";

  // "All" pill
  const allPill = document.createElement("button");
  allPill.className = "filter-pill" + (activeCategory === "all" ? " active" : "");
  allPill.textContent = "All";
  allPill.addEventListener("click", () => {
    activeCategory = "all";
    renderCategories();
    renderProducts();
    renderFilterPills();
  });
  bar.appendChild(allPill);

  // One pill per category
  categories.forEach(cat => {
    const pill = document.createElement("button");
    pill.className = "filter-pill" + (activeCategory === cat.id ? " active" : "");
    pill.textContent = cat.name;

    pill.addEventListener("click", () => {
      activeCategory = cat.id;
      renderCategories();
      renderProducts();
      renderFilterPills();
    });

    bar.appendChild(pill);
  });
}


/* ================================================================
   3. RENDER PRODUCTS
   Filters the `products` array by category + search query,
   then builds a card for each matching product.
================================================================ */

/**
 * getFilteredProducts()
 * Returns a filtered array based on current activeCategory + searchQuery.
 * @returns {Array}
 */
function getFilteredProducts() {
  return products.filter(product => {

    // Step 1: check category
    const categoryMatch =
      activeCategory === "all" || product.category === activeCategory;

    // Step 2: check search (case-insensitive name match)
    const searchMatch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Product must pass BOTH filters
    return categoryMatch && searchMatch;
  });
}

/**
 * renderProducts()
 * Clears the grid and renders cards for all filtered products.
 */
function renderProducts() {
  const grid       = document.getElementById("productGrid");
  const emptyState = document.getElementById("emptyState");

  grid.innerHTML = ""; // Clear previous cards

  const filtered = getFilteredProducts();

  if (filtered.length === 0) {
    // Show the empty state message
    emptyState.style.display = "flex";
    grid.style.display = "none";
  } else {
    // Hide empty state, show grid
    emptyState.style.display = "none";
    grid.style.display = "grid";

    // Render each filtered product with a staggered animation delay
    filtered.forEach((product, index) => {
      const card = createProductCard(product, index);
      grid.appendChild(card);
    });
  }
}

/**
 * createProductCard(product, index)
 * Builds and returns a product card element.
 * @param {Object} product - product object from data.js
 * @param {number} index   - used to stagger the animation
 * @returns {HTMLElement}
 */
function createProductCard(product, index) {
  const card = document.createElement("div");
  card.className = "product-card";

  // Stagger the fade-up animation using CSS animation-delay
  card.style.animationDelay = `${index * 0.05}s`;

  // Discount badge HTML (only if the product has a badge)
  const badgeHTML = product.badge
    ? `<div class="product-badge">${product.badge}</div>`
    : "";

  // Original price HTML (only if there's a crossed-out price)
  const originalPriceHTML = product.originalPrice
    ? `<s class="product-price-original">${formatPrice(product.originalPrice)}</s>`
    : "";

  card.innerHTML = `
    <!-- Product Image Area -->
    <div class="product-image-wrap">
      <!-- image placeholder "image" -->
      <img
        src="${product.image}"
        alt="${product.name}"
        class="product-img"
      />

      <!-- Optional badge (New / Sale) -->
      ${badgeHTML}

      <!-- Wishlist heart button -->
      <button class="product-wishlist" aria-label="Add to wishlist">🤍</button>
    </?>

    <!-- Product Details -->
    <div class="product-body">
      <!-- Category label -->
      <div class="product-category">${getCategoryName(product.category)}</div>

      <!-- Product name -->
      <div class="product-name">${product.name}</div>

      <!-- Star rating + review count -->
      <div class="product-rating">
        <span>${getStars(product.rating)}</span>
        ${product.rating} (${product.reviews.toLocaleString()} reviews)
      </div>

      <!-- Price + Add to cart button -->
      <div class="product-footer">
        <div>
          <span class="product-price">${formatPrice(product.price)}</span>
          ${originalPriceHTML}
        </div>

        <!-- Add to Cart button — calls addToCart() from cart.js -->
        <button
          class="add-to-cart"
          onclick="addToCart(products.find(p => p.id === ${product.id}))"
          aria-label="Add ${product.name} to cart"
        >+</button>
      </div>
    </div>
  `;

  // Wishlist toggle (UI only — no backend)
  const wishlistBtn = card.querySelector(".product-wishlist");
  wishlistBtn.addEventListener("click", () => {
    const isWished = wishlistBtn.textContent === "❤️";
    wishlistBtn.textContent = isWished ? "🤍" : "❤️";
  });

  return card;
}

/**
 * getCategoryName(categoryId)
 * Returns the display name for a category id.
 * @param {string} categoryId
 * @returns {string}
 */
function getCategoryName(categoryId) {
  const found = categories.find(c => c.id === categoryId);
  return found ? found.name : categoryId;
}


/* ================================================================
   4. SEARCH FUNCTIONALITY
   Runs every time the user types in the search input.
   Filters in real-time — no button click needed.
================================================================ */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", (e) => {
  searchQuery    = e.target.value.trim();
  activeCategory = "all"; // Reset category when searching

  renderCategories();
  renderProducts();
  renderFilterPills();
});

/**
 * resetFilters()
 * Called by the "Clear Filters" button in the empty state.
 * Resets everything back to showing all products.
 */
function resetFilters() {
  activeCategory = "all";
  searchQuery    = "";
  searchInput.value = "";
  renderCategories();
  renderProducts();
  renderFilterPills();
}


/* ================================================================
   5. NAVBAR SCROLL EFFECT
   Adds a more visible border/shadow when user scrolls down.
================================================================ */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    navbar.style.boxShadow = "0 4px 40px rgba(0,0,0,0.5)";
  } else {
    navbar.style.boxShadow = "none";
  }
});


/* ================================================================
   6. HAMBURGER MENU TOGGLE (Mobile)
   Toggles the .open class on nav-links to show/hide on mobile.
================================================================ */

const hamburger  = document.getElementById("hamburger");
const navLinks   = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", isOpen);

  // Animate the three bars into an X when open
  const spans = hamburger.querySelectorAll("span");
  if (isOpen) {
    spans[0].style.transform = "translateY(7px) rotate(45deg)";
    spans[1].style.opacity   = "0";
    spans[2].style.transform = "translateY(-7px) rotate(-45deg)";
  } else {
    spans.forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
  }
});

// Close mobile menu when a nav link is clicked
navLinks.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    const spans = hamburger.querySelectorAll("span");
    spans.forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
  });
});


/* ================================================================
   7. ACTIVE NAV LINK ON SCROLL
   Highlights the nav link corresponding to the visible section.
================================================================ */

const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  // Find which section is in the viewport
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  // Update active class on nav links
  navAnchors.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});


/* ================================================================
   INITIALIZE — Boot the app on page load
================================================================ */

// Run all render functions to build the initial UI
renderCategories();
renderFilterPills();
renderProducts();

console.log(
  "%c🛍️ ShopWave loaded successfully!",
  "color: #e8ff47; font-size: 16px; font-weight: bold; background: #0e0e12; padding: 8px 16px; border-radius: 8px;"
);
console.log(`  Products loaded: ${products.length}`);
console.log(`  Categories: ${categories.length}`);