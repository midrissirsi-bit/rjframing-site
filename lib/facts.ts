/* RJ's numbers live here once. The stats section, the page metadata and any
   copy that quotes a figure read from this file, so they can't drift apart.
   Confirmed by Idris 2026-10-09 (see FACTS.md). */
export const facts = {
  yearsInTrade: 5, // shown as "5+"
  buildsCompleted: 76,
  sqftFramedK: 240,
  steelBeamsSet: 147,
  inspectionPassPct: 100,
  callbacksLastYear: 0,
} as const;

export const yearsLabel = `${facts.yearsInTrade}+ years`;
export const inspectionLabel = `${facts.inspectionPassPct}% inspection pass`;
