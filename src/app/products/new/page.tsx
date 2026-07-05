// src/app/products/new/page.tsx
import ProductForm from "@/components/ProductForm";

export const dynamic = "force-dynamic"; // biar selalu fresh saat dev

export default function NewProductPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Add Product</h1>
        <nav className="space-x-4 text-gray-700">
          <a href="/">Home</a>
          <a href="/products">Products</a>
        </nav>
      </header>

      {/* ProductForm adalah client component; page ini aman jadi server component */}
      <ProductForm mode="create" />
    </main>
  );
}
