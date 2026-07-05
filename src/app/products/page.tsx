// src/app/products/page.tsx

export const runtime = "nodejs";
export const dynamic = "force-dynamic";       // jangan SSG
export const fetchCache = "force-no-store";   // jangan cache
export const revalidate = 0;                  // jangan pregenerate

import fs from "fs";
import path from "path";
import { getProductImage } from "@/lib/product-images";

type Product = {
  id?: string | number;
  _id?: string | number;
  name: string;
  price?: number | null;
  slug?: string;
};

// base URL untuk fetch API
const base =
  process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
  "http://localhost:3000";

// nama2 yang ingin disembunyikan dari UI
const HIDDEN_NAMES = new Set(
  [
    "Azmina",
    "Jawhara",
    "Liyana",
    "Nayyara",
    "Noura",
    "Raniya",
    "Riham",
    "Ruwayda",
    "Safiyya",
    "Thara",
    "Yasira",
    "Yusra",
    "Sahira",
    "Zarfa",
  ].map((n) => n.toLowerCase())
);

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// cek apakah file gambar ada di /public
function imageExists(imagePath: string): boolean {
  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  const fullPath = path.join(process.cwd(), "public", cleanPath);
  return fs.existsSync(fullPath);
}

// format Rupiah
const fmtIDR = (n?: number | null) =>
  typeof n === "number" && n > 0
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(n)
    : "";

// ambil semua produk dari API
async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${base}/api/products`, {
      cache: "no-store",         // fix utama
      next: { revalidate: 0 },   // pastikan tidak di-prebuild
    });

    if (!res.ok) return [];

    const raw = (await res.json()) as any[];

    return raw.map((p, i) => ({
      id: p.id ?? p._id ?? i,
      _id: p._id,
      name: String(p.name ?? "Product"),
      price:
        typeof p.price === "number" ? p.price : Number(p.price ?? "") || null,
      slug: p.slug ? String(p.slug) : undefined,
    }));
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  // filter:
  // 1) nama tidak ada di HIDDEN_NAMES
  // 2) file gambar benar-benar ada di /public/uploads
  const visible = products.filter((p) => {
    const name = p.name.trim();
    if (!name) return false;

    if (HIDDEN_NAMES.has(name.toLowerCase())) return false;

    const imgPath = getProductImage(name); // contoh: /uploads/Firdaws.jpg
    return imageExists(imgPath);
  });

  return (
    <main>
      {/* NAVBAR SEDERHANA */}
      <header className="products-header">
        <div className="products-header__inner">
          <div />
          <nav className="products-header__center">
            <a href="/">Home Page</a>
            <a href="/products" aria-current="page">
              All Products
            </a>
            <a href="/about">About Us</a>
          </nav>
          <div className="products-header__right">
            <a href="/cart" className="avatar-btn" aria-label="View cart">
              🛒
            </a>
            <a href="/login" className="avatar-btn" aria-label="Log in">
              👤
            </a>
          </div>
        </div>
      </header>

      <section className="products-section container">
        <h1 className="section-title">Product List</h1>
        <p className="section-sub">
          Discover our collection of timeless leather pieces crafted with
          passion, precision, and purpose.
        </p>

        {visible.length === 0 ? (
          <p className="muted" style={{ marginTop: 24 }}>
            No products available.
          </p>
        ) : (
          <div className="grid" style={{ marginTop: 32 }}>
            {visible.map((p, index) => {
              const img = getProductImage(p.name);
              const priceText = fmtIDR(p.price);
              const slug = p.slug ?? slugify(p.name);

              const key =
                p.id?.toString() ??
                p._id?.toString() ??
                `${p.name}-${index}`;

              return (
                <a
                  key={key}
                  href={`/products/${slug}`}
                  className="card card-link"
                >
                  <img
                    src={img}
                    alt={p.name}
                    className="card-img"
                    loading="lazy"
                  />
                  <div className="card-meta">
                    <div className="card-title">{p.name}</div>
                    <div className="card-sub">
                      Leather Collection
                      {priceText && <> • {priceText}</>}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
