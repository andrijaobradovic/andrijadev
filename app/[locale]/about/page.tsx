import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutBio } from "@/components/about/about-bio";
import { AboutCta } from "@/components/about/about-cta";
import { AboutHero } from "@/components/about/about-hero";
import { AboutProcess } from "@/components/about/about-process";
import { AboutTechStack } from "@/components/about/about-tech-stack";
import { PersonJsonLd } from "@/components/about/person-jsonld";
import { ScrollReveal } from "@/components/about/scroll-reveal";
import { createPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.metadata" });

  return createPageMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: t("description"),
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PersonJsonLd locale={locale} />
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col gap-16 sm:gap-20">
          <ScrollReveal>
            <AboutHero />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <AboutBio />
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <AboutTechStack />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <AboutProcess />
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <AboutCta />
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
