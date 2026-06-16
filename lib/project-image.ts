const OG_FETCH_TIMEOUT_MS = 3000;
const IMAGE_CHECK_TIMEOUT_MS = 2500;
export const PROJECT_PLACEHOLDER_IMAGE = "/project-placeholder.png";

function resolveAbsoluteUrl(candidate: string, baseUrl: string): string {
  try {
    return new URL(candidate, baseUrl).href;
  } catch {
    return candidate;
  }
}

/** Keep og:image on the project URL origin (Supabase `url`), not metadataBase/canonical host. */
function alignOgImageToProjectUrl(ogUrl: string, pageUrl: string): string {
  try {
    const og = new URL(ogUrl);
    const page = new URL(pageUrl);

    if (og.hostname === page.hostname) {
      return og.href;
    }

    return new URL(`${og.pathname}${og.search}`, page.origin).href;
  } catch {
    return ogUrl;
  }
}

function extractOgImage(html: string, pageUrl: string): string | null {
  const patterns = [
    /<meta[^>]+property=["']og:image(?::url)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::url)?["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      const resolved = resolveAbsoluteUrl(match[1], pageUrl);
      return alignOgImageToProjectUrl(resolved, pageUrl);
    }
  }

  return null;
}

async function isImageReachable(imageUrl: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), IMAGE_CHECK_TIMEOUT_MS);

    const response = await fetch(imageUrl, {
      method: "HEAD",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AndrijaDev/1.0; +https://andrijadev.com)",
      },
      next: { revalidate: 3600 },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return false;
    }

    const contentType = response.headers.get("content-type") ?? "";
    return contentType.startsWith("image/");
  } catch {
    return false;
  }
}

export async function fetchOgImage(pageUrl: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), OG_FETCH_TIMEOUT_MS);

    const response = await fetch(pageUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AndrijaDev/1.0; +https://andrijadev.com)",
        Accept: "text/html",
      },
      next: { revalidate: 3600 },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return null;
    }

    const html = await response.text();
    return extractOgImage(html, pageUrl);
  } catch {
    return null;
  }
}

type ProjectImageSource = {
  url: string;
  image_url: string | null;
};

export async function resolveProjectImageUrl(
  project: ProjectImageSource
): Promise<string> {
  const ogImage = await fetchOgImage(project.url);

  if (ogImage && (await isImageReachable(ogImage))) {
    return ogImage;
  }

  if (project.image_url) {
    return project.image_url;
  }

  return PROJECT_PLACEHOLDER_IMAGE;
}

export async function resolveProjectImages<T extends ProjectImageSource & { id: string }>(
  projects: T[]
): Promise<(T & { imageSrc: string })[]> {
  const resolved = await Promise.all(
    projects.map(async (project) => ({
      ...project,
      imageSrc: await resolveProjectImageUrl(project),
    }))
  );

  return resolved;
}
