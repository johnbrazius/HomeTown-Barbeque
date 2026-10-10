import { business, hours } from "@/content/site";
import { siteUrl } from "./site-url";

/**
 * Schema.org Restaurant JSON-LD. Only verified facts are included:
 * no ratings, reviews, price range or coordinates. Opening hours are emitted
 * only once `hours.verified` is true and a full schedule exists.
 */
export function restaurantJsonLd() {
  const url = siteUrl().toString();

  const openingHoursSpecification =
    hours.verified && hours.schedule.length
      ? hours.schedule
          .filter((d) => d.opens && d.closes)
          .map((d) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: `https://schema.org/${d.day}`,
            opens: d.opens,
            closes: d.closes,
          }))
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${url}#restaurant`,
    name: business.name,
    url,
    telephone: business.phoneE164,
    servesCuisine: business.cuisine,
    hasMenu: new URL("/menu", url).toString(),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.streetShort,
      addressLocality: business.locality,
      addressRegion: business.region,
      postalCode: business.postalCode,
      addressCountry: business.country,
    },
    ...(openingHoursSpecification ? { openingHoursSpecification } : {}),
  };
}
