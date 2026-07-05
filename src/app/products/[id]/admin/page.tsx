async function getOne(id: string) {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/products/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const p = await getOne(params.id);

  if (!p) {
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
        <h1 className="text-2xl font-semibold">{p.name}</h1>
        <nav className="space-x-4 text-gray-700">
          <a href="/products">Products</a>
          <a href={`/products/${p._id}/edit`}>Edit</a>
        </nav>
      </header>

      {p.imageUrl ? (
        <img src={p.imageUrl} alt={p.name} className="w-full max-h-96 object-cover rounded" />
      ) : null}

      <p className="text-lg">Price: <b>IDR {p.price}</b></p>
      <p className="text-gray-700 whitespace-pre-line">{p.description || "No description."}</p>
    </main>
  );
}
