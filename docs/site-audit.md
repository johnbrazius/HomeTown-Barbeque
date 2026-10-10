# hometownbbq.com — audit & what the redesign fixes

Prepared October 2026. Findings come from the pages search engines currently index for
hometownbbq.com (the live site couldn't be loaded directly from the build environment), so
re-check each item on the live site before presenting it.

## Problems found on the current site → how the redesign solves them

| # | Problem on hometownbbq.com | Evidence | How the redesign solves it |
|---|---|---|---|
| 1 | **Conflicting opening hours.** The homepage says Sun & Tue–Thu noon–9pm, Fri–Sat noon–10pm; the Locations page says Tue–Thu noon–10pm, Fri–Sat noon–11pm, Sun noon–10pm. | `/` vs `/locations` | Hours live in **one data file** and every page reads from it, so they can never disagree. A "Last reviewed" date shows next to them. |
| 2 | **Six-year-old temporary pages still live.** "Temp home", "Temporary Closure" and "Hometown BBQ no menu" still describe early-2020 pickup and delivery arrangements. | `/temp-home`, `/temporary-closure`, `/hometown-bbq-no-menu` | Temporary news goes in an **announcement bar with a required expiry date**; it disappears by itself. Old URLs redirect to the homepage. |
| 3 | **A draft page is public.** "Copy of Catering with old form" is indexed by Google. | `/copy-of-catering-with-old-form` | No draft or duplicate pages; every page is in the sitemap on purpose. The old URL redirects to Catering. |
| 4 | **Typos in URLs and titles.** `/ired-hook-music`, `/live-music-indutry-city-old`, page title "LIve Music Red Hook". | URLs and page titles | Clean, readable URLs (`/live-music`, `/catering`, `/faq`) and one consistent title format. |
| 5 | **Stale event listings.** Live-music event pages from 2022 are still indexed. | `/live-music/red-hook/2022/…` | The Live Music page has no dated listings that go out of date; old event URLs redirect to it. |
| 6 | **Contradictory catering rules.** One page says online catering orders need 3 days' notice, another says 2 days. | `/order-catering-online` vs `/tailgate` | Catering facts (45-guest minimum, how to inquire) are stored once and reused on every page. |
| 7 | **Stale pickup info.** The Red Hook menu page says pickups are only at Industry City, and other pages say Industry City is closed. | `/menu-rh`, `/hometown-bbq-no-menu` | The menu page carries no location-specific pickup notes; the Locations page states status clearly and points to official channels. |
| 8 | **Several different contact emails** (catering@, Info@, and an apparently misspelled info@hometownbarbque.com). | Various pages | **One catering email**, set in one place and used everywhere (Catering page, FAQ). |
| 9 | **Inconsistent naming.** "Hometown BBQ", "Hometown Bar-B-Que", "— Hometown", ALL-CAPS titles. | Page titles | One name and one title template on every page: "Page · Hometown Bar-B-Que". |
| 10 | **Hard-to-guess URLs.** The FAQ lives at `/eat-together`, the menu at `/menu-rh`. | URLs | `/faq` and `/menu`, with **permanent redirects from every old URL** so Google rankings, Yelp and press links keep working. |
| 11 | **Key answers scattered.** No reservations, no delivery, no phone or email takeout orders, catering for 45+ are spread across pages. | FAQ, catering pages | A dedicated **FAQ page** answers all of them in one place, linked from Visit and the footer. |
| 12 | **The story isn't told.** Hurricane Sandy, the 2013 opening, the MICHELIN Bib Gourmand and the press coverage don't have a home. | — | **Our Story** (timeline), **Press & Recognition** and a **MICHELIN** band on key pages. |

## What else the redesign adds

- **15 pages**, each with a clear job: Menu, Story, The Pit, Visit, Live Music, Catering,
  Private Events, Locations, Press, FAQ, Red Hook guide, Barbecue 101, Accessibility, Privacy.
- **A 3D "Step inside" homepage**: scroll from the street into the restaurant. A lighter version
  runs on phones.
- **Phone first**: a sticky bar with one-tap Menu, Call and Directions, and large touch targets.
- **Search-ready**: a unique title and description on every page, a sitemap, Restaurant,
  breadcrumb and FAQ structured data, and clean URLs.
- **Fast**: every page is pre-built (static). The 3D scene loads only after the page is ready and
  pauses when off-screen. Lighthouse Performance scored 93 on mobile and 100 on desktop in the
  single-page version; re-run it on the final deployment.
- **Accessible**: keyboard navigation, visible focus, reduced-motion support and AA color contrast.
- **Easy to update**: menu, hours, events and copy live in plain data files; photos are dropped into
  named slots.

## Still needed from the restaurant

Real photos (food and venue), logo files, confirmed hours and prices, and approval of the story
and press wording.
