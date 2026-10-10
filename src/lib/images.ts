import "server-only";
import { existsSync, readFileSync } from "node:fs";
import { imageSize } from "image-size";
import path from "node:path";
import { images, type ImageKey } from "@/content/images";
import { venueSlots } from "@/content/venue";

export type ResolvedImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  focus?: string;
  tone: string;
};

/**
 * Prefer the self-hosted copy in /public/images; fall back to the original
 * remote source if it has not been downloaded yet. Resolved at build time.
 */
export function img(key: ImageKey): ResolvedImage {
  const entry = images[key];
  const local = path.join(process.cwd(), "public", "images", entry.file);
  const src = existsSync(local) ? `/images/${entry.file}` : entry.remote;
  return {
    src,
    width: entry.width,
    height: entry.height,
    alt: entry.alt,
    focus: "focus" in entry ? entry.focus : undefined,
    tone: entry.tone,
  };
}

export type VenueImage = ResolvedImage & { name: string; real: boolean };

const EXTS = ["jpg", "jpeg", "png", "webp"];

/**
 * Resolve each venue slot: a real photo from /public/images/venue/<name>.<ext>
 * when present (dimensions read from the file), otherwise the slot's
 * concept-image fallback.
 */
export function venueImages(): VenueImage[] {
  return venueSlots.map((slot) => {
    for (const ext of EXTS) {
      const file = path.join(process.cwd(), "public", "images", "venue", `${slot.name}.${ext}`);
      if (existsSync(file)) {
        const { width = 1600, height = 1000 } = imageSize(readFileSync(file));
        return {
          name: slot.name,
          real: true,
          src: `/images/venue/${slot.name}.${ext}`,
          width,
          height,
          alt: slot.alt,
          tone: "#1d1916",
        };
      }
    }
    return { ...img(slot.fallback), name: slot.name, real: false };
  });
}
