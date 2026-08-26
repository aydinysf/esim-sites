import { prisma } from "@/lib/db";
import BlogCard from "@/components/site/BlogCard";
import PageHeader from "@/components/site/PageHeader";
import Reveal from "@/components/site/Reveal";
import type { Metadata } from "next";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export async function generateMetadata(): Promise<Metadata> {
  const hp = await prisma.homepage.findUnique({
    where: { country: COUNTRY },
    select: { blogPageTitle: true, blogPageSubtitle: true, metaSiteTitle: true },
  });
  return {
    title: hp?.blogPageTitle ? `${hp.blogPageTitle} | ${hp.metaSiteTitle || "eSIM"}` : "Blog | Azərbaycan eSIM",
    description: hp?.blogPageSubtitle || "Latest Azərbaycan eSIM tips, guides and news.",
  };
}

export default async function BlogPage() {
  const [posts, hp] = await Promise.all([
    prisma.post.findMany({
      where: { country: COUNTRY, status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
    }),
    prisma.homepage.findUnique({
      where: { country: COUNTRY },
      select: { blogPageTitle: true, blogPageSubtitle: true },
    }),
  ]);

  const title    = hp?.blogPageTitle    || "Blog";
  const subtitle = hp?.blogPageSubtitle || "";

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} eyebrow="Ratgeber" breadcrumb={[{ label: "Blog" }]} />
      <div className="max-w-6xl mx-auto px-6 py-12">
        {posts.length === 0 ? (
          <p className="text-muted">Noch keine Beiträge vorhanden.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={(i % 3) * 80}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
