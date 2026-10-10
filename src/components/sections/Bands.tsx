import Link from "next/link";
import { ArrowRight, ArrowUpRight, Award } from "lucide-react";
import { business, hours, navGroups } from "@/content/site";
import { recognition } from "@/content/story";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";

/** Closing call-to-action used at the bottom of most pages. */
export function PlanVisitBand() {
  return (
    <section aria-labelledby="plan-title" className="relative overflow-hidden bg-ember-deep text-cream">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-12 lg:items-end lg:px-12">
        <Reveal className="lg:col-span-7">
          <p className="label text-cream/80">Plan your visit</p>
          <h2 id="plan-title" className="display mt-5 text-[clamp(3rem,8vw,7rem)]">
            The pit’s lit.
            <br />
            Come hungry.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5">
          <p className="display text-4xl leading-tight">{business.street}, Red Hook</p>
          <ul className="mt-3 space-y-1 text-cream/85">
            {hours.summary.map((h) => (
              <li key={h.label}>
                <span className="label mr-3 text-cream/70">{h.label}</span>
                {h.value}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={business.directions} external variant="ink" track="directions_click" trackLocation="plan_band">
              Get directions
            </ButtonLink>
            <a
              href={`tel:${business.phoneE164}`}
              data-track="phone_click"
              data-track-location="plan_band"
              className="label inline-flex min-h-12 items-center justify-between gap-4 border border-cream/50 px-5 py-3.5 transition-colors hover:bg-cream hover:text-ink"
            >
              Call {business.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Grid of links to other pages, excluding the current one. */
export function ExploreGrid({ exclude = [], title = "Keep exploring" }: { exclude?: string[]; title?: string }) {
  const items = navGroups.flatMap((g) => g.items).filter((i) => !exclude.includes(i.href));
  const unique = items.filter((i, idx) => items.findIndex((x) => x.href === i.href) === idx).slice(0, 6);
  return (
    <section aria-labelledby="explore-title" className="bg-char">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <Reveal>
          <h2 id="explore-title" className="label text-ember-bright">
            {title}
          </h2>
        </Reveal>
        <ul className="mt-8 grid border-t border-cream/15 sm:grid-cols-2 lg:grid-cols-3">
          {unique.map((item, i) => (
            <Reveal
              as="li"
              key={item.href}
              delay={(i % 3) * 0.06}
              className="border-b border-cream/15 sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <Link href={item.href} className="group flex h-full flex-col justify-between gap-6 p-6 md:p-8">
                <span className="display text-4xl transition-colors group-hover:text-ember-bright">{item.label}</span>
                <span className="flex items-end justify-between gap-6 text-cream/65">
                  <span>{item.blurb}</span>
                  <ArrowRight
                    aria-hidden
                    className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Michelin Bib Gourmand strip — the one award we can verify. */
export function RecognitionBand({ tone = "cream" }: { tone?: "cream" | "dark" }) {
  const cream = tone === "cream";
  return (
    <section
      aria-label="Recognition"
      className={`${cream ? "on-cream bg-cream text-ink" : "bg-ink text-cream"} border-y ${cream ? "border-ink/10" : "border-cream/10"}`}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <div className="flex items-center gap-5">
          <span
            className={`flex size-14 shrink-0 items-center justify-center rounded-full border ${cream ? "border-ink/20 text-ember-ink" : "border-cream/20 text-ember-bright"}`}
          >
            <Award aria-hidden className="size-6" strokeWidth={1.5} />
          </span>
          <div>
            <p className="display text-3xl md:text-4xl">{recognition.label}</p>
            <p className={cream ? "text-ink/70" : "text-cream/70"}>{recognition.body}</p>
          </div>
        </div>
        <a
          href={recognition.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`label inline-flex items-center gap-2 ${cream ? "text-ember-ink" : "text-ember-bright"} hover:underline`}
        >
          View on the MICHELIN Guide <ArrowUpRight aria-hidden className="size-3.5" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </section>
  );
}
