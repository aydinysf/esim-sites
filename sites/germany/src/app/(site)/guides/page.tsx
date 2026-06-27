import { prisma } from "@/lib/db";
import GuideCard from "@/components/site/GuideCard";
import type { Metadata } from "next";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export const metadata: Metadata = {
  title: "Germany eSIM Guides | Setup & Activation",
  description: "Step-by-step guides for activating and using eSIM in Germany.",
};

export default async function GuidesPage() {
  const guides = await prisma.guide.findMany({
    where: { country: COUNTRY, status: "PUBLISHED" },
    orderBy: { order: "asc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-3">eSIM Guides for Germany</h1>
      <p className="text-gray-600 mb-10">Everything you need to set up and use your Germany eSIM.</p>
      {guides.length === 0 ? (
        <p className="text-gray-500">Henüz rehber yok.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      )}
    </div>
  );
}
