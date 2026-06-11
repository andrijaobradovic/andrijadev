import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OutlineFillButton } from "@/components/ui/outline-fill-button";

export async function ServicesCta() {
  const t = await getTranslations("services.cta");

  return (
    <section
      aria-labelledby="services-cta-title"
      className="flex flex-col items-center gap-4 sm:items-end"
    >
      <h2
        id="services-cta-title"
        className="font-heading text-xl font-bold tracking-tight sm:text-2xl"
      >
        {t("ready")}
      </h2>

      <div className="inline-flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <OutlineFillButton
          asChild
          className="h-8 w-full justify-center px-4 text-[10px] sm:h-10 sm:w-auto sm:px-6 sm:text-xs"
        >
          <Link href="/contact">{t("contact")}</Link>
        </OutlineFillButton>
        <OutlineFillButton
          asChild
          className="h-8 w-full justify-center px-4 text-[10px] sm:h-10 sm:w-auto sm:px-6 sm:text-xs"
        >
          <Link href="/projects">{t("projects")}</Link>
        </OutlineFillButton>
      </div>
    </section>
  );
}
