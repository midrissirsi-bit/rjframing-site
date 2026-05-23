"use client";

import InteractiveImageBentoGallery, {
  type ImageItem,
} from "@/components/ui/bento-gallery";

const projectItems: ImageItem[] = [
  {
    id: "rj-p01",
    title: "Modern Infill",
    desc: "Custom Build - Toronto",
    url: "/images/project-01-modern-tudor.jpg",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: "rj-p02",
    title: "Open Wood Frame",
    desc: "Custom Build - Toronto",
    url: "/images/project-02-winter-frame.jpg",
    span: "md:row-span-2",
  },
  {
    id: "rj-p03",
    title: "Tight Lot",
    desc: "Custom Build - Toronto",
    url: "/images/project-03-winter-aerial.jpg",
    span: "md:row-span-1",
  },
  {
    id: "rj-p04",
    title: "Roof Lift",
    desc: "Custom Build - Toronto",
    url: "/images/project-04-autumn-crane.jpg",
    span: "md:row-span-1",
  },
  {
    id: "rj-p05",
    title: "Interior Frame",
    desc: "Custom Build - Toronto",
    url: "/images/project-05-interior-joists.jpg",
    span: "md:row-span-2",
  },
  {
    id: "rj-p06",
    title: "Wood & Steel",
    desc: "Custom Build - Toronto",
    url: "/images/project-06-wood-steel.jpg",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: "rj-p07",
    title: "Substructure",
    desc: "Custom Build - Toronto",
    url: "/images/project-07-basement.jpg",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: "rj-p08",
    title: "Shell Complete",
    desc: "Custom Build - Toronto",
    url: "/images/project-08-summer-osb.jpg",
    span: "md:row-span-2",
  },
  {
    id: "rj-p09",
    title: "Trusses Up",
    desc: "Custom Build - Toronto",
    url: "/images/project-09-trusses.jpg",
    span: "md:row-span-1",
  },
  {
    id: "rj-p10",
    title: "Wooded Estate",
    desc: "Custom Build - Toronto",
    url: "/images/project-10-forest.jpg",
    span: "md:row-span-1",
  },
  {
    id: "rj-p11",
    title: "Dormer Build",
    desc: "Custom Build - Toronto",
    url: "/images/project-11-dormer.jpg",
    span: "md:row-span-2",
  },
  {
    id: "rj-p12",
    title: "Steel Beams",
    desc: "Custom Build - Toronto",
    url: "/images/project-12-steel-beams.jpg",
    span: "md:col-span-2 md:row-span-2",
  },
];

export function WorkGallery() {
  return (
    <InteractiveImageBentoGallery
      imageItems={projectItems}
      eyebrow="Selected Work"
      title={
        ("Project portfolio") as unknown as string
      }
      description="A scroll-and-drag gallery of recent RJ Framing projects across the GTA. Click any tile to expand."
    />
  );
}
