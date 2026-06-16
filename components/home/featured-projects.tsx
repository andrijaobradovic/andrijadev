import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/about/scroll-reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { OutlineFillButton } from "@/components/ui/outline-fill-button";
import type { Project } from "@/lib/project-types";

type FeaturedProjectsProps = {
  projects: Project[];
};

export async function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const t = await getTranslations("home.featured");

  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="featured-projects-title"
      className="flex flex-col gap-8"
    >
      <ScrollReveal>
        <div className="flex flex-col gap-3 text-center sm:text-left">
          <h2
            id="featured-projects-title"
            className="font-heading text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {t("title")}
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="grid grid-cols-1 justify-items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={{
                id: project.id,
                title: project.title,
                description: project.description,
                url: project.url,
                imageSrc: project.imageSrc,
                technologies: project.technologies,
              }}
            />
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={150}>
        <div className="flex justify-center sm:justify-start">
          <OutlineFillButton
            asChild
            className="h-8 px-4 text-[10px] sm:h-10 sm:px-6 sm:text-xs"
          >
            <Link href="/projects">{t("viewAll")}</Link>
          </OutlineFillButton>
        </div>
      </ScrollReveal>
    </section>
  );
}
