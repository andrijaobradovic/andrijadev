import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";
import {
  PROJECT_PLACEHOLDER_IMAGE,
  resolveProjectImageUrl,
} from "@/lib/project-image";
import {
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

function mapProjectRow(row: ProjectRow, locale: string): Project {
  const isSerbian = locale === "sr";

  return {
    id: row.id,
    title: isSerbian ? row.title_sr : row.title_en,
    description: isSerbian ? row.description_sr : row.description_en,
    url: row.url,
    image_url: row.image_url,
    imageSrc: row.image_url ?? PROJECT_PLACEHOLDER_IMAGE,
    technologies: row.technologies ?? [],
    isFeatured: row.is_featured,
    featuredAt: row.featured_at,
    createdAt: row.created_at,
  };
}

export const getProjectRows = cache(async (): Promise<ProjectRow[]> => {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase.from("projects").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return sortProjectRows((data ?? []) as ProjectRow[]);
});

export async function getProjectCount(): Promise<number> {
  const rows = await getProjectRows();
  return rows.length;
}

export async function getProjectsForPage(locale: string): Promise<{
  projects: Project[];
  total: number;
}> {
  const rows = await getProjectRows();
  const projects = rows.map((row) => mapProjectRow(row, locale));

  return {
    projects,
    total: rows.length,
  };
}

export async function getFeaturedProjects(locale: string): Promise<Project[]> {
  const rows = await getProjectRows();
  const featuredRows = pickFeaturedProjectRows(rows);

  return featuredRows.map((row) => mapProjectRow(row, locale));
}

/**
 * Resolves each project's preview image (og:image with fallback to the stored
 * image, then placeholder) and persists it to the `image_url` column using the
 * service-role client. Intended to run from a trusted backfill/cron job, NOT on
 * every page render. Returns a per-project summary.
 */
export async function refreshProjectImages(): Promise<{
  updated: number;
  total: number;
  results: { id: string; image_url: string }[];
}> {
  const rows = await getProjectRows();
  const admin = createAdminClient();

  const results = await Promise.all(
    rows.map(async (row) => {
      const imageUrl = await resolveProjectImageUrl({
        url: row.url,
        image_url: row.image_url,
      });
      return { id: row.id, image_url: imageUrl };
    })
  );

  let updated = 0;
  for (const result of results) {
    const { error } = await admin
      .from("projects")
      .update({ image_url: result.image_url })
      .eq("id", result.id);

    if (!error) {
      updated += 1;
    }
  }

  return { updated, total: rows.length, results };
}
