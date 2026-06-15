"use client";

import { useState } from "react";

type QA = { q: string; a: string };

const faqs: QA[] = [
  {
    q: "Do you do both wood and steel framing?",
    a: "We do both, and most of our GTA builds use a mix of the two. That covers wood framing for custom homes, additions and renovations, steel-stud framing where the plans call for it, and structural steel like beams, columns and moment frames set to engineering spec. One crew handles all of it.",
  },
  {
    q: "What areas do you serve?",
    a: "We frame across the Greater Toronto Area and the towns around it, including Toronto, Vaughan, Aurora, Richmond Hill, North York, Scarborough and Stouffville. If you're building in or near the GTA, send over the address and we'll confirm we can get to you.",
  },
  {
    q: "How much does framing cost?",
    a: "Every build prices differently. It comes down to square footage, how involved the structure is, wood versus steel, and how tight the site is to work on. A flat per-foot rate almost never holds up, so we'd rather price off your actual drawings. Send the prints and scope and we'll get you a real number.",
  },
  {
    q: "How long does framing take?",
    a: "A single addition frames up far quicker than a full custom home, so the honest answer is that it depends on the build. What you can count on is that once your start date is locked in, we're on site that day with the lumber and steel already lined up, so nothing stalls waiting on a delivery.",
  },
  {
    q: "Do you install structural steel beams and columns?",
    a: "Yes. We set W-flange beams, HSS columns and moment frames to engineering spec, including the open-concept and high-load work plenty of crews pass on. It goes in clean, gets signed off, and it's ready for the inspector.",
  },
  {
    q: "Do you take on additions and second-storey builds?",
    a: "That's a big part of our work. We frame rear and side additions, second-storey add-ons and full renovations, and we tie the new framing into the existing house so everything lines up and passes inspection. Ray and the crew have put up dozens of these around the GTA.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function FaqItem({ q, a, open, onToggle }: QA & { open: boolean; onToggle: () => void }) {
  return (
    <div className="faq-item">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-6 py-6 text-left"
      >
        <span className="font-display text-bone" style={{ fontSize: "clamp(20px, 2.4vw, 30px)", lineHeight: 1.2, fontVariationSettings: "'opsz' 48" }}>
          {q}
        </span>
        <span className="faq-icon mt-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand/50 text-brand" data-open={open} aria-hidden="true">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M12 5v14M5 12h14" strokeLinecap="square" />
          </svg>
        </span>
      </button>
      <div className="faq-body" data-open={open}>
        <div className="faq-body-inner">
          <p className="max-w-[68ch] pb-7 pr-10 text-[16px] leading-relaxed text-bone-dim">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="bg-bg px-6 py-16 md:px-16 md:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-[200px_1fr] md:gap-16">
          <div className="flex flex-col gap-2.5 pt-4">
            <span className="mono-label">FAQ</span>
            <span className="mono-label bright">Common questions</span>
          </div>
          <div>
            <h2 className="display max-w-[16ch]" style={{ fontSize: "clamp(40px, 5.5vw, 84px)", lineHeight: 0.96 }}>
              Before you <em>reach out.</em>
            </h2>
          </div>
        </div>

        <div data-reveal className="mx-auto md:ml-[calc(200px+4rem)] md:max-w-[1000px]">
          {faqs.map((f, i) => (
            <FaqItem key={i} {...f} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
