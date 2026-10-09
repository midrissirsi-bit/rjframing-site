import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Page not found | RJ Framing",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative grid min-h-[100dvh] grid-cols-1 bg-bg md:grid-cols-[1.05fr_1fr]">
      <div className="flex flex-col justify-between px-6 py-8 md:px-16 md:py-12">
        <a href="/" className="block h-14 w-fit md:h-16">
          <img src="/images/logo.png" alt="RJ Framing" className="h-full w-auto" style={{ mixBlendMode: "screen" }} />
        </a>

        <div className="py-16 md:py-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand">Error 404</span>
          <h1 className="display mt-5 max-w-[14ch] text-bone" style={{ fontSize: "clamp(44px, 6.4vw, 96px)", lineHeight: 0.98 }}>
            This page isn&apos;t <em>framed</em> yet.
          </h1>
          <p className="mt-6 max-w-[42ch] text-[17px] leading-relaxed text-bone-dim">
            The link might be old, or the page has moved. Everything we do is on the home page, and the quote form is one
            tap away.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="/"
              className="inline-flex min-h-[48px] items-center gap-3 rounded-full bg-brand px-7 font-mono text-[12px] uppercase tracking-[0.18em] text-bg transition-colors hover:bg-bone active:scale-[0.98]"
            >
              Back to the home page
            </a>
            <a
              href="/#contact"
              className="inline-flex min-h-[48px] items-center gap-3 rounded-full border border-bone/70 px-7 font-mono text-[12px] uppercase tracking-[0.18em] text-bone transition-colors hover:bg-bone hover:text-bg active:scale-[0.98]"
            >
              Get a quote
            </a>
          </div>
        </div>

        <a href="tel:+12896885951" className="inline-flex min-h-[44px] w-fit items-center font-mono text-[11px] uppercase tracking-[0.18em] text-bone-mute hover:text-bone">
          Or call (289) 688-5951
        </a>
      </div>

      <div className="relative min-h-[46vh] overflow-hidden md:min-h-0">
        <Image
          src="/images/project-02-winter-frame.jpg"
          alt="Open stud walls on a rear addition in winter, framed by RJ Framing"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-transparent md:bg-gradient-to-r md:via-bg/10" />
        <span className="absolute bottom-6 right-6 bg-bg/75 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-dim">
          Rear addition &middot; studs up, nothing behind them yet
        </span>
      </div>
    </main>
  );
}
