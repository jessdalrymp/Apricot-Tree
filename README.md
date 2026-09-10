# Apricot Tree Stationery

A storefront for hand-designed stationery, notecards, and paper goods, printed
and shipped on demand through Printify.

**Current path:** [`wordpress-theme/`](./wordpress-theme) — a WordPress +
WooCommerce theme, connected to Printify's own WooCommerce plugin for
fulfillment. Start with `wordpress-theme/README.md`.

The React/Vite build documented below was the first pass, before switching
to WooCommerce for the Printify connection. It's kept here since it still
works standalone and the branding/photography match, but WordPress is the
one actually being set up.

## Stack

- Vite + React + TypeScript (the storefront)
- Tailwind CSS
- React Router
- Express (`server.js`) — a single persistent Node process that serves the
  built site and the checkout API together, built for Hostinger's Node.js
  app hosting rather than serverless functions

## Getting started

```sh
npm install
npm run dev
```

The site runs at `http://localhost:5173`. The catalog in
`src/data/products.json` is a static seed list with placeholder pricing so
the site is browsable and demoable before Printify is connected.

To test the checkout API locally too, run the Express server alongside Vite
in a second terminal:

```sh
npm run dev:server
```

Vite proxies `/api` requests to it automatically (see `vite.config.ts`).

## Connecting Printify

1. In Printify, go to **My Account → Connections**, generate a personal
   access token, and put it in `.env.local` as `PRINTIFY_API_KEY` (copy
   `.env.example` to `.env.local` to start).
2. Find your shop ID: call `GET /shops.json` (or check the Printify URL when
   your shop is open) and set `PRINTIFY_SHOP_ID`.
3. Create your products in Printify first (upload each design onto the
   blank product you want — notecards, journals, prints, whatever Printify's
   catalog offers). Printify assigns each one a product ID and variant IDs.
4. Run the server (`npm run dev:server` locally, or once deployed) and hit
   `/api/printify-products` to see your real catalog as JSON.
5. Copy each product's real Printify `id` into the matching entry's
   `printifyProductId` field in `src/data/products.json`, and swap in the
   real price and image. This keeps the fast static catalog for browsing
   while still routing real orders to the right Printify product.

## Payment + order flow

`server.js` is scaffolded but intentionally refuses to place a real order
until it's finished: it needs a Stripe charge wired in before the Printify
order call. To finish it:

1. Add `STRIPE_SECRET_KEY` (server) and `VITE_STRIPE_PUBLISHABLE_KEY` (client)
   to your environment.
2. In `server.js`, create and confirm a Stripe PaymentIntent for the cart
   total inside the `/api/create-order` route, before the `printifyFetch`
   call that creates the Printify order. Only call Printify once the charge
   succeeds.
3. Printify handles printing and shipping once the order lands in your shop;
   there's nothing else to run on your end per order.

Until that's done, checkout will show a clear "not connected yet" message
instead of silently failing or taking a payment that can't be fulfilled.

## Deploying to Hostinger

Hostinger's **Premium** plan is static-hosting only, no Node runtime, so
`server.js` can't run there. That's fine for now: checkout can't process a
real payment yet anyway (no Printify or Stripe keys), so there's nothing
the Node backend would be doing today that a static upload can't cover.

### Now, on Premium: static upload

1. Build it: `npm install && npm run build`. This produces a `dist/`
   folder — that folder's *contents* (not the folder itself) are what go
   on the server.
2. In hPanel, open **File Manager** (or connect over SFTP) and go to
   `public_html`. Clear out any placeholder `index.html` that's already
   there.
3. Upload everything from inside `dist/` into `public_html` — `index.html`,
   the `assets/` folder, `images/`, and the `.htaccess` file. That last one
   matters: without it, visiting `/shop` or `/about` directly (instead of
   clicking there from the homepage) will 404, since this is a
   single-page app and Apache needs to be told to hand every route to
   `index.html`. File Manager sometimes hides dotfiles by default — turn on
   "show hidden files" if you don't see it after uploading.
4. Visit your domain. Browsing, the cart, and the contact form all work.
   The checkout button will show an honest "not connected yet" message
   instead of pretending to take a payment.
5. Any time the catalog or code changes, repeat steps 1 and 3.

### Later, once Printify + Stripe are ready: upgrade for real checkout

Real checkout needs a server that can hold `PRINTIFY_API_KEY` and
`STRIPE_SECRET_KEY` secrets and talk to those APIs, `server.js` in this repo
already does that, but it needs an actual Node process to run in. That
means Hostinger's **Business** plan (Node.js / "Web Apps" hosting) or
another Node host such as Railway or Render.

Once you're on a plan with Web Apps / Node.js hosting:

1. Connect this GitHub repo through Hostinger's Web Apps deployment flow
   (or `git clone` it over SSH if you're setting it up manually).
2. Set the **application startup file** to `server.js`, Node version 18+.
3. Add `PRINTIFY_API_KEY`, `PRINTIFY_SHOP_ID`, `STRIPE_SECRET_KEY`, and
   `VITE_STRIPE_PUBLISHABLE_KEY` as environment variables in that same
   panel (the `VITE_` one has to be set *before* `npm run build` runs,
   since Vite bakes it into the built files rather than reading it live).
4. Run `npm install` then `npm run build`, then start the app.

From then on, `server.js` serves both the site and the checkout API from
one process, no more separate static upload step.

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
