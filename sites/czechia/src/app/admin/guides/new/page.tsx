import ContentForm from "@/components/admin/ContentForm";

export default function NewGuidePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Yeni Rehber</h1>
      <ContentForm
        type="guide"
        submitEndpoint="/api/guides"
        redirectPath="/admin/guides"
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
          { name: "estimatedTime", label: "Tahmini Süre (ör: 5 Minuten)", type: "text" },
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
