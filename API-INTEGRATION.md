# API Entegrasyonu — polosim API

polosim API iki amaçla kullanılır:
1. **Kullanıcı Auth** — giriş, kayıt, token doğrulama
2. **Paket verisi** — ülkeye göre paket listesi

---

## 1. Kullanıcı Auth (polosim)

Kullanıcılar siteye polosim hesaplarıyla giriş yapar.
Token cookie'de saklanır, her istekte doğrulanır.

**`lib/polosim-auth.ts`:**

```typescript
const POLOSIM_API = process.env.POLOSIM_API_BASE;
const POLOSIM_KEY = process.env.POLOSIM_API_KEY;

// Kullanıcı girişi
export async function loginUser(email: string, password: string) {
  const res = await fetch(`${POLOSIM_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${POLOSIM_KEY}`,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Giriş başarısız");

  const data = await res.json();
  return {
    token: data.token,       // polosim JWT
    user: data.user,         // kullanıcı bilgisi
  };
}

// Token doğrulama
export async function verifyToken(token: string) {
  const res = await fetch(`${POLOSIM_API}/auth/verify`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;
  return res.json();
}

// Kullanıcı kaydı
export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  const res = await fetch(`${POLOSIM_API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${POLOSIM_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Kayıt başarısız");
  return res.json();
}
```

**Login API Route:**

```typescript
// app/api/auth/login/route.ts
import { loginUser } from "@/lib/polosim-auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const { token, user } = await loginUser(email, password);

    cookies().set("polosim_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,   // 7 gün
    });

    return Response.json({ user });
  } catch {
    return Response.json({ error: "Geçersiz email veya şifre" }, { status: 401 });
  }
}
```

---

## 2. Paket Verisi

Paketler polosim API'den çekilir, PostgreSQL cache tablosunda saklanır.
Cache süresi 1 saat — süresi dolunca yeniden çekilir.

**`lib/polosim.ts`:**

```typescript
const POLOSIM_API = process.env.POLOSIM_API_BASE;
const POLOSIM_KEY = process.env.POLOSIM_API_KEY;

export async function fetchPackagesFromAPI(country: string) {
  const res = await fetch(
    `${POLOSIM_API}/packages?country=${country}&status=active`,
    {
      headers: {
        "Authorization": `Bearer ${POLOSIM_KEY}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },   // Next.js fetch cache (yedek)
    }
  );

  if (!res.ok) throw new Error(`polosim API hatası: ${res.status}`);

  const data = await res.json();
  return normalizePackages(data, country);
}

function normalizePackages(raw: any[], country: string) {
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
```

**Packages API Route (cache ile):**

```typescript
// app/api/packages/route.ts
import { prisma } from "@/lib/db";
import { fetchPackagesFromAPI } from "@/lib/polosim";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export async function GET() {
  // Cache kontrolü
  const cached = await prisma.packageCache.findMany({
    where: {
      country: COUNTRY,
      expiresAt: { gt: new Date() },
    },
  });

  if (cached.length > 0) {
    return Response.json(cached.map((p) => p.data));
  }

  // Cache yoksa API'den çek
  try {
    const packages = await fetchPackagesFromAPI(COUNTRY);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 saat

    // Cache güncelle
    await prisma.packageCache.deleteMany({ where: { country: COUNTRY } });
    await prisma.packageCache.createMany({
      data: packages.map((pkg) => ({
        id: pkg.id,
        country: COUNTRY,
        data: pkg,
        expiresAt,
      })),
    });

    return Response.json(packages);
  } catch (error) {
    // API hatasında eski cache'i dön (süresi geçmiş bile olsa)
    const stale = await prisma.packageCache.findMany({
      where: { country: COUNTRY },
    });

    if (stale.length > 0) {
      return Response.json(stale.map((p) => p.data));
    }

    return Response.json({ error: "Paketler yüklenemedi" }, { status: 503 });
  }
}
```

**Paketler sayfasında kullanım:**

```typescript
// app/(site)/packages/page.tsx
export default async function PackagesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/packages`);
  const packages = await res.json();

  return (
    <main>
      <PackageGrid packages={packages} />
    </main>
  );
}
```

---

## 3. Admin Auth (NextAuth)

Admin girişi polosim'den bağımsız, NextAuth credentials provider ile çalışır.
Admin bilgileri `Admin` tablosunda tutulur.

**`lib/auth.ts`:**

```typescript
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email as string },
        });

        if (!admin) return null;

        const valid = await bcrypt.compare(
          credentials.password as string,
          admin.passwordHash
        );

        if (!valid) return null;

        return { id: admin.id, email: admin.email, name: admin.name };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
});
```

---

## Hata Senaryoları

| Senaryo | Davranış |
|---|---|
| polosim API erişilemiyor | Eski cache döner, yoksa 503 |
| Kullanıcı token süresi doldu | Cookie temizlenir, login'e yönlendirilir |
| Admin şifre yanlış | 401, hata mesajı |
| DB bağlantısı koptu | 500, Vercel log'a düşer |
| Paket ID bulunamadı | 404 |

---

## Environment Variables

```env
# polosim
POLOSIM_API_BASE=https://api.polosim.com
POLOSIM_API_KEY=xxxxx
NEXT_PUBLIC_POLOSIM_BUY_URL=https://www.polosim.com/tr/destination/germany
PUBLIC_COUNTRY_CODE=DE

# PostgreSQL
DATABASE_URL=postgresql://user:pass@host:5432/db

# NextAuth
NEXTAUTH_SECRET=güçlü-rastgele-string
NEXTAUTH_URL=https://esim-germany.com

# Site
NEXT_PUBLIC_SITE_URL=https://esim-germany.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```
