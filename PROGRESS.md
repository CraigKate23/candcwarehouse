# C&C Warehouse site — progress log

New Next.js site being built up one commit per day. Staging at
`candcwarehouse.vercel.app` (Vercel auto-deploys from `main`). The live
`candcwarehouse.com` is still on Squarespace and **must not be touched** until
Greg explicitly signals cutover.

## What's in place

- Next.js 16 App Router scaffold (TypeScript, `src/` directory)
- Shared design system in `src/app/components/styles.ts` (warm paper palette
  `#fafaf7`, ink `#0b1a2b`, orange accent `#d96a2c`, steel `#3a566f`)
- Space Grotesk / IBM Plex Sans / DM Mono via `next/font/google`
- `Nav` and `Footer` shared components (client components for hover state)
- Homepage hero + value props + services list + CTA
- About page (1998 story, ethos, timeline with placeholders, team placeholders, CTA)
- `LocalBusiness` JSON-LD injected via root layout
- Sitewide metadata (title template, description, Open Graph, Twitter,
  canonical, robots), per-page metadata for `/about`
- `sitemap.xml` via `app/sitemap.ts` (lists `/` and `/about`)
- `robots.txt` via `app/robots.ts`

## Placeholders still to fill in (ask Greg one at a time)

- Exact **square footage** of the main facility
- Number of **dock doors**
- Number of **racked pallet positions**
- **Cargo insurance** coverage amount
- **Team members** — first + last name, role, short bio (for About page)
- **Facility expansion milestones** beyond 1998 founding (e.g. added building
  in 20xx, certifications earned, staff milestones)
- **Drive time / miles** from facility to each port terminal (Wando Welch,
  North Charleston Terminal, Hugh K. Leatherman, Inland Port Greer)
- **Facility photos** for homepage, about, and facility pages

Keep these behind clearly-marked placeholders in components so missing data
stays visible — never invent a number.

## Priority backlog (pick top unblocked item each day)

1. **Fill in a placeholder with real data** from Greg (highest leverage once
   he answers).
2. **Port the remaining sketches to pages**: `/services`, `/facility`,
   `/quote`, `/portal`. One per day.
3. **Wire the quote form to Resend** at `src/app/api/quote/route.ts` — mirror
   the FreightFigures pattern. Requires `RESEND_API_KEY` in Vercel env vars.
4. **Dedicated service sub-pages** (`/services/bonded-storage`,
   `/services/devanning`, etc.) — one per day for SEO depth.
5. **Resources / blog** at `/resources/` with `articles.ts` mirror of
   FreightFigures. One article per run.
6. **Portal polish** — realistic loading states, filter/sort on tables,
   CSV export. Mock data only until Greg says to wire real
   CartonCloud / Logiware APIs.
7. **Mobile responsiveness audit** across 375 / 768 / 1024.
8. **Performance** — `next/image` everywhere, `display: swap`, Lighthouse
   on preview URL, fix biggest hits.
9. **Cutover prep** (only when Greg signals). Crawl Squarespace site for all
   ranking URLs, build redirect map in `next.config.ts`, pre-flight
   checklist, DNS cutover.

## Daily log

### 2026-04-22 — Day 1: port design system + homepage from sketches

- Added `src/app/components/styles.ts` with the C&C color palette, typography,
  radii/shadow tokens, shared button styles, and a `business` constants
  object (phone, email, founding year, city/state).
- Swapped the Geist fonts from the Create Next App scaffold for Space
  Grotesk (headings) + IBM Plex Sans (body) + DM Mono (monospace), loaded
  with `display: "swap"`.
- Rewrote `src/app/layout.tsx`: site metadata with title template, Open
  Graph, Twitter card, canonical, robots, viewport theme color; injected
  a `LocalBusiness` JSON-LD block with address, phone, email, foundingDate,
  areaServed, and knowsAbout.
- Added `Nav.tsx` (sticky, blur-backed) and `Footer.tsx` (four-column
  company / work / visit layout with address and phone).
- Rewrote `globals.css` against the paper palette, added `.cta-primary`,
  `.cta-secondary`, `.value-card`, `.footer-link` hover classes, and basic
  responsive stacking at the 820px breakpoint.
- Replaced the starter homepage with a hero (headline, subhead, CTA pair,
  at-a-glance card with phone number), four value-prop cards, a
  nine-services grid, and a bottom CTA.
- Deleted the unused `page.module.css`.

**Tomorrow**: SEO scaffolding — `sitemap.ts`, `robots.ts`, per-page
`generateMetadata`, and start on the About page so the 1998 story has a home.

### 2026-04-23 — Day 2: SEO scaffolding (sitemap + robots)

- Added `src/app/sitemap.ts` that emits `/sitemap.xml` at build time. Built
  around a typed `ROUTES` array so each future page (services, about,
  facility, quote, etc.) can be appended with its own `changeFrequency` and
  `priority`. Today only `/` is listed because that's the only page that
  returns 200 — avoids shipping 404s to Google.
- Added `src/app/robots.ts` that emits `/robots.txt` with `User-Agent: *`
  allowed sitewide, points crawlers at the sitemap, and sets `Host` to the
  current `NEXT_PUBLIC_SITE_URL`. A comment in the file calls out that when
  Greg cuts over to `candcwarehouse.com`, the Vercel env var should be
  swapped and `robots.txt` keeps pointing at the right canonical.
- Both files read `NEXT_PUBLIC_SITE_URL` with a fallback to
  `https://candcwarehouse.vercel.app`, matching the pattern already used by
  `layout.tsx` for `metadataBase` and the `LocalBusiness` JSON-LD.
- `npm run build` confirms both new routes are registered:
  `○ /robots.txt` and `○ /sitemap.xml` as static content.

**Tomorrow**: start on the `/about` page so the 1998 story has a home, and
append `/about` to the sitemap `ROUTES` array at the same time.

### 2026-04-24 — Day 3: /about page (1998 story + placeholders)

- Added `src/app/about/page.tsx` as a Server Component with per-page
  `metadata` (title, description, canonical `/about`, OG). Structure mirrors
  the original `candc-about.html` sketch: intro hero with a right-side fact
  card, a four-card "how we operate" ethos section, a five-row timeline, a
  three-card team section, and a closing CTA.
- The intro copy sticks to verifiable claims only: founded 1998 in Ladson
  SC, family-run, serving importers through the Port of Charleston,
  specialists in the bonded / GO / overweight work other 3PLs send back.
- Declared a local `placeholder` inline style (dashed orange chip) inside
  the file so unknown facts — building expansion year, CBP Class 3 year, GO
  approval year, facility sq ft / dock doors / racked positions, team
  names + roles + bios, photos — stay visually loud. Every placeholder is a
  single `<span style={placeholder}>…</span>` so a find-and-replace pass
  once Greg answers is trivial.
- The fact card on the right only lists data we know is correct: founding
  year, ownership, city/state, combined team experience, CBP Class 3
  status, GO-designated status. No invented numbers.
- Timeline has the 1998 founding as a hard fact and four subsequent
  milestones with year-TK placeholders (facility expansion, CBP Class 3
  designation, GO approval, today's snapshot).
- Team section uses a 3-up grid with a "Photo TK" dashed frame, all three
  cards currently placeholder-only pending Greg's write-up.
- Appended `/about` to the `ROUTES` array in `sitemap.ts`
  (changeFrequency: "monthly", priority: 0.8).
- `npm run build` passes; Next.js registers `○ /about` as static content
  alongside `/`, `/robots.txt`, and `/sitemap.xml`.

**Tomorrow**: port the `/services` sketch to `src/app/services/page.tsx`
(sticky TOC + 9 service sections, each a deep-link anchor) and add it to
the sitemap. That sets up the dedicated-sub-pages backlog item.

### 2026-04-25 — Day 4: /services page (sticky TOC + 9 anchored sections)

- Added `src/app/services/page.tsx` as a Server Component with per-page
  `metadata` (title "Services", description listing the nine offerings,
  canonical `/services`, OG). Layout is two-column: a sticky left TOC
  (`position: sticky; top: 88` so it sits below the 64px sticky header)
  and one anchored `<article id="…">` per service on the right. Each
  section sets `scrollMarginTop: 88` so deep links land below the nav
  instead of being hidden behind it.
- The nine sections match the homepage list and use stable, SEO-friendly
  anchor slugs (`#bonded-storage`, `#go-storage`, `#devanning`,
  `#overweight-reworking`, `#drayage`, `#cross-dock`,
  `#deconsolidation`, `#wms`, `#pick-pack`). When the dedicated
  sub-pages ship (backlog item 4) the slugs become the natural URLs.
- Each section has an eyebrow + H2 + intro paragraph + a 3-up grid of
  highlight cards (label + body). Highlights are written conservatively:
  verifiable claims for bonded/GO/cross-dock/deconsol/WMS/pick-pack;
  dashed-orange `placeholder` chips wherever a real number is needed
  (rack positions, devanning containers/day, drayage miles to Wando
  Welch / NCT / Leatherman).
- Bottom-of-page CTA section reuses the paper-deep band + fact card
  pattern from /about so the basics (founded year, ownership, location,
  CBP Class 3, GO designation, combined experience) are always visible
  without scrolling back up.
- Appended `/services` to the `ROUTES` array in `sitemap.ts`
  (changeFrequency: "monthly", priority: 0.9).
- Added `.toc-link:hover` and a `@media (max-width: 900px)` rule to
  `globals.css` that stacks the TOC + sections to one column and
  collapses each section's 3-up highlight grid for mobile.
- `npm run build` passes; Next.js now registers `○ /services` alongside
  `/`, `/about`, `/robots.txt`, and `/sitemap.xml` as static content.

**Tomorrow**: port the `/quote` sketch as a Client Component (form state
in `useState`, chip selectors for service type), and append `/quote` to
the sitemap. That sets up backlog item 3 (wire the form to Resend) for
the day after.
