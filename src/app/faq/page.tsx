import Link from "next/link";
import { Plus } from "lucide-react";
import { pageMeta } from "@/lib/metadata";
import { faqs } from "@/content/guides";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ExploreGrid, PlanVisitBand } from "@/components/sections/Bands";

export const metadata = pageMeta({
  title: "FAQ",
  description:
    "Answers about Hometown Bar-B-Que in Red Hook: reservations, hours, waits, takeout, large groups, catering, ordering by weight and prices.",
  path: "/faq",
});

export default function FaqPage() {
  const all = faqs.flatMap((g) => g.items);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: all.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        crumbs={[{ label: "FAQ", href: "/faq" }]}
        eyebrow="Frequently asked"
        title="Good"
        accent="questions."
        intro={<p>Everything people ask before their first tray of Hometown barbecue.</p>}
      />

      <section aria-label="Questions" className="on-cream bg-cream text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:px-12">
          <nav aria-label="FAQ topics" className="lg:col-span-3">
            <ul className="label space-y-3 lg:sticky lg:top-28">
              {faqs.map((g, i) => (
                <li key={g.group}>
                  <a href={`#faq-${i}`} className="text-ink/70 hover:text-ember-ink">
                    0{i + 1} — {g.group}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-16 lg:col-span-8 lg:col-start-5">
            {faqs.map((g, gi) => (
              <section key={g.group} id={`faq-${gi}`} aria-labelledby={`faq-${gi}-title`} className="scroll-mt-28">
                <Reveal>
                  <h2 id={`faq-${gi}-title`} className="display text-5xl">
                    {g.group}
                  </h2>
                </Reveal>
                <div className="mt-6 border-t border-ink/15">
                  {g.items.map((f) => (
                    <details key={f.q} className="group border-b border-ink/15">
                      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-xl font-medium [&::-webkit-details-marker]:hidden">
                        {f.q}
                        <Plus
                          aria-hidden
                          className="size-5 shrink-0 text-ember-ink transition-transform duration-300 group-open:rotate-45"
                        />
                      </summary>
                      <div className="pb-6 pr-10 text-lg leading-relaxed text-ink/75">
                        <p>{f.a}</p>
                        {f.link &&
                          (f.link.href.startsWith("/") ? (
                            <Link href={f.link.href} className="label mt-3 inline-flex min-h-11 items-center text-ember-ink underline underline-offset-4">
                              {f.link.label} →
                            </Link>
                          ) : (
                            <a
                              href={f.link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="label mt-3 inline-flex min-h-11 items-center text-ember-ink underline underline-offset-4"
                            >
                              {f.link.label} ↗<span className="sr-only"> (opens in a new tab)</span>
                            </a>
                          ))}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <PlanVisitBand />
      <ExploreGrid exclude={["/faq"]} />
    </>
  );
}
