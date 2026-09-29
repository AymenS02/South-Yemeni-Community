"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Flag geometry lives in a fixed 300x400 coordinate space.
 * The SVG scales as one object, so proportions never change.
 *
 * Triangle: (0,0) (300,0) (150,240) -> centroid = (150, 80)
 * Star is generated around that centroid, tilted 50deg like before.
 */
const FLAG_W = 300;
const FLAG_H = 400;
const STAR_CX = 150;
const STAR_CY = 80;

const STAR_POINTS = Array.from({ length: 10 }, (_, i) => {
  const outer = 34;
  const inner = 13;
  const angle = ((-90 + 50 + i * 36) * Math.PI) / 180;
  const radius = i % 2 === 0 ? outer : inner;
  const x = STAR_CX + radius * Math.cos(angle);
  const y = STAR_CY + radius * Math.sin(angle);
  return `${x.toFixed(2)},${y.toFixed(2)}`;
}).join(" ");

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const flagWrapRef = useRef<HTMLDivElement>(null);
  const headerRefs = useRef<HTMLElement[]>([]);
  const stripeRefs = useRef<SVGRectElement[]>([]);
  const starRef = useRef<SVGPolygonElement>(null);
  const triangleRef = useRef<SVGPolygonElement>(null);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !headerRefs.current.includes(el)) {
      headerRefs.current.push(el);
    }
  };

  const addStripeRef = (el: SVGRectElement | null) => {
    if (el && !stripeRefs.current.includes(el)) {
      stripeRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          delay: 0.2,
          defaults: { duration: 1, ease: "power3.out" },
        });

        // Flag glow fades in first
        tl.from("[data-glow]", { opacity: 0, scale: 0.8, duration: 1.4 });

        // Stripes unroll from the top
        tl.from(
          stripeRefs.current,
          {
            scaleY: 0,
            transformOrigin: "50% 0%",
            stagger: 0.15,
            duration: 0.9,
          },
          "-=1.1"
        );

        // Triangle drops in from above (clipped by the flag)
        tl.from(
          triangleRef.current,
          { y: -FLAG_H * 0.6, duration: 1 },
          "-=0.5"
        );

        // Star spins + pops in at the triangle's centroid
        tl.from(
          starRef.current,
          {
            scale: 0,
            rotation: -120,
            svgOrigin: `${STAR_CX} ${STAR_CY}`,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        );

        // Text lines roll up
        tl.from(
          headerRefs.current,
          {
            yPercent: 120,
            stagger: 0.08,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.9"
        );

        // Accent divider draws in
        tl.from(
          "[data-line]",
          { scaleX: 0, transformOrigin: "left center", duration: 0.6 },
          "-=0.6"
        );

        // Copy + buttons fade up
        tl.from(
          "[data-reveal]",
          { opacity: 0, y: 16, stagger: 0.12, duration: 0.7 },
          "-=0.4"
        );

        // Scroll cue
        tl.from("[data-scroll]", { opacity: 0, y: -8, duration: 0.6 }, "-=0.2");

        // Gentle idle float on the whole flag
        gsap.to(flagWrapRef.current, {
          y: -10,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 3,
        });

        // Scroll cue line pulse
        gsap.to("[data-scroll-line]", {
          scaleY: 0.4,
          transformOrigin: "top center",
          duration: 1.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-dvh w-full items-center overflow-hidden font-sans text-foreground"
    >

      {/* Content grid */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-20 pt-28 md:grid-cols-2 md:gap-8 md:pb-24 md:pt-32">
        {/* Text column */}
        <div className="order-2 flex flex-col items-center gap-4 text-center md:order-1 md:items-start md:gap-6 md:text-start">
          {/* Location badge */}
          <div className="overflow-hidden">
            <p
              ref={addToRefs}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-foreground/70 md:text-xs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Hamilton, Ontario
            </p>
          </div>

          {/* Headline */}
          <h1 className="font-extrabold leading-[1.05] tracking-tight">
            <span className="block overflow-hidden pb-1">
              <span
                ref={addToRefs}
                className="block text-sm font-semibold uppercase tracking-[0.3em] text-foreground/60 md:text-base"
              >
                Welcome to the
              </span>
            </span>
            <span className="block overflow-hidden pb-1 pt-2">
              <span
                ref={addToRefs}
                className="block text-4xl text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                South Yemeni
              </span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span
                ref={addToRefs}
                className="block text-4xl text-primary sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                Community
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span
                ref={addToRefs}
                className="block text-lg font-bold text-foreground/80 sm:text-xl lg:text-2xl"
              >
                of Hamilton
              </span>
            </span>
          </h1>

          {/* Accent divider */}
          <div
            data-line
            className="h-1 w-20 rounded-full bg-accent md:w-28"
          />

          {/* Intro copy */}
          <p
            data-reveal
            className="max-w-md text-sm leading-relaxed text-foreground/70 sm:text-base lg:text-lg"
          >
            A place for neighbors, families, and newcomers to connect,
            celebrate our heritage, and support one another.
          </p>

          {/* Calls to action */}
          <div
            data-reveal
            className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row"
          >
            <a
              href="#"
              className="rounded-full bg-primary px-7 py-3 text-center text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
            >
              Join the community
            </a>
            <a
              href="#"
              className="rounded-full border border-foreground/20 px-7 py-3 text-center text-sm font-semibold text-foreground transition-all duration-300 hover:border-foreground/60 hover:bg-foreground/5 active:scale-95"
            >
              Upcoming events
            </a>
          </div>
        </div>

        {/* Flag column */}
        <div className="order-1 flex justify-center md:order-2 md:justify-end lg:pe-6">
          <div
            ref={flagWrapRef}
            className="relative w-full max-w-[9rem] sm:max-w-[13rem] md:max-w-[17rem] lg:max-w-[22rem] xl:max-w-[26rem]"
          >


            {/* The flag: one SVG, fixed proportions, scales as a whole */}
            <svg
              viewBox={`0 0 ${FLAG_W} ${FLAG_H}`}
              className="relative block h-auto w-full"
              role="img"
              aria-label="South Yemeni flag"
            >
              <defs>
                <clipPath id="flag-clip">
                  <rect width={FLAG_W} height={FLAG_H} rx="16" />
                </clipPath>
              </defs>

              <g clipPath="url(#flag-clip)">
                {/* Three vertical bands */}
                <rect
                  ref={addStripeRef}
                  x="0"
                  y="0"
                  width="100"
                  height={FLAG_H}
                  className="fill-foreground"
                />
                <rect
                  ref={addStripeRef}
                  x="100"
                  y="0"
                  width="100"
                  height={FLAG_H}
                  className="fill-white"
                />
                <rect
                  ref={addStripeRef}
                  x="200"
                  y="0"
                  width="100"
                  height={FLAG_H}
                  className="fill-primary"
                />

                {/* Triangle hanging from the top edge */}
                <polygon
                  ref={triangleRef}
                  points={`0,0 ${FLAG_W},0 150,240`}
                  className="fill-accent"
                />

                {/* Star centered on the triangle's centroid */}
                <polygon
                  ref={starRef}
                  points={STAR_POINTS}
                  className="fill-primary"
                />
              </g>

              {/* Subtle outline */}
              <rect
                width={FLAG_W}
                height={FLAG_H}
                rx="16"
                strokeWidth="2"
                className="fill-none stroke-foreground/20"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-scroll
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-foreground/50 sm:flex"
      >
        Scroll
        <span data-scroll-line className="block h-8 w-px bg-foreground/40" />
      </div>
    </div>
  );
}