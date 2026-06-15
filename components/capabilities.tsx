"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Cap = {
  num: string;
  shortLabel: string;       // collapsed vertical label
  titlePre: string;         // word before italic, optional
  titleEm: string;          // italic emphasis word
  titlePost: string;        // word after italic, optional
  desc: string;
  image: string;
  imagePos?: string;
  recent: string;
};

const caps: Cap[] = [
  {
    num: "01",
    shortLabel: "WOOD",
    titlePre: "",
    titleEm: "Wood",
    titlePost: "Framing",
    desc: "Custom homes, additions, renovations. From foundation to roof.",
    image: "/images/project-10-forest.jpg",
    recent: "Hoggs Hollow, Toronto",
  },
  {
    num: "02",
    shortLabel: "STEEL FRAME",
    titlePre: "",
    titleEm: "Steel",
    titlePost: "Framing",
    desc: "Steel-stud framing for commercial buildouts, multiplexes, and fire-rated assemblies.",
    image: "/images/project-06-wood-steel.jpg",
    recent: "Project Norcross",
  },
  {
    num: "03",
    shortLabel: "STRUCTURE",
    titlePre: "Steel Beams ",
    titleEm: "& Columns",
    titlePost: "",
    desc: "W-flange beams, HSS columns, moment frames. Installed to engineering spec, signed off, ready for inspection.",
    image: "/images/project-12-steel-beams.jpg",
    imagePos: "center bottom",
    recent: "Project Glengrove",
  },
  {
    num: "04",
    shortLabel: "BACK FRAMING",
    titlePre: "",
    titleEm: "Back",
    titlePost: "Framing",
    desc: "Bulkheads around mechanical services and specialty ceiling details.",
    image: "/images/project-05-interior-joists.jpg",
    recent: "Project Lakeshore",
  },
];

export function Capabilities() {
  const headRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [openMobile, setOpenMobile] = useState<number>(0);

  useEffect(() => {
    if (headRef.current) {
      gsap.fromTo(
        headRef.current.querySelector("h2"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 80%", once: true },
        },
      );
    }
  }, []);

  // Mobile: auto open/close the panel centered in the viewport as you scroll
  // (the touch equivalent of the desktop hover-expand). Exactly one stays open,
  // so the list height is constant and the scroll never jumps.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(max-width: 767px)").matches) return;
    const root = mobileRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-cap-index]"));
    if (!cards.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.capIndex);
            if (!Number.isNaN(idx)) setOpenMobile(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section id="services" className="bg-bg px-6 py-16 md:px-16 md:py-32">
      <div className="mx-auto max-w-[1480px]">
        <div ref={headRef} className="mb-16 grid grid-cols-1 gap-5 md:grid-cols-[200px_1fr] md:gap-16">
          <div className="flex flex-col gap-2.5 pt-4">
            <span className="mono-label">002</span>
            <span className="mono-label bright">Capabilities</span>
          </div>
          <div>
            <h2 className="display max-w-[18ch]" style={{ fontSize: "clamp(40px, 5.5vw, 84px)", lineHeight: 0.96 }}>
              Four <em>specialties.</em>
              <br />One company. Square corners.
            </h2>
            <p className="mt-4 hidden md:block font-mono text-[10px] tracking-[0.2em] uppercase text-bone-mute">
              Hover a panel to expand
            </p>
          </div>
        </div>

        {/* Desktop: horizontal accordion of 4 expanding panels */}
        <div
          className="hidden md:flex gap-1 h-[640px] rounded-sm overflow-hidden"
          onMouseLeave={() => setActive(null)}
        >
          {caps.map((c, i) => {
            const isActive = active === i;
            const isOtherActive = active !== null && !isActive;
            return (
              <div
                key={c.num}
                onMouseEnter={() => setActive(i)}
                className="cap-panel relative overflow-hidden cursor-pointer border border-line"
                style={{
                  flex: isActive ? 5 : isOtherActive ? 0.6 : 1.2,
                  transition: "flex 0.8s cubic-bezier(.22, .61, .36, 1)",
                }}
              >
                {/* Background image */}
                <Image
                  src={c.image}
                  alt={`${c.titlePre}${c.titleEm}${c.titlePost ? " " + c.titlePost : ""} — RJ Framing custom framing project, ${c.recent}, Greater Toronto Area`}
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover transition-transform duration-1000 ease-out"
                  style={{
                    filter: isActive ? "grayscale(0) brightness(1.05)" : "grayscale(0.4) brightness(0.5)",
                    transform: isActive ? "scale(1.03)" : "scale(1.0)",
                    objectPosition: c.imagePos ?? "center",
                  }}
                />
                {/* Darken gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 pointer-events-none transition-opacity duration-700" style={{ opacity: isActive ? 0.55 : 1 }} />
                {/* Side cyan rail when active */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-px transition-all duration-700"
                  style={{
                    background: isActive ? "#29c5e8" : "transparent",
                    boxShadow: isActive ? "0 0 18px rgba(41,197,232,0.6)" : "none",
                  }}
                />
                {/* Blueprint corner ticks */}
                <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-brand/70" />
                <span className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-brand/70" />
                <span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-brand/70" />
                <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-brand/70" />

                {/* Collapsed state: number + vertical label at bottom */}
                <div
                  className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none"
                  style={{
                    opacity: isActive ? 0 : 1,
                    transition: "opacity 0.4s ease",
                  }}
                >
                  <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-bone-mute">
                    {c.num}
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-brand">
                      {c.shortLabel}
                    </span>
                  </div>
                </div>

                {/* Expanded state: full content */}
                <div
                  className="absolute inset-0 flex flex-col justify-between p-8 lg:p-10 pointer-events-none"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.5s ease 0.2s",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-brand">
                      {c.num} / {c.shortLabel}
                    </span>
                    <div className="text-right">
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-mute">Recent</span>
                      <div className="font-display text-xl text-bone leading-tight mt-1" style={{ fontVariationSettings: "'opsz' 36" }}>
                        {c.recent}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 max-w-[44ch]">
                    <h3 className="display text-bone" style={{ fontSize: "clamp(40px, 4.5vw, 64px)", lineHeight: 1 }}>
                      {c.titlePre}
                      <em className="not-italic" style={{ fontStyle: "italic", color: "#29c5e8", fontVariationSettings: "'opsz' 144, 'WONK' 1" }}>
                        {c.titleEm}
                      </em>
                      {c.titlePost && <> {c.titlePost}</>}
                    </h3>
                    <p className="text-bone-dim leading-relaxed text-[15px]">{c.desc}</p>
                    <a href="#work" className="mt-2 inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] uppercase text-bone hover:text-brand transition-colors w-fit pointer-events-auto">
                      View the work
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M5 19 L19 5 M19 5 H8 M19 5 V16" strokeLinecap="square" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: scroll-driven accordion — the centered panel auto-opens,
            mirroring the desktop hover-expand. Tap still works as an override. */}
        <div ref={mobileRef} className="md:hidden flex flex-col gap-4">
          {caps.map((c, i) => {
            const isOpen = openMobile === i;
            return (
              <article
                key={c.num}
                data-cap-index={i}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 0.07}s`, borderColor: isOpen ? "rgba(41,197,232,0.4)" : "#232a36" }}
                className="relative overflow-hidden rounded-sm border bg-bg-elev transition-colors duration-500"
              >
                <button
                  type="button"
                  onClick={() => setOpenMobile(i)}
                  aria-expanded={isOpen}
                  className="block w-full text-left"
                >
                  <div
                    className="relative w-full overflow-hidden transition-[height] duration-700"
                    style={{ height: isOpen ? 248 : 128, transitionTimingFunction: "cubic-bezier(.4, 0, .2, 1)" }}
                  >
                    <Image
                      src={c.image}
                      alt={`${c.titlePre}${c.titleEm}${c.titlePost ? " " + c.titlePost : ""} — RJ Framing custom framing project, ${c.recent}, Greater Toronto Area`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-all duration-[900ms] ease-[cubic-bezier(.4,0,.2,1)]"
                      style={{
                        filter: isOpen ? "grayscale(0) brightness(1.02)" : "grayscale(0.5) brightness(0.6)",
                        transform: isOpen ? "scale(1.05)" : "scale(1)",
                        objectPosition: c.imagePos ?? "center",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 transition-opacity duration-500" style={{ opacity: isOpen ? 0.7 : 1 }} />
                    <div className="absolute left-0 top-0 bottom-0 w-px transition-all duration-500" style={{ background: isOpen ? "#29c5e8" : "transparent", boxShadow: isOpen ? "0 0 18px rgba(41,197,232,0.7)" : "none" }} />
                    <span className="pointer-events-none absolute left-3 top-3 h-2.5 w-2.5 border-l border-t border-brand/60" />
                    <span className="pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 border-r border-t border-brand/60" />
                    <span className="pointer-events-none absolute bottom-3 left-3 h-2.5 w-2.5 border-b border-l border-brand/60" />
                    <span className="pointer-events-none absolute bottom-3 right-3 h-2.5 w-2.5 border-b border-r border-brand/60" />

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                      <div className="min-w-0">
                        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-brand">{c.num} / {c.shortLabel}</span>
                        <h3 className="display mt-1.5" style={{ fontSize: "clamp(26px, 7vw, 38px)", lineHeight: 1 }}>
                          {c.titlePre}
                          <em className="not-italic" style={{ fontStyle: "italic", color: "#29c5e8" }}>{c.titleEm}</em>
                          {c.titlePost && <> {c.titlePost}</>}
                        </h3>
                      </div>
                      <span
                        aria-hidden
                        className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand/50 text-brand transition-transform duration-500"
                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                      >
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M12 5v14M5 12h14" strokeLinecap="square" /></svg>
                      </span>
                    </div>
                  </div>
                </button>

                <div className="cap-body" data-open={isOpen}>
                  <div className="cap-body-inner">
                    <div className="flex flex-col gap-3 p-6 pt-5">
                      <p className="text-bone-dim text-[15px] leading-relaxed">{c.desc}</p>
                      <div className="mt-1 flex items-center justify-between border-t border-line pt-4">
                        <div>
                          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-mute">Recent</span>
                          <div className="font-display text-base text-bone mt-1">{c.recent}</div>
                        </div>
                        <a href="#work" className="-my-1.5 inline-block py-3 font-mono text-[10px] tracking-[0.2em] uppercase text-brand">View work &rarr;</a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
