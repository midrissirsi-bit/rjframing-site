"use client";

export function About() {
  return (
    <section id="about" className="about-light px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-[200px_1fr] md:gap-16">
          <div className="flex flex-col gap-2.5 pt-4">
            <span className="mono-label">005</span>
            <span className="mono-label bright">About</span>
          </div>
          <h2 className="display max-w-[16ch]" style={{ fontSize: "clamp(40px, 5.5vw, 84px)", lineHeight: 0.96 }}>
            Run by the <em>framer,</em>
            <br />not a salesperson.
          </h2>
        </div>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20">
          <div
            className="about-body font-display font-light"
            style={{ fontSize: "clamp(22px, 2.2vw, 30px)", lineHeight: 1.3, letterSpacing: "-0.01em", fontVariationSettings: "'opsz' 60" }}
          >
            <p>
              Ray started RJ Framing because he was tired of finishing other crews&apos; shortcuts &mdash; the studs that drifted a quarter inch off layout, the headers under-spec&apos;d by a single jack, the steel installs that came back open at inspection.
            </p>
            <p className="mt-4">
              Five years and dozens of custom builds later, he runs a small, sharp team that takes on the framing nobody else wants &mdash; the cantilevers, the high-load steel, the tight infill lots in Vaughan, Aurora, and Barrie where there is no room for mistakes.
            </p>
            <p className="mt-4">If you are building something that scares your other framers, that is the call we want.</p>
            <div className="mt-8 flex items-center gap-5">
              <span className="about-name font-display italic text-3xl" style={{ fontVariationSettings: "'WONK' 1" }}>Ray</span>
              <span className="about-role font-mono text-[11px] tracking-[0.18em] uppercase">Founder &middot; Lead Framer</span>
            </div>
          </div>
          <img
            src="/images/ray-portrait.png"
            alt="Ray, founder and lead framer of RJ Framing, on a residential job site in southern Ontario"
            className="aspect-[4/5] w-full rounded border object-cover"
            style={{ borderColor: "#9c8d75" }}
          />
        </div>
      </div>
    </section>
  );
}
