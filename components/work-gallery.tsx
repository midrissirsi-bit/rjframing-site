"use client";

import { useEffect, useState } from "react";

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
  { id: "rj-p13", title: "Project Musselman Lake", desc: "Custom Build - Stouffville",       url: "/images/project-13-musselman-lake.jpg", span: "row-span-2" },
];

export function WorkGallery() {
  // Render the list twice so the marquee can loop seamlessly (translateX -50% = back to start)
  const loop = [...projectItems, ...projectItems];

  const [selected, setSelected] = useState<ProjectItem | null>(null);

  // ESC closes the lightbox; body scroll locked while open
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown",