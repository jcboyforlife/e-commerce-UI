/**
 * data.js — Fake Product Data
 * ============================================================
 * This file contains all the fake store data:
 *  - categories array: used to build the category section
 *  - products array:   used to render product cards
 *
 * In a real app this would come from a backend API.
 * For now, we store everything here as plain JS objects.
 *
 * Each product has these fields:
 *  id          — unique number (used as key in cart)
 *  name        — product display name
 *  category    — must match a category "id" in the categories array
 *  price       — current selling price (in Naira)
 *  originalPrice — crossed-out original price (shows discount)
 *  emoji       — used as a fun placeholder image
 *  rating      — decimal number 1-5
 *  reviews     — number of customer reviews
 *  badge       — optional label like "New" or "Sale"
 * ============================================================
 */

/* ---- CATEGORIES ---- */
const categories = [
  { id: "electronics",  name: "Electronics",  icon: "⚡",  count: 8  },
  { id: "fashion",      name: "Fashion",       icon: "👗",  count: 12 },
  { id: "footwear",     name: "Footwear",      icon: "👟",  count: 6  },
  { id: "accessories",  name: "Accessories",   icon: "⌚",  count: 9  },
  { id: "home",         name: "Home & Living", icon: "🏠",  count: 7  },
  { id: "beauty",       name: "Beauty",        icon: "✨",  count: 5  },
];


/* ---- PRODUCTS ---- */
const products = [

  // ── Electronics ─────────────────────────────────────────────
  {
    id: 1,
    name: "AirPods Pro Max",
    category: "electronics",
    price: 185000,
    originalPrice: 220000,
    image: "images/AirPods.jpg",
    // emoji: "🎧",
    rating: 4.9,
    reviews: 2340,
    badge: "Sale",
  },
  {
    id: 2,
    name: "Smart Watch Ultra",
    category: "electronics",
    price: 95000,
    originalPrice: null,
    image: "images/Smartwatch.jpg",
    rating: 4.7,
    reviews: 890,
    badge: "New",
  },
  {
    id: 3,
    name: "Portable Speaker X",
    category: "electronics",
    price: 42000,
    originalPrice: 55000,
    image: "images/speaker.png",
    rating: 4.5,
    reviews: 1120,
    badge: "Sale",
  },
  {
    id: 4,
    name: "Mirrorless Camera Kit",
    category: "electronics",
    price: 390000,
    originalPrice: null,
    image: "images/sony A7iii.jpg",
    rating: 4.8,
    reviews: 560,
    badge: "New",
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    category: "electronics",
    price: 68000,
    originalPrice: 75000,
    image: "images/keyboard.jpg",
    rating: 4.6,
    reviews: 740,
    badge: null,
  },
  {
    id: 6,
    name: "4K Gaming Monitor",
    category: "electronics",
    price: 220000,
    originalPrice: 265000,
    image: "images/Gaming Monitor.jpg",
    rating: 4.7,
    reviews: 430,
    badge: "Sale",
  },

  // ── Fashion ─────────────────────────────────────────────────
  {
    id: 7,
    name: "Oversized Linen Blazer",
    category: "fashion",
    price: 28000,
    originalPrice: null,
    image: "fashion/Blazer.jpg",
    rating: 4.4,
    reviews: 380,
    badge: "New",
  },
  {
    id: 8,
    name: "Slim Fit Chinos",
    category: "fashion",
    price: 14500,
    originalPrice: 18000,
    image: "fashion/Chinos.jpg",
    rating: 4.3,
    reviews: 920,
    badge: null,
  },
  {
    id: 9,
    name: "Graphic Tee Bundle",
    category: "fashion",
    price: 9500,
    originalPrice: 12000,
    image: "fashion/Tee.jpg",
    rating: 4.5,
    reviews: 1800,
    badge: "Sale",
  },
  {
    id: 10,
    name: "Summer Floral Dress",
    category: "fashion",
    price: 19000,
    originalPrice: null,
    image: "fashion/Dress.jpg",
    rating: 4.6,
    reviews: 640,
    badge: "New",
  },

  // ── Footwear ─────────────────────────────────────────────────
  {
    id: 11,
    name: "Retro Chunky Sneakers",
    category: "footwear",
    price: 55000,
    originalPrice: 65000,
    image: "footwear/Sneakers.jpg",
    rating: 4.8,
    reviews: 1200,
    badge: "Sale",
  },
  {
    id: 12,
    name: "Leather Oxford Shoes",
    category: "footwear",
    price: 38000,
    originalPrice: null,
    image: "footwear/Leather.jpg",
    rating: 4.5,
    reviews: 470,
    badge: null,
  },
  {
    id: 13,
    name: "Slip-On Loafers",
    category: "footwear",
    price: 22000,
    originalPrice: 27000,
    image: "footwear/Chunky.jpg",
    rating: 4.3,
    reviews: 310,
    badge: "Sale",
  },

  // ── Accessories ──────────────────────────────────────────────
  {
    id: 14,
    name: "Leather Crossbody Bag",
    category: "accessories",
    price: 32000,
    originalPrice: null,
    image: "accessories/Bag.jpg",
    rating: 4.7,
    reviews: 860,
    badge: "New",
  },
  {
    id: 15,
    name: "Polarised Sunglasses",
    category: "accessories",
    price: 15000,
    originalPrice: 20000,
    image: "accessories/Sunglasses.jpg",
    rating: 4.4,
    reviews: 540,
    badge: "Sale",
  },
  {
    id: 16,
    name: "Minimalist Wallet",
    category: "accessories",
    price: 8500,
    originalPrice: null,
    image: "accessories/Wallet.jpg",
    rating: 4.6,
    reviews: 1340,
    badge: null,
  },

  // ── Home & Living ─────────────────────────────────────────────
  {
    id: 17,
    name: "Scented Candle Set",
    category: "home",
    price: 12000,
    originalPrice: null,
    image: "home/Candle.jpg",
    rating: 4.8,
    reviews: 720,
    badge: "New",
  },
  {
    id: 18,
    name: "Velvet Throw Pillow",
    category: "home",
    price: 7500,
    originalPrice: 9500,
    image: "home/Pillow.jpg",
    rating: 4.3,
    reviews: 290,
    badge: null,
  },
  {
    id: 19,
    name: "Ceramic Coffee Mug",
    category: "home",
    price: 4800,
    originalPrice: null,
    image: "home/Mug.jpg",
    rating: 4.9,
    reviews: 2100,
    badge: "New",
  },

  // ── Beauty ───────────────────────────────────────────────────
  {
    id: 20,
    name: "Vitamin C Serum",
    category: "beauty",
    price: 9800,
    originalPrice: 12000,
    image: "beauty/Serum.jpg",
    rating: 4.7,
    reviews: 1550,
    badge: "Sale",
  },
  {
    id: 21,
    name: "Lip Gloss Collection",
    category: "beauty",
    price: 6500,
    originalPrice: null,
    image: "beauty/Gloss.jpg",
    rating: 4.5,
    reviews: 980,
    badge: "New",
  },
  {
    id: 22,
    name: "Facial Cleansing Kit",
    category: "beauty",
    price: 14500,
    originalPrice: 18000,
    image: "beauty/Kit.jpg",
    rating: 4.6,
    reviews: 670,
    badge: "Sale",
  },
];

/**
 * Helper: format a number as Nigerian Naira currency
 * Example: formatPrice(55000) → "₦55,000"
 */
function formatPrice(amount) {
  return "₦" + amount.toLocaleString("en-NG");
}

/**
 * Helper: generate star display string
 * Example: getStars(4.5) → "★★★★½"  (simplified version below)
 */
function getStars(rating) {
  const full  = Math.floor(rating);     // e.g. 4
  const half  = rating % 1 >= 0.5;     // e.g. true if .5 or above
  const empty = 5 - full - (half ? 1 : 0);

  return (
    "★".repeat(full) +
    (half ? "½" : "") +
    "☆".repeat(empty)
  );
}