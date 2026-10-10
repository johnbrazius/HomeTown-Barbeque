import type { ImageKey } from "./images";

/**
 * Photo slots for the 3D "Step inside" home experience.
 *
 * Drop real photographs of the restaurant into /public/images/venue/ using
 * the file names below (jpg, jpeg, png or webp) and they replace the concept
 * imagery automatically on the next build — no code changes needed.
 * Until a file exists, its `fallback` concept image is used.
 *
 * Only use photos you have the rights to (taken by you, or supplied by the
 * restaurant). Avoid photos with watermarks or identifiable guests.
 */
export type VenueSlot = {
  /** File name without extension, inside /public/images/venue/ */
  name: string;
  /** What photo belongs in this slot */
  shows: string;
  alt: string;
  fallback: ImageKey;
};

export const venueSlots: VenueSlot[] = [
  {
    name: "exterior",
    shows: "The building from the street — sign and front door, ideally at dusk",
    alt: "The Hometown Bar-B-Que building and sign from the street",
    fallback: "heroWide",
  },
  {
    name: "woodpile",
    shows: "The oak woodpile against the painted wall",
    alt: "Split oak firewood stacked against the Hometown wall",
    fallback: "oak",
  },
  {
    name: "bar",
    shows: "The bar under the string lights",
    alt: "The bar inside Hometown under strands of string lights",
    fallback: "smoke",
  },
  {
    name: "hall",
    shows: "The dining hall with wooden tables and chairs",
    alt: "Wooden tables and folding chairs in the Hometown dining hall",
    fallback: "sides",
  },
  {
    name: "pit",
    shows: "The steel smoker",
    alt: "A black steel barbecue smoker",
    fallback: "firebox",
  },
  {
    name: "table",
    shows: "A long table set for a group",
    alt: "A long wooden table set with chairs for a group meal",
    fallback: "ribs",
  },
];
