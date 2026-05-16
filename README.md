# RJ Framing — Next.js

The full RJ Framing site converted to Next.js 14 (App Router) + Tailwind + TypeScript, with the bento-gallery component from 21st.dev installed.

## Stack

- **Next.js 14** (App Router, server components)
- **React 18** + **TypeScript**
- **Tailwind CSS** — design tokens in `tailwind.config.ts`, base layer in `app/globals.css`
- **Three.js** — the 3D wireframe hero scene
- **GSAP + ScrollTrigger** — scroll-driven motion
- **Lenis** — smooth scroll
- **framer-motion** — bento-gallery interactions (drag, modal, spring physics)
- **lucide-react** — icons (close X on the modal)

## Folder structure

```
rjframing-next/
├── app/
│   ├── globals.css        # Design tokens, fonts, base CSS
│   ├── layout.tsx         # Root layout, metadata, schema.org
│   └── page.tsx           # Composes the homepage
├── components/
│   ├── ui/
│   │   └── bento-gallery.tsx   # 21st.dev component (installed verbatim)
│   ├── hero/
│   │   ├── hero.tsx           # Hero section + headline + CTAs
│   │   └── three-frame.tsx    # Three.js scroll-build scene
│   ├── loader.tsx
│   ├── nav.tsx
│   ├── manifesto.tsx
│   ├── capabilities.tsx
│   ├── process.tsx            # Pinned-scroll process section
│   ├── stats.tsx
│   ├── work-gallery.tsx       # Wraps bento-gallery with project data
│   ├── about.tsx
│   ├── contact.tsx
│   ├── footer.tsx
│   └── lenis-provider.tsx     # Smooth scroll wrapper
├── lib/
│   └── utils.ts              # cn() helper for class merging
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
├── postcss.config.mjs
└── package.json
```

## Run locally

```bash
cd rjframing-next
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel

### Option A — drag & drop

1. Sign up at vercel.com (use GitHub).
2. Vercel dashboard → **Add New** → **Project** → **Browse** → upload this folder.
3. Click **Deploy**.

### Option B — GitHub (recommended)

```bash
git init
git add .
git commit -m "RJ Framing — Next.js conversion"
git branch -M main
git remote add origin https://github.com/<your-user>/rjframing-site.git
git push -u origin main
```

Then on Vercel → **Add New** → **Project** → import the repo. Framework preset: **Next.js**. Click **Deploy**.

## Point rjframing.ca at Vercel

Vercel project → **Settings** → **Domains** → add `rjframing.ca` and `www.rjframing.ca`. Vercel shows the DNS records (A record for apex, CNAME for www). Add them at your registrar.

## Adding the Higgsfield-generated images

When you've generated the cinematic stills:

1. Drop them into `public/images/projects/`.
2. Update `components/work-gallery.tsx` — replace the `url:` fields in the `projectItems` array.

Same idea for the Ray portrait — drop into `public/images/about.jpg` and reference in `components/about.tsx` (the empty `bg-surface` div is where the photo goes).

## Adding the actual logo

Drop the "Rough Carpentry" PNG into `public/logo.png`. In `components/nav.tsx`, replace the text wordmark with:

```tsx
<a href="#top" className="flex items-baseline gap-2.5">
  <img src="/logo.png" alt="RJ Framing" className="h-9" />
</a>
```

## Adding the contact form provider

The form currently shows a thank-you message but doesn't email. Easiest: sign up for Formspree, get a form URL, change the form `action`.

Better: install Resend, add an API route at `app/api/quote/route.ts`, and have the form `POST` to it.

## Adding more 21st.dev components

Now that the project is Next.js + Tailwind + TS, any 21st.dev component drops directly into `components/ui/<component>.tsx`. The `cn` helper is already in `lib/utils.ts`. Shared shadcn semantic color tokens (`background`, `foreground`, `card`, `muted`, `border`, `ring`) are mapped to the cyan palette in `tailwind.config.ts` — components that use those tokens will theme automatically.

## What's deliberately stubbed for now

- The Process section's right-side image (placeholder `bg-surface` block) — drop in a `<video>` time-lapse or static image when you have it.
- The About section's portrait of Ray (placeholder block) — same.
- The bento-gallery currently uses the existing rjframing.ca WordPress photos as placeholders. Replace with Higgsfield stills.

## Cost of running this

- Vercel hobby tier: $0/mo
- Domain renewal: ~$15/yr
- Resend free tier (if you add it): $0/mo (100 emails/day)
- Fonts (Google Fonts): $0

Total ongoing: $0/mo.
