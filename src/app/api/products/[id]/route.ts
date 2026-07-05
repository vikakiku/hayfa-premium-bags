// src/app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// GET /api/products/[id]
// (Saat ini hanya stub, supaya build Next.js 16 tidak error)
export async function GET(_req: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  return NextResponse.json(
    {
      id,
      message:
        "GET /api/products/[id] active. Detail produk di-load langsung di /products/[id]/page.tsx, bukan dari endpoint ini.",
    },
    { status: 200 }
  );
}

// PATCH /api/products/[id]
// Stub: kalau nanti mau dipakai untuk admin edit, baru diisi logic ke PostgreSQL
export async function PATCH(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = await req.json().catch(() => ({}));

  return NextResponse.json(
    {
      id,
      body,
      message:
        "PATCH /api/products/[id] belum diimplementasikan di versi PostgreSQL ini.",
    },
    { status: 200 }
  );
}

// DELETE /api/products/[id]
// Stub: sama seperti PATCH
export async function DELETE(_req: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  return NextResponse.json(
    {
      id,
      message:
        "DELETE /api/products/[id] belum diimplementasikan di versi PostgreSQL ini.",
    },
    { status: 200 }
  );
}
