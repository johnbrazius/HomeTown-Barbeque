/**
 * Story and recognition content.
 *
 * Every fact here comes from public reporting and is linked in `sources`
 * (rendered on /story and /press). Confirm wording with the restaurant
 * before a commercial launch — see README → "Before launch".
 */

export type TimelineEntry = {
  year: string;
  title: string;
  body: string;
  source?: { label: string; href: string };
};

export const timeline: TimelineEntry[] = [
  {
    year: "2012",
    title: "A lease on Van Brunt Street",
    body: "Billy Durney signs on a building in Red Hook and starts construction. Weeks later, Hurricane Sandy floods the neighborhood and wipes out much of the build-out.",
    source: {
      label: "Bedford + Bowery, 2013",
      href: "https://bedfordandbowery.com/2013/10/sunnys-and-steves-are-back-but-red-hook-is-still-smarting-from-sandy/",
    },
  },
  {
    year: "2012–13",
    title: "Cooking for the neighbors",
    body: "Before Hometown ever opens, the fire gets lit anyway — feeding Red Hook residents as the neighborhood rebuilds.",
  },
  {
    year: "2013",
    title: "Doors open",
    body: "Hometown Bar-B-Que opens at 454 Van Brunt Street in September 2013: a wood-paneled, roughly 120-seat hall built around the pit.",
    source: {
      label: "Time Out New York",
      href: "https://www.timeout.com/newyork/restaurants/hometown-bar-b-que-debuts-in-red-hook",
    },
  },
  {
    year: "2019",
    title: "The family grows",
    body: "A second Hometown opens inside Industry City in Sunset Park, and Hometown Barbecue arrives in Miami’s Allapattah neighborhood. Durney also opens Red Hook Tavern down the street.",
    source: {
      label: "Time Out New York, 2019",
      href: "https://www.timeout.com/newyork/news/hometown-bar-b-que-opens-in-industry-city-for-second-nyc-location-100319",
    },
  },
  {
    year: "Today",
    title: "A MICHELIN Bib Gourmand",
    body: "The MICHELIN Guide lists Hometown Bar-B-Que with a Bib Gourmand — its mark for good quality, good value cooking.",
    source: {
      label: "MICHELIN Guide",
      href: "https://guide.michelin.com/us/en/new-york-state/brooklyn/restaurant/hometown-bar-b-que",
    },
  },
];

export const pitmaster = {
  name: "Billy Durney",
  role: "Pitmaster & founder",
  paragraphs: [
    "A Brooklyn native, Billy Durney came to barbecue by an unusual road — he spent years working in private security before trading it for the pit.",
    "Hometown was the result: Texas-rooted, wood-fired barbecue made in Brooklyn, with room on the menu for the flavors of the city around it — Korean sticky ribs, jerk rib tips, Vietnamese-style hot wings and a lamb banh mi sit right next to the brisket.",
  ],
  source: {
    label: "Texas Monthly interview",
    href: "https://www.texasmonthly.com/bbq/interview-billy-durney-of-hometown-bar-b-que/",
  },
};

export type PressItem = {
  outlet: string;
  title: string;
  href: string;
  year?: string;
  kind: "Guide" | "Review" | "Interview" | "News" | "Listing";
};

export const recognition = {
  label: "MICHELIN Guide · Bib Gourmand",
  body: "Recognized by the MICHELIN Guide for good quality, good value cooking.",
  href: "https://guide.michelin.com/us/en/new-york-state/brooklyn/restaurant/hometown-bar-b-que",
};

export const press: PressItem[] = [
  {
    outlet: "MICHELIN Guide",
    title: "Hometown Bar-B-Que — Bib Gourmand",
    href: "https://guide.michelin.com/us/en/new-york-state/brooklyn/restaurant/hometown-bar-b-que",
    kind: "Guide",
  },
  {
    outlet: "Texas Monthly",
    title: "Interview: Billy Durney of Hometown Bar-B-Que",
    href: "https://www.texasmonthly.com/bbq/interview-billy-durney-of-hometown-bar-b-que/",
    kind: "Interview",
  },
  {
    outlet: "The Infatuation",
    title: "Great Red Hook days happen at Hometown Bar-B-Que",
    href: "https://www.theinfatuation.com/new-york/reviews/hometown-bar-b-que",
    kind: "Review",
  },
  {
    outlet: "Time Out New York",
    title: "Hometown Bar-B-Que debuts in Red Hook",
    href: "https://www.timeout.com/newyork/restaurants/hometown-bar-b-que-debuts-in-red-hook",
    year: "2013",
    kind: "News",
  },
  {
    outlet: "DNAinfo",
    title: "Hometown to smoke up Brooklyn-style barbecue in Red Hook",
    href: "https://www.dnainfo.com/new-york/20130729/red-hook/hometown-smoke-up-brooklyn-style-barbecue-red-hook/",
    year: "2013",
    kind: "News",
  },
  {
    outlet: "Time Out New York",
    title: "Hometown Bar-B-Que opens in Industry City for second NYC location",
    href: "https://www.timeout.com/newyork/news/hometown-bar-b-que-opens-in-industry-city-for-second-nyc-location-100319",
    year: "2019",
    kind: "News",
  },
  {
    outlet: "Gothamist",
    title: "Inside Billy Durney’s new Hometown Bar-B-Que in Industry City",
    href: "https://gothamist.com/food/inside-billy-durneys-new-hometown-bar-b-que-in-industry-city",
    year: "2019",
    kind: "News",
  },
  {
    outlet: "NYC Tourism + Conventions",
    title: "Hometown Bar-B-Que, Red Hook",
    href: "https://www.nyctourism.com/places/hometown-bar-b-que-red-hook",
    kind: "Listing",
  },
];
