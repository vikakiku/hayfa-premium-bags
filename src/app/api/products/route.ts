// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // <-- FIX UTAMA

type DbRow = {
  id: number;
  name: string;
  price: number;
  image_filename: string;
  stock: number;
  description: string | null;
};

// GET /api/products
export async function GET() {
  try {
    // Based on CSV structure: id,name,price,image,stock,description,category_id,is_active,created_at,updated_at
    const rows = await query<any>(`
      SELECT id, name, price, stock, description
      FROM products
      WHERE is_active = true
      ORDER BY name ASC
    `);

    if (rows.length === 0) {
      console.log("No products found in database");
      return NextResponse.json([]);
    }

    console.log(`Found ${rows.length} products in database`);
    console.log("First product:", rows[0]);

    const items = rows.map((row) => ({
      id: row.id.toString(),
      name: row.name,
      price: row.price,
      stock: row.stock,
      image: `/uploads/${row.name}.jpg`, // Use name + .jpg based on CSV pattern
      slug: row.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      description: row.description,
      source: "db" as const,
    }));

    return NextResponse.json(items);
  } catch (err) {
    console.error("Error fetching products from DB:", err);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}
