// src/lib/product-images.ts

// SEMUA gambar kamu ada di /public/uploads dan berekstensi .jpg
const BASE_PATH = "/uploads";
const EXT = ".jpg";

// Mapping nama produk -> file gambar yang ada di public/uploads
// (pakai nama file persis seperti di folder, case sensitive biar rapi)
export const PRODUCT_IMAGES: Record<string, string> = {
  Azmina: `${BASE_PATH}/Azmina${EXT}`,
  Dhaif: `${BASE_PATH}/Dhaif${EXT}`,
  Firdaws: `${BASE_PATH}/Firdaws${EXT}`,
  Firyal: `${BASE_PATH}/Firyal${EXT}`,
  Ghubar: `${BASE_PATH}/Ghubar${EXT}`,
  Hijaz: `${BASE_PATH}/Hijaz${EXT}`,
  Jawhara: `${BASE_PATH}/Jawhara${EXT}`,
  Joud: `${BASE_PATH}/Joud${EXT}`,
  Layli: `${BASE_PATH}/Layli${EXT}`,
  Maghfira: `${BASE_PATH}/Maghfira${EXT}`,
  Mahra: `${BASE_PATH}/Mahra${EXT}`,
  Nibras: `${BASE_PATH}/Nibras${EXT}`,
  Raqi: `${BASE_PATH}/Raqi${EXT}`,
  Rawya: `${BASE_PATH}/Rawya${EXT}`,
  Rim: `${BASE_PATH}/Rim${EXT}`,
  Saifan: `${BASE_PATH}/Saifan${EXT}`,
  Salsabil: `${BASE_PATH}/Salsabil${EXT}`,
  Sana: `${BASE_PATH}/Sana${EXT}`,
  Shams: `${BASE_PATH}/Shams${EXT}`,
  Tiba: `${BASE_PATH}/Tiba${EXT}`,
  Wahaj: `${BASE_PATH}/Wahaj${EXT}`,
  Warda: `${BASE_PATH}/Warda${EXT}`,
  Zahwa: `${BASE_PATH}/Zahwa${EXT}`,
  Zumurrud: `${BASE_PATH}/Zumurrud${EXT}`,
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/**
 * Ambil path gambar untuk sebuah produk.
 * - Coba dulu dari mapping exact name
 * - Kalau tidak ada, fallback ke BASE_PATH/<NamaTanpaSpasiPertama>.jpg
 */
export function getProductImage(name: string): string {
  if (!name) return `${BASE_PATH}/Dhaif${EXT}`; // fallback default

  const exact = PRODUCT_IMAGES[name];
  if (exact) return exact;

  // fallback generik: ambil kata pertama, misal "Azmina Bag" -> "Azmina"
  const firstWord = name.trim().split(/\s+/)[0];
  return `${BASE_PATH}/${firstWord}${EXT}`;
}
