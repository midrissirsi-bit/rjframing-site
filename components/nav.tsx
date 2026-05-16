"use client";

export function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-16 text-bone"
      style={{ mixBlendMode: "difference" }}
    >
      <a href="#top" className="flex items-baseline gap-2.5 font-display text-xl">
        <span>
          RJ <em className="not-italic" style={{ fontStyle: "italic", color: "#29c5e8" }}>Framing</em>
        </span>
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-mute">Rough Carpentry</span>
      </a>
      <div className="hidden md:flex items-center gap-8">
        <a href="#work" className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone-dim hover:text-bone transition-colors">Work</a>
        <a href="#services" className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone-dim hover:text-bone transition-colors">Services</a>
        <a href="#process" className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone-dim hover:text-bone transition-colors">Process</a>
        <a href="#about" className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone-dim hover:text-bone transition-colors">About</a>
      </div>
      <a
        href="#contact"
        className="inline-flex items-center gap-2.5 rounded-full border border-bone px-4 py-2.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-all duration-300 hover:bg-bone hover:text-bg"
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" style={{ boxShadow: "0 0 8px #29c5e8" }} />
        Get a quote
      </a>
    </nav>
  );
}
