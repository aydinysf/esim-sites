import Link from "next/link";
import { prisma } from "@/lib/db";
import ContentTable from "@/components/admin/ContentTable";

export const dynamic = "force-dynamic";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export default async function AdminGuidesPage() {
  const guides = await prisma.guide.findMany({
    where: { country: COUNTRY },
    orderBy: { order: "asc" },
    select: { id: true, title: true, status: true, difficulty: true, createdAt: true },
  });

  const rows = guides.map((g) => ({
    id: g.id,
    title: g.title,
    status: g.status,
    meta: g.difficulty || "-",
    date: g.createdAt,
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Rehberler</h1>
        <Link
          href="/admin/guides/new"
          className="bg-[#C4A234] text-white px-4 py-2 rounded-lg hover:bg-[#a8882a] transition text-sm font-medium"
        >
          + Yeni Rehber
        </Link>
      </div>
      <ContentTable rows={rows} basePath="/admin/guides" deleteEndpoint="/api/guides" />
    </div>
  );
}
