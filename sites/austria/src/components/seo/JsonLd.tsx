import React from "react";

export function OrganizationJsonLd({
  siteUrl,
  siteName,
  logoUrl,
}: {
  siteUrl: string;
  siteName: string;
  logoUrl?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: logoUrl || `${siteUrl}/logo.png`,
    sameAs: [
      "https://www.facebook.com/polosim",
      "https://www.instagram.com/polosim",
      "https://twitter.com/polosim",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductListJsonLd({
  packages,
  siteUrl,
  currency = "EUR",
}: {
  packages: Array<{
    id: string;
    name: string;
    price: number;
    currency?: string;
    dataAmount: number;
    dataUnit: string;
    validity: number;
  }>;
  siteUrl: string;
  currency?: string;
}) {
  if (!packages || packages.length === 0) return null;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: packages.map((pkg, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: pkg.name,
        description: `${pkg.dataAmount} ${pkg.dataUnit} eSIM package valid for ${pkg.validity} days. Instant digital delivery.`,
        sku: pkg.id,
        brand: {
          "@type": "Brand",
          name: "PoloSim",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: pkg.currency || currency,
          price: pkg.price,
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/packages`,
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
    />
  );
}

export function FaqJsonLd({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
