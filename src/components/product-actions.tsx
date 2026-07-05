"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export type DetailItem = {
  _id: string;
  name: string;
  price?: number | null;
  imageUrl: string;
};

type ProductActionsProps = {
  product: DetailItem;
};

export default function ProductActions({ product }: ProductActionsProps) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState<"idle" | "added">("idle");

  const canDecrease = qty > 1;

  const handleDecrease = () => {
    if (!canDecrease) return;
    setQty((q) => q - 1);
  };

  const handleIncrease = () => {
    setQty((q) => q + 1);
  };

  const handleAddToCart = () => {
    // map _id -> id untuk cart
    addItem(
      {
        id: product._id,
        name: product.name,
        price: product.price ?? null,
        imageUrl: product.imageUrl,
      },
      qty
    );

    setStatus("added");
    setTimeout(() => setStatus("idle"), 1500);
  };

  const qtyLabel = qty.toString().padStart(2, "0");

  return (
    <div className="pdetail-actions">
      {/* row qty + button */}
      <div className="pdetail-actions-row">
        <div className="pdetail-qty-wrapper">
          <button
            type="button"
            onClick={handleDecrease}
            className={`pdetail-qty-btn ${
              canDecrease ? "" : "pdetail-qty-btn-disabled"
            }`}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="pdetail-qty-value">{qtyLabel}</span>
          <button
            type="button"
            onClick={handleIncrease}
            className="pdetail-qty-btn"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="btn-primary pdetail-add-btn"
        >
          Add to Cart
        </button>
      </div>

      {status === "added" && (
        <p className="pdetail-added-notice">
          Item successfully added to cart.
        </p>
      )}
    </div>
  );
}
