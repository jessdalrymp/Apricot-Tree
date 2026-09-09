import type { Product } from "@/lib/types";

// Seed catalog, built from real Apricot Tree Press artwork pulled from Drive.
// Prices are placeholders until each design is uploaded to Printify — once it is,
// set the real price and printifyProductId here. See the README's Printify section.
export const products: Product[] = [
  {
    slug: "offline-essentials-bag",
    name: "Offline Essentials Bag",
    description:
      "A canvas tote packed with the case for putting the phone down: a journal, a good pen, and paper worth writing on. Everything you need to spend an afternoon offline.",
    image: "/images/offline-essentials-bag-flatlay.png",
    price: 34,
    tags: ["bundle", "journal", "bag"],
  },
  {
    slug: "bookish-bundle",
    name: "Bookish Bundle",
    description:
      "A stationery collection for readers and journal-keepers, built around the same vintage floral world as our note cards. Made for margin notes, reading logs, and the occasional love letter to a book.",
    image: "/images/bookish-bundle-cover-floral.jpg",
    gallery: ["/images/bookish-bundle-cover-vintage.jpg", "/images/bookish-bundle-graphic.png"],
    price: 28,
    tags: ["bundle", "journal", "reading"],
  },
  {
    slug: "watercolor-floral-journal",
    name: "Watercolor Floral Journal",
    description:
      "A hand-painted watercolor floral cover on a journal built to actually get used, lined pages inside, no precious blank-page pressure.",
    image: "/images/watercolor-floral-journal-cover.png",
    price: 22,
    tags: ["journal", "floral"],
  },
  {
    slug: "floral-journal",
    name: "Floral Journal",
    description: "A softer, everyday floral cover for the journal that goes in your bag, not just on your shelf.",
    image: "/images/floral-journal-mockup.jpg",
    price: 20,
    tags: ["journal", "floral"],
  },
  {
    slug: "striped-journal",
    name: "Striped Journal",
    description: "Clean stripes, sturdy cover. For the person who wants a good journal without a lot of fuss on the front.",
    image: "/images/striped-journal-mockup.jpg",
    price: 20,
    tags: ["journal"],
  },
  {
    slug: "honey-bee-floral-notecards",
    name: "Honey Bee Floral Notecards",
    description:
      "Folk-art bees, roses, and honey jars, blank inside. A set that makes a thank-you note feel like a small gift on its own.",
    image: "/images/honey-bee-floral-greeting-card.png",
    gallery: ["/images/bee-jar-greeting-card.png"],
    price: 16,
    variants: [
      { id: "set-8", label: "Set of 8", price: 16 },
      { id: "set-16", label: "Set of 16", price: 28 },
    ],
    tags: ["notecards", "floral"],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
