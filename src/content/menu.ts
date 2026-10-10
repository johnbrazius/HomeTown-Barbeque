import type { ImageKey } from "./images";

/**
 * Red Hook menu content.
 *
 * Item names and descriptions were cross-checked against public listings of
 * the Red Hook menu (official menu page excerpts and the restaurant's Google
 * listing).
 * Prices are intentionally left blank: published figures disagreed between
 * sources at the time of writing, so the site links to the official menu
 * instead. Add a `price` string (e.g. "$20 / ½ lb") once confirmed and it
 * renders automatically.
 *
 * Menus change — treat hometownbbq.com/menu-rh as the source of truth.
 */

export type MenuItem = {
  name: string;
  /** Short, factual descriptor. Leave out rather than invent. */
  note?: string;
  price?: string;
  tags?: ("by weight" | "popular")[];
};

export type MenuCategory = {
  id: string;
  label: string;
  /** One-line intro shown above the list */
  intro: string;
  feature: {
    image: ImageKey;
    title: string;
    caption: string;
  };
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "meats",
    label: "Smoked Meats",
    intro: "Straight off the pit and onto the block.",
    feature: {
      image: "heroWide",
      title: "Brisket",
      caption: "The house signature, smoked over oak.",
    },
    items: [
      { name: "Brisket", tags: ["by weight", "popular"] },
      { name: "Beef Rib", note: "A single bone, sold by the pound", tags: ["by weight"] },
      { name: "Pulled Pork", tags: ["popular"] },
      { name: "Italian Sausage", tags: ["popular"] },
    ],
  },
  {
    id: "ribs",
    label: "Ribs & Specialties",
    intro: "On the bone, and a few house favorites.",
    feature: {
      image: "ribs",
      title: "Spare Ribs",
      caption: "Pork spare ribs, smoked low over oak.",
    },
    items: [
      { name: "Pork Spare Ribs" },
      { name: "Korean Sticky Ribs", note: "Korean barbecue sauce, scallion, cashews, fried shallots, garlic" },
      { name: "Jerk Rib Tips", note: "Cilantro ranch, scallions" },
      { name: "Vietnamese Hot Wings", note: "Sesame seeds, scallion, cilantro ranch" },
    ],
  },
  {
    id: "sandwiches",
    label: "Sandwiches & Tacos",
    intro: "Everything from the pit, piled into bread or tortillas.",
    feature: {
      image: "pulledPork",
      title: "Pulled Pork Sandwich",
      caption: "One of the counter’s most-ordered plates.",
    },
    items: [
      { name: "Pulled Pork Sandwich", tags: ["popular"] },
      { name: "Pastrami Sandwich", tags: ["popular"] },
      { name: "Lamb Banh Mi", note: "Baguette, pickled daikon and carrot, hot and sweet sauce, cilantro", tags: ["popular"] },
      { name: "Brisket Taco", tags: ["popular"] },
      { name: "Frito Pie", tags: ["popular"] },
    ],
  },
  {
    id: "sides",
    label: "Sides",
    intro: "The supporting cast. Ask at the counter for sizes.",
    feature: {
      image: "sides",
      title: "Cornbread",
      caption: "Served with honey butter.",
    },
    items: [
      { name: "Mac and Cheese", tags: ["popular"] },
      { name: "Cornbread", note: "With honey butter" },
      { name: "Collard Greens" },
      { name: "Texas-Style Pinto Beans" },
      { name: "Brisket Queso" },
      { name: "Slaw" },
      { name: "Potato Salad" },
      { name: "Pickles" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    intro: "Save room. Or don’t — take it to go.",
    feature: {
      image: "pudding",
      title: "Banana Cream Pudding",
      caption: "A Southern classic to finish.",
    },
    items: [{ name: "Banana Cream Pudding" }, { name: "Key Lime Pie" }],
  },
];
