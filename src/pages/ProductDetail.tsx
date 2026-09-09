import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { getProductBySlug } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { addItem } = useCart();
  const [variantId, setVariantId] = useState(product?.variants?.[0]?.id);
  const [added, setAdded] = useState(false);

  if (!product) return <Navigate to="/shop" replace />;

  const activeVariant = product.variants?.find((v) => v.id === variantId);
  const price = activeVariant?.price ?? product.price;

  function handleAdd() {
    addItem(product!.slug, variantId, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Link to="/shop" className="text-sm text-apricot-700 hover:underline">
        ← Back to shop
      </Link>

      <div className="mt-6 grid gap-10 sm:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-apricot-100">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div>
          <h1 className="font-serif text-3xl text-apricot-800">{product.name}</h1>
          <p className="mt-2 text-xl text-apricot-700">${price.toFixed(2)}</p>
          <p className="mt-5 text-ink/75">{product.description}</p>

          {product.variants && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-ink/80">Options</label>
              <div className="mt-2 flex gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVariantId(v.id)}
                    className={`rounded-full border px-4 py-1.5 text-sm ${
                      variantId === v.id
                        ? "border-apricot-600 bg-apricot-600 text-white"
                        : "border-apricot-300 text-ink/80 hover:border-apricot-500"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleAdd}
            className="mt-8 w-full rounded-full bg-apricot-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-apricot-700 sm:w-auto sm:px-10"
          >
            {added ? "Added ✓" : "Add to cart"}
          </button>

          <p className="mt-4 text-xs text-ink/50">
            Made to order and shipped via Printify. Typically ships in 3–7 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
