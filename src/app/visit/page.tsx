import Link from "next/link";
import { pageMeta } from "@/lib/metadata";
import { bbq101, faqs, redHook } from "@/content/guides";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Accent } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Visit } from "@/components/sections/Visit";
import { ExploreGrid } from "@/components/sections/Bands";
import { business } from "@/content/site";

export const metadata = pageMeta({
  title: "Visit Red Hook",
  description:
    "Hometown Bar-B-Que, 454 Van Brunt Street, Red Hook, Brooklyn. Hours, phone, directions, map and how counter service works.",
  path: "/visit",
});

export default function VisitPage() {
  const quick = faqs.flatMap((g) => g.items).slice(0, 3);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Visit", href: "/visit" }]}
        eyebrow="Visit · Red Hook, Brooklyn"
        title="Find the"
        accent="smoke."
        intro={
          <p>
            {business.street}, on Red Hook’s main street. Counter service, no reservations, and a hall full of barbecue.
          </p>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={business.directions} external track="directions_click" trackLocation="visit_hero">
            Get directions
          </ButtonLink>
          <ButtonLink href={`tel:${business.phoneE164}`} variant="outline" track="phone_click" trackLocation="visit_hero">
            Call {business.phoneDisplay}
          </ButtonLink>
        </div>
      </PageHero>

      <Visit index="01" />

      {/* How it works */}
      <section aria-labelledby="how-title" className="on-cream bg-cream text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
          <SectionHeading
            tone="cream"
            index="02"
            eyebrow="How it works"
            id="how-title"
            title={
              <>
                Line. Order. <Accent tone="cream">Eat.</Accent>
              </>
            }
          />
          <ol className="mt-16 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {bbq101.howTo.map((s, i) => (
              <Reveal as="li" key={s.step} delay={0.06 * i} className="bg-cream p-6 md:p-8">
                <p className="display text-6xl text-ember-ink">0{i + 1}</p>
                <h3 className="display mt-6 text-3xl">{s.step}</h3>
                <p className="mt-3 text-ink/75">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Getting here + quick answers */}
      <section aria-labelledby="getting-title" className="bg-char">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-2 lg:px-12">
          <div>
            <SectionHeading index="03" eyebrow="Getting here" id="getting-title" title="Bus, ferry, car." />
            <ul className="mt-10 border-t border-cream/15">
              {redHook.transit.map((t) => (
                <Reveal as="li" key={t.title} className="border-b border-cream/15 py-6">
                  <p className="label text-ember-bright">{t.mode}</p>
                  <h3 className="display mt-2 text-3xl">{t.title}</h3>
                  <p className="mt-2 text-cream/70">{t.body}</p>
                </Reveal>
              ))}
            </ul>
            <ButtonLink href="/red-hook" variant="outline" className="mt-8">
              Red Hook guide
            </ButtonLink>
          </div>
          <div>
            <SectionHeading index="04" eyebrow="Quick answers" title="Good to know." />
            <dl className="mt-10 border-t border-cream/15">
              {quick.map((f) => (
                <Reveal key={f.q} className="border-b border-cream/15 py-6">
                  <dt className="display text-2xl">{f.q}</dt>
                  <dd className="mt-2 text-cream/70">{f.a}</dd>
                </Reveal>
              ))}
            </dl>
            <Link href="/faq" className="label mt-8 inline-flex min-h-11 items-center text-ember-bright hover:text-cream">
              All FAQs →
            </Link>
          </div>
        </div>
      </section>

      <ExploreGrid exclude={["/visit"]} />
    </>
  );
}
