"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { num: "01", title: "Contact and estimate",         img: "/images/process-survey.png",  body: "Send the prints, share the scope. We walk the site, flag what is about to become a problem on week three, and come back inside a week with a number broken down by phase. No padding, no boilerplate." },
  { num: "02", title: "Coordinate with suppliers",    img: "/images/process-steel.png",   body: "Lumber, steel, hardware. Suppliers locked, lead times confirmed, deliveries staged to the crew's schedule. Nothing waits on a truck that should have been ordered last week." },
  { num: "03", title: "Frame",                        img: "/images/process-frame.png",   body: "Mobilize the crew. Walls up, floors decked, roof loaded and sheathed. Daily progress photos to your phone. We frame at the pace of a small commercial crew, not a residential one." },
  { num: "04", title: "Handoff",                      img: "/images/process-handoff.png", body: "Walk-through with your GC. Punch list cleared. Site swept. The next trade walks onto a square, plumb, ready-to-load house. Onto the next." },
];

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const textItems = track.querySelectorAll(".process-stage-item");
    const imgItems = track.querySelectorAll(".process-img-stage");
    const total = textItems.length;

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const idx = Math.min(total - 1, Math.floor(self.progress * total));
        textItems.forEach((s, i) => s.classList.toggle("active", i === idx));
        imgItems.forEach((s, i) => s.classList.toggle("active", i === idx));
      },
    });
    return () => { trigger.kill(); };
  }, []);

  return (
    <section id="process" className="process">
      <div ref={trackRef} className="process-track">
        <div className="process-stage">
          <div className="mx-auto grid w-full max-w-[1480px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20">
            <div className="process-stages">
              {stages.map((s, i) => (
                <div key={s.num} className={`process-stage-item ${i === 0 ? "active" : ""}`}>
                  <span className="mono-label">003 / Process</span>
                  <div
                    className="font-display font-light text-brand"
                    style={{ fontSize: "clamp(100px, 18vw, 280px)", lineHeight: 0.85, letterSpacing: "-0.05em", fontVariationSettings: "'opsz' 144, 'WONK' 1" }}
                  >
                    {s.num}
                  </div>
                  <h3 className="display my-4" style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1 }}>
                    {s.title}
                  </h3>
                  <p className="max-w-[38ch] text-[17px] leading-relaxed text-bone-dim">{s.body}</p>
                  <div className="mt-10 flex items-center gap-4">
                    <span className="mono-label">{s.num} / 04</span>
                    <div className="relative h-px flex-1 overflow-hidden bg-line">
                      <span className="absolute bg-bone" style={{ inset: "0 0 0 0" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="process-images relative aspect-[4/5] w-full hidden md:block">
              {stages.map((s, i) => (
                <img
                  key={s.num}
                  src={s.img}
                  alt={`RJ Framing process - stage ${s.num} ${s.title}`}
                  className={`process-img-stage absolute inset-0 h-full w-full object-cover rounded border border-line ${i === 0 ? "active" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
