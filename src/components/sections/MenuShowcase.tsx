import { menu } from "@/content/menu";
import { img } from "@/lib/images";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { MenuTabs, type MenuTabData } from "./MenuTabs";

export function MenuShowcase() {
  // Resolve images on the server; the client only receives plain data.
  const data: MenuTabData[] = menu.map((c) => ({ ...c, featureImage: img(c.feature.image) }));
  const hasPrices = menu.some((c) => c.items.some((i) => i.price));

  return (
    <section id="menu" aria-labelledby="menu-title" className="grain relative bg-char">
      <div className="relative z-2 mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-36 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="label flex items-center gap-3 text-ember-bright">
                <span>02</span>
                <span aria-hidden className="h-px w-10 bg-ember" />
                <span>The menu · Red Hook</span>
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="menu-title" className="display mt-6 text-[clamp(3.4rem,9vw,8.5rem)]">
                Off the{" "}
                <span className="font-serif text-[0.92em] font-normal normal-case italic tracking-normal text-ember-bright">
                  pit.
                </span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="space-y-6 lg:col-span-5 lg:pb-3">
            <p className="max-w-md text-lg leading-relaxed text-cream/75">
              A selection from the Red Hook counter. The menu changes with the pit — ask at the counter for today’s
              lineup{hasPrices ? "." : " and current prices."}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/menu" track="menu_cta_click" trackLocation="home_menu">
                See the full menu
              </ButtonLink>
              <ButtonLink href="/barbecue-101" variant="outline">
                How ordering works
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <MenuTabs categories={data} />
      </div>
    </section>
  );
}
