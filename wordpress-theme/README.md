# Apricot Tree — WordPress + WooCommerce

A Storefront child theme for Apricot Tree Stationery. It inherits all of
WooCommerce's cart, checkout, and account pages from the Storefront parent
theme (so they're tested and just work), with the Apricot Tree branding,
fonts, and real product photography layered on top, plus a custom homepage.

This replaces the earlier React/Vite build in the rest of this repo as the
main path, since Printful's official plugin connects straight to
WooCommerce and doesn't need any custom checkout code.

Fulfillment runs through **Printful**. Printify and Gelato were both tried
first and neither would connect, so anything in this repo still referring to
Printify is leftover from that attempt and applies only to the retired React
build.

## What's in this folder

```
apricot-tree/
  style.css          theme header + all custom CSS (colors, fonts, layout)
  functions.php       enqueues styles/fonts, footer social icons, Customizer settings
  template-home.php   the custom homepage (hero + featured products)
  assets/images/      real Apricot Tree product photography
```

Everything else — the shop grid, individual product pages, cart, checkout,
and my-account pages — comes straight from the Storefront parent theme.
That's the point of a child theme: none of that had to be rebuilt, and it
stays reliable as WooCommerce updates.

## Setup, start to finish

### 1. WordPress

If WordPress isn't already installed on your Hostinger account: hPanel →
Websites → Add Website → there's a one-click WordPress install. Point it at
your domain (or a subdomain like `shop.yourdomain.com` if you'd rather keep
the two separate for now).

### 2. WooCommerce

In your new WordPress admin, go to **Plugins → Add New**, search
"WooCommerce," install and activate it. It'll launch a setup wizard, store
address, currency, etc. Feel free to skip the theme it offers to install,
that's what this folder replaces.

### 3. This theme

Zip the `apricot-tree` folder (just that folder, not `wordpress-theme`
itself) and upload it: **Appearance → Themes → Add New → Upload Theme**.
Activate it once it's installed. Because it's a child theme, WordPress will
also need the **Storefront** parent theme present, install that first from
the WordPress theme directory (Appearance → Themes → Add New → search
"Storefront" → Install, no need to activate it, just having it installed is
enough) if it isn't already there, *then* upload and activate this child
theme.

### 4. Set the homepage

Go to **Pages → Add New**, title it "Home," in the **Page Attributes**
panel on the right choose the **Apricot Tree Home** template, and publish.
Then go to **Settings → Reading**, set "Your homepage displays" to **A
static page**, and choose the Home page you just made.

### 5. Printful

Install the official plugin: **Plugins → Add New**, search "Printful,"
install and activate. It'll walk you through connecting your Printful
account. Once connected, build each product in Printful's own dashboard and
push it to the store from there, that's what creates the listing here with
the right variants, mockups, and pricing.

Product descriptions are written on the Printful side, not in WooCommerce,
since Printful overwrites the WooCommerce copy each time it syncs a product.

### 6. Payment gateway

WooCommerce needs a way to actually charge a card, Printful doesn't handle
that part. **Plugins → Add New**, search "WooCommerce Stripe Gateway" (or
whichever processor you'd rather use, PayPal's official plugin works the
same way), install, activate, and follow its setup to connect your Stripe
account. Without this step, checkout will look right but won't be able to
take a real payment.

### 7. Make it yours

**Appearance → Customize** has three things ready to edit without touching
code:
- **Site Identity** → upload the Apricot Tree logo as the site logo.
- **Apricot Tree Homepage** → edit the hero heading and text.
- **Apricot Tree Social Links** → paste in real Pinterest, Instagram,
  TikTok, and YouTube URLs as those accounts go live (Instagram's already
  confirmed as `@apricot_tree_stationery`, so that one's already prefilled correctly).

Everything else, page content, product descriptions, images, is editable
straight through the normal WordPress and WooCommerce screens from here on,
no code needed for day-to-day changes.
