const POLOSIM_API = process.env.POLOSIM_API_BASE;
const POLOSIM_KEY = process.env.POLOSIM_API_KEY;

export interface PolosimPackage {
  id: string;
  name: string;
  dataAmount: number;
  dataUnit: string;
  validity: number;
  price: number;
  currency: string;
  operator: string;
  features: string[];
  popular: boolean;
  badge: string | null;
  buyUrl: string;
}

export async function fetchPackagesFromAPI(country: string): Promise<PolosimPackage[]> {
  const res = await fetch(
    `${POLOSIM_API}/packages?country=${country}&status=active`,
    {
      headers: {
        Authorization: `Bearer ${POLOSIM_KEY}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) throw new Error(`polosim API hatası: ${res.status}`);

  const data = await res.json();
  return normalizePackages(data, country);
}

function normalizePackages(raw: any[], country: string): PolosimPackage[] {
  return raw.map((item) => ({
    id: item.id,
    name: item.name,
    dataAmount: parseFloat(item.data_amount),
    dataUnit: item.data_unit || "GB",
    validity: parseInt(item.validity_days),
    price: parseFloat(item.price),
    currency: item.currency || "USD",
    operator: item.operator,
    features: item.features || [],
    popular: item.is_popular || false,
    badge: item.badge || null,
    buyUrl: buildBuyUrl(item.id, country),
  }));
}

function buildBuyUrl(packageId: string, country: string): string {
  const base = process.env.NEXT_PUBLIC_POLOSIM_BUY_URL;
  const params = new URLSearchParams({
    package: packageId,
    utm_source: `esim-${country.toLowerCase()}.com`,
    utm_medium: "referral",
    utm_campaign: "country-site",
  });
  return `${base}?${params.toString()}`;
}
