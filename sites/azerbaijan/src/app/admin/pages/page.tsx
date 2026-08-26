import Link from "next/link";
import { prisma } from "@/lib/db";
import ContentTable from "@/components/admin/ContentTable";

export const dynamic = "force-dynamic";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export default async function AdminPagesPage() {
  const pages = await prisma.page.findMany({
    where: { country: COUNTRY },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, slug: true, status: true, createdAt: true },
  });

  const rows = pages.map(p => ({
    id: p.id,
    title: p.title,
    status: p.status,
    meta: `/${p.slug}`,
    date: p.createdAt,
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dinamik Sayfalar</h1>
          <p className="text-gray-500 text-sm mt-1">Özel URL'li sayfalar oluştur (hakkımızda, iletişim, vb.)</p>
        </div>
        <Link href="/admin/pages/new"
          className="bg-[#C4A234] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#a8882a] transition">
          + Yeni Sayfa
        </Link>
      </div>
      <ContentTable rows={rows} basePath="/admin/pages" deleteEndpoint="/api/pages" />
    </div>
  );
}
