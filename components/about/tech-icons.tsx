type TechIconProps = {
  className?: string;
};

const letterStyle = {
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontWeight: 700,
} as const;

export function NextJsIcon({ className }: TechIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <text
        x="12"
        y="12.5"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--primary-foreground)"
        fontSize="13"
        {...letterStyle}
      >
        N
      </text>
    </svg>
  );
}

export function ReactIcon({ className }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
    >
      <circle cx="12" cy="12" r="2.05" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(120 12 12)" />
    </svg>
  );
}

export function TypeScriptIcon({ className }: TechIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="3"
        fill="currentColor"
      />
      <text
        x="12"
        y="12.5"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--primary-foreground)"
        fontSize="9.5"
        letterSpacing="-0.5"
        {...letterStyle}
      >
        TS
      </text>
    </svg>
  );
}

export function TailwindIcon({ className }: TechIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  );
}

export function SupabaseIcon({ className }: TechIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.66z" />
    </svg>
  );
}

export function BootstrapIcon({ className }: TechIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="4"
        fill="currentColor"
      />
      <text
        x="12"
        y="12.5"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--primary-foreground)"
        fontSize="14"
        {...letterStyle}
      >
        B
      </text>
    </svg>
  );
}

export function GitIcon({ className }: TechIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M23.546 10.93 13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-2.009L12.86 8.955v6.767c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
    </svg>
  );
}

export function VercelIcon({ className }: TechIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M24 22.525H0l12-21.05 12 21.05z" />
    </svg>
  );
}

export const TECH_STACK = [
  { id: "nextjs", Icon: NextJsIcon },
  { id: "react", Icon: ReactIcon },
  { id: "typescript", Icon: TypeScriptIcon },
  { id: "tailwind", Icon: TailwindIcon },
  { id: "supabase", Icon: SupabaseIcon },
  { id: "bootstrap", Icon: BootstrapIcon },
  { id: "git", Icon: GitIcon },
  { id: "vercel", Icon: VercelIcon },
] as const;
