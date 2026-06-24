import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SERVICE_SLUGS } from "@/lib/services";
import { SITE_URL, getLanguageAlternates, type PagePath } from "@/lib/seo";

type SitemapConfig = {
  path: PagePath;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

const SITEMAP_PAGES: SitemapConfig[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
  ...SERVICE_SLUGS.map((slug) => ({
    path: `/services/${slug}` as PagePath,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  })),
  { path: "/about", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/blog", changeFrequency: "monthly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    SITEMAP_PAGES.map(({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: getLanguageAlternates(path),
      },
    }))
  );
}
