import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import {
  PROJECT_PLACEHOLDER_IMAGE,
  resolveProjectImageUrl,
  resolveProjectImages,
} from "@/lib/project-image";
import {
  PROJECTS_PAGE_SIZE_DESKTOP,
  pickFeaturedProjectRows,
  sortProjectRows,
  type Project,
  type ProjectRow,
} from "@/lib/project-types";

export type { Project, ProjectRow } from "@/lib/project-types";
export {
  FEATURED_PROJECTS_LIMIT,
  PROJECTS_PAGE_SIZE_DESKTOP,
  PROJECTS_PAGE_SIZE_MOBILE,
  PROJECTS_REVALIDATE_SECONDS,
} from "@/lib/project-types";

async function getSupabaseClient() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

function mapProjectRow(
  row: ProjectRow,
  locale: string
): Omit<Project, "imageSrc"> {
  const isSerbian = locale === "sr";

  return {
    id: row.id,
    title: isSerbian ? row.title_sr : row.title_en,
    description: isSerbian ? row.description_sr : row.description_en,
    url: row.url,
    image_url: row.image_url,
    technologies: row.technologies ?? [],
    isFeatured: row.is_featured,
    featuredAt: row.featured_at,
    createdAt: row.created_at,
  };
}

export const getProjectRows = cache(async (): Promise<ProjectRow[]> => {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return sortProjectRows((data ?? []) as ProjectRow[]);
});

export async function getProjectCount(): Promise<number> {
  const rows = await getProjectRows();
  return rows.length;
}

export async function getProjectsForPage(
  locale: string,
  options?: { resolveImagesForCount?: number }
): Promise<{
  projects: Project[];
  total: number;
}> {
  const rows = await getProjectRows();
  const mapped = rows.map((row) => mapProjectRow(row, locale));
  const resolveCount =
    options?.resolveImagesForCount ?? PROJECTS_PAGE_SIZE_DESKTOP;

  const withImages = await resolveProjectImages(
    mapped.slice(0, resolveCount).map((project) => ({
      id: project.id,
      url: project.url,
      image_url: project.image_url,
    }))
  );

  const imageById = new Map(
    withImages.map((project) => [project.id, project.imageSrc])
  );

  const projects = mapped.map((project) => ({
    ...project,
    imageSrc: imageById.get(project.id) ?? PROJECT_PLACEHOLDER_IMAGE,
  }));

  return {
    projects,
    total: rows.length,
  };
}

export async function getFeaturedProjects(locale: string): Promise<Project[]> {
  const rows = await getProjectRows();
  const featuredRows = pickFeaturedProjectRows(rows);
  const mapped = featuredRows.map((row) => mapProjectRow(row, locale));

  const withImages = await resolveProjectImages(
    mapped.map((project) => ({
      id: project.id,
      url: project.url,
      image_url: project.image_url,
    }))
  );

  const imageById = new Map(
    withImages.map((project) => [project.id, project.imageSrc])
  );

  return mapped.map((project) => ({
    ...project,
    imageSrc: imageById.get(project.id) ?? PROJECT_PLACEHOLDER_IMAGE,
  }));
}

export async function resolveProjectsByIds(
  locale: string,
  ids: string[]
): Promise<Project[]> {
  const rows = await getProjectRows();
  const rowById = new Map(rows.map((row) => [row.id, row]));

  const selected = ids
    .map((id) => rowById.get(id))
    .filter((row): row is ProjectRow => Boolean(row));

  const mapped = selected.map((row) => mapProjectRow(row, locale));

  return Promise.all(
    mapped.map(async (project) => ({
      ...project,
      imageSrc: await resolveProjectImageUrl({
        url: project.url,
        image_url: project.image_url,
      }),
    }))
  );
}
