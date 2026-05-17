"use client";

import InteractiveImageBentoGallery, {
  type ImageItem,
} from "@/components/ui/bento-gallery";

const projectItems: ImageItem[] = [
  {
    id: "rj-2025-001",
    title: "Open-Concept Custom",
    desc: "Vaughan · 4,800 sqft · 40-foot steel span",
    url: "/images/hero-vaughan.png",
    span: "md:col-span-2 md:row-span-2",
    meta: { left: "2025 · 4,800 SQFT", right: "11-DAY FRAME" },
  },
  {
    id: "rj-2025-002",
    title: "Heritage Tie-In",
    desc: "Aurora · rear addition · 3 steel beams",
    url: "/images/hero-aurora.png",
    span: "md:row-span-2",
    meta: { left: "2025 · ADDITION", right: "STEEL × 3" },
  },
  {
    id: "rj-2024-007",
    title: "Tight Infill",
    desc: "Toronto · 28 × 100 ft lot · zero shared walls",
    url: "/images/hero-toronto.png",
    span: "md:row-span-1",
    meta: { left: "2024 · TIGHT LOT", right: "ZERO SHARED" },
  },
  {
    id: "rj-2024-009",
    title: "Retail Buildout",
    desc: "Barrie · 4,500 sqft commercial · 3-week turnover",
    url: "/images/hero-barrie.png",
    span: "md:row-span-1",
    meta: { left: "2024 · COMMERCIAL", right: "3-WEEK" },
  },
  {
    id: "rj-2024-014",
    title: "Steel Moment Frame",
    desc: "Richmond Hill · W14 beam · HSS columns",
    url: "/images/hero-richmond.png",
    span: "md:col-span-2 md:row-span-1",
    meta: { left: "2024 · RESIDENTIAL", right: "W-FLANGE + MOMENT" },
  },
  {
    id: "rj-2023-018",
    title: "Cantilever Addition",
    desc: "King City · 12-foot cantilever · custom engineering",
    url: "/images/hero-king-city.png",
    span: "md:row-span-2",
    meta: { left: "2023 · CUSTOM", right: "12FT CANTILEVER" },
  },
];

export function WorkGallery() {
  return (
    <InteractiveImageBentoGallery
      imageItems={projectItems}
      eyebrow="Selected Work"
      title={
        ("Builds we've raised. Walls we've squared.") as unknown as string
      }
      description="A scroll-and-drag gallery of recent RJ Framing projects across the GTA. Click any tile to expand."
    />
  );
}
