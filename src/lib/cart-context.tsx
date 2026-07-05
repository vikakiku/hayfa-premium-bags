"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type CartItemBase = {
  id: string;
  name: string;
  price: number | null;
  imageUrl: string;
};

export type CartItem = CartItemBase & {
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItemBase, qty?: number) => void;
  removeItem: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
  tax: number;
  grandTotal: number;
};

const CartContext = createContext<CartContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "hayfa_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load dari localStorage sekali saat mount (client-side)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const loaded: CartItem[] = parsed.map((it: any) => ({
          id: String(it.id),
          name: String(it.name),
          price: it.price ?? null,
          imageUrl: it.imageUrl ?? "",
          qty: Number(it.qty ?? 1),
        }));

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(loaded);
      }
    } catch {
      console.warn("Failed to parse cart items");
    }
  }, []);

  // Simpan ke localStorage setiap ada perubahan
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(items)
        );
      }
    } catch {
      // abaikan error write
    }
  }, [items]);

  const addItem = (item: CartItemBase, qty: number = 1) => {
    if (!item.id) return;

    setItems((prev) => {
      const existing = prev.find((it) => it.id === item.id);

      if (existing) {
        return prev.map((it) =>
          it.id === item.id ? { ...it, qty: it.qty + qty } : it
        );
      }

      return [
        ...prev,
        {
          ...item,
          qty: qty > 0 ? qty : 1,
        },
      ];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const increase = (id: string) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: it.qty + 1 } : it
      )
    );
  };

  const decrease = (id: string) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id && it.qty > 1
          ? { ...it, qty: it.qty - 1 }
          : it
      )
    );
  };

  const clear = () => setItems([]);

  const subtotal = items.reduce(
    (sum, it) => sum + (it.price ?? 0) * it.qty,
    0
  );
  const tax = Math.round(subtotal * 0.11); // contoh 11% PPN
  const grandTotal = subtotal + tax;
  const totalItems = items.reduce((sum, it) => sum + it.qty, 0);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    increase,
    decrease,
    clear,
    totalItems,
    subtotal,
    tax,
    grandTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
