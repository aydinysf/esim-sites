import ContentForm from "@/components/admin/ContentForm";

export default function NewPagePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Yeni Sayfa</h1>
      <ContentForm
        type="page"
        submitEndpoint="/api/pages"
        redirectPath="/admin/pages"
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
