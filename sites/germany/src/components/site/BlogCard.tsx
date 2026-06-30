import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string | null;
  category: string;
  publishedAt?: Date | null;
}

const categoryLabel: Record<string, string> = {
  GUIDE: "Ratgeber", NEWS: "News", TIP: "Tipps", COMPARISON: "Vergleich",
};

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-card border border-sand rounded-card overflow-hidden shadow-card hover:shadow-lift hover:-translate-y-0.5 transition-all duration-200"
    >
      {post.coverImage ? (
        <div className="overflow-hidden aspect-[16/9] bg-sand">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-gradient-to-br from-[#F1F5F9] to-[#E2E8F0] flex items-center justify-center">
          <svg className="w-10 h-10 text-[#CBD5E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
      )}

      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gold">
            {categoryLabel[post.category] || post.category}
          </span>
          {post.publishedAt && (
            <time className="text-[11px] text-stone tabular">
              {new Date(post.publishedAt).toLocaleDateString("de-DE", { day: "2-digit", month: "short", year: "numeric" })}
            </time>
          )}
        </div>

        <h3 className="font-display font-bold text-lg text-ink leading-snug group-hover:text-gold transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-stone leading-relaxed line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold mt-1 group-hover:gap-2 transition-all">
          Weiterlesen
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
