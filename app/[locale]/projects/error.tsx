"use client";

import { useTranslations } from "next-intl";
import { OutlineFillButton } from "@/components/ui/outline-fill-button";

type ProjectsErrorProps = {
  reset: () => void;
};

export default function ProjectsError({ reset }: ProjectsErrorProps) {
  const t = useTranslations("projects.error");

  return (
    <div className="mx-auto flex w-[80%] flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <h2 className="font-heading text-2xl font-bold tracking-tight">
        {t("title")}
      </h2>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
        {t("description")}
      </p>
      <OutlineFillButton
        type="button"
        className="h-8 px-4 text-[10px] sm:h-10 sm:px-6 sm:text-xs"
        onClick={() => reset()}
      >
        {t("retry")}
      </OutlineFillButton>
    </div>
  );
}
