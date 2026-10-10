import { Music, Beer, Users } from "lucide-react";
import { pageMeta } from "@/lib/metadata";
import { business } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Accent } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ExploreGrid, PlanVisitBand } from "@/components/sections/Bands";

export const metadata = pageMeta({
  title: "Live Music",
  description:
    "Live music on weekend nights at Hometown Bar-B-Que in Red Hook, Brooklyn — barbecue, drinks from the bar and a band in the hall.",
  path: "/live-music",
});

const nights = [
  { icon: Music, title: "Bands on weekend nights", body: "Live music fills the hall on weekend nights — the soundtrack to the line and the meal." },
  { icon: Beer, title: "Drinks from the bar", body: "Order a drink while you wait in line, then take it to the table with your tray." },
  { icon: Users, title: "Neighbors by dessert", body: "Strangers in line become friends over a tray of barbecue. That’s the point." },
];

export default function LiveMusicPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Live Music", href: "/live-music" }]}
        eyebrow="Live music · Red Hook"
        title="Smoke &"
        accent="sound."
        intro={<p>Barbecue tastes better with a band. On weekend nights, Hometown’s hall turns up the volume.</p>}
      >
        <ButtonLink href={`tel:${business.phoneE164}`} variant="outline" track="phone_click" trackLocation="music_hero">
          Call to ask who’s playing
        </ButtonLink>
      </PageHero>

      {/* Equalizer-style visual + nights */}
      <section aria-labelledby="nights-title" className="grain relative bg-ember-deep">
        <div className="relative z-2 mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
          <div aria-hidden className="mb-16 flex h-32 items-end gap-1.5 md:h-48">
            {Array.from({ length: 48 }).map((_, i) => (
              <span
                key={i}
                className="eq-bar flex-1 bg-cream/80"
                style={{
                  height: `${25 + Math.abs(Math.sin(i * 1.7)) * 75}%`,
                  animationDelay: `${(i % 7) * 0.12}s`,
                }}
              />
            ))}
          </div>
          <SectionHeading
            index="01"
            eyebrow="Weekend nights"
            id="nights-title"
            title={
              <>
                Turn it <Accent>up.</Accent>
              </>
            }
          />
          <ul className="mt-14 grid gap-px bg-cream/20 md:grid-cols-3">
            {nights.map((n, i) => (
              <Reveal as="li" key={n.title} delay={0.06 * i} className="bg-ember-deep p-6 md:p-8">
                <n.icon aria-hidden className="size-6 text-cream" strokeWidth={1.5} />
                <h3 className="display mt-8 text-3xl">{n.title}</h3>
                <p className="mt-3 text-cream/85">{n.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* History */}
      <section aria-labelledby="history-title" className="on-cream bg-cream text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-6">
            <SectionHeading
              tone="cream"
              index="02"
              eyebrow="From the beginning"
              id="history-title"
              title={
                <>
                  Bluegrass, blues <Accent tone="cream">& honky-tonk.</Accent>
                </>
              }
            />
          </div>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-ink/80 lg:col-span-5 lg:col-start-8 lg:pt-16">
            <p>
              When Hometown was being built in 2013, the plans included a room set up for weekend shows — bluegrass,
              honky-tonk and blues to go with the barbecue.
            </p>
            <p>
              Line-ups change week to week — call the restaurant to ask who’s playing.
            </p>
            <p>
              <a
                href="https://www.dnainfo.com/new-york/20130729/red-hook/hometown-smoke-up-brooklyn-style-barbecue-red-hook/"
                target="_blank"
                rel="noopener noreferrer"
                className="label text-ember-ink underline underline-offset-4"
              >
                Source: DNAinfo, 2013<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <PlanVisitBand />
      <ExploreGrid exclude={["/live-music"]} />
    </>
  );
}
