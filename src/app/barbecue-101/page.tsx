import { pageMeta } from "@/lib/metadata";
import { bbq101 } from "@/content/guides";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Accent } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BrisketDiagram } from "@/components/sections/BrisketDiagram";
import { ExploreGrid, PlanVisitBand } from "@/components/sections/Bands";

export const metadata = pageMeta({
  title: "Barbecue 101",
  description:
    "A first-timer’s guide to ordering barbecue by weight at Hometown Bar-B-Que, how much to order, and what bark, smoke ring, point and flat mean.",
  path: "/barbecue-101",
});

export default function Bbq101Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Barbecue 101", href: "/barbecue-101" }]}
        eyebrow="A first-timer’s guide"
        title="Barbecue"
        accent="101."
        image="heroTall"
        intro={
          <p>
            New to ordering barbecue by the pound? Here’s how the counter works, how much to get, and the words you’ll
            hear along the way.
          </p>
        }
      />

      {/* Steps */}
      <section aria-labelledby="steps-title" className="on-cream bg-cream text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
          <SectionHeading
            tone="cream"
            index="01"
            eyebrow="At the counter"
            id="steps-title"
            title={
              <>
                How to <Accent tone="cream">order.</Accent>
              </>
            }
          />
          <ol className="mt-16 grid border-t border-ink/15 md:grid-cols-2 lg:grid-cols-4">
            {bbq101.howTo.map((s, i) => (
              <Reveal
                as="li"
                key={s.step}
                delay={0.06 * i}
                className="border-b border-ink/15 py-10 md:px-6 md:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <p className="display text-7xl text-ember-ink">0{i + 1}</p>
                <h3 className="display mt-6 text-3xl">{s.step}</h3>
                <p className="mt-3 text-lg text-ink/75">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Rule of thumb */}
      <section aria-labelledby="rule-title" className="grain relative bg-ember-deep">
        <div className="relative z-2 mx-auto grid max-w-[1440px] gap-10 px-5 py-24 sm:px-8 md:py-28 lg:grid-cols-12 lg:items-center lg:px-12">
          <Reveal className="lg:col-span-5">
            <p className="display text-[clamp(7rem,20vw,15rem)] leading-[0.8]">½ lb</p>
            <p className="label mt-4 text-cream/80">per adult · a common rule of thumb</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <h2 id="rule-title" className="display text-5xl md:text-6xl">
              {bbq101.rule.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/90">{bbq101.rule.body}</p>
          </Reveal>
        </div>
      </section>

      {/* Glossary + diagram */}
      <section aria-labelledby="glossary-title" className="bg-char">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-6">
            <SectionHeading
              index="02"
              eyebrow="Glossary"
              id="glossary-title"
              title={
                <>
                  Talk like a <Accent>pitmaster.</Accent>
                </>
              }
            />
            <dl className="mt-12 border-t border-cream/15">
              {bbq101.glossary.map((g, i) => (
                <Reveal key={g.term} delay={Math.min(i, 5) * 0.04} className="grid gap-2 border-b border-cream/15 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
                  <dt className="display text-3xl text-ember-bright">{g.term}</dt>
                  <dd className="text-lg text-cream/75">{g.def}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <BrisketDiagram />
              </Reveal>
              <ButtonLink href="/menu" className="mt-10">
                Now see the menu
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <PlanVisitBand />
      <ExploreGrid exclude={["/barbecue-101"]} />
    </>
  );
}
