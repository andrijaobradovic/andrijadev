"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TECH_STACK } from "@/components/about/tech-icons";
import { cn } from "@/lib/utils";

const LOOP_DURATION_MS = 10_000;

const TECH_ALIASES: Record<string, (typeof TECH_STACK)[number]["id"]> = {
  nextjs: "nextjs",
  next: "nextjs",
  react: "react",
  reactjs: "react",
  typescript: "typescript",
  ts: "typescript",
  tailwind: "tailwind",
  tailwindcss: "tailwind",
  supabase: "supabase",
  bootstrap: "bootstrap",
  git: "git",
  vercel: "vercel",
};

function normalizeTechName(name: string) {
  return name.toLowerCase().replace(/[\s.\-_]/g, "");
}

function getTechIcon(name: string) {
  const id = TECH_ALIASES[normalizeTechName(name)];
  if (!id) return null;
  return TECH_STACK.find((item) => item.id === id)?.Icon ?? null;
}

type ProjectTechMarqueeProps = {
  technologies: string[];
  active?: boolean;
  className?: string;
};

export function ProjectTechMarquee({
  technologies,
  active = true,
  className,
}: ProjectTechMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const loopStartRef = useRef<HTMLDivElement>(null);
  const loopEndRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);
  const [loopWidth, setLoopWidth] = useState(0);

  const items = technologies.filter(Boolean);
  const labelKey = items.join("|");
  const trackItems = items.length > 0 ? [...items, ...items] : [];

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    const width = loopWidthRef.current;
    if (!track || width <= 0) return;

    track.style.transform = `translate3d(${-width + offsetRef.current}px, 0, 0)`;
  }, []);

  useEffect(() => {
    loopWidthRef.current = loopWidth;
  }, [loopWidth]);

  useEffect(() => {
    const measure = () => {
      const start = loopStartRef.current;
      const end = loopEndRef.current;
      if (!start || !end) return;

      const width =
        end.getBoundingClientRect().left - start.getBoundingClientRect().left;
      if (width > 0) {
        loopWidthRef.current = width;
        setLoopWidth(width);
      }
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);

    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [labelKey]);

  useEffect(() => {
    offsetRef.current = 0;
    applyTransform();
  }, [loopWidth, applyTransform]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || loopWidth <= 0 || !active || items.length <= 1) {
      if (track && items.length <= 1) {
        track.style.transform = "translate3d(0, 0, 0)";
      }
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      track.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    let rafId = 0;
    let lastTime = performance.now();
    const speed = loopWidth / LOOP_DURATION_MS;

    const tick = (now: number) => {
      if (!active) return;

      const delta = now - lastTime;
      lastTime = now;

      offsetRef.current += delta * speed;
      if (offsetRef.current >= loopWidth) {
        offsetRef.current -= loopWidth;
      }

      applyTransform();
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [loopWidth, applyTransform, active, items.length]);

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <ul className="sr-only">
        {items.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <div
        className={cn(
          "tech-marquee pointer-events-none overflow-hidden py-1",
          className
        )}
      >
        <div
          ref={trackRef}
          className="tech-marquee-track flex w-max items-center gap-6"
        >
          {trackItems.map((tech, index) => {
            const Icon = getTechIcon(tech);

            return (
              <div
                key={`${tech}-${index}`}
                ref={
                  index === 0
                    ? loopStartRef
                    : index === items.length
                      ? loopEndRef
                      : undefined
                }
                className="flex shrink-0 items-center gap-1.5"
                aria-hidden={index >= items.length}
              >
                {Icon ? (
                  <Icon className="size-4 shrink-0 text-primary" />
                ) : null}
                <span className="whitespace-nowrap text-[10px] font-medium tracking-wide text-foreground/90">
                  {tech}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
