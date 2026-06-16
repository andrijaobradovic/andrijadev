import { ProjectGridSkeleton } from "@/components/projects/project-grid-skeleton";

export default function ProjectsLoading() {
  return (
    <div className="mx-auto w-[80%] flex-1 px-4 py-16 sm:py-20 lg:py-24">
      <div className="flex flex-col gap-16 sm:gap-20">
        <div className="space-y-3">
          <div className="h-10 w-48 animate-pulse rounded-md bg-muted/40 sm:h-12" />
          <div className="h-5 max-w-2xl animate-pulse rounded-md bg-muted/30" />
          <div className="h-5 max-w-xl animate-pulse rounded-md bg-muted/30" />
        </div>
        <ProjectGridSkeleton count={6} />
      </div>
    </div>
  );
}
