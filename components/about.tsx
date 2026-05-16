"use client";

export function About() {
  return (
    <section id="about" className="bg-bg-elev px-6 py-24 md:px-16 md:py-32">
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
            className="font-display text-bone font-light"
            style={{ fontSize: "clamp(22px, 2.2vw, 30px)", lineHeight: 1.3, letterSpacing: "-0.01em", fontVariationSettings: '"opsz" 60' }}
          >
            <p>
              Ray started <em className="not-italic" style={{ fontStyle: "italic", color: "#29c5e8" }}>RJ Framing</em> because he was tired of finishing other crews&apos; shortcuts — the studs that drifted a quarter inch off layout, the headers under-spec&apos;d by a single jack, the steel installs that came back open at inspection.
            </p>
            <p className="mt-4">
              Five years and dozens of custom builds later, he runs a small, sharp team that takes on the framing nobody else wants — the cantilevers, the high-load steel, the tight infill lots in <em className="not-italic" style={{ fontStyle: "italic", color: "#29c5e8" }}>Vaughan, Aurora, and Barrie</em> where there&apos;s no room for mistakes.
            </p>
            <p className="mt-4">If you&apos;re building something that scares your other framers, that&apos;s the call we want.</p>
            <div className="mt-8 flex items-center gap-5">
              <span className="font-display italic text-3xl text-brand" style={{ fontVariationSettings: '"WONK" 1' }}>Ray</span>
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone-mute">Founder · Lead Framer</span>
            </div>
          </div>
          <div className="aspect-[4/5] w-full rounded border border-line bg-surface" />
        </div>
      </div>
    </section>
  );
}
