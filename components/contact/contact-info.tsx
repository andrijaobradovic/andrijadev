import { RiMailLine, RiMapPinLine } from "@remixicon/react";
import { getTranslations } from "next-intl/server";

const CONTACT_EMAIL = "andrija@andrijadev.com";

export async function ContactInfo() {
  const tHero = await getTranslations("contact.hero");
  const t = await getTranslations("contact.info");
  const tA11y = await getTranslations("a11y");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          {tHero("title")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {tHero("subtitle")}
        </p>
      </div>

      <p className="text-base leading-relaxed text-muted-foreground">
        {t("intro")}
      </p>

      <ul className="flex flex-col gap-5">
        <li>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-3 text-sm text-foreground/90 transition-colors hover:text-primary"
            aria-label={tA11y("email")}
          >
            <RiMailLine className="size-5 shrink-0 text-primary" />
            {CONTACT_EMAIL}
          </a>
        </li>
        <li className="inline-flex items-center gap-3 text-sm text-foreground/90">
          <RiMapPinLine className="size-5 shrink-0 text-primary" />
          {t("location")}
        </li>
      </ul>
    </div>
  );
}
