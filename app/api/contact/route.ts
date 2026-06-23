import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getClientIp, isContactRateLimited } from "@/lib/contact-rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

const messages = {
  en: {
    required: "All fields are required.",
    emailInvalid: "Please enter a valid email address.",
    tooLong: "One or more fields are too long.",
    tooMany: "Too many requests. Please try again later.",
    generic: "Something went wrong. Please try again.",
  },
  sr: {
    required: "Sva polja su obavezna.",
    emailInvalid: "Neispravan format email adrese.",
    tooLong: "Jedno ili više polja je predugačko.",
    tooMany: "Previše zahteva. Pokušajte ponovo kasnije.",
    generic: "Došlo je do greške. Pokušajte ponovo.",
  },
} as const;

type Locale = keyof typeof messages;

const FIELD_LIMITS = {
  name: 25,
  email: 80,
  subject: 30,
  message: 1000,
} as const;

function getLocale(value: unknown): Locale {
  return value === "sr" ? "sr" : "en";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: messages.en.generic },
      { status: 400 }
    );
  }

  const locale = getLocale(body.locale);
  const t = messages[locale];

  try {
    if (await isContactRateLimited(getClientIp(request))) {
      return NextResponse.json({ error: t.tooMany }, { status: 429 });
    }

    const { name, email, subject, message, website } = body;

    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      return NextResponse.json({ error: t.required }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: t.emailInvalid }, { status: 400 });
    }

    if (
      name.length > FIELD_LIMITS.name ||
      email.length > FIELD_LIMITS.email ||
      subject.length > FIELD_LIMITS.subject ||
      message.length > FIELD_LIMITS.message
    ) {
      return NextResponse.json({ error: t.tooLong }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "AndrijaDev <no-reply@andrijadev.com>",
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: ` ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

    if (error) {
      return NextResponse.json({ error: t.generic }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: t.generic }, { status: 500 });
  }
}
