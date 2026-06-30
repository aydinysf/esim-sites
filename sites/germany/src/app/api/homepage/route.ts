import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export async function GET() {
  const homepage = await prisma.homepage.findUnique({ where: { country: COUNTRY } });
  return Response.json(homepage);
}

// Admin formundan düzenlenebilen tüm metin alanları
const EDITABLE_FIELDS = [
  "heroHeadline", "heroSubheadline", "heroCtaText", "heroImage",
  "whyEsimTitle", "howItWorksTitle",
  "ctaBandTitle", "ctaBandSubtitle", "ctaBandCtaText", "ctaBandCtaHref",
  "headerCtaText", "headerCtaHref",
  "footerTagline",
  "blogPageTitle", "blogPageSubtitle",
  "guidesPageTitle", "guidesPageSubtitle",
  "faqPageTitle", "faqPageSubtitle",
  "packagesPageTitle", "packagesPageSubtitle",
  "metaSiteTitle", "metaSiteDescription",
] as const;

// Boş bırakılınca null'a düşmesi gereken (opsiyonel) alanlar
const NULLABLE_FIELDS = new Set<string>([
  "heroImage", "ctaBandTitle", "ctaBandSubtitle", "ctaBandCtaText", "ctaBandCtaHref",
  "headerCtaText", "headerCtaHref", "footerTagline",
  "blogPageTitle", "blogPageSubtitle", "guidesPageTitle", "guidesPageSubtitle",
  "faqPageTitle", "faqPageSubtitle", "packagesPageTitle", "packagesPageSubtitle",
  "metaSiteTitle", "metaSiteDescription",
]);

export async function PUT(req: Request) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const data: Record<string, string | null> = {};
  for (const key of EDITABLE_FIELDS) {
    if (!(key in body)) continue;              // formda gönderilmeyen alanlara dokunma
    const raw = typeof body[key] === "string" ? body[key].trim() : body[key];
    data[key] = raw === "" && NULLABLE_FIELDS.has(key) ? null : raw;
  }

  const homepage = await prisma.homepage.update({
    where: { country: COUNTRY },
    data,
  });
  return Response.json(homepage);
}
