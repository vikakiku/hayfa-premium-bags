// src/app/products/[id]/page.tsx
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import ProductActions from "../../../components/product-actions";
import { getProductImage } from "@/lib/product-images";

type Item = {
  _id: string;
  name: string;
  price?: number | null;
  stock?: number | null;
  imageUrl: string;
};

const base =
  process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
  "http://localhost:3000";

async function safeJson(url: string): Promise<any[]> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// meta katalog untuk detail
const PRODUCT_META: Record<
  string,
  { category: string; collection: string; blurb?: string }
> = {
  Dhaif: {
    category: "Top-handle Tote",
    collection: "Heritage Leather",
    blurb: "A structured tote designed for everyday poise.",
  },
  Firdaws: {
    category: "Shoulder Bag",
    collection: "Signature Line",
    blurb: "Soft curves and clean lines for a refined silhouette.",
  },
  Firyal: {
    category: "Hobo Bag",
    collection: "Bloom Series",
    blurb: "A relaxed hobo with floral cues and generous space.",
  },
  Ghubar: {
    category: "Office Tote",
    collection: "Executive Edit",
    blurb: "Boardroom-ready, with quiet confidence.",
  },
  Hijaz: { category: "Half-moon Hobo", collection: "Classic Capsule" },
  Joud: { category: "Bucket Bag", collection: "Boutonnière" },
  Layli: { category: "Evening Clutch", collection: "Nocturne" },
  Maghfira: { category: "Mini Denim Tote", collection: "Atelier Denim" },
  Mahra: { category: "Crossbody", collection: "Rattan Blend" },
  Nibras: { category: "Vanity Bag", collection: "Cottage Weave" },
  Raqi: { category: "Shoulder Bag", collection: "Satin Sage" },
  Rawya: { category: "Top-zip Shoulder", collection: "Terra Cotta" },
};

const getMeta = (name: string) =>
  PRODUCT_META[name] ?? {
    category: "Leather Bag",
    collection: "Core Collection",
    blurb: "A timeless leather piece crafted with care.",
  };

const fmtIDR = (n?: number | null) =>
  typeof n === "number" && n > 0
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(n)
    : "";

// Ambil semua item dari DB, gambar dari public/uploads
async function getItemsFromDb(): Promise<Item[]> {
  const data = await safeJson(`${base}/api/products`);

  const items: Item[] = (data || []).map((p: any) => {
    const name = String(p.name ?? "Unnamed");
    return {
      _id: String(p.id ?? p._id ?? name),
      name,
      price: typeof p.price === "number" ? p.price : Number(p.price ?? 0),
      stock: typeof p.stock === "number" ? p.stock : null,
      imageUrl: getProductImage(name),
    };
  });

  return items;
}

export default async function ProductDetailPage(props: {
  params: Promise<{ id?: string | string[] }>;
}) {
  const resolved = await props.params;
  const idParam = resolved.id;

  const raw =
    Array.isArray(idParam) ? idParam[0] : idParam ? String(idParam) : "";
  const key = decodeURIComponent(raw).toLowerCase();

  const items = await getItemsFromDb();

  const product =
    items.find((x) => slugify(x.name) === key) ||
    items.find((x) => x._id.toLowerCase() === key) ||
    items.find((x) => x.name.toLowerCase() === key);

  if (!product) {
    return (
      <main className="container" style={{ padding: "64px 24px" }}>
        <h1 className="section-title">Product not found</h1>
        <p className="muted" style={{ marginTop: 8 }}>
          The item you’re looking for is unavailable. Please return to{" "}
          <a href="/products" className="link">
            All Products
          </a>
          .
        </p>
      </main>
    );
  }

  const meta = getMeta(product.name);
  const priceText = fmtIDR(product.price);

  return (
    <main className="container pdetail">
      {/* breadcrumb */}
      <nav className="pdetail-breadcrumb">
        <a href="/" className="link">
          Home
        </a>
        <span> / </span>
        <a href="/products" className="link">
          Products
        </a>
        <span> / </span>
        <span className="muted">{product.name}</span>
      </nav>

      <section className="pdetail-grid">
        {/* LEFT: text & controls */}
        <div className="pdetail-info">
          <h1 className="pdetail-title">{product.name}</h1>
          <p className="pdetail-sub">
            {meta.category} • {meta.collection}
          </p>
          {meta.blurb && <p className="pdetail-blurb">{meta.blurb}</p>}

          {/* thumbnail utama */}
          <div className="pdetail-thumbs">
            <img src={product.imageUrl} alt={product.name} />
          </div>

          <ProductActions product={product} />

          <div className="pdetail-price-row">
            {priceText ? (
              <span className="pdetail-price">{priceText}</span>
            ) : (
              <span className="muted">Price on request</span>
            )}
          </div>
        </div>

        {/* RIGHT: hero image */}
        <div className="pdetail-media">
          <img src={product.imageUrl} alt={product.name} />
        </div>
      </section>
    </main>
  );
}
