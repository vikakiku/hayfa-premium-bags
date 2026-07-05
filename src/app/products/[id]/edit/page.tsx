import ProductForm from "@/components/ProductForm";

async function getOne(id: string) {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/products/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const item = await getOne(params.id);

  if (!item) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-xl font-semibold mb-2">Product not found</h1>
        <a className="underline" href="/products">← Back to products</a>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Product</h1>
        <nav className="space-x-4 text-gray-700">
          <a href={`/products/${item._id}`}>Detail</a>
          <a href="/products">Products</a>
        </nav>
      </header>

      <ProductForm mode="edit" initial={item} />
    </main>
  );
}
