# Site Yapısı — eSIM Ülke Siteleri

Next.js monorepo organizasyonu, sayfa yapısı ve dosya isimlendirme kuralları.

---

## Monorepo Yapısı

```
esim-sites/                           ← GitHub repo kökü
│
├── .github/
│   └── workflows/
│       ├── deploy-germany.yml
│       └── deploy-usa.yml
│
├── packages/
│   └── db/                           ← Paylaşılan Prisma şeması
│       ├── prisma/
│       │   ├── schema.prisma         ← Tüm tablolar burada
│       │   └── migrations/           ← Migration geçmişi
│       ├── src/
│       │   └── client.ts             ← Prisma client export
│       └── package.json
│
├── config/                           ← Ülke konfigürasyonları
│   ├── germany.config.ts
│   ├── usa.config.ts
│   └── ...
│
├── sites/
│   ├── germany/                      ← esim-germany.com
│   └── usa/                          ← esim-usa.com
│
├── package.json                      ← Workspace root
├── turbo.json                        ← Turborepo config
└── README.md
```

---

## Tek Site Yapısı (Detay)

```
sites/germany/
│
├── src/
│   └── app/                          ← Next.js App Router
│       │
│       ├── (site)/                   ← Ziyaretçi sayfaları (layout ayrı)
│       │   ├── layout.tsx            ← Site layout (header, footer)
│       │   ├── page.tsx              ← Ana sayfa
│       │   ├── packages/
│       │   │   └── page.tsx          ← Paketler listesi
│       │   ├── blog/
│       │   │   ├── page.tsx          ← Blog listesi
│       │   │   └── [slug]/
│       │   │       └── page.tsx      ← Blog detay
│       │   ├── guides/
│       │   │   ├── page.tsx          ← Rehberler listesi
│       │   │   └── [slug]/
│       │   │       └── page.tsx      ← Rehber detay
│       │   └── faq/
│       │       └── page.tsx          ← SSS sayfası
│       │
│       ├── (auth)/                   ← Kullanıcı auth (polosim)
│       │   ├── login/
│       │   │   └── page.tsx
│       │   └── register/
│       │       └── page.tsx
│       │
│       ├── admin/                    ← Admin paneli (NextAuth korumalı)
│       │   ├── layout.tsx            ← Admin layout (sidebar, navbar)
│       │   ├── page.tsx              ← Dashboard
│       │   ├── login/
│       │   │   └── page.tsx          ← Admin giriş
│       │   ├── blog/
│       │   │   ├── page.tsx          ← Blog listesi
│       │   │   ├── new/
│       │   │   │   └── page.tsx      ← Yeni yazı
│       │   │   └── [id]/
│       │   │       └── page.tsx      ← Düzenle
│       │   ├── guides/
│       │   │   ├── page.tsx
│       │   │   ├── new/
│       │   │   │   └── page.tsx
│       │   │   └── [id]/
│       │   │       └── page.tsx
│       │   ├── faq/
│       │   │   ├── page.tsx
│       │   │   ├── new/
│       │   │   │   └── page.tsx
│       │   │   └── [id]/
│       │   │       └── page.tsx
│       │   └── homepage/
│       │       └── page.tsx          ← Ana sayfa içerik düzenle
│       │
│       └── api/                      ← API Route'ları
│           ├── auth/
│           │   ├── [...nextauth]/
│           │   │   └── route.ts      ← NextAuth (admin)
│           │   ├── login/
│           │   │   └── route.ts      ← polosim kullanıcı girişi
│           │   └── logout/
│           │       └── route.ts
│           ├── packages/
│           │   └── route.ts          ← polosim API proxy + cache
│           ├── blog/
│           │   ├── route.ts          ← GET liste, POST ekle
│           │   └── [id]/
│           │       └── route.ts      ← GET, PUT, DELETE
│           ├── guides/
│           │   ├── route.ts
│           │   └── [id]/
│           │       └── route.ts
│           └── faq/
│               ├── route.ts
│               └── [id]/
│                   └── route.ts
│
├── components/                       ← UI Componentları
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── AdminSidebar.tsx
│   ├── site/
│   │   ├── HeroBanner.tsx
│   │   ├── PackageCard.tsx
│   │   ├── PackageGrid.tsx
│   │   ├── BuyButton.tsx
│   │   ├── BlogCard.tsx
│   │   ├── GuideCard.tsx
│   │   └── FaqAccordion.tsx
│   └── admin/
│       ├── RichTextEditor.tsx        ← Blog/rehber editörü
│       ├── ContentTable.tsx          ← İçerik listeleme tablosu
│       └── ContentForm.tsx           ← Oluştur/düzenle formu
│
├── lib/
│   ├── db.ts                         ← Prisma client
│   ├── polosim.ts                    ← polosim API fonksiyonları
│   ├── auth.ts                       ← NextAuth config (admin)
│   ├── polosim-auth.ts               ← polosim kullanıcı auth
│   └── cache.ts                      ← Paket cache yönetimi
│
├── public/
│   └── images/
│       ├── hero/
│       ├── blog/
│       └── og-default.jpg
│
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Sayfa URL Yapısı

| Sayfa | URL | Dosya |
|---|---|---|
| Ana sayfa | `/` | `app/(site)/page.tsx` |
| Paketler | `/packages` | `app/(site)/packages/page.tsx` |
| Blog listesi | `/blog` | `app/(site)/blog/page.tsx` |
| Blog detay | `/blog/[slug]` | `app/(site)/blog/[slug]/page.tsx` |
| Rehberler | `/guides` | `app/(site)/guides/page.tsx` |
| Rehber detay | `/guides/[slug]` | `app/(site)/guides/[slug]/page.tsx` |
| SSS | `/faq` | `app/(site)/faq/page.tsx` |
| Kullanıcı giriş | `/login` | `app/(auth)/login/page.tsx` |
| Admin giriş | `/admin/login` | `app/admin/login/page.tsx` |
| Admin dashboard | `/admin` | `app/admin/page.tsx` |
| Admin blog | `/admin/blog` | `app/admin/blog/page.tsx` |
| Admin yeni blog | `/admin/blog/new` | `app/admin/blog/new/page.tsx` |
| Admin rehberler | `/admin/guides` | `app/admin/guides/page.tsx` |
| Admin SSS | `/admin/faq` | `app/admin/faq/page.tsx` |
| Admin ana sayfa | `/admin/homepage` | `app/admin/homepage/page.tsx` |

---

## Admin Paneli Koruması

Admin rotaları NextAuth middleware ile korunur:

```typescript
// middleware.ts
import { auth } from "@/lib/auth";

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isAdminLogin = req.nextUrl.pathname === "/admin/login";

  if (isAdminRoute && !isAdminLogin && !req.auth) {
    return Response.redirect(new URL("/admin/login", req.url));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
```

---

## İki Farklı Auth Sistemi

```
Admin Auth (NextAuth)           Kullanıcı Auth (polosim)
─────────────────────           ────────────────────────
/admin/login                    /login
credentials (email+şifre)       polosim API
sadece adminler                 tüm site kullanıcıları
session cookie                  JWT cookie
NextAuth yönetir                lib/polosim-auth.ts yönetir
```

---

## Vercel Proje Yapılandırması

Her ülke sitesi için Vercel'de ayrı proje:

| Ayar | Değer |
|---|---|
| Framework Preset | Next.js |
| Root Directory | `sites/germany` |
| Build Command | `npm run build` |
| Node Version | 20.x |

**Environment Variables:**

```env
# polosim API
POLOSIM_API_KEY=xxxxx
POLOSIM_API_BASE=https://api.polosim.com
PUBLIC_COUNTRY_CODE=DE

# PostgreSQL
DATABASE_URL=postgresql://...

# NextAuth (admin)
NEXTAUTH_SECRET=xxxxx
NEXTAUTH_URL=https://esim-germany.com
ADMIN_EMAIL=admin@esim-germany.com
ADMIN_PASSWORD_HASH=xxxxx

# Site
NEXT_PUBLIC_SITE_URL=https://esim-germany.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_POLOSIM_BUY_URL=https://www.polosim.com/tr/destination/germany
```

---

## Component Sorumlulukları

| Component | Sorumluluk |
|---|---|
| `Header.tsx` | Navigasyon, dil, logo, kullanıcı menüsü |
| `Footer.tsx` | Alt linkler, polosim kredi |
| `AdminSidebar.tsx` | Admin panel sol menü |
| `HeroBanner.tsx` | Ana sayfa hero bölümü |
| `PackageCard.tsx` | Paket kartı, fiyat, UTM buy linki |
| `PackageGrid.tsx` | Paketler grid, filtreleme |
| `BuyButton.tsx` | UTM parametreli polosim yönlendirme |
| `BlogCard.tsx` | Blog listesi kartı |
| `GuideCard.tsx` | Rehber listesi kartı |
| `FaqAccordion.tsx` | SSS açılır/kapanır + FAQPage schema |
| `RichTextEditor.tsx` | Admin blog/rehber editörü (Tiptap) |
| `ContentTable.tsx` | Admin içerik listeleme, sil/düzenle |
| `ContentForm.tsx` | Admin içerik oluştur/düzenle formu |
