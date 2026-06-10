"use client";

import { useLocale, useTranslations } from "next-intl";
import { Switch } from "@/components/ui/switch";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

export function LanguageToggle() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");
  const tA11y = useTranslations("a11y");

  const isSerbian = locale === "sr";

  function handleChange(checked: boolean) {
    const nextLocale: Locale = checked ? "sr" : "en";
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label={tA11y("switchLanguage")}
    >
      <span
        className={cn(
          "text-xs font-semibold tracking-widest uppercase transition-colors",
          !isSerbian ? "text-primary" : "text-muted-foreground"
        )}
      >
        {t("en")}
      </span>
      <Switch
        checked={isSerbian}
        onCheckedChange={handleChange}
        aria-label={tA11y("switchLanguage")}
        className="data-unchecked:bg-muted data-unchecked:border-border"
      />
      <span
        className={cn(
          "text-xs font-semibold tracking-widest uppercase transition-colors",
          isSerbian ? "text-primary" : "text-muted-foreground"
        )}
      >
        {t("sr")}
      </span>
    </div>
  );
}
