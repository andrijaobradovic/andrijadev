export type ProjectRow = {
  id: string;
  title_en: string;
  title_sr: string;
  description_en: string | null;
  description_sr: string | null;
  url: string;
  image_url: string | null;
  technologies: string[];
  is_featured: boolean;
  featured_at: string | null;
  created_at: string;
};

export type Project = {
  id: string;
  title: string;
  description: string | null;
  url: string;
  image_url: string | null;
  imageSrc: string;
  technologies: string[];
  isFeatured: boolean;
  featuredAt: string | null;
  createdAt: string;
};

export const PROJECTS_REVALIDATE_SECONDS = 3600;
export const PROJECTS_PAGE_SIZE_DESKTOP = 6;
export const PROJECTS_PAGE_SIZE_MOBILE = 3;
export const FEATURED_PROJECTS_LIMIT = 3;

export function sortProjectRows(rows: ProjectRow[]): ProjectRow[] {
  const featured = rows
    .filter((row) => row.is_featured)
    .sort((a, b) => {
      const aTime = a.featured_at ? new Date(a.featured_at).getTime() : 0;
      const bTime = b.featured_at ? new Date(b.featured_at).getTime() : 0;
      return bTime - aTime;
    });

  const nonFeatured = rows
    .filter((row) => !row.is_featured)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return [...featured, ...nonFeatured];
}

export function pickFeaturedProjectRows(rows: ProjectRow[]): ProjectRow[] {
  const sorted = sortProjectRows(rows);
  const featured = sorted.filter((row) => row.is_featured);
  const nonFeatured = sorted.filter((row) => !row.is_featured);

  if (featured.length >= FEATURED_PROJECTS_LIMIT) {
    return featured.slice(0, FEATURED_PROJECTS_LIMIT);
  }

  if (featured.length === 0) {
    return sorted.slice(0, FEATURED_PROJECTS_LIMIT);
  }

  const filler = nonFeatured.slice(0, FEATURED_PROJECTS_LIMIT - featured.length);
  return [...featured, ...filler].slice(0, FEATURED_PROJECTS_LIMIT);
}
