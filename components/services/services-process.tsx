import { getTranslations } from "next-intl/server";
import { ProcessSlider } from "@/components/about/process-slider";
import { PROCESS_STEPS } from "@/components/about/process-illustrations";

export async function ServicesProcess() {
  const tTitle = await getTranslations("services.process");
  const tSteps = await getTranslations("about.process");

  const steps = PROCESS_STEPS.map((id, index) => ({
    id,
    index,
    title: tSteps(`steps.${id}.title`),
    description: tSteps(`steps.${id}.description`),
  }));

  return (
    <section aria-labelledby="services-process-title">
      <h2
        id="services-process-title"
        className="font-heading mb-6 text-center text-2xl font-bold tracking-tight sm:text-3xl"
      >
        {tTitle("title")}
      </h2>
      <ProcessSlider steps={steps} />
    </section>
  );
}
