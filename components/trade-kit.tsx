"use client";

import { MarqueeLogoScroller } from "@/components/ui/marquee-logo-scroller";

/**
 * Inline SVG wordmark factory — produces a data: URL for an SVG that renders
 * the brand name in uppercase wide-tracked sans-serif. These act as placeholders
 * until Ray drops in the real brand logos.
 *
 * To swap to real logos: replace each `src` below with the brand's actual SVG URL
 * (or copy the SVG file to /public/logos/<brand>.svg and use that path).
 */
function wordmark(text: string, color: string = "#e8ecf0"): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 60' preserveAspectRatio='xMidYMid meet'><text x='110' y='40' text-anchor='middle' font-family='Inter, system-ui, sans-serif' font-weight='700' font-size='18' fill='${color}' letter-spacing='2.4'>${text}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Ray's daily kit — tools on the truck, materials on the plates.
// Gradient = brand's actual signature color, so on hover the card glows in the
// real brand identity. Swap `src` with real logo URLs when available.
const tradeKit = [
  {
    src: wordmark("DEWALT"),
    alt: "DeWalt power tools",
    gradient: { from: "#FFD93D", via: "#FFB800", to: "#8C6500" },
  },
  {
    src: wordmark("MILWAUKEE"),
    alt: "Milwaukee tool",
    gradient: { from: "#FF5454", via: "#D81B1B", to: "#7A0F0F" },
  },
  {
    src: wordmark("MAKITA"),
    alt: "Makita power tools",
    gradient: { from: "#42C9DC", via: "#0098AE", to: "#005463" },
  },
  {
    src: wordmark("SIMPSON STRONG-TIE"),
    alt: "Simpson Strong-Tie connectors",
    gradient: { from: "#F4A24B", via: "#D67712", to: "#7A4308" },
  },
  {
    src: wordmark("BOSCH"),
    alt: "Bosch power tools",
    gradient: { from: "#FF5050", via: "#C8102E", to: "#6E0817" },
  },
  {
    src: wordmark("HILTI"),
    alt: "Hilti structural fasteners",
    gradient: { from: "#FF6B3D", via: "#D2360A", to: "#741D05" },
  },
  {
    src: wordmark("STABILA"),
    alt: "Stabila levels",
    gradient: { from: "#FFE94A", via: "#F0C700", to: "#7A6400" },
  },
  {
    src: wordmark("ZIP SYSTEM"),
    alt: "Huber ZIP System sheathing",
    gradient: { from: "#7BD144", via: "#41A015", to: "#225708" },
  },
];

export function TradeKit() {
  return (
    <section className="bg-bg px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-[1480px]">
        {/* Eyebrow + framing copy, in the site's voice */}
        <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-[200px_1fr] md:gap-16">
          <div className="flex flex-col gap-2.5 pt-4">
            <span className="mono-label">—</span>
            <span className="mono-label bright">On the truck</span>
          </div>
          <h3 className="display max-w-[20ch]" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.05 }}>
            DeWalt on the hip. <em>Simpson</em> on the plates. <em>ZIP</em> on the sheathing.
          </h3>
        </div>

        {/* The marquee — restyled to drop the rounded-lg + heavy header for the site's flatter aesthetic */}
        <MarqueeLogoScroller
          title="Built with the brands that show up to work."
          description="The tools and materials we run on every site — no off-brand fasteners, no hardware-store hammers."
          logos={tradeKit}
          speed="normal"
          className="!rounded-none border-line bg-bg-elev marquee-rj"
        />
      </div>
    </section>
  );
}
