"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Manifesto() {
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    const walk = (node: Node) => {
      if (node.nodeType === 3) {
        const frag = document.createDocumentFragment();
        (node.textContent ?? "").split(/(\s+)/).forEach((part) => {
          if (/\s+/.test(part)) frag.appendChild(document.createTextNode(part));
          else if (part.length) {
            const s = document.createElement("span");
            s.className = "reveal-word";
            s.textContent = part;
            frag.appendChild(s);
          }
        });
        node.parentNode?.replaceChild(frag, node);
      } else if (node.nodeType === 1 && node.childNodes.length) {
        [...node.childNodes].forEach(walk);
      }
    };
    walk(body);

    const words = body.querySelectorAll(".reveal-word");
    const trigger = ScrollTrigger.create({
      trigger: body,
      start: "top 75%",
      end: "bottom 40%",
      scrub: 1,
      onUpdate: (self) => {
        const upto = Math.floor(self.progress * words.length);
        words.forEach((w, i) => w.classList.toggle("lit", i < upto));
      },
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <section className="px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-[1480px]">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[200px_1fr] md:gap-16">
          <div className="flex flex-col gap-2.5 pt-4">
            <span className="mono-label">001 ·</span>
            <span className="mono-label bright">Manifesto</span>
          </div>
          <p
            ref={bodyRef}
            className="font-display max-w-[22ch] text-bone font-light"
            style={{ fontSize: "clamp(24px, 3vw, 44px)", lineHeight: 1.18, letterSpacing: "-0.015em", fontVariationSettings: '"opsz" 96' }}
          >
            Framing is the <em className="not-italic" style={{ fontStyle: "italic", color: "#29c5e8" }}>bones</em>. If they&apos;re off, everything else compensates forever — floors squeak, walls bow, trim never quite sits. We don&apos;t compensate. We measure twice, snap clean lines, and frame to spec.
        </div>
      </div>
    </section>
  );
}
