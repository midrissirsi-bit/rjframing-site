"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ThreeFrame } from "./three-frame";

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Character-by-character split + reveal
    const headline = headlineRef.current;
    if (!headline) return;

    const words = headline.querySelectorAll<HTMLElement>(".word");
    words.forEach((word) => {
      const isEm = !!word.querySelector("em");
      const text = word.textContent ?? "";
      word.innerHTML = "";
      [...text].forEach((ch) => {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = ch === " " ? " " : ch;
        span.style.transform = "translateY(110%) rotate(8deg)";
        span.style.opacity = "0";
        if (isEm) {
          span.style.fontStyle = "italic";
          span.style.color = "#29c5e8";
          span.style.fontVariationSettings = '"opsz" 144, "WONK" 1';
        }
        word.appendChild(span);
      });
    });

    gsap.to(".hero-headline .char", {
      y: 0,
      opacity: 1,
      rotate: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: { each: 0.025, from: "start" },
      delay: 0.3,
    });
  }, []);

  return (
    <section className="hero relative min-h-[220vh]" id="top">
      <div className="hero-stage">
        <div className="absolute inset-0 hero-bg-grad">
          <ThreeFrame />
        </div>
        <div className="grain absolute inset-0 z-[2] pointer-events-none" />
        <div className="hero-vignette absolute inset-0 z-[1] pointer-events-none" />

        <div className="relative z-[3] flex items-center gap-3 text-bone">
          <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-brand" />
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase">
            EST. 2020 · GTA
          </span>
        </div>

        <h1
          ref={headlineRef}
          className="hero-headline display relative z-[3] mt-6"
          style={{ fontSize: "clamp(56px, 11.5vw, 184px)" }}
        >
          <span className="line"><span className="word">We</span> <span className="word">frame</span></span>
          <span className="line"><span className="word">what</span> <span className="word"><em>others</em></span></span>
          <span className="line"><span className="word">can&apos;t.</span></span>
        </h1>

        <div className="relative z-[3] mt-10 grid grid-cols-1 items-end gap-7 md:grid-cols-[1.2fr_1fr_1fr] md:gap-10">
          <p className="font-display max-w-[32ch] text-bone text-[clamp(20px,1.9vw,26px)] font-light leading-[1.25]" style={{ fontVariationSettings: "'opsz' 36" }}>
            Custom homes, additions, renovations, commercial builds, multiplexes. Built right the first time on the kind of jobs other crews turn down.
          </p>
          <div className="flex flex-col gap-1.5">
            <span className="mono-label">Specializing in</span>
            <span className="font-display text-xl text-bone">
              Wood <span style={{ color: "#29c5e8" }}>·</span> Steel <span style={{ color: "#29c5e8" }}>·</span> Beams
            </span>
          </div>
          <div className="flex flex-wrap gap-3.5">
            <a href="#contact" className="btn btn-primary">
              Request a quote
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M5 19 L19 5 M19 5 H8 M19 5 V16" strokeLinecap="square"/>
              </svg>
            </a>
            <a href="#work" className="btn btn-ghost">
              See the work
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M5 12 H19 M13 6 L19 12 L13 18" strokeLinecap="square"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="absolute bottom-7 left-1/2 z-[3] -translate-x-1/2 text-bone-mute flex flex-col items-center gap-2.5">
          <span className="mono-label">SCROLL TO BUILD</span>
          <span className="h-12 w-px bg-gradient-to-b from-bone-mute to-transparent animate-cue" />
        </div>
      </div>
    </section>
  );
}
