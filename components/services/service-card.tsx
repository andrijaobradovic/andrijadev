"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { SERVICE_ICONS, type ServiceId, type ServiceSlug } from "@/lib/services";

type ServiceCardProps = {
  id: ServiceId;
  slug: ServiceSlug;
  title: string;
  description: string;
  className?: string;
};

export function ServiceCard({
  id,
  slug,
  title,
  description,
  className,
}: ServiceCardProps) {
  const Icon = SERVICE_ICONS[id];

  return (
    <Link
      href={`/services/${slug}`}
      className={cn(
        "group flex h-full cursor-pointer flex-col rounded-lg border border-border p-5 transition-all duration-300",
        "hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_20px_rgba(149,247,2,0.12)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Icon
          className="size-8 shrink-0 text-[#7a3a9e] transition-colors duration-300 group-hover:text-primary"
          aria-hidden
        />
        <h3 className="font-heading text-base font-semibold tracking-tight sm:text-lg">
          {title}
        </h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </Link>
  );
}
