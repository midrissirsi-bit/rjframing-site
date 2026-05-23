"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type StatItem = {
  num: string;
  suffix?: string;
  label: string;
  emphasize?: boolean;
};

const statItems: StatItem[] = [
  { num: "5", suffix: "+", label: "Years in trade", emphasize: true },
  { num: "76", label: "Builds completed" },
  { num: "240", suffix: "k sqft", label: "Sq ft framed" },
  { num: "147", label: "Steel beams set" },
  { num: "100", suffix: "%", label: "Inspection pass", emphasize: true },
  { num: "0", label: "Callbacks last yr", emphasize: true },
  { num: "GTA", suffix: " + Surrounding", label: "Service radius" },
];

function StatTile(props: StatItem) {
  const { num, suffix, label, emphasize } = props;
  return (
    <div className="group relative h-40 w-[280px] shrink-0 overflow-hidden border border-line bg-bg-elev p-6 transition-colors duration-500 hover:border-brand/60">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <div
        className="font-display font-light text-bone leading-[0.9]"
        style={{ fontSize: "clamp(48px, 5vw, 72px)", letterSpacing: "-0.03em", fontVariationSettings: '"opsz" 144, "WONK" 1' }}
      >
        {emphasize ? (
          <em className="not-italic" style={{ fontStyle: "italic", color: "#29c5e8" }}>{num}</em>
        ) : (
          <span>{num}</span>
        )}
        {suffix ? (
          <span
            className="ml-1 align-super font-mono"
            style={{ fontSize: "0.28em", color: "#29c5e8", letterSpacing: "0.04em" }}
          >
            {suffix}
          </span>
        ) : null}
      </div>
      <div className="absolute bottom-6 left-6 font-mono text-[10px] tracking-[0.18em] uppercase text-bone-mute">
        {label}
      </div>
      <span className="pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-brand/60" />
      <span className="pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 border-r border-t border-brand/60" />
      <span className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-brand/60" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-brand/60" />
    </div>
  );
}

export function Stats() {
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headRef.current) {
      gsap.fromTo(
        headRef.current,
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
    <section className="border-y border-line bg-bg py-24 md:py-32">
      <style>{`
        @keyframes marquee-stats {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <div className="mx-auto max-w-[1480px] px-6 md:px-16">
        <div ref={headRef} className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-[200px_1fr] md:gap-16">
          <div className="flex flex-col gap-2.5 pt-4">
            <span className="mono-label">004</span>
            <span className="mono-label bright">The receipts</span>
          </div>
          <div>
            <h2 className="display max-w-[18ch]" style={{ fontSize: "clamp(40px, 5.5vw, 84px)", lineHeight: 0.96 }}>
              Five years <em>in the trade.</em>
              <br />Here is the proof.
            </h2>
            <p className="mt-4 font-mono text-[10px] tracking-[0.18em] uppercase text-bone-mute">
              HOVER TO PAUSE
            </p>
          </div>
        </div>
      </div>

      <div
        className="w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div
          className="flex w-max items-center gap-5 py-2 hover:[animation-play-state:paused]"
          style={{ animation: "marquee-stats 80s linear infinite" }}
        >
          {[...statItems, ...statItems].map((s, i) => (
            <StatTile key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
