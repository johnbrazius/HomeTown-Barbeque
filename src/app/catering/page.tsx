import { pageMeta } from "@/lib/metadata";
import { business } from "@/content/site";
import { events } from "@/content/guides";
import { img } from "@/lib/images";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Accent } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ExploreGrid } from "@/components/sections/Bands";

export const metadata = pageMeta({
  title: "Catering",
  description:
    "Off-site barbecue catering from Hometown Bar-B-Que for groups of 45 or more, with menus and staffing tailored to your event.",
  path: "/catering",
});

const steps = [
  { title: "Reach out", body: "Send an inquiry through the official catering page or call the restaurant." },
  { title: "Build the menu", body: "Work with the team to choose the meats, sides and extras for your crowd." },
  { title: "Pick the service", body: "Staffing is planned around the type of service you want for the day." },
  { title: "Eat", body: "Hometown barbecue, wherever your people are." },
];

const checklist = [
  "Event date and start time",
  "Expected headcount (45 guests or more)",
  "Event location and access details",
  "Style of service you have in mind",
  "Any dietary needs in the group",
];

export default function CateringPage() {
  const sides = img("sides");
  const ribs = img("ribs");
  return (
    <>
      <PageHero
        crumbs={[{ label: "Catering", href: "/catering" }]}
        eyebrow="Catering"
        title="Bring the"
        accent="pit."
        image="ribs"
        intro={
          <p>
            Hometown caters off-site for groups of {events.cateringMin} or more — with a menu built around your event and
            staff matched to the kind of service you want.
          </p>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={events.officialEvents} external track="official_site_click" trackLocation="catering_hero">
            Catering inquiry
          </ButtonLink>
          <ButtonLink href={`tel:${business.phoneE164}`} variant="outline" track="phone_click" trackLocation="catering_hero">
            Call {business.phoneDisplay}
          </ButtonLink>
        </div>
      </PageHero>

      <section aria-labelledby="min-title" className="on-cream bg-cream text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:items-center lg:px-12">
          <Reveal className="lg:col-span-5">
            <p className="label text-ember-ink">Minimum group</p>
            <p id="min-title" className="display mt-4 text-[clamp(8rem,22vw,16rem)] leading-[0.8] text-ink">
              {events.cateringMin}+
            </p>
            <p className="display mt-4 text-4xl">guests</p>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading
              tone="cream"
              index="01"
              eyebrow="How it works"
              title={
                <>
                  Four steps <Accent tone="cream">to a feast.</Accent>
                </>
              }
            />
            <ol className="mt-10 border-t border-ink/15">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={0.05 * i} className="flex gap-6 border-b border-ink/15 py-6">
                  <span className="display text-4xl text-ember-ink">0{i + 1}</span>
                  <div>
                    <h3 className="display text-3xl">{s.title}</h3>
                    <p className="mt-1 text-ink/75">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="checklist-title" className="grain relative bg-ink">
        <div className="relative z-2 mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:px-12">
          <div className="grid grid-cols-2 gap-3 lg:col-span-5">
            <Reveal variant="mask" className="relative col-span-2 aspect-[16/10]">
              <Photo image={sides} sizes="(min-width: 1024px) 40vw, 100vw" />
            </Reveal>
            <Reveal variant="mask" delay={0.1} className="relative aspect-square">
              <Photo image={ribs} sizes="(min-width: 1024px) 20vw, 50vw" tag={false} />
            </Reveal>
            <div className="flex items-end border border-cream/15 p-5">
              <p className="label text-cream/70">Menus are planned with the Hometown team for each event.</p>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading
              index="02"
              eyebrow="Before you inquire"
              id="checklist-title"
              title={
                <>
                  Have these <Accent>ready.</Accent>
                </>
              }
            />
            <ul className="mt-10 border-t border-cream/15">
              {checklist.map((c, i) => (
                <Reveal as="li" key={c} delay={0.04 * i} className="flex items-center gap-4 border-b border-cream/15 py-5 text-lg">
                  <span aria-hidden className="size-2 shrink-0 bg-ember" />
                  {c}
                </Reveal>
              ))}
            </ul>
            <p className="mt-8 text-cream/60">
              Inquiries are handled by the restaurant through its official catering page — this site doesn’t collect or
              send any booking information.
            </p>
            <ButtonLink href={events.officialEvents} external className="mt-6" track="official_site_click" trackLocation="catering_checklist">
              Go to the catering page
            </ButtonLink>
          </div>
        </div>
      </section>

      <ExploreGrid exclude={["/catering"]} />
    </>
  );
}
