# Apricot Tree Stationery

A storefront for hand-designed stationery, notecards, and paper goods, printed
and shipped on demand through Printify.

## Stack

- Vite + React + TypeScript
- Tailwind CSS
- React Router
- Vercel serverless functions (`/api`) for anything that needs to talk to
  Printify or Stripe with a secret key

## Getting started

```sh
npm install
npm run dev
```

The site runs at `http://localhost:5173`. The catalog in `src/data/products.ts`
is a static seed list with placeholder pricing so the site is browsable and
demoable before Printify is connected.

## Connecting Printify

1. In Printify, go to **My Account → Connections**, generate a personal
   access token, and put it in `.env.local` as `PRINTIFY_API_KEY` (copy
   `.env.example` to `.env.local` to start).
2. Find your shop ID: call `GET /shops.json` (or check the Printify URL when
   your shop is open) and set `PRINTIFY_SHOP_ID`.
3. Create your products in Printify first (upload each design onto the
   blank product you want — notecards, journals, prints, whatever Printify's
   catalog offers). Printify assigns each one a product ID and variant IDs.
4. Deploy `api/printify-products.ts` (it's already written) and hit
   `/api/printify-products` to see your real catalog as JSON.
5. Copy each product's real Printify `id` into the matching entry's
   `printifyProductId` field in `src/data/products.ts`, and swap in the real
   price and image. This keeps the fast static catalog for browsing while
   still routing real orders to the right Printify product.

## Payment + order flow

`api/create-order.ts` is scaffolded but intentionally refuses to place a real
order until it's finished: it needs a Stripe charge wired in before the
Printify order call. To finish it:

1. Add `STRIPE_SECRET_KEY` (server) and `VITE_STRIPE_PUBLISHABLE_KEY` (client)
   to your environment.
2. In `api/create-order.ts`, create and confirm a Stripe PaymentIntent for the
   cart total before the `printifyFetch` call that creates the Printify
   order. Only call Printify once the charge succeeds.
3. Printify handles printing and shipping once the order lands in your shop;
   there's nothing else to run on your end per order.

Until that's done, checkout will show a clear "not connected yet" message
instead of silently failing or taking a payment that can't be fulfilled.

## Deploying

The project is set up for Vercel (the `/api` folder maps to serverless
functions automatically, `vercel.json` handles SPA routing). Push to GitHub,
import the repo in Vercel, and add the environment variables from
`.env.example` in the Vercel project settings. Netlify works too, but the
`/api` functions would need to move to `netlify/functions` first.

## Product photography

Real photos from the Apricot Tree Stationery Google Drive live in
`public/images/`. Swap or add to these as new designs are ready — square or
4:5 images work best for the product grid.

## Selling on Pinterest, Instagram, TikTok, and building YouTube

These aren't things a codebase can do for you, they're accounts and content.
Here's the practical path for each, once the site is live at a real domain:

**Pinterest** — Create a Pinterest **Business** account (free), verify the
website domain in Pinterest settings so Rich Pins work, then enable Rich
Pins for products (Pinterest reads Open Graph / product metadata from each
product page — the product pages here already have `name`, `description`,
and `image`, so once the site is live add basic product meta tags and
submit the domain for Rich Pin validation). Pin each product photo linking
straight to its product page. Pinterest rewards steady, regular pinning
more than big batches.

**Instagram** — Convert to a Business or Creator account, connect a Meta
Commerce account, and set up **Instagram Shopping** by connecting a product
catalog. Printify itself doesn't push to Instagram directly, so the catalog
either comes from a Meta Commerce Manager CSV feed you export from your
product list, or through a sales channel like Shopify if you ever add one
in front of Printify. Until then, product posts and Stories linking to the
site work fine and cost nothing to set up.

**TikTok** — Apply for **TikTok Shop** (US sellers need approval and a
business entity in most cases) or simply post content and link out via the
bio/link-in-bio to the site. TikTok Shop has its own fulfillment and catalog
requirements separate from Printify, so it's the heavier lift of the three;
starting with organic content and a bio link is the realistic first step.

**YouTube** — Create the channel, pick a consistent upload rhythm (even
monthly is fine to start), and lean into process content: design walkthroughs,
"what's new in the shop," packaging/unboxing, the history behind a design
(the Regency florals and the 1916 vintage set both have real stories worth
telling). Link the shop in every video description and the channel banner.

None of this requires code, but if you want, this project can grow a
`/press` or `/media-kit` page, an Open Graph image per product, or a CSV
export script for Meta/TikTok catalogs, just ask.
