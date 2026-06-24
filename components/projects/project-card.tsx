"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { RiExternalLinkLine } from "@remixicon/react";
import { OutlineFillButton } from "@/components/ui/outline-fill-button";
import { ProjectTechMarquee } from "@/components/projects/project-tech-marquee";
import { PROJECT_PLACEHOLDER_IMAGE } from "@/lib/project-image";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/project-types";

export type ProjectCardData = Pick<
  Project,
  "id" | "title" | "description" | "url" | "imageSrc" | "technologies"
>;

type ProjectCardProps = {
  project: ProjectCardData;
  isExpanded?: boolean;
  onToggle?: () => void;
  className?: string;
};

function isLocalImage(src: string) {
  return src.startsWith("/");
}

const panelOpen =
  "group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-within/card:translate-y-0 group-focus-within/card:opacity-100 motion-reduce:group-hover/card:translate-y-0 motion-reduce:group-focus-within/card:translate-y-0";

export function ProjectCard({
  project,
  isExpanded,
  onToggle,
  className,
}: ProjectCardProps) {
  const t = useTranslations("projects.card");
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imageSrc =
    failedSrc === project.imageSrc
      ? PROJECT_PLACEHOLDER_IMAGE
      : project.imageSrc;
  const [isTouch, setIsTouch] = useState(false);
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [marqueeActive, setMarqueeActive] = useState(false);

  const isControlled = isExpanded !== undefined && onToggle !== undefined;
  const isActive = isTouch && (isControlled ? isExpanded : internalExpanded);

  useEffect(() => {
    const media = window.matchMedia("(hover: none)");
    const update = () => setIsTouch(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const handleToggle = () => {
    if (!isTouch) {
      return;
    }

    if (isControlled) {
      onToggle?.();
      return;
    }

    setInternalExpanded((current) => !current);
  };

  return (
    <article
      className={cn(
        "group/card relative flex cursor-default flex-col overflow-hidden rounded-lg border border-[#120e1e] transition-all duration-300",
        "hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_20px_rgba(149,247,2,0.12)]",
        "focus-within:-translate-y-1 focus-within:border-primary focus-within:shadow-[0_0_20px_rgba(149,247,2,0.12)]",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0",
        isActive &&
          "-translate-y-1 border-primary shadow-[0_0_20px_rgba(149,247,2,0.12)]",
        className
      )}
      onClick={handleToggle}
      onMouseEnter={() => setMarqueeActive(true)}
      onMouseLeave={() => setMarqueeActive(false)}
      onFocusCapture={() => setMarqueeActive(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setMarqueeActive(false);
        }
      }}
      data-expanded={isActive ? "true" : "false"}
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
        <Image
          src={imageSrc}
          alt={t("imageAlt", { title: project.title })}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized={!isLocalImage(imageSrc)}
          className="object-cover"
          onError={() => {
            if (failedSrc !== project.imageSrc) {
              setFailedSrc(project.imageSrc);
            }
          }}
        />

        <div
          className={cn(
            "absolute inset-0 flex translate-y-full flex-col justify-end bg-[#0a0810]/92 opacity-0 backdrop-blur-[2px] transition-all duration-300 ease-out",
            panelOpen,
            isActive && "translate-y-0 opacity-100"
          )}
        >
          <div className="flex max-h-full min-h-0 flex-col gap-3 p-4">
            {project.description ? (
              <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                <p className="text-sm leading-relaxed text-foreground/90">
                  {project.description}
                </p>
              </div>
            ) : null}

            {project.technologies.length > 0 ? (
              <ProjectTechMarquee
                technologies={project.technologies}
                active={marqueeActive || isActive}
                className="-mx-4"
              />
            ) : null}

            <OutlineFillButton
              asChild
              className="h-8 w-full shrink-0 justify-center px-4 text-[10px] sm:h-9 sm:text-xs"
              onClick={(event) => event.stopPropagation()}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("visitAriaLabel", { title: project.title })}
              >
                {t("visit")}
                <RiExternalLinkLine className="size-3" aria-hidden />
              </a>
            </OutlineFillButton>
          </div>
        </div>
      </div>

      <h3 className="relative z-10 shrink-0 bg-card px-4 py-3 font-heading text-base font-semibold tracking-tight text-card-foreground sm:text-lg">
        {project.title}
      </h3>
    </article>
  );
}
