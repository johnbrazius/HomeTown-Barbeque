import { getImageProps } from "next/image";
import { ArrowDown } from "lucide-react";
import { business, heroCopy } from "@/content/site";
import { img } from "@/lib/images";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroDepth } from "./HeroDepth";
import { HeroAtmosphere } from "./HeroAtmosphere";

/** Art-directed photograph: tall crop on phones, wide crop from md up. */
function HeroPicture() {
  const wide = img("heroWide");
  const tall = img("heroTall");
  const common = { alt: wide.alt, fill: true, preload: false } as const;
  const {
    props: { srcSet: wideSet },
  } = getImageProps({ ...common, src: wide.src, sizes: "100vw", quality: 75 });
  const { props: tallProps } = getImageProps({
    ...common,
    src: tall.src,
    sizes: "100vw",
    quality: 75,
    loading: "eager",
    fetchPriority: "high",
  });

  return (
    <div className="absolute inset-0" style={{ backgroundColor: wide.tone }}>
      <picture>
        <source media="(min-width: 768px)" srcSet={wideSet} sizes="100vw" />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is in tallProps */}
        <img
          {...tallProps}
          className="hero-photo h-full w-full object-cover object-[50%_55%] md:object-[62%_50%]"
        />
      </picture>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="grain relative isolate h-[88svh] min-h-[600px] overflow-hidden bg-ink md:h-svh md:min-h-[680px]"
    >
      <HeroDepth
        back={<HeroPicture />}
        middle={<HeroAtmosphere />}
        front={
          <div className="relative z-3 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-10 pt-28 sm:px-8 md:pb-14 lg:px-12">
            <p className="label hero-fade mb-6 flex items-center gap-3 text-cream/85" style={{ ["--d" as string]: "0.1s" }}>
              <span aria-hidden className="h-px w-8 bg-ember" />
              {heroCopy.eyebrow}
            </p>

            <h1 id="hero-title" className="display max-w-[12ch] text-[clamp(3.6rem,13.5vw,11.5rem)] text-cream">
              {heroCopy.titleLines.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.04em]">
                  <span
                    className={`hero-line ${i === 1 ? "text-ember-bright" : ""}`}
                    style={{ ["--d" as string]: `${0.15 + i * 0.14}s` }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[minmax(0,30rem)_auto] md:items-end md:justify-between">
              <p
                className="hero-fade max-w-md text-lg leading-relaxed text-cream/85 md:text-xl"
                style={{ ["--d" as string]: "0.55s" }}
              >
                {heroCopy.body}
              </p>
              <div
                className="hero-fade flex flex-col gap-3 sm:flex-row"
                style={{ ["--d" as string]: "0.7s" }}
              >
                <ButtonLink href={heroCopy.primaryCta.href} track="menu_cta_click" trackLocation="hero">
                  {heroCopy.primaryCta.label}
                </ButtonLink>
                <ButtonLink href={heroCopy.secondaryCta.href} variant="outline">
                  {heroCopy.secondaryCta.label}
                </ButtonLink>
              </div>
            </div>

            <div
              className="hero-fade mt-10 hidden items-center justify-between border-t border-cream/15 pt-5 md:flex"
              style={{ ["--d" as string]: "0.9s" }}
            >
              <ul className="label flex gap-10 text-cream/60">
                <li>Since {business.founded}</li>
                <li>Oak-fired pit</li>
                <li>{business.streetShort}</li>
              </ul>
              <a href="#story" className="label flex items-center gap-2 text-cream/70 hover:text-cream">
                Scroll
                <ArrowDown aria-hidden className="size-3.5" />
              </a>
            </div>
          </div>
        }
      />

      {/* Legibility: darken behind type, keep the food bright. Above the
          photo and atmosphere (z-0/1), below the type (z-3). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-2 bg-linear-to-t from-ink via-ink/45 to-ink/10 md:bg-linear-to-r md:from-ink/90 md:via-ink/35 md:to-transparent"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-2 h-48 bg-linear-to-t from-ink to-transparent" />
    </section>
  );
}
