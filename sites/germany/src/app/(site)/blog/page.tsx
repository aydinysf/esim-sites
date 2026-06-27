import { prisma } from "@/lib/db";
import BlogCard from "@/components/site/BlogCard";
import type { Metadata } from "next";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export const metadata: Metadata = {
  title: "Germany eSIM Blog | Tips & Guides",
  description: "Latest Germany eSIM tips, guides and news.",
};

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { country: COUNTRY, status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-3">Blog</h1>
      <p className="text-gray-600 mb-10">Tips, guides and news about Germany eSIM.</p>
      {posts.length === 0 ? (
        <p className="text-gray-500">Henüz yazı yok.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
