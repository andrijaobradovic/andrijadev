const SITE_URL = "https://andrijadev.com";
const CONTACT_EMAIL = "info@andrijadev.com";

const SOCIAL_LINKS = [
  "https://www.linkedin.com/in/andrija-obradovic-1998ao/",
  "https://www.instagram.com/andrija_obradovic/",
] as const;

type PersonJsonLdProps = {
  locale: string;
};

export function PersonJsonLd({ locale }: PersonJsonLdProps) {
  const isSerbian = locale === "sr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andrija Obradovic",
    jobTitle: isSerbian ? "Web developer" : "Web Developer",
    url: `${SITE_URL}/${locale}/about`,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: isSerbian ? "Beograd" : "Belgrade",
      addressCountry: "RS",
    },
    sameAs: [...SOCIAL_LINKS],
    worksFor: {
      "@type": "Organization",
      name: "AndrijaDev",
      url: SITE_URL,
    },
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
