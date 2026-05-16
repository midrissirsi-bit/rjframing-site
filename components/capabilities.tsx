"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const caps = [
  {
    num: "01 / WOOD",
    title: "Wood",
    em: "Framing",
    desc: "Custom homes, additions, second-storey builds. Stud walls, floor joists, top plates, rafters — full residential framing from foundation to roof. We work from your architect's drawings or rough it out with you on site.",
  },
  {
    num: "02 / STEEL FRAME",
    title: "Steel",
    em: "Framing",
    desc: "Steel-stud framing for commercial buildouts, multi-storey, and fire-rated assemblies. Faster than wood for high partition counts, dead-flat walls every time. Pre-engineered or shop-cut to spec.",
  },
  {
    num: "03 / STRUCTURE",
    title: "Steel Beams",
    em: "& Columns",
    desc: "W-flange beams, HSS columns, moment frames. Installed to engineering spec, signed off, ready for inspection. We pull the open-concept jobs that scare other crews — the kind that hold up half a house on one beam.",
  },
  {
    num: "04 / BACK FRAMING",
    title: "Back",
    em: "Framing",
    desc: "Renovation work and tie-ins. Backing for fixtures, blocking, structural reinforcement on existing builds. The detail framing that makes the next trade's job clean.",
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
              className="cap-row reveal-up grid items-center gap-6 border-b border-line py-8 md:grid-cols-[60px_1.6fr_2fr] md:gap-10 md:py-10 group relative overflow-hidden transition-colors"
            >
              <span className="font-mono text-[12px] tracking-[0.18em] text-bone-mute md:col-span-1">
                {c.num}
              </span>
              <h3 className="display" style={{ fontSize: "clamp(28px, 3.4vw, 48px)", lineHeight: 1 }}>
                {c.title} <em>{c.em}</em>
              </h3>
              <p className="max-w-[50ch] text-bone-dim leading-relaxed">{c.desc}</p>
              <div
                className="absolute bottom-0 left-0 right-0 top-full bg-gradient-to-b from-brand/[0.05] to-transparent transition-all duration-500 group-hover:top-0 pointer-events-none"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
