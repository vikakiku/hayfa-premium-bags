"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

const rupiah = (n: number) =>
  typeof n === "number"
    ? new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n)
    : "-";

function imgSrc(imageUrl?: string) {
  if (!imageUrl) return "/favicon.ico";                 // fallback sederhana
  return imageUrl.startsWith("/") ? imageUrl : `/uploads/${imageUrl}`;
}

export default function ProductTable({ items }: { items: any[] }) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  async function del(id: string) {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      startTransition(() => router.refresh());
    } else {
      alert("Failed to delete");
    }
  }

  if (!items?.length) {
    return <p className="text-gray-600">No products found.</p>;
  }

  return (
    <table className="w-full border border-gray-200 bg-white">
      <thead>
        <tr className="bg-gray-50">
          <th className="p-2 border">Thumbnail</th>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Price</th>
          <th className="p-2 border">Stock</th>
          <th className="p-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((p: any) => (
          <tr key={p._id} className="hover:bg-gray-50">
            <td className="p-2 border">
              <img
                src={imgSrc(p.imageUrl)}
                alt={p.name}
                loading="lazy"
                className="h-16 w-16 object-cover rounded"
              />
            </td>
            <td className="p-2 border">{p.name}</td>
            <td className="p-2 border">{rupiah(Number(p.price))}</td>
            <td className="p-2 border">{p.stock ?? "-"}</td>
            <td className="p-2 border whitespace-nowrap">
              <a className="underline mr-3" href={`/products/${p._id}`}>Detail</a>
              <a className="underline mr-3" href={`/products/${p._id}/edit`}>Edit</a>
              <button className="text-red-600" onClick={() => del(p._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
