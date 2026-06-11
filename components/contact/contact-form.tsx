"use client";

import { useState } from "react";
import { RiLoader4Line } from "@remixicon/react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { OutlineFillButton } from "@/components/ui/outline-fill-button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MAX_MESSAGE_LENGTH = 1000;

type FormFields = "name" | "email" | "subject" | "message";

type FormState = Record<FormFields, string>;

const initialFormState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Partial<Record<FormFields, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const messageLength = form.message.length;
  const isOverLimit = messageLength > MAX_MESSAGE_LENGTH;

  function updateField(field: FormFields, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function validate(): Partial<Record<FormFields, string>> {
    const nextErrors: Partial<Record<FormFields, string>> = {};

    if (!form.name.trim()) {
      nextErrors.name = t("errors.nameRequired");
    }

    if (!form.email.trim()) {
      nextErrors.email = t("errors.emailRequired");
    } else if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = t("errors.emailInvalid");
    }

    if (!form.subject.trim()) {
      nextErrors.subject = t("errors.subjectRequired");
    }

    if (!form.message.trim()) {
      nextErrors.message = t("errors.messageRequired");
    } else if (form.message.length > MAX_MESSAGE_LENGTH) {
      nextErrors.message = t("errors.messageMax");
    }

    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          website: honeypot,
          locale,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        toast.error(data.error ?? t("errors.generic"));
        return;
      }

      toast.success(t("success"));
      setForm(initialFormState);
      setHoneypot("");
      setErrors({});
    } catch {
      toast.error(t("errors.generic"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="border-border/30 bg-background/20 shadow-none ring-0 backdrop-blur-md">
      <CardContent className="pt-(--card-spacing)">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="relative flex flex-col gap-6"
        >
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">{t("name")}</Label>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder={t("namePlaceholder")}
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              aria-invalid={!!errors.name}
              disabled={isSubmitting}
            />
            {errors.name ? (
              <p className="text-xs text-destructive">{errors.name}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              aria-invalid={!!errors.email}
              disabled={isSubmitting}
            />
            {errors.email ? (
              <p className="text-xs text-destructive">{errors.email}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">{t("subject")}</Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder={t("subjectPlaceholder")}
              value={form.subject}
              onChange={(event) => updateField("subject", event.target.value)}
              aria-invalid={!!errors.subject}
              disabled={isSubmitting}
            />
            {errors.subject ? (
              <p className="text-xs text-destructive">{errors.subject}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t("message")}</Label>
            <Textarea
              id="message"
              name="message"
              rows={6}
              placeholder={t("messagePlaceholder")}
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              aria-invalid={!!errors.message || isOverLimit}
              disabled={isSubmitting}
            />
            <div className="flex items-start justify-between gap-4">
              {errors.message ? (
                <p className="text-xs text-destructive">{errors.message}</p>
              ) : (
                <span />
              )}
              <p
                className={`ml-auto shrink-0 text-xs tabular-nums ${
                  isOverLimit ? "text-destructive" : "text-muted-foreground"
                }`}
              >
                {t("characters", {
                  count: messageLength,
                  max: MAX_MESSAGE_LENGTH,
                })}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <OutlineFillButton
              type="submit"
              className="w-full sm:w-auto"
              disabled={isSubmitting || isOverLimit}
            >
              {isSubmitting ? (
                <>
                  <RiLoader4Line className="animate-spin" />
                  {t("sending")}
                </>
              ) : (
                t("submit")
              )}
            </OutlineFillButton>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {t("privacy")}
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
