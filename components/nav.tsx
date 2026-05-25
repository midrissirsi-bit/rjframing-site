"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#work", label: "Portfolio" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 h-16 md:h-24 text-bone backdrop-blur-md"
        style={{ background: "rgba(13,18,25,0.6)", borderBottom: "1px solid rgba(35,42,54,0.5)" }}
      >
        <a href="#top" className="flex items-center h-full" onClick={() => setOpen(false)}>
          <img
            src="/images/logo.png"
            alt="RJ Framing"
            className="h-full w-auto"
            style={{
              mixBlendMode: "screen",
              filter: "drop-shadow(0 0 6px rgba(41,197,232,0.2))",
            }}
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone-dim hover:text-bone transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2.5 rounded-full border border-bone px-4 py-2.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-all duration-300 hover:bg-bone hover:text-bg"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" style={{ boxShadow: "0 0 8px #29c5e8" }} />
          Get a quote
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="md:hidden relative z-[60] inline-flex flex-col justify-center gap-[6px] h-10 w-10 -mr-2"
        >
          <span
            className="block h-px w-7 bg-bone transition-transform duration-300 ease-out mx-auto"
            style={{ transform: open ? "translateY(7px) rotate(45deg)" : "none" }}
          />
          <span
            className="block h-px w-7 bg-bone transition-opacity duration-200 mx-auto"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block h-px w-7 bg-bone transition-transform duration-300 ease-out mx-auto"
            style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-500 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(6,7,9,0.97)", backdropFilter: "blur(14px)" }}
        onClick={() => setOpen(false)}
      >
        <div
          className="flex flex-col items-start gap-7 px-6 pt-24 pb-16"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-mute">Menu</span>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="display text-bone leading-[1]"
              style={{ fontSize: "clamp(40px, 11vw, 60px)" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-bone px-6 py-3.5 font-mono text-[12px] tracking-[0.2em] uppercase"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" style={{ boxShadow: "0 0 8px #29c5e8" }} />
            Get a quote
          </a>
        </div>
      </div>
    </>
  );
}
