"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link"; // swap for Link from "@/i18n/navigation" if using next-intl
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Placeholder content: swap for your real info ---------- */

const EMAIL = "info@yourdomain.ca";
const PHONE = "(905) 555-0123";
const ADDRESS = "123 Example Street, Hamilton, ON";
const HOURS = "Tue to Sat, 10 AM to 6 PM";
const DIRECTIONS =
  "https://www.google.com/maps/search/?api=1&query=Hamilton%2C+Ontario";

const socials = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "WhatsApp", href: "#" },
];

const topics = [
  "General question",
  "Services",
  "Events",
  "Volunteering",
  "Donations",
  "Partnerships",
];

/* ---------- Small shared pieces ---------- */

const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Check = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12l5 5L20 7" />
  </svg>
);

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const labelStyle =
  "mb-2 block text-xs font-semibold uppercase tracking-widest text-foreground/70 rtl:tracking-normal";
const fieldStyle =
  "w-full rounded-xl border border-foreground/20 bg-white px-4 py-3 text-sm placeholder:text-foreground/40 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";
const infoLabel =
  "text-xs font-semibold uppercase tracking-widest text-white/60 rtl:tracking-normal";
const infoLink = "mt-1 block font-semibold transition-colors hover:text-accent";

/* ---------- Page ---------- */

export default function ContactPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero]", {
        opacity: 0,
        y: 28,
        stagger: 0.1,
        duration: 0.9,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact-page",
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          topic: data.get("topic"),
          message: data.get("message"),
          website: data.get("website"), // honeypot
          services: [],
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div ref={rootRef} className="text-foreground font-sans">
      {/* ================= INTRO ================= */}
      <section className="px-6 md:px-16 lg:px-24 pt-36 md:pt-44 pb-14 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p
            data-hero
            className="flex items-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-foreground/70 rtl:tracking-normal"
          >
            <span className="h-px w-8 bg-foreground/40" />
            Contact us
          </p>
          <h1
            data-hero
            className="mt-4 max-w-3xl text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] rtl:tracking-normal rtl:leading-[1.35]"
          >
            We&apos;d love to <span className="text-primary">hear from you</span>
          </h1>
          <div data-hero className="mt-6 h-1 w-16 rounded-full bg-accent" />
          <p
            data-hero
            className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-foreground/70"
          >
            Have a question, want to volunteer, or just want to say hello?
            Send us a message and we&apos;ll get back to you.
          </p>
        </div>
      </section>

      {/* ================= INFO + FORM ================= */}
      <section className="px-6 md:px-16 lg:px-24 pb-20 md:pb-28">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          {/* ---- Contact details (dark card) ---- */}
          <aside
            data-reveal
            className="relative self-start overflow-hidden rounded-2xl bg-foreground p-8 text-white md:p-10 lg:sticky lg:top-28"
          >
            {/* Flag-inspired bar */}
            <div className="absolute inset-x-0 top-0 flex h-1.5">
              <span className="flex-1 bg-foreground ring-1 ring-inset ring-white/15" />
              <span className="flex-1 bg-white" />
              <span className="flex-1 bg-primary" />
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight rtl:tracking-normal">
              Reach us directly
            </h2>
            <div className="mt-4 h-1 w-12 rounded-full bg-accent" />

            <ul className="mt-8 space-y-6">
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-accent">
                  <Icon>
                    <path d="M4 6h16v12H4z" />
                    <path d="M4 7l8 6 8-6" />
                  </Icon>
                </span>
                <div>
                  <p className={infoLabel}>Email</p>
                  <a href={`mailto:${EMAIL}`} className={infoLink}>
                    {EMAIL}
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-accent">
                  <Icon>
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
                  </Icon>
                </span>
                <div>
                  <p className={infoLabel}>Phone</p>
                  <a
                    href={`tel:${PHONE.replace(/[^\d+]/g, "")}`}
                    className={infoLink}
                    dir="ltr"
                  >
                    {PHONE}
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-accent">
                  <Icon>
                    <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </Icon>
                </span>
                <div>
                  <p className={infoLabel}>Location</p>
                  <p className="mt-1 font-semibold">{ADDRESS}</p>
                  <a
                    href={DIRECTIONS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-2 inline-flex items-center gap-2 text-sm font-semibold text-accent"
                  >
                    Get directions <Arrow />
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-accent">
                  <Icon>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </Icon>
                </span>
                <div>
                  <p className={infoLabel}>Hours</p>
                  <p className="mt-1 font-semibold">{HOURS}</p>
                </div>
              </li>
            </ul>

            <div className="mt-10 border-t border-white/15 pt-6">
              <p className={infoLabel}>Follow us</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="rounded-full border border-white/25 px-4 py-2 text-xs font-semibold transition-all duration-300 hover:border-white hover:bg-white/10 active:scale-95"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* ---- Form (white card) ---- */}
          <div data-reveal>
            {status === "sent" ? (
              <div
                role="status"
                className="rounded-2xl border border-foreground/15 bg-white p-8 md:p-12"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  <Check />
                </span>
                <h3 className="mt-6 text-2xl font-extrabold tracking-tight rtl:tracking-normal">
                  Thank you, we got your message
                </h3>
                <p className="mt-2 leading-relaxed text-foreground/70">
                  Someone from our team will be in touch soon.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 rounded-full border border-foreground/20 px-6 py-3 text-sm font-semibold transition-all duration-300 hover:border-foreground/60 hover:bg-foreground/5 active:scale-95"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="rounded-2xl border border-foreground/15 bg-white p-6 shadow-sm md:p-10"
              >
                <h2 className="text-2xl font-extrabold tracking-tight rtl:tracking-normal">
                  Send us a message
                </h2>
                <div className="mt-4 h-1 w-12 rounded-full bg-accent" />

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelStyle}>
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      className={fieldStyle}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelStyle}>
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={fieldStyle}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelStyle}>
                      Phone (optional)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={fieldStyle}
                      placeholder="(905) 555-0123"
                    />
                  </div>
                  <div>
                    <label htmlFor="topic" className={labelStyle}>
                      What&apos;s this about?
                    </label>
                    <select
                      id="topic"
                      name="topic"
                      defaultValue={topics[0]}
                      className={fieldStyle}
                    >
                      {topics.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="message" className={labelStyle}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className={`${fieldStyle} resize-none`}
                    placeholder="How can we help?"
                  />
                </div>

                <p className="mt-4 text-sm text-foreground/60">
                  Looking for a specific service?{" "}
                  <Link
                    href="/services"
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Browse our services
                  </Link>{" "}
                  and select what you need.
                </p>

                {/* Honeypot: hidden from people, bots fill it in */}
                <input
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>
                  {status === "error" && (
                    <p role="alert" className="text-sm text-foreground/70">
                      Something went wrong. Please try again, or email us
                      directly at {EMAIL}.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}