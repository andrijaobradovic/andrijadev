import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function AboutAvatar() {
  const t = await getTranslations("about");

  return (
    <div className="relative mx-auto size-36 shrink-0 sm:size-40 lg:size-44">
      <div
        aria-hidden
        className="absolute inset-0 scale-110 rounded-full bg-primary/25 blur-2xl"
      />
      <div
        aria-hidden
        className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/40 via-secondary/30 to-primary/20"
      />
      <div
        aria-hidden
        className="absolute -right-1 -top-1 size-4 rounded-full border-2 border-primary/60 bg-primary/20"
      />
      <div
        aria-hidden
        className="absolute -bottom-2 -left-2 size-3 rounded-full bg-secondary"
      />
      <div
        aria-hidden
        className="absolute -right-3 bottom-4 size-2 rounded-full bg-[#c9a6ff]"
      />
      <div className="relative size-full overflow-hidden rounded-full ring-2 ring-primary/50 ring-offset-2 ring-offset-background">
        <Image
          src="/selfie.jpg"
          alt={t("avatarAlt")}
          fill
          priority
          className="object-cover object-top"
          sizes="(max-width: 640px) 144px, 176px"
        />
      </div>
    </div>
  );
}
