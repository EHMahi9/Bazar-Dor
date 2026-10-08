import { Category, Product } from "@/types";

const PRIMARY_API = "https://api.api-store.workers.dev/api/bazardor";
const FALLBACK_API = "https://api.abcz.workers.dev/api/bazardor";

async function fetchWithFallback<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${PRIMARY_API}${endpoint}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`Primary API failed with status ${res.status}`);
    }
    return (await res.json()) as T;
  } catch (primaryError) {
    console.warn(`Primary API error for ${endpoint}, trying fallback...`, primaryError);
    const resFallback = await fetch(`${FALLBACK_API}${endpoint}`, {
      next: { revalidate: 60 },
    });
    if (!resFallback.ok) {
      throw new Error(`Fallback API failed with status ${resFallback.status}`);
    }
    return (await resFallback.json()) as T;
  }
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
  try {
    return await fetchWithFallback<Category[]>("/categories");
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    // Provide hardcoded fallback categories in worst case so UI never breaks
    return [
      { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
      { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
      { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
      { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
      { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
      { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
      { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
      { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
    ];
  }
}

/**
 * Fetch all products or filter by category
 */
export async function getProducts(categorySlug?: string): Promise<Product[]> {
  try {
    const endpoint = categorySlug ? `/products?category=${categorySlug}` : "/products";
    const data = await fetchWithFallback<Product[]>(endpoint);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

/**
 * Fetch a single product by slug or id
 */
export async function getProductBySlugOrId(slugOrId: string): Promise<Product | null> {
  try {
    // If it's a numeric ID, try direct endpoint first
    if (/^\d+$/.test(slugOrId)) {
      try {
        const prod = await fetchWithFallback<Product>(`/products/${slugOrId}`);
        if (prod && prod.id) return prod;
      } catch {
        // Continue to list search
      }
    }

    // Fetch all products and match by slug or id
    const products = await getProducts();
    const found = products.find(
      (p) => p.slug === slugOrId || p.id.toString() === slugOrId
    );
    return found || null;
  } catch (error) {
    console.error(`Failed to fetch product for ${slugOrId}:`, error);
    return null;
  }
}

/**
 * Fetch single category info by slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const categories = await getCategories();
    return categories.find((c) => c.slug === slug) || null;
  } catch (error) {
    console.error(`Failed to fetch category ${slug}:`, error);
    return null;
  }
}
