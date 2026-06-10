import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: "sm" | "md";
};

export function Logo({ className, size = "md" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex font-heading font-semibold tracking-tight text-foreground transition-colors",
        size === "sm" ? "text-lg" : "text-xl",
        className
      )}
    >
      Andrija
      <span className="text-primary transition-colors group-hover:text-secondary">
        Dev
      </span>
    </Link>
  );
}
