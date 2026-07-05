export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "public", "uploads");
    const files = await fs.readdir(dir);
    const items = files
      .filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f))
      .map((f, i) => ({
        _id: `u-${i}`,
        name: f.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
        price: null,
        stock: null,
        imageUrl: `/uploads/${f}`,
        source: "uploads" as const,
      }));
    return NextResponse.json(items, { status: 200 });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
