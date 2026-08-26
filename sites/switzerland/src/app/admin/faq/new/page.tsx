import ContentForm from "@/components/admin/ContentForm";

export default function NewFaqPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Yeni SSS Sorusu</h1>
      <ContentForm
        type="faq"
        submitEndpoint="/api/faq"
        redirectPath="/admin/faq"
        fields={[
          { name: "question", label: "Soru", type: "text", required: true },
          { name: "answer", label: "Cevap", type: "richtext", required: true },
          {
            name: "category",
            label: "Kategori",
            type: "select",
            required: true,
            options: [
              { value: "GENERAL", label: "Genel" },
              { value: "SETUP", label: "Kurulum" },
              { value: "PACKAGES", label: "Paketler" },
              { value: "OPERATORS", label: "Operatörler" },
            ],
          },
          { name: "order", label: "Sıra", type: "number", required: true },
        ]}
      />
    </div>
  );
}
