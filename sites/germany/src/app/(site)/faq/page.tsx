import { prisma } from "@/lib/db";
import FaqAccordion from "@/components/site/FaqAccordion";
import type { Metadata } from "next";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export const metadata: Metadata = {
  title: "Germany eSIM FAQ | Frequently Asked Questions",
  description: "Answers to the most common questions about Germany eSIM plans and activation.",
};

export default async function FaqPage() {
  const faqs = await prisma.faq.findMany({
    where: { country: COUNTRY },
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.replace(/<[^>]*>/g, ""),
      },
    })),
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h1 className="text-4xl font-bold mb-3">Frequently Asked Questions</h1>
      <p className="text-gray-600 mb-10">Everything you need to know about Germany eSIM.</p>
      <FaqAccordion faqs={faqs} />
    </div>
  );
}
