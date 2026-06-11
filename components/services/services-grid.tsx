"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { ServiceId, ServiceSlug } from "@/lib/services";
import { ServiceCard } from "./service-card";

const AUTOPLAY_MS = 5000;
const PAUSE_MS = 10000;

type ServicesGridProps = {
  items: {
    id: ServiceId;
    slug: ServiceSlug;
    title: string;
    description: string;
  }[];
};

export function ServicesGrid({ items }: ServicesGridProps) {
  const t = useTranslations("services.grid");
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const pauseUntilRef = useRef(0);

  const pauseAutoplay = useCallback(() => {
    pauseUntilRef.current = Date.now() + PAUSE_MS;
  }, []);

  const onSelect = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setSelectedIndex(carouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;

      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, AUTOPLAY_MS);

    return () => window.clearInterval(interval);
  }, [api]);

  return (
    <section aria-labelledby="services-grid-heading">
      <h2 id="services-grid-heading" className="sr-only">
        {t("heading")}
      </h2>

      <div className="hidden gap-6 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
        {items.map((item) => (
          <ServiceCard
            key={item.id}
            id={item.id}
            slug={item.slug}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>

      <div className="md:hidden">
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          aria-label={t("carouselLabel")}
          onPointerDown={pauseAutoplay}
        >
          <CarouselContent className="-ml-3">
            {items.map((item) => (
              <CarouselItem key={item.id} className="basis-[85%] pl-3">
                <ServiceCard
                  id={item.id}
                  slug={item.slug}
                  title={item.title}
                  description={item.description}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div
          className="mt-4 flex items-center justify-center gap-2"
          role="tablist"
          aria-label={t("dotsLabel")}
        >
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selectedIndex === index}
              aria-label={t("dotLabel", { index: index + 1 })}
              onClick={() => {
                pauseAutoplay();
                api?.scrollTo(index);
              }}
              className={cn(
                "size-2.5 rounded-full transition-colors",
                selectedIndex === index
                  ? "bg-primary"
                  : "bg-muted-foreground/35 hover:bg-muted-foreground/55"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
