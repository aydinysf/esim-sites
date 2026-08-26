import Link from "next/link";

interface Guide {
  slug: string;
  title: string;
  difficulty?: string | null;
  estimatedTime?: string | null;
}

const difficultyMap: Record<string, { label: string; color: string }> = {
  EASY:     { label: "Einfach",       color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  MEDIUM:   { label: "Mittel",        color: "text-amber-700 bg-amber-50 border-amber-200" },
  ADVANCED: { label: "Fortgeschritten", color: "text-rose-700 bg-rose-50 border-rose-200" },
};

export default function GuideCard({ guide }: { guide: Guide }) {
  const diff = guide.difficulty ? difficultyMap[guide.difficulty] : null;

  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex items-center gap-4 bg-card border border-sand rounded-card p-5 shadow-card hover:shadow-lift hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gold-pale flex items-center justify-center text-gold">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-ink group-hover:text-gold transition-colors text-sm leading-snug line-clamp-2">
          {guide.title}
        </h3>
        <div className="flex items-center gap-2 mt-1.5">
          {diff && (
            <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border ${diff.color}`}>
              {diff.label}
            </span>
          )}
          {guide.estimatedTime && (
            <span className="text-[11px] text-stone flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" />
              </svg>
              {guide.estimatedTime}
            </span>
          )}
        </div>
      </div>

      <svg className="w-4 h-4 text-stone group-hover:text-gold group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
