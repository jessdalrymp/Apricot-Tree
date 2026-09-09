import type { VercelRequest, VercelResponse } from "@vercel/node";
import { printifyFetch, getShopId } from "./_printify";

// GET /api/printify-products — lists the shop's live Printify catalog.
// Once this returns real data, use it to replace the static src/data/products.ts seed list.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const shopId = getShopId();
    const data = await printifyFetch(`/shops/${shopId}/products.json`);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
}
