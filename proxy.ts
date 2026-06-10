import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const BALKAN_LOCALES = new Set(["sr", "hr", "bs"]);

function getLocaleFromAcceptLanguage(request: NextRequest): "en" | "sr" {
  const header = request.headers.get("accept-language") ?? "";

  for (const part of header.split(",")) {
    const lang = part.split(";")[0]?.trim().toLowerCase().split("-")[0];

    if (lang && BALKAN_LOCALES.has(lang)) {
      return "sr";
    }
  }

  return "en";
}

function pathnameHasLocale(pathname: string) {
  return routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathnameHasLocale(pathname)) {
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    const locale =
      cookieLocale && routing.locales.includes(cookieLocale as "en" | "sr")
        ? (cookieLocale as "en" | "sr")
        : getLocaleFromAcceptLanguage(request);

    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
