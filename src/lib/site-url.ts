/**
 * Canonical origin for metadata, sitemap and structured data.
 *
 * Set NEXT_PUBLIC_SITE_URL in production (see .env.example). Without it, the
 * URL each common host exposes at build time is used, so canonical, Open
 * Graph and sitemap links never point at localhost on a real deployment.
 */
function hostUrl(): string | undefined {
  const env = process.env;
  const withScheme = (v?: string) => (v ? (v.startsWith("http") ? v : `https://${v}`) : undefined);
  return (
    withScheme(env.NEXT_PUBLIC_SITE_URL) ??
    withScheme(env.VERCEL_PROJECT_PRODUCTION_URL) ?? // Vercel
    withScheme(env.URL) ?? // Netlify
    withScheme(env.RENDER_EXTERNAL_URL) ?? // Render
    withScheme(env.RAILWAY_PUBLIC_DOMAIN) ?? // Railway
    withScheme(env.CF_PAGES_URL) // Cloudflare Pages
  );
}

export function siteUrl(): URL {
  return new URL(hostUrl() ?? "http://localhost:3000");
}

/**
 * Indexing is OFF unless explicitly enabled. This is an unofficial concept;
 * only turn it on for a launch the restaurant has approved.
 */
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
