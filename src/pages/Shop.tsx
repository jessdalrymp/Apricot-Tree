import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Shop() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-3xl text-apricot-800">Shop</h1>
      <p className="mt-2 text-ink/70">Every piece is printed to order, so it's made just for you.</p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
