export function Footer() {
  return (
    <footer className="border-t border-line bg-bg px-6 pb-10 pt-16 md:px-16">
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 items-end gap-7 md:grid-cols-3 md:gap-10">
        <div>
          <div className="font-display font-light leading-none text-5xl" style={{ letterSpacing: "-0.02em" }}>
            RJ <em className="not-italic" style={{ fontStyle: "italic", color: "#29c5e8", fontVariationSettings: '"WONK" 1' }}>Framing</em>
          </div>
          <div className="mt-2 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-mute">Rough Carpentry · Est. GTA</div>
        </div>
        <div className="flex flex-col gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-bone-mute">
          <span>© 2026 RJ Framing Inc.</span>
          <span>Licensed &amp; insured · Ontario</span>
          <span>Built with intention.</span>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { href: "https://www.instagram.com/rj.framing/", label: "Instagram" },
            { href: "tel:+12896885951", label: "Call" },
            { href: "mailto:rjframinginc@gmail.com", label: "Email" },
          ].map((a) => (
            <a
              key={a.label}
              href={a.href}
              className="w-fit py-2 font-mono text-[11px] tracking-[0.16em] uppercase text-bone-dim transition-colors hover:text-bone"
            >
              ↗ {a.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
