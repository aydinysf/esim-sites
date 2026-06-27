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
      priority: 0.7 as const,
      changeFrequency: "monthly" as const,
    })),
    ...guides.map((g) => ({
      url: `${BASE_URL}/guides/${g.slug}`,
      lastModified: g.updatedAt,
      priority: 0.8 as const,
      changeFrequency: "monthly" as const,
    })),
  ];
}
