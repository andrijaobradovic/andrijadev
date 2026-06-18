import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { refreshProjectImages } from "@/lib/projects";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isAuthorized(request: Request): boolean {
  const header = request.headers.get("authorization");
  if (!header) {
    return false;
  }

  // Vercel Cron injects `Authorization: Bearer <CRON_SECRET>` automatically.
  // REFRESH_IMAGES_SECRET is used for manual/local invocations.
  const secrets = [
    process.env.CRON_SECRET,
    process.env.REFRESH_IMAGES_SECRET,
  ].filter((value): value is string => Boolean(value));

  return secrets.some((secret) => header === `Bearer ${secret}`);
}

async function handle(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const summary = await refreshProjectImages();

    revalidatePath("/", "layout");

    return NextResponse.json({
      ok: true,
      updated: summary.updated,
      total: summary.total,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to refresh images";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET is used by Vercel Cron; POST for manual/local invocations.
export async function GET(request: Request) {
  return handle(request);
}

export async function POST(request: Request) {
  return handle(request);
}
