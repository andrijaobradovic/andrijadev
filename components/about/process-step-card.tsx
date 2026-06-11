import { Card, CardContent } from "@/components/ui/card";
import type { ProcessStepId } from "./process-illustrations";
import { PROCESS_ILLUSTRATIONS } from "./process-illustrations";

export type ProcessStepData = {
  id: ProcessStepId;
  index: number;
  title: string;
  description: string;
};

type ProcessStepCardProps = {
  step: ProcessStepData;
};

export function ProcessStepCard({ step }: ProcessStepCardProps) {
  const Illustration = PROCESS_ILLUSTRATIONS[step.id];

  return (
    <Card className="h-full rounded-lg bg-card/60 ring-border/40 backdrop-blur-sm">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <Illustration className="size-20 shrink-0 sm:size-24" />
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">
              {String(step.index + 1).padStart(2, "0")}
            </p>
            <h3 className="font-heading text-lg font-semibold tracking-wide">
              {step.title}
            </h3>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </CardContent>
    </Card>
  );
}
