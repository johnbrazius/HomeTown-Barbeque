import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Accent } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Process } from "@/components/sections/Process";
import { BrisketDiagram } from "@/components/sections/BrisketDiagram";
import { ExploreGrid, PlanVisitBand } from "@/components/sections/Bands";

export const metadata = pageMeta({
  title: "The Pit",
  description:
    "Inside the pit at Hometown Bar-B-Que in Red Hook: oak, fire management, low-and-slow smoke and the counter where it all ends up.",
  path: "/the-pit",
});

const principles = [
  { n: "01", title: "Real wood", body: "Oak is the fuel and the seasoning. No shortcuts around the fire." },
  { n: "02", title: "Steady fire", body: "The craft is in keeping the heat even and the smoke clean, hour after hour." },
  { n: "03", title: "Patience", body: "Tough cuts become tender on their own schedule. It takes as long as it takes." },
  { n: "04", title: "Batches", body: "Meat is ready when it’s ready — and when the day’s batch is gone, it’s gone." },
];

export default function PitPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "The Pit", href: "/the-pit" }]}
        eyebrow="The pit · Our craft"
        title="Wood. Fire."
        accent="Time."
        image="firebox"
        intro={
          <p>
            Hometown cooks over oak using traditional Southern techniques. Everything on the tray starts at the woodpile
            and spends its day with the fire.
          </p>
        }
      />

      {/* Principles */}
      <section aria-labelledby="principles-title" className="on-cream bg-cream text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
          <SectionHeading
            tone="cream"
            index="01"
            eyebrow="Principles"
            id="principles-title"
            title={
              <>
                Four rules <Accent tone="cream">of the pit.</Accent>
              </>
            }
          />
          <ul className="mt-16 grid border-t border-ink/15 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal
                as="li"
                key={p.n}
                delay={0.06 * i}
                className="border-b border-ink/15 py-10 md:px-6 md:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <p className="display text-7xl text-ember-ink">{p.n}</p>
                <h3 className="display mt-6 text-4xl">{p.title}</h3>
                <p className="mt-3 text-lg text-ink/75">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Process index="02" />

      {/* Anatomy */}
      <section aria-labelledby="anatomy-title" className="bg-char">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:items-center lg:px-12">
          <div className="lg:col-span-5">
            <SectionHeading
              index="03"
              eyebrow="Read the slice"
              id="anatomy-title"
              title={
                <>
                  What the <Accent>smoke</Accent> leaves.
                </>
              }
            />
            <Reveal delay={0.1} className="mt-8 space-y-4 text-lg leading-relaxed text-cream/70">
              <p>
                A long smoke writes its story on the meat: a dark, crusty bark outside, a pink smoke ring beneath it, and
                rendered fat that keeps every slice juicy.
              </p>
              <ButtonLink href="/barbecue-101" variant="outline">
                Barbecue 101
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7">
            <BrisketDiagram />
          </Reveal>
        </div>
      </section>

      <PlanVisitBand />
      <ExploreGrid exclude={["/the-pit"]} />
    </>
  );
}
