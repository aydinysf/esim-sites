# İçerik Şeması — PostgreSQL Tabloları

İçerikler MD dosyalarında değil, PostgreSQL'de tutulur.
Admin panelden yönetilir, site direkt DB'den okur.

---

## İçerik Tipleri

| Tip | Tablo | Açıklama |
|---|---|---|
| Blog yazısı | `Post` | SEO odaklı yazılar |
| Rehber | `Guide` | Evergreen rehber sayfaları |
| SSS | `Faq` | Sık sorulan sorular |
| Ana sayfa | `Homepage` | Hero, neden eSIM, nasıl çalışır |

Tüm tablolar `country` kolonu ile ülkeye göre ayrılır.

---

## 1. Blog Yazısı (Post)

**Admin formunda doldurulacak alanlar:**

| Alan | Tip | Zorunlu | Açıklama |
|---|---|---|---|
| title | String | ✓ | Yazı başlığı |
| slug | String | ✓ | URL'de kullanılır, otomatik üretilir |
| excerpt | String | ✓ | Kısa özet, max 160 karakter |
| body | String (HTML) | ✓ | Rich text editörden gelir |
| coverImage | String | — | Görsel URL |
| coverAlt | String | — | Görsel alt metni |
| category | Enum | ✓ | GUIDE / NEWS / TIP / COMPARISON |
| tags | String[] | — | Etiketler |
| featured | Boolean | — | Ana sayfada öne çıkar |
| status | Enum | ✓ | DRAFT / PUBLISHED |
| publishedAt | DateTime | — | Yayın tarihi |

**Slug üretimi:**
```typescript
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}
```

**Örnek DB kaydı:**
```json
{
  "id": "clx1234",
  "country": "DE",
  "title": "eSIM in Deutschland aktivieren",
  "slug": "esim-deutschland-aktivieren",
  "excerpt": "So aktivieren Sie Ihre eSIM in Deutschland...",
  "body": "<h2>Schritt 1</h2><p>...</p>",
  "category": "GUIDE",
  "tags": ["esim", "deutschland", "aktivierung"],
  "featured": true,
  "status": "PUBLISHED",
  "publishedAt": "2024-03-15T10:00:00Z"
}
```

---

## 2. Rehber (Guide)

**Admin formunda doldurulacak alanlar:**

| Alan | Tip | Zorunlu | Açıklama |
|---|---|---|---|
| title | String | ✓ | Rehber başlığı |
| slug | String | ✓ | URL slug |
| body | String (HTML) | ✓ | Rich text içerik |
| order | Int | ✓ | Navigasyonda sıra |
| difficulty | Enum | — | EASY / MEDIUM / ADVANCED |
| estimatedTime | String | — | "5 Minuten" gibi |
| status | Enum | ✓ | DRAFT / PUBLISHED |

**Örnek DB kaydı:**
```json
{
  "id": "clx5678",
  "country": "DE",
  "title": "eSIM einrichten — iPhone und Android",
  "slug": "esim-einrichten",
  "order": 1,
  "difficulty": "EASY",
  "estimatedTime": "5 Minuten",
  "status": "PUBLISHED"
}
```

---

## 3. SSS (Faq)

**Admin formunda doldurulacak alanlar:**

| Alan | Tip | Zorunlu | Açıklama |
|---|---|---|---|
| question | String | ✓ | Soru metni |
| answer | String (HTML) | ✓ | Cevap metni |
| category | Enum | ✓ | OPERATORS / SETUP / PACKAGES / GENERAL |
| order | Int | ✓ | Kategori içinde sıra |

**Örnek DB kaydı:**
```json
{
  "id": "clx9012",
  "country": "DE",
  "question": "Welche Anbieter unterstützen eSIM in Deutschland?",
  "answer": "<p>In Deutschland unterstützen Telekom, Vodafone und O2 eSIM...</p>",
  "category": "OPERATORS",
  "order": 1
}
```

---

## 4. Ana Sayfa (Homepage)

**Admin formunda doldurulacak alanlar:**

| Alan | Tip | Açıklama |
|---|---|---|
| heroHeadline | String | Ana başlık |
| heroSubheadline | String | Alt başlık |
| heroCtaText | String | Buton metni |
| heroImage | String | Hero görsel URL |
| whyEsimTitle | String | "Neden eSIM?" bölüm başlığı |
| whyEsimItems | JSON | [{icon, title, description}] |
| howItWorksTitle | String | "Nasıl çalışır?" başlığı |
| howItWorksSteps | JSON | [{step, title, description}] |
| stats | JSON | [{value, label}] |

**Örnek whyEsimItems:**
```json
[
  {
    "icon": "zap",
    "title": "Sofort aktivieren",
    "description": "Kein Warten auf eine physische SIM-Karte"
  },
  {
    "icon": "globe",
    "title": "Deutschlandweit",
    "description": "Stabile Verbindung im ganzen Land"
  }
]
```

---

## Admin Paneli İçerik Akışı

```
Admin /admin/blog/new açar
    → Formu doldurur (başlık, içerik, kategori...)
    → "Yayınla" veya "Taslak Kaydet" tıklar
    → POST /api/blog
    → Prisma → PostgreSQL'e yazar
    → /admin/blog listesine yönlendirilir

Ziyaretçi /blog açar
    → Next.js → prisma.post.findMany({ country: "DE", status: "PUBLISHED" })
    → Sayfa render edilir
```

---

## Rich Text Editör

Blog ve rehber içerikleri için **Tiptap** editörü kullanılır.

```typescript
// components/admin/RichTextEditor.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

const editor = useEditor({
  extensions: [StarterKit, Image, Link],
  content: initialContent,
  onUpdate: ({ editor }) => {
    onChange(editor.getHTML());  // HTML olarak DB'ye kaydedilir
  },
});
```

Desteklenen formatlar: H2, H3, bold, italic, liste, link, görsel, kod bloğu.

---

## SEO Meta Alanları

Blog ve rehber için SEO meta alanları ayrıca tutulur.
Prisma şemasına eklenebilir veya başlık/excerpt'ten otomatik üretilebilir:

```typescript
// Otomatik meta üretimi (manuel girilmezse)
const metaTitle = post.title.slice(0, 60);
const metaDescription = post.excerpt.slice(0, 160);
```

Manuel override istenirse `Post` ve `Guide` tablolarına eklenecek alanlar:
```prisma
metaTitle       String?
metaDescription String?
canonicalUrl    String?
noIndex         Boolean @default(false)
```
