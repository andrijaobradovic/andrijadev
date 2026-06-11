import type { ComponentType } from "react";
import type { ServiceSlug } from "@/lib/services";

type IllustrationProps = {
  className?: string;
};

function WebsitesIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="40"
        y="50"
        width="120"
        height="100"
        rx="12"
        fill="#410c54"
        fillOpacity="0.35"
        stroke="#7a3a9e"
        strokeWidth="2"
      />
      <rect x="52" y="68" width="96" height="8" rx="4" fill="#95f702" fillOpacity="0.5" />
      <rect x="52" y="88" width="72" height="6" rx="3" fill="#c9a6ff" fillOpacity="0.6" />
      <rect x="52" y="102" width="84" height="6" rx="3" fill="#c9a6ff" fillOpacity="0.4" />
      <circle cx="160" cy="60" r="28" fill="#95f702" fillOpacity="0.12" stroke="#95f702" strokeWidth="1.5" />
      <path
        d="M30 140 Q60 110 90 140 T150 140"
        stroke="#95f702"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        strokeOpacity="0.5"
      />
    </svg>
  );
}

function WebAppsIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="35" y="45" width="55" height="55" rx="10" fill="#410c54" fillOpacity="0.4" stroke="#c9a6ff" strokeWidth="2" />
      <rect x="110" y="45" width="55" height="55" rx="10" fill="#410c54" fillOpacity="0.4" stroke="#c9a6ff" strokeWidth="2" />
      <rect x="72" y="110" width="55" height="55" rx="10" fill="#95f702" fillOpacity="0.15" stroke="#95f702" strokeWidth="2" />
      <line x1="63" y1="72" x2="110" y2="72" stroke="#7a3a9e" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="90" y1="100" x2="100" y2="110" stroke="#7a3a9e" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="137" y1="72" x2="100" y2="110" stroke="#7a3a9e" strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="100" cy="30" r="6" fill="#95f702" fillOpacity="0.6" />
    </svg>
  );
}

function DesignIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="100" cy="100" r="60" fill="#410c54" fillOpacity="0.3" stroke="#7a3a9e" strokeWidth="2" />
      <circle cx="70" cy="85" r="18" fill="#95f702" fillOpacity="0.25" stroke="#95f702" strokeWidth="1.5" />
      <rect x="115" y="70" width="40" height="40" rx="6" fill="#c9a6ff" fillOpacity="0.2" stroke="#c9a6ff" strokeWidth="1.5" />
      <path d="M55 130 L85 110 L115 135 L145 105" stroke="#95f702" strokeWidth="2" strokeLinecap="round" fill="none" />
      <line x1="40" y1="160" x2="160" y2="160" stroke="#7a3a9e" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MaintenanceIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M100 40 L120 70 L155 75 L130 100 L135 135 L100 120 L65 135 L70 100 L45 75 L80 70 Z"
        fill="#410c54"
        fillOpacity="0.35"
        stroke="#7a3a9e"
        strokeWidth="2"
      />
      <path
        d="M88 100 L96 108 L116 86"
        stroke="#95f702"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="100" cy="165" r="20" fill="#95f702" fillOpacity="0.12" stroke="#95f702" strokeWidth="1.5" />
      <line x1="100" y1="155" x2="100" y2="175" stroke="#95f702" strokeWidth="2" strokeLinecap="round" />
      <line x1="90" y1="165" x2="110" y2="165" stroke="#95f702" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function NewFeaturesIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="50" y="55" width="50" height="50" rx="8" fill="#410c54" fillOpacity="0.4" stroke="#c9a6ff" strokeWidth="2" transform="rotate(-8 75 80)" />
      <rect x="100" y="70" width="50" height="50" rx="8" fill="#95f702" fillOpacity="0.15" stroke="#95f702" strokeWidth="2" transform="rotate(12 125 95)" />
      <circle cx="75" cy="140" r="22" fill="#410c54" fillOpacity="0.3" stroke="#7a3a9e" strokeWidth="2" />
      <path d="M68 140 L73 145 L84 132" stroke="#95f702" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="125" y1="55" x2="145" y2="35" stroke="#95f702" strokeWidth="2" strokeLinecap="round" />
      <line x1="145" y1="35" x2="155" y2="45" stroke="#95f702" strokeWidth="2" strokeLinecap="round" />
      <line x1="145" y1="35" x2="135" y2="25" stroke="#95f702" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CustomSolutionsIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="90" cy="90" r="40" fill="#410c54" fillOpacity="0.35" stroke="#7a3a9e" strokeWidth="2" />
      <line x1="118" y1="118" x2="155" y2="155" stroke="#95f702" strokeWidth="4" strokeLinecap="round" />
      <circle cx="155" cy="155" r="8" fill="#95f702" fillOpacity="0.3" stroke="#95f702" strokeWidth="1.5" />
      <path
        d="M75 90 Q90 70 105 90 Q90 110 75 90"
        fill="#95f702"
        fillOpacity="0.2"
        stroke="#95f702"
        strokeWidth="1.5"
      />
      <circle cx="55" cy="145" r="14" fill="#c9a6ff" fillOpacity="0.15" stroke="#c9a6ff" strokeWidth="1.5" />
      <rect x="130" y="50" width="30" height="30" rx="6" fill="#95f702" fillOpacity="0.1" stroke="#95f702" strokeWidth="1.5" transform="rotate(15 145 65)" />
    </svg>
  );
}

export const SERVICE_ILLUSTRATIONS: Record<
  ServiceSlug,
  ComponentType<IllustrationProps>
> = {
  websites: WebsitesIllustration,
  "web-apps": WebAppsIllustration,
  design: DesignIllustration,
  maintenance: MaintenanceIllustration,
  "new-features": NewFeaturesIllustration,
  "custom-solutions": CustomSolutionsIllustration,
};
