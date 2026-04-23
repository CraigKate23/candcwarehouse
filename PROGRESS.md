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
- `LocalBusiness` JSON-LD injected via root layout
- Sitewide metadata (title template, description, Open Graph, Twitter,
  canonical, robots)

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
2. **SEO scaffolding**: `sitemap.xml` via `app/sitemap.ts`, `robots.txt` via
   `app/robots.ts`, per-page `generateMetadata`, Open Graph image.
3. **Port the remaining sketches to pages**: `/services`, `/about`,
   `/facility`, `/quote`, `/portal`. One per day.
4. **Wire the quote form to Resend** at `src/app/api/quote/route.ts` — mirror
   the FreightFigures pattern. Requires `RESEND_API_KEY` in Vercel env vars.
5. **Dedicated service sub-pages** (`/services/bonded-storage`,
   `/services/devanning`, etc.) — one per day for SEO depth.
6. **Resources / blog** at `/resources/` with `articles.ts` mirror of
   FreightFigures. One article per run.
7. **Portal polish** — realistic loading states, filter/sort on tables,
   CSV export. Mock data only until Greg says to wire real
   CartonCloud / Logiware APIs.
8. **Mobile responsiveness audit** across 375 / 768 / 1024.
9. **Performance** — `next/image` everywhere, `display: swap`, Lighthouse
   on preview URL, fix biggest hits.
10. **Cutover prep** (only when Greg signals). Crawl Squarespace site for all
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
