import { img } from "@/lib/images";
import type { ImageKey } from "@/content/images";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProcessStages, type Stage } from "./ProcessStages";

/**
 * The pit, in four stages. Copy deliberately avoids temperatures, cook times
 * or sourcing claims — add them only from the restaurant's own words.
 */
const stages: { key: ImageKey; title: string; body: string }[] = [
  {
    key: "oak",
    title: "The wood",
    body: "Everything starts with oak. It is both the heat and the seasoning — the flavor you taste begins at the woodpile.",
  },
  {
    key: "firebox",
    title: "The pit",
    body: "A wood-fired pit is a living thing. The craft is in managing the fire: steady heat, clean smoke, constant attention.",
  },
  {
    key: "smoke",
    title: "The smoke",
    body: "Low and slow, following traditional Southern technique. It takes as long as it takes, and you can’t rush it.",
  },
  {
    key: "heroTall",
    title: "The counter",
    body: "From the pit to the block to your tray. First come, first served — until the day’s barbecue is gone.",
  },
];

export function Process({ link = false, index = "03" }: { link?: boolean; index?: string }) {
  const data: Stage[] = stages.map((s) => ({ ...s, image: img(s.key) }));
  return (
    <section id="pit" aria-labelledby="pit-title" className="grain relative bg-ink">
      <div className="relative z-2 mx-auto max-w-[1440px] px-5 pt-24 sm:px-8 md:pt-36 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="label flex items-center gap-3 text-ember-bright">
              <span>{index}</span>
              <span aria-hidden className="h-px w-10 bg-ember" />
              <span>The pit · Our craft</span>
            </p>
            <h2 id="pit-title" className="display mt-6 text-[clamp(3.4rem,9vw,8.5rem)]">
              Wood. Fire.
              <br />
              <span className="text-smoke">Time.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end lg:col-span-4 lg:col-start-9">
            <p className="max-w-md text-lg leading-relaxed text-cream/70">
              There’s no secret to barbecue, only patience. Here’s how the day moves through the pit.
            </p>
            {link && (
              <ButtonLink href="/the-pit" variant="outline" className="mt-6">
                Inside the pit
              </ButtonLink>
            )}
          </Reveal>
        </div>
      </div>
      <ProcessStages stages={data} />
    </section>
  );
}
