"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";

type ProjectItem = {
  id: string;
  title: string;
  desc: string;
  url: string;
  span: string;
};

const projectItems: ProjectItem[] = [
  { id: "rj-p01", title: "Project Glengrove",      desc: "Custom Build - Toronto",            url: "/images/project-01-modern-tudor.jpg",   span: "row-span-2" },
  { id: "rj-p02", title: "Rear Addition",          desc: "Structural Shoring Stage",          url: "/images/project-02-winter-frame.jpg",   span: "" },
  { id: "rj-p03", title: "Project Forest Hill",    desc: "Custom Build - Toronto",            url: "/images/project-03-winter-aerial.jpg",  span: "" },
  { id: "rj-p04", title: "Project Allingham",      desc: "2nd Storey Addition - North York",  url: "/images/project-04-autumn-crane.jpg",   span: "col-span-2 row-span-2" },
  { id: "rj-p05", title: "Project Lakeshore",      desc: "Back Framing Stage",                url: "/images/project-05-interior-joists.jpg",span: "" },
  { id: "rj-p06", title: "Project Norcross",       desc: "Multiplex Rental Property",         url: "/images/project-06-wood-steel.jpg",     span: "" },
  { id: "rj-p07", title: "Basement Framing",       desc: "Custom Build - Toronto",            url: "/images/project-07-basement.jpg",       span: "row-span-2" },
  { id: "rj-p08", title: "Project Scarborough",    desc: "Addition - Scarborough",            url: "/images/project-08-summer-osb.jpg",     span: "" },
  { id: "rj-p09", title: "Project Allingham",      desc: "Addition - North York",             url: "/images/project-09-trusses.jpg",        span: "" },
  { id: "rj-p10", title: "Project Hoggs Hollow",   desc: "Custom Build - Toronto",            url: "/images/project-10-forest.jpg",         span: "row-span-2" },
  { id: "rj-p11", title: "Project Forest Hill",    desc: "Custom Build - Toronto",            url: "/images/project-11-dormer.jpg",         span: "" },
  { id: "rj-p12", title: "Project Glengrove",      desc: "Custom Build - Toronto",            url: "/images/project-12-steel-beams.jpg",    span: "" },
  { id: "rj-p13", title: "Project Musselman Lake", desc: "Custom Build - Stouffville",        url: "/images/project-13-musselman-lake.jpg", span: "row-span-2" },
];

const COUNT = projectItems.length;
const DRAG_THRESHOLD = 6; // px of movement before a press counts as a drag, not a tap
const SWIPE_THRESHOLD = 50; // px a lightbox swipe must travel to change photo
const LOOP_SECONDS = 48; // time for one full pass of the strip

const pad = (n: number) => String(n).padStart(2, "0");

export function WorkGallery() {
  const loop = [...projectItems, ...projectItems];
  const [selected, setSelected] = useState<number | null>(null);
  const [swipeDx, setSwipeDx] = useState(0);
  const [slideDir, setSlideDir] = useState<1 | -1 | 0>(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const strip = useRef({
    x: 0,
    vel: 0,
    dragging: false,
    lastX: 0,
    lastT: 0,
    moved: 0,
    hover: false,
    paused: false,
    suppressClick: false,
  });
  const lightboxSwipe = useRef({ active: false, startX: 0, startY: 0, swiped: false });

  strip.current.paused = selected !== null;

  /* ---------- strip: auto-scroll + drag/swipe with momentum ---------- */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const s = strip.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let period = 0;
    const measure = () => {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      period = (track.scrollWidth + gap) / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    s.x = -period / 2;
    let prev = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;

      if (!s.dragging && period > 0) {
        if (!reduced && !s.hover && !s.paused) s.x += (period / LOOP_SECONDS) * dt;
        s.x += s.vel * dt;
        s.vel *= Math.pow(0.04, dt); // momentum bleeds off over ~1s
        if (Math.abs(s.vel) < 5) s.vel = 0;
      }

      if (period > 0) s.x = (((s.x % period) + period) % period) - period;
      track.style.transform = `translate3d(${s.x}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      if (!s.dragging) return;
      const dx = e.clientX - s.lastX;
      const t = performance.now();
      const dtMs = Math.max(t - s.lastT, 1);
      s.x += dx;
      s.moved += Math.abs(dx);
      s.vel = s.vel * 0.2 + (dx / dtMs) * 1000 * 0.8;
      s.lastX = e.clientX;
      s.lastT = t;
    };
    const onUp = () => {
      if (!s.dragging) return;
      s.dragging = false;
      if (s.moved > DRAG_THRESHOLD) s.suppressClick = true;
      if (performance.now() - s.lastT > 80) s.vel = 0; // finger held still before release
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const onStripDown = (e: ReactPointerEvent) => {
    if (e.button !== 0) return;
    const s = strip.current;
    s.dragging = true;
    s.moved = 0;
    s.vel = 0;
    s.lastX = e.clientX;
    s.lastT = performance.now();
    s.suppressClick = false;
  };

  /* ---------- lightbox ---------- */
  const go = useCallback((dir: 1 | -1) => {
    setSlideDir(dir);
    setSelected((i) => (i === null ? i : (i + dir + COUNT) % COUNT));
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, go]);

  const onLightboxDown = (e: ReactPointerEvent) => {
    lightboxSwipe.current = { active: true, startX: e.clientX, startY: e.clientY, swiped: false };
  };
  const onLightboxMove = (e: ReactPointerEvent) => {
    const l = lightboxSwipe.current;
    if (!l.active) return;
    const dx = e.clientX - l.startX;
    if (Math.abs(dx) > Math.abs(e.clientY - l.startY)) setSwipeDx(dx);
  };
  const onLightboxUp = (e: ReactPointerEvent) => {
    const l = lightboxSwipe.current;
    if (!l.active) return;
    l.active = false;
    const dx = e.clientX - l.startX;
    const dy = e.clientY - l.startY;
    setSwipeDx(0);
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      l.swiped = true;
      go(dx < 0 ? 1 : -1);
    } else if (Math.abs(dx) > DRAG_THRESHOLD) {
      l.swiped = true; // a short drag should not close the lightbox either
    }
  };
  const onLightboxCancel = () => {
    lightboxSwipe.current.active = false;
    setSwipeDx(0);
  };
  const closeUnlessSwiped = () => {
    if (lightboxSwipe.current.swiped) {
      lightboxSwipe.current.swiped = false;
      return;
    }
    setSelected(null);
  };

  const current = selected === null ? null : projectItems[selected];

  return (
    <section id="work" className="bg-bg py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1480px] px-6 md:px-16">
        <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-[200px_1fr] md:gap-16">
          <div className="flex flex-col gap-2.5 pt-4">
            <span className="mono-label">004</span>
            <span className="mono-label bright">Selected Work</span>
          </div>
          <div>
            <h2 className="display max-w-[18ch]" style={{ fontSize: "clamp(40px, 5.5vw, 84px)", lineHeight: 0.96 }}>
              Project <em>portfolio.</em>
            </h2>
            <p className="mt-4 font-mono text-[12px] md:text-[10px] tracking-[0.2em] uppercase text-bone-mute">
              Recent builds across the GTA &middot; Swipe or drag to browse &middot; Tap a photo to enlarge
            </p>
          </div>
        </div>
      </div>

      <div
        className="bento-marquee-wrap relative cursor-grab select-none active:cursor-grabbing"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onStripDown}
        onPointerEnter={(e) => { if (e.pointerType === "mouse") strip.current.hover = true; }}
        onPointerLeave={(e) => { if (e.pointerType === "mouse") strip.current.hover = false; }}
        onClickCapture={(e) => {
          if (strip.current.suppressClick) {
            strip.current.suppressClick = false;
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #060709, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #060709, transparent)" }} />

        <div ref={trackRef} className="bento-marquee-track">
          {loop.map((item, i) => (
            <button
              type="button"
              key={`${item.id}-${i}`}
              onClick={() => { setSlideDir(0); setSelected(i % COUNT); }}
              aria-label={`Enlarge ${item.title}`}
              className={`bento-cell relative overflow-hidden rounded-sm border border-line group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${item.span}`}
            >
              <Image
                src={item.url}
                alt={`${item.title} — ${item.desc} — RJ Framing custom framing project, Greater Toronto Area`}
                fill
                draggable={false}
                sizes="(max-width: 768px) 280px, 400px"
                className="pointer-events-none object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <h3 className="font-display text-bone text-lg md:text-xl leading-tight" style={{ fontVariationSettings: "'opsz' 36" }}>
                  {item.title}
                </h3>
                {item.desc && (
                  <p className="font-mono text-[9px] md:text-[10px] tracking-[0.18em] uppercase text-bone-mute mt-1">
                    {item.desc}
                  </p>
                )}
              </div>

              <span className="pointer-events-none absolute left-2 top-2 h-2 w-2 border-l border-t border-brand/70" />
              <span className="pointer-events-none absolute right-2 top-2 h-2 w-2 border-r border-t border-brand/70" />
              <span className="pointer-events-none absolute bottom-2 left-2 h-2 w-2 border-b border-l border-brand/70" />
              <span className="pointer-events-none absolute bottom-2 right-2 h-2 w-2 border-b border-r border-brand/70" />
            </button>
          ))}
        </div>
      </div>

      {current && selected !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bento-lightbox-fade select-none"
          style={{ background: "rgba(6,7,9,0.92)", backdropFilter: "blur(10px)", touchAction: "pinch-zoom" }}
          onClick={closeUnlessSwiped}
          onPointerDown={onLightboxDown}
          onPointerMove={onLightboxMove}
          onPointerUp={onLightboxUp}
          onPointerCancel={onLightboxCancel}
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setSelected(null); }}
            aria-label="Close"
            className="absolute right-4 top-4 md:right-6 md:top-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone-mute/40 text-bone/80 transition-colors hover:border-bone hover:text-bone"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6 L18 18 M18 6 L6 18" strokeLinecap="square" />
            </svg>
          </button>

          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={(e) => { e.stopPropagation(); go(dir); }}
              aria-label={dir === 1 ? "Next photo" : "Previous photo"}
              className={`absolute top-1/2 z-10 hidden -translate-y-1/2 md:inline-flex h-12 w-12 items-center justify-center rounded-full border border-bone-mute/40 text-bone/80 transition-colors hover:border-bone hover:text-bone ${dir === 1 ? "right-6" : "left-6"}`}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d={dir === 1 ? "M9 5 L16 12 L9 19" : "M15 5 L8 12 L15 19"} strokeLinecap="square" />
              </svg>
            </button>
          ))}

          <div className="relative w-full max-w-5xl bento-lightbox-scale" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                transform: `translateX(${swipeDx}px)`,
                transition: swipeDx === 0 ? "transform 0.25s ease-out" : "none",
              }}
            >
              <img
                key={selected}
                src={current.url}
                alt={`${current.title} - ${current.desc}`}
                draggable={false}
                className={`block h-auto max-h-[75vh] w-full rounded-sm object-contain ${slideDir === 1 ? "bento-slide-next" : slideDir === -1 ? "bento-slide-prev" : ""}`}
              />
            </div>
            <div className="mt-5 flex items-end justify-between gap-6">
              <div>
                <h3 className="font-display text-bone text-2xl md:text-3xl leading-tight" style={{ fontVariationSettings: "'opsz' 36" }}>
                  {current.title}
                </h3>
                {current.desc && (
                  <p className="mt-1 font-mono text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-bone-mute">
                    {current.desc}
                  </p>
                )}
              </div>
              <span className="shrink-0 font-mono text-[11px] tracking-[0.18em] text-bone-mute">
                {pad(selected + 1)} / {pad(COUNT)}
              </span>
            </div>
            <p className="mt-3 font-mono text-[9px] tracking-[0.2em] uppercase text-bone-mute/70 md:hidden">
              Swipe for next &middot; Tap outside to close
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
