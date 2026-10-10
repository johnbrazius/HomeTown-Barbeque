import { ArrowUpRight } from "lucide-react";
import { pageMeta } from "@/lib/metadata";
import { press } from "@/content/story";
import { business } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Accent } from "@/components/ui/SectionHeading";
import { ExploreGrid, RecognitionBand } from "@/components/sections/Bands";

export const metadata = pageMeta({
  title: "Press & Recognition",
  description:
    "Press coverage and recognition for Hometown Bar-B-Que in Red Hook, including the MICHELIN Guide Bib Gourmand, Texas Monthly, The Infatuation and Time Out.",
  path: "/press",
});

export default function PressPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Press & Recognition", href: "/press" }]}
        eyebrow="Press & recognition"
        title="In the"
        accent="papers."
        intro={
          <p>
            More than a decade of barbecue in Red Hook has drawn the attention of guides, critics and barbecue writers. Read them
            in their own words.
          </p>
        }
      />

      <RecognitionBand />

      <section aria-labelledby="coverage-title" className="bg-char">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
          <SectionHeading
            index="01"
            eyebrow="Coverage"
            id="coverage-title"
            title={
              <>
                Selected <Accent>press.</Accent>
              </>
            }
            intro="Links open the original articles. Headlines are the publishers’ own."
          />
          <ul className="mt-16 border-t border-cream/15">
            {press.map((p, i) => (
              <Reveal as="li" key={p.href} delay={Math.min(i, 5) * 0.04} className="border-b border-cream/15">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-3 py-7 md:grid-cols-12 md:items-baseline md:gap-8"
                >
                  <span className="label text-ember-bright md:col-span-3">{p.outlet}</span>
                  <span className="display text-3xl transition-colors group-hover:text-ember-bright md:col-span-6 md:text-4xl">
                    {p.title}
                  </span>
                  <span className="label flex items-center justify-between gap-4 text-cream/60 md:col-span-3 md:justify-end">
                    {p.kind}
                    {p.year ? ` · ${p.year}` : ""}
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="media-title" className="on-cream bg-cream text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-20 sm:px-8 md:grid-cols-2 lg:px-12">
          <h2 id="media-title" className="display text-5xl">
            Media inquiries
          </h2>
          <div className="space-y-4 text-lg text-ink/80">
            <p>For interviews, photography and press requests, call the restaurant.</p>
            <a
              href={`tel:${business.phoneE164}`}
              data-track="phone_click"
              data-track-location="press"
              className="label inline-flex min-h-11 items-center text-ember-ink underline underline-offset-4"
            >
              Call {business.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <ExploreGrid exclude={["/press"]} />
    </>
  );
}
