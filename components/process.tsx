"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { num: "01", title: "Contact and Estimate",         img: "/images/process-survey.png",  body: "Send the prints, share the scope. We will get back to you as soon as we can." },
  { num: "02", title: "Coordinate with Suppliers",    img: "/images/process-suppliers.png",   body: "Lumber, steel, hardware. Suppliers locked, lead times confirmed, deliveries staged to the crew's schedule. Nothing waits on a truck that should have been ordered last week." },
  { num: "03", title: "Frame",                        img: "/images/process-frame.jpg",   imgPos: "40% center", body: "Crew is on site as per the contract start date and the project is framed to spec." },
  { num: "04", title: "Hand-Off",                      img: "/images/process-handoff.jpg", body: "Site walk-through, punch list cleared, site swept. The next trade walks in ready to work. Onto the next." },
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How RJ Framing frames a build",
  description:
    "The four stages RJ Framing follows on every custom framing and structural steel project across the Greater Toronto Area.",
  step: stages.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
};

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);

  // GSAP matchMedia keeps the desktop and mobile behaviours correct across
  // viewport changes — it tears down and re-initialises when the 768px
  // breakpoint is crossed, so resizing never leaves the section stuck.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const mm = gsap.matchMedia();

    // Desktop: pinned scroll-jack that swaps the active stage + image.
    mm.add("(min-width: 768px)", () => {
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
      return () => {
        trigger.kill();
        textItems.forEach((s, i) => s.classList.toggle("active", i === 0));
        imgItems.forEach((s, i) => s.classList.toggle("active", i === 0));
      };
    });

    // Mobile: cinematic focus + a node that glides down the spine on scroll.
    mm.add("(max-width: 767px)", () => {
      const items = track.querySelectorAll<HTMLElement>(".process-stage-item");
      if (!items.length) return;
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.target.classList.toggle("mob-focus", e.isIntersecting)),
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
      );
      items.forEach((it) => io.observe(it));

      const stagesEl = track.querySelector<HTMLElement>(".process-stages");
      const dot = track.querySelector<HTMLElement>(".process-spine-dot");
      let raf = 0;
      const update = () => {
        raf = 0;
        if (!stagesEl || !dot) return;
        const rect = stagesEl.getBoundingClientRect();
        const p = (window.innerHeight / 2 - rect.top) / rect.height;
        const clamped = Math.max(0, Math.min(1, p));
        dot.style.top = `${6 + clamped * (rect.height - 12)}px`;
      };
      const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
      window.addEventListener("scroll", onScroll, { passive: true });
      update();

      return () => {
        io.disconnect();
        window.removeEventListener("scroll", onScroll);
        if (raf) cancelAnimationFrame(raf);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="process" className="process">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <div ref={trackRef} className="process-track">
        <div className="process-stage">
          <div className="mx-auto grid w-full max-w-[1480px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20">
            <div className="process-stages">
              <span className="process-spine-dot md:hidden" aria-hidden />
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
                  <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded border border-line md:hidden">
                    <Image
                      src={s.img}
                      alt={`RJ Framing — ${s.title} stage of a custom framing build in the Greater Toronto Area`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="process-mob-img object-cover"
                      style={{ objectPosition: (s as { imgPos?: string }).imgPos ?? "center" }}
                    />
                  </div>
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
                <Image
                  key={s.num}
                  src={s.img}
                  alt={`RJ Framing — ${s.title} stage of a custom framing build in the Greater Toronto Area`}
                  fill
                  sizes="50vw"
                  className={`process-img-stage object-cover rounded border border-line ${i === 0 ? "active" : ""}`}
                  style={{ objectPosition: (s as { imgPos?: string }).imgPos ?? "center" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
