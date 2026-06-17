import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/about/scroll-reveal";
import { OutlineFillButton } from "@/components/ui/outline-fill-button";

export async function HomeAboutPreview() {
  const t = await getTranslations("home.aboutPreview");

  return (
    <ScrollReveal>
      <section
        id="about-preview"
        aria-labelledby="home-about-title"
        className="w-full bg-background/60 backdrop-blur-md"
      >
        <div className="mx-auto flex w-[80%] max-w-7xl flex-col items-center gap-8 sm:flex-row sm:items-stretch sm:gap-10">
          <div className="relative mx-auto w-full max-w-sm shrink-0 sm:mx-0 sm:w-[40%] sm:max-w-none">
            <div className="relative aspect-[4/5] min-h-[280px] w-full overflow-hidden rounded-lg sm:aspect-auto sm:h-full sm:rounded-none">
              <Image
                src="/selfie.jpg"
                alt={t("imageAlt")}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 40vw"
                priority={false}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-black/30"
              />
            </div>
          </div>

          <div className="flex w-full flex-col justify-start gap-4 text-left sm:w-[60%]">
            <h2
              id="home-about-title"
              className="pt-[20px] font-heading text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {t("title")}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
            <div className="pb-[20px]">
              <OutlineFillButton
                asChild
                className="h-8 px-4 text-[10px] sm:h-10 sm:px-6 sm:text-xs"
              >
                <Link href="/about">{t("cta")}</Link>
              </OutlineFillButton>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
