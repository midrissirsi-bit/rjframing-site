"use client";

import { useEffect } from "react";

/**
 * Lightweight global scroll-reveal. Any element marked with `data-reveal`
 * starts hidden (see globals.css) and animates in the first time it enters
 * the viewport. Stagger via inline `style={{ "--reveal-delay": "0.1s" }}`.
 *
 * Intentionally separate from the GSAP entrances on Manifesto / Capabilities
 * heading / Stats so those are never double-animated.
 */
export function ScrollFX() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Reveal everything immediately when motion is off or IntersectionObserver
    // is unavailable. Otherwise reveal each element only as it scrolls into view
    // (no blanket timer — that pre-revealed lower sections before you reached them).
    if (reduce || typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.setAttribute("data-shown", ""));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-shown", "");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
