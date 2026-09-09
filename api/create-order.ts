import type { VercelRequest, VercelResponse } from "@vercel/node";
import { printifyFetch, getShopId } from "./_printify";
import type { CartLine } from "../src/lib/types";
import { getProductBySlug } from "../src/data/products";

interface CheckoutBody {
  lines: CartLine[];
  address: Record<string, string>;
}

// POST /api/create-order
// Today this only validates the request and reports that payment isn't wired up yet.
// To go live: charge the card with Stripe first (using STRIPE_SECRET_KEY), then on
// successful payment call POST /shops/:shop_id/orders.json on Printify with line_items
// built from each cart line's printifyProductId + variant, and the shipping address below.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { lines, address } = req.body as CheckoutBody;

  if (!lines?.length) {
    res.status(400).json({ error: "Cart is empty." });
    return;
  }

  const missingPrintifyIds = lines
    .map((l) => getProductBySlug(l.slug))
    .filter((p) => !p?.printifyProductId);

  if (missingPrintifyIds.length > 0 || !process.env.PRINTIFY_API_KEY || !process.env.STRIPE_SECRET_KEY) {
    res.status(501).json({
      error:
        "Checkout isn't connected to Printify or Stripe yet. Add PRINTIFY_API_KEY, PRINTIFY_SHOP_ID, and STRIPE_SECRET_KEY, and set printifyProductId on each product in src/data/products.ts, then complete the payment + order call in api/create-order.ts.",
    });
    return;
  }

  try {
    const shopId = getShopId();
    const order = await printifyFetch(`/shops/${shopId}/orders.json`, {
      method: "POST",
      body: JSON.stringify({
        external_id: `order-${Date.now()}`,
        line_items: lines.map((l) => ({
          product_id: getProductBySlug(l.slug)?.printifyProductId,
          variant_id: l.variantId,
          quantity: l.quantity,
        })),
        shipping_method: 1,
        address_to: address,
      }),
    });

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
}
