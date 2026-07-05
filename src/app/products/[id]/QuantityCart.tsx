// src/app/products/[id]/QuantityCart.tsx
"use client";

import { useState } from "react";

type QuantityCartProps = {
  priceText?: string | null;
};

export default function QuantityCart({ priceText }: QuantityCartProps) {
  const [qty, setQty] = useState(1);

  const decrease = () => setQty((q) => (q > 1 ? q - 1 : 1));
  const increase = () => setQty((q) => (q < 9 ? q + 1 : 9));

  const displayQty = qty.toString().padStart(2, "0");

  return (
    <div className="pdetail-controls">
      <div className="pdetail-row">
        <div className="qty">
          <button
            type="button"
            onClick={decrease}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span>{displayQty}</span>
          <button
            type="button"
            onClick={increase}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className="price">
          {priceText ? (
            priceText
          ) : (
            <span className="muted">Price on request</span>
          )}
        </div>
      </div>

      <div className="pdetail-cta">
        <button type="button" className="btn-primary wide">
          Add to Cart
        </button>
        <button
          type="button"
          className="btn-heart"
          aria-label="Add to wishlist"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z"
              stroke="currentColor"
              strokeWidth="1.6"
              fill="none"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
