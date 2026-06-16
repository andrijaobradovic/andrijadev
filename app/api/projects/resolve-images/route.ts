import { NextResponse } from "next/server";
import { resolveProjectImageUrl } from "@/lib/project-image";

export const revalidate = 3600;

type ResolveImagesBody = {
  projects: {
    id: string;
    url: string;
    image_url: string | null;
  }[];
};

export async function POST(request: Request) {
  let body: ResolveImagesBody;

  try {
    body = (await request.json()) as ResolveImagesBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!Array.isArray(body.projects) || body.projects.length === 0) {
    return NextResponse.json({ images: [] });
  }

  const images = await Promise.all(
    body.projects.map(async (project) => ({
      id: project.id,
      imageSrc: await resolveProjectImageUrl(project),
    }))
  );

  return NextResponse.json({ images });
}
