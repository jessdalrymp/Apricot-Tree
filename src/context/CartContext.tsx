import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CartLine } from "@/lib/types";

const STORAGE_KEY = "apricot-tree-cart";

interface CartContextValue {
  lines: CartLine[];
  addItem: (slug: string, variantId?: string, quantity?: number) => void;
  removeItem: (slug: string, variantId?: string) => void;
  updateQuantity: (slug: string, variantId: string | undefined, quantity: number) => void;
  clear: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  function addItem(slug: string, variantId?: string, quantity = 1) {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug && l.variantId === variantId);
      if (existing) {
        return prev.map((l) =>
          l.slug === slug && l.variantId === variantId ? { ...l, quantity: l.quantity + quantity } : l,
        );
      }
      return [...prev, { slug, variantId, quantity }];
    });
  }

  function removeItem(slug: string, variantId?: string) {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.variantId === variantId)));
  }

  function updateQuantity(slug: string, variantId: string | undefined, quantity: number) {
    if (quantity <= 0) {
      removeItem(slug, variantId);
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.slug === slug && l.variantId === variantId ? { ...l, quantity } : l)),
    );
  }

  function clear() {
    setLines([]);
  }

  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <CartContext.Provider value={{ lines, addItem, removeItem, updateQuantity, clear, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
