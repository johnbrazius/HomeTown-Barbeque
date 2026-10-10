/**
 * Canonical origin for metadata, sitemap and structured data.
 * Set NEXT_PUBLIC_SITE_URL in production (see .env.example).
 */
export function siteUrl(): URL {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");
  return new URL(raw);
}

/**
 * Indexing is OFF unless explicitly enabled. This is an unofficial concept;
 * only turn it on for a launch the restaurant has approved.
 */
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
