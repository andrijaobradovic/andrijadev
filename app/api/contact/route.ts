import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const messages = {
  en: {
    required: "All fields are required.",
    emailInvalid: "Please enter a valid email address.",
    generic: "Something went wrong. Please try again.",
  },
  sr: {
    required: "Sva polja su obavezna.",
    emailInvalid: "Neispravan format email adrese.",
    generic: "Došlo je do greške. Pokušajte ponovo.",
  },
} as const;

type Locale = keyof typeof messages;

function getLocale(value: unknown): Locale {
  return value === "sr" ? "sr" : "en";
}

export async function POST(request: Request) {
  const body = await request.json();
  const locale = getLocale(body.locale);
  const t = messages[locale];

  try {
    const { name, email, subject, message, website } = body;

    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: t.required }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: t.emailInvalid }, { status: 400 });
    }

    if (message.length > 1000) {
      return NextResponse.json({ error: t.required }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Kontakt forma <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `[andrija.dev] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: t.generic }, { status: 500 });
  }
}
