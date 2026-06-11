"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ProcessStepCard, type ProcessStepData } from "./process-step-card";

const AUTOPLAY_MS = 5000;
const PAUSE_MS = 10000;
const MOBILE_QUERY = "(max-width: 639px)";

type ChevronProps = {
  className?: string;
  direction: "left" | "right";
};

function DoubleChevron({ className, direction }: ChevronProps) {
  const isRight = direction === "right";

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d={isRight ? "M8 5 L15 12 L8 19" : "M16 5 L9 12 L16 19"}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={isRight ? "M13 5 L20 12 L13 19" : "M11 5 L4 12 L11 19"}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ProcessSliderProps = {
  steps: ProcessStepData[];
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function getMaxSnapIndex(isMobile: boolean, total: number) {
  return isMobile ? total - 1 : total - 2;
}

function getActiveDotIndices(
  selectedIndex: number,
  isMobile: boolean,
  total: number
) {
  if (isMobile) {
    return [selectedIndex];
  }

  return [selectedIndex, selectedIndex + 1].filter((index) => index < total);
}

export function ProcessSlider({ steps }: ProcessSliderProps) {
  const isMobile = useIsMobile();
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const directionRef = useRef(1);
  const pauseUntilRef = useRef(0);

  const maxSnapIndex = getMaxSnapIndex(isMobile, steps.length);
  const activeDots = getActiveDotIndices(selectedIndex, isMobile, steps.length);

  const pauseAutoplay = useCallback(() => {
    pauseUntilRef.current = Date.now() + PAUSE_MS;
  }, []);

  const onSelect = useCallback(
    (carouselApi: CarouselApi) => {
      if (!carouselApi) return;
      const index = carouselApi.selectedScrollSnap();
      setSelectedIndex(index);
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());

      const max = getMaxSnapIndex(isMobile, steps.length);
      if (index >= max) directionRef.current = -1;
      if (index <= 0) directionRef.current = 1;
    },
    [isMobile, steps.length]
  );

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
    api.reInit();
    onSelect(api);
  }, [api, isMobile, onSelect]);

  useEffect(() => {
    if (!api) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;

      const index = api.selectedScrollSnap();
      const max = getMaxSnapIndex(isMobile, steps.length);

      if (directionRef.current === 1 && index >= max) {
        directionRef.current = -1;
      } else if (directionRef.current === -1 && index <= 0) {
        directionRef.current = 1;
      }

      if (directionRef.current === 1) {
        api.scrollNext();
      } else {
        api.scrollPrev();
      }
    }, AUTOPLAY_MS);

    return () => window.clearInterval(interval);
  }, [api, isMobile, steps.length]);

  const handlePrev = () => {
    pauseAutoplay();
    api?.scrollPrev();
  };

  const handleNext = () => {
    pauseAutoplay();
    api?.scrollNext();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={!canScrollPrev}
          aria-label="Prethodni slajd"
          className={cn(
            "hidden shrink-0 p-1 text-primary transition-opacity sm:inline-flex",
            "hover:opacity-80 disabled:pointer-events-none disabled:opacity-25"
          )}
        >
          <DoubleChevron direction="left" className="size-7" />
        </button>

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            containScroll: "trimSnaps",
            dragFree: false,
          }}
          className="min-w-0 flex-1"
        >
          <CarouselContent>
            {steps.map((step) => (
              <CarouselItem
                key={step.id}
                className="basis-full sm:basis-1/2"
              >
                <div className="h-full">
                  <ProcessStepCard step={step} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <button
          type="button"
          onClick={handleNext}
          disabled={!canScrollNext}
          aria-label="Sledeći slajd"
          className={cn(
            "hidden shrink-0 p-1 text-primary transition-opacity sm:inline-flex",
            "hover:opacity-80 disabled:pointer-events-none disabled:opacity-25"
          )}
        >
          <DoubleChevron direction="right" className="size-7" />
        </button>
      </div>

      <div
        className="flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Koraci procesa"
      >
        {steps.map((step, index) => {
          const isActive = activeDots.includes(index);

          return (
            <button
              key={step.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Korak ${index + 1}`}
              onClick={() => {
                pauseAutoplay();
                const snapIndex = isMobile
                  ? index
                  : Math.min(index, maxSnapIndex);
                api?.scrollTo(snapIndex);
              }}
              className={cn(
                "size-2.5 rounded-full transition-colors",
                isActive
                  ? "bg-primary"
                  : "bg-muted-foreground/35 hover:bg-muted-foreground/55"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
