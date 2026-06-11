type IllustrationProps = {
  className?: string;
};

export function ConsultationIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Left bubble — incoming message */}
      <path
        d="M22 38h44a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H38l-10 10v-10H22a6 6 0 0 1-6-6V44a6 6 0 0 1 6-6z"
        fill="#410c54"
        fillOpacity="0.5"
        stroke="#c9a6ff"
        strokeWidth="2"
      />
      <line x1="30" y1="50" x2="58" y2="50" stroke="#b9a6d6" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="58" x2="50" y2="58" stroke="#b9a6d6" strokeWidth="2" strokeLinecap="round" />

      {/* Right bubble — reply */}
      <path
        d="M54 62h44a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H82l-10 10v-10H54a6 6 0 0 1-6-6V68a6 6 0 0 1 6-6z"
        fill="#95f702"
        fillOpacity="0.15"
        stroke="#95f702"
        strokeWidth="2"
      />
      <line x1="62" y1="74" x2="90" y2="74" stroke="#95f702" strokeWidth="2" strokeLinecap="round" />
      <line x1="62" y1="82" x2="78" y2="82" stroke="#95f702" strokeWidth="2" strokeLinecap="round" />

      {/* Typing dots */}
      <circle cx="48" cy="92" r="2.5" fill="#c9a6ff" fillOpacity="0.6" />
      <circle cx="56" cy="92" r="2.5" fill="#c9a6ff" fillOpacity="0.8" />
      <circle cx="64" cy="92" r="2.5" fill="#95f702" />
    </svg>
  );
}

export function PlanIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="25" y="20" width="70" height="80" rx="6" fill="#410c54" fillOpacity="0.4" stroke="#c9a6ff" strokeWidth="2" />
      <line x1="35" y1="38" x2="75" y2="38" stroke="#95f702" strokeWidth="2" strokeLinecap="round" />
      <line x1="35" y1="52" x2="85" y2="52" stroke="#b9a6d6" strokeWidth="2" strokeLinecap="round" />
      <line x1="35" y1="66" x2="70" y2="66" stroke="#b9a6d6" strokeWidth="2" strokeLinecap="round" />
      <rect x="35" y="76" width="20" height="14" rx="3" fill="#95f702" fillOpacity="0.3" stroke="#95f702" strokeWidth="1.5" />
      <rect x="60" y="76" width="20" height="14" rx="3" fill="#7a3a9e" fillOpacity="0.4" stroke="#c9a6ff" strokeWidth="1.5" />
    </svg>
  );
}

export function DevelopmentIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="20" y="25" width="80" height="55" rx="6" fill="#1b1230" stroke="#410c54" strokeWidth="2" />
      <circle cx="32" cy="37" r="3" fill="#ff6b6b" />
      <circle cx="42" cy="37" r="3" fill="#95f702" />
      <circle cx="52" cy="37" r="3" fill="#c9a6ff" />
      <text x="30" y="58" fill="#95f702" fontSize="10" fontFamily="monospace">&lt;/&gt;</text>
      <line x1="30" y1="65" x2="70" y2="65" stroke="#410c54" strokeWidth="2" />
      <line x1="30" y1="72" x2="55" y2="72" stroke="#7a3a9e" strokeWidth="2" />
      <path d="M50 90 L60 82 L70 90 L60 98 Z" fill="#95f702" fillOpacity="0.3" stroke="#95f702" strokeWidth="1.5" />
    </svg>
  );
}

export function LaunchIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M60 95 L60 55" stroke="#c9a6ff" strokeWidth="2" strokeLinecap="round" />
      <path d="M60 55 L45 70 L60 55 L75 70 Z" fill="#95f702" fillOpacity="0.4" stroke="#95f702" strokeWidth="2" />
      <ellipse cx="60" cy="55" rx="12" ry="20" fill="#410c54" stroke="#95f702" strokeWidth="2" />
      <circle cx="60" cy="48" r="4" fill="#95f702" />
      <path d="M30 40 Q20 20 35 15" stroke="#c9a6ff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M90 40 Q100 20 85 15" stroke="#c9a6ff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="25" cy="30" r="2" fill="#95f702" />
      <circle cx="95" cy="30" r="2" fill="#95f702" />
    </svg>
  );
}

export const PROCESS_ILLUSTRATIONS = {
  consultation: ConsultationIllustration,
  plan: PlanIllustration,
  development: DevelopmentIllustration,
  launch: LaunchIllustration,
} as const;

export const PROCESS_STEPS = [
  "consultation",
  "plan",
  "development",
  "launch",
] as const;

export type ProcessStepId = (typeof PROCESS_STEPS)[number];
