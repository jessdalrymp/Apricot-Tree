import type { Product } from "@/lib/types";
import productsData from "./products.json";

// Seed catalog, built from real Apricot Tree Press artwork pulled from Drive.
// Prices are placeholders until each design is uploaded to Printify — once it
// is, set the real price and printifyProductId in products.json. This same
// file is read by server.js to validate orders, so it's the single source of
// truth for both the frontend and the checkout API.
export const products: Product[] = productsData as Product[];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
