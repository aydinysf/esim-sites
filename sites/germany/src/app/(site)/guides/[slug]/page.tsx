import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = await prisma.guide.findUnique({
    where: { country_slug: { country: COUNTRY, slug: params.slug } },
  });

  if (!guide) return {};

  return {
    title: guide.metaTitle || guide.title,
    description: guide.metaDescription || `Guide: ${guide.title}`,
    alternates: {
      canonical: `${BASE_URL}/guides/${params.slug}`,
    },
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const guide = await prisma.guide.findUnique({
    where: { country_slug: { country: COUNTRY, slug: params.slug } },
  });

  if (!guide || guide.status !== "PUBLISHED") notFound();

  const difficultyLabel: Record<string, string> = {
    EASY: "Einfach",
    MEDIUM: "Mittel",
    ADVANCED: "Fortgeschritten",
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-4 flex gap-3 items-center text-sm text-gray-500">
        {guide.difficulty && (
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
            {difficultyLabel[guide.difficulty]}
          </span>
        )}
        {guide.estimatedTime && <span>⏱ {guide.estimatedTime}</span>}
      </div>
      <h1 className="text-4xl font-bold mb-8">{guide.title}</h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: guide.body }}
      />
    </article>
  );
}
