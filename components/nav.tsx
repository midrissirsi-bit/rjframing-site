"use client";

export function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-16 text-bone"
      style={{ mixBlendMode: "difference" }}
    >
      <a href="#top" className="flex items-center gap-3" aria-label="RJ Framing home"">
        <img
          src="/images/logo.png"
          alt="RJ Framing — Rough Carpentry"
          className="h-9 w-auto"
          draggable={false}
        />
      </a>
      <div className="hidden md:flex items-center gap-8">
        <a href="#work" className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone-dim hover:text-bone transition-colors">Work</a>
        <a href="#services" className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone-dim hover:text-bone transition-colors">Services</a>
        <a href="#process" className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone-dim hover:text-bone transition-colors">Process</a>
        <a href="#about" className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone-dim hover:text-bone transition-colors">About</a>
      </div>
      
        href="#contact"
        className="inline-flex items-center gap-2.5 rounded-full border border-bone px-4 py-2.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-all duration-300 hover:bg-bone hover:text-bg"
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" style={{ boxShadow: "0 0 8px #29c5e8" }} />
        Get a quote
      </a>
    </nav>
  );
}
