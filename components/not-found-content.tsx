import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

type NotFoundContentProps = {
  title: string;
  description: string;
  backLabel: string;
};

export function NotFoundContent({
  title,
  description,
  backLabel,
}: NotFoundContentProps) {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <p
        aria-hidden
        className="font-heading text-[clamp(5rem,20vw,10rem)] font-bold leading-none tracking-tighter text-primary drop-shadow-[0_0_24px_rgba(149,247,2,0.35)]"
      >
        404
      </p>
      <h1 className="mt-6 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">{description}</p>
      <Button asChild className="mt-10" size="lg">
        <Link href="/">{backLabel}</Link>
      </Button>
    </section>
  );
}
