import {
  RiInstagramLine,
  RiLinkedinBoxLine,
  RiMailLine,
} from "@remixicon/react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";

const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/andrija-obradovic-1998ao/",
  instagram: "https://www.instagram.com/andrija_obradovic/",
} as const;

const CONTACT_EMAIL = "info@andrijadev.com";

const footerRoutes = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/projects", key: "projects" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export async function Footer() {
  const t = await getTranslations("nav");
  const tFooter = await getTranslations("footer");
  const tA11y = await getTranslations("a11y");

  return (
    <footer className="mt-auto border-t border-border/30 bg-background/20 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 text-center lg:grid-cols-3 lg:items-start lg:text-left">
          <div className="flex flex-col items-center space-y-3 lg:items-start">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {tFooter("tagline")}
            </p>
          </div>

          <nav aria-label={tA11y("footerNav")} className="lg:text-center">
            <ul className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-center lg:gap-6">
              {footerRoutes.map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="nav-link inline-block text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-center gap-4 lg:items-end">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary"
              aria-label={tA11y("email")}
            >
              <RiMailLine className="size-4 shrink-0" />
              {CONTACT_EMAIL}
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary"
            >
              <RiLinkedinBoxLine className="size-4 shrink-0" />
              Andrija Obradovic
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary"
            >
              <RiInstagramLine className="size-4 shrink-0" />
              @andrija_obradovic
            </a>
          </div>
        </div>

        <p className="mt-10 border-t border-border/20 pt-6 text-center text-xs text-muted-foreground">
          {tFooter("copyright")}
        </p>
      </div>
    </footer>
  );
}
