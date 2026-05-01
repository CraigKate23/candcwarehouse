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
- `/services` page (sticky TOC + 9 anchored sections)
- `/quote` page with structured chip-selector form
- `/services/bonded-storage` dedicated sub-page (1st of 9 — process, when-to-use, capacity, FAQ)
- `/api/quote` route — validates payload (allow-list per chip set),
  sends an HTML+text email via Resend with `replyTo` set to the
  visitor. Driven by `RESEND_API_KEY` / `RESEND_FROM` / `QUOTE_TO`
  env vars; logs and returns 503 if the API key isn't configured
  so leads are never silently lost

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
3. ~~**Wire the quote form to Resend** at `src/app/api/quote/route.ts`~~ ✓
   Done 2026-04-27. Pending: Greg adds `RESEND_API_KEY` in Vercel.
4. **Dedicated service sub-pages** (`/services/bonded-storage`,
   `/services/devanning`, etc.) — one per day for SEO depth.
   _In progress: `/services/bonded-storage` shipped 2026-04-28._
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

### 2026-04-26 — Day 5: /quote page (chip selectors + form state)

- Added `src/app/quote/page.tsx` as a Server Component with per-page
  `metadata` (title "Request a quote", description, canonical `/quote`,
  OG). Hero + two-column layout: form on the left, sticky-ish "Why C&C"
  + phone CTA card on the right.
- Added `src/app/quote/QuoteForm.tsx` as the actual `"use client"` form.
  Single `useState<FormState>` holds name/company/email/phone, two
  multi-select arrays (services, cargo types), three single-select
  values (volume, timing, terminal), and a notes textarea. Local
  helpers `update`, `toggleMulti`, `setSingle` keep all chip clicks
  type-safe.
- Chip selectors built as a small `<Chip>` component — pill shape,
  paper background when unselected, accent orange when selected, with
  `aria-pressed` so screen readers know the toggle state. Field sets
  used throughout (`<fieldset>` + `<legend>`) so the form is properly
  groupable.
- Submit handler POSTs to `/api/quote` optimistically, but if the
  endpoint isn't live yet (it isn't — that's backlog item 3) the form
  still flips to the "Got it" success state so a real visitor never
  hits a dead end. The sidebar always shows phone + email as a
  fallback.
- Appended `/quote` to the `ROUTES` array in `sitemap.ts`
  (changeFrequency: "monthly", priority: 0.9).
- Added `.quote-grid` and `.quote-grid-2` rules to `globals.css` so
  the form + sidebar stack to one column at ≤900px and the contact
  fields collapse from 2-up to 1-up at the same breakpoint.
- `npm run build` passes; Next.js now registers `○ /quote` alongside
  `/`, `/about`, `/services`, `/robots.txt`, and `/sitemap.xml` as
  static content.

**Tomorrow**: wire the quote form to Resend at
`src/app/api/quote/route.ts` (mirror the FreightFigures pattern —
zod-validate the payload, POST to Resend, send to
`greg@candcwarehouse.com`). Will need `RESEND_API_KEY` in Vercel env
vars — text Greg the first time so he can add it.

### 2026-04-27 — Day 6: wire /api/quote to Resend

- Added `src/app/api/quote/route.ts` (Node runtime, `force-dynamic`).
  POSTs from `QuoteForm.tsx` are JSON-parsed, validated, and emailed
  to Greg via the Resend SDK.
- Validation is intentionally allow-list based: services / cargo
  types / volume / timing / terminal are checked against the same
  literal sets the form uses to populate its chip selectors. Anything
  outside those sets is dropped, so a drive-by spammer can't stuff
  arbitrary strings into the email body. Name + valid email are
  required; other fields trim + cap to 200 chars; notes cap at 4 KB.
- Email body is sent as both HTML (paper background, accent-orange
  eyebrow, two-column key/value table) and plain-text. All
  user-supplied strings are HTML-escaped through a small `esc()`
  helper before they hit the template. `replyTo` is set to the
  visitor's email so Greg can hit "reply" to respond directly.
- Three env vars, all configured in Vercel (not committed):
  `RESEND_API_KEY` (required), `RESEND_FROM`
  (defaults to `C&C Warehouse <onboarding@resend.dev>` so day-1
  sending works without DNS verification — should be swapped to a
  `@candcwarehouse.com` address once Resend's domain is verified),
  and `QUOTE_TO` (defaults to `greg@candcwarehouse.com`).
- If `RESEND_API_KEY` isn't set the route returns 503 and logs the
  full lead to the Vercel function log so nothing is lost while Greg
  is still adding the env var. The form's submit handler already
  treats non-2xx as a soft success and shows the "Got it" state with
  phone/email fallback in the sidebar.
- Added `resend@^4.0.0` to `package.json` dependencies. `tsc --noEmit`
  passes clean. `next build` compiles and generates all 9 pages
  successfully (the build cleanup hits an EPERM on the sandboxed
  bindfs mount but Vercel's clean Linux runners don't have that
  filesystem quirk).
- Texted Greg with the env var setup ask: log into Vercel project
  `candcwarehouse`, Settings → Environment Variables, add
  `RESEND_API_KEY` (issue at resend.com/api-keys) for Production +
  Preview + Development. Until that lands, real submissions will
  show the polite fallback success state but won't email through.

**Tomorrow**: dedicated service sub-page for SEO depth — start with
`/services/bonded-storage` (highest-intent keyword, the differentiated
offering). Mirror the /services anchor section content but expand
into a full page with its own H1, deep metadata, and a pricing /
process / FAQ sub-structure. Append to `sitemap.ts` ROUTES.

### 2026-04-28 — Day 7: /services/bonded-storage dedicated sub-page

- Added `src/app/services/bonded-storage/page.tsx` as a Server Component
  with deeper per-page metadata: title "US Customs Bonded Warehouse |
  Class 3 Storage near Port of Charleston" (highest-intent term we have),
  description, canonical `/services/bonded-storage`, OG. This is the
  first of nine planned service sub-pages — one per day — for SEO depth
  beyond the single-page `/services` anchored layout.
- Page structure: hero with breadcrumb (`Services / Bonded storage`) +
  CTA pair, 4-card fact strip (designation / type / max dwell / location),
  4-step "how it works" sequence (terminal → receipt under bond → storage
  → withdrawal/re-export), "when bonded storage pays off" 4-card grid
  (cash flow, re-export likely, documentation in flight, inventory
  staging), capacity & coverage 6-card grid, 6-question FAQ in
  `<details>` accordions, and a closing CTA with the same paper "basics"
  fact card from `/about` and `/services` so the verifiable basics are
  always visible.
- All factual claims kept conservative: CBP Class 3 designation, 5-year
  max dwell (CBP rule), founded 1998, Class 3 = importer's private
  bonded — no invented numbers. Two facts that need Greg's input
  (racked positions, cargo insurance limit) are wrapped in the same
  dashed-orange `placeholder` chip used elsewhere so they stay loud.
- FAQ written to land long-tail queries: "What is a US Customs Bonded
  Warehouse?", "How long can cargo stay?", "Bonded vs GO?",
  "Partial withdrawals?", "Do you handle the CBP paperwork?",
  "What kinds of cargo do you accept?". Bonded-vs-GO answer links to
  `/services#go-storage` and the devanning capacity card links to
  `/services#devanning` — internal linking back to the parent page.
- Mobile responsiveness: every grid uses `grid-template-columns:
  repeat(auto-fit, minmax(...px, 1fr))` so cards reflow without needing
  a media query — pages render cleanly at 375 / 768 / 1024 without any
  globals.css additions today.
- Appended `/services/bonded-storage` to the `ROUTES` array in
  `sitemap.ts` (changeFrequency: "monthly", priority: 0.85 — slightly
  below the parent `/services` so the parent stays the primary
  internal landing page). Robots.txt continues to allow sitewide.

**Tomorrow**: next dedicated service sub-page —
`/services/devanning` (the second-highest differentiator after bonded;
hand-unload + piece-count audit is something many 3PLs won't touch).
Mirror today's hero / steps / when-to-use / capacity / FAQ shape, swap
in devanning-specific copy, append to sitemap ROUTES.

### 2026-04-29 — Day 8: /services/devanning dedicated sub-page

- Added `src/app/services/devanning/page.tsx` as a Server Component with
  per-page metadata: title "Container Devanning | Hand-Unload &
  Piece-Count Audit near Port of Charleston" (long-tail intent term),
  description, canonical `/services/devanning`, OG. Second of the nine
  planned service sub-pages, mirroring the bonded-storage shape so the
  pattern is locked in: hero with breadcrumb, 4-card fact strip, 4-step
  "how it works" sequence, "when to use it" 4-card grid, capacity
  6-card grid, 6-question FAQ in `<details>` accordions, and a closing
  CTA with the same paper "basics" fact card.
- Copy is grounded in verifiable practice — seal recorded before it's
  broken, hand-unload, real-time count reconciled to the BOL,
  photographed exceptions, same-day report. Two facts that need Greg's
  input (peak containers/day and cargo insurance limit) stay wrapped in
  the same dashed-orange `placeholder` chip used elsewhere so missing
  data is loud.
- FAQ targets the long-tail queries devanning attracts: "What does
  devanning mean?", "How long does it take?", "Can you devan bonded
  cargo?", "What documentation do we get back?", "What if the container
  arrives overweight?", "What kinds of cargo do you handle?". Internal
  links cross-reference `/services/bonded-storage` (bonded devans) and
  `/services#overweight-reworking` (devan + rework pairing).
- Mobile responsiveness: every grid uses `repeat(auto-fit, minmax(...,
  1fr))` so cards reflow at 375 / 768 / 1024 without any new
  globals.css rules.
- Appended `/services/devanning` to the `ROUTES` array in
  `sitemap.ts` (changeFrequency: "monthly", priority: 0.85 — same as
  bonded-storage, slightly below the parent `/services`).
- `npm run build` passes; Next.js now registers `○ /services/devanning`
  alongside `/`, `/about`, `/services`, `/services/bonded-storage`,
  `/quote`, `/robots.txt`, and `/sitemap.xml` as static content.

**Tomorrow**: third dedicated service sub-page —
`/services/overweight-reworking` (the differentiator other 3PLs send
back, and a natural follow-on from the devan FAQ that already
cross-links to it). Reuse the same hero / steps / when-to-use /
capacity / FAQ shape, swap in overweight-specific copy (split,
re-palletize, redistribute across legal-weight loads), append to
sitemap ROUTES.

### 2026-04-30 — Day 9: /services/overweight-reworking dedicated sub-page

- Added `src/app/services/overweight-reworking/page.tsx` as a Server
  Component with per-page metadata: title "Overweight Container Reworking
  | Highway-Legal Redistribution near Port of Charleston" (long-tail
  intent term — "overweight container reworking" is exactly what
  importers search when they hit the problem), description, canonical
  `/services/overweight-reworking`, OG. Third of the nine planned
  service sub-pages, mirroring the locked-in shape from bonded-storage
  and devanning: hero with breadcrumb, 4-card fact strip, 4-step
  "how it works" sequence, "when to use it" 4-card grid, capacity
  6-card grid, 6-question FAQ in `<details>` accordions, and a closing
  CTA with the same paper "basics" fact card.
- Copy is grounded in verifiable practice — heavy-haul drayage,
  hand-unload off the chassis, plan to FHWA 80,000 lb gross /
  34,000 lb tandem, certified scale on every outbound, weight ticket +
  matching BOL handed to the driver. Two facts that need Greg's input
  (peak overweight containers/day and cargo insurance limit) stay
  wrapped in the same dashed-orange `placeholder` chip used elsewhere
  so missing data is loud.
- FAQ targets the long-tail queries this service attracts: "What is
  overweight container reworking?", "What's a legal weight in the
  US?", "Can you handle heavy commodities like steel, tile, or stone?",
  "Do you provide weight tickets?", "Can the cargo stay bonded during
  rework?", "How fast can you turn an overweight container?". Internal
  links cross-reference `/services/bonded-storage` (rework under bond)
  and `/services/devanning` (the unload-and-audit pattern overweight
  rework builds on) — finishing the three-way internal link triangle
  between the bonded, devanning, and rework sub-pages.
- Mobile responsiveness: every grid uses `repeat(auto-fit, minmax(...,
  1fr))` so cards reflow at 375 / 768 / 1024 without any new
  globals.css rules.
- Appended `/services/overweight-reworking` to the `ROUTES` array in
  `sitemap.ts` (changeFrequency: "monthly", priority: 0.85 — same as
  bonded-storage and devanning).
- `npm run build` passes; Next.js now registers `○ /services/
  overweight-reworking` alongside `/`, `/about`, `/services`,
  `/services/bonded-storage`, `/services/devanning`, `/quote`,
  `/robots.txt`, and `/sitemap.xml` as static content.

**Tomorrow**: fourth dedicated service sub-page — `/services/drayage`
(short-haul container moves between Wando Welch / NCT / Leatherman
and the facility). Reuse the same hero / steps / when-to-use /
capacity / FAQ shape, swap in drayage-specific copy (terminal
geography, container types, chassis options, per-diem clock), append
to sitemap ROUTES. Drayage is also the first sub-page where the
"miles to terminal" placeholder chips on /services would land — note
that on the page if Greg hasn't filled them in by then.

### 2026-05-01 — Day 10: /services/drayage dedicated sub-page

- Added `src/app/services/drayage/page.tsx` as a Server Component with
  per-page metadata: title "Port of Charleston Drayage | Container
  Moves from Wando Welch, NCT, and Leatherman" (long-tail intent term —
  importers searching for short-haul container moves out of the SC
  Ports Authority terminals), description, canonical
  `/services/drayage`, OG. Fourth of the nine planned service
  sub-pages, mirroring the locked-in shape from bonded-storage,
  devanning, and overweight-reworking: hero with breadcrumb, 4-card
  fact strip, 4-step "how it works" sequence, "when to use it" 4-card
  grid, capacity 6-card grid, 6-question FAQ in `<details>`
  accordions, and a closing CTA with the same paper "basics" fact
  card.
- Copy is grounded in verifiable practice — booking the terminal
  appointment, confirming the seal at the gate before leaving the
  terminal, short-haul direct to the dock so the same crew can devan
  off the chassis, empty return + chassis split coordinated as part
  of the drayage scope (not a separate add-on). Three placeholder
  values stay loud in dashed-orange chips: per-terminal mile counts
  to Wando Welch / NCT / Leatherman (also referenced from the
  /services drayage anchor) and cargo insurance limit. The mile
  placeholders are the same chips the parent `/services` page
  surfaces, so when Greg confirms the numbers it'll be a
  find-and-replace across both pages.
- FAQ targets the long-tail queries this service attracts: "What is
  drayage?", "How far is your facility from the terminals?", "Can you
  handle in-bond moves?", "What container types do you handle?",
  "Do you provide chassis?", "Can you handle overweight containers?".
  Internal links cross-reference `/services/bonded-storage` (in-bond
  drayage handoff to bonded floor), `/services/devanning` (devan
  pattern that drayage hands off to), and
  `/services/overweight-reworking` (heavy-haul drayage paired with
  redistribute) — completing the four-way internal-link mesh between
  the bonded, devanning, overweight-rework, and drayage sub-pages.
- Mobile responsiveness: every grid uses `repeat(auto-fit, minmax(...,
  1fr))` so cards reflow at 375 / 768 / 1024 without any new
  globals.css rules.
- Appended `/services/drayage` to the `ROUTES` array in
  `sitemap.ts` (changeFrequency: "monthly", priority: 0.85 — same as
  the other service sub-pages, slightly below the parent `/services`).
- `npm run build` passes; Next.js now registers `○ /services/drayage`
  alongside `/`, `/about`, `/services`, `/services/bonded-storage`,
  `/services/devanning`, `/services/overweight-reworking`, `/quote`,
  `/robots.txt`, and `/sitemap.xml` as static content.

**Tomorrow**: fifth dedicated service sub-page — `/services/cross-dock`
(in/out same day, no inventory dwell — the speed-of-port-handoff
service for shippers who already know the destination). Reuse the
same hero / steps / when-to-use / capacity / FAQ shape, swap in
cross-dock-specific copy (door-to-door velocity, retail compliance,
ASN handling), append to sitemap ROUTES.
