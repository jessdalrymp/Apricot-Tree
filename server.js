// Entry point for Hostinger's Node.js app hosting (hPanel → Node.js →
// Application startup file). Serves the built frontend (dist/) and the
// checkout API from a single persistent process, since shared hosting has
// no equivalent to Vercel-style serverless functions.
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { printifyFetch, getShopId } from "./server/printify.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, "src/data/products.json"), "utf-8"),
);

function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

const app = express();
app.use(express.json());

// GET /api/printify-products — lists the shop's live Printify catalog.
// Once this returns real data, use it to fill in the printifyProductId
// fields in src/data/products.json.
app.get("/api/printify-products", async (req, res) => {
  try {
    const shopId = getShopId();
    const data = await printifyFetch(`/shops/${shopId}/products.json`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/create-order
// Today this only validates the request and reports that payment isn't
// wired up yet. To go live: charge the card with Stripe first (using
// STRIPE_SECRET_KEY), then on successful payment call Printify's
// POST /shops/:shop_id/orders.json with line_items built from each cart
// line's printifyProductId + variant, and the shipping address below.
app.post("/api/create-order", async (req, res) => {
  const { lines, address } = req.body || {};

  if (!lines?.length) {
    return res.status(400).json({ error: "Cart is empty." });
  }

  const missingPrintifyIds = lines
    .map((l) => getProductBySlug(l.slug))
    .filter((p) => !p?.printifyProductId);

  if (missingPrintifyIds.length > 0 || !process.env.PRINTIFY_API_KEY || !process.env.STRIPE_SECRET_KEY) {
    return res.status(501).json({
      error:
        "Checkout isn't connected to Printify or Stripe yet. Add PRINTIFY_API_KEY, PRINTIFY_SHOP_ID, and STRIPE_SECRET_KEY as environment variables in the Hostinger Node.js app panel, and set printifyProductId on each product in src/data/products.json, then finish the payment step in server.js.",
    });
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

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve the built frontend for everything else (SPA routing).
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Apricot Tree server listening on port ${port}`);
});
