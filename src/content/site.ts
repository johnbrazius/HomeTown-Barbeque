/**
 * Business facts for the Red Hook location.
 *
 * Everything here is shown publicly and some of it feeds structured data,
 * so only change a value after checking it against an official source
 * (hometownbbq.com, the restaurant itself). See README → "Before launch".
 */

export const business = {
  name: "Hometown Bar-B-Que",
  location: "Red Hook",
  street: "454 Van Brunt Street",
  streetShort: "454 Van Brunt St",
  locality: "Brooklyn",
  region: "NY",
  postalCode: "11231",
  country: "US",
  phoneDisplay: "(347) 294-4644",
  phoneE164: "+13472944644",
  cuisine: ["Barbecue"],
  founded: "2013",
  /** One address, used everywhere — the old site listed several different ones. */
  cateringEmail: "catering@hometownbbq.com",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=Hometown%20Bar-B-Que%2C%20454%20Van%20Brunt%20St%2C%20Brooklyn%2C%20NY%2011231",
  mapSearch:
    "https://www.google.com/maps/search/?api=1&query=Hometown%20Bar-B-Que%2C%20454%20Van%20Brunt%20St%2C%20Brooklyn%2C%20NY%2011231",
  mapEmbed:
    "https://www.google.com/maps?q=Hometown+Bar-B-Que,+454+Van+Brunt+St,+Brooklyn,+NY+11231&output=embed",
} as const;

export const fullAddress = `${business.street}, ${business.locality}, ${business.region} ${business.postalCode}`;

/**
 * Opening hours.
 *
 * Sources consistently agree on: closed Mondays, doors at noon the rest of the
 * week. Published closing times disagree between sources, so they are NOT shown
 * as fact and NOT emitted as structured data until `verified` is true.
 *
 * To publish full hours: fill in `schedule` from the official site, set
 * `verified: true`, and the UI + JSON-LD pick it up automatically.
 */
export type DayHours = {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  /** 24h "HH:MM", or null when closed */
  opens: string | null;
  closes: string | null;
};

export const hours: {
  verified: boolean;
  /** When someone last confirmed these hours (YYYY-MM-DD). Shown on the site. */
  reviewed: string;
  summary: { label: string; value: string }[];
  note: string;
  schedule: DayHours[];
} = {
  verified: false,
  reviewed: "2026-10-10",
  summary: [
    { label: "Tuesday – Sunday", value: "Doors at noon" },
    { label: "Monday", value: "Closed" },
  ],
  note: "Closing times vary by day, and the pit closes early when the meat sells out. Call to confirm today’s hours before you head over.",
  schedule: [],
};

export const serviceModel = [
  {
    title: "Counter service",
    body: "Order at the counter. Meats are sold by weight alongside sandwiches, sides and dessert.",
  },
  {
    title: "No reservations",
    body: "First come, first served — when the day’s barbecue is gone, it’s gone.",
  },
  {
    title: "Dine in or take away",
    body: "Grab a seat in the hall or take it to go.",
  },
] as const;

export type NavItem = { label: string; href: string; blurb?: string };

/** Main header links (desktop shows these inline). */
export const nav: NavItem[] = [
  { label: "Menu", href: "/menu" },
  { label: "Our Story", href: "/story" },
  { label: "The Pit", href: "/the-pit" },
  { label: "Visit", href: "/visit" },
];

/** Everything else, grouped. Drives the "More" menu, mobile drawer, footer and sitemap. */
export const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "Eat",
    items: [
      { label: "Menu", href: "/menu", blurb: "Smoked meats, ribs, sandwiches, sides and dessert." },
      { label: "Barbecue 101", href: "/barbecue-101", blurb: "How to order by weight, and the words behind the meat." },
      { label: "Catering", href: "/catering", blurb: "Off-site barbecue for groups of 45 or more." },
      { label: "Private Events", href: "/private-events", blurb: "Semi-private and private events in Red Hook." },
    ],
  },
  {
    title: "Hometown",
    items: [
      { label: "Our Story", href: "/story", blurb: "From Hurricane Sandy to a Michelin Bib Gourmand." },
      { label: "The Pit", href: "/the-pit", blurb: "Oak, fire, smoke and time." },
      { label: "Live Music", href: "/live-music", blurb: "Bands on weekend nights in the hall." },
      { label: "Press & Recognition", href: "/press", blurb: "What critics and guides have said." },
    ],
  },
  {
    title: "Visit",
    items: [
      { label: "Visit Red Hook", href: "/visit", blurb: "Address, hours, map and how it works." },
      { label: "Getting to Red Hook", href: "/red-hook", blurb: "Bus, ferry and what to see nearby." },
      { label: "Locations", href: "/locations", blurb: "Red Hook and the wider Hometown family." },
      { label: "FAQ", href: "/faq", blurb: "Reservations, groups, waits and more." },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Accessibility", href: "/accessibility" },
  { label: "Privacy", href: "/privacy" },
];

export const conceptNotice =
  "Independent redesign concept for portfolio purposes. Not affiliated with, commissioned or endorsed by Hometown Bar-B-Que. Food and place imagery is AI-generated and illustrative — it does not depict the restaurant’s actual food or premises.";
