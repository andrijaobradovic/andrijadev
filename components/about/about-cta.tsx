import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OutlineFillButton } from "@/components/ui/outline-fill-button";

export async function AboutCta() {
  const t = await getTranslations("about.cta");

  return (
    <section className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
      <OutlineFillButton asChild className="w-full sm:w-auto">
        <Link href="/projects">{t("projects")}</Link>
      </OutlineFillButton>
      <OutlineFillButton asChild className="w-full sm:w-auto">
        <Link href="/contact">{t("contact")}</Link>
      </OutlineFillButton>
    </section>
  );
}
