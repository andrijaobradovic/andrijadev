"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { TECH_STACK } from "./tech-icons";

const LOOP_DURATION_MS = 40_000;
const HOLD_AFTER_RELEASE_MS = 800;
const RAMP_DURATION_MS = 2_000;

type MarqueePhase = "auto" | "dragging" | "hold" | "ramp";

function normalizeOffset(offset: number, loopWidth: number) {
  if (loopWidth <= 0) return 0;
  let value = offset % loopWidth;
  if (value < 0) value += loopWidth;
  return value;
}

export function TechMarquee() {
  const t = useTranslations("about.tech");
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loopStartRef = useRef<HTMLDivElement>(null);
  const loopEndRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const phaseRef = useRef<MarqueePhase>("auto");
  const holdUntilRef = useRef(0);
  const rampStartRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const loopWidthRef = useRef(0);
  const [loopWidth, setLoopWidth] = useState(0);

  const items = TECH_STACK.map(({ id, Icon }) => ({
    id,
    Icon,
    label: t(`items.${id}`),
  }));

  const labelKey = items.map(({ label }) => label).join("|");
  const trackItems = [...items, ...items];

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
  }, [locale, labelKey]);

  useEffect(() => {
    offsetRef.current = 0;
    phaseRef.current = "auto";
    applyTransform();
  }, [loopWidth, applyTransform]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || loopWidth <= 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      track.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    let rafId = 0;
    let lastTime = performance.now();
    const baseSpeed = loopWidth / LOOP_DURATION_MS;

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;
      const phase = phaseRef.current;

      if (phase === "dragging") {
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (phase === "hold") {
        if (now >= holdUntilRef.current) {
          phaseRef.current = "ramp";
          rampStartRef.current = now;
        }
        rafId = requestAnimationFrame(tick);
        return;
      }

      let speed = baseSpeed;

      if (phase === "ramp") {
        const elapsed = now - rampStartRef.current;
        if (elapsed >= RAMP_DURATION_MS) {
          phaseRef.current = "auto";
          speed = baseSpeed;
        } else {
          const progress = elapsed / RAMP_DURATION_MS;
          speed = baseSpeed * progress;
        }
      }

      offsetRef.current += delta * speed;
      if (offsetRef.current >= loopWidth) {
        offsetRef.current -= loopWidth;
      }

      applyTransform();
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [loopWidth, applyTransform]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || loopWidthRef.current <= 0) return;

    phaseRef.current = "dragging";
    lastPointerXRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (phaseRef.current !== "dragging") return;

    const width = loopWidthRef.current;
    const delta = event.clientX - lastPointerXRef.current;
    lastPointerXRef.current = event.clientX;
    offsetRef.current = normalizeOffset(offsetRef.current + delta, width);
    applyTransform();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (phaseRef.current !== "dragging") return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    phaseRef.current = "hold";
    holdUntilRef.current = performance.now() + HOLD_AFTER_RELEASE_MS;
  };

  return (
    <>
      <ul className="sr-only">
        {items.map(({ id, label }) => (
          <li key={id}>{label}</li>
        ))}
      </ul>
      <div
        ref={containerRef}
        className="tech-marquee mx-auto w-[80%] cursor-grab overflow-hidden py-2 touch-none select-none active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          ref={trackRef}
          className="tech-marquee-track flex w-max items-center gap-14"
        >
          {trackItems.map(({ id, Icon, label }, index) => (
            <div
              key={`${id}-${index}`}
              ref={
                index === 0
                  ? loopStartRef
                  : index === items.length
                    ? loopEndRef
                    : undefined
              }
              className="flex shrink-0 items-center gap-3"
              aria-hidden={index >= items.length}
            >
              <Icon className="size-9 shrink-0 text-primary" />
              <span className="whitespace-nowrap text-sm font-medium tracking-wide text-foreground/90">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
