import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const outlineFillClassName =
  "group/button relative overflow-hidden border-primary bg-transparent text-primary hover:bg-transparent hover:text-primary-foreground";

const fillOverlay = (
  <span
    aria-hidden="true"
    className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out motion-reduce:transition-none group-hover/button:scale-x-100 group-disabled/button:scale-x-0"
  />
);

function wrapContent(children: React.ReactNode) {
  return (
    <>
      {fillOverlay}
      <span className="relative z-10 inline-flex items-center gap-1.5">
        {children}
      </span>
    </>
  );
}

type OutlineFillButtonProps = React.ComponentProps<typeof Button>;

function OutlineFillButton({
  className,
  children,
  asChild = false,
  ...props
}: OutlineFillButtonProps) {
  if (asChild && React.isValidElement<{ children?: React.ReactNode }>(children)) {
    return (
      <Button
        asChild
        variant="outline"
        className={cn(outlineFillClassName, className)}
        {...props}
      >
        {React.cloneElement(
          children,
          {},
          wrapContent(children.props.children)
        )}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      className={cn(outlineFillClassName, className)}
      {...props}
    >
      {wrapContent(children)}
    </Button>
  );
}

export { OutlineFillButton };
