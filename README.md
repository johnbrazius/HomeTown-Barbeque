# Hometown Bar-B-Que — Red Hook (redesign concept)

A cinematic, 15-page website concept for **Hometown Bar-B-Que, 454 Van Brunt Street, Red Hook, Brooklyn** — opening with a scroll-driven 3D walk from the street into the restaurant.

> **This is an independent portfolio concept.** It is not affiliated with, commissioned or endorsed by
> Hometown Bar-B-Que. Until real photographs are added (see [Venue photos](#venue-photos-3d-home-page)),
> imagery is AI-generated and illustrative, not photographs of the restaurant's food or premises. Search indexing is **off by default** (see [Configuration](#configuration)).

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Three.js via
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

Node 20.9+ is required (`engines` in package.json; `.nvmrc` pins 22, which hosts like Netlify and Render pick up). `images:fetch` needs Node 22.

---

## Pages

| Route | Page | Route | Page |
| --- | --- | --- | --- |
| `/` | Home — 3D “Step inside” opener + overview | `/locations` | Red Hook + the Hometown family |
| `/menu` | Full menu with category jump links | `/press` | Press & MICHELIN recognition |
| `/story` | Timeline, pitmaster, Brooklyn flavors | `/faq` | FAQ (+ FAQPage JSON-LD) |
| `/the-pit` | Principles, process, brisket anatomy | `/red-hook` | Getting here + neighborhood guide |
| `/visit` | Address, hours, map, how it works | `/barbecue-101` | Ordering guide + glossary |
| `/live-music` | Weekend music in the hall | `/accessibility` | Accessibility statement |
| `/catering` | Off-site catering (45+) | `/privacy` | Privacy policy |
| `/private-events` | Semi-private / private events | | + custom 404 |

## How it's organised

```
src/
├── app/                   One folder per route (page.tsx), plus layout, sitemap, robots, 404, icon
├── content/               ← edit content here, not in components
│   ├── site.ts            Address, phone, hours, navigation groups, service model, concept notice
│   ├── menu.ts            Menu categories and items
│   ├── story.ts           Timeline, pitmaster, recognition, press list (with sources)
│   ├── guides.ts          FAQ, events, locations, Red Hook guide, Barbecue 101
│   ├── experience.ts      Chapter copy for the 3D home opener
│   ├── venue.ts           Photo slots for the 3D opener (real photos drop in here)
│   └── images.ts          Concept image manifest (file, remote source, size, alt text)
├── lib/
│   ├── images.ts          Resolves concept images and venue photo slots (build time)
│   ├── metadata.ts        Per-page title/description/canonical helper
│   ├── structured-data.ts Restaurant JSON-LD (verified fields only)
│   ├── analytics.ts       Opt-in analytics + event names
│   └── site-url.ts        Canonical origin (auto-detects common hosts) + indexing switch
└── components/
    ├── experience/        Experience (server), ExperienceStage (scroll stage), ExperienceScene (Three.js)
    ├── layout/            Header (+ “More” mega menu, mobile drawer), Footer sitemap, MobileActionBar
    ├── sections/          Home sections, Bands (CTA/explore/recognition), BrisketDiagram, MapFacade…
    └── ui/                PageHero (+ breadcrumb JSON-LD), SectionHeading, ButtonLink, Photo, Reveal, Prose…
```

## Venue photos (3D home page)

The home page opens with a scroll-driven walk from the street into the restaurant: six photos hang in a
3D corridor and the camera moves through them as you scroll. **Real photos replace the placeholders
automatically** — put them in `public/images/venue/` with these names (`.jpg`, `.jpeg`, `.png` or `.webp`):

| File name | Photo |
| --- | --- |
| `exterior` | The building and sign from the street (dusk looks best) |
| `woodpile` | The oak woodpile against the painted wall |
| `bar` | The bar under the string lights |
| `hall` | The dining hall — wooden tables and chairs |
| `pit` | The steel smoker |
| `table` | A long table set for a group |

Then rebuild (or push — the host rebuilds). Dimensions are read from the files; landscape photos at
least 1600px wide look best. Missing slots fall back to the concept images.

Only use photos you have rights to (your own, or supplied by the restaurant). Don't use photos with
watermarks or from review sites/blogs, and avoid identifiable guests unless they've agreed.

The 3D layer only runs on screens ≥900px wide with WebGL and no reduced-motion preference; everyone else
gets the same chapters as crossfading full-screen photos. If any photo fails to load, it falls back the
same way. Rendering pauses whenever the opener is off-screen.

### Design system

- **Palette** (Tailwind tokens in `globals.css`): `ink` #0D0C0B · `char` #171513 · `ember` #B94728 ·
  `cream` #F1E5D0 · `smoke` #A49A8D · `bark` #35241B.
- **Type:** Big Shoulders (industrial condensed display + micro-labels), Instrument Serif italic (editorial accents),
  Hanken Grotesk (body/UI). Loaded with `next/font` (self-hosted, `display: swap`, fallbacks set).
- **Rhythm:** dark hero → ember ticker → cream story → charcoal menu → near-black pit → cream hall → brown visit → black footer.

### Motion & 3D

- The home opener (`components/experience/`) is a sticky stage inside a tall section: normal scrolling
  drives it, nothing is hijacked. Scroll progress is passed to Three.js through a ref, so scrolling never
  re-renders React. The scene is loaded on idle, textures are served same-origin through the Next image
  optimizer, and an fbm smoke layer plus ~500 embers fill the corridor.
- Inner pages open with a CSS title entrance that plays before JavaScript hydrates.
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

Address, phone, links, navigation groups and the service model live here. Home opener copy is in `src/content/experience.ts`.

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
| `NEXT_PUBLIC_SITE_URL`         | Canonical origin for canonical URL, Open Graph, sitemap and JSON-LD. If unset, the host's own URL is used (Vercel, Netlify, Render, Railway, Cloudflare Pages), then `http://localhost:3000`. |
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
- [ ] **Add the six venue photos** (see [Venue photos](#venue-photos-3d-home-page)) and replace the concept
      food imagery with licensed photography, then remove the "Illustrative" tags and update alt text.
- [ ] **Story & press:** confirm the timeline (2012 lease, Sandy, September 2013 opening, 2019 expansion), the
      pitmaster bio, the Bib Gourmand wording/year, and the Industry City and Miami details on `/locations`.
- [ ] **Events:** confirm the private-event days and the 45-guest catering minimum.
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
