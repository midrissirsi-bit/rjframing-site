"use client";

import { useEffect, useState } from "react";
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

export function WorkGallery() {
  const loop = [...projectItems, ...projectItems];
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

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
            <p className="mt-4 hidden md:block font-mono text-[10px] tracking-[0.2em] uppercase text-bone-mute">
              Recent builds across the GTA &middot; Click a tile to enlarge &middot; Hover to pause
            </p>
          </div>
        </div>
      </div>

      <div className={`bento-marquee-wrap relative ${selected ? "bento-marquee-paused" : ""}`}>
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #060709, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #060709, transparent)" }} />

        <div className="bento-marquee-track">
          {loop.map((item, i) => (
            <button
              type="button"
              key={`${item.id}-${i}`}
              onClick={() => setSelected(item)}
              aria-label={`Enlarge ${item.title}`}
              className={`bento-cell relative overflow-hidden rounded-sm border border-line group cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${item.span}`}
            >
              <Image
                src={item.url}
                alt={`${item.title} — ${item.desc} — RJ Framing custom framing project, Greater Toronto Area`}
                fill
                sizes="(max-width: 768px) 280px, 400px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bento-lightbox-fade"
          style={{ background: "rgba(6,7,9,0.92)", backdropFilter: "blur(10px)" }}
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label="Close"
            className="absolute right-4 top-4 md:right-6 md:top-6 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-bone-mute/40 text-bone/80 transition-colors hover:border-bone hover:text-bone"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6 L18 18 M18 6 L6 18" strokeLinecap="square" />
            </svg>
          </button>
          <div className="relative w-full max-w-5xl bento-lightbox-scale" onClick={(e) => e.stopPropagation()}>
            <img src={selected.url} alt={`${selected.title} - ${selected.desc}`} className="block h-auto max-h-[80vh] w-full rounded-sm object-contain" />
            <div className="mt-5 flex items-end justify-between gap-6">
              <div>
                <h3 className="font-display text-bone text-2xl md:text-3xl leading-tight" style={{ fontVariationSettings: "'opsz' 36" }}>
                  {selected.title}
                </h3>
                {selected.desc && (
                  <p className="mt-1 font-mono text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-bone-mute">
                    {selected.desc}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
