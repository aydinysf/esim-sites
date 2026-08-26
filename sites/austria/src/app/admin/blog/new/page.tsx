import ContentForm from "@/components/admin/ContentForm";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Yeni Blog Yazısı</h1>
      <ContentForm
        type="blog"
        submitEndpoint="/api/blog"
        redirectPath="/admin/blog"
        fields={[
          { name: "title", label: "Başlık", type: "text", required: true },
          { name: "slug", label: "Slug", type: "text", required: true },
          { name: "excerpt", label: "Özet (max 160 karakter)", type: "textarea", required: true },
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
