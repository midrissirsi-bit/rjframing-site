"use client";

type Review = {
  name: string;
  meta: string;
  stars: number;
  text: string;
};

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=rj+framing#lrd=0x66165487fee58f51:0x3db771c1e4050081,1,,,,";

const reviews: Review[] = [
  {
    name: "Parm Dhanoa",
    meta: "Google Review",
    stars: 5,
    text: "Ray and his team did some structural modifications at our truck shop. We were very pleased with his professionalism and end product, and he coordinated with the structural engineer to save us money where he could.",
  },
  {
    name: "Robby Wexler",
    meta: "Local Guide · Google Review",
    stars: 5,
    text: "Ray is a great framer and his team work hard to stay on track and on budget. Highly recommend.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="relative z-10 flex gap-1.5 text-brand" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="rev-star inline-flex" style={{ animationDelay: `${0.18 + i * 0.09}s` }}>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="bg-bg px-6 py-16 md:px-16 md:py-32">
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-[200px_1fr] md:gap-16">
          <div className="flex flex-col gap-2.5 pt-4">
            <span className="mono-label">Reviews</span>
            <span className="mono-label bright">Verified on Google</span>
          </div>
          <div>
            <h2 className="display max-w-[18ch]" style={{ fontSize: "clamp(40px, 5.5vw, 84px)", lineHeight: 0.96 }}>
              Straight from <em>the site.</em>
            </h2>
            <p className="mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-bone-mute">
              What clients say after the crew leaves
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {reviews.map((r, i) => (
            <figure
              key={r.name}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 0.1}s` }}
              className="group relative flex flex-col overflow-hidden rounded-sm border border-line bg-bg-elev p-7 transition-colors duration-500 hover:border-brand/40 md:p-9"
            >
              {/* oversized decorative quote mark */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-10 left-3 select-none font-display leading-none text-brand/[0.07]"
                style={{ fontSize: "200px", fontVariationSettings: "'WONK' 1" }}
              >
                &ldquo;
              </span>

              {/* inspection-style "verified" stamp */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-6 top-6 hidden rotate-[-8deg] items-center gap-1 rounded border border-brand/25 px-2 py-1 font-mono text-[8px] tracking-[0.22em] uppercase text-brand/40 sm:inline-flex"
              >
                <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M5 13l4 4L19 7" strokeLinecap="square" />
                </svg>
                Verified
              </span>

              <span className="pointer-events-none absolute left-3 top-3 h-2.5 w-2.5 border-l border-t border-brand/50" />
              <span className="pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 border-r border-t border-brand/50" />
              <span className="pointer-events-none absolute bottom-3 left-3 h-2.5 w-2.5 border-b border-l border-brand/50" />
              <span className="pointer-events-none absolute bottom-3 right-3 h-2.5 w-2.5 border-b border-r border-brand/50" />

              <Stars count={r.stars} />
              <blockquote
                className="relative z-10 mt-5 grow font-display font-light text-bone"
                style={{ fontSize: "clamp(19px, 2vw, 25px)", lineHeight: 1.42, letterSpacing: "-0.01em", fontVariationSettings: "'opsz' 60" }}
              >
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <figcaption className="relative z-10 mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-5">
                <span className="font-display text-lg text-bone" style={{ fontVariationSettings: "'WONK' 1" }}>{r.name}</span>
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-bone-mute">{r.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* aggregate + leave-a-review CTA */}
        <div data-reveal className="mt-10 flex flex-col items-start gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone-mute">
            <span className="text-brand">5.0</span> average &middot; Verified on Google
          </p>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-line px-5 py-3 font-mono text-[11px] tracking-[0.2em] uppercase text-bone transition-colors hover:border-brand hover:text-brand"
          >
            Leave a review on Google
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M5 19 L19 5 M19 5 H8 M19 5 V16" strokeLinecap="square" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
