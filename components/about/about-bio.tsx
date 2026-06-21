import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OutlineFillButton } from "@/components/ui/outline-fill-button";

export async function AboutBio() {
  const t = await getTranslations("about.bio");
  const tNav = await getTranslations("nav");

  return (
    <section className="space-y-4 text-center sm:text-left">
      <p className="text-base leading-relaxed text-muted-foreground">
        {t("paragraph1")}
      </p>
      <p className="text-base leading-relaxed text-muted-foreground">
        {t.rich("paragraph2", {
          brand: (chunks) => (
            <span className="text-primary">{chunks}</span>
          ),
        })}
      </p>
      <p className="text-base leading-relaxed text-muted-foreground">
        {t("paragraph3")}
      </p>
      <OutlineFillButton asChild className="sm:w-auto">
        <Link href="/services">{tNav("services")}</Link>
      </OutlineFillButton>
    </section>
  );
}
