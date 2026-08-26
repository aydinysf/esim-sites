import Breadcrumb, { type Crumb } from "./Breadcrumb";

interface Props {
  title: string;
  subtitle?: string;
  breadcrumb?: Crumb[];
  eyebrow?: string;
}

export default function PageHeader({ title, subtitle, breadcrumb, eyebrow }: Props) {
  return (
    <div className="relative bg-white border-b border-[#E2E8F0] overflow-hidden">
      {/* subtle gold glow */}
      <div className="absolute inset-0 opacity-[0.5] pointer-events-none" style={{
        background: "radial-gradient(60% 120% at 100% 0%, #FEF9E7 0%, transparent 60%)"
      }} />
      <div className="relative max-w-6xl mx-auto px-6 py-10 md:py-12">
        {breadcrumb && <div className="mb-5"><Breadcrumb items={breadcrumb} /></div>}
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">{eyebrow}</p>
        )}
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ink tracking-tight leading-[1.05]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted mt-4 max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
