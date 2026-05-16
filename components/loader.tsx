"use client";

import { useEffect, useRef } from "react";

export function Loader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      ref.current?.classList.add("done");
      document.body.classList.remove("pre-load");
      window.setTimeout(() => {
        if (ref.current) ref.current.style.display = "none";
      }, 900);
    }, 1300);
    document.body.classList.add("pre-load");
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[9999] grid place-items-center bg-bg pointer-events-none transition-opacity duration-500 [&.done]:opacity-0"
    >
      <div className="text-center">
        <div className="font-display font-light leading-none text-bone" style={{ fontSize: "clamp(56px, 10vw, 120px)", letterSpacing: "-0.03em" }}>
          RJ <em className="not-italic" style={{ fontStyle: "italic", color: "#29c5e8", fontVariationSettings: '"opsz" 144, "WONK" 1' }}>Framing</em>
        </div>
        <div className="mt-5 mx-auto relative overflow-hidden bg-line" style={{ width: 220, height: 1 }}>
          <div className="absolute bg-brand animate-load" style={{ inset: "0 100% 0 0" }} />
        </div>
        <div className="mt-3.5 font-mono text-[11px] tracking-[0.16em] uppercase text-bone-mute">
          Rough Carpentry — GTA · Barrie
        </div>
      </div>
    </div>
  );
}
