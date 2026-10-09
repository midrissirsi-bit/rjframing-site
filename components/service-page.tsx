import Image from "next/image";
import { Nav } from "@/components/nav";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { MobileCta } from "@/components/mobile-cta";
import { AnnotatedPhoto } from "@/components/annotated-photo";
import { services, type Service } from "@/lib/services";

const SITE = "https://www.rjframing.ca";
const pad = (n: number) => String(n).padStart(2, "0");

function schemaFor(s: Service) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.name,
      serviceType: s.name,
      description: s.metaDescription,
      url: `${SITE}/${s.slug}`,
      provider: { "@id": `${SITE}/#business` },
      areaServed: ["Toronto", "North York", "Scarborough", "Stouffville", "Vaughan", "Aurora", "Richmond Hill", "Greater Toronto Area"].map(
        (name) => ({ "@type": "City", name }),
      ),
      image: `${SITE}${s.hero.img}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/#services` },
        { "@type": "ListItem", position: 3, name: s.name, item: `${SITE}/${s.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];
}

export function ServicePage({ service: s }: { service: Service }) {
  const others = services.filter((o) => o.slug !== s.slug);
  const storyPhoto = s.projects[0];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFor(s)) }} />
      <Nav />
      <main className="service-page">
        {/* hero: the argument + a real photo with notes pinned to it */}
        <section id="top" className="px-6 pb-20 pt-28 md:px-16 md:pb-28 md:pt-40">
          <div className="mx-auto max-w-[1480px]">
            <nav aria-label="Breadcrumb" className="mb-10 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-mute">
              <ol className="flex flex-wrap items-center gap-2">
                <li><a href="/" className="inline-flex min-h-[44px] min-w-[44px] items-center hover:text-bone">Home</a></li>
                <li aria-hidden>/</li>
                <li><a href="/#services" className="inline-flex min-h-[44px] items-center hover:text-bone">Services</a></li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-brand">{s.name}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-6">
                <h1 className="display text-bone" style={{ fontSize: "clamp(40px, 5.2vw, 84px)", lineHeight: 1 }}>
                  {s.h1} <em>{s.h1Em}</em>
                </h1>
                <p className="mt-7 max-w-[48ch] text-[17px] leading-relaxed text-bone-dim md:text-[18px]">{s.intro}</p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a href="#contact" className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-brand px-8 font-mono text-[12px] uppercase tracking-[0.18em] text-bg transition-colors hover:bg-bone active:scale-[0.98]">
                    Get a quote
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
                      <path d="M5 19 L19 5 M19 5 H8 M19 5 V16" strokeLinecap="square" />
                    </svg>
                  </a>
                  <a href="tel:+12896885951" className="inline-flex min-h-[52px] items-center rounded-full border border-bone/70 px-8 font-mono text-[12px] uppercase tracking-[0.18em] text-bone transition-colors hover:bg-bone hover:text-bg active:scale-[0.98]">
                    Call (289) 688-5951
                  </a>
                </div>
                <p className="mt-5 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-mute">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                  We reply within 24 hours
                </p>
              </div>
              <div className="md:col-span-6">
                <AnnotatedPhoto
                  photo={s.hero}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="relative aspect-[4/5] w-full rounded-sm border border-line md:aspect-[5/4]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* scope: a GC reads a scope of work, so it is laid out like one */}
        <section className="border-t border-line bg-[#0d1219] px-6 py-20 md:px-16 md:py-32">
          <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-14 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7" data-reveal>
              <span className="mono-label">Scope</span>
              <h2 className="display mt-4 text-bone" style={{ fontSize: "clamp(32px, 3.6vw, 56px)", lineHeight: 1.02 }}>
                {s.scopeTitle}
              </h2>
              <dl className="mt-10 border-t border-line">
                {s.scope.map((row, i) => (
                  <div key={row.item} className="grid grid-cols-[44px_1fr] gap-x-4 border-b border-line py-5 md:grid-cols-[56px_220px_1fr] md:gap-x-8">
                    <span className="font-mono text-[11px] tracking-[0.18em] text-brand">{pad(i + 1)}</span>
                    <dt className="font-display text-[22px] leading-tight text-bone" style={{ fontVariationSettings: "'opsz' 36" }}>{row.item}</dt>
                    <dd className="col-start-2 mt-1.5 text-[16px] leading-relaxed text-bone-dim md:col-start-3 md:mt-0">{row.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <figure className="relative self-start overflow-hidden rounded-sm border border-line md:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "0.12s" }}>
              <div className="relative aspect-[4/5]">
                <Image src={storyPhoto.img} alt={storyPhoto.alt} fill sizes="(max-width: 768px) 100vw, 40vw" className="service-drift object-cover" style={{ objectPosition: "center 72%" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                {s.story ? (
                  <>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand">{s.story.label}</span>
                    <blockquote className="mt-3 font-display text-[22px] leading-snug text-bone md:text-[26px]" style={{ fontVariationSettings: "'opsz' 36" }}>
                      {s.story.quote === false ? s.story.text : <>&ldquo;{s.story.text}&rdquo;</>}
                    </blockquote>
                    <span className="mt-4 block font-mono text-[10px] uppercase tracking-[0.18em] text-bone-mute">{s.story.source}</span>
                  </>
                ) : (
                  <>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand">{storyPhoto.where}</span>
                    <span className="mt-2 block font-display text-[26px] leading-tight text-bone">{storyPhoto.title}</span>
                  </>
                )}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* real jobs */}
        <section className="px-6 py-20 md:px-16 md:py-32">
          <div className="mx-auto max-w-[1480px]">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6" data-reveal>
              <div>
                <span className="mono-label">Recent jobs</span>
                <h2 className="display mt-4 text-bone" style={{ fontSize: "clamp(32px, 3.6vw, 56px)", lineHeight: 1.02 }}>
                  Framed by our <em>crew.</em>
                </h2>
              </div>
              <a href="/#work" className="inline-flex min-h-[44px] items-center font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim hover:text-bone">
                Full portfolio &rarr;
              </a>
            </div>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {s.projects.map((p, i) => (
                <li key={p.img + i} className="group relative overflow-hidden rounded-sm border border-line" data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 0.08}s` }}>
                  <div className="relative aspect-[4/5]">
                    <Image src={p.img} alt={p.alt} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-3 md:p-5">
                    <h3 className="font-display text-[17px] leading-tight text-bone md:text-xl">{p.title}</h3>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-bone-dim md:text-[10px]">{p.where}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a href="/#process" className="group mt-12 flex flex-wrap items-center justify-between gap-4 border-y border-line py-6" data-reveal>
              <span className="font-display text-[22px] leading-snug text-bone md:text-[28px]" style={{ fontVariationSettings: "'opsz' 36" }}>
                We&apos;re the part of your build between the foundation and the drywall.
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand transition-transform group-hover:translate-x-1">
                See how a job runs &rarr;
              </span>
            </a>
          </div>
        </section>

        {/* questions a GC or homeowner actually asks */}
        <section className="border-t border-line bg-[#0d1219] px-6 py-20 md:px-16 md:py-32">
          <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
            <div data-reveal>
              <span className="mono-label">Questions</span>
              <h2 className="display mt-4 text-bone" style={{ fontSize: "clamp(32px, 3.6vw, 56px)", lineHeight: 1.02 }}>
                Before you <em>call.</em>
              </h2>
            </div>
            <div className="border-t border-line">
              {s.faq.map((f) => (
                <details key={f.q} className="service-faq group border-b border-line">
                  <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[20px] leading-snug text-bone md:text-[24px]" style={{ fontVariationSettings: "'opsz' 36" }}>
                    {f.q}
                    <span className="shrink-0 font-mono text-[18px] text-brand transition-transform duration-300 group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="max-w-[62ch] pb-6 text-[16px] leading-relaxed text-bone-dim md:text-[17px]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* sideways links to the other services */}
        <section className="px-6 pt-20 md:px-16 md:pt-28">
          <div className="mx-auto max-w-[1480px]">
            <span className="mono-label">Also framed by RJ</span>
            <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
              {others.map((o) => (
                <li key={o.slug}>
                  <a href={`/${o.slug}`} className="group relative flex min-h-[140px] items-end overflow-hidden rounded-sm border border-line p-6">
                    <Image src={o.hero.img} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-50 transition-all duration-700 group-hover:scale-105 group-hover:opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-transparent" />
                    <span className="relative font-display text-[26px] leading-tight text-bone md:text-[32px]">
                      {o.name} <span className="font-mono text-[12px] text-brand">&rarr;</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
