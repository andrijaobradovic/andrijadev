import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

export const SITE_URL = "https://andrijadev.com";
export const SITE_NAME = "AndrijaDev";
export const OG_IMAGE = "/og-image.png";
export const CONTACT_EMAIL = "andrija@andrijadev.com";

export const SOCIAL_LINKS = [
  "https://www.linkedin.com/in/andrija-obradovic-1998ao/",
  "https://www.instagram.com/andrija_obradovic/",
] as const;

export type PagePath =
  | ""
  | "/about"
  | "/services"
  | `/services/${string}`
  | "/projects"
  | "/contact"
  | "/blog";

function normalizePath(path: PagePath): string {
  if (!path) return "";
  return path.startsWith("/") ? path : `/${path}`;
}

export function absoluteUrl(locale: string, path: PagePath = ""): string {
  return `${SITE_URL}/${locale}${normalizePath(path)}`;
}

export function getLanguageAlternates(path: PagePath = ""): Record<string, string> {
  const normalized = normalizePath(path);

  return {
    en: `${SITE_URL}/en${normalized}`,
    sr: `${SITE_URL}/sr${normalized}`,
    "x-default": `${SITE_URL}/en${normalized}`,
  };
}

export function isPreviewEnvironment(): boolean {
  return Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production");
}

export function getNoIndexRobots(): NonNullable<Metadata["robots"]> {
  return { index: false, follow: false };
}

type CreatePageMetadataOptions = {
  locale: string;
  path: PagePath;
  title: string;
  description: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  locale,
  path,
  title,
  description,
  noIndex = false,
}: CreatePageMetadataOptions): Metadata {
  const canonical = absoluteUrl(locale, path);
  const shouldNoIndex = noIndex || isPreviewEnvironment();

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: getLanguageAlternates(path),
    },
    ...(shouldNoIndex ? { robots: getNoIndexRobots() } : {}),
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: locale === "sr" ? "sr_RS" : "en_US",
      type: "website",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "AndrijaDev - Turning your ideas into web applications",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

export function isValidLocale(locale: string): locale is Locale {
  return routing.locales.includes(locale as Locale);
}
