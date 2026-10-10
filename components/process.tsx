"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnnotatedPhoto, type Note } from "@/components/annotated-photo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Beat = {
  step: string;
  title: string;
  body: string;
  fromUs: string;
  img: string;
  w: number;
  h: number;
  alt: string;
  notes: Note[];
};

const beats: Beat[] = [
  {
    step: "Drawings",
    title: "Send us the drawings",
    body: "Architectural and structural sets, plus the engineering. We go through them, flag anything that won't frame the way it's drawn, and come back with a price.",
    fromUs: "A written quote and a start date",
    img: "/images/ray-portrait.jpg",
    w: 1080,
    h: 1920,
    alt: "Ray, founder of RJ Framing, on the steps of a framed custom home with steel beams in Toronto",
    notes: [
      { x: 0.47, y: 0.5, label: "Ray, founder", side: "r" },
      { x: 0.4, y: 0.4, label: "Steel by our crew", side: "l" },
    ],
  },
  {
    step: "Start date",
    title: "Material in, crew on site",
    body: "Lumber, steel and trusses get ordered off your drawings and timed to land with the crew. We start on the date in the contract.",
    fromUs: "Material delivered, crew on the start date",
    img: "/images/project-04-autumn-crane.jpg",
    w: 1170,
    h: 649,
    alt: "Roof trusses craned onto a second storey addition framed by RJ Framing in North York",
    notes: [
      { x: 0.6, y: 0.33, label: "Trusses craned in", side: "r" },
      { x: 0.47, y: 0.55, label: "2nd storey addition, North York", side: "l" },
    ],
  },
  {
    step: "Frame",
    title: "Framed to the drawings",
    body: "Floors, walls, steel beams and roof, built to the drawings and the engineer's spec. Wood and steel are both ours, so there is no waiting on a second crew.",
    fromUs: "The structure, framed to spec",
    img: "/images/process-frame.jpg",
    w: 2048,
    h: 1152,
    alt: "Custom home in Toronto framed in wood with steel beams by RJ Framing",
    notes: [
      { x: 0.45, y: 0.24, label: "Steel beams, engineer's spec", side: "r" },
      { x: 0.42, y: 0.6, label: "Walls framed and sheathed", side: "l" },
    ],
  },
  {
    step: "Inspection",
    title: "Inspection, then hand-off",
    body: "We're there for the framing inspection and fix anything on the list. The site gets swept and the next trade walks into a building they can work in.",
    fromUs: "Deficiencies fixed, site clean, ready for mechanicals",
    img: "/images/process-handoff.jpg",
    w: 1500,
    h: 2000,
    alt: "Wrapped and windowed new build with the RJ Framing site sign on the fence, ready for the next trades",
    notes: [
      { x: 0.73, y: 0.42, label: "Wrapped, windows in", side: "l" },
      { x: 0.29, y: 0.69, label: "Our sign on the fence", side: "r" },
    ],
  },
];

const before = ["Permits", "Excavation", "Foundation"];
const after = ["Mechanicals", "Insulation", "Drywall", "Finishes"];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How RJ Framing frames a build",
  description:
    "Where framing sits in a custom home or addition, and the four stages RJ Framing runs on every framing and structural steel job across the Greater Toronto Area.",
  step: beats.map((b, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: b.title,
    text: `${b.body} From us: ${b.fromUs}.`,
  })),
};

const pad = (n: number) => String(n).padStart(2, "0");

/* ---------- the build schedule, with RJ's slot in it ---------- */
function Schedule({ active, headRef, compact = false }: { active: number; headRef: React.RefObject<HTMLDivElement>; compact?: boolean }) {
  return (
    <div className="process-schedule w-full" aria-label="Where framing sits in a build schedule">
      <div className="mb-2 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-bone-mute">
        <span>Your build</span>
        <span className="text-brand">RJ Framing &middot; step {pad(active + 1)} / {pad(beats.length)}</span>
      </div>
      <div className="flex h-12 items-stretch gap-[3px] md:h-14">
        {!compact &&
          before.map((t) => (
            <div key={t} className="process-seg ghost flex-1">
              <span>{t}</span>
            </div>
          ))}

        <div className={`relative flex ${compact ? "flex-1" : "flex-[5.6]"} gap-[3px]`}>
          {beats.map((b, i) => (
            <div key={b.step} className={`process-seg rj flex-1 ${i <= active ? "done" : ""} ${i === active ? "now" : ""}`}>
              <span>
                <b>{pad(i + 1)}</b> {b.step}
              </span>
            </div>
          ))}
          {/* playhead rides across our slot with scroll */}
          <div className="pointer-events-none absolute inset-0 overflow-visible">
            <div ref={headRef} className="process-head absolute inset-y-[-6px] left-0 w-0">
              <span className="process-head-line" />
            </div>
          </div>
        </div>

        {!compact &&
          after.map((t) => (
            <div key={t} className="process-seg ghost flex-1">
              <span>{t}</span>
            </div>
          ))}
      </div>
      {compact && (
        <div className="mt-1.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-bone-mute/70">
          <span>&larr; Foundation</span>
          <span>Mechanicals &rarr;</span>
        </div>
      )}
    </div>
  );
}

function Handoff({ beat }: { beat: Beat }) {
  return (
    <div className="mt-8 flex items-baseline gap-4 rounded-sm border border-line bg-bg/90 px-4 py-3.5">
      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-brand">From us</span>
      <span className="text-[15px] leading-snug text-bone">{beat.fromUs}</span>
    </div>
  );
}

/* The playhead is a zero-width line moved by an exact pixel distance across RJ's
   slot. No CSS transition: scroll (smoothed by Lenis) already drives it every
   frame, and a transition on top restarts each frame and stutters. Being zero
   width, it can never stick out past the strip and make the page scroll sideways. */
function moveHead(el: HTMLDivElement | null, p: number) {
  if (!el || !el.parentElement) return;
  const x = Math.round(p * el.parentElement.clientWidth * 10) / 10;
  el.style.transform = `translate3d(${x}px,0,0)`;
}

export function Process() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const deskHead = useRef<HTMLDivElement>(null);
  const mobHead = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();
    // only touch React state when the step actually changes, not on every scroll frame
    let last = -1;
    const setIdx = (p: number) => {
      const i = Math.min(beats.length - 1, Math.floor(p * beats.length));
      if (i !== last) {
        last = i;
        setActive(i);
      }
    };

    // heading: words rise out of a mask
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const h = headingRef.current;
      if (!h) return;
      const split = SplitText.create(h.querySelectorAll(".ph-text"), { type: "words", mask: "words" });
      const tween = gsap.from(split.words, {
        yPercent: 110,
        duration: 1,
        ease: "power4.out",
        stagger: 0.045,
        scrollTrigger: { trigger: h, start: "top 82%" },
      });
      const pill = gsap.from(h.querySelector(".ph-pill"), {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.9,
        ease: "power3.out",
        delay: 0.25,
        scrollTrigger: { trigger: h, start: "top 82%" },
      });
      return () => {
        tween.kill();
        pill.kill();
        split.revert();
      };
    });

    // desktop: sticky stage, scroll advances the beats and the playhead
    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current;
      if (!track) return;
      // pin the stage height in px so a resizing browser chrome can't move it mid-scroll
      let lastW = 0;
      let lastH = 0;
      const pinVh = () => {
        // ignore small height-only changes (browser chrome showing/hiding); re-pin on real resizes
        if (window.innerWidth === lastW && Math.abs(window.innerHeight - lastH) < 150) return;
        lastW = window.innerWidth;
        lastH = window.innerHeight;
        track.style.setProperty("--process-vh", `${window.innerHeight}px`);
      };
      pinVh();
      window.addEventListener("resize", pinVh);
      const st = ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setIdx(self.progress);
          moveHead(deskHead.current, self.progress);
        },
      });
      return () => {
        st.kill();
        window.removeEventListener("resize", pinVh);
      };
    });

    // mobile: stacked beats, the strip sticks under the nav and the playhead tracks
    // progress continuously. (The iOS shaking was never this: it was overflow clip on
    // an ancestor of the sticky strip. Keep ancestors unclipped.)
    mm.add("(max-width: 767px)", () => {
      const stack = stackRef.current;
      if (!stack) return;
      const st = ScrollTrigger.create({
        trigger: stack,
        start: "top 60%",
        end: "bottom 60%",
        onUpdate: (self) => {
          setIdx(self.progress);
          moveHead(mobHead.current, self.progress);
        },
      });
      return () => st.kill();
    });

    return () => mm.revert();
  }, []);


  return (
    <section id="process" className="process">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* intro */}
      <div className="mx-auto max-w-[1480px] px-6 pt-24 md:px-16 md:pt-36">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[200px_1fr] md:gap-16">
          <div className="flex flex-col gap-2.5 pt-4">
            <span className="mono-label">003</span>
            <span className="mono-label bright">Process</span>
          </div>
          <div>
            <h2
              ref={headingRef}
              className="display max-w-[1100px] text-bone"
              style={{ fontSize: "clamp(34px, 4.6vw, 72px)", lineHeight: 1.02 }}
            >
              <span className="ph-text">We&apos;re the part of your build between</span>{" "}
              <span className="ph-pill relative mx-1 inline-block h-[0.78em] w-[1.9em] translate-y-[0.08em] overflow-hidden rounded-full border border-line align-baseline">
                <Image src="/images/project-05-interior-joists.jpg" alt="" fill sizes="160px" className="object-cover" />
              </span>{" "}
              <span className="ph-text">
                the foundation and the <em>drywall.</em>
              </span>
            </h2>
            <p className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-bone-dim">
              Every job runs the same four steps. Here&apos;s what you get from us at each one.
            </p>
          </div>
        </div>
      </div>

      {/* desktop: sticky stage */}
      <div ref={trackRef} className="process-track relative hidden md:block" style={{ height: `${beats.length * 85 + 100}vh` }}>
        <div className="sticky top-0 flex flex-col pb-8 pt-28" style={{ height: "var(--process-vh, 100vh)" }}>
          <div className="grid min-h-0 flex-1 grid-cols-12 gap-10 pr-16">
            <div className="relative col-span-7 min-h-0">
              {beats.map((b, i) => (
                <AnnotatedPhoto
                  key={b.img}
                  photo={b}
                  on={i === active}
                  className={`process-plate-stack absolute inset-0 rounded-r-sm ${i <= active ? "shown" : ""}`}
                />
              ))}
            </div>

            <div className="relative col-span-5 self-center">
              <div className="grid">
                {beats.map((b, i) => (
                  <article
                    key={b.title}
                    aria-hidden={i !== active}
                    className={`process-copy col-start-1 row-start-1 ${i === active ? "now" : i < active ? "past" : ""}`}
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
                      Step {pad(i + 1)} &middot; {b.step}
                    </span>
                    <h3 className="display mt-4" style={{ fontSize: "clamp(32px, 3.4vw, 54px)", lineHeight: 1.02 }}>
                      {b.title}
                    </h3>
                    <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-bone-dim">{b.body}</p>
                    <Handoff beat={b} />
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 px-16">
            <Schedule active={active} headRef={deskHead} />
          </div>
        </div>
      </div>

      {/* mobile: strip sticks under the nav, beats stack */}
      <div className="pb-24 md:hidden">
        <div className="sticky top-14 z-20 mt-10 border-y border-line bg-bg px-6 py-3">
          <Schedule active={active} headRef={mobHead} compact />
        </div>
        <div ref={stackRef} className="px-6">
          {beats.map((b, i) => (
            <article key={b.title} className="pt-12">
              <AnnotatedPhoto photo={b} on={i === active} className="relative aspect-[4/5] w-full rounded-sm border border-line" />
              <span className="mt-6 block font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
                Step {pad(i + 1)} &middot; {b.step}
              </span>
              <h3 className="display mt-3" style={{ fontSize: "clamp(30px, 8vw, 40px)", lineHeight: 1.05 }}>
                {b.title}
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-bone-dim">{b.body}</p>
              <Handoff beat={b} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
