import { getTranslations } from "next-intl/server";
import { RiRocketLine } from "@remixicon/react";

export async function ProjectsHero() {
  const t = await getTranslations("projects.hero");

  return (
    <section
      aria-labelledby="projects-hero-title"
      className="flex flex-col gap-6 text-center sm:text-left"
    >
      <div className="space-y-3">
        <h1
          id="projects-hero-title"
          className="flex items-center justify-center gap-3 font-heading text-3xl font-bold tracking-tight sm:justify-start sm:text-4xl lg:text-5xl"
        >
          {t("title")}
          <RiRocketLine
            className="size-8 shrink-0 text-primary sm:size-9 lg:size-10"
            aria-hidden
          />
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("subtitle")}
        </p>
      </div>
    </section>
  );
}
