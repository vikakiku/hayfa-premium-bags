// src/app/page.tsx
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import fs from "fs";
import path from "path";

type Photo = { id: string; name: string; src: string };

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Products that have images in public/uploads (production-safe)
const PRODUCTS_WITH_IMAGES = new Set([
  "firdaws", "firyal", "ghubar", "hijaz", "joud", "maghfira", "mahra", 
  "nibras", "raqi", "rawya", "rim", "saifan", "salsabil", "sana", 
  "shams", "tiba", "wahaj", "warda", "zahwa", "zumurrud"
]);

// Check if product has image (production-safe)
function hasProductImage(productName: string): boolean {
  try {
    const cleanName = productName.toLowerCase().trim();
    
    // First try filesystem check (works in development)
    if (process.env.NODE_ENV !== 'production') {
      const imagePath = `/uploads/${productName}.jpg`;
      const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
      const fullPath = path.join(process.cwd(), "public", cleanPath);
      return fs.existsSync(fullPath);
    }
    
    // For production, use hardcoded list
    return PRODUCTS_WITH_IMAGES.has(cleanName);
  } catch {
    return false;
  }
}

async function getFeatured(): Promise<Photo[]> {
  try {
    // For server-side rendering, we need absolute URL
    // Try localhost first (works in most container environments)
    const apiUrl = 'http://localhost:3000/api/products';
    
    console.log('Fetching from:', apiUrl);
    
    const res = await fetch(apiUrl, {
      cache: "no-store",
    });
    
    console.log('Response status:', res.status, 'OK:', res.ok);
    
    if (!res.ok) {
      console.error('API response not OK:', res.status, res.statusText);
      return [];
    }

    const data = (await res.json()) as {
      id: string;
      name: string;
      image?: string;
      src?: string;
    }[];

    console.log('API returned', data.length, 'products');
    
    // normalize data
    const normalized = data.map((x, i) => ({
      id: x.id ?? `u-${i}`,
      name: x.name ?? "Product",
      src: (x as any).src ?? (x as any).image ?? "",
    })) as Photo[];

    console.log('Normalized', normalized.length, 'products');

    // Products already shown in Top Purchases section - UNCOMMENT FOR DEMO
     const topPurchasesProducts = new Set(['maghfira', 'warda', 'ghubar']);

    // hide inspire images on homepage
    const hidden = new Set(["inspire1", "inspire2", "inspire3"]);
    const visible = normalized.filter((x) => {
      const nm = (x.name || "").toLowerCase();
      const fn = x.src.split("/").pop()?.toLowerCase() || "";
      
      // Skip hidden products
      if (hidden.has(nm) || fn.startsWith("inspire")) {
        return false;
      }
      
      // Skip products already in Top Purchases 
       if (topPurchasesProducts.has(nm)) {
         console.log(`Filtering out ${x.name}: already in Top Purchases`);
         return false;
       }
      
      // Skip products without valid image paths
      if (!x.src || x.src === "") {
        console.log(`Filtering out ${x.name}: no image path`);
        return false;
      }
      
      // Skip products whose image files don't exist
      if (!hasProductImage(x.name)) {
        console.log(`Filtering out ${x.name}: image not available`);
        return false;
      }
      
      return true;
    });

    console.log('Visible after filtering:', visible.length, 'products');
    return visible.slice(0, 8);
  } catch (error) {
    console.error('Error in getFeatured:', error);
    return [];
  }
}

export default async function HomePage() {
  const featured = await getFeatured();

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Crafted Leather, Timeless Stories</h1>
            <p>
              Discover a collection of handcrafted leather bags and accessories
              — designed with precision, passion, and timeless elegance to
              accompany your every journey.
            </p>
            <div className="hero-actions">
              <a className="btn-primary" href="/products">
                Shop Products
              </a>
              <a className="btn-ghost" href="/about">
                Our Story
              </a>
            </div>
          </div>

          {/* hero image */}
          <div className="hero-media">
            <img
              src="/uploads/Dhaif.jpg"
              alt="Hayfa Leather Bag"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container features">
        <div className="feature-card">
          <div className="feature-title">Handcrafted Excellence</div>
          <div className="feature-sub">
            Each piece is meticulously made by skilled artisans with years of
            experience in leather craftsmanship.
          </div>
        </div>
        <div className="feature-card">
          <div className="feature-title">Premium Materials</div>
          <div className="feature-sub">
            We source only the finest leathers and materials, ensuring
            durability and a luxurious finish.
          </div>
        </div>
        <div className="feature-card">
          <div className="feature-title">Thoughtful Design</div>
          <div className="feature-sub">
            A perfect balance of function and aesthetics — refined silhouettes
            tailored for modern lifestyles.
          </div>
        </div>
      </section>

      {/* TOP PURCHASES SECTION */}
      <section className="container section">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 className="section-title" style={{ textAlign: 'center', margin: '0 auto' }}>
            🔥 Top Purchases This Month
          </h2>
          <div style={{ 
            color: '#666', 
            fontSize: '14px', 
            marginTop: '8px',
            textAlign: 'center' 
          }}>
            Our most loved pieces by customers
          </div>
        </div>

        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          flexWrap: 'wrap'
        }}>
          <a href="/products/maghfira" className="card card-link">
            <img
              src="/uploads/Maghfira.jpg"
              alt="Maghfira"
              className="card-img"
              loading="lazy"
            />
            <div className="card-meta">
              <div className="card-title">Maghfira</div>
              <div className="card-sub">Leather Collection • #1 Bestseller</div>
            </div>
          </a>

          <a href="/products/warda" className="card card-link">
            <img
              src="/uploads/Warda.jpg"
              alt="Warda"
              className="card-img"
              loading="lazy"
            />
            <div className="card-meta">
              <div className="card-title">Warda</div>
              <div className="card-sub">Leather Collection • #2 Bestseller</div>
            </div>
          </a>

          <a href="/products/ghubar" className="card card-link">
            <img
              src="/uploads/Ghubar.jpg"
              alt="Ghubar"
              className="card-img"
              loading="lazy"
            />
            <div className="card-meta">
              <div className="card-title">Ghubar</div>
              <div className="card-sub">Leather Collection • #3 Bestseller</div>
            </div>
          </a>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container section">
        <div className="section-head">
          <h2 className="section-title">Featured Products</h2>
          <a href="/products" className="link">
            View all
          </a>
        </div>

        {featured.length === 0 ? (
          <p className="muted">
            No products available yet. Add images to{" "}
            <code>public/uploads</code> to display them here.
          </p>
        ) : (
          <div className="grid">
            {featured.map((p) => {
              const slug = slugify(p.name);
              return (
                <a
                  key={p.id}
                  href={`/products/${slug}`}
                  className="card card-link"
                >
                  <img
                    src={p.src}
                    alt={p.name}
                    className="card-img"
                    loading="lazy"
                  />
                  <div className="card-meta">
                    <div className="card-title">{p.name}</div>
                    <div className="card-sub">Leather Collection</div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>

      {/* ABOUT TEASER */}
      <section className="about-teaser">
        <div className="container about-inner">
          <div className="about-text">
            <h3 className="about-title">
              From a Small Workshop to Your Favorite Collection
            </h3>
            <p className="about-sub">
              Hayfa was born from dedication and a deep appreciation for
              craftsmanship. We believe every great product begins with honest
              work, quality materials, and designs that care for the people who
              carry them.
            </p>
            <a href="/about" className="btn btn-outline">
              Learn more
            </a>
          </div>
          <div className="about-media">
            <img
              src="/uploads/inspire2.jpg"
              alt="Leather Workshop"
              className="about-img"
            />
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="cta-strip">
        <div className="container cta-inner">
          <div>
            <div className="cta-title">
              Ready to find your favorite bag?
            </div>
            <div className="cta-sub">
              Explore our latest collection — crafted in limited quantities,
              made to last.
            </div>
          </div>
          <a href="/products" className="btn btn-inverse">
            Shop Now
          </a>
        </div>
      </section>
    </main>
  );
}
