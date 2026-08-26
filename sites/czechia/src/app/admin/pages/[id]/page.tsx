import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ContentForm from "@/components/admin/ContentForm";

export default async function EditPagePage({ params }: { params: { id: string } }) {
  const page = await prisma.page.findUnique({ where: { id: params.id } });
  if (!page) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Sayfayı Düzenle</h1>
      <ContentForm
        type="page"
        submitEndpoint={`/api/pages/${page.id}`}
        method="PUT"
        redirectPath="/admin/pages"
        initialData={{
          title: page.title,
          slug: page.slug,
          metaTitle: page.metaTitle || "",
          metaDescription: page.metaDescription || "",
          body: page.body,
          status: page.status,
        }}
        fields={[
          { name: "title", label: "Başlık", type: "text", required: true },
          { name: "slug", label: "Slug (URL)", type: "text", required: true },
          { name: "metaTitle", label: "Meta Başlık (opsiyonel)", type: "text" },
          { name: "metaDescription", label: "Meta Açıklama (opsiyonel)", type: "textarea" },
          { name: "body", label: "İçerik", type: "richtext", required: true },
          {
            name: "status", label: "Durum", type: "select", required: true,
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
