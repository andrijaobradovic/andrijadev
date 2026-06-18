import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // External project images (og:image / Supabase image_url) are rendered with
  // `unoptimized` in project-card.tsx, so they bypass /_next/image entirely.
  // All optimized images are local (/public), so no remote hosts need to be
  // allow-listed here. Keeping this empty avoids turning /_next/image into an
  // open image proxy.
};

export default withNextIntl(nextConfig);
