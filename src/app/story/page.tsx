import { pageMeta } from "@/lib/metadata";
import { img } from "@/lib/images";
import { timeline, pitmaster } from "@/content/story";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Accent } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ExploreGrid, PlanVisitBand, RecognitionBand } from "@/components/sections/Bands";

export const metadata = pageMeta({
  title: "Our Story",
  description:
    "How Hometown Bar-B-Que came to Red Hook: a lease signed in 2012, Hurricane Sandy, cooking for the neighbors, opening in 2013 and a MICHELIN Bib Gourmand.",
  path: "/story",
});

const flavors = [
  { dish: "Korean Sticky Ribs", from: "Seoul by way of Brooklyn", note: "Korean barbecue sauce, cashews, fried shallots" },
  { dish: "Jerk Rib Tips", from: "Caribbean Brooklyn", note: "Jerk spice meets the pit" },
  { dish: "Vietnamese Hot Wings", from: "Southeast Asia", note: "Sesame, scallion, cilantro ranch" },
  { dish: "Lamb Banh Mi", from: "Saigon street food", note: "Pickled daikon and carrot on a baguette" },
];

export default function StoryPage() {
  const oak = img("oak");
  const firebox = img("firebox");

  return (
    <>
      <PageHero
        crumbs={[{ label: "Our Story", href: "/story" }]}
        eyebrow="Our story"
        title="Built after"
        accent="the storm."
        image="smoke"
        intro={
          <p>
            Hometown was supposed to open in 2012. Then Hurricane Sandy came through Red Hook. What happened next shaped
            the restaurant — and its place in the neighborhood.
          </p>
        }
      />

      {/* Timeline */}
      <section aria-labelledby="timeline-title" className="on-cream bg-cream text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
          <SectionHeading
            tone="cream"
            index="01"
            eyebrow="Timeline"
            id="timeline-title"
            title={
              <>
                From the flood <Accent tone="cream">to the guide.</Accent>
              </>
            }
          />
          <ol className="mt-16 border-t border-ink/15 md:mt-20">
            {timeline.map((t, i) => (
              <Reveal
                as="li"
                key={t.title}
                delay={0.04 * i}
                className="grid gap-4 border-b border-ink/15 py-10 md:grid-cols-12 md:gap-10 md:py-14"
              >
                <p className="display text-6xl text-ember-ink md:col-span-3 md:text-7xl">{t.year}</p>
                <div className="md:col-span-6">
                  <h3 className="display text-4xl md:text-5xl">{t.title}</h3>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/75">{t.body}</p>
                </div>
                {t.source && (
                  <p className="md:col-span-3 md:text-right">
                    <a
                      href={t.source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label text-ink/70 underline decoration-ink/30 underline-offset-4 hover:text-ember-ink"
                    >
                      Source: {t.source.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </p>
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Pitmaster */}
      <section aria-labelledby="pitmaster-title" className="grain relative bg-ink">
        <div className="relative z-2 mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:gap-10 lg:px-12">
          <div className="relative lg:col-span-5">
            <Reveal variant="mask" className="relative aspect-[3/4] w-[85%]">
              <Photo image={oak} sizes="(min-width: 1024px) 34vw, 85vw" />
            </Reveal>
            <Reveal variant="mask" delay={0.15} className="relative -mt-[30%] ml-auto aspect-[16/10] w-[62%] border-8 border-ink">
              <Photo image={firebox} sizes="(min-width: 1024px) 25vw, 62vw" tagPosition="tr" />
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
            <SectionHeading
              index="02"
              eyebrow={pitmaster.role}
              id="pitmaster-title"
              title={
                <>
                  {pitmaster.name.split(" ")[0]}
                  <br />
                  <Accent>{pitmaster.name.split(" ")[1]}.</Accent>
                </>
              }
            />
            <Reveal delay={0.1} className="mt-10 space-y-5 text-lg leading-relaxed text-cream/75">
              {pitmaster.paragraphs.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
              <p>
                <a
                  href={pitmaster.source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label text-ember-bright underline underline-offset-4"
                >
                  Read the {pitmaster.source.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Brooklyn flavors */}
      <section aria-labelledby="flavors-title" className="bg-char">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
          <SectionHeading
            index="03"
            eyebrow="Brooklyn barbecue"
            id="flavors-title"
            title={
              <>
                Texas roots.
                <br />
                <Accent>Brooklyn</Accent> accent.
              </>
            }
            intro="The pit speaks Texas. The menu speaks Brooklyn — a city where barbecue sits comfortably next to flavors from everywhere."
          />
          <ul className="mt-16 grid gap-px bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
            {flavors.map((f, i) => (
              <Reveal as="li" key={f.dish} delay={0.06 * i} className="flex min-h-64 flex-col justify-between bg-char p-6 md:p-8">
                <p className="label text-ember-bright">{f.from}</p>
                <div>
                  <h3 className="display mt-10 text-4xl">{f.dish}</h3>
                  <p className="mt-3 text-cream/65">{f.note}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-10">
            <ButtonLink href="/menu" variant="outline">
              See the full menu
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <RecognitionBand />
      <PlanVisitBand />
      <ExploreGrid exclude={["/story"]} />
    </>
  );
}
