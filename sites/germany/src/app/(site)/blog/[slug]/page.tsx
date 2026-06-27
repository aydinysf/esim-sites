import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
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
    <article className="max-w-3xl mx-auto px-4 py-12">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.coverAlt || post.title}
          className="w-full h-64 object-cover rounded-xl mb-8"
        />
      )}
      <div className="mb-4 flex gap-2 items-center text-sm text-gray-500">
        <span className="bg-brand-100 text-brand-700 px-2 py-0.5 rounded text-xs font-medium">
          {post.category}
        </span>
        {post.publishedAt && (
          <time>{new Date(post.publishedAt).toLocaleDateString("de-DE")}</time>
        )}
      </div>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </article>
  );
}
