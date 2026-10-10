import type { Metadata } from "next";

/**
 * Per-page metadata with its own canonical URL and Open Graph URL.
 * The title template in the root layout appends " · Hometown Bar-B-Que".
 */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} · Hometown Bar-B-Que`, description, url: path },
    twitter: { title: `${title} · Hometown Bar-B-Que`, description },
  };
}
