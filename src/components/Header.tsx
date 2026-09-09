import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "Our Story" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-apricot-200/60 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="font-serif text-2xl font-semibold tracking-tight text-apricot-800">
          Apricot Tree Stationery
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors hover:text-apricot-600 ${
                  isActive ? "text-apricot-700" : "text-ink/80"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative rounded-full p-2 hover:bg-apricot-100" aria-label="Cart">
            <ShoppingBag className="h-5 w-5 text-ink" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-apricot-600 text-[11px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            className="rounded-full p-2 hover:bg-apricot-100 sm:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-apricot-200/60 bg-cream px-4 py-3 sm:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="rounded px-2 py-2 text-sm font-medium text-ink/80 hover:bg-apricot-100"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
