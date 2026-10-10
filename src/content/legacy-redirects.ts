/**
 * Permanent redirects from the URLs of the current hometownbbq.com site
 * (as indexed by search engines) to their equivalents here. If this site
 * replaces the old one on the same domain, links from Google, Yelp, press
 * articles and bookmarks keep working instead of hitting 404s.
 *
 * Add any other old URLs the owner knows about to this list. Never add a
 * source that matches a page on this site — the redirect would hide it.
 */
export const legacyRedirects: { source: string; destination: string }[] = [
  // Menus
  { source: "/menu-rh", destination: "/menu" },
  { source: "/hometown-bbq-no-menu", destination: "/menu" },
  // Locations & hours (/locations itself exists on this site, so it needs no redirect)
  { source: "/industry-city", destination: "/locations" },
  // FAQ lived at an unintuitive URL
  { source: "/eat-together", destination: "/faq" },
  // Catering & large orders
  { source: "/event-catering", destination: "/catering" },
  { source: "/order-catering-online", destination: "/catering" },
  { source: "/tailgate", destination: "/catering" },
  { source: "/copy-of-catering-with-old-form", destination: "/catering" },
  // Live music (including misspelled and archived sections)
  { source: "/ired-hook-music", destination: "/live-music" },
  { source: "/live-music/:path+", destination: "/live-music" }, // :path+ so /live-music itself never loops
  { source: "/live-music-indutry-city-old/:path*", destination: "/live-music" },
  // Expired temporary pages
  { source: "/temp-home", destination: "/" },
  { source: "/temporary-closure", destination: "/" },
];
