import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ContentForm from "@/components/admin/ContentForm";

export default async function EditFaqPage({ params }: { params: { id: string } }) {
  const faq = await prisma.faq.findUnique({ where: { id: params.id } });
  if (!faq) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">SSS Sorusunu Düzenle</h1>
      <ContentForm
        type="faq"
        submitEndpoint={`/api/faq/${faq.id}`}
        method="PUT"
        redirectPath="/admin/faq"
        initialData={{
          question: faq.question,
          answer: faq.answer,
          category: faq.category,
          order: faq.order,
        }}
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
