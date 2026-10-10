import { Bus, Ship, Car } from "lucide-react";
import { pageMeta } from "@/lib/metadata";
import { redHook } from "@/content/guides";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Accent } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MapFacade } from "@/components/sections/MapFacade";
import { ExploreGrid, PlanVisitBand } from "@/components/sections/Bands";

export const metadata = pageMeta({
  title: "Getting to Red Hook",
  description:
    "How to get to Hometown Bar-B-Que in Red Hook, Brooklyn by B61 bus, NYC Ferry or car — and what to see in the neighborhood while you’re here.",
  path: "/red-hook",
});

const icons = { Bus, Ferry: Ship, Car };

export default function RedHookPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Getting to Red Hook", href: "/red-hook" }]}
        eyebrow="Neighborhood guide"
        title="Out on"
        accent="the Hook."
        intro={
          <>
            {redHook.intro.map((p) => (
              <p key={p.slice(0, 16)} className="mb-4 last:mb-0">
                {p}
              </p>
            ))}
          </>
        }
      />

      <section aria-labelledby="transit-title" className="on-cream bg-cream text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
          <SectionHeading
            tone="cream"
            index="01"
            eyebrow="Getting here"
            id="transit-title"
            title={
              <>
                No subway? <Accent tone="cream">No problem.</Accent>
              </>
            }
            intro="Red Hook isn’t on a subway line, which is part of its charm. Here’s how most people get here."
          />
          <ul className="mt-16 grid gap-px bg-ink/15 md:grid-cols-3">
            {redHook.transit.map((t, i) => {
              const Icon = icons[t.mode as keyof typeof icons];
              return (
                <Reveal as="li" key={t.title} delay={0.06 * i} className="flex flex-col justify-between gap-10 bg-cream p-6 md:p-8">
                  <div>
                    <Icon aria-hidden className="size-7 text-ember-ink" strokeWidth={1.5} />
                    <p className="label mt-8 text-ink/70">{t.mode}</p>
                    <h3 className="display mt-2 text-5xl">{t.title}</h3>
                    <p className="mt-4 text-lg text-ink/80">{t.body}</p>
                  </div>
                  <ButtonLink href={t.href} external variant="ghost" track={t.mode === "Car" ? "directions_click" : undefined} trackLocation="red_hook">
                    {t.cta}
                  </ButtonLink>
                </Reveal>
              );
            })}
          </ul>
          <p className="mt-8 text-ink/70">Routes and schedules change — check MTA and NYC Ferry before you travel.</p>
        </div>
      </section>

      <section aria-labelledby="nearby-title" className="bg-char">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-6">
            <SectionHeading
              index="02"
              eyebrow="Before or after"
              id="nearby-title"
              title={
                <>
                  Make a day <Accent>of it.</Accent>
                </>
              }
            />
            <ol className="mt-10 border-t border-cream/15">
              {redHook.nearby.map((n, i) => (
                <Reveal as="li" key={n.name} delay={0.05 * i} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-cream/15 py-6">
                  <span className="display text-3xl text-ember-bright">0{i + 1}</span>
                  <div>
                    <h3 className="display text-3xl">{n.name}</h3>
                    <p className="mt-2 text-cream/70">{n.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal variant="mask" className="min-h-[420px] lg:col-span-5 lg:col-start-8">
            <MapFacade />
          </Reveal>
        </div>
      </section>

      <PlanVisitBand />
      <ExploreGrid exclude={["/red-hook"]} />
    </>
  );
}
