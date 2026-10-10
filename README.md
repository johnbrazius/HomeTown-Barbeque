# Hometown Bar-B-Que — Red Hook (redesign concept)

A cinematic, single-page website concept for **Hometown Bar-B-Que, 454 Van Brunt Street, Red Hook, Brooklyn**.

> **This is an independent portfolio concept.** It is not affiliated with, commissioned or endorsed by
> Hometown Bar-B-Que. All imagery is AI-generated and illustrative, not photographs of the restaurant's
> food or premises. Search indexing is **off by default** (see [Configuration](#configuration)).

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4, Three.js via
React Three Fiber, Motion and Lucide icons.

---

## Quick start

```bash
npm install
npm run images:fetch   # self-host the imagery (see "Imagery")
npm run dev            # http://localhost:3000
```

| Script                 | What it does                                       |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Development server                                 |
| `npm run build`        | Production build (fully static output)             |
| `npm start`            | Serve the production build                         |
| `npm run lint`         | ESLint (Next.js core-web-vitals + TypeScript)      |
| `npm run typecheck`    | Generate route types and run `tsc --noEmit`        |
| `npm run images:fetch` | Download any missing images into `public/images/`  |

Node 20.9+ is required (Node 22 recommended — `images:fetch` imports a `.ts` file directly).

---

## How it's organised

```
src/
├── app/
│   ├── layout.tsx         Fonts, metadata, Open Graph, robots, analytics script
│   ├── page.tsx           Assembles the sections + Restaurant JSON-LD
│   ├── not-found.tsx      Custom 404
│   ├── sitemap.ts         /sitemap.xml
│   ├── robots.ts          /robots.txt (disallow-all until indexing is enabled)
│   ├── icon.svg           Favicon (concept monogram)
│   └── globals.css        Design tokens, grain, reveal + hero motion (CSS)
├── content/               ← edit content here, not in components
│   ├── site.ts            Address, phone, hours, nav, hero copy, service model, concept notice
│   ├── menu.ts            Menu categories and items
│   └── images.ts          Image manifest (file, remote source, size, alt text, focal point)
├── lib/
│   ├── images.ts          Resolves an image key to local file or remote fallback (build time)
│   ├── structured-data.ts Schema.org Restaurant JSON-LD (verified fields only)
│   ├── analytics.ts       Opt-in analytics + event names
│   └── site-url.ts        Canonical origin + indexing switch
└── components/
    ├── layout/            Header (incl. mobile drawer), Footer, MobileActionBar
    ├── hero/              Hero, HeroDepth (parallax layers), HeroAtmosphere (WebGL gate), HeroScene (Three.js)
    ├── sections/          Ticker, ArtOfThePit, MenuShowcase + MenuTabs, Process + ProcessStages,
    │                      Atmosphere, Visit + MapFacade
    └── ui/                ButtonLink, Photo, SafeImage, Reveal + RevealObserver, Wordmark, AnalyticsListener
```

Server components are the default. Client components are used only where something is interactive or animated:
the header, hero parallax, WebGL layer, menu tabs, process stages, map facade, mobile action bar, and two tiny
listeners (scroll reveals, analytics).

### Design system

- **Palette** (Tailwind tokens in `globals.css`): `ink` #0D0C0B · `char` #171513 · `ember` #B94728 ·
  `cream` #F1E5D0 · `smoke` #A49A8D · `bark` #35241B.
- **Type:** Big Shoulders (industrial condensed display + micro-labels), Instrument Serif italic (editorial accents),
  Hanken Grotesk (body/UI). Loaded with `next/font` (self-hosted, `display: swap`, fallbacks set).
- **Rhythm:** dark hero → ember ticker → cream story → charcoal menu → near-black pit → cream hall → brown visit → black footer.

### Motion & 3D

- Hero headline/photo entrance is pure CSS, so it plays before JavaScript hydrates.
- `HeroDepth` layers the photo, atmosphere and type at different scroll/pointer rates (small, legible movement).
- `HeroScene` is a real Three.js scene: an fbm smoke shader plus ~160 embers spread through depth, with a
  pointer-driven camera for genuine parallax. It **only loads** on ≥768px screens with a fine pointer, WebGL,
  no reduced-motion and no Save-Data, after the browser is idle, and it **pauses** when the hero is off-screen.
  Everyone else gets the static photographic hero, which is designed to stand on its own.
- Section reveals use one IntersectionObserver + CSS. Content is never hidden without JS or with reduced motion.
- `prefers-reduced-motion` disables parallax, WebGL, reveals, the ticker and smooth scrolling.

---

## Changing content

### Menu — `src/content/menu.ts`

Each category has an `intro`, a `feature` (image key + title + caption) and `items`:

```ts
{ name: "Brisket", tags: ["by weight", "popular"], price: "$XX / ½ lb", note: "optional descriptor" }
```

- Add/remove items or categories freely — the tabs and list render from data.
- `price` is optional and **currently blank for every item** (see [Before launch](#before-a-commercial-launch)).
  Once any price is filled in it renders automatically and the "check current prices" wording adjusts.
- Keep `note` factual; leave it out rather than invent a description.

### Business details & hours — `src/content/site.ts`

Address, phone, links, nav labels, hero copy and the service model live here.

Hours: `hours.verified` is `false`, so the site shows only what every source agreed on (closed Mondays, doors at
noon) plus a "confirm before you go" note, and **no hours are emitted in structured data**. To publish full hours,
fill `hours.schedule` (24h `"HH:MM"`, `null` for closed), set `verified: true`, and both the Visit section and the
JSON-LD update automatically.

### Imagery — `src/content/images.ts`

Every image is referenced by key. To replace one, drop a file in `public/images/`, update `file`, `width`, `height`,
`alt`, and optionally `focus` (CSS object-position) and `tone` (placeholder colour).

`src/lib/images.ts` uses the local file if it exists, otherwise the `remote` URL. Run `npm run images:fetch` and
commit `public/images/` so production never depends on the original host. (The images were generated on OpenArt;
the development sandbox could not download them, which is why they start out remote.) Once every image is local,
you can delete the `remotePatterns` entry in `next.config.ts`.

The small **"Illustrative"** tag on images is deliberate. Remove it (`tag={false}` on `<Photo>`) only when the image
is authorized photography of the real food or venue.

---

## Configuration

Copy `.env.example` to `.env.local` (or set these in Vercel → Project → Settings → Environment Variables):

| Variable                       | Purpose                                                                                                   |
| ------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | Canonical origin for canonical URL, Open Graph, sitemap and JSON-LD. Falls back to Vercel's production URL, then `http://localhost:3000`. |
| `NEXT_PUBLIC_ALLOW_INDEXING`   | `true` lets search engines index the site (meta robots + robots.txt). **Leave unset for the concept.** Only enable for a launch the restaurant has approved. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Enables Plausible analytics (cookieless). Empty = no analytics script at all.                              |

### Analytics events

When enabled, these click events are sent (with a `location` prop such as `hero`, `visit`, `footer`, `mobile_bar`):
`menu_cta_click`, `directions_click`, `phone_click`, `official_site_click`, `official_menu_click`.

Any element can opt in with `data-track="event_name" data-track-location="where"` — no client component needed.
If you switch to a cookie-based tool (e.g. GA4), add a consent mechanism first and route it through
`track()` in `src/lib/analytics.ts`.

### SEO notes

- Unique title/description, canonical, Open Graph + Twitter card, sitemap, robots, custom 404, one `h1`,
  semantic sections and descriptive alt text.
- `Restaurant` JSON-LD includes only verified fields: name, official URL, telephone, address, cuisine, menu URL.
  **No** ratings, reviews, price range, coordinates or (yet) hours.
- Structured data makes a page *eligible* for some search features; it doesn't guarantee them, and nothing here
  promises rankings or traffic.

---

## Deploying to Vercel

1. Push this repository to GitHub (already done for this branch).
2. In Vercel: **Add New → Project → Import** the repo. Framework preset: Next.js. No build settings to change.
3. Add environment variables (above). For a portfolio preview, set only `NEXT_PUBLIC_SITE_URL` (or nothing).
4. Deploy. Every push to the production branch redeploys; other branches get preview URLs.
5. Optional custom domain: Vercel → Project → Domains, then update `NEXT_PUBLIC_SITE_URL`.

Keep the Vercel project and domain under the account of whoever owns the project. Never commit `.env*` files with
real values (`.gitignore` already excludes them, except `.env.example`).

---

## Before a commercial launch

This checklist matters because the site uses a real business's name and details.

- [ ] **Written approval from Hometown Bar-B-Que** to publish, and their brand assets (logo, wordmark). The current
      wordmark is a text-only concept, not their logo.
- [ ] **Replace all imagery** with licensed photography of the actual food and venue, then remove the
      "Illustrative" tags and update alt text.
- [ ] **Hours:** confirm the full weekly schedule, fill `hours.schedule`, set `verified: true`. Sources disagreed
      on closing times when this was built.
- [ ] **Menu:** confirm every item still appears on <https://hometownbbq.com/menu-rh>, add current prices, and
      confirm the "Korean Ribs" / "Jerk Ribs" naming. Item names came from official menu excerpts and the
      restaurant's Google listing; the official site couldn't be loaded directly while this was built.
- [ ] **Story facts:** confirm "opened 2013", "oak", "traditional Southern techniques", and the live-music and
      bar wording in the Atmosphere section.
- [ ] **Ordering:** if the restaurant has an official online-ordering partner, add it as a CTA (none is linked now
      because none could be verified).
- [ ] **Social links:** add only the restaurant's verified accounts.
- [ ] Remove the concept notice in `site.ts` / footer, set `NEXT_PUBLIC_ALLOW_INDEXING=true`, set the real domain.
- [ ] Add privacy and accessibility pages if analytics or a map embed are used in production.
- [ ] Run Lighthouse / PageSpeed Insights on the deployed URL and fix anything it flags.
