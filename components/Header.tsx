"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { GSDevTools } from "gsap/GSDevTools";

gsap.registerPlugin(GSDevTools);

const Header = () => {
  const containerRef = useRef<HTMLElement>(null);
  const navRefs = useRef<HTMLDivElement[]>([]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !navRefs.current.includes(el)) {
      navRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.7,
        defaults: {
          duration: 0.8,
          ease: "power2.out",
        },
      });

      tl.from(navRefs.current, {
        xPercent: -120,
        stagger: 0.08,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const onHoverEnter = (el: HTMLDivElement) => {
    const tl = gsap.timeline();

    tl.to(el, {
      yPercent: -120,
      duration: 0.15,
      ease: "power2.in",
    })
    .set(el, {
      yPercent: 120,
    })
    .to(el, {
      yPercent: 0,
      duration: 0.15,
      ease: "power2.out",
    });
  };

  return (
    <header
      ref={containerRef}
      className="fixed top-0 left-0 right-0 z-10 text-foreground flex items-center justify-center md:gap-20 gap-6 p-4 mt-4"
    >
      <div className="overflow-hidden cursor-pointer">
        <div
          ref={addToRefs}
          onMouseEnter={(e) => onHoverEnter(e.currentTarget)}
          className="text-[clamp(0.875rem,1vw+0.5rem,1.125rem)] font-bold text-foreground"
        >
          Services
        </div>
      </div>
      <div className="overflow-hidden cursor-pointer">
        <div
          ref={addToRefs}
          onMouseEnter={(e) => onHoverEnter(e.currentTarget)}
          className="text-[clamp(0.875rem,1vw+0.5rem,1.125rem)] font-bold text-foreground"
        >
          Events
        </div>
      </div>
      <div className="overflow-hidden cursor-pointer">
        <div
          ref={addToRefs}
          onMouseEnter={(e) => onHoverEnter(e.currentTarget)}
          className="text-[clamp(0.875rem,1vw+0.5rem,1.125rem)] font-bold text-foreground"
        >
          Contact
        </div>
      </div>
    </header>
  );
};

export default Header;