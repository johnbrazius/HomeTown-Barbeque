import type { MetadataRoute } from "next";
import { legalNav, navGroups } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteUrl();
  const paths = ["/", ...new Set(navGroups.flatMap((g) => g.items.map((i) => i.href))), ...legalNav.map((l) => l.href)];
  return paths.map((p) => ({
    url: new URL(p, origin).toString(),
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : legalNav.some((l) => l.href === p) ? 0.3 : 0.7,
  }));
}
