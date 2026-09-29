"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Placeholder content: swap for your real info ---------- */

const services = [
  {
    title: "Newcomer Settlement",
    desc: "Help with housing, paperwork, and finding your feet in Hamilton.",
  },
  {
    title: "Youth Programs",
    desc: "Mentorship, sports, and homework support for the next generation.",
  },
  {
    title: "Language & Culture",
    desc: "Arabic and English classes that keep our heritage alive.",
  },
  {
    title: "Family Support",
    desc: "Connecting families with the care and guidance they need.",
  },
  {
    title: "Employment Help",
    desc: "Resume workshops, job leads, and professional networking.",
  },
  {
    title: "Interpretation",
    desc: "Translation help for appointments, forms, and official documents.",
  },
];

const events = [
  {
    month: "Oct",
    day: "11",
    tag: "Family",
    title: "Community Family Picnic",
    time: "12:00 PM",
    place: "Gage Park",
  },
  {
    month: "Oct",
    day: "24",
    tag: "Newcomers",
    title: "Newcomer Info Session",
    time: "6:30 PM",
    place: "Community Hall",
  },
  {
    month: "Nov",
    day: "07",
    tag: "Youth",
    title: "Youth Soccer Night",
    time: "7:00 PM",
    place: "Community Hall",
  },
  {
    month: "Nov",
    day: "21",
    tag: "Culture",
    title: "Heritage & Culture Evening",
    time: "5:00 PM",
    place: "Community Hall",
  },
];

const resources = [
  {
    tag: "Getting started",
    title: "Newcomer Guide",
    desc: "Everything to know in your first months in Hamilton.",
  },
  {
    tag: "Housing",
    title: "Housing & Tenant Rights",
    desc: "Finding a home and understanding your rights as a tenant.",
  },
  {
    tag: "Health",
    title: "Health Services",
    desc: "Clinics, family doctors, and how to access care.",
  },
  {
    tag: "Education",
    title: "Schools & Learning",
    desc: "Enrolling children and finding adult education options.",
  },
  {
    tag: "Legal",
    title: "Legal & Immigration Help",
    desc: "Trusted organizations that can guide you through the process.",
  },
  {
    tag: "Work",
    title: "Jobs & Training",
    desc: "Job boards, certifications, and career support.",
  },
];

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
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

// Flag-inspired black / white / red bar
const Tricolor = ({ className = "" }: { className?: string }) => (
  <div className={`flex h-1 overflow-hidden ${className}`}>
    <span className="flex-1 bg-foreground" />
    <span className="flex-1 bg-white ring-1 ring-inset ring-foreground/10" />
    <span className="flex-1 bg-primary" />
  </div>
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
  <div data-reveal className="max-w-2xl">
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

/* ---------- Page sections ---------- */

export default function HomeSections() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single elements fade up as they enter the viewport
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // Cards / rows stagger in together
      gsap.set("[data-card]", { opacity: 0, y: 32 });
      ScrollTrigger.batch("[data-card]", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "all",
          }),
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="text-foreground font-sans">
      {/* ================= SERVICES ================= */}
      <section id="services" className="px-6 md:px-16 lg:px-24 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="What we do"
            title="Services for every"
            highlight="family"
            description="From your first week in Hamilton to building a life here, we're a community that shows up for one another."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <a
                key={s.title}
                href="#"
                data-card
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-foreground/15 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/40 hover:shadow-xl"
              >
                <Tricolor className="absolute inset-x-0 top-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                <span className="text-sm font-semibold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-xl font-bold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 leading-relaxed text-foreground/70">
                  {s.desc}
                </p>
                <span className="mt-6 flex items-center gap-2 text-sm font-semibold">
                  Learn more <Arrow />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EVENTS ================= */}
      <section id="events" className="bg-foreground text-white">
        <div className="mx-auto max-w-6xl px-6 md:px-16 lg:px-24 py-20 md:py-28">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              dark
              eyebrow="Gather with us"
              title="Upcoming"
              highlight="events"
              description="Celebrations, workshops, and get-togethers. Everyone is welcome."
            />
            <a
              href="#"
              data-reveal
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold transition-all duration-300 hover:border-white hover:bg-white/10 active:scale-95"
            >
              View all events <Arrow />
            </a>
          </div>

          <div className="mt-14 divide-y divide-white/15 border-y border-white/15">
            {events.map((e) => (
              <a
                key={e.title}
                href="#"
                data-card
                className="group grid grid-cols-[auto_1fr] items-center gap-5 py-6 transition-colors hover:bg-white/5 md:grid-cols-[auto_1fr_auto] md:gap-10 md:px-4"
              >
                <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl border border-white/20 leading-none transition-colors duration-300 group-hover:border-primary group-hover:bg-primary md:h-20 md:w-20">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/60 group-hover:text-white">
                    {e.month}
                  </span>
                  <span className="mt-1 text-2xl font-extrabold md:text-3xl">
                    {e.day}
                  </span>
                </div>

                <div>
                  <span className="inline-block rounded-full border border-white/25 px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-widest text-white/70">
                    {e.tag}
                  </span>
                  <h3 className="mt-2 text-lg font-bold tracking-tight md:text-2xl">
                    {e.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/60">
                    {e.time} · {e.place}
                  </p>
                </div>

                <span className="hidden items-center gap-2 text-sm font-semibold md:flex">
                  Details <Arrow />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RESOURCES ================= */}
      <section id="resources" className="px-6 md:px-16 lg:px-24 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="self-start lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Helpful links"
              title="Resources to guide"
              highlight="your way"
              description="Trusted information and organizations to help you settle in, stay healthy, and get ahead."
            />
          </div>

          <div className="border-t border-foreground/15">
            {resources.map((r) => (
              <a
                key={r.title}
                href="#"
                data-card
                className="group flex items-center justify-between gap-6 border-b border-foreground/15 py-6 transition-all duration-300 hover:border-primary hover:pl-3"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {r.tag}
                  </span>
                  <h3 className="mt-1 text-lg font-bold tracking-tight md:text-xl">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-sm text-foreground/70">{r.desc}</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-foreground/20 transition-colors duration-300 group-hover:bg-foreground group-hover:text-white">
                  <Arrow />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT / CTA ================= */}
      <section id="contact" className="bg-primary text-white">
        <div className="mx-auto max-w-6xl px-6 md:px-16 lg:px-24 py-20 md:py-28">
          <div data-reveal className="max-w-3xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 md:text-sm">
              <span className="h-px w-8 bg-white/50" />
              Get involved
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
              Be part of something bigger than yourself.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Whether you&apos;re new to the city or have called it home for years,
              there&apos;s a place for you here.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#"
                className="rounded-full bg-white px-7 py-3 text-center text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
              >
                Join the community
              </a>
              <a
                href="#"
                className="rounded-full border border-white/40 px-7 py-3 text-center text-sm font-semibold transition-all duration-300 hover:border-white hover:bg-white/10 active:scale-95"
              >
                Volunteer with us
              </a>
            </div>
          </div>

          <div
            data-reveal
            className="mt-16 grid gap-8 border-t border-white/25 pt-8 sm:grid-cols-3"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Email
              </p>
              <p className="mt-2 font-semibold">info@yourdomain.ca</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Location
              </p>
              <p className="mt-2 font-semibold">Hamilton, Ontario</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Follow us
              </p>
              <p className="mt-2 font-semibold">@yourhandle</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}