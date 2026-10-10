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
  officialSite: "https://hometownbbq.com/",
  officialMenu: "https://hometownbbq.com/menu-rh",
  officialLocations: "https://hometownbbq.com/locations",
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
  summary: { label: string; value: string }[];
  note: string;
  schedule: DayHours[];
} = {
  verified: false,
  summary: [
    { label: "Tuesday – Sunday", value: "Doors at noon" },
    { label: "Monday", value: "Closed" },
  ],
  note: "Closing times vary by day, and the pit closes early when the meat sells out. Confirm today’s hours on hometownbbq.com or by phone before you head over.",
  schedule: [],
};

export const serviceModel = [
  {
    title: "Counter service",
    body: "Order at the counter. Meats are sold by weight alongside sandwiches, sides and dessert.",
  },
  {
    title: "Walk in",
    body: "First come, first served — when the day’s barbecue is gone, it’s gone.",
  },
  {
    title: "Dine in or take away",
    body: "Grab a seat in the hall or take it to go.",
  },
] as const;

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Menu", href: "#menu" },
  { label: "Our Story", href: "#story" },
  { label: "The Pit", href: "#pit" },
  { label: "Visit", href: "#visit" },
];

/** Hero copy — draft wording, edit freely. */
export const heroCopy = {
  eyebrow: "Red Hook, Brooklyn · Pit-smoked barbecue",
  titleLines: ["Low & slow.", "Brooklyn bold."],
  body: "Oak-smoked barbecue. Deep flavor. A taste of the pit in Red Hook, Brooklyn.",
  primaryCta: { label: "Explore the menu", href: "#menu" },
  secondaryCta: { label: "Find us in Red Hook", href: "#visit" },
} as const;

export const conceptNotice =
  "Independent redesign concept for portfolio purposes. Not affiliated with, commissioned or endorsed by Hometown Bar-B-Que. Food and place imagery is AI-generated and illustrative — it does not depict the restaurant’s actual food or premises.";
