import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { getProductBySlug } from "@/data/products";

export default function Cart() {
  const { lines, updateQuantity, removeItem } = useCart();

  const rows = lines
    .map((line) => {
      const product = getProductBySlug(line.slug);
      if (!product) return null;
      const variant = product.variants?.find((v) => v.id === line.variantId);
      const price = variant?.price ?? product.price;
      return { line, product, variant, price };
    })
    .filter(Boolean) as { line: typeof lines[number]; product: NonNullable<ReturnType<typeof getProductBySlug>>; variant: { id: string; label: string; price: number } | undefined; price: number }[];

  const total = rows.reduce((sum, r) => sum + r.price * r.line.quantity, 0);

  if (rows.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-serif text-3xl text-apricot-800">Your cart is empty</h1>
        <Link to="/shop" className="mt-6 inline-block rounded-full bg-apricot-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-apricot-700">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-3xl text-apricot-800">Your cart</h1>

      <div className="mt-6 divide-y divide-apricot-200">
        {rows.map(({ line, product, variant, price }) => (
          <div key={`${line.slug}-${line.variantId ?? "default"}`} className="flex items-center gap-4 py-4">
            <img src={product.image} alt={product.name} className="h-20 w-20 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="font-medium text-ink">{product.name}</p>
              {variant && <p className="text-sm text-ink/60">{variant.label}</p>}
              <p className="text-sm text-apricot-700">${price.toFixed(2)}</p>
            </div>
            <input
              type="number"
              min={1}
              value={line.quantity}
              onChange={(e) => updateQuantity(line.slug, line.variantId, Number(e.target.value))}
              className="w-16 rounded-lg border border-apricot-200 px-2 py-1 text-center"
            />
            <button
              onClick={() => removeItem(line.slug, line.variantId)}
              className="text-sm text-ink/50 hover:text-apricot-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-apricot-200 pt-6">
        <p className="text-lg font-medium">Total</p>
        <p className="text-lg font-semibold text-apricot-800">${total.toFixed(2)}</p>
      </div>

      <Link
        to="/checkout"
        className="mt-6 block w-full rounded-full bg-apricot-600 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-apricot-700"
      >
        Checkout
      </Link>
    </div>
  );
}
