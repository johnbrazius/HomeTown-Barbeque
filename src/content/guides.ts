/**
 * FAQ, events, locations, neighborhood and Barbecue 101 content.
 *
 * Restaurant-specific answers paraphrase the restaurant's own published FAQ
 * and event information. General barbecue and
 * neighborhood information is written as guidance, not as claims about the
 * restaurant. Re-check against official sources before launch.
 */
import { business } from "./site";

export type Faq = { q: string; a: string; link?: { label: string; href: string } };

export const faqs: { group: string; items: Faq[] }[] = [
  {
    group: "Planning a visit",
    items: [
      {
        q: "Do you take reservations?",
        a: "No. Hometown in Red Hook is first come, first served, and orders are placed at the counter.",
      },
      {
        q: "What are the hours?",
        a: "Hometown is closed on Mondays and opens at noon the rest of the week. Closing times vary by day, and the pit can close early when the meat sells out — call before you head over.",
        link: { label: "Visit details", href: "/visit" },
      },
      {
        q: "Is there a wait?",
        a: "On busy days there can be a line. The upside: you can chat with fellow diners, order drinks from the bar while you wait, and on weekend nights there’s live music.",
      },
      {
        q: "Can I get takeout?",
        a: "Yes — order at the counter and take it to go. Takeout orders aren’t taken over the phone or by email.",
      },
      {
        q: "Do you deliver?",
        a: "No. For groups of 45 or more, Hometown caters off-site instead.",
        link: { label: "Catering", href: "/catering" },
      },
    ],
  },
  {
    group: "Groups & events",
    items: [
      {
        q: "We’re a big group. Can we book a table?",
        a: "Because Hometown doesn’t take reservations, larger parties are handled as events. Semi-private and private events are possible on a limited basis in Red Hook.",
        link: { label: "Private events", href: "/private-events" },
      },
      {
        q: "Do you cater?",
        a: `Yes. Hometown offers off-site catering for groups of 45 or more and staffs each event to suit the style of service you want. Email ${business.cateringEmail} to start.`,
        link: { label: "Catering", href: "/catering" },
      },
    ],
  },
  {
    group: "Food",
    items: [
      {
        q: "How does ordering by weight work?",
        a: "Smoked meats like brisket are sold by weight. Order as much or as little as you like, then add sandwiches, sides and dessert.",
        link: { label: "Barbecue 101", href: "/barbecue-101" },
      },
      {
        q: "Where can I see prices?",
        a: "Prices change with the market and the pit — ask at the counter or call the restaurant for current pricing.",
        link: { label: "See the menu", href: "/menu" },
      },
      {
        q: "What if something is sold out?",
        a: "It happens — barbecue is cooked in batches, and once the day’s meat is gone, it’s gone. Earlier visits give you the best selection.",
      },
    ],
  },
];

export const events = {
  privateDays: [
    { when: "Tuesday – Thursday", what: "Evenings" },
    { when: "Tuesday – Friday", what: "Lunch" },
    { when: "Friday nights & Sunday lunch", what: "Occasionally" },
  ],
  cateringMin: 45,
};

export type Location = {
  name: string;
  area: string;
  address?: string;
  note: string;
  href?: string;
  primary?: boolean;
};

export const locations: Location[] = [
  {
    name: "Hometown Bar-B-Que",
    area: "Red Hook, Brooklyn",
    address: `${business.street}, Brooklyn, NY 11231`,
    note: "The original, open since 2013. Counter service, no reservations, live music on weekend nights.",
    href: "/visit",
    primary: true,
  },
  {
    name: "Hometown Bar-B-Que",
    area: "Industry City, Sunset Park",
    address: "87 35th Street, Brooklyn, NY",
    note: "Opened in 2019 inside the Industry City complex. Call ahead to confirm its current status before visiting.",
  },
  {
    name: "Hometown Barbecue Miami",
    area: "Allapattah, Miami",
    address: "1200 NW 22nd Street, Miami, FL",
    note: "Hometown’s Florida outpost, opened in 2019. It runs its own hours and reservation policy.",
  },
];

export const redHook = {
  intro: [
    "Red Hook sits on a peninsula on Brooklyn’s waterfront, facing New York Harbor and the Statue of Liberty. Its Belgian-block streets and 19th-century brick warehouses are a reminder of its life as a working port.",
    "Van Brunt Street is the neighborhood’s main drag — and Hometown sits right on it.",
  ],
  transit: [
    {
      mode: "Bus",
      title: "B61",
      body: "The B61 runs along Van Brunt Street through Red Hook. From Downtown Brooklyn, catch it near Jay Street–MetroTech or Borough Hall.",
      href: "https://new.mta.info/",
      cta: "MTA trip planner",
    },
    {
      mode: "Ferry",
      title: "NYC Ferry",
      body: "The Red Hook / Atlantic Basin stop is a short walk from Van Brunt Street — a scenic way in from Manhattan.",
      href: "https://www.ferry.nyc/",
      cta: "Ferry schedules",
    },
    {
      mode: "Car",
      title: "Driving",
      body: "Red Hook is mostly street parking. Give yourself a few minutes to find a spot on busy weekends.",
      href: business.directions,
      cta: "Get directions",
    },
  ],
  nearby: [
    {
      name: "Louis Valentino Jr. Park & Pier",
      body: "A small waterfront park with one of the best close-up views of the Statue of Liberty in the city.",
    },
    {
      name: "Pioneer Works",
      body: "An arts and science center in a converted 1800s ironworks — check its calendar for exhibitions and events.",
    },
    {
      name: "The waterfront warehouses",
      body: "Walk the cobblestone streets around Van Dyke and Conover for the neighborhood’s maritime architecture.",
    },
    {
      name: "Atlantic Basin",
      body: "The working waterfront where the ferry docks and cruise ships berth.",
    },
  ],
};

export const bbq101 = {
  howTo: [
    { step: "Get in line", body: "No reservations — join the line and look over the board while you wait." },
    { step: "Order meat by weight", body: "Brisket and other smoked meats are sold by weight. Ask for as much as you want." },
    { step: "Add the rest", body: "Sandwiches, ribs, wings, sides and dessert round out the tray." },
    { step: "Find a seat", body: "Grab a spot in the hall, get a drink from the bar, and dig in." },
  ],
  rule: {
    title: "How much should I order?",
    body: "A common rule of thumb at barbecue counters is about a half pound of meat per adult if you’re adding sides — more for big appetites, less if you’re sharing a lot of dishes. Your counter crew can help you size it.",
  },
  glossary: [
    { term: "Bark", def: "The dark, crusty exterior that forms as rub, smoke and rendered fat set on the surface of the meat during a long cook." },
    { term: "Smoke ring", def: "A pink band just under the surface of smoked meat, caused by a reaction between gases in wood smoke and the meat." },
    { term: "Low & slow", def: "Cooking at a low temperature for a long time so tough cuts break down and become tender." },
    { term: "Point & flat", def: "The two muscles of a whole brisket. The point is fattier and richer; the flat is leaner and slices neatly." },
    { term: "The stall", def: "A stretch of a long cook when the meat’s temperature plateaus as moisture evaporates from the surface." },
    { term: "Rest", def: "Letting meat sit after it comes off the pit so juices redistribute before slicing." },
    { term: "Hardwood", def: "Dense wood like oak that burns steadily and gives a clean, balanced smoke." },
    { term: "Pitmaster", def: "The person who tends the fire and decides when the meat is ready." },
  ],
};
