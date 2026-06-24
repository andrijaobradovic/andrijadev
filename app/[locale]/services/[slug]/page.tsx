import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/about/scroll-reveal";
import { ServiceDetail } from "@/components/services/service-detail";
import { createPageMetadata } from "@/lib/seo";
import {
  SERVICE_SLUGS,
  getServiceBySlug,
  isServiceSlug,
} from "@/lib/services";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isServiceSlug(slug)) {
    return {};
  }

  const t = await getTranslations({
    locale,
    namespace: `services.items.${slug}`,
  });
  const tMeta = await getTranslations({
    locale,
    namespace: "services.detail.metadata",
  });

  return createPageMetadata({
    locale,
    path: `/services/${slug}`,
    title: tMeta("title", { service: t("title") }),
    description: t("short"),
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  return (
    <div className="mx-auto w-[80%] flex-1 px-4 py-16 sm:py-20 lg:py-24">
      <ScrollReveal>
        <ServiceDetail service={service} />
      </ScrollReveal>
    </div>
  );
}
