import type { Viewport } from "next";
import { Geist, Geist_Mono, Raleway, Space_Grotesk } from "next/font/google";
import { getLocale } from "next-intl/server";
import { cn } from "@/lib/utils";
import "./globals.css";

const spaceGroteskHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#120e1e",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={cn(
        "min-h-dvh",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        raleway.variable,
        spaceGroteskHeading.variable
      )}
    >
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
