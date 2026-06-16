import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ScrollReveal } from "@/components/about/scroll-reveal";
import { ProjectGrid } from "@/components/projects/project-grid";
import { ProjectGridSkeleton } from "@/components/projects/project-grid-skeleton";
import { ProjectsCta } from "@/components/projects/projects-cta";
import { ProjectsEmpty } from "@/components/projects/projects-empty";
import { ProjectsHero } from "@/components/projects/projects-hero";
import { getProjectsForPage } from "@/lib/projects";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { projects, total } = await getProjectsForPage(locale, {
    resolveImagesForCount: 6,
  });

  return (
    <div className="mx-auto w-[80%] flex-1 px-4 py-16 sm:py-20 lg:py-24">
      <div className="flex flex-col gap-16 sm:gap-20">
        <ScrollReveal>
          <ProjectsHero />
        </ScrollReveal>

        {total === 0 ? (
          <ScrollReveal delay={100}>
            <ProjectsEmpty />
          </ScrollReveal>
        ) : (
          <ScrollReveal delay={100}>
            <Suspense fallback={<ProjectGridSkeleton count={6} />}>
              <ProjectGrid projects={projects} />
            </Suspense>
          </ScrollReveal>
        )}

        <ScrollReveal delay={200}>
          <ProjectsCta />
        </ScrollReveal>
      </div>
    </div>
  );
}
