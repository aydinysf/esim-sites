// polosim (web-api) entegrasyonu — paket verisi
//
// Model: HİBRİT
//   • Paketler polosim web-api'den runtime'da çekilir, Germany sitesinde gösterilir.
//   • "Satın al" butonu polosim.com'a yönlendirir (buildBuyUrl → UTM'li /plans linki).
//
// Gerçek API: https://web-api.polosim.com/api/V2
//   • Ülke id'si:  GET /countries          → iso_code ile eşleştirilir (DE → 105)
//   • Paketler:    GET /products?country_id={id}
//   • Auth gerektirmez (public okuma). x-lang başlığı ile dil seçilir.

const POLOSIM_API =
  process.env.POLOSIM_API_BASE || "https://web-api.polosim.com/api/V2";
const POLOSIM_KEY = process.env.POLOSIM_API_KEY;
const SITE_LANG = process.env.SITE_LANG || "en";

export interface PolosimPackage {
  id: string;
  name: string;
  dataAmount: number;
  dataUnit: string;
  unlimited: boolean;
  validity: number;
  price: number;
  currency: string;
  operator: string;
  features: string[];
  popular: boolean;
  badge: string | null;
  buyUrl: string;
}

// web-api ürün tipinin ilgili alanları (kısmi)
interface RawProduct {
  id: number;
  name: string;
  data_limit: string | null; // "1GB", "10GB", "Unlimited"
  data_amount_mb: number | null; // 1024, 999999 (unlimited)
  duration_days: number | null;
  speed: string | null; // "4G", "4G/LTE"
  allow_hotspot: number | boolean;
  is_featured: number | boolean;
  base_price: string | null; // "1.88"
  base_currency: string | null; // "EUR"
  provider_id: string | null;
}

function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-lang": SITE_LANG,
  };
  // Public okuma için gerekmiyor; gerçek bir anahtar verilmişse ekle.
  if (POLOSIM_KEY && POLOSIM_KEY !== "your-api-key-here") {
    headers.Authorization = `Bearer ${POLOSIM_KEY}`;
  }
  return headers;
}

// ISO ülke kodundan (DE) sayısal country_id çöz. Modül ömrü boyunca cache'lenir.
let countryIdCache: Record<string, number> = {};

async function resolveCountryId(iso: string): Promise<number> {
  const key = iso.toUpperCase();
  if (countryIdCache[key]) return countryIdCache[key];

  const res = await fetch(`${POLOSIM_API}/countries`, {
    headers: buildHeaders(),
    next: { revalidate: 86400 }, // ülke listesi nadiren değişir → 24s
  });
  if (!res.ok) throw new Error(`polosim /countries hatası: ${res.status}`);

  const json = await res.json();
  const list: Array<{ id: number; iso_code: string }> = json?.data ?? [];
  for (const c of list) {
    if (c.iso_code) countryIdCache[c.iso_code.toUpperCase()] = c.id;
  }

  const id = countryIdCache[key];
  if (!id) throw new Error(`polosim: '${iso}' için country_id bulunamadı`);
  return id;
}

export async function fetchPackagesFromAPI(
  country: string
): Promise<PolosimPackage[]> {
  const countryId = process.env.PUBLIC_COUNTRY_ID
    ? Number(process.env.PUBLIC_COUNTRY_ID)
    : await resolveCountryId(country);

  const raw: RawProduct[] = [];
  let page = 1;
  // Tüm sayfaları topla (ülke başına genelde tek sayfa).
  while (page <= 20) {
    const res = await fetch(
      `${POLOSIM_API}/products?country_id=${countryId}&per_page=100&page=${page}`,
      { headers: buildHeaders(), next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`polosim /products hatası: ${res.status}`);

    const json = await res.json();
    const items: RawProduct[] = json?.data ?? [];
    raw.push(...items);

    const lastPage = json?.meta?.last_page ?? 1;
    if (page >= lastPage) break;
    page += 1;
  }

  return normalizePackages(raw, country);
}

// "1GB" / "500MB" / "Unlimited" → { amount, unit, unlimited }
function parseData(
  dataLimit: string | null,
  mb: number | null
): { amount: number; unit: string; unlimited: boolean } {
  const label = (dataLimit || "").trim();

  // Unlimited: data_limit metni ya da sentinel mb değeri (999999)
  if (/unlimited|unbegrenzt|sınırsız|∞/i.test(label) || (mb ?? 0) >= 900000) {
    return { amount: 0, unit: "∞", unlimited: true };
  }

  const m = label.match(/^([\d.]+)\s*(TB|GB|MB|KB)/i);
  if (m) {
    return { amount: parseFloat(m[1]), unit: m[2].toUpperCase(), unlimited: false };
  }

  // Metinden çıkaramadıysak MB değerinden türet
  if (mb && mb > 0) {
    return mb >= 1024
      ? { amount: Math.round((mb / 1024) * 10) / 10, unit: "GB", unlimited: false }
      : { amount: mb, unit: "MB", unlimited: false };
  }

  return { amount: 0, unit: "GB", unlimited: false };
}

function buildFeatures(item: RawProduct): string[] {
  const features: string[] = [];
  if (item.speed) features.push(`${item.speed} Geschwindigkeit`);
  if (item.allow_hotspot) features.push("Hotspot / Tethering");
  features.push("Sofortige Aktivierung");
  return features;
}

function buildName(
  data: { amount: number; unit: string; unlimited: boolean },
  duration: number
): string {
  const dataLabel = data.unlimited ? "Unbegrenzt" : `${data.amount} ${data.unit}`;
  return `${dataLabel} eSIM Deutschland – ${duration} Tage`;
}

// polosim.com'a UTM'li yönlendirme — seçilen paket doğrudan sepete eklenir.
// Ana sitenin /cart sayfası ?add=<product_id> parametresini işler: ürünü API'den
// taze çekip sepete atar. Kullanıcı seçimini polosim.com'da tekrar yapmak zorunda kalmaz.
function buildBuyUrl(country: string, productId: number): string {
  const base =
    process.env.NEXT_PUBLIC_POLOSIM_BUY_URL ||
    "https://www.polosim.com/de/cart";
  const params = new URLSearchParams({
    add: String(productId),
    utm_source: `esim-${country.toLowerCase()}.com`,
    utm_medium: "referral",
    utm_campaign: "country-site",
  });
  return `${base}?${params.toString()}`;
}

function normalizePackages(
  raw: RawProduct[],
  country: string
): PolosimPackage[] {
  return raw
    .map((item) => {
      const data = parseData(item.data_limit, item.data_amount_mb);
      const duration = item.duration_days ?? 0;
      const price = item.base_price ? parseFloat(item.base_price) : 0;

      return {
        id: String(item.id),
        name: buildName(data, duration),
        dataAmount: data.amount,
        dataUnit: data.unit,
        unlimited: data.unlimited,
        validity: duration,
        price,
        currency: item.base_currency || "EUR",
        operator: "PoloSim",
        features: buildFeatures(item),
        popular: item.is_featured === 1 || item.is_featured === true,
        badge: null,
        buyUrl: buildBuyUrl(country, item.id),
      };
    })
    .filter((p) => p.price > 0); // fiyatsız/pasif kayıtları ele
}
