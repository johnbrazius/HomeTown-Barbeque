import { Music, Beer, Utensils } from "lucide-react";
import { business } from "@/content/site";
import { img } from "@/lib/images";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

/**
 * The room and the neighborhood. No photographs here claim to show the real
 * venue: the food images are tagged illustrative and the room is described in
 * words. Replace with authorized photography of the hall when available.
 */
const notes = [
  {
    icon: Utensils,
    title: "Counter service",
    body: "Order at the counter, find a seat, dig in. Casual by design.",
  },
  {
    icon: Beer,
    title: "At the bar",
    body: "Drinks to go with the smoke — see the official site for what’s pouring.",
  },
  {
    icon: Music,
    title: "Live music",
    body: "Red Hook hosts live music on select nights. Check the official calendar for who’s playing.",
  },
];

export function Atmosphere() {
  const sides = img("sides");
  const pudding = img("pudding");

  return (
    <section aria-labelledby="atmos-title" className="on-cream relative overflow-hidden bg-cream-deep text-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-36 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Overlapping composition */}
          <div className="relative lg:col-span-6">
            <Reveal variant="mask" className="relative aspect-square w-[88%]">
              <Photo image={sides} sizes="(min-width: 1024px) 42vw, 88vw" />
            </Reveal>
            <Reveal
              variant="mask"
              delay={0.15}
              className="relative -mt-[38%] ml-auto aspect-[4/5] w-[48%] border-[6px] border-cream-deep sm:border-8"
            >
              <Photo image={pudding} sizes="(min-width: 1024px) 22vw, 48vw" tagPosition="tr" />
            </Reveal>
            <p className="label mt-4 text-ink/70">Fig. 04 — Sides &amp; banana cream pudding</p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-10">
            <Reveal>
              <p className="label flex items-center gap-3 text-ember-ink">
                <span>04</span>
                <span aria-hidden className="h-px w-10 bg-ember" />
                <span>The hall</span>
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="atmos-title" className="display mt-6 text-[clamp(3.2rem,8vw,7.5rem)]">
                Warehouse{" "}
                <span className="font-serif text-[0.92em] font-normal normal-case italic tracking-normal text-ember">
                  soul.
                </span>
                <br />
                Red Hook roots.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/75">
                Down on {business.streetShort}, among the old brick warehouses of Brooklyn’s waterfront, Hometown is
                an easygoing, counter-service hall made for trays of barbecue and good company.
              </p>
            </Reveal>

            <ul className="mt-12 border-t border-ink/15">
              {notes.map((n, i) => (
                <Reveal as="li" key={n.title} delay={0.06 * i} className="flex gap-5 border-b border-ink/15 py-6">
                  <n.icon aria-hidden className="mt-1 size-5 shrink-0 text-ember" strokeWidth={1.6} />
                  <div>
                    <h3 className="display text-3xl">{n.title}</h3>
                    <p className="mt-2 text-ink/70">{n.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.1} className="mt-10">
              <ButtonLink
                href={business.officialSite}
                external
                variant="ink"
                track="official_site_click"
                trackLocation="atmosphere"
              >
                Events on the official site
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Oversized background word */}
      <p
        aria-hidden
        className="display pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[26vw] text-ink/[0.045]"
      >
        Red Hook
      </p>
    </section>
  );
}
