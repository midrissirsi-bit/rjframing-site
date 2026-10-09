import type { Photo } from "@/components/annotated-photo";

/* Service pages. Every claim here traces to the live site, RJ's Instagram
   captions (@rjframing.ca) or their Google reviews; see FACTS.md. No invented
   durations or prices: those wait for real numbers from RJ. */

export type Project = { title: string; where: string; img: string; alt: string };
export type QA = { q: string; a: string };

export type Service = {
  slug: string;
  name: string; // breadcrumb + schema service name
  metaTitle: string;
  metaDescription: string;
  h1: string;
  h1Em: string; // the italic word(s) at the end of the H1
  intro: string;
  hero: Photo;
  scopeTitle: string;
  scope: { item: string; detail: string }[];
  story?: { label: string; text: string; source: string };
  projects: Project[];
  faq: QA[];
};

const AREAS = "Toronto, North York, Scarborough, Stouffville, Vaughan, Aurora, Richmond Hill and the rest of the GTA";

const sharedFaq: QA[] = [
  {
    q: "What do you need from me for a quote?",
    a: "The architectural and structural drawings, the engineering, and the site address. We go through the drawings, flag anything that won't frame the way it's drawn, and send back a written quote and a start date.",
  },
  {
    q: "How fast do you get back to me?",
    a: "Within 24 hours. Call (289) 688-5951, email rjframinginc@gmail.com, or use the quote form on this page.",
  },
  {
    q: "Which areas do you work in?",
    a: `${AREAS}.`,
  },
];

export const services: Service[] = [
  {
    slug: "steel-beams",
    name: "Steel beam installation",
    metaTitle: "Steel Beam Installation in Toronto & the GTA | RJ Framing",
    metaDescription:
      "W-flange beams, HSS columns and moment frames installed to the engineer's spec by the same crew that does the framing. Toronto and the GTA. Reply within 24 hours.",
    h1: "Steel beams and columns, set by the crew",
    h1Em: "that frames around them.",
    intro:
      "Most framing crews wait on a steel installer. We don't: wood framing and structural steel are both our work, so the beam goes in when the framing needs it. Installed to the engineer's specification and ready for inspection.",
    hero: {
      img: "/images/process-frame.jpg",
      w: 2048,
      h: 1152,
      alt: "Custom home in Toronto with steel beams set between wood-framed floors by RJ Framing",
      notes: [
        { x: 0.45, y: 0.24, label: "Steel beam, engineer's spec", side: "r" },
        { x: 0.68, y: 0.48, label: "Crew on the wall", side: "r" },
      ],
    },
    scopeTitle: "What we install",
    scope: [
      { item: "W-flange beams", detail: "Set to the engineering drawings, tied into the wood framing around them." },
      { item: "HSS columns", detail: "Hollow structural steel posts carrying the beam loads down." },
      { item: "Moment frames", detail: "Where the engineer calls for them in open spans and big openings." },
      { item: "Steel-stud framing", detail: "Commercial buildouts, multiplexes and fire-rated assemblies." },
      { item: "Inspection", detail: "Installed to spec, signed off, ready for the inspector." },
    ],
    story: {
      label: "From a Google review",
      text: "Ray and his team did some structural modifications at our truck shop. He coordinated with the structural engineer to save us money where he could.",
      source: "Parm Dhanoa, Google review",
    },
    projects: [
      { title: "Project Glengrove", where: "Custom build, Toronto", img: "/images/project-12-steel-beams.jpg", alt: "Steel beams installed on Project Glengrove, a custom home in Toronto" },
      { title: "Project Norcross", where: "Multiplex rental property", img: "/images/project-06-wood-steel.jpg", alt: "Wood and steel framing inside the Project Norcross multiplex" },
      { title: "Custom build", where: "Toronto", img: "/images/ray-portrait.jpg", alt: "Ray of RJ Framing in front of a custom home with steel beams in Toronto" },
    ],
    faq: [
      {
        q: "Do you install the steel yourselves, or just the wood framing?",
        a: "Both. Wood framing and structural steel are done by our own crew, so there is no second trade to schedule around.",
      },
      {
        q: "Do I need engineered drawings for a steel beam?",
        a: "Yes. Beams and columns go in to the engineer's specification, so we need the stamped structural drawings to quote and install.",
      },
      {
        q: "Do you do commercial steel work?",
        a: "Yes. Steel-stud framing for commercial buildouts and fire-rated assemblies, and structural steel on commercial sites; one of our Google reviews is from a truck shop.",
      },
      ...sharedFaq,
    ],
  },
  {
    slug: "additions",
    name: "Addition and second-storey framing",
    metaTitle: "Addition & Second-Storey Framing in Toronto | RJ Framing",
    metaDescription:
      "Rear additions, second storeys and raised roofs framed onto existing homes across Toronto and the GTA, wood and steel by one crew. Reply within 24 hours.",
    h1: "Rear additions and second storeys,",
    h1Em: "framed onto the house you have.",
    intro:
      "An addition means tying new framing into an old structure: opening it up, carrying the loads, and building the new floors and roof on top. We frame additions across Toronto and the GTA, and handle the steel they need ourselves.",
    hero: {
      img: "/images/project-04-autumn-crane.jpg",
      w: 1170,
      h: 649,
      alt: "Roof trusses craned onto a second storey addition framed by RJ Framing in North York",
      notes: [
        { x: 0.6, y: 0.33, label: "Trusses craned in", side: "r" },
        { x: 0.47, y: 0.55, label: "New second storey", side: "l" },
        { x: 0.5, y: 0.72, label: "Existing house below", side: "r" },
      ],
    },
    scopeTitle: "What we frame on additions",
    scope: [
      { item: "Second storeys", detail: "New floor system, walls and roof built on top of the existing house." },
      { item: "Rear additions", detail: "Extending the house back, tied into the existing structure." },
      { item: "Raised roofs and ceilings", detail: "Taking the roof off to give a floor more height, then framing a new roof." },
      { item: "Steel beams and posts", detail: "Where the new openings and loads need them, installed by us." },
      { item: "Tie-ins and reinforcement", detail: "Blocking, reinforcement and renovation framing on the existing build." },
    ],
    story: {
      label: "A recent job, in our words",
      text: "Rear addition, and we ripped off the roof to raise the second floor to give 10ft height, along with a new roof framed.",
      source: "@rjframing.ca on Instagram, June 2026",
    },
    projects: [
      { title: "Raised second floor", where: "Rear addition, 10 ft ceilings, new roof", img: "/images/ig-addition-raised-second-floor.jpg", alt: "Finished rear addition with a raised second floor and new roof framed by RJ Framing" },
      { title: "Project Allingham", where: "2nd storey addition, North York", img: "/images/project-09-trusses.jpg", alt: "Roof trusses on the Project Allingham second storey addition in North York" },
      { title: "Second-storey addition", where: "Toronto", img: "/images/ig-second-storey-addition-aerial.jpg", alt: "Aerial view of a second storey addition sheathed and framed by RJ Framing" },
      { title: "Rear addition", where: "Structural shoring stage", img: "/images/project-02-winter-frame.jpg", alt: "Rear addition at the structural shoring stage in winter, framed by RJ Framing" },
      { title: "Rear addition", where: "Toronto", img: "/images/ig-rear-addition-aerial.jpg", alt: "Aerial view of a long rear addition framed by RJ Framing between neighbouring houses" },
      { title: "Project Scarborough", where: "Addition, Scarborough", img: "/images/project-08-summer-osb.jpg", alt: "Addition in Scarborough framed and sheathed by RJ Framing" },
    ],
    faq: [
      {
        q: "Can you add a second storey or raise our ceilings?",
        a: "Yes. On a recent rear addition we took the roof off, raised the second floor to 10-foot ceilings and framed a new roof.",
      },
      {
        q: "Do you handle the steel beams an addition needs?",
        a: "Yes. Wood framing and structural steel are both done by our crew, installed to the engineer's specification.",
      },
      {
        q: "Do you work for homeowners or general contractors?",
        a: "Both. We work as the framing trade for general contractors and architects, and directly for homeowners.",
      },
      ...sharedFaq,
    ],
  },
  {
    slug: "custom-homes",
    name: "Custom home framing",
    metaTitle: "Custom Home Framing in Toronto & the GTA | RJ Framing",
    metaDescription:
      "Full structural framing for custom homes, foundation to roof, with the steel done by the same crew. Forest Hill, Hoggs Hollow, Stouffville and across the GTA.",
    h1: "Custom homes, framed from",
    h1Em: "foundation to roof.",
    intro:
      "On a custom home we frame the whole structure: floors, walls, steel and roof, built to the drawings and the engineer's spec. Recent builds in Forest Hill, Hoggs Hollow, Glengrove and on Musselman Lake.",
    hero: {
      img: "/images/project-10-forest.jpg",
      w: 1170,
      h: 646,
      alt: "Aerial view of a custom home being framed among tall trees in Hoggs Hollow, Toronto",
      notes: [
        { x: 0.52, y: 0.42, label: "Project Hoggs Hollow", side: "r" },
        { x: 0.5, y: 0.6, label: "Floors, walls and roof by us", side: "l" },
      ],
    },
    scopeTitle: "What we frame on a custom home",
    scope: [
      { item: "Floor systems", detail: "Joists, beams and subfloor, level by level." },
      { item: "Walls", detail: "Stud walls, plates, openings and sheathing." },
      { item: "Roof", detail: "Rafters or trusses, dormers and sheathing." },
      { item: "Structural steel", detail: "Beams and columns set by our own crew." },
      { item: "Back framing", detail: "Bulkheads around mechanical services and specialty ceiling details." },
    ],
    projects: [
      { title: "Project Glengrove", where: "Custom build, Toronto", img: "/images/project-01-modern-tudor.jpg", alt: "Project Glengrove, a modern Tudor custom home in Toronto framed by RJ Framing" },
      { title: "Project Forest Hill", where: "Custom build, Toronto", img: "/images/project-11-dormer.jpg", alt: "Project Forest Hill custom home with dormers, framed by RJ Framing" },
      { title: "Project Musselman Lake", where: "Custom build, Stouffville", img: "/images/project-13-musselman-lake.jpg", alt: "Project Musselman Lake custom home in Stouffville framed by RJ Framing" },
      { title: "Project Forest Hill", where: "Custom build, Toronto", img: "/images/project-03-winter-aerial.jpg", alt: "Aerial view of Project Forest Hill being framed in winter" },
      { title: "Custom build", where: "Interior framing, Toronto", img: "/images/project-07-basement.jpg", alt: "Interior wall and floor framing on a custom home in Toronto" },
      { title: "Project Hoggs Hollow", where: "Custom build, Toronto", img: "/images/project-10-forest.jpg", alt: "Project Hoggs Hollow custom home framed among trees in Toronto" },
    ],
    faq: [
      {
        q: "Do you frame the whole house?",
        a: "Yes. Floors, walls, steel beams and roof, from the foundation up, built to the drawings and the engineer's spec.",
      },
      {
        q: "Do you work with my architect and general contractor?",
        a: "Yes. We work as the framing and steel trade alongside the owner's architect and general contractor.",
      },
      ...sharedFaq,
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug)!;
