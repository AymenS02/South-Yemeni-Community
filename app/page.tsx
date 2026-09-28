"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRefs = useRef<HTMLDivElement[]>([]);
  const stripeRefs = useRef<HTMLDivElement[]>([]);
  const starRef = useRef<SVGSVGElement>(null);
  const triangleRef = useRef<SVGSVGElement>(null);

  const addToRefs = (el: HTMLHeadingElement | null) => {
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
            // Stripes are now vertical bands (flex-row layout below).
            // Each band still drops down from the top, staggered left-to-right.
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
            tl.from(starRef.current, {
              scale: 0,
              transformOrigin: "center center",
              duration: 1,
            }, "-=0.5");
          } else {
            // Desktop: horizontal bands, unfurl left to right
            tl.from(stripeRefs.current, {
              scaleX: 0,
              transformOrigin: "left center",
              stagger: 0.15,
              duration: 0.9,
            });
            tl.from(
              triangleRef.current,
              {
                x: "-100vw",
                transformOrigin: "left center",
                duration: 1,
              },
              "-=0.5"
            );
            tl.from(starRef.current, {
              scale: 0,
              transformOrigin: "center center",
              duration: 1,
            }, "-=0.5");
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

  const triangleSVG = `
  <svg viewBox="0 0 100 100">
    <polygon points="50,0 0,100 100,100" />
  </svg>
  `;

  const starSVG = `
  <svg viewBox="0 0 100 100">
    <polygon points="
      50,0 
      61,35 
      98,35 
      68,57 
      79,100 
      50,75 
      21,100 
      32,57 
      2,35 
      39,35
    "/>
  </svg>
  `;

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
        <svg
          ref={starRef}
          className="text-primary z-6 w-60 rotate-25 h-screen absolute top-0 left-1/12"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <polygon points="
            50,0
            61.8,35.5
            100,38.2
            70.9,61.8
            81,100
            50,78
            19,100
            29.1,61.8
            0,38.2
            38.2,35.5
          "/>
        </svg>
        <svg
          ref={triangleRef}
          className="text-accent z-4 h-screen absolute top-0 left-0"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <polygon className="max-md:hidden" points="0,0 0,100 60,50" />
          <polygon className="md:hidden" points="0,0 100,0 50,60" />
        </svg>
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