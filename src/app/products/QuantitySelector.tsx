"use client";

import { useState } from "react";

type QuantitySelectorProps = {
  min?: number;
  max?: number;
  initial?: number;
};

export function QuantitySelector({
  min = 1,
  max = 9,
  initial = 1,
}: QuantitySelectorProps) {
  const [qty, setQty] = useState(initial);

  const dec = () => setQty((q) => (q > min ? q - 1 : q));
  const inc = () => setQty((q) => (q < max ? q + 1 : q));

  return (
    <div className="qty">
      <button onClick={dec} aria-label="Decrease">
        −
      </button>
      <span>{String(qty).padStart(2, "0")}</span>
      <button onClick={inc} aria-label="Increase">
        +
      </button>
    </div>
  );
}
