import { fetchAPI } from "./api";
import type { Product, Category, Color, Material } from "./products";

// Server-side data fetching functions
// These can be used in Server Components or for initial data hydration

export async function getProducts() {
  try {
    const response = await fetchAPI<Product>("products?populate=*", {
      revalidate: 60, // Revalidate every minute
      tags: ["products"],
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProduct(slug: string) {
  try {
    const response = await fetchAPI<Product>(`products/${slug}?populate=*`, {
      revalidate: 60,
      tags: [`product-${slug}`, "products"],
    });
    return response.data[0];
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    return null;
  }
}

export async function getCategories() {
  try {
    const response = await fetchAPI<Category>("categories", {
      revalidate: 3600, // Categories change less frequently
      tags: ["categories"],
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getColors() {
  try {
    const response = await fetchAPI<Color>("colors", {
      revalidate: 3600,
      tags: ["colors"],
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching colors:", error);
    return [];
  }
}

export async function getMaterials() {
  try {
    const response = await fetchAPI<Material>("materials", {
      revalidate: 3600,
      tags: ["materials"],
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching materials:", error);
    return [];
  }
}