import { prisma } from "@/lib/db";
import ContentTable from "@/components/admin/ContentTable";

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
        <a
          href="/admin/guides/new"
          className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition text-sm font-medium"
        >
          + Yeni Rehber
        </a>
      </div>
      <ContentTable rows={rows} basePath="/admin/guides" deleteEndpoint="/api/guides" />
    </div>
  );
}
