import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/about/scroll-reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { OutlineFillButton } from "@/components/ui/outline-fill-button";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/project-types";

type FeaturedProjectsProps = {
  projects: Project[];
};

export async function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const t = await getTranslations("home.featured");
  const hasProjects = projects.length > 0;

  return (
    <section
      aria-labelledby="featured-projects-title"
      className="flex flex-col gap-8 pt-16 pb-16"
    >
      <ScrollReveal>
        <div className="flex flex-col gap-3 text-left">
          <h2
            id="featured-projects-title"
            className="font-heading text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {t("title")}
          </h2>
          {hasProjects ? (
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              {t("subtitle")}
            </p>
          ) : (
            <p className="text-base text-muted-foreground sm:text-lg">
              {t("empty")}
            </p>
          )}
        </div>
      </ScrollReveal>

      {hasProjects ? (
        <>
          <ScrollReveal delay={100}>
            <div
              className={cn(
                "flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-8",
                projects.length === 1 && "lg:items-stretch"
              )}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="w-full lg:w-[calc((100%-4rem)/3)]"
                >
                  <ProjectCard
                    project={{
                      id: project.id,
                      title: project.title,
                      description: project.description,
                      url: project.url,
                      imageSrc: project.imageSrc,
                      technologies: project.technologies,
                    }}
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="flex justify-center">
              <OutlineFillButton
                asChild
                className="h-8 px-4 text-[10px] sm:h-10 sm:px-6 sm:text-xs"
              >
                <Link href="/projects">{t("viewAll")}</Link>
              </OutlineFillButton>
            </div>
          </ScrollReveal>
        </>
      ) : null}
    </section>
  );
}
