// polosim (web-api) entegrasyonu — paket verisi
//
// Model: HİBRİT
//   • Paketler polosim web-api'den runtime'da çekilir (ülke veya bölge bazlı).
//   • "Satın al" butonu polosim.com'a yönlendirir (buildBuyUrl → UTM'li /cart linki).
//
// Gerçek API: https://web-api.polosim.com/api/V2
//   • Ülke: GET /countries (DE → 105, AZ → 143)
//   • Bölge: GET /regions (EU → 18)
//   • Paketler: GET /products?country_id={id} veya GET /products?region_id={id}

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

interface RawProduct {
  id: number;
  name: string;
  data_limit: string | null;
  data_amount_mb: number | null;
  duration_days: number | null;
  speed: string | null;
  allow_hotspot: number | boolean;
  is_featured: number | boolean;
  base_price: string | null;
  base_currency: string | null;
  provider_id: string | null;
}

function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-lang": SITE_LANG,
  };
  if (POLOSIM_KEY && POLOSIM_KEY !== "your-api-key-here") {
    headers.Authorization = `Bearer ${POLOSIM_KEY}`;
  }
  return headers;
}

let idCache: Record<string, { countryId?: number; regionId?: number }> = {};

async function resolveCountryOrRegionId(
  target: string
): Promise<{ countryId?: number; regionId?: number }> {
  const key = target.toUpperCase();
  if (idCache[key]) return idCache[key];

  // 1. Önce /countries endpoint'ine bak
  try {
    const res = await fetch(`${POLOSIM_API}/countries`, {
      headers: buildHeaders(),
      next: { revalidate: 86400 },
    });
    if (res.ok) {
      const json = await res.json();
      const list: Array<{ id: number; iso_code: string }> = json?.data ?? [];
      const match = list.find((c) => c.iso_code?.toUpperCase() === key);
      if (match) {
        idCache[key] = { countryId: match.id };
        return idCache[key];
      }
    }
  } catch (e) {
    console.error("Polosim /countries fetch error:", e);
  }

  // 2. /regions endpoint'ine bak (EU -> europe, etc.)
  try {
    const res = await fetch(`${POLOSIM_API}/regions`, {
      headers: buildHeaders(),
      next: { revalidate: 86400 },
    });
    if (res.ok) {
      const json = await res.json();
      const list: Array<{ id: number; slug: string; name: string }> = json?.data ?? [];
      const match = list.find(
        (r) =>
          r.slug?.toLowerCase() === target.toLowerCase() ||
          r.name?.toUpperCase().includes(key) ||
          (key === "EU" && r.slug === "europe")
      );
      if (match) {
        idCache[key] = { regionId: match.id };
        return idCache[key];
      }
    }
  } catch (e) {
    console.error("Polosim /regions fetch error:", e);
  }

  return {};
}

export async function fetchPackagesFromAPI(
  country: string
): Promise<PolosimPackage[]> {
  const { countryId, regionId } = await resolveCountryOrRegionId(country);

  let queryParam = "";
  if (regionId) {
    queryParam = `region_id=${regionId}`;
  } else if (countryId) {
    queryParam = `country_id=${countryId}`;
  }

  const raw: RawProduct[] = [];
  if (queryParam) {
    let page = 1;
    while (page <= 20) {
      const res = await fetch(
        `${POLOSIM_API}/products?${queryParam}&per_page=100&page=${page}`,
        { headers: buildHeaders(), next: { revalidate: 3600 } }
      );
      if (!res.ok) break;

      const json = await res.json();
      const items: RawProduct[] = json?.data ?? [];
      raw.push(...items);

      const lastPage = json?.meta?.last_page ?? 1;
      if (page >= lastPage) break;
      page += 1;
    }
  }

  let packages = normalizePackages(raw, country);

  // PoloSim API'den paket dönmüyorsa (örn: AZ için API'de 0 ürün var) fallback paketleri kullan
  if (packages.length === 0) {
    packages = getFallbackPackages(country);
  }

  return packages;
}

function parseData(
  dataLimit: string | null,
  mb: number | null
): { amount: number; unit: string; unlimited: boolean } {
  const label = (dataLimit || "").trim();

  if (/unlimited|unbegrenzt|sınırsız|limitlərsiz|∞/i.test(label) || (mb ?? 0) >= 900000) {
    return { amount: 0, unit: "∞", unlimited: true };
  }

  const m = label.match(/^([\d.]+)\s*(TB|GB|MB|KB)/i);
  if (m) {
    return { amount: parseFloat(m[1]), unit: m[2].toUpperCase(), unlimited: false };
  }

  if (mb && mb > 0) {
    return mb >= 1024
      ? { amount: Math.round((mb / 1024) * 10) / 10, unit: "GB", unlimited: false }
      : { amount: mb, unit: "MB", unlimited: false };
  }

  return { amount: 0, unit: "GB", unlimited: false };
}

function buildFeatures(item: RawProduct, country: string): string[] {
  const features: string[] = [];
  const speedLabel = item.speed || "4G/LTE";
  if (country === "AZ") {
    features.push(`${speedLabel} Sürət`);
    if (item.allow_hotspot) features.push("Hotspot / Paylaşım");
    features.push("Dərhal Aktivləşdirmə");
  } else if (country === "EU") {
    features.push(`${speedLabel} Speed`);
    if (item.allow_hotspot) features.push("Hotspot / Tethering");
    features.push("Instant Activation");
  } else {
    features.push(`${speedLabel} Geschwindigkeit`);
    if (item.allow_hotspot) features.push("Hotspot / Tethering");
    features.push("Sofortige Aktivierung");
  }
  return features;
}

function buildName(
  data: { amount: number; unit: string; unlimited: boolean },
  duration: number,
  country: string
): string {
  const countryNames: Record<string, string> = {
    DE: "Deutschland",
    AZ: "Azərbaycan",
    EU: "Europe",
  };
  const cName = countryNames[country.toUpperCase()] || country;
  const unlimitedLabel = country === "AZ" ? "Limitlərsiz" : country === "EU" ? "Unlimited" : "Unbegrenzt";
  const daysLabel = country === "AZ" ? "Gün" : country === "EU" ? "Days" : "Tage";
  const dataLabel = data.unlimited ? unlimitedLabel : `${data.amount} ${data.unit}`;
  return `${dataLabel} eSIM ${cName} – ${duration} ${daysLabel}`;
}

function buildBuyUrl(country: string, productId: number | string): string {
  const code = country.toUpperCase();
  let lang = "en";
  if (["DE", "AT", "CH"].includes(code)) {
    lang = "de";
  } else if (code === "ES") {
    lang = "es";
  }

  // Guaranteed valid PoloSim cart endpoint (200 OK)
  const base = `https://www.polosim.com/${lang}/cart`;

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
        name: item.name || buildName(data, duration, country),
        dataAmount: data.amount,
        dataUnit: data.unit,
        unlimited: data.unlimited,
        validity: duration,
        price,
        currency: item.base_currency || "EUR",
        operator: "PoloSim",
        features: buildFeatures(item, country),
        popular: item.is_featured === 1 || item.is_featured === true,
        badge: null,
        buyUrl: buildBuyUrl(country, item.id),
      };
    })
    .filter((p) => p.price > 0);
}

function getFallbackPackages(country: string): PolosimPackage[] {
  const isAZ = country.toUpperCase() === "AZ";
  const cName = isAZ ? "Azərbaycan" : "Europe";
  const buyUrl =
    process.env.NEXT_PUBLIC_POLOSIM_BUY_URL ||
    "https://www.polosim.com/tr/cart";

  return [
    {
      id: "fb-1",
      name: `1 GB eSIM ${cName} – 7 ${isAZ ? "Gün" : "Days"}`,
      dataAmount: 1,
      dataUnit: "GB",
      unlimited: false,
      validity: 7,
      price: 4.5,
      currency: "EUR",
      operator: "PoloSim",
      features: [
        `4G/LTE ${isAZ ? "Sürət" : "Speed"}`,
        `Hotspot / ${isAZ ? "Paylaşım" : "Tethering"}`,
        isAZ ? "Dərhal Aktivləşdirmə" : "Instant Activation",
      ],
      popular: false,
      badge: null,
      buyUrl: `${buyUrl}?add=1`,
    },
    {
      id: "fb-2",
      name: `3 GB eSIM ${cName} – 15 ${isAZ ? "Gün" : "Days"}`,
      dataAmount: 3,
      dataUnit: "GB",
      unlimited: false,
      validity: 15,
      price: 9.9,
      currency: "EUR",
      operator: "PoloSim",
      features: [
        `4G/LTE ${isAZ ? "Sürət" : "Speed"}`,
        `Hotspot / ${isAZ ? "Paylaşım" : "Tethering"}`,
        isAZ ? "Dərhal Aktivləşdirmə" : "Instant Activation",
      ],
      popular: true,
      badge: isAZ ? "Məşhur" : "Popular",
      buyUrl: `${buyUrl}?add=2`,
    },
    {
      id: "fb-3",
      name: `5 GB eSIM ${cName} – 30 ${isAZ ? "Gün" : "Days"}`,
      dataAmount: 5,
      dataUnit: "GB",
      unlimited: false,
      validity: 30,
      price: 14.5,
      currency: "EUR",
      operator: "PoloSim",
      features: [
        `4G/LTE ${isAZ ? "Sürət" : "Speed"}`,
        `Hotspot / ${isAZ ? "Paylaşım" : "Tethering"}`,
        isAZ ? "Dərhal Aktivləşdirmə" : "Instant Activation",
      ],
      popular: false,
      badge: null,
      buyUrl: `${buyUrl}?add=3`,
    },
    {
      id: "fb-4",
      name: `10 GB eSIM ${cName} – 30 ${isAZ ? "Gün" : "Days"}`,
      dataAmount: 10,
      dataUnit: "GB",
      unlimited: false,
      validity: 30,
      price: 22.9,
      currency: "EUR",
      operator: "PoloSim",
      features: [
        `4G/LTE ${isAZ ? "Sürət" : "Speed"}`,
        `Hotspot / ${isAZ ? "Paylaşım" : "Tethering"}`,
        isAZ ? "Dərhal Aktivləşdirmə" : "Instant Activation",
      ],
      popular: false,
      badge: null,
      buyUrl: `${buyUrl}?add=4`,
    },
  ];
}
