"use client";

import { useEffect, useState } from "react";

/* Phone-only action bar. Shows once the hero has scrolled away, and gets out of
   the way while the quote form (or anything below it) is on screen. Driven by
   IntersectionObserver, not a scroll listener. */
export function MobileCta() {
  const [pastHero, setPastHero] = useState(false);
  const [atForm, setAtForm] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const form = document.getElementById("contact");
    const observers: IntersectionObserver[] = [];

    if (hero) {
      const io = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0), {
        rootMargin: "0px 0px -60% 0px",
      });
      io.observe(hero);
      observers.push(io);
    }
    if (form) {
      const io = new IntersectionObserver(([e]) => setAtForm(e.isIntersecting || e.boundingClientRect.top < 0));
      io.observe(form);
      observers.push(io);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const show = pastHero && !atForm;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line px-4 pt-2.5 transition-transform duration-300 ease-out md:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
      style={{ background: "rgba(6,7,9,0.96)", paddingBottom: "calc(10px + env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
    >
      <p className="mb-2 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-mute">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
        We reply within 24 hours
      </p>
      <div className="grid grid-cols-[1fr_1.4fr] gap-2.5">
        <a
          href="tel:+12896885951"
          tabIndex={show ? 0 : -1}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-bone/70 font-mono text-[12px] uppercase tracking-[0.16em] text-bone active:scale-[0.98]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" strokeLinejoin="round" />
          </svg>
          Call
        </a>
        <a
          href="#contact"
          tabIndex={show ? 0 : -1}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand font-mono text-[12px] uppercase tracking-[0.16em] text-bg active:scale-[0.98]"
        >
          Get a quote
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
            <path d="M5 19 L19 5 M19 5 H8 M19 5 V16" strokeLinecap="square" />
          </svg>
        </a>
      </div>
    </div>
  );
}
