import {
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/seo";

type OrganizationWebsiteJsonLdProps = {
  locale: string;
};

export function OrganizationWebsiteJsonLd({
  locale,
}: OrganizationWebsiteJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}${OG_IMAGE}`,
        sameAs: [...SOCIAL_LINKS],
      },
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: `${SITE_URL}/${locale}`,
        inLanguage: ["en-US", "sr-RS"],
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
