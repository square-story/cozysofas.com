export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Product {
  id: number
  documentId: string
  name: string
  description: string
  price: number
  originalPrice?: number
  inStock: boolean
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  isNew: boolean
  isBestSeller: boolean
  images: ProductImage[]
  category: Category
  colors: Color[]
  materials: Material[]
  Dimensions: Dimensions
  features: Feature[]
}

export interface ProductImage {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    thumbnail: ImageFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: {
    public_id: string
    resource_type: string
  }
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface ImageFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
  provider_metadata: {
    public_id: string
    resource_type: string
  }
}

export interface Category {
  id: number
  documentId: string
  name: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Color {
  id: number
  documentId: string
  name: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Material {
  id: number
  documentId: string
  name: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Dimensions {
  id: number
  Width: number
  Height: number
  Depth: number
}

export interface Feature {
  id: number
  documentId: string
  name: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

import { getProducts, getCategories, getColors, getMaterials } from "./server-fetch";

// Export data fetched on the server for backward compatibility
export const products = await getProducts();
export const categories = await getCategories();
export const colors = await getColors();
export const materials = await getMaterials();
export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
  { value: "bestseller", label: "Best Sellers" },
]
