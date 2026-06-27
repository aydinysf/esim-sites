# Veritabanı — PostgreSQL Şeması (Prisma)

Tüm içerikler (blog, rehber, SSS, ana sayfa) PostgreSQL'de tutulur.
Admin panelden yönetilir, site direkt DB'den okur.
Kullanıcı verileri tutulmaz — auth tamamen polosim API üzerinden.

---

## Genel Yaklaşım

- **ORM:** Prisma (type-safe, migration yönetimi)
- **DB:** PostgreSQL — Vercel Postgres
- **Paylaşım:** Tüm ülke siteleri aynı DB'yi kullanır, `country` kolonu ayırt eder
- **Kullanıcı verisi yok:** Auth polosim'de, biz sadece içerik tutarız

---

## Prisma Şeması

**`packages/db/prisma/schema.prisma`:**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Blog Yazıları ───────────────────────────────────────

model Post {
  id          String    @id @default(cuid())
  country     String                          // DE, US, ...
  title       String
  slug        String
  excerpt     String
  body        String                          // HTML (rich text editörden)
  coverImage  String?
  coverAlt    String?
  category    PostCategory
  tags        String[]
  featured    Boolean   @default(false)
  status      PostStatus @default(DRAFT)
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@unique([country, slug])
  @@index([country, status])
}

enum PostCategory {
  GUIDE
  NEWS
  TIP
  COMPARISON
}

enum PostStatus {
  DRAFT
  PUBLISHED
}

// ─── Rehber Sayfaları ────────────────────────────────────

model Guide {
  id            String    @id @default(cuid())
  country       String
  title         String
  slug          String
  body          String
  order         Int
  difficulty    GuideDifficulty?
  estimatedTime String?
  status        PostStatus @default(DRAFT)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@unique([country, slug])
  @@index([country, status])
}

enum GuideDifficulty {
  EASY
  MEDIUM
  ADVANCED
}

// ─── SSS ─────────────────────────────────────────────────

model Faq {
  id        String      @id @default(cuid())
  country   String
  question  String
  answer    String
  category  FaqCategory
  order     Int
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt

  @@index([country, category])
}

enum FaqCategory {
  OPERATORS
  SETUP
  PACKAGES
  GENERAL
}

// ─── Ana Sayfa İçerikleri ────────────────────────────────

model Homepage {
  id              String   @id @default(cuid())
  country         String   @unique
  heroHeadline    String
  heroSubheadline String
  heroCtaText     String
  heroImage       String?
  whyEsimTitle    String
  whyEsimItems    Json                          // [{icon, title, description}]
  howItWorksTitle String
  howItWorksSteps Json                          // [{step, title, description}]
  stats           Json                          // [{value, label}]
  updatedAt       DateTime @updatedAt
}

// ─── Admin Kullanıcıları ─────────────────────────────────

model Admin {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  name         String?
  createdAt    DateTime @default(now())
}

// ─── Paket Cache ─────────────────────────────────────────

model PackageCache {
  id        String   @id                       // polosim paket ID'si
  country   String
  data      Json                               // tüm paket verisi
  fetchedAt DateTime @default(now())
  expiresAt DateTime

  @@index([country, expiresAt])
}
```

---

## Migration Komutları

```bash
# Şemayı DB'ye uygula
npx prisma migrate dev --name init

# Production'a uygula
npx prisma migrate deploy

# Prisma Studio (görsel DB yönetimi)
npx prisma studio

# Client'ı yeniden üret (şema değişince)
npx prisma generate
```

---

## Prisma Client Kullanımı

**`packages/db/src/client.ts`:**

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

**Site içinde kullanım:**

```typescript
// app/(site)/blog/page.tsx
import { prisma } from "@/lib/db";

const posts = await prisma.post.findMany({
  where: {
    country: process.env.PUBLIC_COUNTRY_CODE,  // "DE"
    status: "PUBLISHED",
  },
  orderBy: { publishedAt: "desc" },
});
```

---

## Paket Cache Akışı

polosim API'ye her istekte çağrı yapmak yerine cache tablosu kullanılır:

```typescript
// lib/cache.ts
import { prisma } from "@/lib/db";

export async function getPackages(country: string) {
  // Cache'de güncel veri var mı?
  const cached = await prisma.packageCache.findMany({
    where: {
      country,
      expiresAt: { gt: new Date() },
    },
  });

  if (cached.length > 0) {
    return cached.map((p) => p.data);
  }

  // Yoksa polosim API'den çek
  const packages = await fetchFromPolosim(country);

  // Cache'e yaz (1 saatlik)
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.packageCache.deleteMany({ where: { country } });
  await prisma.packageCache.createMany({
    data: packages.map((pkg: any) => ({
      id: pkg.id,
      country,
      data: pkg,
      expiresAt,
    })),
  });

  return packages;
}
```

---

## Admin Seed (İlk Kurulum)

```typescript
// packages/db/prisma/seed.ts
import { prisma } from "../src/client";
import bcrypt from "bcryptjs";

async function main() {
  // Admin kullanıcısı oluştur
  await prisma.admin.upsert({
    where: { email: "admin@esim-germany.com" },
    update: {},
    create: {
      email: "admin@esim-germany.com",
      passwordHash: await bcrypt.hash("güçlü-şifre", 12),
      name: "Admin",
    },
  });

  // Almanya ana sayfa içeriği
  await prisma.homepage.upsert({
    where: { country: "DE" },
    update: {},
    create: {
      country: "DE",
      heroHeadline: "Deutschland eSIM",
      heroSubheadline: "Sofort aktivieren, überall verbunden",
      heroCtaText: "Tarife ansehen",
      whyEsimTitle: "Warum eSIM?",
      whyEsimItems: [],
      howItWorksTitle: "So funktioniert es",
      howItWorksSteps: [],
      stats: [],
    },
  });

  console.log("Seed tamamlandı");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

```bash
npx prisma db seed
```
