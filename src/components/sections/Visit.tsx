import { Phone, Clock } from "lucide-react";
import { business, hours, serviceModel } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { MapFacade } from "./MapFacade";

const dayLabel: Record<string, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

function to12h(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hh = h % 12 || 12;
  return m ? `${hh}:${String(m).padStart(2, "0")}${suffix}` : `${hh}${suffix}`;
}

export function Visit({ index = "05" }: { index?: string }) {
  const showSchedule = hours.verified && hours.schedule.length > 0;

  return (
    <section id="visit" aria-labelledby="visit-title" className="relative bg-bark">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-36 lg:px-12">
        <Reveal>
          <p className="label flex items-center gap-3 text-ember-glow">
            <span>{index}</span>
            <span aria-hidden className="h-px w-10 bg-ember" />
            <span>Visit · Red Hook</span>
          </p>
        </Reveal>

        <div className="mt-6 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal delay={0.06}>
              <h2 id="visit-title" className="display text-[clamp(3.2rem,8vw,7.5rem)]">
                Come hungry.
              </h2>
            </Reveal>

            <Reveal delay={0.12} className="mt-10">
              <address className="not-italic">
                <p className="label text-cream/55">{business.name}</p>
                <p className="display mt-3 text-4xl leading-[0.95] md:text-5xl">
                  {business.street}
                  <br />
                  {business.locality}, {business.region} {business.postalCode}
                </p>
                <a
                  href={`tel:${business.phoneE164}`}
                  data-track="phone_click"
                  data-track-location="visit"
                  className="mt-5 inline-flex min-h-11 items-center gap-3 text-2xl text-cream underline decoration-ember decoration-2 underline-offset-[6px] transition-colors hover:text-ember-glow"
                >
                  <Phone aria-hidden className="size-5 text-ember-glow" />
                  {business.phoneDisplay}
                </a>
              </address>
            </Reveal>

            <Reveal delay={0.16} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink
                href={business.directions}
                external
                track="directions_click"
                trackLocation="visit"
              >
                Get directions
              </ButtonLink>
              <ButtonLink
                href={`tel:${business.phoneE164}`}
                variant="outline"
                track="phone_click"
                trackLocation="visit_button"
                aria-label={`Call ${business.name} at ${business.phoneDisplay}`}
              >
                Call the restaurant
              </ButtonLink>
            </Reveal>

            {/* Hours */}
            <Reveal delay={0.2} className="mt-14 border border-cream/15 p-6 md:p-8">
              <div className="flex items-center gap-3">
                <Clock aria-hidden className="size-4 text-ember-glow" />
                <h3 className="label text-cream">Hours</h3>
              </div>
              {showSchedule ? (
                <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-8 gap-y-2">
                  {hours.schedule.map((d) => (
                    <div key={d.day} className="contents">
                      <dt className="label text-cream/60">{dayLabel[d.day]}</dt>
                      <dd className="text-cream">
                        {d.opens && d.closes ? `${to12h(d.opens)} – ${to12h(d.closes)}` : "Closed"}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <dl className="mt-5 divide-y divide-cream/10">
                  {hours.summary.map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-6 py-3">
                      <dt className="label text-cream/60">{row.label}</dt>
                      <dd className="display text-2xl text-cream">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <p className="mt-4 text-sm leading-relaxed text-cream/60">{hours.note}</p>
              <p className="label mt-3 text-[0.65rem] text-cream/60">
                Last reviewed{" "}
                {new Date(`${hours.reviewed}T12:00:00`).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <a
                href={`tel:${business.phoneE164}`}
                data-track="phone_click"
                data-track-location="hours"
                className="label mt-5 inline-flex min-h-11 items-center gap-2 text-ember-glow hover:text-cream"
              >
                <Phone aria-hidden className="size-3.5" />
                Call to confirm today’s hours
              </a>
            </Reveal>
          </div>

          <div className="flex flex-col gap-10 lg:col-span-6">
            <Reveal variant="mask" className="md:flex-1">
              <MapFacade />
            </Reveal>

            <ul className="grid gap-px bg-cream/10 sm:grid-cols-3">
              {serviceModel.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.06} className="bg-bark p-5 sm:pr-6">
                  <h3 className="display text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">{s.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
