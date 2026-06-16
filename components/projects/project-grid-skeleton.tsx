import { cn } from "@/lib/utils";

type ProjectGridSkeletonProps = {
  count?: number;
  className?: string;
};

export function ProjectGridSkeleton({
  count = 6,
  className,
}: ProjectGridSkeletonProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8",
        className
      )}
      aria-hidden
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border border-[#120e1e] bg-card/40 animate-pulse"
        >
          <div className="aspect-[4/3] w-full bg-muted/40" />
          <div className="bg-card px-4 py-3">
            <div className="h-5 w-2/3 rounded-md bg-muted/40" />
          </div>
        </div>
      ))}
    </div>
  );
}
