import { getTranslations, setRequestLocale } from "next-intl/server";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { getFeaturedProjects } from "@/lib/projects";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  let featuredProjects: Awaited<ReturnType<typeof getFeaturedProjects>> = [];
  try {
    featuredProjects = await getFeaturedProjects(locale);
  } catch {
    featuredProjects = [];
  }

  return (
    <>
      <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </section>

      {featuredProjects.length > 0 ? (
        <section className="mx-auto w-[80%] px-4 pb-24">
          <FeaturedProjects projects={featuredProjects} />
        </section>
      ) : null}
    </>
  );
}
