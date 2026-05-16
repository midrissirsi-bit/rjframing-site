"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  num: string;        // The headline number/value (kept as string so "240k", "GTA" etc. all work)
  suffix?: string;    // Optional unit/suffix in cyan italic (%, ft², + etc.)
  label: string;      // Mono uppercase label
  emphasize?: boolean; // Wraps the number in <em> for the wonky cyan italic treatment
}

// Ray's credibility record — moves past you in a slow horizontal ticker.
// Edit these as the real numbers come in.
const stats: Stat[] = [
  { num: "5",   suffix: "+",  label: "Years in trade",   emphasize: true },
  { num: "42",                label: "Builds completed" },
  { num: "240", suffix: "k ft²", label: "Sq ft framed" },
  { num: "147",               label: "Steel beams set" },
  { num: "100", suffix: "%",  label: "Inspection pass",  emphasize: true },
  { num: "0",                 label: "Callbacks last yr", emphasize: true },
  { num: "11",  suffix: " day", label: "Avg frame time" },
  { num: "GTA", suffix: " + Barrie", label: "Service radius" },
];

function StatTile({ num, suffix, label, emphasize }: Stat) {
  return (
    <div className="group relative h-40 w-[280px] shrink-0 overflow-hidden border border-line bg-bg-elev p-6 transition-colors duration-500 hover:border-brand/60">
      {/* Soft cyan wash on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-700 g