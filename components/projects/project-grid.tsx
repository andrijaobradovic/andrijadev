"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { OutlineFillButton } from "@/components/ui/outline-fill-button";
import {
  PROJECTS_PAGE_SIZE_DESKTOP,
  PROJECTS_PAGE_SIZE_MOBILE,
  type Project,
} from "@/lib/project-types";
import { ProjectCard, type ProjectCardData } from "./project-card";

type ProjectGridProps = {
  projects: Project[];
};

function usePageSize() {
  const [pageSize, setPageSize] = useState(PROJECTS_PAGE_SIZE_DESKTOP);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => {
      setPageSize(
        media.matches
          ? PROJECTS_PAGE_SIZE_DESKTOP
          : PROJECTS_PAGE_SIZE_MOBILE
      );
    };

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return pageSize;
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const t = useTranslations("projects.grid");
  const searchParams = useSearchParams();
  const pageSize = usePageSize();
  const gridRef = useRef<HTMLDivElement>(null);

  const initialPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const [page, setPage] = useState(initialPage);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const visibleCount = page * pageSize;
  const visibleProjects = useMemo(
    () => projects.slice(0, visibleCount),
    [projects, visibleCount]
  );
  const hasMore = visibleCount < projects.length;

  const syncUrl = useCallback((nextPage: number) => {
    const url = new URL(window.location.href);
    if (nextPage <= 1) {
      url.searchParams.delete("page");
    } else {
      url.searchParams.set("page", String(nextPage));
    }
    window.history.replaceState(null, "", url.toString());
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!gridRef.current?.contains(event.target as Node)) {
        setExpandedId(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    syncUrl(nextPage);
  };

  const handleToggle = (projectId: string) => {
    setExpandedId((current) => (current === projectId ? null : projectId));
  };

  const cardData = (project: Project): ProjectCardData => ({
    id: project.id,
    title: project.title,
    description: project.description,
    url: project.url,
    imageSrc: project.imageSrc,
    technologies: project.technologies,
  });

  return (
    <section aria-label={t("heading")}>
      <div
        ref={gridRef}
        className="grid grid-cols-1 justify-items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={cardData(project)}
            isExpanded={expandedId === project.id}
            onToggle={() => handleToggle(project.id)}
          />
        ))}
      </div>

      {hasMore ? (
        <div className="mt-10 flex justify-center">
          <OutlineFillButton
            type="button"
            className="h-8 px-4 text-[10px] sm:h-10 sm:px-6 sm:text-xs"
            onClick={handleLoadMore}
          >
            {t("loadMore")}
          </OutlineFillButton>
        </div>
      ) : null}
    </section>
  );
}
