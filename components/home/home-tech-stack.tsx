import { ScrollReveal } from "@/components/about/scroll-reveal";
import { TechMarquee } from "@/components/about/tech-marquee";

export function HomeTechStack() {
  return (
    <ScrollReveal delay={100}>
      <section aria-label="Technologies" className="pt-16">
        <TechMarquee className="w-full" />
      </section>
    </ScrollReveal>
  );
}
