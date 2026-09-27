"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const containerRef = useRef<HTmrDivElement>(null);
  const headerRefs = useRef<HTmrHeadingElement[]>([]);
  const stripeRefs = useRef<HTmrDivElement[]>([]);

  const addToRefs = (el: HTmrHeadingElement | null) => {
    if (el && !headerRefs.current.includes(el)) {
      headerRefs.current.push(el);
    }
  };

  const addStripeRef = (el: HTmrDivElement | null) => {
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
            // Stripes are now vertical bands (flex-row layout below).
            // Each band still drops down from the top, staggered left-to-right.
            tl.from(stripeRefs.current, {
              scaleY: 0,
              transformOrigin: "top center",
              stagger: 0.15,
              duration: 0.9,
            });
          } else {
            // Desktop: horizontal bands, unfurl left to right
            tl.from(stripeRefs.current, {
              scaleX: 0,
              transformOrigin: "left center",
              stagger: 0.15,
              duration: 0.9,
            });
          }

          tl.from(
            headerRefs.current,
            {
              yPercent: 120,
              stagger: 0.05,
              duration: 1,
              ease: "power4.out",
            },
            "-=0.3"
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
      <div className="absolute inset-0 flex flex-col max-md:flex-row z-0">
        <div ref={addStripeRef} className="flex-1 bg-primary" />
        <div ref={addStripeRef} className="flex-1 bg-white" />
        <div ref={addStripeRef} className="flex-1 bg-foreground" />
      </div>

      {/* Text content on top */}
      <div className="relative z-10 md:mr-[clamp(1rem,5vw,5rem)] flex flex-col gap-2 md:gap-[clamp(0.5rem,1vw,1rem)] max-md:items-center items-end justify-center">

        <div className="md:hidden absolute -z-2 bg-white p-[80] border-2 border-foreground w-screen" />
        <div className="overflow-hidden">
          <h1
            ref={addToRefs}
            className=" max-md:text-sm text-[clamp(1.5rem,2vw+1rem,2.25rem)] font-bold text-foreground"
          >
            Welcome to the
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            ref={addToRefs}
            className="max-md:text-lg text-[clamp(2rem,4vw+1rem,4.5rem)] text-nowrap font-bold text-foreground"
          >
            South Yemeni Community of Hamilton
          </h1>
        </div>
      </div>
    </div>
  );
}