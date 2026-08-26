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
  const post = await prisma.post.findUnique({
    where: { country_slug: { country: COUNTRY, slug: params.slug } },
  });

  if (!post) return {};

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
    },
    alternates: {
      canonical: `${BASE_URL}/blog/${params.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { country_slug: { country: COUNTRY, slug: params.slug } },
  });

  if (!post || post.status !== "PUBLISHED") notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
      </div>

      <div className="mb-4 flex gap-2 items-center text-sm text-muted">
        <span className="bg-gold-pale text-gold px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide">
          {post.category}
        </span>
        {post.publishedAt && (
          <time>{new Date(post.publishedAt).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}</time>
        )}
      </div>

      <h1 className="font-display text-4xl md:text-5xl font-bold text-ink leading-[1.1] tracking-tight mb-5">{post.title}</h1>
      <p className="text-lg text-muted mb-8 leading-relaxed">{post.excerpt}</p>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.coverAlt || post.title}
          className="w-full aspect-[16/9] object-cover rounded-card mb-10 shadow-sm"
        />
      )}

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />

      <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
        <BackLink href="/blog" label="Alle Beiträge" />
      </div>
    </article>
  );
}
