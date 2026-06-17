import { getTranslations } from "next-intl/server";
import { getProjectCount } from "@/lib/projects";
import { HomeHeroContent } from "./home-hero-content";

export async function HomeHero() {
  const t = await getTranslations("home.hero");

  let projectCount = 0;
  try {
    projectCount = await getProjectCount();
  } catch {
    projectCount = 0;
  }

  const showProjectsStat = projectCount > 0;

  return (
    <HomeHeroContent
      titleAndrija={t("titleAndrija")}
      titleDev={t("titleDev")}
      subtitle={t("subtitle")}
      description={t("description")}
      contactLabel={t("contact")}
      experienceValue={t("experienceValue")}
      experienceLabel={t("experienceLabel", { count: 1 })}
      projectsValue={showProjectsStat ? projectCount : null}
      projectsLabel={
        showProjectsStat
          ? t("projectsLabel", { count: projectCount })
          : ""
      }
      scrollToAboutLabel={t("scrollToAbout")}
    />
  );
}
