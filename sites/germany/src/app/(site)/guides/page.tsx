import { prisma } from "@/lib/db";
import GuideCard from "@/components/site/GuideCard";
import PageHeader from "@/components/site/PageHeader";
import Reveal from "@/components/site/Reveal";
import type { Metadata } from "next";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export async function generateMetadata(): Promise<Metadata> {
  const hp = await prisma.homepage.findUnique({
    where: { country: COUNTRY },
    select: { guidesPageTitle: true, guidesPageSubtitle: true, metaSiteTitle: true },
  });
  return {
    title: hp?.guidesPageTitle ? `${hp.guidesPageTitle} | ${hp.metaSiteTitle || "eSIM"}` : "Guides | Germany eSIM",
    description: hp?.guidesPageSubtitle || "Step-by-step guides for Germany eSIM.",
  };
}

export default async function GuidesPage() {
  const [guides, hp] = await Promise.all([
    prisma.guide.findMany({
      where: { country: COUNTRY, status: "PUBLISHED" },
      orderBy: { order: "asc" },
    }),
    prisma.homepage.findUnique({
      where: { country: COUNTRY },
      select: { guidesPageTitle: true, guidesPageSubtitle: true },
    }),
  ]);

  const title    = hp?.guidesPageTitle    || "eSIM Guides";
  const subtitle = hp?.guidesPageSubtitle || "";

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} eyebrow="Anleitungen" breadcrumb={[{ label: "Guides" }]} />
      <div className="max-w-6xl mx-auto px-6 py-12">
        {guides.length === 0 ? (
          <p className="text-muted">Noch keine Guides vorhanden.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {guides.map((guide, i) => (
              <Reveal key={guide.id} delay={(i % 2) * 80}>
                <GuideCard guide={guide} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
