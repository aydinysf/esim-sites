import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/site/Breadcrumb";
import BackLink from "@/components/site/BackLink";
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
    <article className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Breadcrumb items={[{ label: "Guides", href: "/guides" }, { label: guide.title }]} />
      </div>

      <div className="mb-4 flex gap-2 items-center text-sm text-muted">
        {guide.difficulty && (
          <span className="bg-gold-pale text-gold px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide">
            {difficultyLabel[guide.difficulty]}
          </span>
        )}
        {guide.estimatedTime && (
          <span className="inline-flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {guide.estimatedTime}
          </span>
        )}
      </div>

      <h1 className="font-display text-4xl md:text-5xl font-bold text-ink leading-[1.1] tracking-tight mb-8">{guide.title}</h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: guide.body }}
      />

      <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
        <BackLink href="/guides" label="Alle Guides" />
      </div>
    </article>
  );
}
