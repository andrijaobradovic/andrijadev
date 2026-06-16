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
  const resolvedIdsRef = useRef(
    new Set(
      projects
        .slice(0, PROJECTS_PAGE_SIZE_DESKTOP)
        .map((project) => project.id)
    )
  );

  const initialPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const [page, setPage] = useState(initialPage);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [imageMap, setImageMap] = useState<Record<string, string>>(() =>
    Object.fromEntries(projects.map((project) => [project.id, project.imageSrc]))
  );
  const [isResolving, setIsResolving] = useState(false);

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

  const resolveImagesForProjects = useCallback(async (batch: Project[]) => {
    const toResolve = batch.filter(
      (project) => !resolvedIdsRef.current.has(project.id)
    );

    if (toResolve.length === 0) {
      return;
    }

    setIsResolving(true);

    try {
      const response = await fetch("/api/projects/resolve-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projects: toResolve.map((project) => ({
            id: project.id,
            url: project.url,
            image_url: project.image_url,
          })),
        }),
      });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as {
        images: { id: string; imageSrc: string }[];
      };

      for (const item of data.images) {
        resolvedIdsRef.current.add(item.id);
      }

      setImageMap((current) => {
        const next = { ...current };
        for (const item of data.images) {
          next[item.id] = item.imageSrc;
        }
        return next;
      });
    } finally {
      setIsResolving(false);
    }
  }, []);

  useEffect(() => {
    const batch = projects.slice(0, pageSize);
    void resolveImagesForProjects(batch);
  }, [pageSize, projects, resolveImagesForProjects]);

  useEffect(() => {
    if (page <= 1) {
      return;
    }

    const start = (page - 1) * pageSize;
    const batch = projects.slice(start, start + pageSize);
    if (batch.length > 0) {
      void resolveImagesForProjects(batch);
    }
  }, [page, pageSize, projects, resolveImagesForProjects]);

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
    imageSrc: imageMap[project.id] ?? project.imageSrc,
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
            disabled={isResolving}
            onClick={handleLoadMore}
          >
            {t("loadMore")}
          </OutlineFillButton>
        </div>
      ) : null}
    </section>
  );
}
