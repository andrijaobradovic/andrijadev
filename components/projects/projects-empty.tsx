import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OutlineFillButton } from "@/components/ui/outline-fill-button";

export async function ProjectsEmpty() {
  const t = await getTranslations("projects.empty");

  return (
    <section
      aria-labelledby="projects-empty-title"
      className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card/30 px-6 py-16 text-center"
    >
      <h2
        id="projects-empty-title"
        className="font-heading text-xl font-bold tracking-tight sm:text-2xl"
      >
        {t("title")}
      </h2>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
        {t("description")}
      </p>
      <OutlineFillButton
        asChild
        className="h-8 px-4 text-[10px] sm:h-10 sm:px-6 sm:text-xs"
      >
        <Link href="/contact">{t("contact")}</Link>
      </OutlineFillButton>
    </section>
  );
}
