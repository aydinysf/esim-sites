"use client";

import { useState } from "react";

interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const categoryLabel: Record<string, string> = {
  GENERAL:   "Allgemein",
  SETUP:     "Einrichtung",
  PACKAGES:  "Tarife",
  OPERATORS: "Anbieter",
};

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const grouped = faqs.reduce<Record<string, Faq[]>>((acc, faq) => {
    (acc[faq.category] ??= []).push(faq);
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      {Object.entries(grouped).map(([category, items]) => (
        <section key={category}>
          <h2 className="font-display text-xl font-bold text-ink mb-4 flex items-center gap-2">
            <span className="w-5 h-px bg-gold inline-block" />
            {categoryLabel[category] || category}
          </h2>

          <div className="space-y-2">
            {items.map((faq) => {
              const open = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`border rounded-card overflow-hidden transition-colors ${open ? "border-gold/50 bg-card" : "border-sand bg-card hover:border-gold/30"}`}
                >
                  <button
                    onClick={() => setOpenId(open ? null : faq.id)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-medium text-ink text-sm leading-snug">{faq.question}</span>
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all
                      ${open ? "bg-gold text-white rotate-45" : "bg-sand text-stone"}`}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>

                  {open && (
                    <div
                      className="px-5 pb-5 text-sm text-stone leading-relaxed prose prose-sm max-w-none border-t border-sand pt-3"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
