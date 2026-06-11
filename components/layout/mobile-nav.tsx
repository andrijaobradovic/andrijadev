"use client";

import { useState } from "react";
import { RiMenuLine } from "@remixicon/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavItems } from "./nav-items";
import { Logo } from "./logo";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("a11y");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="lg:hidden"
          aria-label={t("openMenu")}
        >
          <RiMenuLine className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[min(320px,85vw)] border-border/60 bg-background/95 pt-4 backdrop-blur-md"
        overlayClassName="bg-black/60"
      >
        <SheetTitle className="sr-only">{t("mainNav")}</SheetTitle>
        <div className="flex h-full flex-col">
          <div className="mb-10 flex h-9 items-center justify-center px-12">
            <Logo size="sm" />
          </div>
          <NavItems
            className="w-full"
            itemClassName="text-base text-center"
            onLinkClick={() => setOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
