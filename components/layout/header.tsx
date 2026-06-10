import { Logo } from "./logo";
import { NavItems } from "./nav-items";
import { LanguageToggle } from "./language-toggle";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="header-slide-down sticky top-0 z-50 w-full border-b border-border/30 bg-background/40 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <div className="flex items-center lg:justify-start">
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
