import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const featured = products.slice(0, 3);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-center gap-10 sm:grid-cols-2">
          <div>
            <h1 className="font-serif text-4xl leading-tight text-apricot-800 sm:text-5xl">
              Stationery worth slowing down for.
            </h1>
            <p className="mt-5 text-lg text-ink/70">
              Notecards, journals, and paper goods designed one at a time and printed only when
              you order. No warehouse, no waste, just good paper with a little history in it.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-block rounded-full bg-apricot-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-apricot-700"
            >
              Shop the collection
            </Link>
          </div>
          <div className="overflow-hidden rounded-3xl bg-apricot-100 shadow-sm">
            <img
              src={featured[0]?.image}
              alt={featured[0]?.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-2xl text-apricot-800">Fresh off the press</h2>
          <Link to="/shop" className="text-sm font-medium text-apricot-700 hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
