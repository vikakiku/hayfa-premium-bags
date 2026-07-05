"use client";

import { useState } from "react";

type Item = {
  _id?: string;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
  stock?: number;
};

export default function ProductForm({
  mode,
  initial,
}: {
  mode: "create" | "edit";
  initial?: Item;
}) {
  // pakai initial sekali saja, tanpa useEffect
  const [f, setF] = useState<Item>(
    initial || {
      name: "",
      price: 0,
      imageUrl: "",
      description: "",
      stock: 0,
    }
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const url =
      mode === "create"
        ? "/api/products"
        : `/api/products/${initial?._id}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });

    if (res.ok) {
      window.location.href = "/products";
    } else {
      alert("Failed to save");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        className="border p-2 w-full"
        placeholder="Name"
        value={f.name}
        onChange={(e) => setF({ ...f, name: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        type="number"
        placeholder="Price"
        value={f.price}
        onChange={(e) =>
          setF({ ...f, price: Number(e.target.value) })
        }
      />
      <input
        className="border p-2 w-full"
        placeholder="Image URL"
        value={f.imageUrl || ""}
        onChange={(e) =>
          setF({ ...f, imageUrl: e.target.value })
        }
      />
      <input
        className="border p-2 w-full"
        type="number"
        placeholder="Stock"
        value={f.stock || 0}
        onChange={(e) =>
          setF({ ...f, stock: Number(e.target.value) })
        }
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={f.description || ""}
        onChange={(e) =>
          setF({ ...f, description: e.target.value })
        }
      />
      <button className="bg-black text-white py-2 px-4">
        {mode === "create" ? "Create" : "Save"}
      </button>
    </form>
  );
}
