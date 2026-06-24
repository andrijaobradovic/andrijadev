import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { NotFoundContent } from "@/components/not-found-content";
import { getNoIndexRobots } from "@/lib/seo";

export const metadata: Metadata = {
  robots: getNoIndexRobots(),
};

export default async function RootNotFoundPage() {
  await getLocale();
  const t = await getTranslations("notFound");

  return (
    <NotFoundContent
      title={t("title")}
      description={t("description")}
      backLabel={t("backHome")}
    />
  );
}
