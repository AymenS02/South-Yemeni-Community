import React from "react";
import Link from "next/link";

const explore = [
  { label: "Services", href: "/#services" },
  { label: "Events", href: "/#events" },
  { label: "Resources", href: "/#resources" },
  { label: "Contact", href: "/#contact" },
];

const getInvolved = [
  { label: "Join the community", href: "#" },
  { label: "Volunteer with us", href: "#" },
  { label: "Donate", href: "#" },
];

const linkStyle =
  "text-white/60 transition-colors duration-300 hover:text-white";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white/60">
      {/* Flag-inspired black / white / red bar */}
      <div className="flex h-1.5">
        <span className="flex-1 bg-foreground ring-1 ring-inset ring-white/15" />
        <span className="flex-1 bg-white" />
        <span className="flex-1 bg-primary" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 md:px-16 lg:px-24">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <svg
                viewBox="0 0 100 100"
                className="h-8 w-8 rotate-[50deg] text-primary"
                fill="currentColor"
                aria-hidden="true"
              >
                <polygon points="50,0 61.8,33.8 97.6,34.5 69,56.2 79.4,90.5 50,70 20.6,90.5 31,56.2 2.4,34.5 38.2,33.8" />
              </svg>
              <p className="text-lg font-extrabold leading-tight tracking-tight text-white">
                South Yemeni Community
                <span className="block text-accent">of Hamilton</span>
              </p>
            </div>
            <div className="mt-5 h-1 w-12 rounded-full bg-accent" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              A place for neighbours, families, and newcomers to connect,
              celebrate our heritage, and support one another.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-white">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {explore.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkStyle}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get involved */}
          <nav aria-label="Get involved">
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-white">
              Get involved
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {getInvolved.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkStyle}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-white">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href="mailto:info@yourdomain.ca" className={linkStyle}>
                  info@yourdomain.ca
                </a>
              </li>
              <li>Hamilton, Ontario</li>
              <li>
                <a href="#" className={linkStyle}>
                  @yourhandle
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs md:flex-row">
          <p>
            © {new Date().getFullYear()} South Yemeni Community of Hamilton. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className={linkStyle}>
              Privacy
            </Link>
            <Link href="#" className={linkStyle}>
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;