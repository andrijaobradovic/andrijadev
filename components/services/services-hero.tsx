import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OutlineFillButton } from "@/components/ui/outline-fill-button";

export async function ServicesHero() {
  const t = await getTranslations("services.hero");

  return (
    <section
      aria-labelledby="services-hero-title"
      className="flex flex-col gap-6 text-center sm:text-left"
    >
      <div className="space-y-3">
        <h1
          id="services-hero-title"
          className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        >
          {t("title")}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("subtitle")}
        </p>
      </div>

      <div className="flex justify-center sm:justify-start">
        <OutlineFillButton
          asChild
          className="h-8 px-4 text-[10px] sm:h-10 sm:px-6 sm:text-xs"
        >
          <Link href="/contact">{t("contact")}</Link>
        </OutlineFillButton>
      </div>
    </section>
  );
}
