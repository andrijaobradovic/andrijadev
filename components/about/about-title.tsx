import { getTranslations } from "next-intl/server";

export async function AboutTitle() {
  const t = await getTranslations("about.hero");

  return (
    <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
      {t("greeting")}{" "}
      <span className="font-mono">
        <span className="text-white">&lt;/</span>
        <span className="text-primary">{t("name")}</span>
        <span className="text-white">&gt;</span>
      </span>
    </h1>
  );
}
