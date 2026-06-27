import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ContentForm from "@/components/admin/ContentForm";

interface Props {
  params: { id: string };
}

export default async function EditBlogPage({ params }: Props) {
  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Blog Yazısını Düzenle</h1>
      <ContentForm
        type="blog"
        submitEndpoint={`/api/blog/${post.id}`}
        method="PUT"
        redirectPath="/admin/blog"
        initialData={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          category: post.category,
          coverImage: post.coverImage || "",
          body: post.body,
          status: post.status,
        }}
        fields={[
          { name: "title", label: "Başlık", type: "text", required: true },
          { name: "slug", label: "Slug", type: "text", required: true },
          { name: "excerpt", label: "Özet", type: "textarea", required: true },
          {
            name: "category",
            label: "Kategori",
            type: "select",
            required: true,
            options: [
              { value: "GUIDE", label: "Rehber" },
              { value: "NEWS", label: "Haber" },
              { value: "TIP", label: "İpucu" },
              { value: "COMPARISON", label: "Karşılaştırma" },
            ],
          },
          { name: "coverImage", label: "Kapak Görseli URL", type: "text" },
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
