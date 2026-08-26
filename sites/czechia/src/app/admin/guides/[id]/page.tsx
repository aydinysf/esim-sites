import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ContentForm from "@/components/admin/ContentForm";

export default async function EditGuidePage({ params }: { params: { id: string } }) {
  const guide = await prisma.guide.findUnique({ where: { id: params.id } });
  if (!guide) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Rehberi Düzenle</h1>
      <ContentForm
        type="guide"
        submitEndpoint={`/api/guides/${guide.id}`}
        method="PUT"
        redirectPath="/admin/guides"
        initialData={{
          title: guide.title,
          slug: guide.slug,
          order: guide.order,
          difficulty: guide.difficulty || "",
          estimatedTime: guide.estimatedTime || "",
          body: guide.body,
          status: guide.status,
        }}
        fields={[
          { name: "title", label: "Başlık", type: "text", required: true },
          { name: "slug", label: "Slug", type: "text", required: true },
          { name: "order", label: "Sıra", type: "number", required: true },
          {
            name: "difficulty",
            label: "Zorluk",
            type: "select",
            options: [
              { value: "EASY", label: "Kolay" },
              { value: "MEDIUM", label: "Orta" },
              { value: "ADVANCED", label: "İleri" },
            ],
          },
          { name: "estimatedTime", label: "Tahmini Süre", type: "text" },
          { name: "body", label: "İçerik", type: "richtext", required: true },
          {
            name: "status",
            label: "Durum",
            type: "select",
            required: true,
            options: [
              { value: "DRAFT", label: "Taslak" },
              { value: "PUBLISHED", label: "Yayınla" },
            ],
          },
        ]}
      />
    </div>
  );
}
