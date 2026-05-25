"use client";

type ProjectItem = {
  id: string;
  title: string;
  desc: string;
  url: string;
  span: string;
};

const projectItems: ProjectItem[] = [
  { id: "rj-p01", title: "Project Glengrove",   desc: "Custom Build - Toronto",            url: "/images/project-01-modern-tudor.jpg",   span: "row-span-2" },
  { id: "rj-p02", title: "Rear Addition",       desc: "Structural Shoring Stage",          url: "/images/project-02-winter-frame.jpg",   span: "" },
  { id: "rj-p03", title: "Project Forest Hill", desc: "Custom Build - Toronto",            url: "/images/project-03-winter-aerial.jpg",  span: "" },
  { id: "rj-p04", title: "Project Allingham",   desc: "2nd Storey Addition - North York",  url: "/images/project-04-autumn-crane.jpg",   span: "col-span-2 row-span-2" },
  { id: "rj-p05", title: "Project Lakeshore",   desc: "Back Framing Stage",                url: "/images/project-05-interior-joists.jpg",span: "" },
  { id: "rj-p06", title: "Project Norcross",    desc: "Multiplex Rental Property",         url: "/images/project-06-wood-steel.jpg",     span: "" },
  { id: "rj-p07", title: "Basement Framing",    desc: "Custom Build - Toronto",            url: "/images/project-07-basement.jpg",       span: "row-span-2" },
  { id: "rj-p08", title: "Project Scarborough", desc: "Addition - Scarborough",            url: "/images/project-08-summer-osb.jpg",     span: "" },
  { id: "rj-p09", title: "Project Allingham",   desc: "Addition - North York",             url: "/images/project-09-trusses.jpg",        span: "" },
  { id: "rj-p10", title: "Project Hoggs Hollow",desc: "Custom Build - Toronto",            url: "/images/project-10-forest.jpg",         span: "row-span-2" },
  { id: "rj-p11", title: "Project Forest Hill", desc: "Custom Build - Toronto",            url: "/images/project-11-dormer.jpg",         span: "" },
  { id: "rj-p12", title: "Project Glengrove",   desc: "Custom Build - Toronto",            url: "/images/project-12-steel-beams.jpg",    span: "" },
];

export function WorkGallery() {
  // Render the list twice so the marquee can loop seamlessly (translateX -50% = back to start)
  const loop = [...projectItems, ...projectItems];

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
              Recent builds across the GTA &middot; Hover to pause
            </p>
          </div>
        </div>
      </div>

      <div className="bento-marquee-wrap relative">
        {/* Edge fades so cards melt into the background instead of clipping */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #060709, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #060709, transparent)" }} />

        <div className="bento-marquee-track">
          {loop.map((item, i) => (
            <article
              key={`${item.id}-${i}`}
              className={`bento-cell relative overflow-hidden rounded-sm border border-line group ${item.span}`}
            >
              <img
                src={item.url}
                alt={`${item.title} - ${item.desc} - RJ Framing project`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
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

              {/* Blueprint corner ticks */}
              <span className="pointer-events-none absolute left-2 top-2 h-2 w-2 border-l border-t border-brand/70" />
              <span className="pointer-events-none absolute right-2 top-2 h-2 w-2 border-r border-t border-brand/70" />
              <span className="pointer-events-none absolute bottom-2 left-2 h-2 w-2 border-b border-l border-brand/70" />
              <span className="pointer-events-none absolute bottom-2 right-2 h-2 w-2 border-b border-r border-brand/70" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
