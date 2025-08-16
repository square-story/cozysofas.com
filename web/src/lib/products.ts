export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  images: string[]
  category: string
  colors: string[]
  materials: string[]
  dimensions: {
    width: number
    height: number
    depth: number
  }
  inStock: boolean
  isNew: boolean
  isBestSeller: boolean
  features: string[]
}

export const products: Product[] = [
  {
    id: "1",
    name: "Modern Sectional Sofa",
    description:
      "Spacious L-shaped sectional perfect for large families. Features premium fabric upholstery and deep cushions for ultimate comfort.",
    price: 1299,
    originalPrice: 1599,
    rating: 4.8,
    images: [
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT6-683x1024.jpg",
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT6-683x1024.jpg",
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT6-683x1024.jpg",
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT6-683x1024.jpg",
    ],
    category: "Sectional",
    colors: ["Gray", "Navy", "Beige"],
    materials: ["Fabric", "Foam", "Wood Frame"],
    dimensions: { width: 120, height: 35, depth: 85 },
    inStock: true,
    isNew: false,
    isBestSeller: true,
    features: ["Removable Cushions", "Stain Resistant", "Pet Friendly", "Easy Assembly"],
  },
  {
    id: "2",
    name: "Luxury Leather Recliner",
    description: "Premium Italian leather recliner with built-in massage function and USB charging ports.",
    price: 2199,
    rating: 4.9, images: [
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT9-683x1024.jpg",
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT9-683x1024.jpg",
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT9-683x1024.jpg",
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT9-683x1024.jpg",
    ],
    category: "Recliner",
    colors: ["Brown", "Black", "Cognac"],
    materials: ["Genuine Leather", "Memory Foam", "Steel Frame"],
    dimensions: { width: 32, height: 42, depth: 38 },
    inStock: true,
    isNew: true,
    isBestSeller: false,
    features: ["Massage Function", "USB Charging", "360° Swivel", "Memory Foam"],
  },
  {
    id: "3",
    name: "Minimalist Fabric Loveseat",
    description: "Clean lines with sustainable materials. Perfect for small spaces and modern aesthetics.",
    price: 899,
    originalPrice: 1099,
    rating: 4.6, images: [
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT10-683x1024.jpg",
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT10-683x1024.jpg",
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT10-683x1024.jpg",
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT10-683x1024.jpg",
    ],
    category: "Loveseat",
    colors: ["Light Gray", "Charcoal", "Cream"],
    materials: ["Organic Cotton", "Recycled Foam", "Bamboo Frame"],
    dimensions: { width: 58, height: 32, depth: 34 },
    inStock: true,
    isNew: false,
    isBestSeller: false,
    features: ["Eco-Friendly", "Compact Design", "Easy Clean", "Sustainable Materials"],
  },
  {
    id: "4",
    name: "Classic Chesterfield Sofa",
    description: "Timeless design with button-tufted leather and rolled arms. A statement piece for any living room.",
    price: 1899,
    rating: 4.7,
    images: [
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT3-1024x683.jpg",
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT3-1024x683.jpg",
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT3-1024x683.jpg",
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT3-1024x683.jpg",
    ],
    category: "Sofa",
    colors: ["Dark Brown", "Black", "Burgundy"],
    materials: ["Top Grain Leather", "High-Density Foam", "Hardwood Frame"],
    dimensions: { width: 84, height: 30, depth: 38 },
    inStock: true,
    isNew: false,
    isBestSeller: true,
    features: ["Button Tufted", "Rolled Arms", "Nailhead Trim", "Handcrafted"],
  },
  {
    id: "5",
    name: "Contemporary Modular Sofa",
    description: "Flexible modular design that adapts to your space. Mix and match pieces for custom configurations.",
    price: 1599,
    rating: 4.5, images: [
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT13-1024x683.jpg",
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT13-1024x683.jpg",
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT13-1024x683.jpg",
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT13-1024x683.jpg",
    ],
    category: "Modular",
    colors: ["White", "Light Gray", "Navy"],
    materials: ["Performance Fabric", "CertiPUR Foam", "Kiln-Dried Wood"],
    dimensions: { width: 96, height: 33, depth: 40 },
    inStock: false,
    isNew: true,
    isBestSeller: false,
    features: ["Modular Design", "Washable Covers", "Pet Resistant", "Custom Configuration"],
  },
  {
    id: "6",
    name: "Vintage Velvet Armchair",
    description: "Luxurious velvet upholstery with brass accents. Perfect accent piece for any sophisticated interior.",
    price: 799,
    rating: 4.4, images: [
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT16-1024x683.jpg",
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT16-1024x683.jpg",
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT16-1024x683.jpg",
      "https://asembleindia.com/wp-content/uploads/2024/08/PRODUCT16-1024x683.jpg",
    ],
    category: "Armchair",
    colors: ["Emerald", "Navy", "Blush Pink"],
    materials: ["Velvet", "Down Feathers", "Brass Legs"],
    dimensions: { width: 30, height: 32, depth: 32 },
    inStock: true,
    isNew: false,
    isBestSeller: false,
    features: ["Velvet Upholstery", "Brass Accents", "Down Cushions", "Swivel Base"],
  },
]

export const categories = ["All", "Sofa", "Sectional", "Loveseat", "Recliner", "Armchair", "Modular"]
export const colors = ["All", "Gray", "Navy", "Beige", "Brown", "Black", "White", "Cream"]
export const materials = ["All", "Fabric", "Leather", "Velvet", "Cotton"]
export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
  { value: "bestseller", label: "Best Sellers" },
]
