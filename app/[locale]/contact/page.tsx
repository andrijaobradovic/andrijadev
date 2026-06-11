import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto w-[80%] flex-1 px-4 py-16 sm:py-20 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-5 lg:gap-12 lg:items-center">
        <div className="order-1 flex flex-col justify-center lg:col-span-2">
          <ContactInfo />
        </div>

        <div className="order-2 lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
