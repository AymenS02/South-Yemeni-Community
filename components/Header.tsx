"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const links = ["Services", "Events", "Contact"];

const Header = () => {
  const containerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navRefs = useRef<HTMLSpanElement[]>([]);

  const addToRefs = (el: HTMLSpanElement | null) => {
    if (el && !navRefs.current.includes(el)) {
      navRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRefs.current, {
        xPercent: -120,
        stagger: 0.08,
        delay: 0.7,
        duration: 0.8,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hover lives on the pill; the text inside is what rolls
  const onHoverEnter = (pill: HTMLElement) => {
    const text = pill.firstElementChild;
    if (!text || gsap.isTweening(text)) return;

    gsap
      .timeline()
      .to(text, { yPercent: -120, duration: 0.15, ease: "power2.in" })
      .set(text, { yPercent: 120 })
      .to(text, { yPercent: 0, duration: 0.15, ease: "power2.out" });
  };

  return (
    <header
      ref={containerRef}
      className="fixed z-10 text-foreground flex items-center top-0 left-0 right-0 justify-center md:gap-6 gap-3 p-4 mt-4"
    >
      {links.map((label) => (
        <div
          key={label}
          onMouseEnter={(e) => onHoverEnter(e.currentTarget)}
          onClick={() => {
          }}
          className="
            overflow-hidden cursor-pointer rounded-full
            border border-foreground/20 bg-foreground/[0.03] backdrop-blur-sm
            transition-all duration-300 ease-out
            hover:border-foreground/60 hover:bg-foreground/10
            active:scale-95
          "
        >
          <span
            ref={addToRefs}
            className="
              block px-5 py-2 tracking-wide
              text-[clamp(0.875rem,1vw+0.5rem,1.125rem)] font-semibold text-foreground
            "
          >
            {label}
          </span>
        </div>
      ))}
    </header>
  );
};

export default Header;