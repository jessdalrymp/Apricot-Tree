import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { getProductBySlug } from "@/data/products";

export default function Checkout() {
  const { lines, clear } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rows = lines
    .map((line) => {
      const product = getProductBySlug(line.slug);
      if (!product) return null;
      const variant = product.variants?.find((v) => v.id === line.variantId);
      return { line, product, price: variant?.price ?? product.price };
    })
    .filter(Boolean) as { line: typeof lines[number]; product: NonNullable<ReturnType<typeof getProductBySlug>>; price: number }[];

  const total = rows.reduce((sum, r) => sum + r.price * r.line.quantity, 0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const address = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines, address }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Checkout isn't wired up to Printify yet.");
      }

      clear();
      navigate("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong placing the order.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (rows.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-serif text-3xl text-apricot-800">Nothing to check out</h1>
        <p className="mt-3 text-ink/70">Add something to your cart first.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-3xl text-apricot-800">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" name="name" required />
          <Field label="Email" name="email" type="email" required />
        </div>
        <Field label="Address" name="address1" required />
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="City" name="city" required />
          <Field label="State" name="state" required />
          <Field label="ZIP" name="zip" required />
        </div>
        <Field label="Country" name="country" required defaultValue="US" />

        <div className="rounded-xl bg-apricot-50 p-4 text-sm text-ink/70">
          Payment and Printify order creation happen in <code>api/create-order.ts</code>, which
          currently needs <code>PRINTIFY_API_KEY</code>, <code>PRINTIFY_SHOP_ID</code>, and{" "}
          <code>STRIPE_SECRET_KEY</code> set as environment variables before real orders can go
          through. See the README's Printify section.
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center justify-between border-t border-apricot-200 pt-4">
          <p className="text-lg font-medium">Total</p>
          <p className="text-lg font-semibold text-apricot-800">${total.toFixed(2)}</p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-apricot-600 px-6 py-3 text-sm font-semibold text-white hover:bg-apricot-700 disabled:opacity-60"
        >
          {submitting ? "Placing order…" : "Place order"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink/80">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-lg border border-apricot-200 px-3 py-2 focus:border-apricot-500 focus:outline-none"
      />
    </div>
  );
}
