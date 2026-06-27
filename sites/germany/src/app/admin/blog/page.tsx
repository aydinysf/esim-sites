import { prisma } from "@/lib/db";
import ContentTable from "@/components/admin/ContentTable";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export default async function AdminBlogPage() {
  const posts = await prisma.post.findMany({
    where: { country: COUNTRY },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, status: true, category: true, publishedAt: true, createdAt: true },
  });

  const rows = posts.map((p) => ({
    id: p.id,
    title: p.title,
    status: p.status,
    meta: p.category,
    date: p.createdAt,
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Yazıları</h1>
        <a
          href="/admin/blog/new"
          className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition text-sm font-medium"
        >
          + Yeni Yazı
        </a>
      </div>
      <ContentTable rows={rows} basePath="/admin/blog" deleteEndpoint="/api/blog" />
    </div>
  );
}
