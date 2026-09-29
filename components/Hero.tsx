"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRefs = useRef<HTMLElement[]>([]);
  const stripeRefs = useRef<HTMLDivElement[]>([]);
  const starRef = useRef<SVGSVGElement>(null);
  const triangleRef = useRef<SVGSVGElement>(null);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !headerRefs.current.includes(el)) {
      headerRefs.current.push(el);
    }
  };

  const addStripeRef = (el: HTMLDivElement | null) => {
    if (el && !stripeRefs.current.includes(el)) {
      stripeRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };

          const tl = gsap.timeline({
            delay: 0.2,
            defaults: {
              duration: 1,
              ease: "power3.out",
            },
          });

          if (isMobile) {
            tl.from(stripeRefs.current, {
              scaleY: 0,
              transformOrigin: "top center",
              stagger: 0.15,
              duration: 0.9,
            });
            tl.from(
              triangleRef.current,
              {
                y: "-100vh",
                duration: 1,
              },
              "-=0.5"
            );
            tl.from(
              starRef.current,
              {
                scale: 0,
                transformOrigin: "center center",
                duration: 1,
              },
              "-=0.5"
            );
          } else {
            tl.from(stripeRefs.current, {
              scaleY: 0,
              transformOrigin: "top center",
              stagger: 0.15,
              duration: 0.9,
            });
            tl.from(
              triangleRef.current,
              {
                y: "-100vh",
                transformOrigin: "left center",
                duration: 1,
              },
              "-=0.5"
            );
            tl.from(
              starRef.current,
              {
                scale: 0,
                transformOrigin: "center center",
                duration: 1,
              },
              "-=0.5"
            );
          }

          // Text lines roll up (eyebrow, headline lines)
          tl.from(
            headerRefs.current,
            {
              yPercent: 120,
              stagger: 0.08,
              duration: 1,
              ease: "power4.out",
            },
            "-=0.3"
          );

          // Accent divider draws in
          tl.from(
            "[data-line]",
            {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.6,
            },
            "-=0.6"
          );

          // Intro copy + buttons fade up
          tl.from(
            "[data-reveal]",
            {
              opacity: 0,
              y: 16,
              stagger: 0.12,
              duration: 0.7,
            },
            "-=0.4"
          );
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative text-foreground min-h-screen flex flex-col max-md:items-center items-end justify-center font-sans overflow-hidden"
    >
      {/* Flag background layer — horizontal bands on desktop, vertical bands on mobile */}
      <div className="absolute inset-0 flex max-md:flex-row z-0 w-[50%] m-5 rounded-2xl border-foreground overflow-hidden">
        <div ref={addStripeRef} className="flex-1 bg-foreground" />
        <div ref={addStripeRef} className="flex-1 bg-white" />
        <div ref={addStripeRef} className="flex-1 bg-primary " />
        <svg
          ref={starRef}
          className="text-primary z-6 rotate-50 w-60 h-screen absolute -top-1/6 left-19/45"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <polygon
            points="
          50,0
          61.8,33.8
          97.6,34.5
          69,56.2
          79.4,90.5
          50,70
          20.6,90.5
          31,56.2
          2.4,34.5
          38.2,33.8
          "
          />
        </svg>
        <svg
          ref={triangleRef}
          className="text-accent z-4 h-screen absolute top-0 left-0 w-full"
          viewBox="0 0 100 100"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <polygon className="" points="0,0 100,0 50,60" />
        </svg>
      </div>

      {/* Text content on top */}
      <div className="relative z-10 flex flex-col w-[50%] gap-3 md:gap-5 items-center md:items-start justify-center text-center md:text-left md:px-10">
        {/* Eyebrow */}
        <div className="overflow-hidden">
          <p
            ref={addToRefs}
            className="flex items-center gap-3 text-[0.65rem] md:text-sm font-semibold uppercase tracking-[0.3em] text-foreground/70"
          >
            <span className="hidden md:block h-px w-8 bg-foreground/40" />
            Welcome to the
          </p>
        </div>

        {/* Headline */}
        <h1 className="font-extrabold tracking-tight leading-[1.05]">
          <span className="block overflow-hidden pb-1">
            <span
              ref={addToRefs}
              className="block max-md:text-lg text-[clamp(2rem,4vw+1rem,4.5rem)] text-foreground"
            >
              South Yemeni Community
            </span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span
              ref={addToRefs}
              className="block max-md:text-lg text-[clamp(2rem,4vw+1rem,4.5rem)] text-primary"
            >
              of Hamilton
            </span>
          </span>
        </h1>

        {/* Accent divider */}
        <div
          data-line
          className="h-1 w-16 md:w-24 rounded-full bg-accent"
        />

        {/* Intro copy (swap for your own wording) */}
        <p
          data-reveal
          className="hidden md:block max-w-md text-base lg:text-lg leading-relaxed text-foreground/70"
        >
          A place for neighbors, families, and newcomers to connect, celebrate
          our heritage, and support one another.
        </p>

        {/* Calls to action */}
        <div data-reveal className="flex max-md:flex-col gap-3 pt-2">
          <a
            href="#"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
          >
            Join the community
          </a>
          <a
            href="#"
            className="rounded-full border border-foreground/20 px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-foreground/60 hover:bg-foreground/5 active:scale-95"
          >
            Upcoming events
          </a>
        </div>
      </div>
    </div>
  );
}