"use client";

import { useState } from "react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/maqkddnk", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-bg px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-16">
          <span className="mono-label">006 / Get a quote</span>
          <h2 className="display mt-5 max-w-[14ch]" style={{ fontSize: "clamp(56px, 11vw, 180px)", lineHeight: 0.92 }}>
            Tell us what <em>you are</em>
            <br />building.
          </h2>
          <p
            className="mt-7 max-w-[38ch] font-display text-bone-dim font-light"
            style={{ fontSize: "clamp(20px, 1.9vw, 26px)", lineHeight: 1.3, fontVariationSettings: "'opsz' 36" }}
          >
            Walk the site, read the prints, send a number inside a week. No padding, no boilerplate - just what the frame will cost and how long it will take.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr] md:gap-12">
          {/* Form card - lifted out of the dark with subtle bg + cyan glow */}
          <div
            className="relative rounded-sm p-8 md:p-12"
            style={{
              background: "linear-gradient(165deg, rgba(28,35,48,0.85) 0%, rgba(20,24,31,0.65) 100%)",
              border: "1px solid rgba(41,197,232,0.18)",
              boxShadow: "0 0 80px -30px rgba(41,197,232,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* Blueprint corner ticks on the form card */}
            <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-brand/70" />
            <span className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-brand/70" />
            <span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-brand/70" />
            <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-brand/70" />

            <form
              className="flex flex-col gap-7"
              action="https://formspree.io/f/maqkddnk"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                <Field label="Name" id="name" type="text" placeholder="Your name" required />
                <Field label="Email" id="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                <Field label="Phone" id="phone" type="tel" placeholder="(416) 555-0100" />
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-mute" htmlFor="type">Project type</label>
                  <select id="type" name="type" className="border-0 border-b border-line bg-transparent py-3 font-display text-[22px] text-bone outline-none focus:border-brand transition-colors" style={{ fontVariationSettings: "'opsz' 36" }}>
                    <option style={{ background: "#14181f", color: "#e8ecf0" }}>Wood framing</option>
                    <option style={{ background: "#14181f", color: "#e8ecf0" }}>Steel framing</option>
                    <option style={{ background: "#14181f", color: "#e8ecf0" }}>Steel beams &amp; columns</option>
                    <option style={{ background: "#14181f", color: "#e8ecf0" }}>Back framing / renovation</option>
                    <option style={{ background: "#14181f", color: "#e8ecf0" }}>Multiple / not sure</option>
                  </select>
                </div>
              </div>
              <Field label="Site location" id="site" type="text" placeholder="City, neighbourhood, or address" />
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-mute" htmlFor="msg">Tell us about your project</label>
                <textarea id="msg" name="msg" placeholder="Size, timeline, drawings, anything you want us to know" className="min-h-[100px] resize-y border-0 border-b border-line bg-transparent py-3 font-sans text-[17px] text-bone outline-none focus:border-brand transition-colors" />
              </div>
              <button type="submit" disabled={status === "submitting"} className="mt-3 inline-flex items-center gap-3.5 self-start rounded-full bg-brand px-9 py-5 font-mono text-[12px] tracking-[0.2em] uppercase text-bg transition-all duration-300 hover:bg-bone disabled:opacity-60 disabled:cursor-not-allowed" style={{ boxShadow: "0 0 30px -8px rgba(41,197,232,0.5)" }}>
                {status === "submitting" ? "Sending..." : "Submit quote request"}
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M5 19 L19 5 M19 5 H8 M19 5 V16" strokeLinecap="square"/>
                </svg>
              </button>
              <div className="min-h-[14px] font-mono text-[11px]" style={{ color: status === "error" ? "#ff6b6b" : "#29c5e8" }}>
                {status === "success" && "Thanks - we will be in touch within 24 hours."}
                {status === "error" && "Something went wrong. Please email rjframinginc@gmail.com or call (289) 688-5951."}
              </div>
            </form>
          </div>

          <aside className="flex flex-col gap-9 border-t border-line pt-5">
            <Info label="Call direct" href="tel:+12896885951">+1 (289) 688&middot;5951</Info>
            <Info label="Email" href="mailto:rjframinginc@gmail.com">rjframinginc@gmail.com</Info>
            <Info label="Service area">GTA &amp; surrounding<br />areas</Info>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-mute">Hours</span>
              <span className="font-display text-lg text-bone leading-relaxed">
                Mon-Fri 8:00-19:00<br />Sat 8:00-14:00<br />Sun closed
              </span>
            </div>
            <Info label="Follow" href="https://www.instagram.com/rj.framing/">@rj.framing &uarr;</Info>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, type, placeholder, required }: { label: string; id: string; type: string; placeholder: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-mute" htmlFor={id}>{label}</label>
      <input id={id} name={id} type={type} placeholder={placeholder} required={required} className="border-0 border-b border-line bg-transparent py-3 font-display text-[22px] text-bone outline-none focus:border-brand transition-colors" style={{ fontVariationSettings: "'opsz' 36" }} />
    </div>
  );
}

function Info({ label, href, children }: { label: string; href?: string; children: React.ReactNode }) {
  const valueClasses = "font-display text-bone leading-[1.15] hover:text-brand transition-colors";
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-mute">{label}</span>
      {href ? (
        <a className={valueClasses} href={href} style={{ fontSize: "clamp(22px, 2.2vw, 30px)", fontVariationSettings: "'opsz' 36" }}>{children}</a>
      ) : (
        <span className={valueClasses} style={{ fontSize: "clamp(22px, 2.2vw, 30px)", fontVariationSettings: "'opsz' 36" }}>{children}</span>
      )}
    </div>
  );
}
