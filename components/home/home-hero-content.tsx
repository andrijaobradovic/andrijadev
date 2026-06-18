"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RiArrowDownSLine } from "@remixicon/react";
import { Link } from "@/i18n/navigation";
import { OutlineFillButton } from "@/components/ui/outline-fill-button";
import { cn } from "@/lib/utils";

type HomeHeroContentProps = {
  titleAndrija: string;
  titleDev: string;
  subtitle: string;
  description: string;
  contactLabel: string;
  experienceValue: string;
  experienceLabel: string;
  projectsValue: number | null;
  projectsLabel: string;
  scrollToAboutLabel: string;
};

export function HomeHeroContent({
  titleAndrija,
  titleDev,
  subtitle,
  description,
  contactLabel,
  experienceValue,
  experienceLabel,
  projectsValue,
  projectsLabel,
  scrollToAboutLabel,
}: HomeHeroContentProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [showChevron, setShowChevron] = useState(true);
  const [chevronHiddenByScroll, setChevronHiddenByScroll] = useState(false);

  const updateChevronVisibility = useCallback(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const fitsWithoutScroll = hero.scrollHeight <= window.innerHeight + 1;

    if (isMobile && !fitsWithoutScroll) {
      setShowChevron(false);
      return;
    }

    setShowChevron(!chevronHiddenByScroll);
  }, [chevronHiddenByScroll]);

  useEffect(() => {
    updateChevronVisibility();
    window.addEventListener("resize", updateChevronVisibility);
    return () => window.removeEventListener("resize", updateChevronVisibility);
  }, [updateChevronVisibility]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setChevronHiddenByScroll(true);
        setShowChevron(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToAbout = () => {
    const about = document.getElementById("about-preview");
    if (!about) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    about.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const showProjectsStat = projectsValue !== null && projectsValue > 0;

  return (
    <section
      ref={heroRef}
      aria-labelledby="home-hero-title"
      className="relative flex min-h-screen flex-col text-center"
    >
      <div className="hero-fade-in flex flex-1 flex-col items-center justify-center">
        <div
          className="hero-neon-line-wrap mb-8 h-[3px] w-1/2 min-w-[8rem] shrink-0"
          aria-hidden
        >
          <div className="hero-neon-line-glow" />
          <div className="hero-neon-line-bar" />
        </div>

        <h1
          id="home-hero-title"
          className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        >
          {titleAndrija}
          <span className="text-primary">{titleDev}</span>
        </h1>

        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          {subtitle}
        </p>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>

        <div className="mt-8">
          <OutlineFillButton
            asChild
            className="h-8 px-4 text-[10px] sm:h-10 sm:px-6 sm:text-xs"
          >
            <Link href="/contact">{contactLabel}</Link>
          </OutlineFillButton>
        </div>
      </div>

      <div className="pb-12 sm:pb-16">
        <div className="relative flex w-full items-center justify-center">
          <div
            className={cn(
              "flex items-center",
              showProjectsStat
                ? "flex-col gap-6 sm:flex-row sm:gap-0"
                : "flex-col"
            )}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                {experienceValue}
              </span>
              <span className="text-sm text-muted-foreground sm:text-base">
                {experienceLabel}
              </span>
            </div>

            {showProjectsStat ? (
              <>
                <div
                  aria-hidden
                  className="hidden h-10 w-px bg-primary/40 sm:mx-10 sm:block"
                />
                <div className="flex flex-col items-center gap-1">
                  <span className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                    {projectsValue}
                  </span>
                  <span className="text-sm text-muted-foreground sm:text-base">
                    {projectsLabel}
                  </span>
                </div>
              </>
            ) : null}
          </div>

          {showChevron ? (
            <button
              type="button"
              onClick={scrollToAbout}
              aria-label={scrollToAboutLabel}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-primary transition-opacity hover:opacity-100"
            >
              <span className="hero-scroll-chevron motion-reduce:transform-none block">
                <RiArrowDownSLine className="size-8" aria-hidden />
              </span>
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
