"use client";

import { useEffect, useRef, useState } from "react";
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
  recent: string;
  recentMeta: string;
};

const caps: Cap[] = [
  {
    num: "01",
    shortLabel: "WOOD",
    titlePre: "",
    titleEm: "Wood",
    titlePost: "Framing",
    desc: "Custom homes, additions, second-storey builds. Stud walls, joists, plates, rafters - full residential framing from foundation to roof.",
    image: "/images/project-02-winter-frame.jpg",
    recent: "Vaughan custom",
    recentMeta: "4,800 sqft / 11-day frame",
  },
  {
    num: "02",
    shortLabel: "STEEL FRAME",
    titlePre: "",
    titleEm: "Steel",
    titlePost: "Framing",
    desc: "Steel-stud framing for commercial buildouts, multi-storey, and fire-rated assemblies. Faster than wood for high partition counts, dead-flat walls.",
    image: "/images/project-06-wood-steel.jpg",
    recent: "Commercial retail",
    recentMeta: "4,500 sqft / 3-week turnover",
  },
  {
    num: "03",
    shortLabel: "STRUCTURE",
    titlePre: "Steel Beams ",
    titleEm: "& Columns",
    titlePost: "",
    desc: "W-flange beams, HSS columns, moment frames. Installed to engineering spec, signed off, ready for inspection. Open-concept work other crews turn down.",
    image: "/images/project-12-steel-beams.jpg",
    recent: "Richmond Hill",
    recentMeta: "W14 beam / HSS columns",
  },
  {
    num: "04",
    shortLabel: "BACK FRAMING",
    titlePre: "",
    titleEm: "Back",
    titlePost: "Framing",
    desc: "Renovation work and tie-ins. Backing for fixtures, blocking, structural reinforcement on existing builds. Detail framing that makes the next trade's job clean.",
    image: "/images/project-05-interior-joists.jpg",
    recent: "Aurora heritage",
    recentMeta: "Rear addition / 3 steel beams",
  },
];

export function Capabilities() {
  const headRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

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

  return (
    <section id="services" className="bg-bg px-6 py-24 md:px-16 md:py-32">
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
                <img
                  src={c.image}
                  alt={`${c.recent} - RJ Framing`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out"
                  style={{
                    filter: isActive ? "grayscale(0) brightness(0.85)" : "grayscale(0.4) brightness(0.55)",
                    transform: isActive ? "scale(1.03)" : "scale(1.0)",
                  }}
                />
                {/* Darken gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 pointer-events-none" />
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
                      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-brand/80 mt-0.5">
                        {c.recentMeta}
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

        {/* Mobile: stacked vertical cards */}
        <div className="md:hidden flex flex-col gap-5">
          {caps.map((c) => (
            <article key={c.num} className="relative overflow-hidden border border-line bg-bg-elev rounded-sm">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img src={c.image} alt={`${c.recent} - RJ Framing`} className="absolute inset-0 h-full w-full object-cover" style={{ filter: "grayscale(0.2) brightness(0.9)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-brand">{c.num} / {c.shortLabel}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <h3 className="display" style={{ fontSize: "clamp(28px, 7vw, 40px)", lineHeight: 1 }}>
                  {c.titlePre}
                  <em className="not-italic" style={{ fontStyle: "italic", color: "#29c5e8" }}>{c.titleEm}</em>
                  {c.titlePost && <> {c.titlePost}</>}
                </h3>
                <p className="text-bone-dim text-[15px] leading-relaxed">{c.desc}</p>
                <div className="mt-2 flex items-center justify-between border-t border-line pt-3">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-mute">Recent</span>
                    <div className="font-display text-base text-bone mt-1">{c.recent}</div>
                  </div>
                  <a href="#work" className="font-mono text-[10px] tracking-[0.2em] uppercase text-brand">View work &rarr;</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
