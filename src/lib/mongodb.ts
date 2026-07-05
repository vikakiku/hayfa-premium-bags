// src/lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? "";

/** 
 * Deklarasi global untuk cache koneksi agar tidak membuka koneksi berulang di Next.js
 * (fix TypeScript error: property _mongoose does not exist on type globalThis)
 */
declare global {
  // eslint-disable-next-line no-var
  var _mongoose:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

export async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }

  if (!global._mongoose) {
    global._mongoose = { conn: null, promise: null };
  }

  const cached = global._mongoose;

  if (cached.conn) return cached.conn; // sudah terkoneksi

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB || "test",
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
