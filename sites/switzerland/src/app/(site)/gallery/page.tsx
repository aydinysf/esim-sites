import { prisma } from "@/lib/db";
import PageHeader from "@/components/site/PageHeader";
import Reveal from "@/components/site/Reveal";
import type { Metadata } from "next";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export const metadata: Metadata = {
  title: "Galerie | Schweiz eSIM",
};

function youtubeId(url: string) {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return m ? m[1] : null;
}

export default async function GalleryPage() {
  const [photos, videos] = await Promise.all([
    prisma.media.findMany({ where: { country: COUNTRY, type: "IMAGE" }, orderBy: { order: "asc" } }),
    prisma.media.findMany({ where: { country: COUNTRY, type: "VIDEO" }, orderBy: { order: "asc" } }),
  ]);

  return (
    <>
      <PageHeader title="Galerie" subtitle="Eindrücke und Videos rund um Schweiz eSIM." eyebrow="Medien" breadcrumb={[{ label: "Galerie" }]} />
      <div className="max-w-6xl mx-auto px-6 py-12">
        {photos.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold text-ink mb-6 flex items-center gap-2">
              <span className="h-px w-6 bg-gold" /> Fotos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo, i) => (
                <Reveal key={photo.id} delay={(i % 4) * 60}>
                  <a href={photo.url} target="_blank" rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-card aspect-square bg-[#F1F5F9] border border-[#E2E8F0]">
                    <img
                      src={photo.url}
                      alt={photo.title || ""}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </a>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {videos.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-ink mb-6 flex items-center gap-2">
              <span className="h-px w-6 bg-gold" /> Videos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, i) => {
                const ytId = youtubeId(video.url);
                const embedUrl = ytId ? `https://www.youtube.com/embed/${ytId}` : null;
                return (
                  <Reveal key={video.id} delay={(i % 3) * 60}>
                    <div className="rounded-card overflow-hidden bg-white border border-[#E2E8F0] shadow-sm">
                      {embedUrl ? (
                        <iframe src={embedUrl} title={video.title || "Video"} className="w-full aspect-video" allowFullScreen />
                      ) : (
                        <video src={video.url} controls className="w-full aspect-video" />
                      )}
                      {video.title && <div className="p-3 text-sm font-medium text-ink">{video.title}</div>}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>
        )}

        {photos.length === 0 && videos.length === 0 && (
          <div className="text-center py-20 text-muted">Noch keine Medien hinzugefügt.</div>
        )}
      </div>
    </>
  );
}
