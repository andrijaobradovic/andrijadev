import Image from "next/image";
import { Logo } from "./logo";
import { NavItems } from "./nav-items";
import { LanguageToggle } from "./language-toggle";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="layout-chrome header-slide-down sticky top-0 z-50 w-full border-b border-border/30 bg-background/40 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <div className="flex items-center gap-2.5 lg:justify-start lg:gap-3">
          <Image
            src="/selfie.jpg"
            alt="Andrija Obradovic"
            width={36}
            height={36}
            className="size-8 shrink-0 rounded-full object-cover ring-1 ring-border/50 lg:size-9"
            priority
          />
          <Logo size="sm" className="lg:text-xl" />
        </div>

        <div className="hidden lg:flex lg:justify-center">
          <NavItems />
        </div>

        <div className="ml-auto flex items-center gap-3 lg:ml-0 lg:justify-end">
          <LanguageToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
