import { Link } from "react-router-dom";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/shop/${product.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-apricot-200/60 transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="aspect-[4/5] overflow-hidden bg-apricot-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg text-ink">{product.name}</h3>
        <p className="mt-1 text-sm text-apricot-700">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
