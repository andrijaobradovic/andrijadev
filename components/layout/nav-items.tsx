"use client";

import { useTranslations } from "next-intl";
import { NavLink } from "./nav-link";

const navRoutes = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/projects", key: "projects" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

type NavItemsProps = {
  className?: string;
  itemClassName?: string;
  onLinkClick?: () => void;
};

export function NavItems({
  className,
  itemClassName,
  onLinkClick,
}: NavItemsProps) {
  const t = useTranslations("nav");
  const tA11y = useTranslations("a11y");

  return (
    <nav className={className} aria-label={tA11y("mainNav")}>
      <ul className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-8">
        {navRoutes.map(({ href, key }) => (
          <li key={key}>
            <NavLink
              href={href}
              className={itemClassName}
              onClick={onLinkClick}
            >
              {t(key)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
