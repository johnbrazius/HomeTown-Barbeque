import { business } from "@/content/site";
import { menu } from "@/content/menu";
import { img } from "@/lib/images";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ExploreGrid, PlanVisitBand } from "@/components/sections/Bands";

export const metadata = pageMeta({
  title: "Menu",
  description:
    "The Red Hook barbecue menu: oak-smoked brisket, beef rib, Korean sticky ribs, jerk rib tips, Vietnamese hot wings, sandwiches, sides and banana cream pudding.",
  path: "/menu",
});

export default function MenuPage() {
  const hasPrices = menu.some((c) => c.items.some((i) => i.price));
  return (
    <>
      <PageHero
        crumbs={[{ label: "Menu", href: "/menu" }]}
        eyebrow="Red Hook menu"
        title="Off the"
        accent="pit."
        image="heroWide"
        intro={
          <p>
            Texas-rooted barbecue with Brooklyn in it. Meats are smoked over oak and sold by weight at the counter,
            alongside ribs, sandwiches, sides and dessert.
          </p>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={business.officialMenu} external track="official_menu_click" trackLocation="menu_page_hero">
            Official menu &amp; prices
          </ButtonLink>
          <ButtonLink href="/barbecue-101" variant="outline">
            How ordering works
          </ButtonLink>
        </div>
      </PageHero>

      {/* Category jump links */}
      <nav aria-label="Menu categories" className="sticky top-18 z-30 border-y border-cream/10 bg-char/95 backdrop-blur-md">
        <ul className="mx-auto flex max-w-[1440px] gap-1 overflow-x-auto px-5 [scrollbar-width:none] sm:px-8 lg:px-12">
          {menu.map((c, i) => (
            <li key={c.id} className="shrink-0">
              <a
                href={`#${c.id}`}
                className="label flex min-h-13 items-center gap-2 px-3 text-cream/70 transition-colors hover:text-cream first:pl-0"
              >
                <span className="text-ember-bright/80">0{i + 1}</span>
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-char">
        {menu.map((c, ci) => {
          const feature = img(c.feature.image);
          const flip = ci % 2 === 1;
          return (
            <section
              key={c.id}
              id={c.id}
              aria-labelledby={`${c.id}-title`}
              className="scroll-mt-36 border-b border-cream/10"
            >
              <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 sm:px-8 md:grid-cols-12 md:gap-12 md:py-28 lg:px-12">
                <Reveal
                  variant="mask"
                  className={`relative aspect-[4/5] md:col-span-5 md:aspect-auto md:min-h-[520px] ${flip ? "md:order-2 md:col-start-8" : ""}`}
                >
                  <Photo image={feature} sizes="(min-width: 768px) 40vw, 100vw" tagPosition="tr" />
                  <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p className="label text-ember-bright">Feature</p>
                    <p className="display mt-2 text-5xl">{c.feature.title}</p>
                    <p className="mt-2 max-w-xs text-cream/80">{c.feature.caption}</p>
                  </div>
                </Reveal>

                <div className={`md:col-span-7 ${flip ? "md:order-1 md:col-start-1 md:pr-4 lg:pr-10" : "md:pl-4 lg:pl-10"}`}>
                  <Reveal>
                    <p className="label text-ember-bright">0{ci + 1}</p>
                    <h2 id={`${c.id}-title`} className="display mt-3 text-[clamp(3rem,7vw,5.5rem)]">
                      {c.label}
                    </h2>
                    <p className="mt-4 max-w-md text-lg text-cream/70">{c.intro}</p>
                  </Reveal>
                  <ul className="mt-8 border-t border-cream/15">
                    {c.items.map((item, i) => (
                      <Reveal
                        as="li"
                        key={item.name}
                        delay={Math.min(i, 6) * 0.04}
                        className="group flex items-baseline gap-4 border-b border-cream/10 py-5"
                      >
                        <div className="min-w-0">
                          <h3 className="text-xl font-medium text-cream transition-colors group-hover:text-ember-bright md:text-2xl">
                            {item.name}
                          </h3>
                          {item.note && <p className="mt-1 text-cream/60">{item.note}</p>}
                        </div>
                        <span aria-hidden className="mb-1.5 flex-1 border-b border-dotted border-cream/20" />
                        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                          {item.tags?.map((t) => (
                            <span key={t} className="label border border-cream/20 px-2 py-1 text-[0.6rem] text-cream/70">
                              {t}
                            </span>
                          ))}
                          {item.price && <span className="label text-base text-cream">{item.price}</span>}
                        </div>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          );
        })}

        <section aria-label="Menu notes" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
          <div className="grid gap-6 border border-cream/15 p-6 md:grid-cols-3 md:p-10">
            <p className="display text-3xl md:col-span-1">A note on the menu</p>
            <div className="space-y-3 text-cream/70 md:col-span-2">
              <p>
                Barbecue is cooked in batches and the lineup changes with the pit. Items can sell out, and specials come and
                go.{" "}
                {!hasPrices && "Prices aren’t listed here because they change — the official Red Hook menu has today’s pricing."}
              </p>
              <p>“Popular” tags reflect public listings, not a house ranking.</p>
              <a
                href={business.officialMenu}
                target="_blank"
                rel="noopener noreferrer"
                data-track="official_menu_click"
                data-track-location="menu_notes"
                className="label inline-flex min-h-11 items-center text-ember-bright hover:text-cream"
              >
                View the official menu ↗<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      <PlanVisitBand />
      <ExploreGrid exclude={["/menu"]} />
    </>
  );
}
