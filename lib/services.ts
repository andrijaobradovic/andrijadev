import {
  RiCodeSSlashLine,
  RiFigmaLine,
  RiPuzzleLine,
  RiSearchLine,
  RiServerLine,
  RiShieldCheckLine,
} from "@remixicon/react";

type ServiceIcon = typeof RiCodeSSlashLine;

export const SERVICE_SLUGS = [
  "websites",
  "web-apps",
  "design",
  "maintenance",
  "new-features",
  "custom-solutions",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export type ServiceId = ServiceSlug;

export type ServiceConfig = {
  id: ServiceId;
  slug: ServiceSlug;
  icon: ServiceIcon;
};

export const SERVICE_ICONS: Record<ServiceId, ServiceIcon> = {
  websites: RiCodeSSlashLine,
  "web-apps": RiServerLine,
  design: RiFigmaLine,
  maintenance: RiShieldCheckLine,
  "new-features": RiPuzzleLine,
  "custom-solutions": RiSearchLine,
};

export const SERVICES: ServiceConfig[] = [
  { id: "websites", slug: "websites", icon: RiCodeSSlashLine },
  { id: "web-apps", slug: "web-apps", icon: RiServerLine },
  { id: "design", slug: "design", icon: RiFigmaLine },
  { id: "maintenance", slug: "maintenance", icon: RiShieldCheckLine },
  { id: "new-features", slug: "new-features", icon: RiPuzzleLine },
  { id: "custom-solutions", slug: "custom-solutions", icon: RiSearchLine },
];

export function isServiceSlug(slug: string): slug is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(slug);
}

export function getServiceBySlug(slug: string): ServiceConfig | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
