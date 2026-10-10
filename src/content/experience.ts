/**
 * Copy for the home page's scroll-driven "Step inside" sequence.
 * One chapter per venue photo slot (see venue.ts), in walking order.
 */
export type Chapter = {
  slot: string;
  eyebrow: string;
  title: string[];
  body: string;
  links?: { label: string; href: string; primary?: boolean }[];
};

export const chapters: Chapter[] = [
  {
    slot: "exterior",
    eyebrow: "Red Hook, Brooklyn · Since 2013",
    title: ["Low & slow.", "Brooklyn bold."],
    body: "Oak-smoked barbecue on Van Brunt Street. Scroll to step inside.",
    links: [
      { label: "Explore the menu", href: "/menu", primary: true },
      { label: "Plan a visit", href: "/visit" },
    ],
  },
  {
    slot: "woodpile",
    eyebrow: "01 · The fuel",
    title: ["It starts", "with oak."],
    body: "Split oak, stacked and waiting. It’s the heat and the seasoning — the flavor begins at the woodpile.",
    links: [{ label: "Inside the pit", href: "/the-pit" }],
  },
  {
    slot: "bar",
    eyebrow: "02 · The hall",
    title: ["String lights", "& a full bar."],
    body: "Grab a drink while you wait in line. On weekend nights, there’s a band.",
    links: [{ label: "Live music", href: "/live-music" }],
  },
  {
    slot: "hall",
    eyebrow: "03 · The counter",
    title: ["Grab a tray.", "Find a seat."],
    body: "No reservations, no fuss. Order meat by weight at the counter, add the sides, dig in.",
    links: [{ label: "How ordering works", href: "/barbecue-101" }],
  },
  {
    slot: "pit",
    eyebrow: "04 · The pit",
    title: ["Steel, fire,", "patience."],
    body: "Wood-fired steel working low and slow, following traditional Southern technique.",
    links: [{ label: "Our story", href: "/story" }],
  },
  {
    slot: "table",
    eyebrow: "05 · Gather",
    title: ["Bring the", "whole crew."],
    body: "Semi-private and private events in Red Hook, and off-site catering for groups of 45 or more.",
    links: [
      { label: "Private events", href: "/private-events", primary: true },
      { label: "Catering", href: "/catering" },
    ],
  },
];
