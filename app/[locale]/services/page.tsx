import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ScrollReveal } from "@/components/about/scroll-reveal";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import { ServicesListJsonLd } from "@/components/seo/services-list-jsonld";
import { ServicesCta } from "@/components/services/services-cta";
import { ServicesFaq } from "@/components/services/services-faq";
import { ServicesGrid } from "@/components/services/services-grid";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesProcess } from "@/components/services/services-process";
import { createPageMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.metadata" });

  return createPageMetadata({
    locale,
    path: "/services",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("services.items");
  const tFaq = await getTranslations("services.faq");

  const items = SERVICES.map((service) => ({
    id: service.id,
    slug: service.slug,
    title: t(`${service.id}.title`),
    description: t(`${service.id}.short`),
  }));

  const faqItems = ["cost", "timeline", "mobile", "content", "support"].map(
    (key) => ({
      question: tFaq(`items.${key}.question`),
      answer: tFaq(`items.${key}.answer`),
    })
  );

  return (
    <>
      <ServicesListJsonLd
        locale={locale}
        items={items.map(({ slug, title }) => ({ slug, title }))}
      />
      <FaqJsonLd items={faqItems} />
      <div className="mx-auto w-[80%] flex-1 px-4 py-16 sm:py-20 lg:py-24">
      <div className="flex flex-col gap-16 sm:gap-20">
        <ScrollReveal>
          <ServicesHero />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <ServicesGrid items={items} />
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <ServicesProcess />
        </ScrollReveal>

        <ScrollReveal delay={175}>
          <ServicesFaq title={tFaq("title")} items={faqItems} />
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <ServicesCta />
        </ScrollReveal>
      </div>
    </div>
    </>
  );
}
