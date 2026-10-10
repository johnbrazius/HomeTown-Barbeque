import Link from "next/link";
import { MapPin, ArrowUpRight, ArrowRight } from "lucide-react";
import { pageMeta } from "@/lib/metadata";
import { locations } from "@/content/guides";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ExploreGrid, PlanVisitBand } from "@/components/sections/Bands";

export const metadata = pageMeta({
  title: "Locations",
  description:
    "Hometown Bar-B-Que’s original Red Hook restaurant at 454 Van Brunt Street, plus the wider Hometown family in Industry City and Miami.",
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Locations", href: "/locations" }]}
        eyebrow="Locations"
        title="Red Hook"
        accent="& beyond."
        intro={
          <p>
            It all started on Van Brunt Street. Since 2019 the Hometown name has traveled — to Industry City in Sunset
            Park and to Miami. This site covers the Red Hook original.
          </p>
        }
      />

      <section aria-label="All locations" className="on-cream bg-cream text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
          <ul className="grid gap-px bg-ink/15 lg:grid-cols-3">
            {locations.map((l, i) => {
              const internal = l.href?.startsWith("/");
              const Icon = internal ? ArrowRight : ArrowUpRight;
              return (
                <Reveal
                  as="li"
                  key={l.area}
                  delay={0.06 * i}
                  className={`flex flex-col justify-between gap-12 p-6 md:p-10 ${l.primary ? "bg-ink text-cream" : "bg-cream"}`}
                >
                  <div>
                    <p className={`label ${l.primary ? "text-ember-bright" : "text-ember-ink"}`}>
                      {l.primary ? "The original" : "Hometown family"}
                    </p>
                    <h2 className="display mt-6 text-5xl md:text-6xl">{l.area.split(",")[0]}</h2>
                    <p className={`label mt-2 ${l.primary ? "text-cream/70" : "text-ink/70"}`}>{l.area}</p>
                    <p className={`mt-6 text-lg ${l.primary ? "text-cream/80" : "text-ink/80"}`}>{l.note}</p>
                  </div>
                  <div>
                    {l.address && (
                      <p className={`flex items-start gap-2 ${l.primary ? "text-cream/85" : "text-ink/85"}`}>
                        <MapPin aria-hidden className="mt-1 size-4 shrink-0" />
                        {l.address}
                      </p>
                    )}
                    {l.href &&
                      (internal ? (
                        <Link
                          href={l.href}
                          className="label mt-6 inline-flex min-h-11 items-center gap-2 text-ember-bright hover:text-cream"
                        >
                          Plan a visit <Icon aria-hidden className="size-4" />
                        </Link>
                      ) : (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="label mt-6 inline-flex min-h-11 items-center gap-2 text-ember-ink hover:underline"
                        >
                          Official site <Icon aria-hidden className="size-4" />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ))}
                  </div>
                </Reveal>
              );
            })}
          </ul>
          <p className="mt-10 max-w-2xl text-ink/70">
            Hours, menus and policies differ between locations. Details for Industry City and Miami are summarized from
            public sources — always call ahead before you go.
          </p>
        </div>
      </section>

      <PlanVisitBand />
      <ExploreGrid exclude={["/locations"]} />
    </>
  );
}
