import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/seo";

type ContactJsonLdProps = {
  locale: string;
};

export function ContactJsonLd({ locale }: ContactJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/${locale}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      contactPoint: {
        "@type": "ContactPoint",
        email: CONTACT_EMAIL,
        contactType: "customer service",
        availableLanguage: ["English", "Serbian"],
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
