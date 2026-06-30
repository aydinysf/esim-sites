import Link from "next/link";
import { prisma } from "@/lib/db";
import ContentTable from "@/components/admin/ContentTable";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export default async function AdminFaqPage() {
  const faqs = await prisma.faq.findMany({
    where: { country: COUNTRY },
    orderBy: [{ category: "asc" }, { order: "asc" }],
    select: { id: true, question: true, category: true, order: true, createdAt: true },
  });

  const rows = faqs.map((f) => ({
    id: f.id,
    title: f.question,
    status: "PUBLISHED" as const,
    meta: f.category,
    date: f.createdAt,
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">SSS (Sık Sorulan Sorular)</h1>
        <Link
          href="/admin/faq/new"
          className="bg-[#C4A234] text-white px-4 py-2 rounded-lg hover:bg-[#a8882a] transition text-sm font-medium"
        >
          + Yeni Soru
        </Link>
      </div>
      <ContentTable rows={rows} basePath="/admin/faq" deleteEndpoint="/api/faq" />
    </div>
  );
}
