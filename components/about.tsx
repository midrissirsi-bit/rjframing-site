"use client";

export function About() {
  return (
    <section id="about" className="about-light px-6 py-16 md:px-16 md:py-24">
      <div className="mx-auto max-w-[1480px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20 items-start">
          <div data-reveal>
            <span className="mono-label">005 / About</span>
            <h2 className="display mt-5 max-w-[14ch]" style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.96 }}>
              Run by the <em>framer,</em>
              <br />not a salesperson.
            </h2>
          </div>
          <div
            data-reveal
            className="about-body font-display font-light"
            style={{ fontSize: "clamp(19px, 1.7vw, 24px)", lineHeight: 1.4, letterSpacing: "-0.01em", fontVariationSettings: "'opsz' 60", ["--reveal-delay" as string]: "0.12s" }}
          >
            <p>Ray started RJ Framing because he was tired of finishing other crews&apos; shortcuts.</p>
            <p className="mt-3">Five years and dozens of custom builds later, he runs a sharp team that takes on challenging builds.</p>
            <p className="mt-3">If you are building something, we are the team to call.</p>
            <div className="mt-6 flex items-center gap-5">
              <span className="about-name font-display italic text-2xl" style={{ fontVariationSettings: "'WONK' 1" }}>Ray</span>
              <span className="about-role font-mono text-[11px] tracking-[0.18em] uppercase">Founder &middot; Journeyman Carpenter</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
