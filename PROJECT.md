# eSIM Ülke Siteleri — Proje Dokümantasyonu

## Proje Özeti

polosim.com'un ülke bazlı tanıtım sitelerini oluşturan bir Next.js projesi.
Her site bağımsız bir domain üzerinde çalışır, içerikler PostgreSQL'de tutulur,
paket verileri polosim API'sinden runtime'da çekilir, satın alma polosim.com'a yönlendirilir.
Kullanıcı auth tamamen polosim API üzerinden yönetilir.

---

## Temel Kararlar

| Konu | Karar | Gerekçe |
|---|---|---|
| Stack | Next.js 14 (App Router) | Dinamik içerik, DB'den direkt okuma, admin panel |
| Veritabanı | PostgreSQL (Vercel Postgres) | Güçlü, SQL, Vercel ile entegre |
| ORM | Prisma | Type-safe DB erişimi, migration yönetimi |
| Auth | polosim API | Tek kullanıcı havuzu, tüm siteler ortak |
| Admin Auth | NextAuth.js (credentials) | Sadece adminler için ayrı giriş |
| İçerik | PostgreSQL tabloları | WordPress gibi, admin panelden yönetilir |
| Paket verisi | polosim API (runtime fetch + cache) | Güncel veri |
| Satın alma | polosim.com'a yönlendirme | UTM parametreli link |
| Hosting | Vercel (her site ayrı proje) | Next.js native, global CDN |
| Domain | Her ülke için ayrı domain | SEO izolasyonu |
| Dil | Her sitenin kendi dili | Yerel SEO |
| Stil | Tailwind CSS | Hızlı geliştirme |

---

## Mimari Genel Bakış

```
GitHub Monorepo
│
├── packages/
│   └── db/               → Prisma şeması ve migration'lar (paylaşılan)
│
├── sites/
│   ├── germany/          → esim-germany.com (Next.js)
│   ├── usa/              → esim-usa.com (Next.js)
│   └── ...
│
└── config/
    ├── germany.config.ts
    ├── usa.config.ts
    └── ...
```

---

## İstek Akışı

### Ziyaretçi — İçerik Sayfası
```
Kullanıcı → Next.js → PostgreSQL → Sayfa render → Kullanıcıya
```

### Ziyaretçi — Paketler Sayfası
```
Kullanıcı → Next.js → polosim API → Paket listesi render → Kullanıcıya
                    ↘ Cache (1 saat) ↗
```

### Kullanıcı Girişi
```
Kullanıcı → site login formu → polosim API (auth) → JWT token → Cookie → Giriş tamam
```

### Satın Alma
```
Kullanıcı "Satın Al" tıklar → polosim.com (UTM link) → polosim ödeme akışı
```

### Admin İçerik Yönetimi
```
Admin → /admin/login → NextAuth (credentials) → /admin paneli → PostgreSQL
```

---

## Ülke Config Dosyası Şeması

```typescript
// config/germany.config.ts
export default {
  country: {
    code: "DE",
    name: "Germany",
    localName: "Deutschland",
    flag: "🇩🇪",
    currency: "EUR",
    timezone: "Europe/Berlin",
  },
  site: {
    domain: "esim-germany.com",
    lang: "de",
    defaultLocale: "de-DE",
    title: "eSIM Deutschland | esim-germany.com",
    description: "Die besten eSIM-Tarife für Deutschland vergleichen und sofort aktivieren",
  },
  polosim: {
    countryFilter: "DE",
    buyBaseUrl: "https://www.polosim.com/tr/destination/germany",
    utmParams: {
      utm_source: "esim-germany.com",
      utm_medium: "referral",
      utm_campaign: "country-site",
    },
  },
  seo: {
    primaryKeyword: "Germany eSIM",
    secondaryKeywords: ["Deutschland eSIM", "Germany SIM card", "eSIM Deutschland"],
  },
}
```

---

## Pilot Ülkeler

polosim'deki aktif destinasyonlara göre belirlenir. Örnek başlangıç:

1. **Almanya** (`esim-germany.com`)
2. **ABD** (`esim-usa.com`)

---

## Teknoloji Listesi

| Teknoloji | Versiyon | Kullanım |
|---|---|---|
| Next.js | 14.x | Ana framework (App Router) |
| TypeScript | 5.x | Tüm kod tabanı |
| Tailwind CSS | 3.x | Stil |
| Prisma | 5.x | ORM, migration yönetimi |
| PostgreSQL | 15.x | Veritabanı (Vercel Postgres) |
| NextAuth.js | 5.x | Admin auth |
| polosim API | — | Kullanıcı auth + paket verisi |
| Vercel | — | Hosting + CDN + Postgres |
| Turborepo | — | Monorepo yönetimi |
