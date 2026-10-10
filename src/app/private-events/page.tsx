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
  title: "Private Events",
  description:
    "Semi-private and private events at Hometown Bar-B-Que in Red Hook, Brooklyn — when they’re available and how to inquire.",
  path: "/private-events",
});

export default function PrivateEventsPage() {
  const smoke = img("smoke");
  return (
    <>
      <PageHero
        crumbs={[{ label: "Private Events", href: "/private-events" }]}
        eyebrow="Private events · Red Hook"
        title="Your crew."
        accent="Our pit."
        image="smoke"
        intro={
          <p>
            Hometown doesn’t take reservations — so when you want the hall for your group, it’s an event. Semi-private and
            private events are available in Red Hook on a limited basis.
          </p>
        }
      >
        <ButtonLink href={`tel:${business.phoneE164}`} track="phone_click" trackLocation="events_hero">
          Call about an event
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="when-title" className="on-cream bg-cream text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
          <SectionHeading
            tone="cream"
            index="01"
            eyebrow="Availability"
            id="when-title"
            title={
              <>
                When events <Accent tone="cream">happen.</Accent>
              </>
            }
            intro="Because the restaurant runs first come, first served, events are scheduled around the busiest service."
          />
          <dl className="mt-16 grid border-t border-ink/15 md:grid-cols-3">
            {events.privateDays.map((d, i) => (
              <Reveal
                key={d.when}
                delay={0.06 * i}
                className="border-b border-ink/15 py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
              >
                <dt className="label text-ember-ink">{d.what}</dt>
                <dd className="display mt-4 text-4xl md:text-5xl">{d.when}</dd>
              </Reveal>
            ))}
          </dl>
          <p className="mt-10 max-w-2xl text-ink/70">
            Availability is set by the restaurant and can change — confirm dates when you inquire.
          </p>
        </div>
      </section>

      <section aria-labelledby="options-title" className="grain relative bg-ink">
        <div className="relative z-2 mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:items-center lg:px-12">
          <Reveal variant="mask" className="relative aspect-[16/11] lg:col-span-6">
            <Photo image={smoke} sizes="(min-width: 1024px) 45vw, 100vw" />
          </Reveal>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionHeading
              index="02"
              eyebrow="Options"
              id="options-title"
              title={
                <>
                  Two ways <Accent>to gather.</Accent>
                </>
              }
            />
            <div className="mt-10 grid gap-px bg-cream/15 sm:grid-cols-2">
              <Reveal className="bg-ink p-6">
                <h3 className="display text-3xl">Semi-private</h3>
                <p className="mt-2 text-cream/70">Part of the hall set aside for your group.</p>
              </Reveal>
              <Reveal delay={0.06} className="bg-ink p-6">
                <h3 className="display text-3xl">Private</h3>
                <p className="mt-2 text-cream/70">The space is yours, when the schedule allows.</p>
              </Reveal>
            </div>
            <p className="mt-8 text-cream/70">
              Too big for the hall, or want Hometown somewhere else? Off-site catering starts at {events.cateringMin}{" "}
              guests.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/catering" variant="outline">
                Catering
              </ButtonLink>
              <ButtonLink href={`tel:${business.phoneE164}`} variant="outline" track="phone_click" trackLocation="events">
                Call {business.phoneDisplay}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <ExploreGrid exclude={["/private-events"]} />
    </>
  );
}
