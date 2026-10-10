import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";
import { images, type ImageKey } from "@/content/images";

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
