// src/app/api/products/mock.ts
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

type Item = {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
  stock?: number;
  createdAt: string;
  updatedAt: string;
};

// in-memory store
const store: Item[] = [];

// helper waktu ISO
const now = () => new Date().toISOString();

// Seed dari /public/uploads kalau store masih kosong
function seedFromPublicUploads() {
  if (store.length > 0) return;

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) return;

  const files = fs
    .readdirSync(uploadsDir)
    .filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f));

  files.forEach((filename, idx) => {
    const name = path.parse(filename).name; // “Dhaif”, “Firdaus”, dll.
    store.push({
      _id: randomUUID(),
      name: name.replace(/[-_]/g, " "),
      price: 100000 + idx * 25000,        // harga dummy
      imageUrl: `/uploads/${filename}`,   // ✅ path public yg benar
      description: `Auto-seeded item for ${name}`,
      stock: 10 + (idx % 5),
      createdAt: now(),
      updatedAt: now(),
    });
  });

  // Jika folder kosong, kasih 1 contoh
  if (store.length === 0) {
    store.push({
      _id: "seed-1",
      name: "Sample Wallet",
      price: 350000,
      imageUrl: "/uploads/sample-wallet.jpg",
      description: "Premium leather wallet (sample).",
      stock: 12,
      createdAt: now(),
      updatedAt: now(),
    });
  }
}

export const mock = {
  list(): Item[] {
    seedFromPublicUploads();          // ⬅️ otomatis seed sekali saja
    return [...store].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  },
  get(id: string): Item | undefined {
    return store.find((x) => x._id === id);
  },
  create(data: Partial<Item>): Item {
    const item: Item = {
      _id: randomUUID(),
      name: data.name || "Unnamed",
      price: Number(data.price ?? 0),
      imageUrl: data.imageUrl || "",
      description: data.description || "",
      stock: Number(data.stock ?? 0),
      createdAt: now(),
      updatedAt: now(),
    };
    store.push(item);
    return item;
  },
  update(id: string, data: Partial<Item>): Item | undefined {
    const idx = store.findIndex((x) => x._id === id);
    if (idx === -1) return undefined;
    const cur = store[idx];
    const updated: Item = {
      ...cur,
      ...data,
      price: data.price !== undefined ? Number(data.price) : cur.price,
      stock: data.stock !== undefined ? Number(data.stock) : cur.stock,
      updatedAt: now(),
    };
    store[idx] = updated;
    return updated;
  },
  remove(id: string): boolean {
    const idx = store.findIndex((x) => x._id === id);
    if (idx === -1) return false;
    store.splice(idx, 1);
    return true;
  },
};
