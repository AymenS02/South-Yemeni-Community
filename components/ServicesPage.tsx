"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Content ---------- */

type Item = { label: string; detail?: string };
type Category = {
  id: string;
  title: string;
  blurb: string;
  items: Item[];
};

const categories: Category[] = [
  {
    id: "settlement",
    title: "Settlement & Newcomer Support",
    blurb: "Practical help with the first steps of building a life in Canada.",
    items: [
      { label: "New to Canada guide" },
      { label: "Housing resources" },
      { label: "Schools & enrolling children" },
      {
        label: "Healthcare",
        detail: "OHIP, family doctors, walk-in clinics",
      },
      { label: "SIN, bank account, phone plans" },
      { label: "Driver's licence", detail: "G1 / G2 / G" },
    ],
  },
  {
    id: "immigration",
    title: "Immigration Information",
    blurb:
      "General information to help you understand the process. This isn't legal advice.",
    items: [
      { label: "Refugee information" },
      { label: "Permanent Resident resources" },
      { label: "Citizenship information" },
      { label: "Canadian passport information" },
      { label: "Family sponsorship resources" },
      { label: "Translation & document assistance" },
    ],
  },
  {
    id: "employment",
    title: "Employment",
    blurb: "Get job-ready and connect with opportunities.",
    items: [
      { label: "Resume help" },
      { label: "Interview preparation" },
      { label: "Job search resources" },
      { label: "Employment agencies" },
      { label: "Credential recognition" },
    ],
  },
  {
    id: "education",
    title: "Education",
    blurb: "Funding, schools, and language learning for every stage.",
    items: [
      { label: "OSAP" },
      { label: "Colleges & universities" },
      { label: "English classes", detail: "LINC / ESL" },
      { label: "Adult education" },
    ],
  },
  {
    id: "community",
    title: "Community",
    blurb: "Celebrations, activities, and gatherings that bring us together.",
    items: [
      { label: "Community events" },
      { label: "Eid celebrations" },
      { label: "Ramadan programs" },
      { label: "Family picnics" },
      { label: "Youth activities" },
      { label: "Women's activities" },
      { label: "Sports tournaments" },
      { label: "Photo gallery" },
    ],
  },
];

const allItems = categories.flatMap((c) => c.items);

/* ---------- Small shared pieces ---------- */

const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
    className="h-3.5 w-3.5"
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

const SectionHeading = ({
  eyebrow,
  title,
  highlight,
  description,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  dark?: boolean;
}) => (
  <div className="max-w-2xl">
    <p
      className={`flex items-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-[0.3em] ${
        dark ? "text-white/70" : "text-foreground/70"
      }`}
    >
      <span className={`h-px w-8 ${dark ? "bg-white/40" : "bg-foreground/40"}`} />
      {eyebrow}
    </p>
    <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
      {title}{" "}
      <span className={dark ? "text-accent" : "text-primary"}>{highlight}</span>
    </h2>
    <div className="mt-5 h-1 w-16 rounded-full bg-accent" />
    <p
      className={`mt-5 text-base md:text-lg leading-relaxed ${
        dark ? "text-white/70" : "text-foreground/70"
      }`}
    >
      {description}
    </p>
  </div>
);

const labelStyle =
  "mb-2 block text-xs font-semibold uppercase tracking-widest text-white/70";
const fieldStyle =
  "w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";

/* ---------- Page ---------- */

export default function ServicesPage({
  initialService,
}: {
  initialService?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  const initial = allItems.find(
    (i) => i.label.toLowerCase() === initialService?.toLowerCase()
  );
  const [selected, setSelected] = useState<string[]>(
    initial ? [initial.label] : []
  );
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const toggle = (label: string) =>
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero intro
      gsap.from("[data-hero]", {
        opacity: 0,
        y: 28,
        stagger: 0.1,
        duration: 0.9,
        delay: 0.3,
        ease: "power3.out",
      });

      // Category headings + form heading fade up on scroll
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // Service cards stagger in per batch
      gsap.set("[data-card]", { opacity: 0, y: 24 });
      ScrollTrigger.batch("[data-card]", {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.6,
            ease: "power3.out",
            clearProps: "all",
          }),
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
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          language: data.get("language"),
          message: data.get("message"),
          website: data.get("website"), // honeypot
          services: selected,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setSelected([]);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div ref={rootRef} className="text-foreground font-sans">
      {/* ================= INTRO ================= */}
      <section className="px-6 md:px-16 lg:px-24 pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p
            data-hero
            className="flex items-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-foreground/70"
          >
            <span className="h-px w-8 bg-foreground/40" />
            Our services
          </p>
          <h1
            data-hero
            className="mt-4 max-w-3xl text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05]"
          >
            Support for your <span className="text-primary">next chapter</span>
          </h1>
          <div data-hero className="mt-6 h-1 w-16 rounded-full bg-accent" />
          <p
            data-hero
            className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-foreground/70"
          >
            Browse what we offer, select anything you&apos;re interested in, and
            send us a quick message. We&apos;ll get back to you.
          </p>

          {/* Jump links */}
          <div data-hero className="mt-10 flex flex-wrap gap-3">
            {categories.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="rounded-full border border-foreground/20 bg-foreground/[0.03] px-5 py-2 text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:border-foreground/60 hover:bg-foreground/10 active:scale-95"
              >
                {c.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="px-6 md:px-16 lg:px-24 pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl">
          {categories.map((c, i) => {
            const count = c.items.filter((it) =>
              selected.includes(it.label)
            ).length;

            return (
              <div
                key={c.id}
                id={c.id}
                className="grid scroll-mt-28 gap-8 border-t border-foreground/15 py-14 lg:grid-cols-[1fr_2fr] lg:gap-16"
              >
                {/* Category heading */}
                <div data-reveal className="self-start lg:sticky lg:top-28">
                  <span className="text-sm font-semibold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
                    {c.title}
                  </h2>
                  <div className="mt-4 h-1 w-12 rounded-full bg-accent" />
                  <p className="mt-4 leading-relaxed text-foreground/70">
                    {c.blurb}
                  </p>
                  <span
                    className={`mt-5 inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white transition-all duration-300 ${
                      count > 0
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-1 opacity-0"
                    }`}
                  >
                    {count} selected
                  </span>
                </div>

                {/* Selectable service cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {c.items.map((item) => {
                    const on = selected.includes(item.label);
                    return (
                      <button
                        key={item.label}
                        type="button"
                        data-card
                        aria-pressed={on}
                        onClick={() => toggle(item.label)}
                        className={`group flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] ${
                          on
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-foreground/15 bg-white hover:border-foreground/40"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                            on
                              ? "border-primary bg-primary text-white"
                              : "border-foreground/30 text-transparent group-hover:border-foreground/60"
                          }`}
                        >
                          <Check />
                        </span>
                        <span>
                          <span className="block font-semibold leading-snug">
                            {item.label}
                          </span>
                          {item.detail && (
                            <span className="mt-1 block text-sm text-foreground/60">
                              {item.detail}
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CONTACT FORM ================= */}
      <section id="contact-form" className="scroll-mt-4 bg-foreground text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:px-16 md:py-28 lg:grid-cols-[1fr_1.3fr] lg:gap-20 lg:px-24">
          <div data-reveal className="self-start">
            <SectionHeading
              dark
              eyebrow="Get in touch"
              title="Tell us how we can"
              highlight="help"
              description="Send us a message and someone from our team will follow up. Prefer email? Write to info@yourdomain.ca."
            />
          </div>

          <div data-reveal>
            {status === "sent" ? (
              <div
                role="status"
                className="rounded-2xl border border-white/20 bg-white/5 p-8 md:p-10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  <Check />
                </span>
                <h3 className="mt-6 text-2xl font-extrabold tracking-tight">
                  Thank you, we got your message
                </h3>
                <p className="mt-2 leading-relaxed text-white/70">
                  Someone from our team will be in touch soon.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold transition-all duration-300 hover:border-white hover:bg-white/10 active:scale-95"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="rounded-2xl border border-white/20 bg-white/5 p-6 md:p-10"
              >
                {/* Selected services */}
                <div>
                  <span className={labelStyle}>Services you&apos;re interested in</span>
                  {selected.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selected.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 py-1 pl-3 pr-1 text-xs font-semibold"
                        >
                          {s}
                          <button
                            type="button"
                            onClick={() => toggle(s)}
                            aria-label={`Remove ${s}`}
                            className="flex h-5 w-5 items-center justify-center rounded-full text-sm leading-none text-white/70 transition-colors hover:bg-primary hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-white/50">
                      None selected. Pick services above, or just tell us what
                      you need below.
                    </p>
                  )}
                </div>

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
                    <label htmlFor="language" className={labelStyle}>
                      Preferred language
                    </label>
                    <select
                      id="language"
                      name="language"
                      defaultValue="English"
                      className={fieldStyle}
                    >
                      <option className="text-foreground">English</option>
                      <option className="text-foreground">Arabic</option>
                      <option className="text-foreground">Other</option>
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
                    rows={5}
                    className={`${fieldStyle} resize-none`}
                    placeholder="Tell us a little about what you're looking for"
                  />
                </div>

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
                    <p role="alert" className="text-sm text-white/70">
                      Something went wrong. Please try again, or email us
                      directly.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ================= FLOATING SELECTION BAR ================= */}
      <div
        className={`fixed inset-x-0 bottom-6 z-20 flex justify-center px-4 transition-all duration-500 ${
          selected.length > 0
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-8 opacity-0"
        }`}
      >
        <a
          href="#contact-form"
          className="group flex items-center gap-3 rounded-full bg-foreground py-3 pl-3 pr-6 text-sm font-semibold text-white shadow-2xl ring-1 ring-white/15 transition-transform duration-300 hover:-translate-y-0.5 active:scale-95"
        >
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 text-xs">
            {selected.length}
          </span>
          {selected.length === 1 ? "service" : "services"} selected
          <span className="flex items-center gap-2 text-accent">
            Request info <Arrow />
          </span>
        </a>
      </div>
    </div>
  );
}