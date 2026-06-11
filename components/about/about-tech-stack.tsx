import { getTranslations } from "next-intl/server";
import { TechMarquee } from "./tech-marquee";

export async function AboutTechStack() {
  const t = await getTranslations("about.tech");

  return (
    <section>
      <h2 className="font-heading mb-6 text-center text-2xl font-bold tracking-tight sm:text-3xl">
        {t("title")}
      </h2>
      <TechMarquee />
    </section>
  );
}
