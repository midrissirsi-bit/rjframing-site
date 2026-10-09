"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* A note is pinned to a real feature in the photo. x/y are fractions of the
   ORIGINAL image, so the pin stays on the steel beam (or the sign, or Ray)
   however object-cover crops it at a given box size. */
export type Note = { x: number; y: number; label: string; side: "l" | "r" };

export type Photo = {
  img: string;
  w: number;
  h: number;
  alt: string;
  notes: Note[];
};

/* `on` drives the reveal. Leave it undefined and the photo switches itself on
   when it scrolls into view. Positioning is the caller's job (pass relative or
   absolute in className); this component only owns the surface. */
export function AnnotatedPhoto({
  photo,
  on,
  className = "",
  sizes = "(max-width: 768px) 100vw, 60vw",
  priority = false,
}: {
  photo: Photo;
  on?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    let io: IntersectionObserver | undefined;
    if (on === undefined) {
      io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.35 });
      io.observe(el);
    }
    return () => {
      ro.disconnect();
      io?.disconnect();
    };
  }, [on]);

  const active = on ?? seen;

  // object-cover maths: where does a point on the original image land in this box?
  const scale = box.w && box.h ? Math.max(box.w / photo.w, box.h / photo.h) : 0;
  const offX = (box.w - photo.w * scale) / 2;
  const offY = (box.h - photo.h * scale) / 2;

  return (
    <div ref={boxRef} className={`process-plate overflow-hidden ${active ? "on" : ""} ${className}`}>
      <div className="process-plate-img absolute inset-0">
        <Image src={photo.img} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-bg/20" />
      {scale > 0 &&
        photo.notes.map((n, i) => {
          const x = offX + n.x * photo.w * scale;
          const y = offY + n.y * photo.h * scale;
          if (x < 12 || x > box.w - 12 || y < 12 || y > box.h - 12) return null;
          // keep the label inside the photo: take the preferred side if the label fits, else the roomier one
          const lead = box.w < 500 ? 46 : 64; // dot + leader line + breathing room
          const room = { l: x - lead, r: box.w - x - lead };
          const want = n.label.length * (box.w < 500 ? 7 : 8.4) + 20;
          const side: "l" | "r" = room[n.side] >= want ? n.side : room.l > room.r ? "l" : "r";
          return (
            <div
              key={n.label}
              className={`process-note absolute ${side === "l" ? "flex-row-reverse" : ""} flex items-center`}
              style={{ left: x, top: y, transitionDelay: `${0.45 + i * 0.18}s`, transform: `translate(${side === "l" ? "-100%" : "0"}, -50%)` }}
            >
              <span className="process-note-dot" />
              <span className={`process-note-line ${side === "l" ? "origin-right" : "origin-left"}`} style={{ transitionDelay: `${0.5 + i * 0.18}s` }} />
              <span className="process-note-label" style={{ transitionDelay: `${0.75 + i * 0.18}s`, maxWidth: Math.max(90, room[side]) }}>
                {n.label}
              </span>
            </div>
          );
        })}
    </div>
  );
}
