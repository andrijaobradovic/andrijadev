import { absoluteUrl } from "@/lib/seo";

type ServicesListJsonLdProps = {
  locale: string;
  items: Array<{ slug: string; title: string }>;
};

export function ServicesListJsonLd({ locale, items }: ServicesListJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: absoluteUrl(locale, `/services/${item.slug}`),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
