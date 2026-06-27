import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await prisma.page.findUnique({
    where: { country_slug: { country: COUNTRY, slug: params.slug } },
  });
  if (!page) return {};
  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || undefined,
    robots: page.noIndex ? { index: false } : undefined,
    alternates: { canonical: `${BASE_URL}/${params.slug}` },
  };
}

export default async function DynamicPage({ params }: Props) {
  const page = await prisma.page.findUnique({
    where: { country_slug: { country: COUNTRY, slug: params.slug } },
  });

  if (!page || page.status !== "PUBLISHED") notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: page.body }}
      />
    </div>
  );
}
