# SEO Stratejisi — eSIM Ülke Siteleri

---

## Genel Strateji

Her ülke sitesi o ülkeye seyahat edecek uluslararası yolculara odaklanır.
Ana kazanım modeli: organik arama trafiği → paket sayfası → polosim.com satışı.

---

## Hedef Keyword Yapısı

### Ana Keywords
| Ülke | Ana Keyword | Tahmini Hacim |
|---|---|---|
| Almanya | "Germany eSIM" | 15,000+ |
| ABD | "USA eSIM" | 25,000+ |

### Long-tail Keywords (Almanya örneği)
- "best eSIM for Germany travel"
- "Germany eSIM vs SIM card"
- "cheap eSIM Germany 2024"
- "Germany eSIM iPhone"
- "eSIM Deutschland Reise"
- "Deutschland eSIM Aktivierung"

---

## Next.js SEO Yapılandırması

### generateMetadata (Her sayfa için)

```typescript
// app/(site)/blog/[slug]/page.tsx
import { Metadata } from "next";
import { prisma } from "@/lib/db";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { country_slug: { country: "DE", slug: params.slug } },
  });

  return {
    title: post?.metaTitle || post?.title,
    description: post?.metaDescription || post?.excerpt,
    openGraph: {
      title: post?.title,
      description: post?.excerpt,
      images: post?.coverImage ? [post.coverImage] : [],
      type: "article",
      publishedTime: post?.publishedAt?.toISOString(),
    },
    alternates: {
      canonical: `https://esim-germany.com/blog/${params.slug}`,
    },
  };
}
```

### Root Layout Meta

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metaBase: new URL("https://esim-germany.com"),
  title: {
    default: "Germany eSIM | esim-germany.com",
    template: "%s | esim-germany.com",
  },
  description: "Compare Germany eSIM plans. Buy online, activate instantly.",
  robots: {
    index: true,
    follow: true,
  },
};
```

---

## Yapısal Veri (Schema.org)

### FAQPage (SSS sayfası)

```typescript
// app/(site)/faq/page.tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer.replace(/<[^>]*>/g, ""),   // HTML tagları temizle
    },
  })),
};

// Layout'a ekle
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
```

### Product (Paket kartları)

```typescript
const packageSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: pkg.name,
  description: `${pkg.dataAmount}${pkg.dataUnit} - ${pkg.validity} days`,
  brand: { "@type": "Brand", name: "PoloSim" },
  offers: {
    "@type": "Offer",
    price: pkg.price,
    priceCurrency: pkg.currency,
    availability: "https://schema.org/InStock",
    url: pkg.buyUrl,
  },
};
```

### BreadcrumbList

```typescript
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `https://esim-germany.com${item.href}`,
  })),
};
```

---

## Sitemap (Next.js)

```typescript
// app/sitemap.ts
import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany({
    where: { country: COUNTRY, status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
  });

  const guides = await prisma.guide.findMany({
    where: { country: COUNTRY, status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
  });

  return [
    { url: BASE_URL, priority: 1, changeFrequency: "weekly" },
    { url: `${BASE_URL}/packages`, priority: 0.9, changeFrequency: "daily" },
    { url: `${BASE_URL}/faq`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog`, priority: 0.8, changeFrequency: "weekly" },
    ...posts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    ...guides.map((g) => ({
      url: `${BASE_URL}/guides/${g.slug}`,
      lastModified: g.updatedAt,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
  ];
}
```

## Robots.txt

```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
```

---

## Sayfa Bazlı SEO Hedefleri

### Ana Sayfa
- **Keyword:** `Germany eSIM`
- **Title:** `Germany eSIM 2024 | Best Plans for Travelers`
- **H1:** Tek, keyword içermeli

### Paketler
- **Keyword:** `best eSIM for Germany` / `cheap Germany eSIM`
- **Title:** `Germany eSIM Plans & Prices 2024 | Compare All`
- **Yapısal veri:** Product schema her paket için

### Blog
- Her yazı bir long-tail keyword hedefler
- Min. 1200 kelime
- İç linkleme: ilgili rehberler ve paket sayfasına

### SSS
- FAQPage schema
- Featured snippet için optimize
- Her soru H2 tag'i almalı

---

## İçerik Takvimi (İlk 3 Ay)

### Ay 1 — Temel Sayfalar
- [ ] Ana sayfa içerikleri
- [ ] "eSIM nedir?" rehberi
- [ ] "eSIM nasıl kurulur?" rehberi
- [ ] "eSIM uyumlu telefonlar" rehberi
- [ ] SSS (min. 10 soru)

### Ay 2 — Blog
- [ ] "[Ülke] eSIM satın alma rehberi 2024"
- [ ] "[Ülke] eSIM vs fiziksel SIM"
- [ ] "iPhone için [Ülke] eSIM"
- [ ] "Samsung için [Ülke] eSIM"

### Ay 3 — Long-tail
- [ ] "[Ülke]'de en ucuz eSIM planları"
- [ ] "[Ülke]'de internet fiyatları"
- [ ] İç link yapısını güçlendir

---

## Takip Edilecek KPI'lar

| Metrik | Araç |
|---|---|
| Organik trafik | Google Search Console |
| Keyword sıralamaları | GSC + Ahrefs |
| Core Web Vitals | PageSpeed Insights |
| polosim yönlendirme tıklamaları | UTM + GA4 |
