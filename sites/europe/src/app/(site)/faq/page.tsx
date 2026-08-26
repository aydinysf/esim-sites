import { prisma } from "@/lib/db";
import FaqAccordion from "@/components/site/FaqAccordion";
import PageHeader from "@/components/site/PageHeader";
import type { Metadata } from "next";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export async function generateMetadata(): Promise<Metadata> {
  const hp = await prisma.homepage.findUnique({
    where: { country: COUNTRY },
    select: { faqPageTitle: true, faqPageSubtitle: true, metaSiteTitle: true },
  });
  return {
    title: hp?.faqPageTitle ? `${hp.faqPageTitle} | ${hp.metaSiteTitle || "eSIM"}` : "FAQ | Europe eSIM",
    description: hp?.faqPageSubtitle || "Frequently asked questions about Europe eSIM.",
  };
}

export default async function FaqPage() {
  const [faqs, hp] = await Promise.all([
    prisma.faq.findMany({
      where: { country: COUNTRY },
      orderBy: [{ category: "asc" }, { order: "asc" }],
    }),
    prisma.homepage.findUnique({
      where: { country: COUNTRY },
      select: { faqPageTitle: true, faqPageSubtitle: true },
    }),
  ]);

  const title    = hp?.faqPageTitle    || "FAQ";
  const subtitle = hp?.faqPageSubtitle || "";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer.replace(/<[^>]*>/g, "") },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHeader title={title} subtitle={subtitle} eyebrow="Hilfe" breadcrumb={[{ label: "FAQ" }]} />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <FaqAccordion faqs={faqs} />
      </div>
    </>
  );
}
