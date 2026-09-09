import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-serif text-3xl">Page not found</h1>
      <p className="mt-3 text-ink/70">That page wandered off. Let's get you back to the paper goods.</p>
      <Link to="/shop" className="mt-6 inline-block rounded-full bg-apricot-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-apricot-700">
        Back to shop
      </Link>
    </div>
  );
}
