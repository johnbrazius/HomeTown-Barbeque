import type { NextConfig } from "next";
import { legacyRedirects } from "./src/content/legacy-redirects";

const nextConfig: NextConfig = {
  // Old hometownbbq.com URLs → new pages (see src/content/legacy-redirects.ts)
  redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    // Only used until images are self-hosted (npm run images:fetch).
    remotePatterns: [{ protocol: "https", hostname: "cdn.openart.ai", pathname: "/openart-ai/production/**" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
