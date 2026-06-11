import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OutlineFillButton } from "@/components/ui/outline-fill-button";
import type { ServiceConfig } from "@/lib/services";
import { SERVICE_ILLUSTRATIONS } from "./service-illustrations";

type ServiceDetailProps = {
  service: ServiceConfig;
};

export async function ServiceDetail({ service }: ServiceDetailProps) {
  const t = await getTranslations(`services.items.${service.id}`);
  const tCta = await getTranslations("services.detail");

  const Illustration = SERVICE_ILLUSTRATIONS[service.slug];

  return (
    <article className="flex flex-col gap-10 lg:gap-12">
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
        <div className="flex w-full max-w-[240px] shrink-0 justify-center lg:max-w-[280px]">
          <Illustration className="h-auto w-full max-w-[220px] sm:max-w-[260px]" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-5 text-center lg:text-left">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>{t("detail.p1")}</p>
            <p>{t("detail.p2")}</p>
            <p>{t("detail.p3")}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center lg:justify-end">
        <OutlineFillButton
          asChild
          className="h-8 w-full justify-center px-4 text-[10px] sm:h-10 sm:w-auto sm:px-6 sm:text-xs"
        >
          <Link href="/contact">{tCta("contact")}</Link>
        </OutlineFillButton>
      </div>
    </article>
  );
}
