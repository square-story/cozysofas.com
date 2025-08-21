import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "../api";
import type { Product, Category, Color, Material } from "../products";

// Query keys for caching and invalidation
export const queryKeys = {
  products: ["products"] as const,
  product: (slug: string) => ["products", slug] as const,
  categories: ["categories"] as const,
  colors: ["colors"] as const,
  materials: ["materials"] as const,
};

// Hook for fetching all products
export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: async () => {
      const response = await fetchAPI<Product>("products?populate=*");
      return response.data;
    },
  });
}

// Hook for fetching a single product by ID
export function useProduct(slug: string) {
  return useQuery({
    queryKey: queryKeys.product(slug),
    queryFn: async () => {
      const response = await fetchAPI<Product>(`products/${slug}?populate=*`);
      return response.data[0]; // Assuming the API returns an array with a single product
    },
    enabled: !!slug, // Only run the query if an ID is provided
  });
}

// Hook for fetching all categories
export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: async () => {
      const response = await fetchAPI<Category>("categories");
      return response.data;
    },
  });
}

// Hook for fetching all colors
export function useColors() {
  return useQuery({
    queryKey: queryKeys.colors,
    queryFn: async () => {
      const response = await fetchAPI<Color>("colors");
      return response.data;
    },
  });
}

// Hook for fetching all materials
export function useMaterials() {
  return useQuery({
    queryKey: queryKeys.materials,
    queryFn: async () => {
      const response = await fetchAPI<Material>("materials");
      return response.data;
    },
  });
}