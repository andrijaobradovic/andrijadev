import { setRequestLocale } from "next-intl/server";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { HomeAboutPreview } from "@/components/home/home-about-preview";
import { HomeHero } from "@/components/home/home-hero";
import { HomeTechStack } from "@/components/home/home-tech-stack";
import { OrganizationWebsiteJsonLd } from "@/components/seo/organization-website-jsonld";
import { getFeaturedProjects } from "@/lib/projects";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  let featuredProjects: Awaited<ReturnType<typeof getFeaturedProjects>> = [];
  try {
    featuredProjects = await getFeaturedProjects(locale);
  } catch {
    featuredProjects = [];
  }

  return (
    <>
      <OrganizationWebsiteJsonLd locale={locale} />
      <div className="mx-auto w-[80%] max-w-7xl">
        <HomeHero />
      </div>

      <HomeAboutPreview />

      <div className="mx-auto w-[80%] max-w-7xl">
        <HomeTechStack />
        <FeaturedProjects projects={featuredProjects} />
      </div>
    </>
  );
}
