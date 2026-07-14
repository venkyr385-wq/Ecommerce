// =========================================================
// AURA E-COMMERCE APPLICATION JAVASCRIPT
// =========================================================

// --- 1. MOCK DATA FALLBACK & ENRICHMENT ---
// High-quality product images and attributes to enrich Fake Store API items
const MOCK_CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing", "footwear", "accessories", "watches"];
const ALLOWED_ADMIN_EMAIL = "venkyr385@gmail.com";

const BRAND_LIST = {
  "electronics": ["AuraTech", "Quantum", "Apex", "Nova"],
  "jewelery": ["Vogue Jewelers", "Orion", "Symmetry", "Luna"],
  "men's clothing": ["Levi's", "Zara", "H&M", "Tommy Hilfiger", "Calvin Klein", "Uniqlo", "Aura Man", "Nomad", "Urbanite", "Classic Co."],
  "women's clothing": ["Zara", "H&M", "Chanel", "Prada", "Gucci", "Uniqlo", "Forever 21", "Aura Woman", "Elysian", "Belle", "Siren"],
  "footwear": ["Nike", "Adidas", "Puma", "Reebok", "New Balance", "Jordan", "Converse", "Vans"],
  "accessories": ["Ray-Ban", "Oakley", "Fossil", "Seiko", "Casio", "Michael Kors", "Herschel", "Aura Luxe"],
  "watches": [
    "Rolex", "Omega", "Patek Philippe", "Audemars Piguet", "Cartier",
    "TAG Heuer", "Breitling", "IWC Schaffhausen", "Jaeger-LeCoultre", "Hublot",
    "Tissot", "Longines", "Rado", "Seiko", "Citizen",
    "Hamilton", "Frederique Constant", "Bulova", "Fossil", "Casio",
    "Apple", "Samsung", "Garmin", "Huawei", "Amazfit",
    "Michael Kors", "Emporio Armani", "Tommy Hilfiger", "Timex", "Daniel Wellington"
  ]
};

const COLOR_LIST = {
  "electronics":     ["#1e293b", "#e2e8f0", "#b45309"],
  "jewelery":        ["#fbbf24", "#e2e8f0", "#f472b6"],
  "men's clothing":  ["#1e293b", "#374151", "#b45309", "#0f766e"],
  "women's clothing":["#f472b6", "#1e293b", "#ffffff", "#ec4899"],
  "footwear":        ["#ffffff", "#000000", "#ef4444", "#3b82f6"],
  "accessories":     ["#000000", "#b45309", "#e2e8f0", "#fbbf24"],
  "watches":         ["#1e293b", "#e2e8f0", "#fbbf24", "#b45309", "#000000"]
}; // COLOR_NAME_MAP — human readable names for every hex used in color swatches
const COLOR_NAME_MAP = {
  "#000000":"Black",  "#1e293b":"Black",  "#0f172a":"Black", "#111827":"Black",
  "#374151":"Grey",   "#6b7280":"Grey",   "#94a3b8":"Silver","#64748b":"Slate",
  "#ffffff":"White",  "#f8fafc":"White",  "#e2e8f0":"Silver/White",
  "#ef4444":"Red",    "#dc2626":"Red",
  "#3b82f6":"Blue",   "#2563eb":"Blue",
  "#0f766e":"Teal",   "#14b8a6":"Teal",
  "#10b981":"Green",  "#059669":"Green",
  "#fbbf24":"Gold",   "#f59e0b":"Amber",  "#b45309":"Brown",
  "#f97316":"Orange",
  "#f472b6":"Pink",   "#ec4899":"Hot Pink",
  "#a855f7":"Purple", "#7c3aed":"Violet", "#831843":"Burgundy"
};

// Per-category color→image map.
// Each color swatch maps to a real Unsplash photo of a product in THAT exact color.
const COLOR_IMAGE_MAP = {
  "electronics": {
    "#1e293b": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",  // black headphones
    "#e2e8f0": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop",  // silver/white watch
    "#b45309": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop", // gold/brown watch
    "#000000": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop", // black keyboard
    "#ffffff": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop"  // white mouse
  },
  "jewelery": {
    "#fbbf24": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",  // gold necklace
    "#e2e8f0": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",  // silver bracelet
    "#f472b6": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop"   // rose gold pearl
  },
  "men's clothing": {
    "#1e293b": "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop",   // dark/navy jeans
    "#374151": "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=600&auto=format&fit=crop",// grey sweater
    "#b45309": "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=600&auto=format&fit=crop",// brown chinos
    "#0f766e": "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop",   // teal parka
    "#ffffff": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",// white tee
    "#000000": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop",// black shirt
    "#3b82f6": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop",// blue shirt
    "#ef4444": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop" // red tee
  },
  "women's clothing": {
    "#f472b6": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop", // pink dress
    "#1e293b": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop", // black gown
    "#ffffff": "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop", // white blazer
    "#ec4899": "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600&auto=format&fit=crop", // hot pink blouse
    "#e2e8f0": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop", // cream coat
    "#831843": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop"  // burgundy gown
  },
  "footwear": {
    "#ffffff": "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",   // white sneakers
    "#000000": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600&auto=format&fit=crop",// black vans
    "#ef4444": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",  // red nike
    "#3b82f6": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=600&auto=format&fit=crop",// blue puma
    "#b45309": "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=600&auto=format&fit=crop",// brown chelsea
    "#1e293b": "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=600&auto=format&fit=crop"   // dark jordan
  },
  "accessories": {
    "#000000": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",// black sunglasses
    "#b45309": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",// brown wallet
    "#e2e8f0": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop",// silver watch
    "#fbbf24": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop",// gold watch
    "#374151": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",  // grey backpack
    "#3b82f6": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop" // blue sunglasses
  },
  "watches": {
    "#1e293b": "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop",
    "#e2e8f0": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop",
    "#fbbf24": "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=600&auto=format&fit=crop",
    "#b45309": "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=600&auto=format&fit=crop",
    "#000000": "https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=600&auto=format&fit=crop"
  }
};

const SIZE_LIST = {
  "electronics": ["Standard", "Pro", "Max"],
  "jewelery": ["One Size"],
  "men's clothing": ["S", "M", "L", "XL", "XXL", "XXXL"],
  "women's clothing": ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
  "footwear": ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
  "accessories": ["One Size"],
  "watches":     ["One Size"]
};

// Fallback products if Fake Store API is offline
const FALLBACK_PRODUCTS = [
  {
    id: 101,
    title: "Aura Sound-Cancelling Headphones",
    price: 15999.00,
    category: "electronics",
    description: "Experience absolute silence with our signature active noise-cancelling headphones. Crafted with memory foam earcups and 40-hour battery life.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    rating: { rate: 4.8, count: 240 }
  },
  {
    id: 102,
    title: "Quantum Smart Watch Series X",
    price: 24999.00,
    category: "electronics",
    description: "A futuristic health and fitness tracker featuring an Always-On Retina AMOLED display, ECG monitoring, and built-in GPS.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    rating: { rate: 4.7, count: 185 }
  },
  {
    id: 103,
    title: "Minimalist Leather Backpack",
    price: 4999.00,
    category: "men's clothing",
    description: "Handcrafted from full-grain vegetable-tanned leather. Features a padded 15-inch laptop sleeve and weather-resistant zippers.",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop",
    rating: { rate: 4.5, count: 96 }
  },
  {
    id: 104,
    title: "Elysian Silk Summer Dress",
    price: 7999.00,
    category: "women's clothing",
    description: "Flowy, elegant dress made from 100% pure mulberry silk. Features a subtle floral pattern and a comfortable elastic waistband.",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop",
    rating: { rate: 4.6, count: 112 }
  },
  {
    id: 105,
    title: "Geometric Gold Pendant Necklace",
    price: 32999.00,
    category: "jewelery",
    description: "An elegant 18k solid yellow gold necklace featuring a hand-polished geometric pendant. Comes with an adjustable 18-inch chain.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
    rating: { rate: 4.9, count: 64 }
  },
  {
    id: 106,
    title: "Apex Mechanical Keyboard",
    price: 11999.00,
    category: "electronics",
    description: "75% layout mechanical keyboard with hot-swappable linear switches, double-shot PBT keycaps, and customizable RGB backlighting.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop",
    rating: { rate: 4.4, count: 78 }
  }
];

// Additional premium products to expand the catalog with clothes, footwear, and accessories
const LOCAL_PREMIUM_PRODUCTS = [
  // Men's Clothing
  {
    id: 201,
    title: "Aura Slim-Fit Stretch Chinos",
    price: 3499.00,
    category: "men's clothing",
    description: "Classic slim-fit chinos crafted from premium stretch cotton twill for ultimate comfort and versatility. Ideal for smart-casual wear.",
    image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=600&auto=format&fit=crop",
    brand: "Levi's",
    colors: ["#374151", "#b45309", "#1e293b"],
    sizes: ["30", "32", "34", "36"],
    rating: { rate: 4.6, count: 145 },
    badge: "Best Seller"
  },
  {
    id: 202,
    title: "Premium Merino Wool Knit Sweater",
    price: 5999.00,
    category: "men's clothing",
    description: "Indulge in luxurious warmth with our sweater knitted from 100% fine Merino wool. Extremely soft, breathable, and temperature-regulating.",
    image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=600&auto=format&fit=crop",
    brand: "Zara",
    colors: ["#1e293b", "#e2e8f0"],
    sizes: ["M", "L", "XL"],
    rating: { rate: 4.7, count: 98 },
    badge: "New"
  },
  {
    id: 218,
    title: "Classic Oxford Cotton Shirt",
    price: 4499.00,
    category: "men's clothing",
    description: "Tailored Oxford shirt woven from 100% premium long-staple cotton. Finished with button-down collar and signature logo embroidery.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop",
    brand: "Tommy Hilfiger",
    colors: ["#ffffff", "#3b82f6", "#ef4444"],
    sizes: ["S", "M", "L", "XL"],
    rating: { rate: 4.5, count: 164 },
    badge: "Best Seller"
  },
  {
    id: 219,
    title: "Urbanite Slim-Fit Denim Jeans",
    price: 4999.00,
    category: "men's clothing",
    description: "Classic 5-pocket denim jeans with a modern slim fit. Features durable copper rivets, zip fly, and premium washes.",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop",
    brand: "Levi's",
    colors: ["#1e293b", "#374151"],
    sizes: ["30", "32", "34", "36"],
    rating: { rate: 4.7, count: 212 },
    badge: "Trending"
  },
  {
    id: 220,
    title: "Nomad Waterproof Trail Parka",
    price: 9999.00,
    category: "men's clothing",
    description: "Heavy-duty outdoor parka featuring a waterproof, windproof membrane, fleece lining, adjustable hood, and utility pockets.",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop",
    brand: "Nomad",
    colors: ["#0f766e", "#1e293b"],
    sizes: ["M", "L", "XL", "XXL"],
    rating: { rate: 4.8, count: 85 },
    badge: "Limited"
  },
  {
    id: 221,
    title: "Classic Co. Crewneck T-Shirt",
    price: 1299.00,
    category: "men's clothing",
    description: "Essential daily crewneck tee made from ultra-soft combed ring-spun cotton. Pre-shrunk for a perfect fit.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
    brand: "Classic Co.",
    colors: ["#ffffff", "#000000", "#e2e8f0"],
    sizes: ["S", "M", "L", "XL"],
    rating: { rate: 4.3, count: 320 },
    badge: "Sale"
  },
  
  // Women's Clothing
  {
    id: 203,
    title: "Classic Double-Breasted Trench Coat",
    price: 12999.00,
    category: "women's clothing",
    description: "A timeless outer layer tailored from water-repellent gabardine. Features a waist-defining belt, storm flaps, and signature horn buttons.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop",
    brand: "Zara",
    colors: ["#b45309", "#1e293b"],
    sizes: ["S", "M", "L"],
    rating: { rate: 4.9, count: 84 },
    badge: "Limited"
  },
  {
    id: 204,
    title: "Elysian Silk Wrap Blouse",
    price: 4499.00,
    category: "women's clothing",
    description: "Elegant wrap blouse crafted from luxurious mulberry silk. Designed with a flattering V-neckline and draped bishop sleeves.",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600&auto=format&fit=crop",
    brand: "Elysian",
    colors: ["#f472b6", "#ffffff"],
    sizes: ["XS", "S", "M", "L"],
    rating: { rate: 4.5, count: 76 },
    badge: "Best Seller"
  },
  {
    id: 222,
    title: "Elysian Linen Summer Blazer",
    price: 6499.00,
    category: "women's clothing",
    description: "Lightweight, unstructured blazer tailored from pure Belgian linen. Features a relaxed fit, notched lapels, and tortoiseshell buttons.",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop",
    brand: "Elysian",
    colors: ["#e2e8f0", "#ffffff"],
    sizes: ["S", "M", "L"],
    rating: { rate: 4.6, count: 59 },
    badge: "New"
  },
  {
    id: 223,
    title: "Belle Pleated A-Line Midi Skirt",
    price: 3299.00,
    category: "women's clothing",
    description: "Flowy accordion-pleated midi skirt featuring a comfortable high-rise elastic waistband. Made from silky crepe fabric.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
    brand: "Belle",
    colors: ["#ec4899", "#1e293b"],
    sizes: ["XS", "S", "M", "L"],
    rating: { rate: 4.4, count: 118 },
    badge: "Trending"
  },
  {
    id: 224,
    title: "Siren Velvet Evening Gown",
    price: 14999.00,
    category: "women's clothing",
    description: "Floor-length evening gown crafted from luxurious plush velvet. Elegant off-the-shoulder neckline and a dramatic side slit.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop",
    brand: "Siren",
    colors: ["#1e293b", "#831843"],
    sizes: ["S", "M", "L"],
    rating: { rate: 4.9, count: 47 },
    badge: "Limited"
  },

  // Footwear
  {
    id: 205,
    title: "Aura Air-Cushioned Running Shoes",
    price: 8999.00,
    category: "footwear",
    description: "Engineered for peak performance. Features a highly responsive air-cushioned midsole, breathable knit upper, and durable traction outsole.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    brand: "Nike",
    colors: ["#ef4444", "#000000", "#ffffff"],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    rating: { rate: 4.8, count: 312 },
    badge: "Best Seller"
  },
  {
    id: 206,
    title: "Classic White Leather Sneakers",
    price: 6499.00,
    category: "footwear",
    description: "Minimalist tennis sneakers constructed from premium full-grain leather. Finished with a comfortable OrthoLite sockliner and rubber cupsole.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
    brand: "Adidas",
    colors: ["#ffffff", "#1e293b"],
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
    rating: { rate: 4.7, count: 218 },
    badge: "New"
  },
  {
    id: 207,
    title: "Handcrafted Suede Chelsea Boots",
    price: 11999.00,
    category: "footwear",
    description: "Luxurious Chelsea boots made from water-resistant Italian suede. Detailed with elastic side panels and a stacked leather heel.",
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=600&auto=format&fit=crop",
    brand: "New Balance",
    colors: ["#b45309", "#1e293b"],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    rating: { rate: 4.6, count: 92 },
    badge: "Limited"
  },
  {
    id: 225,
    title: "Puma Ignite Speed Running Shoes",
    price: 7499.00,
    category: "footwear",
    description: "High-performance running shoes featuring Ignite foam midsole energy return, breathable mesh upper, and high-abrasion rubber outsole.",
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=600&auto=format&fit=crop",
    brand: "Puma",
    colors: ["#000000", "#ffffff", "#ef4444"],
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
    rating: { rate: 4.5, count: 142 },
    badge: "Sale"
  },
  {
    id: 226,
    title: "Jordan Air Retro Court Sneakers",
    price: 16999.00,
    category: "footwear",
    description: "The legendary court silhouette featuring premium leather panels, visible Air-Sole cushioning, and bold retro color blocking.",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=600&auto=format&fit=crop",
    brand: "Jordan",
    colors: ["#ef4444", "#000000"],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    rating: { rate: 4.9, count: 185 },
    badge: "Best Seller"
  },
  {
    id: 227,
    title: "Vans Old Skool Canvas Skate Shoes",
    price: 4999.00,
    category: "footwear",
    description: "Classic low-top skate shoes featuring a durable canvas and suede upper, padded collars, and signature waffle rubber outsoles.",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600&auto=format&fit=crop",
    brand: "Vans",
    colors: ["#000000", "#ffffff"],
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
    rating: { rate: 4.7, count: 298 },
    badge: "Trending"
  },

  // Accessories
  {
    id: 208,
    title: "Aura Gold-Trimmed Aviator Sunglasses",
    price: 5999.00,
    category: "accessories",
    description: "Iconic aviator silhouette featuring a lightweight gold-plated metal frame and polarized green classic G-15 lenses with 100% UV protection.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
    brand: "Ray-Ban",
    colors: ["#fbbf24", "#000000"],
    sizes: ["Standard"],
    rating: { rate: 4.8, count: 164 },
    badge: "Best Seller"
  },
  {
    id: 209,
    title: "Chronograph Stainless Steel Watch",
    price: 14499.00,
    category: "accessories",
    description: "Sophisticated timepiece featuring a Japanese quartz movement, three chronograph sub-dials, date window, and water resistance up to 100m.",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop",
    brand: "Seiko",
    colors: ["#e2e8f0", "#fbbf24", "#000000"],
    sizes: ["One Size"],
    rating: { rate: 4.9, count: 105 },
    badge: "New"
  },
  {
    id: 210,
    title: "Minimalist Saffiano Leather Wallet",
    price: 2999.00,
    category: "accessories",
    description: "Compact bi-fold wallet crafted from scratch-resistant Saffiano leather. Features 6 card slots, a bill compartment, and RFID blocking technology.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
    brand: "Fossil",
    colors: ["#1e293b", "#b45309"],
    sizes: ["One Size"],
    rating: { rate: 4.4, count: 87 },
    badge: "Sale"
  },
  {
    id: 228,
    title: "Oakley Sport Polarized Sunglasses",
    price: 8999.00,
    category: "accessories",
    description: "High-wrap sport sunglasses featuring Oakley's Prizm polarized lenses for enhanced color contrast and impact resistance.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop",
    brand: "Oakley",
    colors: ["#000000", "#3b82f6"],
    sizes: ["Standard"],
    rating: { rate: 4.6, count: 114 },
    badge: "New"
  },
  {
    id: 229,
    title: "Herschel Heritage Canvas Backpack",
    price: 4499.00,
    category: "accessories",
    description: "Classic design with a signature diamond accent. Features a padded 15-inch laptop sleeve, front pocket, and striped fabric liner.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    brand: "Herschel",
    colors: ["#374151", "#b45309"],
    sizes: ["One Size"],
    rating: { rate: 4.7, count: 245 },
    badge: "Best Seller"
  },
  {
    id: 230,
    title: "Casio Vintage Digital Watch",
    price: 3999.00,
    category: "accessories",
    description: "Timeless retro digital watch featuring a stainless steel band, LED backlight, daily alarm, and 1/100-second stopwatch.",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=600&auto=format&fit=crop",
    brand: "Casio",
    colors: ["#e2e8f0", "#fbbf24"],
    sizes: ["One Size"],
    rating: { rate: 4.5, count: 198 },
    badge: "Trending"
  },

  // Electronics
  {
    id: 211,
    title: "Quantum Soundbar Series 7",
    price: 12999.00,
    category: "electronics",
    description: "High-fidelity soundbar with wireless subwoofer, Dolby Atmos support, and Bluetooth connectivity.",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop",
    brand: "Quantum",
    colors: ["#000000"],
    sizes: ["Standard"],
    rating: { rate: 4.6, count: 75 },
    badge: "New"
  },
  {
    id: 212,
    title: "Aura OLED Portable Monitor",
    price: 18999.00,
    category: "electronics",
    description: "Ultra-thin 15.6-inch 4K OLED portable monitor with dual USB-C ports, mini HDMI, and built-in speakers.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop",
    brand: "AuraTech",
    colors: ["#000000"],
    sizes: ["15.6 Inch"],
    rating: { rate: 4.7, count: 68 },
    badge: "Best Seller"
  },
  {
    id: 213,
    title: "Apex Ergonomic Wireless Mouse",
    price: 3499.00,
    category: "electronics",
    description: "Ergonomically sculpted wireless mouse with adjustable 4000 DPI sensor, hyper-fast scroll wheel, and dual Bluetooth/USB connectivity.",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop",
    brand: "Apex",
    colors: ["#000000", "#e2e8f0"],
    sizes: ["Standard"],
    rating: { rate: 4.5, count: 189 },
    badge: "Trending"
  },
  {
    id: 214,
    title: "Nova Smart Home Hub",
    price: 6999.00,
    category: "electronics",
    description: "Voice-controlled smart assistant and home automation hub featuring a 7-inch touch display and premium speakers.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop",
    brand: "Nova",
    colors: ["#ffffff", "#000000"],
    sizes: ["Standard"],
    rating: { rate: 4.4, count: 92 },
    badge: "Sale"
  },

  // Jewelry
  {
    id: 215,
    title: "Symmetry Diamond Stud Earrings",
    price: 45999.00,
    category: "jewelery",
    description: "Stunning 1-carat round brilliant-cut diamonds set in elegant 18k white gold four-prong settings.",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=600&auto=format&fit=crop",
    brand: "Symmetry",
    colors: ["#e2e8f0"],
    sizes: ["One Size"],
    rating: { rate: 4.9, count: 43 },
    badge: "Best Seller"
  },
  {
    id: 216,
    title: "Luna Silver Chain Bracelet",
    price: 7999.00,
    category: "jewelery",
    description: "Handcrafted 925 sterling silver flat curb chain bracelet. Classic, heavy-weight design with a secure lobster clasp.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
    brand: "Luna",
    colors: ["#e2e8f0"],
    sizes: ["7.5 Inch", "8.0 Inch"],
    rating: { rate: 4.6, count: 88 },
    badge: "New"
  },
  {
    id: 217,
    title: "Orion Pearl Drop Necklace",
    price: 15499.00,
    category: "jewelery",
    description: "Luminous South Sea cultured pearl suspended from a delicate 14k yellow gold chain adorned with small diamonds.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
    brand: "Orion",
    colors: ["#fbbf24"],
    sizes: ["18 Inch"],
    rating: { rate: 4.8, count: 57 },
    badge: "Limited"
  },

  // ── WATCHES — Luxury ──────────────────────────────────────────────────
  {
    id: 301,
    title: "Rolex Submariner Date Black Dial",
    price: 950000.00,
    category: "watches",
    description: "The iconic Rolex Submariner Date in Oystersteel. Features a unidirectional rotatable 60-minute bezel with Cerachrom insert, waterproof to 300 m and powered by the calibre 3235 movement.",
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=600&auto=format&fit=crop",
    brand: "Rolex",
    colors: ["#1e293b", "#e2e8f0", "#fbbf24"],
    sizes: ["One Size"],
    rating: { rate: 4.9, count: 842 },
    badge: "Best Seller"
  },
  {
    id: 302,
    title: "Omega Seamaster Professional 300M",
    price: 480000.00,
    category: "watches",
    description: "The legendary Omega Seamaster Diver 300M in stainless steel. Co-Axial Master Chronometer calibre 8800 movement, 300 m water resistance, ceramic dial.",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop",
    brand: "Omega",
    colors: ["#1e293b", "#e2e8f0", "#fbbf24"],
    sizes: ["One Size"],
    rating: { rate: 4.9, count: 624 },
    badge: "Best Seller"
  },
  {
    id: 303,
    title: "Patek Philippe Calatrava Dress Watch",
    price: 2500000.00,
    category: "watches",
    description: "A timeless Patek Philippe Calatrava in 18k rose gold. Ultra-thin hand-wound calibre 215 PS, opaline silver dial with applied gold hour markers.",
    image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=600&auto=format&fit=crop",
    brand: "Patek Philippe",
    colors: ["#fbbf24", "#e2e8f0"],
    sizes: ["One Size"],
    rating: { rate: 5.0, count: 198 },
    badge: "Limited"
  },
  {
    id: 304,
    title: "Audemars Piguet Royal Oak Selfwinding",
    price: 1850000.00,
    category: "watches",
    description: "The iconic Royal Oak in stainless steel with the legendary 'Grande Tapisserie' dial pattern. Calibre 4302 automatic movement with 70-hour power reserve.",
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600&auto=format&fit=crop",
    brand: "Audemars Piguet",
    colors: ["#1e293b", "#fbbf24"],
    sizes: ["One Size"],
    rating: { rate: 4.9, count: 267 },
    badge: "Limited"
  },
  {
    id: 305,
    title: "Cartier Tank Must Large",
    price: 320000.00,
    category: "watches",
    description: "The Cartier Tank Must in WSTA0052 configuration. Steel case with classic Roman numeral dial, sapphire cabochon crown, and bordeaux alligator strap.",
    image: "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=600&auto=format&fit=crop",
    brand: "Cartier",
    colors: ["#e2e8f0", "#fbbf24"],
    sizes: ["One Size"],
    rating: { rate: 4.8, count: 389 },
    badge: "New"
  },
  {
    id: 306,
    title: "Hublot Big Bang Integral Titanium",
    price: 1200000.00,
    category: "watches",
    description: "Hublot Big Bang Integral in polished/satin titanium. Powered by HUB1280 UNICO Manufacture chronograph movement. 42 mm case, 100 m water resistance.",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop",
    brand: "Hublot",
    colors: ["#e2e8f0", "#1e293b"],
    sizes: ["One Size"],
    rating: { rate: 4.8, count: 211 },
    badge: "Limited"
  },
  {
    id: 307,
    title: "IWC Schaffhausen Portugieser Chronograph",
    price: 680000.00,
    category: "watches",
    description: "IWC Portugieser Chronograph in stainless steel. 41 mm case, silver-plated dial, column-wheel chronograph calibre 69355, 46-hour power reserve.",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop",
    brand: "IWC Schaffhausen",
    colors: ["#e2e8f0", "#1e293b"],
    sizes: ["One Size"],
    rating: { rate: 4.8, count: 176 },
    badge: "New"
  },
  {
    id: 308,
    title: "Jaeger-LeCoultre Reverso Classic Duoface",
    price: 890000.00,
    category: "watches",
    description: "The Reverso Classic Duoface in stainless steel with its iconic reversible case. Day dial in opaline silver, night dial in blue. Manually wound calibre 854 A/2.",
    image: "https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=600&auto=format&fit=crop",
    brand: "Jaeger-LeCoultre",
    colors: ["#e2e8f0", "#1e293b"],
    sizes: ["One Size"],
    rating: { rate: 4.9, count: 143 },
    badge: "Limited"
  },
  {
    id: 309,
    title: "Breitling Navitimer B01 Chronograph 43",
    price: 620000.00,
    category: "watches",
    description: "The legendary Breitling Navitimer with in-house Manufacture calibre B01. 43 mm steel case, black dial, iconic slide-rule bezel for airborne calculations, 70-hour power reserve.",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop",
    brand: "Breitling",
    colors: ["#1e293b", "#e2e8f0"],
    sizes: ["One Size"],
    rating: { rate: 4.8, count: 294 },
    badge: "Best Seller"
  },
  {
    id: 310,
    title: "TAG Heuer Carrera Calibre 5 Automatic",
    price: 195000.00,
    category: "watches",
    description: "The TAG Heuer Carrera Automatic in polished and brushed steel. 39 mm case, silver-white sunray dial, self-winding calibre 5 movement, 100 m water resistance.",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop",
    brand: "TAG Heuer",
    colors: ["#e2e8f0", "#1e293b", "#fbbf24"],
    sizes: ["One Size"],
    rating: { rate: 4.7, count: 508 },
    badge: "Best Seller"
  },

  // ── WATCHES — Premium ─────────────────────────────────────────────────
  {
    id: 311,
    title: "Tissot PRX Powermatic 80 35mm",
    price: 42000.00,
    category: "watches",
    description: "The Tissot PRX in stainless steel with a sunray blue dial. Powermatic 80 automatic movement with 80-hour power reserve, integrated bracelet, 100 m water resistance.",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop",
    brand: "Tissot",
    colors: ["#1e293b", "#e2e8f0", "#fbbf24"],
    sizes: ["One Size"],
    rating: { rate: 4.7, count: 632 },
    badge: "Best Seller"
  },
  {
    id: 312,
    title: "Longines Master Collection Moonphase",
    price: 125000.00,
    category: "watches",
    description: "Longines Master Collection in stainless steel featuring a silver dial with moonphase indicator, triple calendar, and L899 automatic calibre with 72-hour power reserve.",
    image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=600&auto=format&fit=crop",
    brand: "Longines",
    colors: ["#e2e8f0", "#fbbf24"],
    sizes: ["One Size"],
    rating: { rate: 4.8, count: 284 },
    badge: "New"
  },
  {
    id: 313,
    title: "Rado True Thinline Ceramic Watch",
    price: 78000.00,
    category: "watches",
    description: "Rado True Thinline in ultra-light high-tech white ceramic. Quartz movement with clean minimalist dial, 5 mm case height, and integrated ceramic bracelet.",
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=600&auto=format&fit=crop",
    brand: "Rado",
    colors: ["#e2e8f0", "#000000"],
    sizes: ["One Size"],
    rating: { rate: 4.6, count: 215 },
    badge: "New"
  },
  {
    id: 314,
    title: "Seiko Presage Sharp-Edged Enamel Dial",
    price: 38500.00,
    category: "watches",
    description: "The Seiko Presage Sharp-Edged Series featuring a mesmerizing hand-crafted enamel dial inspired by faceted glass. Calibre 4R35 automatic movement.",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop",
    brand: "Seiko",
    colors: ["#1e293b", "#e2e8f0"],
    sizes: ["One Size"],
    rating: { rate: 4.8, count: 447 },
    badge: "Best Seller"
  },
  {
    id: 315,
    title: "Citizen Eco-Drive Promaster Sky Titanium",
    price: 29000.00,
    category: "watches",
    description: "Citizen Eco-Drive Promaster Sky in lightweight titanium. Solar-powered with radio-controlled atomic timekeeping, world time in 26 zones, and 200 m water resistance.",
    image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=600&auto=format&fit=crop",
    brand: "Citizen",
    colors: ["#1e293b", "#e2e8f0"],
    sizes: ["One Size"],
    rating: { rate: 4.7, count: 389 },
    badge: "Best Seller"
  },
  {
    id: 316,
    title: "Hamilton Khaki Field Mechanical",
    price: 32000.00,
    category: "watches",
    description: "Hamilton Khaki Field Mechanical in brushed stainless steel. Military-inspired aesthetic with hand-wound ETA Unitas 6497 calibre, 80-hour power reserve, and canvas strap.",
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600&auto=format&fit=crop",
    brand: "Hamilton",
    colors: ["#1e293b", "#b45309"],
    sizes: ["One Size"],
    rating: { rate: 4.7, count: 324 },
    badge: "Trending"
  },
  {
    id: 317,
    title: "Frederique Constant Highlife COSC",
    price: 68000.00,
    category: "watches",
    description: "Frederique Constant Highlife Automatic COSC in stainless steel. Certified chronometer calibre FC-303, integrated H-link bracelet, sunburst blue dial, 50 m water resistance.",
    image: "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=600&auto=format&fit=crop",
    brand: "Frederique Constant",
    colors: ["#1e293b", "#e2e8f0"],
    sizes: ["One Size"],
    rating: { rate: 4.6, count: 142 },
    badge: "New"
  },
  {
    id: 318,
    title: "Bulova Precisionist Chronograph",
    price: 24500.00,
    category: "watches",
    description: "Bulova Precisionist Chronograph in stainless steel featuring the ultra-high-frequency 262 kHz Precisionist movement. 1/1000th second accuracy with sweeping seconds hand.",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop",
    brand: "Bulova",
    colors: ["#1e293b", "#e2e8f0"],
    sizes: ["One Size"],
    rating: { rate: 4.6, count: 218 },
    badge: "Sale"
  },
  {
    id: 319,
    title: "Fossil Gen 6 Wellness Edition",
    price: 22000.00,
    category: "watches",
    description: "Fossil Gen 6 Wellness Smartwatch featuring Wear OS by Google. SpO2, sleep tracking, built-in Alexa, Always-On AMOLED display, and 24-hour advanced health monitoring.",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop",
    brand: "Fossil",
    colors: ["#1e293b", "#e2e8f0", "#b45309"],
    sizes: ["One Size"],
    rating: { rate: 4.4, count: 567 },
    badge: "Trending"
  },
  {
    id: 320,
    title: "Casio G-Shock GA-2100 Carbon Core",
    price: 9500.00,
    category: "watches",
    description: "The G-Shock GA-2100 in the ultra-slim Carbon Core Guard structure. Combines analog and digital displays, 200 m shock-resistant construction, world time in 31 cities.",
    image: "https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=600&auto=format&fit=crop",
    brand: "Casio",
    colors: ["#000000", "#1e293b", "#e2e8f0"],
    sizes: ["One Size"],
    rating: { rate: 4.8, count: 1240 },
    badge: "Best Seller"
  },

  // ── WATCHES — Smartwatch ──────────────────────────────────────────────
  {
    id: 321,
    title: "Apple Watch Ultra 2 Titanium",
    price: 89900.00,
    category: "watches",
    description: "Apple Watch Ultra 2 in natural titanium with a flat sapphire crystal. Action Button, dual-frequency GPS, 60-hour battery life, and 100 m water resistance for extreme adventures.",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop",
    brand: "Apple",
    colors: ["#e2e8f0", "#fbbf24", "#000000"],
    sizes: ["One Size"],
    rating: { rate: 4.9, count: 3421 },
    badge: "Best Seller"
  },
  {
    id: 322,
    title: "Apple Watch Series 9 Starlight Aluminium",
    price: 41900.00,
    category: "watches",
    description: "Apple Watch Series 9 in starlight aluminium with a new S9 chip. Double tap gesture, Always-On Retina display, advanced health sensors, and crash detection.",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop",
    brand: "Apple",
    colors: ["#e2e8f0", "#1e293b", "#fbbf24"],
    sizes: ["One Size"],
    rating: { rate: 4.8, count: 5672 },
    badge: "Best Seller"
  },
  {
    id: 323,
    title: "Samsung Galaxy Watch 6 Classic 47mm",
    price: 36999.00,
    category: "watches",
    description: "Samsung Galaxy Watch 6 Classic with iconic rotating bezel. BioActive Sensor, advanced sleep coaching, body composition analysis, and super AMOLED Always-On Display.",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop",
    brand: "Samsung",
    colors: ["#1e293b", "#e2e8f0"],
    sizes: ["One Size"],
    rating: { rate: 4.7, count: 2183 },
    badge: "New"
  },
  {
    id: 324,
    title: "Garmin Fenix 7X Pro Solar Titanium",
    price: 79990.00,
    category: "watches",
    description: "Garmin Fenix 7X Pro Solar Edition with solar charging lens. Multi-band GPS, multi-sport tracking, topographic maps, flashlight, and up to 37 days battery in smartwatch mode.",
    image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=600&auto=format&fit=crop",
    brand: "Garmin",
    colors: ["#e2e8f0", "#1e293b", "#b45309"],
    sizes: ["One Size"],
    rating: { rate: 4.8, count: 1342 },
    badge: "Best Seller"
  },
  {
    id: 325,
    title: "Huawei Watch GT 4 Black Edition",
    price: 19999.00,
    category: "watches",
    description: "Huawei Watch GT 4 featuring a 14-day battery life, AMOLED display, comprehensive health tracking including ECG, blood oxygen, skin temperature and GPS.",
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=600&auto=format&fit=crop",
    brand: "Huawei",
    colors: ["#000000", "#e2e8f0"],
    sizes: ["One Size"],
    rating: { rate: 4.5, count: 876 },
    badge: "Trending"
  },
  {
    id: 326,
    title: "Amazfit Balance Smartwatch",
    price: 17999.00,
    category: "watches",
    description: "Amazfit Balance with Zepp OS 2.0 and AI wellness system. Dual-band GPS, 14-day battery, AMOLED display, menstrual health, sleep tracking with readiness score.",
    image: "https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=600&auto=format&fit=crop",
    brand: "Amazfit",
    colors: ["#e2e8f0", "#1e293b"],
    sizes: ["One Size"],
    rating: { rate: 4.5, count: 1054 },
    badge: "New"
  },

  // ── WATCHES — Fashion / Designer ─────────────────────────────────────
  {
    id: 327,
    title: "Michael Kors Runway Mercer Gold Watch",
    price: 18500.00,
    category: "watches",
    description: "Michael Kors Runway in gold-tone stainless steel. Slim three-hand movement with date, Roman numeral markers, and a matching gold-tone mesh bracelet.",
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600&auto=format&fit=crop",
    brand: "Michael Kors",
    colors: ["#fbbf24", "#e2e8f0"],
    sizes: ["One Size"],
    rating: { rate: 4.4, count: 723 },
    badge: "Best Seller"
  },
  {
    id: 328,
    title: "Emporio Armani Ceramica Chronograph",
    price: 24000.00,
    category: "watches",
    description: "Emporio Armani Ceramica in jet-black ceramic case and bracelet. Swiss-made quartz chronograph with sub-dials for hours, minutes, and small seconds.",
    image: "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=600&auto=format&fit=crop",
    brand: "Emporio Armani",
    colors: ["#000000", "#e2e8f0"],
    sizes: ["One Size"],
    rating: { rate: 4.5, count: 432 },
    badge: "Trending"
  },
  {
    id: 329,
    title: "Tommy Hilfiger Alden Sport Watch",
    price: 12500.00,
    category: "watches",
    description: "Tommy Hilfiger Alden in a sporty two-tone stainless steel bracelet. Clean sunray blue dial with date window, luminescent hands, and three-hand quartz movement.",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop",
    brand: "Tommy Hilfiger",
    colors: ["#1e293b", "#e2e8f0"],
    sizes: ["One Size"],
    rating: { rate: 4.3, count: 518 },
    badge: "Sale"
  },
  {
    id: 330,
    title: "Timex Waterbury Classic Chronograph",
    price: 8999.00,
    category: "watches",
    description: "Timex Waterbury Classic Chronograph in stainless steel with a genuine leather strap. Indiglo backlight, 60-minute bezel, and legacy-inspired tonneau case shape.",
    image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=600&auto=format&fit=crop",
    brand: "Timex",
    colors: ["#1e293b", "#b45309"],
    sizes: ["One Size"],
    rating: { rate: 4.5, count: 894 },
    badge: "Best Seller"
  },
  {
    id: 331,
    title: "Daniel Wellington Classic Petite Melrose",
    price: 11000.00,
    category: "watches",
    description: "Daniel Wellington Classic Petite Melrose with a 28 mm rose gold-plated case. Minimalist white dial, interchangeable mesh strap, and 5 ATM water resistance.",
    image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=600&auto=format&fit=crop",
    brand: "Daniel Wellington",
    colors: ["#fbbf24", "#e2e8f0"],
    sizes: ["One Size"],
    rating: { rate: 4.4, count: 1128 },
    badge: "Trending"
  }
];

// --- 2. APPLICATION STATE ---
const state = {
  products: [],
  customProducts: JSON.parse(localStorage.getItem("aura_custom_products")) || [],
  cart: JSON.parse(localStorage.getItem("aura_cart")) || [],
  wishlist: JSON.parse(localStorage.getItem("aura_wishlist")) || [],
  compare: JSON.parse(localStorage.getItem("aura_compare")) || [],
  searchHistory: JSON.parse(localStorage.getItem("aura_search_history")) || ["headphones", "backpack", "watch"],
  theme: localStorage.getItem("aura_theme") || "light",
  currentView: "#home",
  
  // Filtering & Sorting
  filters: {
    search: "",
    category: "all",
    priceMax: 200000,
    brand: "all",
    rating: "all",
    stockOnly: false
  },
  sortBy: "default",
  
  // Pagination
  currentPage: 1,
  itemsPerPage: 6,
  
  // Coupons
  couponCode: "",
  couponDiscount: 0 // percentage
};

// --- 3. HELPER FUNCTIONS ---
let homeSwipers = {
  hero: null,
  trending: null
};

function destroyHomeSwipers() {
  if (homeSwipers.hero) {
    homeSwipers.hero.destroy(true, true);
    homeSwipers.hero = null;
  }
  if (homeSwipers.trending) {
    homeSwipers.trending.destroy(true, true);
    homeSwipers.trending = null;
  }
}

function saveStateToLocalStorage() {
  localStorage.setItem("aura_cart", JSON.stringify(state.cart));
  localStorage.setItem("aura_wishlist", JSON.stringify(state.wishlist));
  localStorage.setItem("aura_compare", JSON.stringify(state.compare));
  localStorage.setItem("aura_custom_products", JSON.stringify(state.customProducts));
  localStorage.setItem("aura_search_history", JSON.stringify(state.searchHistory));
  localStorage.setItem("aura_theme", state.theme);
}

// Show Floating Toast Notification
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast-item glass-panel px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border text-sm pointer-events-auto transition-all ${
    type === "success" 
      ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-500" 
      : type === "info" 
        ? "border-brand-primary/20 bg-brand-primary/5 text-brand-primary" 
        : "border-red-500/20 bg-red-500/5 text-red-500"
  }`;

  const icon = type === "success" 
    ? "fa-circle-check" 
    : type === "info" 
      ? "fa-circle-info" 
      : "fa-triangle-exclamation";

  toast.innerHTML = `
    <i class="fa-solid ${icon} text-base"></i>
    <span class="font-semibold">${message}</span>
  `;

  container.appendChild(toast);

  // Animate slide-in
  gsap.fromTo(toast, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.add("leaving");
    gsap.to(toast, { x: 100, opacity: 0, scale: 0.9, duration: 0.3, onComplete: () => toast.remove() });
  }, 3000);
}

// --- 4. INITIALIZE THE APPLICATION & API FETCH ---
async function initApp() {
  // Load currency and language from local storage
  state.currency = localStorage.getItem("aura_currency") || "INR";
  state.language = localStorage.getItem("aura_language") || "ENG";

  updatePreloaderProgress(15);
  setupTheme();
  setAdminAccessVisibility();
  setupEventListeners();
  
  initCustomCursor();
  initDropdownMenus();
  updatePreloaderProgress(40);
  
  await fetchProducts();
  updatePreloaderProgress(85);
  
  handleRouting();
  startCountdownTimer();
  updateBadges();
  renderCategories();
  
  initVoiceSearch();
  
  // Set active items in dropdowns
  setLanguage(state.language);
  setCurrency(state.currency);

  updatePreloaderProgress(100);
  dismissPreloader();
}

// Fetch products from API and enrich them
async function fetchProducts() {
  renderSkeletons();

  // ── Cache API response for 10 minutes to avoid rate-limit errors ──
  const CACHE_KEY = "aura_api_products_cache";
  const CACHE_TTL = 10 * 60 * 1000; // 10 minutes
  let apiData = null;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        apiData = data; // use cached data, skip API call
      }
    }

    if (!apiData) {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("API Network error");
      apiData = await response.json();
      // Save to cache
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data: apiData, timestamp: Date.now() }));
    }

    const enrichedApiProducts = apiData.map(product => enrichProduct(product));
    const enrichedLocalPremium = LOCAL_PREMIUM_PRODUCTS.map(product => enrichProduct(product));
    state.products = [...enrichedApiProducts, ...enrichedLocalPremium, ...state.customProducts];
  } catch (error) {
    console.error("Error fetching products, falling back to mock data:", error);
    const enrichedFallback = FALLBACK_PRODUCTS.map(product => enrichProduct(product));
    const enrichedLocalPremium = LOCAL_PREMIUM_PRODUCTS.map(product => enrichProduct(product));
    state.products = [...enrichedFallback, ...enrichedLocalPremium, ...state.customProducts];
    showToast("Loaded offline mock product data.", "info");
  }

  generate50ItemsPerBrand();
}

// Programmatically generate products so that every single brand has exactly 50 items
function generate50ItemsPerBrand() {
  const allBrands = [];
  Object.values(BRAND_LIST).forEach(list => {
    list.forEach(b => {
      if (!allBrands.includes(b)) allBrands.push(b);
    });
  });

  const brandFootwearImages = {
    "Nike": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=600&auto=format&fit=crop"
    ],
    "Adidas": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=600&auto=format&fit=crop"
    ],
    "Puma": [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552066344-2464c1135c32?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618677831708-0e7fda3148b4?q=80&w=600&auto=format&fit=crop"
    ],
    "New Balance": [
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=600&auto=format&fit=crop"
    ],
    "Jordan": [
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=600&auto=format&fit=crop"
    ],
    "Vans": [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1628253747716-0c4f5c90fdda?q=80&w=600&auto=format&fit=crop"
    ],
    "Reebok": [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612902376491-7a8a99b424e8?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=600&auto=format&fit=crop"
    ],
    "Converse": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=600&auto=format&fit=crop"
    ]
  };

  // Brand-specific watch image pools — guaranteed working Unsplash URLs
  const brandWatchImages = {
    "Casio": [
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop"
    ],
    "Seiko": [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop"
    ],
    "Fossil": [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=600&auto=format&fit=crop"
    ],
    "Timex": [
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=600&auto=format&fit=crop"
    ],
    "Citizen": [
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop"
    ],
    "Apple": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=600&auto=format&fit=crop"
    ],
    "Samsung": [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=600&auto=format&fit=crop"
    ],
    "Garmin": [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop"
    ],
    "Huawei": [
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop"
    ],
    "Amazfit": [
      "https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop"
    ],
    "Hamilton": [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=600&auto=format&fit=crop"
    ],
    "Tissot": [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=600&auto=format&fit=crop"
    ],
    "Longines": [
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=600&auto=format&fit=crop"
    ],
    "Rado": [
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop"
    ],
    "Bulova": [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop"
    ],
    "Michael Kors": [
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=600&auto=format&fit=crop"
    ],
    "Emporio Armani": [
      "https://images.unsplash.com/photo-1621772549-7eedba5949e8?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=600&auto=format&fit=crop"
    ],
    "Tommy Hilfiger": [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop"
    ],
    "Daniel Wellington": [
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=600&auto=format&fit=crop"
    ],
    "Frederique Constant": [
      "https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=600&auto=format&fit=crop"
    ],
    "Rolex": [
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=600&auto=format&fit=crop"
    ],
    "Omega": [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548171915-e79a6a8d5e37?q=80&w=600&auto=format&fit=crop"
    ],
    "Cartier": [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=600&auto=format&fit=crop"
    ],
    "TAG Heuer": [
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop"
    ],
    "Breitling": [
      "https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=600&auto=format&fit=crop"
    ],
    "Hublot": [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop"
    ]
  };

  const categoryDetails = {
    "electronics": {
      nouns: ["Wireless Charger","Power Bank","Bluetooth Speaker","Smart Bulb","USB-C Hub","Noise-Cancelling Earbuds","Wireless Headphones","Smart Watch","Mechanical Keyboard","OLED Monitor"],
      images: [
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1612178537253-bccd437b730e?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1593640408182-31c228e7e3d3?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1564466809058-bf4114d55352?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1567360425618-1594206637d2?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1601524909162-ae8725290836?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1625895197185-efcec01cffe0?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1572635196243-4dd75fbdbd7f?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=600&auto=format&fit=crop"
      ]
    },
    "jewelery": {
      nouns: ["Silver Ring","Gold Bangle","Crystal Pendant","Choker Necklace","Gemstone Bracelet","Diamond Earrings","Pearl Drop Necklace","Chain Bracelet"],
      images: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1588444650733-d0f2e38c3e5b?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1561828995-aa79a2db86dd?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1576022162027-0b9f7a0b0b0a?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1604594849809-dfedbc827105?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1620503374956-c942862f0372?q=80&w=600&auto=format&fit=crop"
      ]
    },
    "men's clothing": {
      nouns: ["Polo Shirt", "Crewneck Sweater", "Denim Jacket", "Chino Shorts", "Flannel Shirt", "Oxford Shirt", "Slim-Fit Chinos", "Graphic Tee", "Cargo Pants", "Windbreaker"],
      images: [
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop"
      ]
    },
    "women's clothing": {
      nouns: ["Floral Blouse", "Pleated Skirt", "Knit Cardigan", "Maxi Dress", "Tailored Blazer", "Trench Coat", "Silk Blouse", "Evening Gown", "Linen Blazer", "Summer Dress"],
      images: [
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop"
      ]
    },
    "footwear": {
      nouns: ["Running Shoes", "Leather Sneakers", "Suede Chelsea Boots", "Canvas Slip-Ons", "Sport Sandals", "Ignite Shoes", "Retro Court Sneakers", "Skate Shoes", "Training Shoes", "Loafers"],
      images: [
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop"
      ]
    },
    "accessories": {
      nouns: ["Leather Belt", "Canvas Backpack", "Travel Duffle", "Beanie Hat", "Minimalist Cardholder", "Aviator Sunglasses", "Stainless Steel Watch", "Leather Wallet", "Sport Sunglasses", "Travel Organizer"],
      images: [
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop"
      ]
    },
    "watches": {
      nouns: [
        "Dress Watch", "Diver Watch", "Chronograph", "Pilot Watch", "Field Watch",
        "Smartwatch", "Sport Watch", "Skeleton Watch", "Tourbillon Watch", "GMT Watch",
        "Perpetual Calendar Watch", "Moon Phase Watch", "Ceramic Watch", "Titanium Watch", "Digital Watch"
      ],
      images: [
        "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=600&auto=format&fit=crop"
      ]
    }
  };

  const adjectives = ["Premium", "Luxury", "Classic", "Minimalist", "Aura", "Eco-Friendly", "Urban", "Nomad", "Vintage", "Modern"];

  // Noun-to-image map — arrays so same noun cycles through different photos
  const NOUN_IMAGE_MAP = {
    "Wireless Headphones":["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1612178537253-bccd437b730e?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1625895197185-efcec01cffe0?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?q=80&w=600&auto=format&fit=crop"],
    "Noise-Cancelling Earbuds":["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1564424224827-cd24b8915874?q=80&w=600&auto=format&fit=crop"],
    "Bluetooth Speaker":["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1567360425618-1594206637d2?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1596230591786-6e97bb5d5cde?q=80&w=600&auto=format&fit=crop"],
    "Smart Watch":["https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop"],
    "Mechanical Keyboard":["https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1561112078-7d24e04c3407?q=80&w=600&auto=format&fit=crop"],
    "OLED Monitor":["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1593640408182-31c228e7e3d3?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1547119957-637f8679db1e?q=80&w=600&auto=format&fit=crop"],
    "Wireless Charger":["https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1601524909162-ae8725290836?q=80&w=600&auto=format&fit=crop"],
    "Power Bank":["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop"],
    "Smart Bulb":["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop"],
    "USB-C Hub":["https://images.unsplash.com/photo-1619980553475-d6d8ee3a4a79?q=80&w=600&auto=format&fit=crop"],
    // Men's clothing
    "Polo Shirt":               "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop",
    "Crewneck Sweater":         "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop",
    "Denim Jacket":             "https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=600&auto=format&fit=crop",
    "Oxford Shirt":             "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop",
    "Slim-Fit Chinos":          "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=600&auto=format&fit=crop",
    "Graphic Tee":              "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
    "Cargo Pants":              "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=600&auto=format&fit=crop",
    "Windbreaker":              "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop",
    "Flannel Shirt":            "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=600&auto=format&fit=crop",
    "Chino Shorts":             "https://images.unsplash.com/photo-1591195853828-11db59a44f43?q=80&w=600&auto=format&fit=crop",
    // Women's clothing
    "Floral Blouse":            "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=600&auto=format&fit=crop",
    "Pleated Skirt":            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
    "Knit Cardigan":            "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=600&auto=format&fit=crop",
    "Maxi Dress":               "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop",
    "Tailored Blazer":          "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop",
    "Trench Coat":              "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop",
    "Silk Blouse":              "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600&auto=format&fit=crop",
    "Evening Gown":             "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop",
    "Linen Blazer":             "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
    "Summer Dress":             "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&auto=format&fit=crop",
    // Footwear
    "Running Shoes":            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    "Leather Sneakers":         "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
    "Suede Chelsea Boots":      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=600&auto=format&fit=crop",
    "Canvas Slip-Ons":          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600&auto=format&fit=crop",
    "Retro Court Sneakers":     "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=600&auto=format&fit=crop",
    "Skate Shoes":              "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=600&auto=format&fit=crop",
    "Training Shoes":           "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600&auto=format&fit=crop",
    "Loafers":                  "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=600&auto=format&fit=crop",
    "Sport Sandals":            "https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=600&auto=format&fit=crop",
    "Ignite Shoes":             "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=600&auto=format&fit=crop",
    // Accessories
    "Leather Belt":             "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop",
    "Canvas Backpack":          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    "Travel Duffle":            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop",
    "Beanie Hat":               "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=600&auto=format&fit=crop",
    "Minimalist Cardholder":    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
    "Aviator Sunglasses":       "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
    "Stainless Steel Watch":    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop",
    "Leather Wallet":           "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?q=80&w=600&auto=format&fit=crop",
    "Sport Sunglasses":         "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop",
    "Travel Organizer":         "https://images.unsplash.com/photo-1565620731358-e8c038abc8d1?q=80&w=600&auto=format&fit=crop",
    // Watches — each noun maps to one of your 12 provided images, cycling uniquely
    "Dress Watch":              "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=600&auto=format&fit=crop",
    "Diver Watch":              "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop",
    "Chronograph":              "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=600&auto=format&fit=crop",
    "Pilot Watch":              "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600&auto=format&fit=crop",
    "Field Watch":              "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=600&auto=format&fit=crop",
    "Smartwatch":               "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop",
    "Sport Watch":              "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop",
    "Skeleton Watch":           "https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=600&auto=format&fit=crop",
    "Tourbillon Watch":         "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop",
    "GMT Watch":                "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop",
    "Perpetual Calendar Watch": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop",
    "Moon Phase Watch":         "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=600&auto=format&fit=crop",
    "Ceramic Watch":            "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=600&auto=format&fit=crop",
    "Titanium Watch":           "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop",
    "Digital Watch":            "https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=600&auto=format&fit=crop",
    // Jewelery
    "Silver Ring":              "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
    "Gold Bangle":              "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop",
    "Crystal Pendant":          "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=600&auto=format&fit=crop",
    "Choker Necklace":          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
    "Gemstone Bracelet":        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
    "Diamond Earrings":         "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=600&auto=format&fit=crop",
    "Pearl Drop Necklace":      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
    "Chain Bracelet":           "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=600&auto=format&fit=crop",
  };

  let idCounter = 1000;

  allBrands.forEach(brand => {
    // Determine category based on brand mapping
    let category = "men's clothing";
    for (const [cat, list] of Object.entries(BRAND_LIST)) {
      if (list.includes(brand)) {
        category = cat;
        break;
      }
    }

    const isFootwearBrand = category === "footwear";
    const targetCount = isFootwearBrand ? 30 : 50;

    const currentCount = state.products.filter(p => p.brand === brand && p.category === category).length;
    const itemsNeeded = targetCount - currentCount;
    const details = categoryDetails[category];

    // Skip if no category details defined
    if (!details) return;

    // Generate unique combinations of adjectives and nouns to prevent any title repetition
    const combinations = [];
    adjectives.forEach(adj => {
      details.nouns.forEach(noun => {
        combinations.push({ adj, noun });
      });
    });

    // Pseudo-randomly shuffle combinations list once for this brand to create diverse order
    for (let j = combinations.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [combinations[j], combinations[k]] = [combinations[k], combinations[j]];
    }

    for (let i = 0; i < itemsNeeded; i++) {
      const combo = combinations[i % combinations.length];
      const adj = combo.adj;
      const noun = combo.noun;
      const title = `${brand} ${adj} ${noun}`;
      
      let price;
      if (category === "footwear") {
        price = Math.round(2500 + Math.random() * 14500); // Shoes are usually ₹2,500 - ₹17,000
      } else {
        price = Math.round(1200 + Math.random() * 18800); // Price between ₹1,200 and ₹20,000
      }
      
      let image;
      if (category === "footwear" && brandFootwearImages[brand]) {
        const imgList = brandFootwearImages[brand];
        image = imgList[i % imgList.length];
      } else if (NOUN_IMAGE_MAP[noun]) {
        // Use the noun-specific image — guarantees correct visual match
        image = NOUN_IMAGE_MAP[noun];
      } else if (details && details.images && details.images.length > 0) {
        image = details.images[i % details.images.length];
      } else {
        image = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop";
      }
      
      const description = category === "footwear"
        ? `Step into premium comfort with the ${adj.toLowerCase()} ${noun.toLowerCase()} from ${brand}. Crafted with high-grade materials, responsive cushioning, and signature brand aesthetics.`
        : `The perfect ${adj.toLowerCase()} ${noun.toLowerCase()} from ${brand}. Crafted with exceptional attention to detail, premium materials, and a focus on long-lasting durability.`;
      
      const rate = parseFloat((category === "footwear" ? (4.2 + Math.random() * 0.8) : (4.0 + Math.random() * 1.0)).toFixed(1));
      const count = Math.round(30 + Math.random() * 470);

      const generatedProduct = enrichProduct({
        id: idCounter++,
        title,
        price,
        category,
        description,
        image,
        brand,
        rating: { rate, count }
      });

      state.products.push(generatedProduct);
    }
  });
}

// Add luxury attributes to raw product data
function enrichProduct(product) {
  // Convert pricing to INR (approx 80 INR per USD) if it looks like USD
  let price = product.price;
  if (price < 1000) {
    price = Math.round(price * 83);
  }

  const category = product.category;
  const brands = BRAND_LIST[category] || ["Aura Classic"];
  const colors = COLOR_LIST[category] || ["#1e293b", "#ffffff"];
  const sizes = SIZE_LIST[category] || ["Standard"];

  // Pseudo-random assignment based on ID (only if not already specified)
  const brand = product.brand || brands[product.id % brands.length];
  const discount = product.discount || ((product.id % 4) * 10 + 10); // 10%, 20%, 30%, 40% discount
  const originalPrice = product.originalPrice || Math.round(price / (1 - discount / 100));
  const productColors = product.colors || colors;
  const productSizes = product.sizes || sizes;
  const inStock = product.inStock !== undefined ? product.inStock : (product.id % 7 !== 0);
  const stockCount = product.stockCount || ((product.id % 15) + 2);
  const badge = product.badge || (product.id % 5 === 0 ? "New" : product.id % 6 === 0 ? "Sale" : product.id % 7 === 0 ? "Limited" : "Best Seller");
  const gallery = product.gallery || [
    product.image,
    // Fallback/alternative images from Unsplash based on category
    category.includes("electronics") 
      ? "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=300&auto=format&fit=crop"
      : "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=300&auto=format&fit=crop"
  ];

  // Build colorImages: one real image URL per color swatch.
  // Priority: product's own colorImages → COLOR_IMAGE_MAP lookup → product's own image
  const categoryColorMap = COLOR_IMAGE_MAP[category] || {};
  const colorImages = product.colorImages || productColors.map((col) => {
    return categoryColorMap[col] || product.image;
  });

  return {
    ...product,
    price,
    originalPrice,
    discount,
    brand,
    colors: productColors,
    colorImages,
    sizes: productSizes,
    inStock,
    stockCount,
    badge,
    gallery
  };
}

// --- 5. THEME MANAGEMENT ---
function setupTheme() {
  if (state.theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function toggleTheme() {
  state.theme = state.theme === "light" ? "dark" : "light";
  setupTheme();
  saveStateToLocalStorage();
  showToast(`Switched to ${state.theme} mode.`, "info");
}

function isAdminUser() {
  const email = (localStorage.getItem("userEmail") || "").trim().toLowerCase();
  return email === ALLOWED_ADMIN_EMAIL;
}

function setAdminAccessVisibility() {
  const adminLinks = document.querySelectorAll('a[href="#admin"], .mobile-nav-link[href="#admin"], [data-link="admin"]');
  adminLinks.forEach(link => link.classList.toggle("hidden", !isAdminUser()));

  const adminView = document.getElementById("admin-view");
  if (adminView) adminView.classList.toggle("hidden", !isAdminUser());
}

// --- 6. ROUTING ENGINE ---
function handleRouting() {
  const hash = window.location.hash || "#home";
  state.currentView = hash;

  // Deactivate all views
  const views = document.querySelectorAll(".view-section");
  let targetView = null;

  views.forEach(view => {
    if (`#${view.id}` === `${hash}-view`) {
      targetView = view;
    }
  });

  if (!targetView) {
    // Default to home if not found
    state.currentView = "#home";
    targetView = document.getElementById("home-view");
  }

  // Animate transition using GSAP
  const activeView = document.querySelector(".view-section.active");
  
  if (activeView && activeView !== targetView) {
    gsap.to(activeView, {
      opacity: 0,
      y: 15,
      duration: 0.2,
      onComplete: () => {
        activeView.classList.remove("active");
        targetView.classList.add("active");
        
        // Scroll to top
        window.scrollTo(0, 0);

        gsap.fromTo(targetView, 
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      }
    });
  } else {
    // Initial page load
    views.forEach(v => v.classList.remove("active"));
    targetView.classList.add("active");
    gsap.fromTo(targetView, 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }

  // Update Navigation Active Links
  document.querySelectorAll(".nav-link").forEach(link => {
    const linkHash = link.getAttribute("href");
    if (linkHash === state.currentView) {
      link.classList.add("text-brand-primary");
      link.classList.remove("text-themeText-secondary");
    } else {
      link.classList.remove("text-brand-primary");
      link.classList.add("text-themeText-secondary");
    }
  });

  // Render content based on active view
  if (state.currentView === "#home") {
    renderCategories();
  } else if (state.currentView === "#shop") {
    renderProductGrid();
  } else if (state.currentView === "#wishlist") {
    renderWishlist();
  } else if (state.currentView === "#compare") {
    renderCompare();
  } else if (state.currentView === "#checkout") {
    renderCheckout();
  } else if (state.currentView === "#admin") {
    if (!isAdminUser()) {
      window.location.hash = "#home";
      showToast("Only venkyr385@gmail.com can access Product Catalog Registry.", "info");
      return;
    }
    renderAdminDashboard();
  }
}

// --- 7. RENDER SKELETON LOADERS ---
function renderSkeletons() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  
  grid.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    grid.innerHTML += `
      <div class="shimmer-card p-4 border border-themeText-muted/10 space-y-4">
        <div class="shimmer-item h-56 w-full rounded-2xl"></div>
        <div class="shimmer-item h-4 w-1/3"></div>
        <div class="shimmer-item h-6 w-3/4"></div>
        <div class="shimmer-item h-4 w-1/2"></div>
        <div class="flex justify-between items-center pt-2">
          <div class="shimmer-item h-8 w-24"></div>
          <div class="shimmer-item h-8 w-20 rounded-xl"></div>
        </div>
      </div>
    `;
  }
}

// --- 8. RENDER HOME VIEW CATEGORIES & CAROUSELS ---
function renderCategories() {
  const grid = document.getElementById("categories-grid");
  if (!grid) return;

  grid.innerHTML = "";
  
  // Curated category cover images
  const categoryCovers = {
    "electronics": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop",
    "jewelery": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=200&auto=format&fit=crop",
    "men's clothing": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=200&auto=format&fit=crop",
    "women's clothing": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=200&auto=format&fit=crop",
    "footwear": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop",
    "accessories": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=200&auto=format&fit=crop"
  };

  MOCK_CATEGORIES.forEach((cat, idx) => {
    const card = document.createElement("a");
    card.href = "#shop";
    card.className = "glass-card overflow-hidden group relative h-44 flex items-end p-4 border border-themeText-muted/10 hover:-translate-y-1.5 transition-all duration-300";
    
    // Set active category filter on click
    card.addEventListener("click", () => {
      state.filters.category = cat;
      // Update sidebar category radio/checkbox in shop
      const catSelect = document.querySelector(`input[name="category-filter"][value="${cat}"]`);
      if (catSelect) catSelect.checked = true;
    });

    card.innerHTML = `
      <img src="${categoryCovers[cat] || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=200"}" alt="${cat}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 dark:opacity-40">
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
      <div class="relative z-10 text-white">
        <h4 class="text-sm font-semibold uppercase tracking-wider">${cat}</h4>
        <span class="text-[10px] text-brand-secondary font-bold">Discover Collection <i class="fa-solid fa-angle-right"></i></span>
      </div>
    `;
    grid.appendChild(card);
  });

  requestAnimationFrame(() => {
    destroyHomeSwipers();

    homeSwipers.hero = new Swiper('.hero-swiper', {
      loop: true,
      autoplay: { delay: 5000 },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      effect: 'fade',
      fadeEffect: { crossFade: true }
    });

    populateTrendingCarousel();
    setTimeout(() => window.dispatchEvent(new Event('resize')), 120);
  });
}

function populateTrendingCarousel() {
  const container = document.getElementById("trending-products-container");
  if (!container) return;

  container.innerHTML = "";
  // Take 6 top-rated products
  const trending = [...state.products]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 6);

  trending.forEach(product => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.appendChild(createProductCardElement(product));
    container.appendChild(slide);
  });

  homeSwipers.trending = new Swiper('.trending-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 }
    }
  });
}

// --- 9. RENDER PRODUCT CATALOG GRID (SHOP) ---
function renderProductGrid() {
  const grid = document.getElementById("product-grid");
  const countSpan = document.getElementById("product-count");
  if (!grid) return;

  // Dynamic Interactive Breadcrumbs (Feature 5)
  renderBreadcrumbs();

  // Compile filters
  let filtered = state.products.filter(product => {
    // Search filter
    const matchesSearch = product.title.toLowerCase().includes(state.filters.search.toLowerCase()) || 
                          product.description.toLowerCase().includes(state.filters.search.toLowerCase());
    
    // Category filter
    const matchesCategory = state.filters.category === "all" || product.category === state.filters.category;
    
    // Brand filter
    const matchesBrand = state.filters.brand === "all" || product.brand === state.filters.brand;
    
    // Price filter
    const matchesPrice = product.price <= state.filters.priceMax;
    
    // Rating filter
    const matchesRating = state.filters.rating === "all" || product.rating.rate >= parseFloat(state.filters.rating);
    
    // Stock filter
    const matchesStock = !state.filters.stockOnly || product.inStock;

    return matchesSearch && matchesCategory && matchesPrice && matchesBrand && matchesRating && matchesStock;
  });

  // Sorting
  if (state.sortBy === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === "rating-desc") {
    filtered.sort((a, b) => b.rating.rate - a.rating.rate);
  } else if (state.sortBy === "newest") {
    filtered.sort((a, b) => b.id - a.id); // Assuming higher ID is newer
  }

  // Update counts
  countSpan.innerHTML = `Showing <span style="color:var(--accent);font-weight:800;">${filtered.length}</span> products`;

  // Handle empty state
  const emptyState = document.getElementById("empty-state");
  if (filtered.length === 0) {
    grid.innerHTML = "";
    emptyState.classList.remove("hidden");
    emptyState.classList.add("flex");
    document.getElementById("load-more-container").classList.add("hidden");
    return;
  } else {
    emptyState.classList.add("hidden");
    emptyState.classList.remove("flex");
  }

  // Pagination Slice
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / state.itemsPerPage);
  const paginated = filtered.slice(0, state.currentPage * state.itemsPerPage);

  // Update count to show paginated vs total
  countSpan.innerHTML = `Showing <span style="color:var(--accent);font-weight:800;">${paginated.length}</span> of <span style="color:var(--accent);font-weight:800;">${totalItems}</span> products`;

  // Render grid
  grid.innerHTML = "";
  paginated.forEach(product => {
    grid.appendChild(createProductCardElement(product));
  });

  // Toggle Load More button
  const loadMoreContainer = document.getElementById("load-more-container");
  if (state.currentPage < totalPages) {
    loadMoreContainer.classList.remove("hidden");
  } else {
    loadMoreContainer.classList.add("hidden");
  }

  // Render Sidebar Category and Brand lists dynamically if not done yet
  renderSidebarFiltersList();
}

// Generate HTML elements for a product card
function createProductCardElement(product) {
  const card = document.createElement("div");
  card.className = "glass-card product-card p-4 border border-themeText-muted/10 flex flex-col justify-between relative group";
  
  // Badge Color Selection
  let badgeColor = "bg-brand-primary";
  if (product.badge === "New") badgeColor = "bg-emerald-500";
  if (product.badge === "Sale") badgeColor = "bg-red-500";
  if (product.badge === "Limited") badgeColor = "bg-amber-500";

  // Check if item is in Wishlist, Cart or Compare
  const isInWishlist = state.wishlist.includes(product.id);
  const isInCart = state.cart.find(item => item.productId === product.id);
  const isInCompare = state.compare.includes(product.id);

  card.innerHTML = `
    <div class="relative rounded-2xl p-4 h-56 flex items-center justify-center overflow-visible border card-3d-wrapper"
         style="background:linear-gradient(145deg,#ffffff,#f7f3ee); border-color:var(--border-color);">
      <!-- Badge -->
      <span class="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase text-white ${badgeColor} z-10">${product.badge}</span>

      <!-- Wishlist Heart -->
      <button class="wishlist-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-white/85 hover:bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 shadow transition-all z-10" data-id="${product.id}">
        <i class="${isInWishlist ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart'} text-sm"></i>
      </button>

      <!-- 3D tilt scene — perspective applied here -->
      <div class="card-3d-scene w-full h-full flex items-center justify-center" style="perspective:600px;">
        <div class="card-3d-object w-full h-full flex items-center justify-center relative"
             style="transform-style:preserve-3d; transition:transform 0.12s ease, box-shadow 0.12s ease; border-radius:14px;">

          <!-- Gloss reflection layer -->
          <div class="card-gloss-layer absolute inset-0 rounded-xl pointer-events-none z-20"
               style="background:linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 55%); mix-blend-mode:overlay;"></div>

          <!-- Color overlay -->
          <div class="card-color-overlay absolute inset-0 rounded-xl pointer-events-none z-10"
               style="background:transparent; mix-blend-mode:multiply; opacity:0; transition:background 0.2s ease, opacity 0.2s ease;"></div>

          <!-- Placeholder -->
          <div class="card-img-placeholder absolute inset-0 flex-col items-center justify-center gap-2 rounded-xl z-0" style="display:none; background:var(--bg-secondary);">
            <i class="fa-regular fa-image text-3xl" style="color:var(--border-color);"></i>
            <span class="text-[10px] font-semibold" style="color:var(--text-muted);">${product.category}</span>
          </div>

          <!-- Product image -->
          <img
            src="${product.image}"
            alt="${product.title}"
            class="card-main-img max-h-full max-w-full object-contain select-none pointer-events-none relative z-0"
            style="transition: opacity 0.2s ease, transform 0.2s ease; filter:drop-shadow(0 8px 16px rgba(90,70,52,0.22));"
            onerror="this.onerror=null; this.src=''; this.style.display='none'; this.closest('.card-3d-object').querySelector('.card-img-placeholder') && (this.closest('.card-3d-object').querySelector('.card-img-placeholder').style.display='flex');"
          >
        </div>
      </div>

      <!-- Compare / Quick-view overlay on hover -->
      <div class="absolute bottom-3 left-3 right-3 flex gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-30">
        <button class="compare-btn flex-1 py-2 bg-slate-900/90 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 backdrop-blur-sm" data-id="${product.id}">
          <i class="${isInCompare ? 'fa-solid fa-circle-check text-brand-secondary' : 'fa-solid fa-scale-balanced'}"></i> Compare
        </button>
        <button class="quick-view-btn w-9 h-9 bg-white/90 hover:bg-white text-slate-800 rounded-xl flex items-center justify-center shadow backdrop-blur-sm" data-id="${product.id}">
          <i class="fa-solid fa-eye text-xs"></i>
        </button>
      </div>
    </div>

    <!-- Product Details -->
    <div class="mt-4 space-y-2.5 flex-1 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-bold text-brand-primary uppercase tracking-widest">${product.category}</span>
          <span class="text-xs text-themeText-secondary font-semibold">${product.brand}</span>
        </div>
        <h3 class="text-sm font-bold text-themeText-primary line-clamp-2 mt-1 hover:text-brand-primary cursor-pointer" onclick="openQuickView(${product.id})">${product.title}</h3>

        <!-- Star Ratings -->
        <div class="flex items-center gap-1.5 mt-1">
          <div class="flex text-yellow-400 text-[10px]">${getStarRatingHTML(product.rating.rate)}</div>
          <span class="text-[10px] text-themeText-muted font-bold">(${product.rating.count})</span>
        </div>

        <!-- Color Variant Swatches — hidden for jewelery -->
        ${product.category === 'jewelery' ? '' : `
        <div class="mt-2">
          <div class="flex items-end gap-3 flex-wrap">
            ${product.colors.map((color, index) => `
              <div class="flex flex-col items-center gap-1">
                <button
                  class="card-color-dot w-5 h-5 rounded-full border-2 border-white/40 hover:scale-125 focus:outline-none transition-all duration-150 ${index === 0 ? 'ring-2 ring-offset-1 ring-brand-primary scale-110' : ''}"
                  style="background-color:${color}; box-shadow:0 1px 4px rgba(0,0,0,0.3);"
                  data-index="${index}"
                  data-color="${color}"
                  data-img="${product.colorImages[index]}"
                  data-name="${COLOR_NAME_MAP[color] || color}">
                </button>
                <span class="color-swatch-name text-[9px] font-semibold leading-none transition-colors duration-150 ${index === 0 ? 'text-brand-primary' : 'text-themeText-muted'}"
                  style="max-width:36px; text-align:center; word-break:break-word; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                  ${COLOR_NAME_MAP[color] || color}
                </span>
              </div>
            `).join('')}
          </div>
        </div>
        `}
      </div>

      <!-- Price & Add to Cart -->
      <div class="pt-3 mt-1">
        <!-- Price row -->
        <div class="flex items-baseline justify-between mb-3">
          <div class="flex items-baseline gap-1.5">
            <span class="text-base font-black text-themeText-primary">${formatPrice(product.price)}</span>
            <span class="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full" style="color:#C8A96A; background:rgba(200,169,106,0.12);">-${product.discount}%</span>
          </div>
          <span class="text-xs text-themeText-muted line-through">${formatPrice(product.originalPrice)}</span>
        </div>

        <!-- Beautiful Buy Button -->
        <button class="add-to-cart-btn buy-btn w-full relative overflow-hidden flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 group/btn"
          data-id="${product.id}"
          style="${isInCart
            ? 'background:linear-gradient(135deg,#6B8C5A,#5a7a4a); color:#fff; box-shadow:0 4px 15px rgba(107,140,90,0.35);'
            : 'background:linear-gradient(135deg,#5A4634,#C8A96A); color:#fff; box-shadow:0 4px 15px rgba(90,70,52,0.30);'}">

          <!-- Shimmer sweep on hover -->
          <span class="buy-btn-shimmer absolute inset-0 pointer-events-none"></span>

          <!-- Left: icon + label -->
          <span class="flex items-center gap-2 relative z-10">
            <span class="buy-btn-icon w-6 h-6 rounded-full flex items-center justify-center text-[11px] transition-transform duration-300 group-hover/btn:scale-110"
              style="background:rgba(255,255,255,0.20);">
              <i class="fa-solid ${isInCart ? 'fa-circle-check' : 'fa-bag-shopping'}"></i>
            </span>
            <span class="tracking-wide">${isInCart ? 'Added to Bag' : 'Add to Bag'}</span>
          </span>

          <!-- Right: price pill -->
          <span class="relative z-10 flex items-center gap-1 px-2 py-0.5 rounded-xl text-[10px] font-black"
            style="background:rgba(255,255,255,0.18); letter-spacing:0.02em;">
            ${formatPrice(product.price)}
            <i class="fa-solid fa-arrow-right text-[9px] transition-transform duration-300 group-hover/btn:translate-x-0.5"></i>
          </span>
        </button>
      </div>
    </div>
  `;

  // Attach event listeners to card elements
  card.querySelector(".wishlist-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  });

  card.querySelector(".compare-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleCompare(product.id);
  });

  card.querySelector(".quick-view-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    openQuickView(product.id);
  });

  card.querySelector(".add-to-cart-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    addToCart(product.id);
  });

  // Color swatch click — overlay the EXACT swatch color on the image using mix-blend-mode:multiply
  card.querySelectorAll(".card-color-dot").forEach(dot => {
    dot.addEventListener("click", (e) => {
      e.stopPropagation();

      const hex     = dot.getAttribute("data-color");
      const index   = parseInt(dot.getAttribute("data-index"));
      const img     = card.querySelector(".card-main-img");
      const overlay = card.querySelector(".card-color-overlay");

      // Move active ring to clicked swatch
      card.querySelectorAll(".card-color-dot").forEach(b =>
        b.classList.remove("ring-2", "ring-offset-1", "ring-brand-primary", "scale-110")
      );
      dot.classList.add("ring-2", "ring-offset-1", "ring-brand-primary", "scale-110");

      // Highlight active name label, mute the rest
      card.querySelectorAll(".color-swatch-name").forEach(lbl => {
        lbl.classList.remove("text-brand-primary");
        lbl.classList.add("text-themeText-muted");
      });
      const activeName = dot.closest("div").querySelector(".color-swatch-name");
      if (activeName) {
        activeName.classList.remove("text-themeText-muted");
        activeName.classList.add("text-brand-primary");
      }

      if (!img) return;

      if (index === 0) {
        // First color = original — remove all tinting
        img.style.filter  = "none";
        img.style.display = "block";
        // clear the overlay too if it exists
        if (overlay) { overlay.style.opacity = "0"; overlay.style.background = "transparent"; }
        const ph = card.querySelector(".card-img-placeholder");
        if (ph) ph.style.display = "none";
      } else {
        // Apply color ONLY to the image using CSS filter — background stays untouched
        img.style.display = "block";
        img.style.filter  = buildColorFilter(hex) + " drop-shadow(0 8px 16px rgba(90,70,52,0.22))";
        // Keep overlay hidden — we use filter not overlay
        if (overlay) { overlay.style.opacity = "0"; overlay.style.background = "transparent"; }
      }
    });
  });

  // ── 3D Luxury Tilt Effect on image hover ──────────────────
  const scene   = card.querySelector(".card-3d-scene");
  const obj     = card.querySelector(".card-3d-object");
  const gloss   = card.querySelector(".card-gloss-layer");
  const wrapper = card.querySelector(".card-3d-wrapper");

  if (scene && obj) {
    scene.addEventListener("mousemove", (e) => {
      const rect   = scene.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);  // -1 to 1
      const dy     = (e.clientY - cy) / (rect.height / 2);  // -1 to 1
      const rotY   =  dx * 18;   // max ±18° horizontal
      const rotX   = -dy * 14;   // max ±14° vertical

      obj.style.transform   = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04,1.04,1.04)`;
      obj.style.boxShadow   = `${-dx*12}px ${dy*12+8}px 30px rgba(90,70,52,0.28), 0 2px 8px rgba(90,70,52,0.12)`;

      // Move gloss highlight opposite to tilt for realism
      if (gloss) {
        const gx = 50 + dx * 30;
        const gy = 50 + dy * 30;
        gloss.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 65%)`;
      }
    });

    scene.addEventListener("mouseleave", () => {
      obj.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
      obj.style.boxShadow = "0 4px 18px rgba(90,70,52,0.12)";
      if (gloss) gloss.style.background = "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 55%)";
    });

    // Lift card wrapper on hover too
    scene.addEventListener("mouseenter", () => {
      if (wrapper) wrapper.style.boxShadow = "0 20px 50px -10px rgba(90,70,52,0.28), 0 0 0 1px rgba(200,169,106,0.20)";
    });
    scene.addEventListener("mouseleave", () => {
      if (wrapper) wrapper.style.boxShadow = "";
    });
  }

  return card;
}

// Generate stars HTML
function getStarRatingHTML(rate) {
  let html = "";
  const fullStars = Math.floor(rate);
  const halfStar = rate % 1 >= 0.5;
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      html += `<i class="fa-solid fa-star"></i>`;
    } else if (i === fullStars + 1 && halfStar) {
      html += `<i class="fa-solid fa-star-half-stroke"></i>`;
    } else {
      html += `<i class="fa-regular fa-star"></i>`;
    }
  }
  return html;
}

// Populate Sidebar Categories and Brands based on loaded products
let categoriesRendered = false;
let filtersRendered    = false;
function renderSidebarFiltersList() {
  // Render Categories
  const catList = document.getElementById("sidebar-categories-list");
  if (catList && !categoriesRendered) {
    catList.innerHTML = `
      <label class="flex items-center gap-2.5 hover:text-themeText-primary cursor-pointer">
        <input type="radio" name="category-filter" value="all" checked class="w-4 h-4 text-brand-primary focus:ring-brand-primary border-themeText-muted/20 rounded-full">
        <span>All Categories</span>
      </label>
    `;
    MOCK_CATEGORIES.forEach(cat => {
      catList.innerHTML += `
        <label class="flex items-center gap-2.5 hover:text-themeText-primary cursor-pointer capitalize">
          <input type="radio" name="category-filter" value="${cat}" ${state.filters.category === cat ? 'checked' : ''} class="w-4 h-4 text-brand-primary focus:ring-brand-primary border-themeText-muted/20 rounded-full">
          <span>${cat}</span>
        </label>
      `;
    });

    // Add event listeners
    catList.querySelectorAll('input[name="category-filter"]').forEach(radio => {
      radio.addEventListener("change", (e) => {
        state.filters.category = e.target.value;
        state.filters.brand = "all"; // Reset brand on category change
        state.currentPage = 1;
        renderSidebarBrands(); // Re-render brands for this category
        renderProductGrid();
      });
    });
    categoriesRendered = true;
  }

  renderSidebarBrands();
}

function renderSidebarBrands() {
  const brandList = document.getElementById("sidebar-brands-list");
  if (!brandList) return;

  // Get products in current category to extract active brands
  const productsForCategory = state.filters.category === "all"
    ? state.products
    : state.products.filter(p => p.category === state.filters.category);

  const uniqueBrands = [...new Set(productsForCategory.map(p => p.brand))];

  brandList.innerHTML = `
    <label class="flex items-center gap-2.5 hover:text-themeText-primary cursor-pointer">
      <input type="radio" name="brand-filter" value="all" ${state.filters.brand === "all" ? 'checked' : ''} class="w-4 h-4 text-brand-primary focus:ring-brand-primary border-themeText-muted/20 rounded-full">
      <span>All Brands</span>
    </label>
  `;
  
  uniqueBrands.forEach(brand => {
    brandList.innerHTML += `
      <label class="flex items-center gap-2.5 hover:text-themeText-primary cursor-pointer">
        <input type="radio" name="brand-filter" value="${brand}" ${state.filters.brand === brand ? 'checked' : ''} class="w-4 h-4 text-brand-primary focus:ring-brand-primary border-themeText-muted/20 rounded-full">
        <span>${brand}</span>
      </label>
    `;
  });

  // Add event listeners
  brandList.querySelectorAll('input[name="brand-filter"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
      state.filters.brand = e.target.value;
      state.currentPage = 1;
      renderProductGrid();
    });
  });
}

// --- 10. WISHLIST MANAGEMENT ---
function toggleWishlist(id) {
  const index = state.wishlist.indexOf(id);
  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast("Product removed from wishlist.", "info");
  } else {
    state.wishlist.push(id);
    showToast("Product added to wishlist!", "success");
  }
  saveStateToLocalStorage();
  updateBadges();
  
  // Re-render corresponding views
  if (state.currentView === "#shop") renderProductGrid();
  if (state.currentView === "#wishlist") renderWishlist();
  
  // Re-render modal if open
  const modal = document.getElementById("quick-view-modal");
  if (modal.classList.contains("opacity-100")) {
    updateModalWishlistButton(id);
  }
}

function renderWishlist() {
  const grid = document.getElementById("wishlist-grid");
  const emptyState = document.getElementById("wishlist-empty-state");
  if (!grid) return;

  grid.innerHTML = "";
  const favorited = state.products.filter(p => state.wishlist.includes(p.id));

  if (favorited.length === 0) {
    emptyState.classList.remove("hidden");
    emptyState.classList.add("flex");
    return;
  } else {
    emptyState.classList.add("hidden");
    emptyState.classList.remove("flex");
  }

  favorited.forEach(product => {
    grid.appendChild(createProductCardElement(product));
  });
}

// --- 11. PRODUCT COMPARISON ---
function toggleCompare(id) {
  const index = state.compare.indexOf(id);
  if (index > -1) {
    state.compare.splice(index, 1);
    showToast("Product removed from comparison list.", "info");
  } else {
    if (state.compare.length >= 3) {
      showToast("You can compare up to 3 products only.", "error");
      return;
    }
    state.compare.push(id);
    showToast("Product added to comparison list!", "success");
  }
  saveStateToLocalStorage();
  if (state.currentView === "#shop") renderProductGrid();
  if (state.currentView === "#compare") renderCompare();
}

function renderCompare() {
  const tbody = document.getElementById("compare-table-body");
  const headers = document.getElementById("compare-table-headers");
  const emptyState = document.getElementById("compare-empty-state");
  if (!tbody) return;

  tbody.innerHTML = "";
  
  // Clear headers after the first column
  headers.innerHTML = `<th class="p-6 font-bold uppercase tracking-wider w-1/4">Features</th>`;

  const items = state.products.filter(p => state.compare.includes(p.id));

  if (items.length === 0) {
    emptyState.classList.remove("hidden");
    emptyState.classList.add("flex");
    document.querySelector("#compare-view .glass-card").classList.add("hidden");
    return;
  } else {
    emptyState.classList.add("hidden");
    emptyState.classList.remove("flex");
    document.querySelector("#compare-view .glass-card").classList.remove("hidden");
  }

  // Generate Table Headers
  items.forEach(item => {
    headers.innerHTML += `
      <th class="p-6 font-bold w-1/4">
        <div class="flex flex-col items-center text-center gap-2">
          <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-contain bg-white p-2 rounded-xl border border-slate-100">
          <span class="line-clamp-2 text-xs font-bold mt-2">${item.title}</span>
          <button onclick="toggleCompare(${item.id})" class="text-xs font-semibold text-red-500 hover:underline mt-1"><i class="fa-solid fa-trash-can"></i> Remove</button>
        </div>
      </th>
    `;
  });

  // Features to compare
  const features = [
    { label: "Price", key: "price", format: val => formatPrice(val) },
    { label: "Brand", key: "brand" },
    { label: "Category", key: "category" },
    { label: "Rating", key: "rating", format: val => `${val.rate} / 5 (${val.count} reviews)` },
    { label: "Stock Availability", key: "inStock", format: val => val ? "In Stock" : "Out of Stock" },
    { label: "Colors", key: "colors", format: (val) => `<div class="flex gap-1 justify-center">${val.map(c => `<span class="w-3.5 h-3.5 rounded-full border border-slate-300" style="background-color: ${c}"></span>`).join('')}</div>` },
    { label: "Sizes Available", key: "sizes", format: val => val.join(', ') },
    { label: "Description", key: "description", format: val => `<span class="line-clamp-3 text-xs leading-relaxed text-left block">${val}</span>` }
  ];

  features.forEach(feature => {
    let row = `<tr><td class="p-4 font-bold text-themeText-primary border-r border-themeText-muted/10">${feature.label}</td>`;
    items.forEach(item => {
      let val = item[feature.key];
      if (feature.format) val = feature.format(val);
      row += `<td class="p-4 text-center border-r border-themeText-muted/10">${val}</td>`;
    });
    row += `</tr>`;
    tbody.innerHTML += row;
  });
}

// --- 12. SHOPPING CART & TOTALS ---
function addToCart(id, qty = 1, selectedColor = null, selectedSize = null) {
  const product = state.products.find(p => p.id === id);
  if (!product.inStock) {
    showToast("This item is currently out of stock.", "error");
    return;
  }

  const color = selectedColor || product.colors[0];
  const size = selectedSize || product.sizes[0];

  // Find if item with same ID AND same color AND same size is already in cart
  const existing = state.cart.find(item => 
    item.productId === id && 
    item.selectedColor === color && 
    item.selectedSize === size
  );

  if (existing) {
    existing.quantity += qty;
  } else {
    state.cart.push({
      productId: id,
      quantity: qty,
      selectedColor: color,
      selectedSize: size
    });
  }

  saveStateToLocalStorage();
  updateBadges();
  renderCart();
  showToast(`Added ${product.title.substring(0, 20)}... (${size}) to cart!`, "success");

  // Bounce micro-animation for floating cart icon
  const floatBtn = document.getElementById("floating-cart-btn");
  if (floatBtn) {
    gsap.fromTo(floatBtn, { scale: 1.3 }, { scale: 1, duration: 0.5, ease: "bounce.out" });
  }

  // Re-render product grid to show "Added" checkmark
  if (state.currentView === "#shop") renderProductGrid();
}

function updateCartQuantity(id, delta) {
  const item = state.cart.find(item => item.productId === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(i => i.productId !== id);
    showToast("Product removed from cart.", "info");
  }

  saveStateToLocalStorage();
  updateBadges();
  renderCart();
  if (state.currentView === "#shop") renderProductGrid();
  if (state.currentView === "#checkout") renderCheckout();
}

function removeFromCart(id) {
  state.cart = state.cart.filter(item => item.productId !== id);
  saveStateToLocalStorage();
  updateBadges();
  renderCart();
  showToast("Product removed from cart.", "info");
  if (state.currentView === "#shop") renderProductGrid();
  if (state.currentView === "#checkout") renderCheckout();
}

function renderCart() {
  const itemsContainer = document.getElementById("cart-drawer-items");
  const countTitle = document.getElementById("cart-count-title");
  if (!itemsContainer) return;

  itemsContainer.innerHTML = "";
  
  if (state.cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="flex flex-col items-center justify-center py-16 text-center text-themeText-muted">
        <i class="fa-solid fa-cart-shopping text-4xl mb-3 opacity-40"></i>
        <p class="text-sm font-semibold">Your cart is empty</p>
        <a href="#shop" onclick="window.location.hash='#shop'" class="text-xs text-brand-primary hover:underline mt-1 font-bold">Start Shopping</a>
      </div>
    `;
    countTitle.textContent = "0";
    updateTotals(0);
    return;
  }

  let subtotal = 0;
  countTitle.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  state.cart.forEach(item => {
    const product = state.products.find(p => p.id === item.productId);
    if (!product) return;

    subtotal += product.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "flex items-center gap-4 bg-themeBg-primary/50 border border-themeText-muted/10 p-3 rounded-2xl";
    cartItem.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="w-16 h-16 object-contain bg-white p-2 rounded-xl border border-slate-100 flex-shrink-0">
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-bold text-themeText-primary truncate">${product.title}</h4>
        <div class="flex items-center gap-2 mt-1 text-[10px] text-themeText-muted font-bold">
          <span>Qty: ${item.quantity}</span>
          <span>&bull;</span>
          <span class="flex items-center gap-1">Color: <span class="w-2.5 h-2.5 rounded-full border border-slate-300 inline-block" style="background-color: ${item.selectedColor}"></span></span>
        </div>
        <div class="flex items-center justify-between mt-2">
          <span class="text-sm font-black text-brand-primary">${formatPrice(product.price * item.quantity)}</span>
          
          <!-- Quantity Controls -->
          <div class="flex items-center border border-themeText-muted/10 rounded-lg overflow-hidden bg-themeBg-secondary">
            <button class="qty-minus px-2 py-1 hover:bg-themeText-muted/10 text-themeText-primary"><i class="fa-solid fa-minus text-[10px]"></i></button>
            <span class="px-2 py-1 text-xs font-semibold text-themeText-primary min-w-[20px] text-center">${item.quantity}</span>
            <button class="qty-plus px-2 py-1 hover:bg-themeText-muted/10 text-themeText-primary"><i class="fa-solid fa-plus text-[10px]"></i></button>
          </div>
        </div>
      </div>
      <button class="remove-item p-1.5 text-themeText-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0">
        <i class="fa-solid fa-trash-can text-sm"></i>
      </button>
    `;

    // Event listeners
    cartItem.querySelector(".qty-minus").addEventListener("click", () => updateCartQuantity(product.id, -1));
    cartItem.querySelector(".qty-plus").addEventListener("click", () => updateCartQuantity(product.id, 1));
    cartItem.querySelector(".remove-item").addEventListener("click", () => removeFromCart(product.id));

    itemsContainer.appendChild(cartItem);
  });

  updateTotals(subtotal);
}

function updateTotals(subtotal) {
  const subtotalSpan = document.getElementById("cart-subtotal");
  const discountSpan = document.getElementById("cart-discount");
  const taxSpan = document.getElementById("cart-tax");
  const shippingSpan = document.getElementById("cart-shipping");
  const totalSpan = document.getElementById("cart-total");
  const discountRow = document.getElementById("cart-discount-row");

  const tax = subtotal * 0.18; // 18% GST
  let discountAmount = 0;
  if (state.couponDiscount > 0) {
    discountAmount = subtotal * (state.couponDiscount / 100);
    discountRow.classList.remove("hidden");
    discountSpan.textContent = `-${formatPrice(discountAmount)}`;
  } else {
    discountRow.classList.add("hidden");
  }

  // Free shipping above 10,000 INR, else 150 INR
  let shipping = subtotal > 10000 || subtotal === 0 ? 0 : 150;
  if (state.couponCode === "FREESHIP") shipping = 0;

  const grandTotal = subtotal - discountAmount + tax + shipping;

  subtotalSpan.textContent = formatPrice(subtotal);
  taxSpan.textContent = formatPrice(tax);
  shippingSpan.textContent = shipping === 0 ? "FREE" : formatPrice(shipping);
  totalSpan.textContent = formatPrice(grandTotal);
}

// Apply Promo Coupon
function applyCoupon() {
  const code = document.getElementById("coupon-input").value.trim().toUpperCase();
  const status = document.getElementById("coupon-status");
  
  if (!code) return;

  status.classList.remove("hidden");
  if (code === "SAVE10") {
    state.couponCode = "SAVE10";
    state.couponDiscount = 10;
    status.className = "text-xs coupon-success font-semibold mt-1";
    status.textContent = "Coupon 'SAVE10' applied! 10% discount off subtotal.";
    showToast("10% Discount applied!", "success");
  } else if (code === "WELCOME20") {
    state.couponCode = "WELCOME20";
    state.couponDiscount = 20;
    status.className = "text-xs coupon-success font-semibold mt-1";
    status.textContent = "Coupon 'WELCOME20' applied! 20% discount off subtotal.";
    showToast("20% Discount applied!", "success");
  } else if (code === "FREESHIP") {
    state.couponCode = "FREESHIP";
    state.couponDiscount = 0;
    status.className = "text-xs coupon-success font-semibold mt-1";
    status.textContent = "Coupon 'FREESHIP' applied! Free shipping on this order.";
    showToast("Free shipping applied!", "success");
  } else {
    state.couponCode = "";
    state.couponDiscount = 0;
    status.className = "text-xs text-red-500 font-semibold mt-1";
    status.textContent = "Invalid coupon code. Try SAVE10, WELCOME20, or FREESHIP.";
    showToast("Invalid coupon code.", "error");
  }
  
  renderCart();
}

function updateBadges() {
  const cartBadge = document.getElementById("cart-badge");
  const floatingCartBadge = document.getElementById("floating-cart-badge");
  const wishlistBadge = document.getElementById("wishlist-badge");

  const cartTotalQty = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistTotalQty = state.wishlist.length;

  if (cartTotalQty > 0) {
    cartBadge.textContent = cartTotalQty;
    cartBadge.classList.remove("scale-0");
    cartBadge.classList.add("scale-100");
    if (floatingCartBadge) {
      floatingCartBadge.textContent = cartTotalQty;
      floatingCartBadge.classList.remove("scale-0");
      floatingCartBadge.classList.add("scale-100");
    }
  } else {
    cartBadge.classList.add("scale-0");
    cartBadge.classList.remove("scale-100");
    if (floatingCartBadge) {
      floatingCartBadge.classList.add("scale-0");
      floatingCartBadge.classList.remove("scale-100");
    }
  }

  if (wishlistTotalQty > 0) {
    wishlistBadge.textContent = wishlistTotalQty;
    wishlistBadge.classList.remove("scale-0");
    wishlistBadge.classList.add("scale-100");
  } else {
    wishlistBadge.classList.add("scale-0");
    wishlistBadge.classList.remove("scale-100");
  }
}

// --- 13. CHECKOUT RENDER & FLOW ---
function renderCheckout() {
  const container = document.getElementById("checkout-summary-items");
  if (!container) return;

  container.innerHTML = "";
  let subtotal = 0;

  state.cart.forEach(item => {
    const product = state.products.find(p => p.id === item.productId);
    if (!product) return;

    subtotal += product.price * item.quantity;
    container.innerHTML += `
      <div class="flex justify-between items-center py-3 text-xs">
        <div class="flex items-center gap-3">
          <img src="${product.image}" alt="${product.title}" class="w-10 h-10 object-contain bg-white border rounded p-1 flex-shrink-0">
          <div>
            <h4 class="font-bold text-themeText-primary truncate max-w-[150px]">${product.title}</h4>
            <span class="text-themeText-muted">Qty: ${item.quantity}</span>
          </div>
        </div>
        <span class="font-bold text-themeText-primary">${formatPrice(product.price * item.quantity)}</span>
      </div>
    `;
  });

  // Calculate taxes and shipping
  const tax = subtotal * 0.18;
  let discountAmount = 0;
  if (state.couponDiscount > 0) {
    discountAmount = subtotal * (state.couponDiscount / 100);
    document.getElementById("checkout-discount-row").classList.remove("hidden");
    document.getElementById("checkout-discount").textContent = `-${formatPrice(discountAmount)}`;
  } else {
    document.getElementById("checkout-discount-row").classList.add("hidden");
  }

  let shipping = subtotal > 10000 || subtotal === 0 ? 0 : 150;
  if (state.couponCode === "FREESHIP") shipping = 0;

  const grandTotal = subtotal - discountAmount + tax + shipping;

  document.getElementById("checkout-subtotal").textContent = formatPrice(subtotal);
  document.getElementById("checkout-tax").textContent = formatPrice(tax);
  document.getElementById("checkout-shipping").textContent = shipping === 0 ? "FREE" : formatPrice(shipping);
  document.getElementById("checkout-total").textContent = formatPrice(grandTotal);
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  
  if (state.cart.length === 0) {
    showToast("Your cart is empty. Add products before checking out.", "error");
    return;
  }

  // Calculate order total
  let subtotal = state.cart.reduce((sum, item) => {
    const product = state.products.find(p => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  const tax = subtotal * 0.18;
  const discountAmount = subtotal * (state.couponDiscount / 100);
  let shipping = subtotal > 10000 ? 0 : 150;
  if (state.couponCode === "FREESHIP") shipping = 0;
  const grandTotal = subtotal - discountAmount + tax + shipping;

  // Set Success View Details
  const orderId = `#AURA-${Math.floor(100000 + Math.random() * 900000)}`;
  const date = new Date();
  date.setDate(date.getDate() + 4); // 4 days delivery estimate
  
  document.getElementById("success-order-id").textContent = orderId;
  document.getElementById("success-delivery-date").textContent = date.toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' });
  document.getElementById("success-order-total").textContent = formatPrice(grandTotal);

  // Clear Cart
  state.cart = [];
  state.couponCode = "";
  state.couponDiscount = 0;
  saveStateToLocalStorage();
  updateBadges();
  renderCart();

  // Redirect to success
  window.location.hash = "#success";
  showToast("Payment authorized. Order confirmed!", "success");
}

// --- 14. QUICK VIEW MODAL & MAGNIFIER ---
let currentModalQty = 1;
function openQuickView(id) {
  const product = state.products.find(p => p.id === id);
  if (!product) return;

  currentModalQty = 1;
  document.getElementById("modal-qty-value").textContent = currentModalQty;

  const modal = document.getElementById("quick-view-modal");
  const mainImage = document.getElementById("quick-view-main-image");
  const title = document.getElementById("quick-view-title");
  const category = document.getElementById("quick-view-category");
  const description = document.getElementById("quick-view-description");
  const price = document.getElementById("quick-view-price");
  const originalPrice = document.getElementById("quick-view-original-price");
  const discount = document.getElementById("quick-view-discount");
  const stock = document.getElementById("quick-view-stock-indicator");
  const ratingVal = document.getElementById("quick-view-rating-value");
  const ratingStars = document.getElementById("quick-view-rating-stars");
  const thumbRow = document.getElementById("quick-view-thumbnails-row");

  // Populate data
  mainImage.src = product.image;
  mainImage.style.filter = "none";
  mainImage.style.display = "block";
  // If image fails, show a clean placeholder — never show broken icon
  mainImage.onerror = function() {
    this.onerror = null;
    this.style.display = "none";
    const container = document.getElementById("quick-view-img-container");
    if (container && !container.querySelector(".qv-img-placeholder")) {
      const ph = document.createElement("div");
      ph.className = "qv-img-placeholder absolute inset-0 flex flex-col items-center justify-center gap-3";
      ph.style.cssText = "background:var(--bg-secondary);";
      ph.innerHTML = `<i class="fa-regular fa-image text-5xl" style="color:var(--border-color);"></i><span class="text-xs font-semibold" style="color:var(--text-muted);">${product.category}</span>`;
      container.appendChild(ph);
    }
  };
  title.textContent = product.title;
  category.textContent = product.category;
  description.textContent = product.description;
  price.textContent = formatPrice(product.price);
  originalPrice.textContent = formatPrice(product.originalPrice);
  discount.textContent = `${product.discount}% OFF`;
  ratingVal.textContent = product.rating.rate;
  ratingStars.innerHTML = getStarRatingHTML(product.rating.rate);

  // Hide QR Panel on load
  const qrPanel = document.getElementById("quick-view-qr-panel");
  if (qrPanel) qrPanel.classList.add("hidden");

  // Setup QR Code Share Event (Feature 7)
  const shareQrBtn = document.getElementById("modal-share-qr-btn");
  if (shareQrBtn) {
    const newShareQrBtn = shareQrBtn.cloneNode(true);
    shareQrBtn.replaceWith(newShareQrBtn);
    newShareQrBtn.addEventListener("click", () => {
      const qrImg = document.getElementById("quick-view-qr-image");
      const copyBtn = document.getElementById("quick-view-copy-link");
      
      if (qrPanel.classList.contains("hidden")) {
        const shareUrl = `${window.location.origin}${window.location.pathname}#shop?product=${product.id}`;
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareUrl)}`;
        
        qrPanel.classList.remove("hidden");
        gsap.fromTo(qrPanel, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
        
        const newCopyBtn = copyBtn.cloneNode(true);
        copyBtn.replaceWith(newCopyBtn);
        newCopyBtn.addEventListener("click", () => {
          navigator.clipboard.writeText(shareUrl)
            .then(() => showToast("Product link copied to clipboard!", "success"))
            .catch(() => showToast("Failed to copy link.", "error"));
        });
      } else {
        gsap.to(qrPanel, {
          opacity: 0,
          y: 5,
          duration: 0.2,
          onComplete: () => qrPanel.classList.add("hidden")
        });
      }
    });
  }

  // Setup 3D Mouse Parallax (Feature 6)
  const imgContainer = document.getElementById("quick-view-img-container");
  if (imgContainer) {
    gsap.set(mainImage, { transformPerspective: 1000, rotationX: 0, rotationY: 0, scale: 1 });
    imgContainer.addEventListener("mousemove", (e) => {
      const rect = imgContainer.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = -(y / (rect.height / 2)) * 12;
      const rotY = (x / (rect.width / 2)) * 12;
      gsap.to(mainImage, { rotationX: rotX, rotationY: rotY, scale: 1.05, duration: 0.2, ease: "power1.out" });
    });
    imgContainer.addEventListener("mouseleave", () => {
      gsap.to(mainImage, { rotationX: 0, rotationY: 0, scale: 1, duration: 0.5, ease: "power2.out" });
    });
  }

  // Stock indicator
  if (product.inStock) {
    stock.className = "text-xs font-semibold px-2 py-0.5 rounded-full stock-in";
    stock.textContent = "In Stock";
    document.getElementById("modal-add-to-cart-btn").disabled = false;
    document.getElementById("modal-add-to-cart-btn").style.opacity = "1";
  } else {
    stock.className = "text-xs font-semibold px-2 py-0.5 rounded-full stock-out";
    stock.textContent = "Out of Stock";
    document.getElementById("modal-add-to-cart-btn").disabled = true;
    document.getElementById("modal-add-to-cart-btn").style.opacity = "0.5";
  }

  // Thumbnails
  thumbRow.innerHTML = "";
  product.gallery.forEach((imgUrl, index) => {
    const thumb = document.createElement("button");
    thumb.className = `w-14 h-14 border rounded-xl p-1 bg-white hover:border-brand-primary transition-all flex items-center justify-center ${index === 0 ? 'border-brand-primary' : 'border-slate-200'}`;
    thumb.innerHTML = `<img src="${imgUrl}" class="max-h-full max-w-full object-contain">`;
    thumb.addEventListener("click", () => {
      mainImage.src = imgUrl;
      thumbRow.querySelectorAll("button").forEach(btn => btn.classList.remove("border-brand-primary"));
      thumb.classList.add("border-brand-primary");
    });
    thumbRow.appendChild(thumb);
  });

  // Track selected variants inside the modal
  let selectedColor = product.colors[0];
  let selectedSize = product.sizes[0];

  // Render Colors — hidden for jewelery
  const colorsContainer = document.getElementById("quick-view-colors");
  if (colorsContainer) {
    // Hide the entire colors row for jewelry products
    const colorsRow = colorsContainer.closest(".quick-view-colors-row") || colorsContainer.parentElement;
    if (product.category === "jewelery") {
      colorsContainer.innerHTML = "";
      if (colorsRow) colorsRow.style.display = "none";
    } else {
      if (colorsRow) colorsRow.style.display = "";
      colorsContainer.innerHTML = "";
      product.colors.forEach((color, index) => {
      const dot = document.createElement("span");
      dot.className = `color-dot w-6 h-6 rounded-full cursor-pointer border-2 border-slate-300 relative transition-all duration-150 ${index === 0 ? 'active' : ''}`;
      dot.style.backgroundColor = color;
      dot.setAttribute("data-color", color);
      dot.title = COLOR_NAME_MAP[color] || color;

      dot.addEventListener("click", () => {
        colorsContainer.querySelectorAll(".color-dot").forEach(d => d.classList.remove("active"));
        dot.classList.add("active");
        selectedColor = color;

        // Apply exact swatch color as a multiply overlay — no CSS filter, no image swap
        const imgContainer = document.getElementById("quick-view-img-container");
        let qvOverlay = imgContainer ? imgContainer.querySelector(".qv-color-overlay") : null;

        // Create overlay once if it doesn't exist
        if (imgContainer && !qvOverlay) {
          qvOverlay = document.createElement("div");
          qvOverlay.className = "qv-color-overlay absolute inset-0 rounded-3xl pointer-events-none";
          qvOverlay.style.cssText = "mix-blend-mode:multiply; opacity:0; transition:background 0.2s ease, opacity 0.2s ease; z-index:10;";
          imgContainer.appendChild(qvOverlay);
        }

        if (qvOverlay) {
          if (index === 0) {
            qvOverlay.style.opacity    = "0";
            qvOverlay.style.background = "transparent";
            if (mainImage) mainImage.style.filter = "none";
          } else {
            qvOverlay.style.background = color;
            qvOverlay.style.opacity    = "0.55";
            if (mainImage) mainImage.style.filter = "none";
          }
        }
      });
      colorsContainer.appendChild(dot);
    });
    } // end else (non-jewelery)
  }

  // Render Sizes
  const sizesContainer = document.getElementById("quick-view-sizes");
  if (sizesContainer) {
    sizesContainer.innerHTML = "";
    product.sizes.forEach((size, index) => {
      const btn = document.createElement("button");
      btn.className = `px-3.5 py-2 border rounded-xl text-xs font-bold transition-all ${
        index === 0 
          ? 'border-brand-primary bg-brand-primary/5 text-brand-primary' 
          : 'border-themeText-muted/20 text-themeText-primary hover:border-brand-primary'
      }`;
      btn.textContent = size;
      
      btn.addEventListener("click", () => {
        sizesContainer.querySelectorAll("button").forEach(b => {
          b.className = "px-3.5 py-2 border border-themeText-muted/20 rounded-xl text-xs font-bold transition-all text-themeText-primary hover:border-brand-primary";
        });
        btn.className = "px-3.5 py-2 border border-brand-primary bg-brand-primary/5 rounded-xl text-xs font-bold transition-all text-brand-primary";
        selectedSize = size;
      });
      sizesContainer.appendChild(btn);
    });
  }

  // Setup Wishlist Button
  updateModalWishlistButton(product.id);
  const wishlistBtn = document.getElementById("modal-wishlist-btn");
  // Remove old listeners by cloning
  const newWishlistBtn = wishlistBtn.cloneNode(true);
  wishlistBtn.replaceWith(newWishlistBtn);
  newWishlistBtn.addEventListener("click", () => toggleWishlist(product.id));

  // Add to Cart Button Action
  const cartBtn = document.getElementById("modal-add-to-cart-btn");
  const newCartBtn = cartBtn.cloneNode(true);
  cartBtn.replaceWith(newCartBtn);
  newCartBtn.addEventListener("click", () => {
    addToCart(product.id, currentModalQty, selectedColor, selectedSize);
    closeQuickView();
  });

  // Setup Magnifier Zoom
  setupMagnifierGlass(mainImage);

  // Show Modal with Animation
  modal.classList.remove("pointer-events-none");
  gsap.to(modal, { opacity: 1, duration: 0.3 });
  gsap.fromTo(modal.querySelector(".glass-panel"), { scale: 0.9, y: 30 }, { scale: 1, y: 0, duration: 0.35, ease: "back.out(1.5)" });
}

function updateModalWishlistButton(id) {
  const isInWishlist = state.wishlist.includes(id);
  const btn = document.getElementById("modal-wishlist-btn");
  if (!btn) return;
  btn.innerHTML = `<i class="${isInWishlist ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart'} text-lg"></i>`;
  if (isInWishlist) {
    btn.className = "p-3.5 border border-red-500 text-red-500 rounded-xl transition-all";
  } else {
    btn.className = "p-3.5 border border-themeText-muted/20 hover:border-red-500 hover:text-red-500 rounded-xl text-themeText-secondary transition-all";
  }
}

function closeQuickView() {
  const modal = document.getElementById("quick-view-modal");
  modal.classList.add("pointer-events-none");
  gsap.to(modal, { opacity: 0, duration: 0.25 });
  gsap.to(modal.querySelector(".glass-panel"), { scale: 0.9, y: 20, duration: 0.25 });
}

function setupMagnifierGlass(img) {
  const glass = document.getElementById("magnifier-glass");
  const container = document.getElementById("quick-view-img-container");
  
  if (!glass || !container) return;

  container.addEventListener("mouseenter", () => {
    glass.style.display = "block";
    glass.style.backgroundImage = `url('${img.src}')`;
    // Scale zoom factor (e.g. 2.5x)
    glass.style.backgroundSize = `${img.width * 2.2}px ${img.height * 2.2}px`;
  });

  container.addEventListener("mousemove", (e) => {
    const rect = img.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Position of mouse relative to image
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // Boundary check
    if (x > img.width || x < 0 || y > img.height || y < 0) {
      glass.style.display = "none";
      return;
    } else {
      glass.style.display = "block";
    }

    // Position of glass relative to container
    let glassX = e.clientX - containerRect.left - glass.offsetWidth / 2;
    let glassY = e.clientY - containerRect.top - glass.offsetHeight / 2;

    glass.style.left = `${glassX}px`;
    glass.style.top = `${glassY}px`;

    // Background shift
    const zoomX = (x / img.width) * 100;
    const zoomY = (y / img.height) * 100;
    glass.style.backgroundPosition = `${zoomX}% ${zoomY}%`;
  });

  container.addEventListener("mouseleave", () => {
    glass.style.display = "none";
  });
}

// --- 15. ADMIN INVENTORY MANAGEMENT ---
const ADMIN_PAGE_SIZE = 50;
let adminCurrentPage = 1;
let adminFiltered = [];

function renderAdminDashboard() {
  const tbody      = document.getElementById("admin-product-table-body");
  const countSpan  = document.getElementById("admin-total-products");
  if (!tbody) return;

  // Keyword filter
  const query = (document.getElementById("admin-search-input")?.value || "").toLowerCase().trim();
  adminFiltered = query
    ? state.products.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        (p.brand || "").toLowerCase().includes(query)
      )
    : state.products;

  countSpan.textContent = adminFiltered.length;

  // Clamp page
  const totalPages = Math.max(1, Math.ceil(adminFiltered.length / ADMIN_PAGE_SIZE));
  if (adminCurrentPage > totalPages) adminCurrentPage = 1;

  // Slice for current page
  const start  = (adminCurrentPage - 1) * ADMIN_PAGE_SIZE;
  const pageProducts = adminFiltered.slice(start, start + ADMIN_PAGE_SIZE);

  // Build rows using DocumentFragment — one reflow, not N
  const frag = document.createDocumentFragment();
  pageProducts.forEach(product => {
    const row = document.createElement("tr");
    row.className = "hover:bg-themeBg-primary/40 transition-colors admin-product-row";
    row.dataset.id = product.id;
    row.innerHTML = `
      <td class="p-4"><img src="${product.image}" loading="lazy" class="w-10 h-10 object-contain bg-white p-1 rounded border" onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=100'"></td>
      <td class="p-4 font-bold text-themeText-primary truncate max-w-[220px]">${product.title}</td>
      <td class="p-4 capitalize text-xs">${product.category}</td>
      <td class="p-4 font-black text-themeText-primary">${formatPrice(product.price)}</td>
      <td class="p-4"><i class="fa-solid fa-star text-yellow-400 mr-1 text-xs"></i>${product.rating.rate}</td>
      <td class="p-4 text-right space-x-2 whitespace-nowrap">
        <button class="edit-btn px-3 py-1.5 bg-brand-primary/10 hover:bg-brand-primary hover:text-white text-brand-primary rounded-lg text-xs font-bold transition-all" data-id="${product.id}">Edit</button>
        <button class="delete-btn px-3 py-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 rounded-lg text-xs font-bold transition-all" data-id="${product.id}">Delete</button>
      </td>
    `;
    frag.appendChild(row);
  });

  tbody.innerHTML = "";
  tbody.appendChild(frag);

  // Event delegation — single listener on tbody, not one per row
  tbody.onclick = (e) => {
    const editBtn   = e.target.closest(".edit-btn");
    const deleteBtn = e.target.closest(".delete-btn");
    if (editBtn)   openAdminProductModal(parseInt(editBtn.dataset.id));
    if (deleteBtn) deleteProduct(parseInt(deleteBtn.dataset.id));
  };

  renderAdminPagination(totalPages);
}

function renderAdminPagination(totalPages) {
  // Remove old pagination if any
  let pg = document.getElementById("admin-pagination");
  if (!pg) {
    pg = document.createElement("div");
    pg.id = "admin-pagination";
    pg.className = "flex items-center justify-between gap-2 mt-4 px-2 flex-wrap";
    const table = document.getElementById("admin-product-table-body")?.closest("div");
    if (table) table.after(pg);
  }

  if (totalPages <= 1) { pg.innerHTML = ""; return; }

  const start = (adminCurrentPage - 1) * ADMIN_PAGE_SIZE + 1;
  const end   = Math.min(adminCurrentPage * ADMIN_PAGE_SIZE, adminFiltered.length);

  // Build page buttons — show max 7 around current page
  let pages = [];
  if (totalPages <= 7) {
    pages = Array.from({length: totalPages}, (_, i) => i + 1);
  } else {
    pages = [1];
    if (adminCurrentPage > 3) pages.push("…");
    for (let i = Math.max(2, adminCurrentPage - 1); i <= Math.min(totalPages - 1, adminCurrentPage + 1); i++) pages.push(i);
    if (adminCurrentPage < totalPages - 2) pages.push("…");
    pages.push(totalPages);
  }

  pg.innerHTML = `
    <span class="text-xs text-themeText-muted">Showing <b>${start}–${end}</b> of <b>${adminFiltered.length}</b> products</span>
    <div class="flex items-center gap-1">
      <button id="admin-pg-prev" class="admin-pg-btn px-3 py-1.5 text-xs rounded-lg border border-themeText-muted/20 hover:border-brand-primary transition-all ${adminCurrentPage === 1 ? 'opacity-40 pointer-events-none' : ''}">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      ${pages.map(p => p === "…"
        ? `<span class="px-2 text-themeText-muted text-xs">…</span>`
        : `<button class="admin-pg-btn px-3 py-1.5 text-xs rounded-lg border transition-all ${p === adminCurrentPage ? 'border-brand-primary bg-brand-primary/10 text-brand-primary font-bold' : 'border-themeText-muted/20 hover:border-brand-primary'}" data-page="${p}">${p}</button>`
      ).join("")}
      <button id="admin-pg-next" class="admin-pg-btn px-3 py-1.5 text-xs rounded-lg border border-themeText-muted/20 hover:border-brand-primary transition-all ${adminCurrentPage === totalPages ? 'opacity-40 pointer-events-none' : ''}">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  `;

  pg.onclick = (e) => {
    const btn = e.target.closest(".admin-pg-btn");
    if (!btn) return;
    if (btn.id === "admin-pg-prev") adminCurrentPage--;
    else if (btn.id === "admin-pg-next") adminCurrentPage++;
    else if (btn.dataset.page) adminCurrentPage = parseInt(btn.dataset.page);
    renderAdminDashboard();
    // Scroll table back to top smoothly
    document.getElementById("admin-product-table-body")?.closest("div")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

function openAdminProductModal(id = null) {
  const modal = document.getElementById("admin-product-modal");
  const form = document.getElementById("admin-product-form");
  const title = document.getElementById("admin-modal-title");

  form.reset();
  document.getElementById("admin-product-id").value = id || "";

  if (id) {
    title.textContent = "Edit Product Details";
    const product = state.products.find(p => p.id === id);
    if (product) {
      document.getElementById("admin-form-title").value = product.title;
      document.getElementById("admin-form-category").value = product.category;
      document.getElementById("admin-form-price").value = product.price;
      document.getElementById("admin-form-image").value = product.image;
      document.getElementById("admin-form-description").value = product.description;
      document.getElementById("admin-form-rating").value = product.rating.rate;
      document.getElementById("admin-form-rating-count").value = product.rating.count;
    }
  } else {
    title.textContent = "Add New Product";
  }

  modal.classList.remove("pointer-events-none");
  gsap.to(modal, { opacity: 1, duration: 0.25 });
  gsap.fromTo(modal.querySelector(".glass-panel"), { scale: 0.95 }, { scale: 1, duration: 0.3 });
}

function closeAdminProductModal() {
  const modal = document.getElementById("admin-product-modal");
  modal.classList.add("pointer-events-none");
  gsap.to(modal, { opacity: 0, duration: 0.2 });
}

function saveAdminProduct(e) {
  e.preventDefault();
  const id = document.getElementById("admin-product-id").value;
  const title = document.getElementById("admin-form-title").value;
  const category = document.getElementById("admin-form-category").value;
  const price = parseFloat(document.getElementById("admin-form-price").value);
  const image = document.getElementById("admin-form-image").value;
  const description = document.getElementById("admin-form-description").value;
  const rate = parseFloat(document.getElementById("admin-form-rating").value || 4.5);
  const count = parseInt(document.getElementById("admin-form-rating-count").value || 100);

  if (id) {
    // Edit existing product
    const prodId = parseInt(id);
    // Try to update in state.products
    let prod = state.products.find(p => p.id === prodId);
    if (prod) {
      prod.title = title;
      prod.category = category;
      prod.price = price;
      prod.image = image;
      prod.description = description;
      prod.rating = { rate, count };
      // Also update in originalPrice based on discount
      prod.originalPrice = Math.round(price / (1 - prod.discount / 100));
    }
    
    // Update in customProducts if it's a custom product
    let customProd = state.customProducts.find(p => p.id === prodId);
    if (customProd) {
      customProd.title = title;
      customProd.category = category;
      customProd.price = price;
      customProd.image = image;
      customProd.description = description;
      customProd.rating = { rate, count };
    }
    showToast("Product details updated successfully!", "success");
  } else {
    // Add new product
    const newId = Date.now(); // Unique temporary ID
    const newProduct = enrichProduct({
      id: newId,
      title,
      category,
      price,
      image,
      description,
      rating: { rate, count }
    });
    
    state.products.push(newProduct);
    state.customProducts.push(newProduct);
    showToast("New product added to inventory!", "success");
  }

  saveStateToLocalStorage();
  closeAdminProductModal();
  adminCurrentPage = 1;
  renderAdminDashboard();
  
  // Flag filters to re-render in Shop catalog
  filtersRendered = false;
}

function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    state.products = state.products.filter(p => p.id !== id);
    state.customProducts = state.customProducts.filter(p => p.id !== id);
    // Remove from cart and wishlist if present
    state.cart = state.cart.filter(item => item.productId !== id);
    state.wishlist = state.wishlist.filter(wId => wId !== id);

    saveStateToLocalStorage();
    updateBadges();
    renderAdminDashboard();
    showToast("Product deleted from registry.", "info");
    
    filtersRendered = false;
  }
}

// --- 16. EVENT LISTENERS & UX INTERACTIONS ---
function setupEventListeners() {
  // Hash Routing
  window.addEventListener("hashchange", handleRouting);
  window.addEventListener("storage", () => {
    setAdminAccessVisibility();
    if (state.currentView === "#admin" && !isAdminUser()) {
      window.location.hash = "#home";
    }
  });

  // Theme Toggle
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

  // Header Scroll Shadow only (back-to-top handled in initDropdownMenus)
  window.addEventListener("scroll", () => {
    const header = document.getElementById("main-header");
    if (window.scrollY > 20) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });

  // Mobile Menu Triggers
  const mobileMenu = document.getElementById("mobile-nav-drawer");
  document.getElementById("mobile-menu-trigger").addEventListener("click", () => {
    mobileMenu.classList.remove("pointer-events-none");
    gsap.to(mobileMenu, { opacity: 1, duration: 0.3 });
    gsap.to(mobileMenu.querySelector(".fixed"), { x: 0, duration: 0.3, ease: "power2.out" });
  });

  const closeMobileMenu = () => {
    mobileMenu.classList.add("pointer-events-none");
    gsap.to(mobileMenu, { opacity: 0, duration: 0.25 });
    gsap.to(mobileMenu.querySelector(".fixed"), { x: "-100%", duration: 0.25, ease: "power2.in" });
  };
  document.getElementById("mobile-nav-close").addEventListener("click", closeMobileMenu);
  mobileMenu.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Mobile Search Toggle — button removed, skip gracefully
  const mobileSearchBar = document.getElementById("mobile-search-bar");
  const mobileSearchTrigger = document.getElementById("mobile-search-trigger");
  if (mobileSearchTrigger && mobileSearchBar) {
    mobileSearchTrigger.addEventListener("click", () => {
      mobileSearchBar.classList.toggle("hidden");
      if (!mobileSearchBar.classList.contains("hidden")) {
        document.getElementById("mobile-search-input").focus();
      }
    });
  }

  // Cart Drawer Triggers
  const cartDrawer = document.getElementById("cart-drawer");
  const toggleCart = (open) => {
    if (open) {
      cartDrawer.classList.remove("pointer-events-none");
      document.body.classList.add("cart-drawer-open");
      gsap.to(cartDrawer, { opacity: 1, duration: 0.3 });
      gsap.to(cartDrawer.querySelector(".fixed"), { x: 0, duration: 0.3, ease: "power2.out" });
      renderCart();
    } else {
      cartDrawer.classList.add("pointer-events-none");
      document.body.classList.remove("cart-drawer-open");
      gsap.to(cartDrawer, { opacity: 0, duration: 0.25 });
      gsap.to(cartDrawer.querySelector(".fixed"), { x: "100%", duration: 0.25, ease: "power2.in" });
    }
  };
  document.getElementById("cart-drawer-trigger").addEventListener("click", () => toggleCart(true));
  document.getElementById("cart-drawer-close").addEventListener("click", () => toggleCart(false));
  document.getElementById("checkout-btn").addEventListener("click", () => {
    toggleCart(false);
    window.location.hash = "#checkout";
  });

  // Apply Coupon Click
  document.getElementById("apply-coupon-btn").addEventListener("click", applyCoupon);

  // Quick View Modal Controls
  document.getElementById("quick-view-close").addEventListener("click", closeQuickView);
  document.getElementById("modal-qty-minus").addEventListener("click", () => {
    if (currentModalQty > 1) {
      currentModalQty--;
      document.getElementById("modal-qty-value").textContent = currentModalQty;
    }
  });
  document.getElementById("modal-qty-plus").addEventListener("click", () => {
    currentModalQty++;
    document.getElementById("modal-qty-value").textContent = currentModalQty;
  });

  // Admin Dashboard Controls
  document.getElementById("add-product-modal-btn").addEventListener("click", () => openAdminProductModal());
  document.getElementById("admin-product-close").addEventListener("click", closeAdminProductModal);
  document.getElementById("admin-product-form").addEventListener("submit", saveAdminProduct);
  // Admin search — debounced 300ms, resets to page 1
  let adminSearchTimer;
  const adminSearchEl = document.getElementById("admin-search-input");
  if (adminSearchEl) {
    adminSearchEl.addEventListener("input", () => {
      clearTimeout(adminSearchTimer);
      adminSearchTimer = setTimeout(() => {
        adminCurrentPage = 1;
        renderAdminDashboard();
      }, 300);
    });
  }

  // Checkout Form Submission
  document.getElementById("checkout-form").addEventListener("submit", handleCheckoutSubmit);

  // Payment Option selection toggles fields
  const cardFields = document.getElementById("card-details-fields");
  document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
      // Toggle card inputs
      if (e.target.value === "card") {
        cardFields.style.display = "grid";
      } else {
        cardFields.style.display = "none";
      }
      
      // Update styling
      document.querySelectorAll('input[name="payment-method"]').forEach(r => {
        const parent = r.closest("label");
        parent.className = "flex flex-col items-center justify-center p-4 border rounded-2xl cursor-pointer text-center hover:border-brand-primary transition-all " + 
          (r.checked ? "border-brand-primary bg-brand-primary/5 text-themeText-primary" : "border-themeText-muted/20 text-themeText-muted");
      });
    });
  });

  // Search & Filters Auto-Suggestion Input
  setupSearchAutocomplete();

  // Desktop Sidebar Search Input
  const sidebarSearch = document.getElementById("sidebar-search-input");
  if (sidebarSearch) {
    sidebarSearch.addEventListener("input", (e) => {
      syncAndExecuteSearch(e.target.value, "sidebar-search-input");
    });
  }

  // Price Range Slider Event
  const priceSlider = document.getElementById("price-slider");
  const priceVal = document.getElementById("price-slider-value");
  priceSlider.addEventListener("input", (e) => {
    const val = parseInt(e.target.value) * 100; // Map slider 0-2000 to INR 0-200,000
    state.filters.priceMax = val;
    priceVal.textContent = `${formatPrice(0)} - ${formatPrice(val)}`;
    state.currentPage = 1;
    renderProductGrid();
  });

  // Availability Filter
  document.getElementById("stock-filter").addEventListener("change", (e) => {
    state.filters.stockOnly = e.target.checked;
    state.currentPage = 1;
    renderProductGrid();
  });

  // Sort Selection — sync select to state on init, then listen for changes
  const sortSelect = document.getElementById("sort-select");
  sortSelect.value = state.sortBy; // sync on load
  sortSelect.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderProductGrid();
  });

  // Load More Button
  document.getElementById("load-more-btn").addEventListener("click", () => {
    state.currentPage++;
    renderProductGrid();
  });

  // Clear Filters
  document.getElementById("clear-filters-btn").addEventListener("click", () => {
    state.filters = {
      search: "",
      category: "all",
      priceMax: 200000,
      brand: "all",
      rating: "all",
      stockOnly: false
    };
    
    // Reset inputs
    document.getElementById("sidebar-search-input").value = "";
    document.getElementById("global-search-input").value = "";
    document.getElementById("mobile-search-input").value = "";
    document.getElementById("price-slider").value = 2000;
    document.getElementById("price-slider-value").textContent = `${formatPrice(0)} - ${formatPrice(200000)}`;
    document.getElementById("stock-filter").checked = false;
    
    // Reset radios
    const checkedCat = document.querySelector('input[name="category-filter"][value="all"]');
    if (checkedCat) checkedCat.checked = true;
    const checkedBrand = document.querySelector('input[name="brand-filter"][value="all"]');
    if (checkedBrand) checkedBrand.checked = true;
    const checkedRating = document.querySelector('input[name="rating-filter"][value="all"]');
    if (checkedRating) checkedRating.checked = true;

    state.currentPage = 1;
    renderProductGrid();
  });

  // Mobile Filter Drawer Toggle
  const mobileFilterDrawer = document.getElementById("mobile-filter-drawer");
  document.getElementById("mobile-filter-trigger").addEventListener("click", () => {
    // Port filter elements to mobile container
    const sidebar = document.getElementById("filter-sidebar");
    const mobileContent = document.getElementById("mobile-filter-content");
    
    // Clone sidebar children into mobile drawer
    mobileContent.innerHTML = "";
    const children = Array.from(sidebar.children).slice(1); // skip heading
    children.forEach(child => {
      const clone = child.cloneNode(true);
      mobileContent.appendChild(clone);
    });

    // Re-bind listeners on cloned mobile inputs
    bindMobileFilterListeners(mobileContent);

    mobileFilterDrawer.classList.remove("pointer-events-none");
    gsap.to(mobileFilterDrawer, { opacity: 1, duration: 0.3 });
    gsap.to(mobileFilterDrawer.querySelector(".fixed"), { x: 0, duration: 0.3, ease: "power2.out" });
  });

  const closeMobileFilter = () => {
    mobileFilterDrawer.classList.add("pointer-events-none");
    gsap.to(mobileFilterDrawer, { opacity: 0, duration: 0.25 });
    gsap.to(mobileFilterDrawer.querySelector(".fixed"), { x: "-100%", duration: 0.25, ease: "power2.in" });
  };
  document.getElementById("mobile-filter-close").addEventListener("click", closeMobileFilter);
  document.getElementById("mobile-filter-apply-btn").addEventListener("click", closeMobileFilter);
  
  document.getElementById("mobile-filter-clear-btn").addEventListener("click", () => {
    document.getElementById("clear-filters-btn").click();
    closeMobileFilter();
  });

  // FAQ Accordion Toggles
  document.querySelectorAll("#faq-accordion button").forEach(btn => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const icon = btn.querySelector("i");
      
      // Close other panels
      document.querySelectorAll("#faq-accordion .max-h-0").forEach(p => {
        if (p !== panel) {
          p.style.maxHeight = null;
          p.previousElementSibling.querySelector("i").className = "fa-solid fa-plus text-xs transition-transform duration-300";
        }
      });

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        icon.className = "fa-solid fa-plus text-xs transition-transform duration-300";
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        icon.className = "fa-solid fa-minus text-xs transition-transform duration-300";
      }
    });
  });

}

function bindMobileFilterListeners(container) {
  // Search
  const search = container.querySelector("#sidebar-search-input");
  if (search) {
    search.value = state.filters.search;
    search.addEventListener("input", (e) => {
      syncAndExecuteSearch(e.target.value, "sidebar-search-input");
    });
  }

  // Categories
  container.querySelectorAll('input[name="category-filter"]').forEach(radio => {
    if (radio.value === state.filters.category) radio.checked = true;
    radio.addEventListener("change", (e) => {
      state.filters.category = e.target.value;
      // Sync desktop
      const desktopCat = document.querySelector(`#sidebar-categories-list input[value="${e.target.value}"]`);
      if (desktopCat) desktopCat.checked = true;
      state.currentPage = 1;
      renderProductGrid();
    });
  });

  // Price Slider
  const slider = container.querySelector("#price-slider");
  const priceVal = container.querySelector("#price-slider-value");
  if (slider) {
    slider.value = state.filters.priceMax / 100;
    priceVal.textContent = `${formatPrice(0)} - ${formatPrice(state.filters.priceMax)}`;
    slider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value) * 100;
      state.filters.priceMax = val;
      priceVal.textContent = `${formatPrice(0)} - ${formatPrice(val)}`;
      
      // Sync desktop
      document.getElementById("price-slider").value = e.target.value;
      document.getElementById("price-slider-value").textContent = `${formatPrice(0)} - ${formatPrice(val)}`;
      state.currentPage = 1;
      renderProductGrid();
    });
  }

  // Brands
  container.querySelectorAll('input[name="brand-filter"]').forEach(radio => {
    if (radio.value === state.filters.brand) radio.checked = true;
    radio.addEventListener("change", (e) => {
      state.filters.brand = e.target.value;
      // Sync desktop
      const desktopBrand = document.querySelector(`#sidebar-brands-list input[value="${e.target.value}"]`);
      if (desktopBrand) desktopBrand.checked = true;
      state.currentPage = 1;
      renderProductGrid();
    });
  });

  // Ratings
  container.querySelectorAll('input[name="rating-filter"]').forEach(radio => {
    if (radio.value === state.filters.rating) radio.checked = true;
    radio.addEventListener("change", (e) => {
      state.filters.rating = e.target.value;
      // Sync desktop
      const desktopRating = document.querySelector(`input[name="rating-filter"][value="${e.target.value}"]`);
      if (desktopRating) desktopRating.checked = true;
      state.currentPage = 1;
      renderProductGrid();
    });
  });

  // Availability
  const stock = container.querySelector("#stock-filter");
  if (stock) {
    stock.checked = state.filters.stockOnly;
    stock.addEventListener("change", (e) => {
      state.filters.stockOnly = e.target.checked;
      // Sync desktop
      document.getElementById("stock-filter").checked = e.target.checked;
      state.currentPage = 1;
      renderProductGrid();
    });
  }
}

function syncAndExecuteSearch(query, skipInputId = null) {
  if (state.filters.search === query) return;
  state.filters.search = query;
  state.currentPage = 1;

  // Sync inputs across header (desktop + mobile) and sidebar
  const globalInput = document.getElementById("global-search-input");
  const mobileInput = document.getElementById("mobile-search-input");
  const sidebarInput = document.getElementById("sidebar-search-input");

  if (globalInput && skipInputId !== "global-search-input") globalInput.value = query;
  if (mobileInput && skipInputId !== "mobile-search-input") mobileInput.value = query;
  if (sidebarInput && skipInputId !== "sidebar-search-input") sidebarInput.value = query;

  // Automatically navigate to shop catalog if the user is on home, wishlist, or other views
  if (state.currentView !== "#shop") {
    window.location.hash = "#shop";
  }

  renderProductGrid();
}

function setupSearchAutocomplete() {
  const searchInput = document.getElementById("global-search-input");
  const mobileSearchInput = document.getElementById("mobile-search-input");
  const suggestionsPanel = document.getElementById("search-suggestions");
  const suggestionsList = document.getElementById("suggestions-list");
  const recentSearchesList = document.getElementById("recent-searches-list");

  // Show panel on focus
  searchInput.addEventListener("focus", () => {
    renderRecentSearches();
    suggestionsPanel.classList.remove("hidden");
  });

  // Hide panel on clicking outside
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionsPanel.contains(e.target)) {
      suggestionsPanel.classList.add("hidden");
    }
  });

  // Filter suggestion list as user types in global search
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    syncAndExecuteSearch(e.target.value, "global-search-input");

    if (!query) {
      suggestionsList.innerHTML = `<span class="text-xs text-themeText-muted italic">Type to search...</span>`;
      return;
    }

    // Filter matching titles
    const matches = state.products.filter(p => p.title.toLowerCase().includes(query)).slice(0, 5);

    suggestionsList.innerHTML = "";
    if (matches.length === 0) {
      suggestionsList.innerHTML = `<span class="text-xs text-themeText-muted italic">No suggestions found</span>`;
    } else {
      matches.forEach(match => {
        const item = document.createElement("button");
        item.className = "text-sm text-left text-themeText-secondary hover:text-brand-primary hover:bg-themeText-muted/5 px-3 py-2 rounded-xl transition-all w-full truncate";
        item.textContent = match.title;
        item.addEventListener("click", () => {
          syncAndExecuteSearch(match.title);
          suggestionsPanel.classList.add("hidden");
          addToSearchHistory(match.title);
        });
        suggestionsList.appendChild(item);
      });
    }
  });

  // Mobile search input listener
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener("input", (e) => {
      syncAndExecuteSearch(e.target.value, "mobile-search-input");
    });
    mobileSearchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = mobileSearchInput.value.trim();
        if (query) {
          addToSearchHistory(query);
        }
        document.getElementById("mobile-search-bar").classList.add("hidden");
      }
    });
  }

  // Handle enter key press on search
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        addToSearchHistory(query);
      }
      suggestionsPanel.classList.add("hidden");
    }
  });
}

function renderRecentSearches() {
  const list = document.getElementById("recent-searches-list");
  if (!list) return;

  list.innerHTML = "";
  if (state.searchHistory.length === 0) {
    list.innerHTML = `<span class="text-xs text-themeText-muted italic">No recent searches</span>`;
    return;
  }

  state.searchHistory.slice(0, 6).forEach(query => {
    const chip = document.createElement("button");
    chip.className = "text-xs font-semibold px-3 py-1.5 bg-themeBg-primary border border-themeText-muted/10 rounded-full hover:border-brand-primary hover:text-brand-primary transition-all";
    chip.textContent = query;
    chip.addEventListener("click", () => {
      syncAndExecuteSearch(query);
      document.getElementById("search-suggestions").classList.add("hidden");
    });
    list.appendChild(chip);
  });
}

function addToSearchHistory(query) {
  const clean = query.trim().toLowerCase();
  if (!clean) return;

  // Remove existing
  state.searchHistory = state.searchHistory.filter(q => q !== clean);
  // Add to beginning
  state.searchHistory.unshift(clean);
  // Cap at 10 items
  if (state.searchHistory.length > 10) state.searchHistory.pop();

  saveStateToLocalStorage();
}

// --- 17. PROMOTIONAL COUNTDOWN TIMER ---
function startCountdownTimer() {
  // Set end time (e.g. 2 hours 45 minutes from now)
  let timeInSeconds = 2 * 3600 + 45 * 60 + 59;

  const timerH = document.getElementById("timer-hours");
  const timerM = document.getElementById("timer-minutes");
  const timerS = document.getElementById("timer-seconds");

  if (!timerH) return;

  const interval = setInterval(() => {
    if (timeInSeconds <= 0) {
      clearInterval(interval);
      timerH.textContent = "00";
      timerM.textContent = "00";
      timerS.textContent = "00";
      return;
    }

    timeInSeconds--;

    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    timerH.textContent = String(hours).padStart(2, '0');
    timerM.textContent = String(minutes).padStart(2, '0');
    timerS.textContent = String(seconds).padStart(2, '0');
  }, 1000);
}

// --- 18. PREMIUM UTILITIES & HANDLERS ---

// Feature 1: Custom cursor follower logic
function initCustomCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  const dot = document.querySelector(".custom-cursor-dot");
  const outline = document.querySelector(".custom-cursor-outline");
  if (!dot || !outline) return;

  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let outlineX = 0, outlineY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.set(dot, { x: mouseX, y: mouseY });
  });

  gsap.ticker.add(() => {
    const speed = 0.15;
    outlineX += (mouseX - outlineX) * speed;
    outlineY += (mouseY - outlineY) * speed;
    gsap.set(outline, { x: outlineX, y: outlineY });
  });

  const hoverSelector = "a, button, select, input, textarea, .product-card, .wishlist-btn, [role='button'], .color-dot";
  document.body.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverSelector)) {
      dot.classList.add("custom-cursor-hover-dot");
      outline.classList.add("custom-cursor-hover-outline");
    }
  });
  document.body.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverSelector)) {
      dot.classList.remove("custom-cursor-hover-dot");
      outline.classList.remove("custom-cursor-hover-outline");
    }
  });
}

// Feature 9 & 10: Dropdowns & Selector listeners
function initDropdownMenus() {
  // Currency Converter dropdown actions
  const curBtn = document.getElementById("currency-dropdown-btn");
  const curMenu = document.getElementById("currency-dropdown-menu");
  if (curBtn && curMenu) {
    curBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      curMenu.classList.toggle("hidden");
    });
    document.querySelectorAll(".currency-opt").forEach(opt => {
      opt.addEventListener("click", () => {
        setCurrency(opt.getAttribute("data-currency"));
        curMenu.classList.add("hidden");
      });
    });
  }

  // Language translation dropdown actions
  const langBtn = document.getElementById("language-dropdown-btn");
  const langMenu = document.getElementById("language-dropdown-menu");
  if (langBtn && langMenu) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langMenu.classList.toggle("hidden");
    });
    document.querySelectorAll(".language-opt").forEach(opt => {
      opt.addEventListener("click", () => {
        setLanguage(opt.getAttribute("data-lang"));
        langMenu.classList.add("hidden");
      });
    });
  }

  // Close dropdowns on window clicks
  window.addEventListener("click", () => {
    if (curMenu) curMenu.classList.add("hidden");
    if (langMenu) langMenu.classList.add("hidden");
  });

  // Bind mobile drawer currency buttons
  document.querySelectorAll(".mobile-currency-opt").forEach(btn => {
    btn.addEventListener("click", () => {
      setCurrency(btn.getAttribute("data-currency"));
    });
  });

  // Bind mobile drawer language buttons
  document.querySelectorAll(".mobile-lang-opt").forEach(btn => {
    btn.addEventListener("click", () => {
      setLanguage(btn.getAttribute("data-lang"));
    });
  });

  // Feature 2: Bind floating cart button
  const floatCart = document.getElementById("floating-cart-btn");
  if (floatCart) {
    floatCart.addEventListener("click", () => {
      document.getElementById("cart-drawer").classList.toggle("opacity-0");
      document.getElementById("cart-drawer").classList.toggle("pointer-events-none");
      document.getElementById("cart-drawer").querySelector("div").classList.toggle("translate-x-full");
    });
  }

  // Feature 11: Scroll progress circle & back-to-top handler
  const bttBtn = document.getElementById("back-to-top");
  const progressCircle = document.getElementById("scroll-progress-circle");
  if (bttBtn && progressCircle) {
    window.addEventListener("scroll", () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const scrollPercent = window.scrollY / totalScroll;
        // stroke-dasharray = 263.89 (circumference of r=42)
        const offset = 263.89 - (scrollPercent * 263.89);
        progressCircle.style.strokeDashoffset = offset;

        if (window.scrollY > 300) {
          bttBtn.classList.add("show");
        } else {
          bttBtn.classList.remove("show");
        }
      }
    });
    bttBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// Feature 12: Preloader screen animations
function updatePreloaderProgress(percent) {
  const bar = document.getElementById("preloader-progress");
  if (bar) {
    bar.style.width = `${percent}%`;
  }
}
function dismissPreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    gsap.to(preloader, {
      opacity: 0,
      y: -50,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => preloader.remove()
    });
  }
}

// Feature 8: Voice recognition speech interface
function initVoiceSearch() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // ── Wire all 4 mic buttons ─────────────────────────────────
  const buttons = {
    'top-band-mic-btn'       : document.getElementById('top-band-mic-btn'),
    'voice-search-btn'       : document.getElementById('voice-search-btn'),
    'mobile-voice-search-btn': document.getElementById('mobile-voice-search-btn'),
    'sidebar-voice-search-btn': document.getElementById('sidebar-voice-search-btn')
  };

  if (!SpeechRecognition) {
    Object.values(buttons).forEach(btn => {
      if (!btn) return;
      btn.style.opacity = '0.5';
      btn.title = 'Voice search not supported — click for info';
      btn.addEventListener('click', () => {
        showToast('🎙 Voice search requires Google Chrome or Microsoft Edge with an active internet connection. It is not supported in your current browser or over insecure/file:// connections.', 'error');
      });
    });
    return;
  }

  // ── One shared recognition instance ───────────────────────
  const recognition = new SpeechRecognition();
  recognition.continuous     = false;
  recognition.interimResults = true;   // show words as you speak
  recognition.lang           = 'en-US';

  let activeMicBtn  = null;   // the button that started the current session
  let isRecognizing = false;  // guard against double-start

  // ── Icon helpers ───────────────────────────────────────────
  function setMicIcon(btn, isActive) {
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (!icon) return; // mobile btn may have no <i> — safe to skip
    icon.className = isActive
      ? 'fa-solid fa-microphone-lines'
      : 'fa-solid fa-microphone';
  }

  // ── Stop / reset ───────────────────────────────────────────
  function stopListening() {
    setMicIcon(activeMicBtn, false);
    if (activeMicBtn) {
      activeMicBtn.classList.remove('recording');
      activeMicBtn.title = 'Voice Search';
    }
    // Reset top-band placeholder if it was active
    const topInp = document.getElementById('top-search-input');
    if (topInp && topInp.placeholder === '🎙 Listening…') {
      topInp.placeholder = 'Search watches, brands, luxury goods…';
    }
    activeMicBtn  = null;
    isRecognizing = false;
  }

  // ── Start ──────────────────────────────────────────────────
  function startListening(btn) {
    activeMicBtn = btn;
    isRecognizing = true;
    setMicIcon(btn, true);
    btn.classList.add('recording');
    btn.title = 'Listening… click to stop';

    // Show placeholder in whatever search input is associated
    const topInp = document.getElementById('top-search-input');
    if (topInp) topInp.placeholder = '🎙 Listening…';

    try {
      recognition.start();
    } catch (err) {
      // InvalidStateError means recognition is already running — abort then retry
      recognition.abort();
      isRecognizing = false;
      setTimeout(() => {
        if (activeMicBtn === btn) {
          try { recognition.start(); isRecognizing = true; }
          catch (e2) {
            showToast('Could not start voice search. Please try again.', 'error');
            stopListening();
          }
        }
      }, 200);
    }
  }

  // ── Toggle ─────────────────────────────────────────────────
  function toggleListening(btn) {
    if (isRecognizing) {
      // Stop current session
      recognition.stop();
    } else {
      startListening(btn);
    }
  }

  // ── SpeechRecognition events ───────────────────────────────
  recognition.onstart = () => {
    showToast('🎙 Listening… speak now', 'success');
  };

  recognition.onresult = (event) => {
    let interim = '';
    let final   = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const t = event.results[i][0].transcript;
      if (event.results[i].isFinal) final += t;
      else interim += t;
    }

    // Show interim text live in the search box
    const topInp = document.getElementById('top-search-input');
    if (topInp && interim) topInp.value = interim;

    if (final) {
      final = final.trim();
      if (topInp) topInp.value = final;

      // Sync to global input and execute search
      const gInp = document.getElementById('global-search-input');
      if (gInp) gInp.value = final;
      if (typeof syncAndExecuteSearch === 'function') syncAndExecuteSearch(final);

      showToast('🔍 Voice Search: "' + final + '"', 'success');
    }
  };

  recognition.onerror = (e) => {
    const msgs = {
      'not-allowed' : '🔒 Microphone access denied. Click the lock icon in the address bar and allow microphone access.',
      'no-speech'   : 'No speech detected. Try speaking closer to the mic.',
      'network'     : '🌐 Network error. Check your internet connection.',
      'audio-capture': '🎙 No microphone detected. Please check your system settings and connect a mic.',
      'service-not-allowed': '⚠️ Voice search is not allowed. Note that Web Speech API requires an active internet connection and does not work on local "file://" protocols in some browsers.',
      'aborted'     : null   // silent — user cancelled deliberately
    };
    let msg = msgs[e.error];
    if (msg === undefined) {
      msg = '⚠️ Voice search error: ' + e.error;
    }
    if (msg) showToast(msg, 'error');
    stopListening();
  };

  recognition.onend = () => {
    stopListening();
  };

  Object.values(buttons).forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => toggleListening(btn));
  });
}

// Feature 10: Multi-currency converter logic & formatter helper
const CURRENCIES = {
  INR: { symbol: "₹", rate: 1 },
  USD: { symbol: "$", rate: 0.012 },
  EUR: { symbol: "€", rate: 0.011 },
  GBP: { symbol: "£", rate: 0.0094 }
};

function setCurrency(cur) {
  if (!CURRENCIES[cur]) return;
  state.currency = cur;
  localStorage.setItem("aura_currency", cur);
  
  // Update dropdown button
  const curBtn = document.getElementById("active-currency");
  if (curBtn) curBtn.textContent = `${cur} ${CURRENCIES[cur].symbol}`;

  // Update mobile drawer button highlights
  document.querySelectorAll(".mobile-currency-opt").forEach(btn => {
    if (btn.getAttribute("data-currency") === cur) {
      btn.className = "mobile-currency-opt px-2 py-1 rounded border border-brand-primary text-[10px] font-bold text-brand-primary bg-brand-primary/5";
    } else {
      btn.className = "mobile-currency-opt px-2 py-1 rounded border border-themeText-muted/20 text-[10px] font-bold hover:border-brand-primary";
    }
  });

  // Update price slider labels
  const sliderVal = document.getElementById("price-slider-value");
  if (sliderVal) {
    sliderVal.textContent = `${formatPrice(0)} - ${formatPrice(state.filters.priceMax)}`;
  }

  // Re-render views to apply currency exchange changes
  renderProductGrid();
  renderCart();
  renderWishlist();
  renderCompare();
}

function formatPrice(amount) {
  const cur = state.currency || "INR";
  const details = CURRENCIES[cur];
  const converted = amount * details.rate;
  if (cur === "INR") {
    return `${details.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
  } else {
    return `${details.symbol}${converted.toFixed(2)}`;
  }
}

// Feature 5: Interactive Breadcrumbs logic
function renderBreadcrumbs() {
  const container = document.getElementById("shop-breadcrumbs");
  if (!container) return;

  container.innerHTML = "";

  const homeLink = document.createElement("a");
  homeLink.href = "#home";
  homeLink.className = "hover:text-brand-primary transition-colors duration-200";
  homeLink.textContent = state.language === "HIN" ? "होम" : state.language === "ESP" ? "Inicio" : state.language === "FRA" ? "Accueil" : "Home";
  container.appendChild(homeLink);

  const d1 = document.createElement("i");
  d1.className = "fa-solid fa-angle-right text-[9px]";
  container.appendChild(d1);

  const shopLink = document.createElement("a");
  shopLink.href = "#shop";
  shopLink.className = "hover:text-brand-primary transition-colors duration-200";
  shopLink.textContent = state.language === "HIN" ? "संग्रह" : state.language === "ESP" ? "Catálogo" : state.language === "FRA" ? "Catalogue" : "Catalog";
  shopLink.addEventListener("click", (e) => {
    e.preventDefault();
    state.filters.category = "all";
    state.filters.brand = "all";
    
    // Reset sidebar active buttons
    const catList = document.getElementById("sidebar-categories-list");
    if (catList) {
      catList.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      const allBtn = catList.querySelector("button[data-category='all']");
      if (allBtn) allBtn.classList.add("active");
    }
    
    const brandSel = document.getElementById("sidebar-brands-list");
    if (brandSel) brandSel.value = "all";

    renderProductGrid();
  });
  container.appendChild(shopLink);

  if (state.filters.category !== "all") {
    const d2 = document.createElement("i");
    d2.className = "fa-solid fa-angle-right text-[9px]";
    container.appendChild(d2);

    const catLink = document.createElement("a");
    catLink.href = "#shop";
    catLink.className = "hover:text-brand-primary transition-colors duration-200 capitalize";
    catLink.textContent = state.filters.category;
    catLink.addEventListener("click", (e) => {
      e.preventDefault();
      state.filters.brand = "all";
      const brandSel = document.getElementById("sidebar-brands-list");
      if (brandSel) brandSel.value = "all";
      renderProductGrid();
    });
    container.appendChild(catLink);
  }

  if (state.filters.brand !== "all") {
    const d3 = document.createElement("i");
    d3.className = "fa-solid fa-angle-right text-[9px]";
    container.appendChild(d3);

    const brandSpan = document.createElement("span");
    brandSpan.className = "text-themeText-secondary font-medium";
    brandSpan.textContent = state.filters.brand;
    container.appendChild(brandSpan);
  }
}

// Feature 9: Full-site Translations dictionary
const TRANSLATIONS = {
  ENG: {
    // Nav
    navHome: "Home", navShop: "Shop", navWishlist: "Wishlist",
    navCompare: "Compare", navAdmin: "Admin Dashboard",
    // Search
    searchPlaceholder: "Search premium products...",
    sidebarSearchPlaceholder: "Search item...",
    mobileSearchPlaceholder: "Search products...",
    topSearchPlaceholder: "Search watches, brands, luxury goods…",
    recentSearches: "Recent Searches", suggestions: "Suggestions",
    // Shop
    shopTitle: "Shop Collection", filterTitle: "Filters",
    clearAll: "Clear All", sortDefault: "Sort: Default",
    sortPriceLow: "Price: Low to High", sortPriceHigh: "Price: High to Low",
    sortRating: "Rating: Highest First", sortNewest: "Newest Arrivals",
    showingProducts: "Showing", products: "products",
    loadMore: "Load More Products", noProducts: "No Products Found",
    noProductsDesc: "We couldn't find any products matching your filters.",
    inStockOnly: "In Stock Only", customerRating: "Customer Rating",
    priceRange: "Price Range", brand: "Brand", categories: "Categories",
    keyword: "Keyword", availability: "Availability",
    // Product card
    addToCart: "Add to Bag", addedToCart: "Added to Bag",
    inStock: "In Stock", outOfStock: "Out of Stock",
    quickView: "Quick View", compare: "Compare",
    // Cart
    cartTitle: "Your Shopping Cart", checkout: "Secure Checkout",
    subtotal: "Subtotal", discount: "Discount", tax: "GST (18%)",
    shipping: "Shipping", total: "Total", free: "FREE",
    promoCode: "Promo Code (e.g. SAVE10)", apply: "Apply",
    emptyCart: "Your cart is empty", startShopping: "Start Shopping",
    removeItem: "Remove",
    // Wishlist
    wishlistTitle: "Your Wishlist",
    wishlistDesc: "Keep track of items you love and add them to your cart anytime.",
    wishlistEmpty: "Your Wishlist is Empty",
    wishlistEmptyDesc: "Browse our products and click the heart icon to save items here.",
    goShopping: "Go Shopping",
    // Compare
    compareTitle: "Compare Products",
    compareDesc: "Side-by-side comparison to help you make the best purchase decision.",
    compareEmpty: "No Products Selected",
    compareEmptyDesc: "Select at least two products to compare their specifications.",
    goToShop: "Go to Shop", features: "Features",
    // Checkout
    checkoutTitle: "Complete Checkout", shippingAddress: "Shipping Address",
    firstName: "First Name", lastName: "Last Name", email: "Email Address",
    streetAddress: "Street Address", city: "City", pinCode: "PIN Code",
    paymentMethod: "Payment Method", cardDebit: "Credit / Debit Card",
    upi: "UPI / NetBanking", cod: "Cash on Delivery",
    cardNumber: "Card Number", expiry: "Expiration Date", cvv: "CVV",
    authorizePayment: "Authorize Secure Payment", orderSummary: "Order Summary",
    grandTotal: "Grand Total",
    // Order success
    orderSuccess: "Order Placed Successfully!",
    orderSuccessDesc: "Thank you for your purchase. We are processing your order.",
    orderId: "Order ID", estDelivery: "Est. Delivery", totalPaid: "Total Paid",
    continueShopping: "Continue Shopping", backToHome: "Back to Home",
    // Admin
    adminTitle: "Product Inventory Manager", addProduct: "Add New Product",
    totalProducts: "Total Active Products", monthlyRevenue: "Simulated Monthly Revenue",
    activeCustomers: "Active Customer Accounts", avgRating: "Average Review Rating",
    productRegistry: "Product Catalog Registry", filterInventory: "Filter inventory...",
    image: "Image", productTitle: "Product Title", category: "Category",
    price: "Price", rating: "Rating", actions: "Actions",
    edit: "Edit", delete: "Delete",
    // About
    aboutTitle: "About AURA Store",
    aboutDesc: "We are dedicated to bringing you curated, ultra-premium goods that elevate your everyday lifestyle.",
    premiumQuality: "Premium Quality", premiumDesc: "We partner with global manufacturers to source only the finest materials.",
    sustainable: "Sustainable Sourcing", sustainableDesc: "Ethically manufactured items designed to leave a minimal environmental footprint.",
    secured: "Secured Payments", securedDesc: "Industry-standard encryption guarantees 100% safe and secure shopping.",
    // Contact
    contactTitle: "Get In Touch",
    contactDesc: "Have questions? Our support team will get back to you within 24 hours.",
    name: "Name", message: "Message", sendMessage: "Send Message",
    // FAQ
    faqTitle: "Frequently Asked Questions",
    faq1q: "What is the average delivery time?",
    faq1a: "Orders are processed within 24 hours. Domestic delivery takes 3-5 business days.",
    faq2q: "Can I return a product?",
    faq2a: "Yes, we offer a 30-day hassle-free return policy. Item must be in original packaging.",
    faq3q: "How do I track my order?",
    faq3a: "Once shipped, you'll receive an email with a unique tracking link.",
    // Footer
    footerDesc: "Experience curated, premium lifestyle and fashion items. Built for the modern aesthetic.",
    quickLinks: "Quick Links", support: "Support", getApp: "Get the App",
    faq: "FAQ", contactSupport: "Contact Support", aboutUs: "About Us",
    returnPolicy: "Return Policy", privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service", copyright: "2026 AURA Store. All rights reserved.",
    // Newsletter
    newsletterTitle: "Join the AURA Club",
    newsletterDesc: "Subscribe for early access, member-only discounts, and styling recommendations.",
    subscribe: "Subscribe", emailPlaceholder: "Your email address",
    // Flash sale
    flashDeals: "AURA Flash Deals",
    flashDesc: "Grab premium products at unbelievable discounts before time runs out!",
    // Trending
    trendingTitle: "Trending Products", liveUpdates: "Live Updates",
    // Categories
    browseCategories: "Browse Categories", viewAll: "View All Shop",
    discoverCollection: "Discover Collection",
    // Modal
    colorVariants: "Color Variants", size: "Size",
    estDeliveryModal: "Estimated Delivery", easyReturns: "Easy Returns",
    returnDays: "30-Day Policy", scanShare: "Scan & Share",
    scanDesc: "Scan this QR code to instantly view and share this product!",
    copyLink: "Copy Link",
  },
  HIN: {
    navHome: "होम", navShop: "दुकान", navWishlist: "इच्छा सूची",
    navCompare: "तुलना करें", navAdmin: "व्यवस्थापक डैशबोर्ड",
    searchPlaceholder: "प्रीमियम उत्पाद खोजें...",
    sidebarSearchPlaceholder: "आइटम खोजें...",
    mobileSearchPlaceholder: "उत्पाद खोजें...",
    topSearchPlaceholder: "घड़ियाँ, ब्रांड, लक्जरी सामान खोजें…",
    recentSearches: "हाल की खोजें", suggestions: "सुझाव",
    shopTitle: "संग्रह दुकान", filterTitle: "फ़िल्टर",
    clearAll: "सभी साफ़ करें", sortDefault: "क्रमबद्ध करें: डिफ़ॉल्ट",
    sortPriceLow: "कीमत: कम से अधिक", sortPriceHigh: "कीमत: अधिक से कम",
    sortRating: "रेटिंग: सर्वोच्च पहले", sortNewest: "नवीनतम",
    showingProducts: "दिखा रहे हैं", products: "उत्पाद",
    loadMore: "और उत्पाद लोड करें", noProducts: "कोई उत्पाद नहीं मिला",
    noProductsDesc: "आपके फ़िल्टर से मेल खाने वाले उत्पाद नहीं मिले।",
    inStockOnly: "केवल स्टॉक में", customerRating: "ग्राहक रेटिंग",
    priceRange: "मूल्य सीमा", brand: "ब्रांड", categories: "श्रेणियाँ",
    keyword: "खोज शब्द", availability: "उपलब्धता",
    addToCart: "बैग में जोड़ें", addedToCart: "बैग में जोड़ा",
    inStock: "स्टॉक में है", outOfStock: "आउट ऑफ स्टॉक",
    quickView: "त्वरित दृश्य", compare: "तुलना करें",
    cartTitle: "आपकी शॉपिंग कार्ट", checkout: "सुरक्षित चेकआउट",
    subtotal: "उपकुल", discount: "छूट", tax: "जीएसटी (18%)",
    shipping: "शिपिंग", total: "कुल", free: "मुफ़्त",
    promoCode: "प्रोमो कोड", apply: "लागू करें",
    emptyCart: "आपकी कार्ट खाली है", startShopping: "खरीदारी शुरू करें",
    removeItem: "हटाएं",
    wishlistTitle: "आपकी इच्छा सूची",
    wishlistDesc: "जो आइटम आपको पसंद हैं उन्हें यहाँ ट्रैक करें।",
    wishlistEmpty: "इच्छा सूची खाली है",
    wishlistEmptyDesc: "उत्पाद ब्राउज़ करें और दिल के आइकन पर क्लिक करें।",
    goShopping: "खरीदारी करें",
    compareTitle: "उत्पाद तुलना", compareDesc: "सर्वोत्तम खरीद निर्णय के लिए तुलना।",
    compareEmpty: "कोई उत्पाद चयनित नहीं",
    compareEmptyDesc: "कम से कम दो उत्पाद चुनें।",
    goToShop: "दुकान पर जाएं", features: "विशेषताएँ",
    checkoutTitle: "चेकआउट पूरा करें", shippingAddress: "शिपिंग पता",
    firstName: "पहला नाम", lastName: "अंतिम नाम", email: "ईमेल पता",
    streetAddress: "सड़क का पता", city: "शहर", pinCode: "पिन कोड",
    paymentMethod: "भुगतान विधि", cardDebit: "क्रेडिट / डेबिट कार्ड",
    upi: "यूपीआई / नेटबैंकिंग", cod: "कैश ऑन डिलीवरी",
    cardNumber: "कार्ड नंबर", expiry: "समाप्ति तिथि", cvv: "सीवीवी",
    authorizePayment: "सुरक्षित भुगतान अधिकृत करें", orderSummary: "ऑर्डर सारांश",
    grandTotal: "कुल राशि",
    orderSuccess: "ऑर्डर सफलतापूर्वक दिया गया!",
    orderSuccessDesc: "आपकी खरीद के लिए धन्यवाद। हम आपका ऑर्डर प्रोसेस कर रहे हैं।",
    orderId: "ऑर्डर आईडी", estDelivery: "अनुमानित डिलीवरी", totalPaid: "कुल भुगतान",
    continueShopping: "खरीदारी जारी रखें", backToHome: "होम पर वापस",
    adminTitle: "उत्पाद सूची प्रबंधक", addProduct: "नया उत्पाद जोड़ें",
    totalProducts: "कुल सक्रिय उत्पाद", monthlyRevenue: "मासिक राजस्व",
    activeCustomers: "सक्रिय ग्राहक", avgRating: "औसत रेटिंग",
    productRegistry: "उत्पाद कैटलॉग रजिस्ट्री", filterInventory: "सूची फ़िल्टर करें...",
    image: "छवि", productTitle: "उत्पाद शीर्षक", category: "श्रेणी",
    price: "कीमत", rating: "रेटिंग", actions: "क्रियाएँ",
    edit: "संपादित करें", delete: "हटाएं",
    aboutTitle: "AURA स्टोर के बारे में",
    aboutDesc: "हम आपके लिए सर्वोत्तम प्रीमियम उत्पाद लाने के लिए समर्पित हैं।",
    premiumQuality: "प्रीमियम गुणवत्ता", premiumDesc: "हम वैश्विक निर्माताओं के साथ साझेदारी करते हैं।",
    sustainable: "टिकाऊ सोर्सिंग", sustainableDesc: "नैतिक रूप से निर्मित उत्पाद।",
    secured: "सुरक्षित भुगतान", securedDesc: "उद्योग-मानक एन्क्रिप्शन 100% सुरक्षित खरीदारी सुनिश्चित करता है।",
    contactTitle: "संपर्क करें",
    contactDesc: "सवाल हैं? हमारी सपोर्ट टीम 24 घंटे में जवाब देगी।",
    name: "नाम", message: "संदेश", sendMessage: "संदेश भेजें",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    faq1q: "औसत डिलीवरी समय क्या है?",
    faq1a: "ऑर्डर 24 घंटे में प्रोसेस होते हैं। घरेलू डिलीवरी 3-5 कार्य दिवस।",
    faq2q: "क्या मैं उत्पाद वापस कर सकता हूँ?",
    faq2a: "हाँ, हम 30-दिन की वापसी नीति प्रदान करते हैं।",
    faq3q: "मैं अपना ऑर्डर कैसे ट्रैक करूँ?",
    faq3a: "शिपमेंट के बाद आपको एक ट्रैकिंग लिंक के साथ ईमेल मिलेगी।",
    footerDesc: "क्यूरेटेड, प्रीमियम जीवनशैली और फैशन आइटम का अनुभव करें।",
    quickLinks: "त्वरित लिंक", support: "सहायता", getApp: "ऐप डाउनलोड करें",
    faq: "सहायता", contactSupport: "सहायता से संपर्क करें", aboutUs: "हमारे बारे में",
    returnPolicy: "वापसी नीति", privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें", copyright: "2026 AURA स्टोर। सर्वाधिकार सुरक्षित।",
    newsletterTitle: "AURA क्लब में शामिल हों",
    newsletterDesc: "जल्दी पहुँच, सदस्य-केवल छूट के लिए सदस्यता लें।",
    subscribe: "सदस्यता लें", emailPlaceholder: "आपका ईमेल पता",
    flashDeals: "AURA फ्लैश डील", flashDesc: "समय समाप्त होने से पहले छूट पर उत्पाद पाएं!",
    trendingTitle: "ट्रेंडिंग उत्पाद", liveUpdates: "लाइव अपडेट",
    browseCategories: "श्रेणियाँ ब्राउज़ करें", viewAll: "सभी दुकान देखें",
    discoverCollection: "संग्रह खोजें",
    colorVariants: "रंग विकल्प", size: "आकार",
    estDeliveryModal: "अनुमानित डिलीवरी", easyReturns: "आसान वापसी",
    returnDays: "30-दिन की नीति", scanShare: "स्कैन और शेयर",
    scanDesc: "इस QR कोड को स्कैन करके उत्पाद देखें और शेयर करें!",
    copyLink: "लिंक कॉपी करें",
  },
  ESP: {
    navHome: "Inicio", navShop: "Tienda", navWishlist: "Lista de Deseos",
    navCompare: "Comparar", navAdmin: "Panel de Administrador",
    searchPlaceholder: "Buscar productos premium...",
    sidebarSearchPlaceholder: "Buscar artículo...",
    mobileSearchPlaceholder: "Buscar productos...",
    topSearchPlaceholder: "Buscar relojes, marcas, artículos de lujo…",
    recentSearches: "Búsquedas Recientes", suggestions: "Sugerencias",
    shopTitle: "Colección de Tienda", filterTitle: "Filtros",
    clearAll: "Borrar Todo", sortDefault: "Ordenar: Predeterminado",
    sortPriceLow: "Precio: Menor a Mayor", sortPriceHigh: "Precio: Mayor a Menor",
    sortRating: "Calificación: Mayor Primero", sortNewest: "Más Recientes",
    showingProducts: "Mostrando", products: "productos",
    loadMore: "Cargar Más Productos", noProducts: "No Se Encontraron Productos",
    noProductsDesc: "No encontramos productos con sus filtros.",
    inStockOnly: "Solo En Stock", customerRating: "Calificación del Cliente",
    priceRange: "Rango de Precio", brand: "Marca", categories: "Categorías",
    keyword: "Palabra clave", availability: "Disponibilidad",
    addToCart: "Añadir a la Bolsa", addedToCart: "Añadido a la Bolsa",
    inStock: "En Stock", outOfStock: "Agotado",
    quickView: "Vista Rápida", compare: "Comparar",
    cartTitle: "Tu Carrito de Compras", checkout: "Pago Seguro",
    subtotal: "Subtotal", discount: "Descuento", tax: "IVA (18%)",
    shipping: "Envío", total: "Total", free: "GRATIS",
    promoCode: "Código Promocional", apply: "Aplicar",
    emptyCart: "Tu carrito está vacío", startShopping: "Empezar a Comprar",
    removeItem: "Eliminar",
    wishlistTitle: "Tu Lista de Deseos",
    wishlistDesc: "Guarda los artículos que te gustan.",
    wishlistEmpty: "Tu Lista de Deseos está Vacía",
    wishlistEmptyDesc: "Navega y haz clic en el corazón para guardar.",
    goShopping: "Ir de Compras",
    compareTitle: "Comparar Productos", compareDesc: "Comparación lado a lado.",
    compareEmpty: "Ningún Producto Seleccionado",
    compareEmptyDesc: "Selecciona al menos dos productos.",
    goToShop: "Ir a la Tienda", features: "Características",
    checkoutTitle: "Completar Pago", shippingAddress: "Dirección de Envío",
    firstName: "Nombre", lastName: "Apellido", email: "Correo Electrónico",
    streetAddress: "Dirección", city: "Ciudad", pinCode: "Código Postal",
    paymentMethod: "Método de Pago", cardDebit: "Tarjeta de Crédito/Débito",
    upi: "Transferencia Bancaria", cod: "Pago Contra Entrega",
    cardNumber: "Número de Tarjeta", expiry: "Fecha de Vencimiento", cvv: "CVV",
    authorizePayment: "Autorizar Pago Seguro", orderSummary: "Resumen del Pedido",
    grandTotal: "Total General",
    orderSuccess: "¡Pedido Realizado con Éxito!",
    orderSuccessDesc: "Gracias por tu compra. Estamos procesando tu pedido.",
    orderId: "ID de Pedido", estDelivery: "Entrega Est.", totalPaid: "Total Pagado",
    continueShopping: "Continuar Comprando", backToHome: "Volver al Inicio",
    adminTitle: "Gestor de Inventario", addProduct: "Añadir Nuevo Producto",
    totalProducts: "Total de Productos Activos", monthlyRevenue: "Ingresos Mensuales",
    activeCustomers: "Clientes Activos", avgRating: "Calificación Promedio",
    productRegistry: "Registro de Catálogo", filterInventory: "Filtrar inventario...",
    image: "Imagen", productTitle: "Título del Producto", category: "Categoría",
    price: "Precio", rating: "Calificación", actions: "Acciones",
    edit: "Editar", delete: "Eliminar",
    aboutTitle: "Acerca de AURA Store",
    aboutDesc: "Dedicados a traerte productos premium de lujo.",
    premiumQuality: "Calidad Premium", premiumDesc: "Nos asociamos con fabricantes globales.",
    sustainable: "Abastecimiento Sostenible", sustainableDesc: "Artículos fabricados éticamente.",
    secured: "Pagos Seguros", securedDesc: "Cifrado estándar garantiza compras 100% seguras.",
    contactTitle: "Ponte en Contacto",
    contactDesc: "¿Preguntas? Nuestro equipo responde en 24 horas.",
    name: "Nombre", message: "Mensaje", sendMessage: "Enviar Mensaje",
    faqTitle: "Preguntas Frecuentes",
    faq1q: "¿Cuál es el tiempo de entrega promedio?",
    faq1a: "Los pedidos se procesan en 24h. Entrega doméstica 3-5 días hábiles.",
    faq2q: "¿Puedo devolver un producto?",
    faq2a: "Sí, ofrecemos política de devolución de 30 días.",
    faq3q: "¿Cómo rastreo mi pedido?",
    faq3a: "Recibirás un email con enlace de seguimiento único.",
    footerDesc: "Experimenta artículos de estilo de vida y moda premium.",
    quickLinks: "Links Rápidos", support: "Soporte", getApp: "Descargar App",
    faq: "FAQ", contactSupport: "Soporte", aboutUs: "Acerca de",
    returnPolicy: "Política de Devolución", privacyPolicy: "Política de Privacidad",
    termsOfService: "Términos de Servicio", copyright: "2026 AURA Store. Todos los derechos reservados.",
    newsletterTitle: "Únete al Club AURA",
    newsletterDesc: "Suscríbete para acceso anticipado y descuentos exclusivos.",
    subscribe: "Suscribirse", emailPlaceholder: "Tu dirección de email",
    flashDeals: "Ofertas Flash AURA", flashDesc: "¡Productos premium a precios increíbles!",
    trendingTitle: "Productos Tendencia", liveUpdates: "Actualizaciones en Vivo",
    browseCategories: "Explorar Categorías", viewAll: "Ver Todo",
    discoverCollection: "Descubrir Colección",
    colorVariants: "Variantes de Color", size: "Talla",
    estDeliveryModal: "Entrega Estimada", easyReturns: "Devoluciones Fáciles",
    returnDays: "Política de 30 días", scanShare: "Escanear y Compartir",
    scanDesc: "¡Escanea este QR para ver y compartir este producto!",
    copyLink: "Copiar Enlace",
  },
  FRA: {
    navHome: "Accueil", navShop: "Boutique", navWishlist: "Liste de Souhaits",
    navCompare: "Comparer", navAdmin: "Tableau de Bord Admin",
    searchPlaceholder: "Rechercher des produits premium...",
    sidebarSearchPlaceholder: "Rechercher...",
    mobileSearchPlaceholder: "Rechercher...",
    topSearchPlaceholder: "Rechercher montres, marques, articles de luxe…",
    recentSearches: "Recherches Récentes", suggestions: "Suggestions",
    shopTitle: "Collection Boutique", filterTitle: "Filtres",
    clearAll: "Effacer Tout", sortDefault: "Trier: Défaut",
    sortPriceLow: "Prix: Croissant", sortPriceHigh: "Prix: Décroissant",
    sortRating: "Note: Plus Haute", sortNewest: "Plus Récents",
    showingProducts: "Affichage de", products: "produits",
    loadMore: "Charger Plus", noProducts: "Aucun Produit Trouvé",
    noProductsDesc: "Aucun produit ne correspond à vos filtres.",
    inStockOnly: "En Stock Seulement", customerRating: "Note Client",
    priceRange: "Plage de Prix", brand: "Marque", categories: "Catégories",
    keyword: "Mot-clé", availability: "Disponibilité",
    addToCart: "Ajouter au Sac", addedToCart: "Ajouté au Sac",
    inStock: "En Stock", outOfStock: "Rupture de Stock",
    quickView: "Aperçu Rapide", compare: "Comparer",
    cartTitle: "Votre Panier", checkout: "Paiement Sécurisé",
    subtotal: "Sous-total", discount: "Réduction", tax: "TVA (18%)",
    shipping: "Livraison", total: "Total", free: "GRATUIT",
    promoCode: "Code Promo", apply: "Appliquer",
    emptyCart: "Votre panier est vide", startShopping: "Commencer les Achats",
    removeItem: "Supprimer",
    wishlistTitle: "Votre Liste de Souhaits",
    wishlistDesc: "Suivez les articles que vous aimez.",
    wishlistEmpty: "Votre Liste est Vide",
    wishlistEmptyDesc: "Parcourez nos produits et cliquez sur le cœur.",
    goShopping: "Faire du Shopping",
    compareTitle: "Comparer les Produits", compareDesc: "Comparaison côte à côte.",
    compareEmpty: "Aucun Produit Sélectionné",
    compareEmptyDesc: "Sélectionnez au moins deux produits.",
    goToShop: "Aller à la Boutique", features: "Caractéristiques",
    checkoutTitle: "Finaliser la Commande", shippingAddress: "Adresse de Livraison",
    firstName: "Prénom", lastName: "Nom", email: "Adresse Email",
    streetAddress: "Adresse", city: "Ville", pinCode: "Code Postal",
    paymentMethod: "Mode de Paiement", cardDebit: "Carte de Crédit/Débit",
    upi: "Virement Bancaire", cod: "Paiement à la Livraison",
    cardNumber: "Numéro de Carte", expiry: "Date d'Expiration", cvv: "CVV",
    authorizePayment: "Autoriser le Paiement", orderSummary: "Résumé de Commande",
    grandTotal: "Total Général",
    orderSuccess: "Commande Passée avec Succès!",
    orderSuccessDesc: "Merci pour votre achat. Nous traitons votre commande.",
    orderId: "ID Commande", estDelivery: "Livraison Est.", totalPaid: "Total Payé",
    continueShopping: "Continuer les Achats", backToHome: "Retour à l'Accueil",
    adminTitle: "Gestionnaire d'Inventaire", addProduct: "Ajouter un Produit",
    totalProducts: "Total Produits Actifs", monthlyRevenue: "Revenus Mensuels",
    activeCustomers: "Clients Actifs", avgRating: "Note Moyenne",
    productRegistry: "Registre du Catalogue", filterInventory: "Filtrer l'inventaire...",
    image: "Image", productTitle: "Titre du Produit", category: "Catégorie",
    price: "Prix", rating: "Note", actions: "Actions",
    edit: "Modifier", delete: "Supprimer",
    aboutTitle: "À Propos d'AURA Store",
    aboutDesc: "Dédiés à vous apporter des produits premium de luxe.",
    premiumQuality: "Qualité Premium", premiumDesc: "Nous nous associons à des fabricants mondiaux.",
    sustainable: "Approvisionnement Durable", sustainableDesc: "Articles fabriqués éthiquement.",
    secured: "Paiements Sécurisés", securedDesc: "Chiffrement standard pour des achats 100% sûrs.",
    contactTitle: "Nous Contacter",
    contactDesc: "Des questions? Notre équipe répond sous 24h.",
    name: "Nom", message: "Message", sendMessage: "Envoyer le Message",
    faqTitle: "Questions Fréquentes",
    faq1q: "Quel est le délai de livraison moyen?",
    faq1a: "Commandes traitées sous 24h. Livraison 3-5 jours ouvrables.",
    faq2q: "Puis-je retourner un produit?",
    faq2a: "Oui, politique de retour de 30 jours.",
    faq3q: "Comment suivre ma commande?",
    faq3a: "Vous recevrez un email avec un lien de suivi.",
    footerDesc: "Découvrez des articles de mode et de style de vie premium.",
    quickLinks: "Liens Rapides", support: "Support", getApp: "Télécharger l'App",
    faq: "FAQ", contactSupport: "Support", aboutUs: "À Propos",
    returnPolicy: "Politique de Retour", privacyPolicy: "Politique de Confidentialité",
    termsOfService: "Conditions d'Utilisation", copyright: "2026 AURA Store. Tous droits réservés.",
    newsletterTitle: "Rejoignez le Club AURA",
    newsletterDesc: "Abonnez-vous pour un accès anticipé et des remises exclusives.",
    subscribe: "S'abonner", emailPlaceholder: "Votre adresse email",
    flashDeals: "Offres Flash AURA", flashDesc: "Produits premium à prix incroyables!",
    trendingTitle: "Produits Tendance", liveUpdates: "Mises à Jour en Direct",
    browseCategories: "Parcourir les Catégories", viewAll: "Voir Tout",
    discoverCollection: "Découvrir la Collection",
    colorVariants: "Variantes de Couleur", size: "Taille",
    estDeliveryModal: "Livraison Estimée", easyReturns: "Retours Faciles",
    returnDays: "Politique 30 Jours", scanShare: "Scanner et Partager",
    scanDesc: "Scannez ce QR code pour voir et partager ce produit!",
    copyLink: "Copier le Lien",
  }
};

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  state.language = lang;
  localStorage.setItem("aura_language", lang);
  const t = TRANSLATIONS[lang];

  // ── Dropdown button label ──
  const activeBtn = document.getElementById("active-language");
  if (activeBtn) activeBtn.textContent = lang;

  // ── Mobile drawer button highlights ──
  document.querySelectorAll(".mobile-lang-opt").forEach(btn => {
    if (btn.getAttribute("data-lang") === lang) {
      btn.className = "mobile-lang-opt px-2 py-1 rounded border border-brand-primary text-[10px] font-bold text-brand-primary bg-brand-primary/5";
    } else {
      btn.className = "mobile-lang-opt px-2 py-1 rounded border border-themeText-muted/20 text-[10px] font-bold hover:border-brand-primary";
    }
  });

  // ── Helper: safe set text ──
  const setText = (sel, text) => {
    document.querySelectorAll(sel).forEach(el => { el.textContent = text; });
  };
  const setHTML = (sel, html) => {
    document.querySelectorAll(sel).forEach(el => { el.innerHTML = html; });
  };
  const setAttr = (id, attr, val) => {
    const el = document.getElementById(id);
    if (el) el[attr] = val;
  };

  // ── Search placeholders ──
  setAttr("global-search-input",    "placeholder", t.searchPlaceholder);
  setAttr("mobile-search-input",    "placeholder", t.mobileSearchPlaceholder);
  setAttr("sidebar-search-input",   "placeholder", t.sidebarSearchPlaceholder);
  setAttr("top-search-input",       "placeholder", t.topSearchPlaceholder);
  setAttr("admin-search-input",     "placeholder", t.filterInventory);

  // ── Navigation links ──
  document.querySelectorAll('[data-link="home"]').forEach(el => el.textContent = t.navHome);
  document.querySelectorAll('[data-link="shop"]').forEach(el => el.textContent = t.navShop);
  document.querySelectorAll('[data-link="wishlist"]').forEach(el => el.textContent = t.navWishlist);
  document.querySelectorAll('[data-link="compare"]').forEach(el => el.textContent = t.navCompare);
  document.querySelectorAll('[data-link="admin"]').forEach(el => el.textContent = t.navAdmin);

  // ── Mobile nav links ──
  document.querySelectorAll('.mobile-nav-link').forEach(a => {
    const href = a.getAttribute('href');
    const map = { '#home': t.navHome, '#shop': t.navShop, '#wishlist': t.navWishlist, '#compare': t.navCompare, '#admin': t.navAdmin };
    if (map[href]) {
      const icon = a.querySelector('i');
      if (icon) {
        a.innerHTML = '';
        a.appendChild(icon);
        a.append(' ' + map[href]);
      }
    }
  });

  // ── Shop view ──
  const shopTitle = document.querySelector("#shop-view h1");
  if (shopTitle) shopTitle.textContent = t.shopTitle;

  const sortSel = document.getElementById("sort-select");
  if (sortSel) {
    sortSel.options[0].text = t.sortDefault;
    sortSel.options[1].text = t.sortPriceLow;
    sortSel.options[2].text = t.sortPriceHigh;
    sortSel.options[3].text = t.sortRating;
    sortSel.options[4].text = t.sortNewest;
  }

  // ── Filter sidebar ──
  const filterHeader = document.querySelector("#filter-sidebar h3");
  if (filterHeader) filterHeader.innerHTML = `<i class="fa-solid fa-sliders text-brand-primary mr-2"></i> ${t.filterTitle}`;

  const clearBtn = document.getElementById("clear-filters-btn");
  if (clearBtn) clearBtn.textContent = t.clearAll;

  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) loadMoreBtn.innerHTML = `${t.loadMore} <i class="fa-solid fa-rotate"></i>`;

  const mobileClearBtn = document.getElementById("mobile-filter-clear-btn");
  if (mobileClearBtn) mobileClearBtn.textContent = t.clearAll;

  // Sidebar section headings
  document.querySelectorAll("#filter-sidebar h4").forEach((h, i) => {
    const labels = [t.keyword, t.categories, t.priceRange, t.brand, t.customerRating, t.availability];
    if (labels[i]) h.textContent = labels[i];
  });

  const stockLabel = document.querySelector('label[for="stock-filter"] span');
  if (stockLabel) stockLabel.textContent = t.inStockOnly;

  // ── Cart drawer ──
  const cartTitle = document.querySelector("#cart-drawer h2");
  if (cartTitle) cartTitle.textContent = t.cartTitle;

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) checkoutBtn.innerHTML = `${t.checkout} <i class="fa-solid fa-arrow-right"></i>`;

  document.querySelectorAll("#cart-drawer .space-y-2 span:first-child").forEach((el, i) => {
    const labels = [t.subtotal, t.discount, t.tax, t.shipping, t.total];
    if (labels[i]) el.textContent = labels[i];
  });

  setAttr("coupon-input", "placeholder", `${t.promoCode}`);
  const applyBtn = document.getElementById("apply-coupon-btn");
  if (applyBtn) applyBtn.textContent = t.apply;

  // ── Wishlist view ──
  const wishTitle = document.querySelector("#wishlist-view h1");
  if (wishTitle) wishTitle.textContent = t.wishlistTitle;
  const wishDesc = document.querySelector("#wishlist-view p");
  if (wishDesc) wishDesc.textContent = t.wishlistDesc;
  const wishEmptyTitle = document.querySelector("#wishlist-empty-state h3");
  if (wishEmptyTitle) wishEmptyTitle.textContent = t.wishlistEmpty;
  const wishEmptyDesc = document.querySelector("#wishlist-empty-state p");
  if (wishEmptyDesc) wishEmptyDesc.textContent = t.wishlistEmptyDesc;
  const wishGoBtn = document.querySelector("#wishlist-empty-state a");
  if (wishGoBtn) wishGoBtn.textContent = t.goShopping;

  // ── Compare view ──
  const compTitle = document.querySelector("#compare-view h1");
  if (compTitle) compTitle.textContent = t.compareTitle;
  const compDesc = document.querySelector("#compare-view p");
  if (compDesc) compDesc.textContent = t.compareDesc;
  const compEmptyTitle = document.querySelector("#compare-empty-state h3");
  if (compEmptyTitle) compEmptyTitle.textContent = t.compareEmpty;
  const compEmptyDesc = document.querySelector("#compare-empty-state p");
  if (compEmptyDesc) compEmptyDesc.textContent = t.compareEmptyDesc;
  const compGoBtn = document.querySelector("#compare-empty-state a");
  if (compGoBtn) compGoBtn.textContent = t.goToShop;
  const featTh = document.querySelector("#compare-table-headers th:first-child");
  if (featTh) featTh.textContent = t.features;

  // ── Checkout view ──
  const chkTitle = document.querySelector("#checkout-view h1");
  if (chkTitle) chkTitle.textContent = t.checkoutTitle;
  const authBtn = document.querySelector("#checkout-form button[type='submit']");
  if (authBtn) authBtn.innerHTML = `<i class="fa-solid fa-lock"></i> ${t.authorizePayment}`;
  const ordSummTitle = document.querySelector("#checkout-view .lg\\:col-span-4 h3");
  if (ordSummTitle) ordSummTitle.textContent = t.orderSummary;

  // Checkout form labels
  document.querySelectorAll("#checkout-form label").forEach(lbl => {
    const forAttr = lbl.getAttribute("for") || lbl.textContent.trim().toLowerCase();
    const input = lbl.nextElementSibling;
    if (!input) return;
    const ph = input.getAttribute("placeholder") || "";
    if (ph.toLowerCase().includes("first") || lbl.textContent.includes("First")) lbl.textContent = t.firstName;
    else if (ph.toLowerCase().includes("last") || lbl.textContent.includes("Last")) lbl.textContent = t.lastName;
    else if (ph.toLowerCase().includes("email") || lbl.textContent.includes("Email")) lbl.textContent = t.email;
    else if (ph.toLowerCase().includes("street") || lbl.textContent.includes("Street")) lbl.textContent = t.streetAddress;
    else if (ph.toLowerCase().includes("city") || lbl.textContent.includes("City")) lbl.textContent = t.city;
    else if (ph.toLowerCase().includes("pin") || lbl.textContent.includes("PIN")) lbl.textContent = t.pinCode;
  });

  // Payment labels
  document.querySelectorAll('input[name="payment-method"]').forEach(r => {
    const label = r.closest("label");
    if (!label) return;
    const spans = label.querySelectorAll("span");
    const val = r.value;
    if (val === "card" && spans[1]) spans[1].textContent = t.cardDebit;
    if (val === "upi" && spans[1]) spans[1].textContent = t.upi;
    if (val === "cod" && spans[1]) spans[1].textContent = t.cod;
  });

  // ── Success view ──
  const succTitle = document.querySelector("#success-view h1");
  if (succTitle) succTitle.textContent = t.orderSuccess;
  const succDesc = document.querySelector("#success-view p");
  if (succDesc) succDesc.textContent = t.orderSuccessDesc;
  document.querySelectorAll("#success-view .space-y-3 span:first-child").forEach((el, i) => {
    const labels = [t.orderId, t.estDelivery, t.totalPaid];
    if (labels[i]) el.textContent = labels[i];
  });
  const contBtn = document.querySelector("#success-view a[href='#shop']");
  if (contBtn) contBtn.textContent = t.continueShopping;
  const backBtn = document.querySelector("#success-view a[href='#home']");
  if (backBtn) backBtn.textContent = t.backToHome;

  // ── Admin view ──
  const adminTitle = document.querySelector("#admin-view h1");
  if (adminTitle) adminTitle.textContent = t.adminTitle;
  const addProdBtn = document.getElementById("add-product-modal-btn");
  if (addProdBtn) addProdBtn.innerHTML = `<i class="fa-solid fa-plus"></i> ${t.addProduct}`;
  const adminRegTitle = document.querySelector("#admin-view .glass-card h3");
  if (adminRegTitle) adminRegTitle.textContent = t.productRegistry;
  document.querySelectorAll("#admin-product-table-body").forEach(() => {});
  const adminThead = document.querySelectorAll("#admin-view table thead th");
  const adminCols = [t.image, t.productTitle, t.category, t.price, t.rating, t.actions];
  adminThead.forEach((th, i) => { if (adminCols[i]) th.textContent = adminCols[i]; });
  const adminStats = document.querySelectorAll("#admin-view .glass-card p.text-xs");
  const statLabels = [t.totalProducts, t.monthlyRevenue, t.activeCustomers, t.avgRating];
  adminStats.forEach((p, i) => { if (statLabels[i]) p.textContent = statLabels[i]; });

  // ── About view ──
  const aboutTitle = document.querySelector("#about-view h1");
  if (aboutTitle) aboutTitle.textContent = t.aboutTitle;
  const aboutDesc = document.querySelector("#about-view p");
  if (aboutDesc) aboutDesc.textContent = t.aboutDesc;
  const aboutCards = document.querySelectorAll("#about-view .glass-card");
  if (aboutCards[0]) { aboutCards[0].querySelector("h3").textContent = t.premiumQuality; aboutCards[0].querySelector("p").textContent = t.premiumDesc; }
  if (aboutCards[1]) { aboutCards[1].querySelector("h3").textContent = t.sustainable; aboutCards[1].querySelector("p").textContent = t.sustainableDesc; }
  if (aboutCards[2]) { aboutCards[2].querySelector("h3").textContent = t.secured; aboutCards[2].querySelector("p").textContent = t.securedDesc; }

  // ── Contact view ──
  const contTitle = document.querySelector("#contact-view h1");
  if (contTitle) contTitle.textContent = t.contactTitle;
  const contDesc = document.querySelector("#contact-view > div > div > div > p");
  if (contDesc) contDesc.textContent = t.contactDesc;
  const sendBtn = document.querySelector("#contact-form button[type='submit']");
  if (sendBtn) sendBtn.textContent = t.sendMessage;
  document.querySelectorAll("#contact-form label").forEach(lbl => {
    const txt = lbl.textContent.trim();
    if (txt === "Name" || txt === "नाम" || txt === "Nombre" || txt === "Nom") lbl.textContent = t.name;
    else if (txt.toLowerCase().includes("email")) lbl.textContent = t.email;
    else if (txt === "Message") lbl.textContent = t.message;
  });

  // ── FAQ view ──
  const faqTitle = document.querySelector("#faq-view h1");
  if (faqTitle) faqTitle.textContent = t.faqTitle;
  const faqItems = document.querySelectorAll("#faq-accordion > div");
  const faqData = [[t.faq1q, t.faq1a], [t.faq2q, t.faq2a], [t.faq3q, t.faq3a]];
  faqItems.forEach((item, i) => {
    if (!faqData[i]) return;
    const btn = item.querySelector("button span:first-child");
    const ans = item.querySelector("div p");
    if (btn) btn.textContent = faqData[i][0];
    if (ans) ans.textContent = faqData[i][1];
  });

  // ── Flash sale ──
  const flashTitle = document.querySelector(".glass-card h2");
  if (flashTitle) flashTitle.textContent = t.flashDeals;

  // ── Trending section ──
  const trendTitle = document.querySelector("#home-view .trending-swiper")?.closest("div")?.previousElementSibling?.querySelector("h2");
  if (trendTitle) trendTitle.textContent = t.trendingTitle;

  // ── Categories ──
  const catTitle = document.querySelector("#categories-grid")?.previousElementSibling?.previousElementSibling?.querySelector("h2");
  const viewAllLink = document.querySelector("#categories-grid")?.previousElementSibling?.previousElementSibling?.querySelector("a");
  if (catTitle) catTitle.textContent = t.browseCategories;
  if (viewAllLink) viewAllLink.textContent = `${t.viewAll} `;

  // ── Newsletter ──
  const newsTitle = document.querySelector("#home-view .relative h3");
  const newsDesc = document.querySelector("#home-view .relative p");
  const newsBtn = document.querySelector("#newsletter-form button");
  const newsInput = document.querySelector("#newsletter-form input");
  if (newsTitle) newsTitle.textContent = t.newsletterTitle;
  if (newsDesc) newsDesc.textContent = t.newsletterDesc;
  if (newsBtn) newsBtn.textContent = t.subscribe;
  if (newsInput) newsInput.placeholder = t.emailPlaceholder;

  // ── Footer ──
  const footerDesc = document.querySelector("footer p.text-sm");
  if (footerDesc) footerDesc.textContent = t.footerDesc;
  const footerCopy = document.querySelector("footer span");
  if (footerCopy) footerCopy.textContent = `© ${t.copyright}`;

  document.querySelectorAll("footer h4").forEach((h, i) => {
    const labels = [t.quickLinks, t.support, t.getApp];
    if (labels[i]) h.textContent = labels[i];
  });

  // ── Quick view modal labels ──
  const colorVariantsLabel = document.querySelector("#quick-view-colors")?.previousElementSibling;
  if (colorVariantsLabel) colorVariantsLabel.textContent = t.colorVariants;
  const sizeLabel = document.querySelector("#quick-view-sizes")?.previousElementSibling;
  if (sizeLabel) sizeLabel.textContent = t.size;

  // ── Suggestions panel headings ──
  const suggHead = document.querySelector("#search-suggestions .text-xs:first-child");
  if (suggHead) suggHead.textContent = t.suggestions;
  const recentHead = document.querySelector("#search-suggestions hr + div .text-xs");
  if (recentHead) recentHead.textContent = t.recentSearches;

  // ── Top search band tags ──
  const topInp = document.getElementById("top-search-input");
  if (topInp) topInp.placeholder = t.topSearchPlaceholder;

  // ── Re-render dynamic views ──
  renderBreadcrumbs();
  // Apply product name/description translations
  applyProductTranslations(lang);
  if (state.currentView === "#shop") renderProductGrid();
  if (state.currentView === "#wishlist") renderWishlist();
  if (state.currentView === "#compare") renderCompare();
}

// buildColorFilter — converts a hex swatch color to a CSS filter chain
// that tints ONLY the product image pixels, leaving white backgrounds untouched.
function buildColorFilter(hex) {
  const h = (hex || "").toLowerCase().trim();
  // Black / very dark
  if (["#000000","#1e293b","#111827","#0f172a","#2b2b2b"].includes(h))
    return "grayscale(1) brightness(0.18) contrast(1.3)";
  // White / silver / cream
  if (["#ffffff","#f8fafc","#e2e8f0","#fcfaf7"].includes(h))
    return "grayscale(1) brightness(1.8) contrast(0.65) saturate(0)";
  // Grey / slate
  if (["#374151","#64748b","#94a3b8","#6b7280"].includes(h))
    return "grayscale(1) brightness(0.6) contrast(1.1)";
  // Red
  if (["#ef4444","#dc2626","#b91c1c"].includes(h))
    return "sepia(1) saturate(8) hue-rotate(315deg) brightness(0.88)";
  // Blue
  if (["#3b82f6","#2563eb","#1d4ed8"].includes(h))
    return "sepia(1) saturate(8) hue-rotate(183deg) brightness(0.82)";
  // Teal
  if (["#0f766e","#0d9488","#14b8a6"].includes(h))
    return "sepia(1) saturate(6) hue-rotate(148deg) brightness(0.78)";
  // Green
  if (["#10b981","#059669","#16a34a"].includes(h))
    return "sepia(1) saturate(6) hue-rotate(112deg) brightness(0.82)";
  // Gold / amber
  if (["#fbbf24","#f59e0b","#d97706"].includes(h))
    return "sepia(1) saturate(5) hue-rotate(12deg) brightness(1.05)";
  // Brown
  if (["#b45309","#92400e","#78350f","#5a4634"].includes(h))
    return "sepia(1) saturate(3) hue-rotate(0deg) brightness(0.58) contrast(1.4)";
  // Orange
  if (["#f97316","#ea580c"].includes(h))
    return "sepia(1) saturate(8) hue-rotate(335deg) brightness(0.92)";
  // Pink
  if (["#f472b6","#fb7185","#f9a8d4"].includes(h))
    return "sepia(1) saturate(8) hue-rotate(295deg) brightness(1.05)";
  // Hot pink / magenta
  if (["#ec4899","#db2777"].includes(h))
    return "sepia(1) saturate(9) hue-rotate(282deg) brightness(0.88)";
  // Purple / violet
  if (["#a855f7","#7c3aed","#6d28d9","#831843"].includes(h))
    return "sepia(1) saturate(8) hue-rotate(252deg) brightness(0.78)";

  // Generic fallback from hex math
  const r = parseInt(h.slice(1,3),16)||0, g = parseInt(h.slice(3,5),16)||0, b = parseInt(h.slice(5,7),16)||0;
  const deg = Math.round(Math.atan2(Math.sqrt(3)*(g-b), 2*r-g-b) * (180/Math.PI) + 360) % 360;
  return `sepia(1) saturate(6) hue-rotate(${deg}deg) brightness(0.88)`;
}

// ── Premium Ripple Effect — attaches to every button on the page ──
function initButtonRipples() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("button, .ripple-btn");
    if (!btn) return;

    // Skip tiny icon-only buttons where ripple looks odd
    const w = btn.offsetWidth;
    if (w < 28) return;

    const ripple = document.createElement("span");
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(w, btn.offsetHeight) * 2;
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;

    ripple.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      left:${x}px; top:${y}px;
      border-radius:50%;
      background:rgba(200,169,106,0.28);
      pointer-events:none;
      transform:scale(0);
      animation:btn-ripple 0.55s ease-out forwards;
      z-index:99;
    `;

    // Ensure button has relative+overflow for the ripple to show
    const pos = window.getComputedStyle(btn).position;
    if (pos === "static") btn.style.position = "relative";
    btn.style.overflow = "hidden";

    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });
}

// Start the Application
window.addEventListener("DOMContentLoaded", () => {
  initApp();
  initButtonRipples();
});


// ============================================================
// PRODUCT TRANSLATIONS — names & descriptions per language
// Key = product ID. ENG = original (used to reset).
// ============================================================
const PRODUCT_TRANSLATIONS = {
  // ── FALLBACK / LOCAL PREMIUM — Electronics ──
  101: {
    HIN: { title: "ऑरा नॉइज़-कैंसेलिंग हेडफोन", description: "हमारे सिग्नेचर एक्टिव नॉइज़-कैंसेलिंग हेडफोन से पूर्ण शांति का अनुभव करें। मेमोरी फोम ईयरकप और 40 घंटे की बैटरी लाइफ के साथ।" },
    ESP: { title: "Auriculares Aura con Cancelación de Ruido", description: "Experimenta el silencio absoluto con nuestros auriculares de cancelación de ruido activa. Con almohadillas de espuma viscoelástica y 40 horas de batería." },
    FRA: { title: "Casque Aura à Réduction de Bruit", description: "Plongez dans le silence absolu avec nos écouteurs à réduction de bruit active. Coussinets en mousse à mémoire de forme et 40h de batterie." }
  },
  102: {
    HIN: { title: "क्वांटम स्मार्ट वॉच सीरीज़ X", description: "हमेशा-ऑन AMOLED डिस्प्ले, ECG मॉनिटरिंग और GPS के साथ फ्यूचरिस्टिक हेल्थ और फिटनेस ट्रैकर।" },
    ESP: { title: "Quantum Smart Watch Serie X", description: "Rastreador de salud futurista con pantalla AMOLED, monitoreo ECG y GPS incorporado." },
    FRA: { title: "Quantum Montre Connectée Série X", description: "Tracker de santé futuriste avec écran AMOLED toujours allumé, surveillance ECG et GPS intégré." }
  },
  103: {
    HIN: { title: "मिनिमलिस्ट लेदर बैकपैक", description: "फुल-ग्रेन वेजिटेबल-टैन्ड लेदर से हस्तनिर्मित। 15 इंच लैपटॉप स्लीव और वेदर-रेसिस्टेंट जिपर के साथ।" },
    ESP: { title: "Mochila de Cuero Minimalista", description: "Fabricada a mano en cuero full-grain. Con funda para portátil de 15 pulgadas y cremalleras resistentes al agua." },
    FRA: { title: "Sac à Dos en Cuir Minimaliste", description: "Fabriqué à la main en cuir pleine fleur tanné végétal. Housse pour ordinateur 15 pouces et fermetures éclair résistantes aux intempéries." }
  },
  104: {
    HIN: { title: "एलिज़ियन सिल्क समर ड्रेस", description: "100% शुद्ध मलबेरी सिल्क से बनी फ्लोई, एलिगेंट ड्रेस। सूक्ष्म फ्लोरल पैटर्न और कम्फर्टेबल इलास्टिक कमरबंद के साथ।" },
    ESP: { title: "Vestido de Verano de Seda Elysian", description: "Vestido fluido y elegante de seda de morera 100% pura. Patrón floral sutil y cintura elástica cómoda." },
    FRA: { title: "Robe d'Été en Soie Elysian", description: "Robe fluide et élégante en soie de mûrier 100% pure. Motif floral subtil et ceinture élastique confortable." }
  },
  105: {
    HIN: { title: "ज्योमेट्रिक गोल्ड पेंडेंट नेकलेस", description: "18k सॉलिड येलो गोल्ड हाथ-पॉलिश ज्योमेट्रिक पेंडेंट वाला एलिगेंट नेकलेस। 18 इंच की एडजस्टेबल चेन के साथ।" },
    ESP: { title: "Collar con Colgante de Oro Geométrico", description: "Elegante collar de oro amarillo sólido de 18k con colgante geométrico pulido a mano. Incluye cadena ajustable de 18 pulgadas." },
    FRA: { title: "Collier Pendentif Or Géométrique", description: "Élégant collier en or jaune massif 18k avec pendentif géométrique poli à la main. Livré avec une chaîne réglable de 45 cm." }
  },
  106: {
    HIN: { title: "एपेक्स मैकेनिकल कीबोर्ड", description: "हॉट-स्वैपेबल लीनियर स्विच, डबल-शॉट PBT कीकैप और कस्टमाइज़ेबल RGB बैकलाइटिंग के साथ 75% लेआउट मैकेनिकल कीबोर्ड।" },
    ESP: { title: "Teclado Mecánico Apex", description: "Teclado mecánico 75% con switches lineales intercambiables en caliente, teclas PBT y retroiluminación RGB personalizable." },
    FRA: { title: "Clavier Mécanique Apex", description: "Clavier mécanique 75% avec switches linéaires hot-swap, touches PBT double-shot et rétroéclairage RGB personnalisable." }
  },
  // ── Men's Clothing ──
  201: {
    HIN: { title: "ऑरा स्लिम-फिट स्ट्रेच चिनो", description: "प्रीमियम स्ट्रेच कॉटन ट्विल से बने क्लासिक स्लिम-फिट चिनो। स्मार्ट-कैज़ुअल वियर के लिए आदर्श।" },
    ESP: { title: "Chinos Slim-Fit Aura Elásticos", description: "Chinos clásicos de corte slim confeccionados en sarga de algodón elástico premium. Ideales para looks smart-casual." },
    FRA: { title: "Chinos Slim-Fit Élastique Aura", description: "Chinos classiques coupe slim en sergé de coton élastique premium. Parfaits pour un style smart-casual." }
  },
  202: {
    HIN: { title: "प्रीमियम मेरिनो वूल स्वेटर", description: "100% फाइन मेरिनो वूल से बुना हुआ स्वेटर। बेहद मुलायम, ब्रेदेबल और तापमान-नियंत्रण करने वाला।" },
    ESP: { title: "Jersey Premium de Lana Merino", description: "Indulge en el lujo cálido de nuestra suéter tejida en 100% lana merina fina. Súper suave, transpirable y reguladora de temperatura." },
    FRA: { title: "Pull Premium en Laine Mérinos", description: "Profitez d'une chaleur luxueuse avec notre pull tricoté en laine mérinos fine 100%. Ultra-doux, respirant et thermorégulateur." }
  },
  218: {
    HIN: { title: "क्लासिक ऑक्सफ़ोर्ड कॉटन शर्ट", description: "100% प्रीमियम लॉन्ग-स्टेपल कॉटन से बुनी ऑक्सफ़ोर्ड शर्ट। बटन-डाउन कॉलर और सिग्नेचर लोगो एम्ब्रॉयडरी के साथ।" },
    ESP: { title: "Camisa Oxford de Algodón Clásica", description: "Camisa Oxford confeccionada en algodón de fibra larga 100% premium. Acabada con cuello con botones y bordado del logo." },
    FRA: { title: "Chemise Oxford en Coton Classique", description: "Chemise Oxford tissée en coton longue fibre 100% premium. Finitions col boutonné et broderie du logo signature." }
  },
  219: {
    HIN: { title: "अर्बनाइट स्लिम-फिट डेनिम जींस", description: "मॉडर्न स्लिम फिट के साथ क्लासिक 5-पॉकेट डेनिम जींस। टिकाऊ कॉपर रिवेट और प्रीमियम वॉश के साथ।" },
    ESP: { title: "Jeans Denim Slim-Fit Urbanite", description: "Jeans vaqueros clásicos de 5 bolsillos con corte slim moderno. Remaches de cobre duraderos y lavados premium." },
    FRA: { title: "Jean Denim Slim-Fit Urbanite", description: "Jean classique 5 poches avec une coupe slim moderne. Rivets en cuivre durables et lavages premium." }
  },
  220: {
    HIN: { title: "नोमैड वाटरप्रूफ ट्रेल पार्का", description: "वॉटरप्रूफ, विंडप्रूफ मेम्ब्रेन, फ्लीस लाइनिंग, एडजस्टेबल हुड और यूटिलिटी पॉकेट के साथ हेवी-ड्यूटी आउटडोर पार्का।" },
    ESP: { title: "Parka Trail Impermeable Nomad", description: "Parka outdoor resistente con membrana impermeable y cortavientos, forro polar, capucha ajustable y bolsillos utilitarios." },
    FRA: { title: "Parka Trail Imperméable Nomad", description: "Parka outdoor robuste avec membrane imperméable et coupe-vent, doublure polaire, capuche réglable et poches utilitaires." }
  },
  221: {
    HIN: { title: "क्लासिक को. क्रूनेक टी-शर्ट", description: "अल्ट्रा-सॉफ्ट कॉम्बड रिंग-स्पन कॉटन से बनी एसेंशियल डेली क्रूनेक टी। प्री-श्रंक फॉर परफेक्ट फिट।" },
    ESP: { title: "Camiseta Cuello Redondo Classic Co.", description: "Camiseta básica de cuello redondo confeccionada en algodón peinado hilado en anillo ultra suave. Pre-encogida para un ajuste perfecto." },
    FRA: { title: "T-Shirt Col Rond Classic Co.", description: "T-shirt basique col rond en coton peigné filé en anneau ultra-doux. Pré-rétréci pour un ajustement parfait." }
  },
  // ── Women's Clothing ──
  203: {
    HIN: { title: "क्लासिक डबल-ब्रेस्टेड ट्रेंच कोट", description: "वॉटर-रेपेलेंट गैबार्डिन से बनी टाइमलेस आउटर लेयर। कमर-डिफाइनिंग बेल्ट और सिग्नेचर हॉर्न बटन के साथ।" },
    ESP: { title: "Gabardina Cruzada Clásica de Mujer", description: "Capa exterior atemporal confeccionada en gabardina repelente al agua. Con cinturón que define la cintura y botones de cuerno." },
    FRA: { title: "Trench-Coat Croisé Classique Femme", description: "Couche extérieure intemporelle taillée dans un gabardine déperlant. Ceinture ajustable et boutons en corne signature." }
  },
  204: {
    HIN: { title: "एलिज़ियन सिल्क रैप ब्लाउज़", description: "लग्ज़री मलबेरी सिल्क से बना एलिगेंट रैप ब्लाउज़। फ्लैटरिंग V-नेकलाइन और ड्रेप्ड बिशप स्लीव के साथ।" },
    ESP: { title: "Blusa Cruzada de Seda Elysian", description: "Elegante blusa cruzada confeccionada en lujosa seda de morera. Con escote en V favorecedor y mangas obispo drapeadas." },
    FRA: { title: "Blouse Croisée en Soie Elysian", description: "Blouse croisée élégante confectionnée en luxueuse soie de mûrier. Décolleté en V flatteur et manches bouffantes drapées." }
  },
  222: {
    HIN: { title: "एलिज़ियन लिनन समर ब्लेज़र", description: "शुद्ध बेल्जियन लिनन से बना हल्का, अनस्ट्रक्चर्ड ब्लेज़र। रिलैक्स्ड फिट, नॉच्ड लैपेल और टॉर्टॉयशेल बटन के साथ।" },
    ESP: { title: "Blazer de Lino de Verano Elysian", description: "Blazer ligera y sin estructura confeccionada en lino belga puro. Corte relajado, solapas con muesca y botones de carey." },
    FRA: { title: "Blazer Lin d'Été Elysian", description: "Veste légère et non structurée taillée dans du lin belge pur. Coupe décontractée, revers cranté et boutons en écaille." }
  },
  223: {
    HIN: { title: "बेले प्लीटेड A-लाइन मिडी स्कर्ट", description: "कम्फर्टेबल हाई-राइज़ इलास्टिक कमरबंद के साथ फ्लोई एकॉर्डियन-प्लीटेड मिडी स्कर्ट। सिल्की क्रेप फैब्रिक से बनी।" },
    ESP: { title: "Falda Midi Plisada Línea A Belle", description: "Falda midi plisada en acordeón con cómoda cintura elástica de talle alto. Confeccionada en tela crepé sedosa." },
    FRA: { title: "Jupe Midi Plissée Ligne A Belle", description: "Jupe midi plissée en accordéon avec une ceinture élastique taille haute confortable. Confectionnée en tissu crêpe soyeux." }
  },
  224: {
    HIN: { title: "साइरेन वेलवेट इवनिंग गाउन", description: "लग्ज़री प्लश वेलवेट से बना फ्लोर-लेंथ इवनिंग गाउन। एलिगेंट ऑफ-शोल्डर नेकलाइन और ड्रामैटिक साइड स्लिट के साथ।" },
    ESP: { title: "Vestido de Noche de Terciopelo Siren", description: "Vestido de noche hasta el suelo confeccionado en lujoso terciopelo. Escote off-shoulder elegante y abertura lateral dramática." },
    FRA: { title: "Robe de Soirée en Velours Siren", description: "Robe longue jusqu'au sol confectionnée en velours peluche luxueux. Encolure bardot élégante et fente latérale dramatique." }
  },
  // ── Footwear ──
  205: {
    HIN: { title: "ऑरा एयर-कुशन्ड रनिंग शूज़", description: "पीक परफॉर्मेंस के लिए इंजीनियर्ड। हाईली रेस्पॉन्सिव एयर-कुशन्ड मिडसोल, ब्रेदेबल निट अपर और टिकाऊ ट्रैक्शन आउटसोल के साथ।" },
    ESP: { title: "Zapatillas de Running Aura con Amortiguación de Aire", description: "Diseñadas para el máximo rendimiento. Mediasuela de aire altamente reactiva, parte superior de tejido transpirable y suela de tracción duradera." },
    FRA: { title: "Chaussures de Course Aura à Coussin d'Air", description: "Conçues pour une performance optimale. Semelle intermédiaire à coussin d'air réactif, empeigne en tricot respirant et semelle extérieure durables." }
  },
  206: {
    HIN: { title: "क्लासिक व्हाइट लेदर स्नीकर्स", description: "प्रीमियम फुल-ग्रेन लेदर से बने मिनिमलिस्ट टेनिस स्नीकर्स। कम्फर्टेबल OrthoLite सॉकलाइनर और रबर कपसोल के साथ।" },
    ESP: { title: "Zapatillas de Cuero Blancas Clásicas", description: "Zapatillas de tenis minimalistas construidas en cuero de grano completo premium. Con plantilla OrthoLite cómoda y suela de goma." },
    FRA: { title: "Baskets en Cuir Blanc Classiques", description: "Baskets tennis minimalistes construites en cuir pleine fleur premium. Semelle intérieure OrthoLite confortable et semelle en caoutchouc." }
  },
  207: {
    HIN: { title: "हस्तनिर्मित स्वेड चेल्सी बूट्स", description: "वॉटर-रेसिस्टेंट इटालियन स्वेड से बने लग्ज़री चेल्सी बूट्स। इलास्टिक साइड पैनल और स्टैक्ड लेदर हील के साथ।" },
    ESP: { title: "Botines Chelsea de Ante Artesanales", description: "Lujosos botines Chelsea en ante italiano resistente al agua. Con paneles laterales elásticos y tacón de cuero apilado." },
    FRA: { title: "Bottines Chelsea en Daim Artisanales", description: "Bottines Chelsea luxueuses en daim italien résistant à l'eau. Avec panneaux élastiques latéraux et talon en cuir empilé." }
  },
  225: {
    HIN: { title: "प्यूमा इग्नाइट स्पीड रनिंग शूज़", description: "इग्नाइट फोम मिडसोल एनर्जी रिटर्न, ब्रेदेबल मेश अपर और हाई-अब्रेज़न रबर आउटसोल के साथ हाई-परफॉर्मेंस रनिंग शूज़।" },
    ESP: { title: "Zapatillas Running Puma Ignite Speed", description: "Zapatillas de alto rendimiento con retorno de energía de la mediasuela Ignite, parte superior de malla transpirable y suela de caucho de alta abrasión." },
    FRA: { title: "Chaussures Running Puma Ignite Speed", description: "Chaussures haute performance avec retour d'énergie de la mousse Ignite, empeigne en maille respirante et semelle caoutchouc haute abrasion." }
  },
  226: {
    HIN: { title: "जॉर्डन एयर रेट्रो कोर्ट स्नीकर्स", description: "प्रीमियम लेदर पैनल, विज़िबल एयर-सोल कुशनिंग और बोल्ड रेट्रो कलर ब्लॉकिंग के साथ लेजेंडरी कोर्ट सिल्हूट।" },
    ESP: { title: "Zapatillas de Pista Jordan Air Retro", description: "La legendaria silueta de pista con paneles de cuero premium, amortiguación Air-Sole visible y llamativo bloqueo de color retro." },
    FRA: { title: "Baskets Jordan Air Rétro Court", description: "La silhouette légendaire du terrain avec panneaux en cuir premium, amorti Air-Sole visible et blocking de couleur rétro audacieux." }
  },
  227: {
    HIN: { title: "वैन्स ओल्ड स्कूल कैनवस स्केट शूज़", description: "टिकाऊ कैनवस और स्वेड अपर, पैडेड कॉलर और सिग्नेचर वेफल रबर आउटसोल के साथ क्लासिक लो-टॉप स्केट शूज़।" },
    ESP: { title: "Zapatos de Skate Vans Old Skool Canvas", description: "Zapatillas de skate clásicas con parte superior de lona y ante duradera, talones acolchados y suela de goma waffle signature." },
    FRA: { title: "Chaussures de Skate Vans Old Skool Canvas", description: "Chaussures de skate basses classiques avec empeigne en toile et daim résistant, cols rembourrés et semelles en caoutchouc gaufrée signature." }
  },
  // ── Accessories ──
  208: {
    HIN: { title: "ऑरा गोल्ड-ट्रिम्ड एविएटर सनग्लासेज़", description: "आइकॉनिक एविएटर सिल्हूट, लाइटवेट गोल्ड-प्लेटेड मेटल फ्रेम और पोलराइज़्ड G-15 लेंस के साथ। 100% UV प्रोटेक्शन।" },
    ESP: { title: "Gafas de Sol Aviador con Ribete Dorado Aura", description: "Silueta de aviador icónica con montura de metal dorado ligero y lentes G-15 polarizadas. 100% protección UV." },
    FRA: { title: "Lunettes de Soleil Aviateur Dorées Aura", description: "Silhouette aviateur iconique avec monture en métal dorée légère et verres G-15 polarisés. Protection UV 100%." }
  },
  209: {
    HIN: { title: "क्रोनोग्राफ स्टेनलेस स्टील वॉच", description: "जापानी क्वार्ट्ज मूवमेंट, तीन क्रोनोग्राफ सब-डायल, डेट विंडो और 100m वॉटर रेसिस्टेंस के साथ सोफिस्टिकेटेड टाइमपीस।" },
    ESP: { title: "Reloj Cronógrafo de Acero Inoxidable", description: "Sofisticado cronógrafo con movimiento de cuarzo japonés, tres subdiales y resistencia al agua hasta 100m." },
    FRA: { title: "Montre Chronographe en Acier Inoxydable", description: "Montre sophistiquée avec mouvement à quartz japonais, trois sous-cadrans chronographe et résistance à l'eau jusqu'à 100m." }
  },
  210: {
    HIN: { title: "मिनिमलिस्ट सैफियानो लेदर वॉलेट", description: "स्क्रैच-रेसिस्टेंट सैफियानो लेदर से बना कॉम्पैक्ट बाई-फोल्ड वॉलेट। 6 कार्ड स्लॉट, बिल कम्पार्टमेंट और RFID ब्लॉकिंग के साथ।" },
    ESP: { title: "Cartera Minimalista de Cuero Saffiano", description: "Cartera bi-fold compacta en cuero saffiano resistente a arañazos. 6 ranuras para tarjetas y bloqueo RFID." },
    FRA: { title: "Portefeuille Minimaliste en Cuir Saffiano", description: "Portefeuille bi-fold compact en cuir saffiano résistant aux rayures. 6 compartiments pour cartes et blocage RFID." }
  },
  228: {
    HIN: { title: "ओकले स्पोर्ट पोलराइज़्ड सनग्लासेज़", description: "ओकले के प्रिज़्म पोलराइज़्ड लेंस के साथ हाई-रैप स्पोर्ट सनग्लासेज़। बेहतर कलर कंट्रास्ट और इम्पैक्ट रेसिस्टेंस।" },
    ESP: { title: "Gafas de Sol Deportivas Polarizadas Oakley", description: "Gafas deportivas de alto ajuste con lentes Prizm polarizadas de Oakley para mayor contraste de color y resistencia al impacto." },
    FRA: { title: "Lunettes de Sport Polarisées Oakley", description: "Lunettes de sport enveloppantes avec verres Prizm polarisés Oakley pour un contraste de couleur amélioré et une résistance aux chocs." }
  },
  229: {
    HIN: { title: "हर्शेल हेरिटेज कैनवस बैकपैक", description: "सिग्नेचर डायमंड एक्सेंट के साथ क्लासिक डिज़ाइन। पैडेड 15-इंच लैपटॉप स्लीव, फ्रंट पॉकेट और स्ट्राइप्ड फैब्रिक लाइनर।" },
    ESP: { title: "Mochila Canvas Heritage Herschel", description: "Diseño clásico con acento de diamante signature. Funda acolchada para portátil de 15 pulgadas y forro de tela a rayas." },
    FRA: { title: "Sac à Dos Canvas Heritage Herschel", description: "Design classique avec accent diamant signature. Housse rembourrée pour ordinateur 15 pouces et doublure en tissu rayé." }
  },
  230: {
    HIN: { title: "कैसियो विंटेज डिजिटल वॉच", description: "स्टेनलेस स्टील बैंड, LED बैकलाइट, डेली अलार्म और 1/100-सेकंड स्टॉपवॉच के साथ टाइमलेस रेट्रो डिजिटल वॉच।" },
    ESP: { title: "Reloj Digital Vintage Casio", description: "Reloj digital retro atemporal con banda de acero inoxidable, retroiluminación LED, alarma diaria y cronómetro de 1/100 segundos." },
    FRA: { title: "Montre Digitale Vintage Casio", description: "Montre digitale rétro intemporelle avec bracelet en acier inoxydable, rétroéclairage LED, alarme quotidienne et chronomètre 1/100 seconde." }
  },
  // ── Electronics ──
  211: {
    HIN: { title: "क्वांटम साउंडबार सीरीज़ 7", description: "वायरलेस सबवूफर, डॉल्बी एटमॉस सपोर्ट और ब्लूटूथ कनेक्टिविटी के साथ हाई-फिडेलिटी साउंडबार।" },
    ESP: { title: "Barra de Sonido Quantum Serie 7", description: "Barra de sonido de alta fidelidad con subwoofer inalámbrico, soporte Dolby Atmos y conectividad Bluetooth." },
    FRA: { title: "Barre de Son Quantum Série 7", description: "Barre de son haute fidélité avec caisson de basses sans fil, support Dolby Atmos et connectivité Bluetooth." }
  },
  212: {
    HIN: { title: "ऑरा OLED पोर्टेबल मॉनिटर", description: "अल्ट्रा-थिन 15.6 इंच 4K OLED पोर्टेबल मॉनिटर, डुअल USB-C पोर्ट, मिनी HDMI और बिल्ट-इन स्पीकर के साथ।" },
    ESP: { title: "Monitor OLED Portátil Aura", description: "Ultra-fino monitor OLED portátil de 15.6 pulgadas 4K con puertos USB-C duales, mini HDMI y altavoces integrados." },
    FRA: { title: "Moniteur OLED Portable Aura", description: "Moniteur OLED portable ultra-fin 15,6 pouces 4K avec doubles ports USB-C, mini HDMI et haut-parleurs intégrés." }
  },
  213: {
    HIN: { title: "एपेक्स एर्गोनॉमिक वायरलेस माउस", description: "एर्गोनॉमिकली स्कल्प्टेड वायरलेस माउस, एडजस्टेबल 4000 DPI सेंसर और डुअल ब्लूटूथ/USB कनेक्टिविटी के साथ।" },
    ESP: { title: "Ratón Inalámbrico Ergonómico Apex", description: "Ratón inalámbrico ergonómico con sensor DPI ajustable de 4000, rueda de desplazamiento ultrarrápida y conectividad Bluetooth/USB dual." },
    FRA: { title: "Souris Sans Fil Ergonomique Apex", description: "Souris sans fil sculptée ergonomiquement avec capteur 4000 DPI réglable, molette hyper-rapide et double connectivité Bluetooth/USB." }
  },
  214: {
    HIN: { title: "नोवा स्मार्ट होम हब", description: "7-इंच टच डिस्प्ले और प्रीमियम स्पीकर के साथ वॉयस-कंट्रोल्ड स्मार्ट असिस्टेंट और होम ऑटोमेशन हब।" },
    ESP: { title: "Hub para Hogar Inteligente Nova", description: "Asistente inteligente controlado por voz con pantalla táctil de 7 pulgadas y altavoces premium para la automatización del hogar." },
    FRA: { title: "Hub Maison Intelligente Nova", description: "Assistant intelligent à commande vocale avec écran tactile 7 pouces et haut-parleurs premium pour la domotique." }
  },
  215: {
    HIN: { title: "सिमेट्री डायमंड स्टड ईयररिंग्स", description: "18k व्हाइट गोल्ड फोर-प्रॉन्ग सेटिंग में 1-कैरेट राउंड ब्रिलियंट-कट डायमंड।" },
    ESP: { title: "Pendientes de Diamante Symmetry", description: "Deslumbrantes diamantes de talla brillante redonda de 1 quilate engastados en elegante oro blanco de 18k." },
    FRA: { title: "Boucles d'Oreilles Diamant Symmetry", description: "Magnifiques diamants ronds brillants de 1 carat sertis dans un élégant or blanc 18k en monture quatre griffes." }
  },
  216: {
    HIN: { title: "लूना सिल्वर चेन ब्रेसलेट", description: "925 स्टर्लिंग सिल्वर फ्लैट कर्ब चेन ब्रेसलेट। क्लासिक, हेवी-वेट डिज़ाइन और सिक्योर लॉब्स्टर क्लैस्प के साथ।" },
    ESP: { title: "Pulsera de Cadena de Plata Luna", description: "Pulsera de cadena curb plana en plata de ley 925. Diseño clásico de peso completo con cierre de langosta seguro." },
    FRA: { title: "Bracelet Chaîne en Argent Luna", description: "Bracelet en chaîne plate en argent sterling 925. Design classique poids lourd avec fermoir homard sécurisé." }
  },
  217: {
    HIN: { title: "ओरियन पर्ल ड्रॉप नेकलेस", description: "छोटे हीरों से सजी नाजुक 14k येलो गोल्ड चेन से लटका दक्षिण सागर का सुसंस्कृत मोती।" },
    ESP: { title: "Collar Colgante de Perla Orion", description: "Luminosa perla cultivada del Mar del Sur suspendida de una delicada cadena de oro amarillo de 14k adornada con pequeños diamantes." },
    FRA: { title: "Collier Pendentif Perle Orion", description: "Lumineuse perle de culture des mers du Sud suspendue à une délicate chaîne en or jaune 14k ornée de petits diamants." }
  },
  // ── WATCHES — Luxury ──
  301: {
    HIN: { title: "रोलेक्स सबमरीनर डेट ब्लैक डायल", description: "ऑयस्टरस्टील में आइकॉनिक रोलेक्स सबमरीनर। 300m वॉटरप्रूफ और कैलिबर 3235 मूवमेंट से संचालित।" },
    ESP: { title: "Rolex Submariner Fecha Esfera Negra", description: "El icónico Rolex Submariner en Oystersteel. Resistente al agua hasta 300m, impulsado por el calibre 3235." },
    FRA: { title: "Rolex Submariner Date Cadran Noir", description: "L'iconique Rolex Submariner en Oystersteel. Étanche à 300m, animé par le calibre 3235." }
  },
  302: {
    HIN: { title: "ओमेगा सीमास्टर प्रोफेशनल 300M", description: "स्टेनलेस स्टील में लेजेंडरी ओमेगा सीमास्टर डाइवर 300M। Co-Axial Master Chronometer कैलिबर 8800।" },
    ESP: { title: "Omega Seamaster Professional 300M", description: "El legendario Omega Seamaster Diver en acero inoxidable. Calibre Co-Axial Master Chronometer 8800, 300m de resistencia al agua." },
    FRA: { title: "Omega Seamaster Professional 300M", description: "Le légendaire Omega Seamaster Diver en acier inoxydable. Calibre Co-Axial Master Chronometer 8800, 300m d'étanchéité." }
  },
  303: {
    HIN: { title: "पटेक फिलिप कैलात्रावा ड्रेस वॉच", description: "18k रोज़ गोल्ड में टाइमलेस पटेक फिलिप कैलात्रावा। अल्ट्रा-थिन हैंड-वाउंड कैलिबर 215 PS।" },
    ESP: { title: "Patek Philippe Calatrava Reloj de Vestir", description: "Atemporal Patek Philippe Calatrava en oro rosa de 18k. Calibre manual ultra-fino 215 PS, esfera en plata opalina." },
    FRA: { title: "Patek Philippe Calatrava Montre Habillée", description: "Intemporelle Patek Philippe Calatrava en or rose 18k. Calibre manuel ultra-plat 215 PS, cadran en argent opalin." }
  },
  304: {
    HIN: { title: "ऑडेमर्स पिगेट रॉयल ओक सेल्फवाइंडिंग", description: "स्टेनलेस स्टील में आइकॉनिक रॉयल ओक, लेजेंडरी 'ग्रांडे टैपिसेरी' डायल पैटर्न के साथ। कैलिबर 4302 ऑटोमैटिक।" },
    ESP: { title: "Audemars Piguet Royal Oak Automático", description: "El icónico Royal Oak en acero inoxidable con el legendario patrón de esfera 'Grande Tapisserie'. Calibre automático 4302." },
    FRA: { title: "Audemars Piguet Royal Oak Automatique", description: "L'iconique Royal Oak en acier inoxydable avec le légendaire motif de cadran 'Grande Tapisserie'. Calibre automatique 4302." }
  },
  305: {
    HIN: { title: "कार्टियर टैंक मस्ट लार्ज", description: "WSTA0052 कॉन्फिगरेशन में कार्टियर टैंक। स्टील केस, रोमन न्यूमेरल डायल और बोर्डो एलीगेटर स्ट्रैप।" },
    ESP: { title: "Cartier Tank Must Grande", description: "Cartier Tank Must en configuración WSTA0052. Caja de acero, esfera con números romanos y correa de aligátor burdeos." },
    FRA: { title: "Cartier Tank Must Grande", description: "Cartier Tank Must en configuration WSTA0052. Boîtier en acier, cadran à chiffres romains et bracelet en alligator bordeaux." }
  },
  306: {
    HIN: { title: "हब्लो बिग बैंग इंटीग्रल टाइटेनियम", description: "पॉलिश्ड/सैटिन टाइटेनियम में हब्लो बिग बैंग। HUB1280 UNICO Manufacture क्रोनोग्राफ मूवमेंट, 42mm केस।" },
    ESP: { title: "Hublot Big Bang Integral Titanio", description: "Hublot Big Bang Integral en titanio pulido/satinado. Movimiento cronógrafo HUB1280 UNICO Manufacture, caja de 42mm." },
    FRA: { title: "Hublot Big Bang Integral Titane", description: "Hublot Big Bang Integral en titane poli/satiné. Mouvement chronographe HUB1280 UNICO Manufacture, boîtier 42mm." }
  },
  307: {
    HIN: { title: "IWC शैफहाउसेन पोर्तुगीसर क्रोनोग्राफ", description: "स्टेनलेस स्टील में IWC पोर्तुगीसर। 41mm केस, सिल्वर-प्लेटेड डायल, कॉलम-व्हील क्रोनोग्राफ कैलिबर 69355।" },
    ESP: { title: "IWC Schaffhausen Portugieser Cronógrafo", description: "IWC Portugieser en acero inoxidable. Caja de 41mm, esfera plateada, cronógrafo de rueda de columnas calibre 69355." },
    FRA: { title: "IWC Schaffhausen Portugieser Chronographe", description: "IWC Portugieser en acier inoxydable. Boîtier 41mm, cadran argenté, chronographe à roue à colonnes calibre 69355." }
  },
  308: {
    HIN: { title: "जेगर-लेकॉल्टर रेवर्सो क्लासिक ड्यूओफेस", description: "स्टेनलेस स्टील में रेवर्सो की आइकॉनिक रिवर्सेबल केस। डे डायल सिल्वर, नाइट डायल ब्लू। मैन्युअली वाउंड कैलिबर 854 A/2।" },
    ESP: { title: "Jaeger-LeCoultre Reverso Clásico Duoface", description: "Reverso Clásico en acero con su icónica caja reversible. Esfera diurna en plata opalina, nocturna en azul. Calibre manual 854 A/2." },
    FRA: { title: "Jaeger-LeCoultre Reverso Classique Duoface", description: "Reverso Classique en acier avec son iconique boîtier réversible. Cadran jour en argent opalin, nuit en bleu. Calibre manuel 854 A/2." }
  },
  309: {
    HIN: { title: "ब्रेटलिंग नेविटाइमर B01 क्रोनोग्राफ 43", description: "इन-हाउस मैन्युफैक्चर कैलिबर B01 के साथ लेजेंडरी ब्रेटलिंग नेविटाइमर। 43mm स्टील केस, ब्लैक डायल, 70-घंटे पावर रिज़र्व।" },
    ESP: { title: "Breitling Navitimer B01 Cronógrafo 43", description: "El legendario Navitimer de Breitling con calibre B01 de Manufactura. Caja de acero de 43mm, esfera negra, 70h de reserva de marcha." },
    FRA: { title: "Breitling Navitimer B01 Chronographe 43", description: "Le légendaire Navitimer de Breitling avec calibre Manufacture B01. Boîtier acier 43mm, cadran noir, 70h de réserve de marche." }
  },
  310: {
    HIN: { title: "TAG Heuer कैरेरा कैलिबर 5 ऑटोमैटिक", description: "पॉलिश्ड और ब्रश्ड स्टील में TAG Heuer कैरेरा। 39mm केस, सिल्वर-व्हाइट सनरे डायल, सेल्फ-वाइंडिंग कैलिबर 5।" },
    ESP: { title: "TAG Heuer Carrera Calibre 5 Automático", description: "TAG Heuer Carrera en acero pulido y cepillado. Caja de 39mm, esfera sunray blanca-plateada, movimiento automático calibre 5." },
    FRA: { title: "TAG Heuer Carrera Calibre 5 Automatique", description: "TAG Heuer Carrera en acier poli et brossé. Boîtier 39mm, cadran sunray blanc-argenté, mouvement automatique calibre 5." }
  },
  // ── WATCHES — Premium ──
  311: {
    HIN: { title: "टिसॉट PRX पावरमैटिक 80 35mm", description: "सनरे ब्लू डायल के साथ टिसॉट PRX। पावरमैटिक 80 ऑटोमैटिक, 80 घंटे पावर रिज़र्व, इंटीग्रेटेड ब्रेसलेट।" },
    ESP: { title: "Tissot PRX Powermatic 80 35mm", description: "Tissot PRX en acero con esfera azul sunray. Movimiento automático Powermatic 80, reserva de marcha 80h, brazalete integrado." },
    FRA: { title: "Tissot PRX Powermatic 80 35mm", description: "Tissot PRX en acier avec cadran bleu sunray. Mouvement automatique Powermatic 80, réserve de marche 80h, bracelet intégré." }
  },
  312: {
    HIN: { title: "लोंजिन मास्टर कलेक्शन मूनफेज़", description: "सिल्वर डायल, मूनफेज़ इंडिकेटर, ट्रिपल कैलेंडर और L899 ऑटोमैटिक कैलिबर के साथ लोंजिन मास्टर।" },
    ESP: { title: "Longines Master Collection Fase Lunar", description: "Longines Master Collection con esfera plateada, indicador de fase lunar, calendario triple y calibre automático L899." },
    FRA: { title: "Longines Master Collection Phase de Lune", description: "Longines Master Collection avec cadran argenté, indicateur de phase de lune, calendrier triple et calibre automatique L899." }
  },
  313: {
    HIN: { title: "राडो ट्रू थिनलाइन सिरेमिक वॉच", description: "अल्ट्रा-लाइट हाई-टेक सफेद सिरेमिक में राडो ट्रू थिनलाइन। क्वार्ट्ज मूवमेंट, 5mm केस हाइट।" },
    ESP: { title: "Rado True Thinline Reloj de Cerámica", description: "Rado True Thinline en cerámica blanca de alta tecnología ultra ligera. Movimiento de cuarzo, caja de 5mm de altura." },
    FRA: { title: "Rado True Thinline Montre en Céramique", description: "Rado True Thinline en céramique haute technologie ultra-légère blanche. Mouvement à quartz, hauteur du boîtier 5mm." }
  },
  314: {
    HIN: { title: "सीको प्रेसाज शार्प-एज्ड इनेमल डायल", description: "फेसेटेड ग्लास से प्रेरित हस्तनिर्मित इनेमल डायल के साथ सीको प्रेसाज। कैलिबर 4R35 ऑटोमैटिक मूवमेंट।" },
    ESP: { title: "Seiko Presage Esfera Esmaltada de Bordes Afilados", description: "Seiko Presage con esfera de esmalte artesanal inspirada en vidrio facetado. Movimiento automático calibre 4R35." },
    FRA: { title: "Seiko Presage Cadran Émaillé aux Bords Tranchants", description: "Seiko Presage avec cadran en émail artisanal inspiré du verre facetté. Mouvement automatique calibre 4R35." }
  },
  315: {
    HIN: { title: "सिटिज़न ईको-ड्राइव प्रोमास्टर स्काई टाइटेनियम", description: "लाइटवेट टाइटेनियम में सिटिज़न ईको-ड्राइव। सोलर-पावर्ड, 26 ज़ोन में वर्ल्ड टाइम और 200m वॉटर रेसिस्टेंस।" },
    ESP: { title: "Citizen Eco-Drive Promaster Sky Titanio", description: "Citizen Eco-Drive en titanio ligero. Solar, hora atómica controlada por radio, hora mundial en 26 zonas, resistencia al agua 200m." },
    FRA: { title: "Citizen Eco-Drive Promaster Sky Titane", description: "Citizen Eco-Drive en titane léger. Solaire, heure atomique contrôlée par radio, heure mondiale 26 fuseaux, étanchéité 200m." }
  },
  316: {
    HIN: { title: "हैमिल्टन खाकी फील्ड मैकेनिकल", description: "ब्रश्ड स्टेनलेस स्टील में हैमिल्टन खाकी फील्ड। मिलिट्री-इंस्पायर्ड डिज़ाइन, हैंड-वाउंड ETA Unitas 6497 कैलिबर।" },
    ESP: { title: "Hamilton Khaki Field Mecánico", description: "Hamilton Khaki Field en acero inoxidable cepillado. Estética inspirada en lo militar con calibre ETA Unitas 6497 de cuerda manual." },
    FRA: { title: "Hamilton Khaki Field Mécanique", description: "Hamilton Khaki Field en acier inoxydable brossé. Esthétique inspirée du militaire avec calibre ETA Unitas 6497 à remontage manuel." }
  },
  317: {
    HIN: { title: "फ्रेडेरिक कॉन्स्टेंट हाईलाइफ COSC", description: "सर्टिफाइड क्रोनोमीटर कैलिबर FC-303, इंटीग्रेटेड H-लिंक ब्रेसलेट और सनबर्स्ट ब्लू डायल के साथ।" },
    ESP: { title: "Frederique Constant Highlife COSC", description: "Cronómetro certificado con calibre FC-303, brazalete integrado H-link y esfera azul sunburst." },
    FRA: { title: "Frederique Constant Highlife COSC", description: "Chronomètre certifié avec calibre FC-303, bracelet intégré H-link et cadran bleu sunburst." }
  },
  318: {
    HIN: { title: "बुलोवा प्रेसिज़निस्ट क्रोनोग्राफ", description: "अल्ट्रा-हाई-फ्रिक्वेंसी 262 kHz प्रेसिज़निस्ट मूवमेंट के साथ बुलोवा क्रोनोग्राफ। 1/1000वें सेकंड की सटीकता।" },
    ESP: { title: "Bulova Precisionist Cronógrafo", description: "Cronógrafo Bulova Precisionist con movimiento de ultra alta frecuencia 262 kHz. Precisión de 1/1000 de segundo." },
    FRA: { title: "Bulova Precisionist Chronographe", description: "Chronographe Bulova Precisionist avec mouvement ultra haute fréquence 262 kHz. Précision au 1/1000e de seconde." }
  },
  319: {
    HIN: { title: "फॉसिल जेन 6 वेलनेस एडिशन", description: "Wear OS, SpO2, स्लीप ट्रैकिंग, बिल्ट-इन Alexa और Always-On AMOLED डिस्प्ले के साथ फॉसिल जेन 6 स्मार्टवॉच।" },
    ESP: { title: "Fossil Gen 6 Edición Wellness", description: "Smartwatch Fossil Gen 6 con Wear OS, SpO2, seguimiento del sueño, Alexa integrada y pantalla AMOLED Always-On." },
    FRA: { title: "Fossil Gen 6 Édition Wellness", description: "Smartwatch Fossil Gen 6 avec Wear OS, SpO2, suivi du sommeil, Alexa intégrée et écran AMOLED Always-On." }
  },
  320: {
    HIN: { title: "कैसियो G-Shock GA-2100 कार्बन कोर", description: "अल्ट्रा-स्लिम कार्बन कोर गार्ड स्ट्रक्चर में G-Shock GA-2100। एनालॉग-डिजिटल डिस्प्ले, 200m शॉक-रेसिस्टेंट।" },
    ESP: { title: "Casio G-Shock GA-2100 Carbon Core", description: "G-Shock GA-2100 en estructura Carbon Core Guard ultra-slim. Pantalla analógico-digital, resistencia a golpes 200m." },
    FRA: { title: "Casio G-Shock GA-2100 Carbon Core", description: "G-Shock GA-2100 en structure Carbon Core Guard ultra-mince. Affichage analogique-numérique, résistance aux chocs 200m." }
  },
  // ── WATCHES — Smartwatch & Fashion ──
  321: {
    HIN: { title: "Apple Watch Ultra 2 टाइटेनियम", description: "नेचुरल टाइटेनियम में Apple Watch Ultra 2। एक्शन बटन, डुअल-फ्रिक्वेंसी GPS, 60-घंटे बैटरी और 100m वॉटर रेसिस्टेंस।" },
    ESP: { title: "Apple Watch Ultra 2 Titanio", description: "Apple Watch Ultra 2 en titanio natural. Botón de Acción, GPS de doble frecuencia, 60h de batería y 100m de resistencia al agua." },
    FRA: { title: "Apple Watch Ultra 2 Titane", description: "Apple Watch Ultra 2 en titane naturel. Bouton Action, GPS double fréquence, 60h de batterie et 100m d'étanchéité." }
  },
  322: {
    HIN: { title: "Apple Watch Series 9 स्टारलाइट एल्यूमीनियम", description: "नए S9 चिप के साथ स्टारलाइट एल्यूमीनियम में Apple Watch Series 9। डबल टैप जेस्चर और Always-On रेटिना डिस्प्ले।" },
    ESP: { title: "Apple Watch Series 9 Aluminio Starlight", description: "Apple Watch Series 9 en aluminio starlight con el nuevo chip S9. Gesto de doble toque y pantalla Retina Always-On." },
    FRA: { title: "Apple Watch Series 9 Aluminium Starlight", description: "Apple Watch Series 9 en aluminium starlight avec la nouvelle puce S9. Geste double tap et écran Retina Always-On." }
  },
  323: {
    HIN: { title: "Samsung Galaxy Watch 6 Classic 47mm", description: "आइकॉनिक रोटेटिंग बेज़ल के साथ Samsung Galaxy Watch 6 Classic। BioActive सेंसर, एडवांस्ड स्लीप कोचिंग।" },
    ESP: { title: "Samsung Galaxy Watch 6 Classic 47mm", description: "Samsung Galaxy Watch 6 Classic con el icónico bisel giratorio. Sensor BioActive y coaching avanzado del sueño." },
    FRA: { title: "Samsung Galaxy Watch 6 Classic 47mm", description: "Samsung Galaxy Watch 6 Classic avec la lunette rotative iconique. Capteur BioActive et coaching sommeil avancé." }
  },
  324: {
    HIN: { title: "गार्मिन फेनिक्स 7X प्रो सोलर टाइटेनियम", description: "सोलर चार्जिंग लेंस के साथ गार्मिन फेनिक्स 7X Pro। मल्टी-बैंड GPS, टोपोग्राफिक मैप्स और 37 दिन की बैटरी।" },
    ESP: { title: "Garmin Fenix 7X Pro Solar Titanio", description: "Garmin Fenix 7X Pro Solar con lente de carga solar. GPS multibanda, mapas topográficos y hasta 37 días de batería." },
    FRA: { title: "Garmin Fenix 7X Pro Solaire Titane", description: "Garmin Fenix 7X Pro Solaire avec lentille de charge solaire. GPS multibande, cartes topographiques et jusqu'à 37 jours d'autonomie." }
  },
  325: {
    HIN: { title: "Huawei Watch GT 4 ब्लैक एडिशन", description: "14-दिन की बैटरी, AMOLED डिस्प्ले, ECG, ब्लड ऑक्सीजन, स्किन टेम्परेचर और GPS के साथ Huawei Watch GT 4।" },
    ESP: { title: "Huawei Watch GT 4 Edición Negra", description: "Huawei Watch GT 4 con 14 días de batería, pantalla AMOLED, ECG, oxígeno en sangre, temperatura cutánea y GPS." },
    FRA: { title: "Huawei Watch GT 4 Édition Noire", description: "Huawei Watch GT 4 avec 14 jours d'autonomie, écran AMOLED, ECG, oxygène sanguin, température cutanée et GPS." }
  },
  326: {
    HIN: { title: "Amazfit Balance स्मार्टवॉच", description: "Zepp OS 2.0 और AI वेलनेस सिस्टम के साथ Amazfit Balance। डुअल-बैंड GPS, 14-दिन बैटरी और AMOLED डिस्प्ले।" },
    ESP: { title: "Amazfit Balance Smartwatch", description: "Amazfit Balance con Zepp OS 2.0 y sistema de bienestar IA. GPS de doble banda, 14 días de batería y pantalla AMOLED." },
    FRA: { title: "Amazfit Balance Smartwatch", description: "Amazfit Balance avec Zepp OS 2.0 et système de bien-être IA. GPS double bande, 14 jours d'autonomie et écran AMOLED." }
  },
  327: {
    HIN: { title: "माइकल कोर्स रनवे मर्सर गोल्ड वॉच", description: "गोल्ड-टोन स्टेनलेस स्टील में माइकल कोर्स रनवे। स्लिम थ्री-हैंड मूवमेंट, रोमन न्यूमेरल मार्कर और गोल्ड मेश ब्रेसलेट।" },
    ESP: { title: "Michael Kors Runway Mercer Dorado", description: "Michael Kors Runway en acero inoxidable tono dorado. Movimiento slim de tres agujas, marcadores romanos y brazalete de malla dorada." },
    FRA: { title: "Michael Kors Runway Mercer Doré", description: "Michael Kors Runway en acier inoxydable doré. Mouvement slim trois aiguilles, marqueurs romains et bracelet en maille dorée." }
  },
  328: {
    HIN: { title: "एम्पोरियो अर्मानी सेरामिका क्रोनोग्राफ", description: "जेट-ब्लैक सिरेमिक केस और ब्रेसलेट में एम्पोरियो अर्मानी। स्विस-मेड क्वार्ट्ज क्रोनोग्राफ।" },
    ESP: { title: "Emporio Armani Ceramica Cronógrafo", description: "Emporio Armani Ceramica en caja y brazalete de cerámica negro azabache. Cronógrafo de cuarzo fabricado en Suiza." },
    FRA: { title: "Emporio Armani Ceramica Chronographe", description: "Emporio Armani Ceramica en boîtier et bracelet céramique noir jais. Chronographe à quartz fabriqué en Suisse." }
  },
  329: {
    HIN: { title: "टॉमी हिलफिगर एल्डेन स्पोर्ट वॉच", description: "स्पोर्टी टू-टोन स्टेनलेस स्टील ब्रेसलेट में Tommy Hilfiger Alden। क्लीन सनरे ब्लू डायल और डेट विंडो।" },
    ESP: { title: "Tommy Hilfiger Alden Sport", description: "Tommy Hilfiger Alden en brazalete de acero inoxidable bicolor deportivo. Esfera azul sunray limpia con ventana de fecha." },
    FRA: { title: "Tommy Hilfiger Alden Sport", description: "Tommy Hilfiger Alden en bracelet acier inoxydable bicolore sportif. Cadran bleu sunray épuré avec guichet date." }
  },
  330: {
    HIN: { title: "टाइमेक्स वॉटरबरी क्लासिक क्रोनोग्राफ", description: "जेन्युइन लेदर स्ट्रैप के साथ स्टेनलेस स्टील में Timex वॉटरबरी। Indiglo बैकलाइट और 60-मिनट बेज़ल।" },
    ESP: { title: "Timex Waterbury Classic Cronógrafo", description: "Timex Waterbury Classic en acero inoxidable con correa de cuero genuino. Retroiluminación Indiglo y bisel de 60 minutos." },
    FRA: { title: "Timex Waterbury Classic Chronographe", description: "Timex Waterbury Classic en acier inoxydable avec bracelet en cuir véritable. Rétroéclairage Indiglo et lunette 60 minutes." }
  },
  331: {
    HIN: { title: "Daniel Wellington क्लासिक पेटिट मेलरोज़", description: "28mm रोज़ गोल्ड-प्लेटेड केस के साथ Daniel Wellington। मिनिमलिस्ट व्हाइट डायल, इंटरचेंजेबल मेश स्ट्रैप।" },
    ESP: { title: "Daniel Wellington Classic Petite Melrose", description: "Daniel Wellington Classic Petite Melrose con caja de 28mm chapada en oro rosa. Esfera blanca minimalista y correa de malla intercambiable." },
    FRA: { title: "Daniel Wellington Classic Petite Melrose", description: "Daniel Wellington Classic Petite Melrose avec boîtier 28mm plaqué or rose. Cadran blanc minimaliste et bracelet maille interchangeable." }
  }
};

// ── applyProductTranslations: patches state.products titles/descriptions ──
function applyProductTranslations(lang) {
  if (!state.products || state.products.length === 0) return;

  state.products.forEach(product => {
    const t = PRODUCT_TRANSLATIONS[product.id];
    if (!t) return;

    if (lang === "ENG") {
      // Restore original from FALLBACK_PRODUCTS or LOCAL_PREMIUM_PRODUCTS
      const original = [...FALLBACK_PRODUCTS, ...LOCAL_PREMIUM_PRODUCTS].find(p => p.id === product.id);
      if (original) {
        product.title       = original.title;
        product.description = original.description;
      }
    } else if (t[lang]) {
      product.title       = t[lang].title;
      product.description = t[lang].description;
    }
  });
}

// =========================================================
// PROFILE PANEL — open/close + tab switching
// =========================================================
(function initProfilePanel() {
  const overlay = document.getElementById("profile-panel-overlay");
  const panel   = document.getElementById("profile-panel");
  if (!overlay || !panel) return;

  function openProfile() {
    overlay.classList.remove("pointer-events-none");
    gsap.to(overlay, { opacity: 1, duration: 0.25 });
    gsap.to(panel,   { x: 0,       duration: 0.3, ease: "power2.out" });
    document.body.classList.add("cart-drawer-open");
  }

  function closeProfile() {
    gsap.to(overlay, { opacity: 0, duration: 0.25, onComplete: () => overlay.classList.add("pointer-events-none") });
    gsap.to(panel,   { x: "100%",  duration: 0.25, ease: "power2.in" });
    document.body.classList.remove("cart-drawer-open");
  }

  document.getElementById("user-profile-trigger").addEventListener("click", openProfile);
  document.getElementById("profile-panel-close").addEventListener("click", closeProfile);

  // Close on backdrop click
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeProfile();
  });

  // Tab switching
  document.querySelectorAll(".profile-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      // Reset all tabs
      document.querySelectorAll(".profile-tab").forEach(t => {
        t.style.color = "var(--text-secondary)";
        const bar = t.querySelector(".profile-tab-bar");
        if (bar) bar.style.opacity = "0";
      });

      // Activate clicked tab
      tab.style.color = "var(--accent)";
      const bar = tab.querySelector(".profile-tab-bar");
      if (bar) bar.style.opacity = "1";

      // Show correct content
      document.querySelectorAll(".profile-tab-content").forEach(c => c.classList.add("hidden"));
      const content = document.getElementById(`profile-tab-${target}`);
      if (content) content.classList.remove("hidden");
    });
  });
})();
