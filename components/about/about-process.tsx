import { getTranslations } from "next-intl/server";
import { ProcessSlider } from "./process-slider";
import { PROCESS_STEPS } from "./process-illustrations";

export async function AboutProcess() {
  const t = await getTranslations("about.process");

  const steps = PROCESS_STEPS.map((id, index) => ({
    id,
    index,
    title: t(`steps.${id}.title`),
    description: t(`steps.${id}.description`),
  }));

  return (
    <section>
      <h2 className="font-heading mb-6 text-center text-2xl font-bold tracking-tight sm:text-3xl">
        {t("title")}
      </h2>
      <ProcessSlider steps={steps} />
    </section>
  );
}
