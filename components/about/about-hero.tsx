import { getTranslations } from "next-intl/server";
import { AboutAvatar } from "./about-avatar";
import { AboutTitle } from "./about-title";

export async function AboutHero() {
  const t = await getTranslations("about.hero");

  return (
    <section className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-10">
      <AboutAvatar />
      <div className="flex flex-col gap-4 text-center sm:text-left">
        <AboutTitle />
        <div className="space-y-2 text-base leading-relaxed text-muted-foreground">
          <p>{t("subtitle1")}</p>
          <p>{t("subtitle2")}</p>
        </div>
      </div>
    </section>
  );
}
