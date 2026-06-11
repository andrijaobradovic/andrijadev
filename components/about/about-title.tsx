import { getTranslations } from "next-intl/server";

export async function AboutTitle() {
  const t = await getTranslations("about.hero");

  return (
    <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
      {t("greeting")}{" "}
      <span className="font-mono">
        <span className="text-primary">&lt;/</span>
        {t("name")}
        <span className="text-primary">&gt;</span>
      </span>
    </h1>
  );
}
