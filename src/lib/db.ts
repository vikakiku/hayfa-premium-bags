// src/lib/db.ts
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

// During build time, we don't need database connection
if (!connectionString && process.env.NODE_ENV !== 'development') {
  console.warn("DATABASE_URL is not set - database features will be disabled");
}

// Biar pool-nya 1 saja di dev (hot reload)
declare global {
  // eslint-disable-next-line no-var
  var pgPool: Pool | undefined;
}

export const pool: Pool | null = connectionString
  ? (global.pgPool ??
    new Pool({
      connectionString,
      // kalau nanti deploy ke cloud yang pakai SSL, tinggal ubah bagian ini
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
    }))
  : null;

if (process.env.NODE_ENV !== "production" && pool) {
  global.pgPool = pool;
}

// helper simpel untuk query
export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<T[]> {
  if (!pool) {
    throw new Error("Database connection not available");
  }
  const res = await pool.query(text, params);
  return res.rows as T[];
}
