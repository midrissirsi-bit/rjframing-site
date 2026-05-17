"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Cap = {
  num: string;
  title: ReactNode;
  desc: string;
  image: string;
  recent: string;
  recentMeta: string;
};

const caps: Cap[] = [
  {
    num: "01 / WOOD",
    title: (<><em>Wood</em> Framing</>),
    desc: "Custom homes, additions, second-storey builds. Stud walls, floor joists, top plates, rafters - full residential framing from foundation to roof. We work from your architect's drawings or rough it out with you on site.",
    image: "/images/hero-vaughan.png",
    recent: "Vaughan custom",
    recentMeta: "4,800 sqft / 11-day frame",
  },
  {
    num: "02 / STEEL FRAME",
    title: (<><em>Steel</em> Framing</>),
    desc: "Steel-stud framing for commercial buildouts, multi-storey, and fire-rated assemblies. Faster than wood for high partition counts, dead-flat walls every time. Pre-engineered or shop-cut to spec.",
    image: "/images/hero-barrie.png",
    recent: "Barrie retail buildout",
    recentMeta: "4,500 sqft / 3-week turnover",
  },
  {
    num: "03 / STRUCTURE",
    title: (<>Steel Beams <em>&amp; Columns</em></>),
    desc: "W-flange beams, HSS columns, moment frames. Installed to engineering spec, signed off, ready for inspection. We pull the open-concept jobs that scare other crews - the kind that hold up half a house on one beam.",
    image: "/images/hero-richmond.png",
    recent: "Richmond Hill moment frame",
    recentMeta: "W14 beam / HSS columns",
  },
  {
    num: "04 / BACK FRAMING",
    title: (<><em>Back</em> Framing</>),
    desc: "Renovation work and tie-ins. Backing for fixtures, blocking, structural reinforcement on existing builds. The detail framing that makes the next trade's job clean.",
    image: "/images/hero-aurora.png",
    recent: "Aurora heritage tie-in",
    recentMeta: "Rear addition / 3 steel beams",
  },
];

export function Capabilities() {
  const headRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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
    const items = listRef.current?.querySelectorAll(".cap-row") ?? [];
    items.forEach((item) => {
      ScrollTrigger.create({
        trigger: item as Element,
        start: "top 82%",
        once: true,
        onEnter: () => item.classList.add("lit"),
      });
    });
  }, []);

  return (
    <section id="services" className="bg-bg px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-[1480px]">
        <div ref={headRef} className="reveal-up mb-16 grid grid-cols-1 gap-5 md:grid-cols-[200px_1fr] md:gap-16">
          <div className="flex flex-col gap-2.5 pt-4">
            <span className="mono-label">002</span>
            <span className="mono-label bright">Capabilities</span>
          </div>
          <h2 className="display max-w-[18ch]" style={{ fontSize: "clamp(40px, 5.5vw, 84px)", lineHeight: 0.96 }}>
            Four <em>specialties.</em>
            <br />One crew. Square corners.
          </h2>
        </div>

        <div ref={listRef} className="flex flex-col border-t border-line">
          {caps.map((c) => (
            <article
              key={c.num}
              className="cap-row reveal-up group relative grid items-stretch gap-6 border-b border-line py-10 md:grid-cols-[80px_240px_1.4fr_220px] md:gap-8 md:py-14 overflow-hidden transition-colors"
            >
              {/* Number tag */}
              <span className="font-mono text-[11px] tracking-[0.18em] text-bone-mute md:pt-2">
                {c.num}
              </span>

              {/* Thumbnail with subtle blueprint corner ticks */}
              <a href="#work" className="relative block aspect-[4/3] w-full overflow-hidden rounded-sm border border-line bg-bg-elev transition-all duration-500 hover:border-brand/40">
                <img
                  src={c.image}
                  alt={`${c.recent} - RJ Framing`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                  style={{ filter: "grayscale(0.2) brightness(0.9)" }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-brand/70" />
                <span className="pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 border-r border-t border-brand/70" />
                <span className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-brand/70" />
                <span className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-brand/70" />
              </a>

              {/* Title + description */}
              <div className="flex flex-col gap-4">
                <h3 className="display" style={{ fontSize: "clamp(28px, 3.4vw, 48px)", lineHeight: 1 }}>
                  {c.title}
                </h3>
                <p className="max-w-[52ch] text-bone-dim leading-relaxed">{c.desc}</p>
              </div>

              {/* Recent project tag */}
              <div className="flex flex-col gap-2 md:justify-end md:pb-2 md:pl-6 md:border-l md:border-line">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-mute">
                  Recent
                </span>
                <span className="font-display text-xl text-bone leading-tight" style={{ fontVariationSettings: "'opsz' 36" }}>
                  {c.recent}
                </span>
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-brand/80">
                  {c.recentMeta}
                </span>
                <a href="#work" className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-bone-dim transition-colors hover:text-brand w-fit">
                  View the work
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M5 19 L19 5 M19 5 H8 M19 5 V16" strokeLinecap="square" />
                  </svg>
                </a>
              </div>

              {/* Hover gradient sweep */}
              <div
                className="absolute bottom-0 left-0 right-0 top-full bg-gradient-to-b from-brand/[0.04] to-transparent transition-all duration-500 group-hover:top-0 pointer-events-none"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
