import { business } from "@/content/site";
import { img } from "@/lib/images";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

/**
 * "Our Story" — a magazine-style spread on cream. One dominant image,
 * two supporting crops, annotations in the margins.
 */
export function ArtOfThePit() {
  const ribs = img("ribs");
  const oak = img("oak");
  const sandwich = img("pulledPork");

  return (
    <section id="story" aria-labelledby="story-title" className="on-cream relative bg-cream text-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-36 lg:px-12">
        <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
          {/* Heading column */}
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal>
              <p className="label flex items-center gap-3 text-ember-ink">
                <span>01</span>
                <span aria-hidden className="h-px w-10 bg-ember" />
                <span>Our story</span>
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="story-title" className="display mt-6 text-[clamp(3.4rem,9vw,8.5rem)]">
                The art
                <br />
                of the{" "}
                <span className="font-serif text-[0.92em] font-normal normal-case italic tracking-normal text-ember">
                  pit.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.16} className="mt-10 max-w-md space-y-5 text-lg leading-relaxed text-ink/80">
              <p>
                Hometown opened on Van Brunt Street in {business.founded} — a year late, after Hurricane Sandy flooded
                the build-out — with a simple idea: barbecue cooked the old way, in the middle of Red Hook.
              </p>
              <p>
                The meat is smoked over oak using traditional Southern techniques — low heat, real wood, and
                patience. The rest is up to the fire.
              </p>
            </Reveal>
            <Reveal delay={0.22} className="mt-10">
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/story" variant="ink">
                  Read our story
                </ButtonLink>
                <ButtonLink href="/the-pit" variant="ghost">
                  How the pit works
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Image spread */}
          <div className="relative lg:col-span-7">
            <div className="grid grid-cols-6 gap-3 sm:gap-4">
              <Reveal variant="mask" className="relative col-span-6 aspect-[4/3]">
                <Photo image={ribs} sizes="(min-width: 1024px) 55vw, 100vw" />
              </Reveal>
              <div className="col-span-6 flex justify-end gap-8 border-t border-ink/15 pt-3">
                <p className="label text-right text-ink/70">Fig. 01 — Pork spare ribs</p>
              </div>
              <Reveal variant="mask" delay={0.1} className="relative col-span-3 aspect-[3/4] sm:col-span-2 sm:-mt-28 sm:ml-4 lg:-mt-40">
                <Photo image={oak} sizes="(min-width: 1024px) 18vw, 50vw" tag={false} />
              </Reveal>
              <Reveal variant="mask" delay={0.18} className="relative col-span-3 aspect-[3/4] sm:col-span-4 sm:aspect-[16/10]">
                <Photo image={sandwich} sizes="(min-width: 1024px) 36vw, 50vw" tagPosition="br" />
              </Reveal>
              <div className="col-span-6 grid grid-cols-2 gap-6 pt-2 sm:col-span-4 sm:col-start-3">
                <p className="label text-ink/70">Fig. 02 — Split oak</p>
                <p className="label text-right text-ink/70">Fig. 03 — Pulled pork sandwich</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fact strip */}
        <dl className="mt-24 grid grid-cols-2 border-t border-ink/15 md:mt-32 md:grid-cols-4">
          {[
            ["Opened", business.founded],
            ["Wood", "Oak"],
            ["Style", "Southern pit"],
            ["Neighborhood", "Red Hook"],
          ].map(([k, v], i) => (
            <Reveal
              key={k}
              delay={i * 0.06}
              className={`border-ink/15 py-6 pr-4 ${i % 2 ? "pl-4 md:pl-6" : ""} ${i > 0 ? "md:border-l md:pl-6" : ""} ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""}`}
            >
              <dt className="label text-ink/70">{k}</dt>
              <dd className="display mt-3 text-4xl md:text-5xl">{v}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
