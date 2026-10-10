"use client";

import { SafeImage as Image } from "@/components/ui/SafeImage";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { MenuCategory } from "@/content/menu";
import type { ResolvedImage } from "@/lib/images";

export type MenuTabData = MenuCategory & { featureImage: ResolvedImage };

/**
 * Category tabs (WAI-ARIA tabs pattern, arrow-key navigation) with one large
 * feature image and a compact, readable list per category.
 */
export function MenuTabs({ categories }: { categories: MenuTabData[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const uid = useId();
  const current = categories[active];

  const select = (i: number) => {
    const n = (i + categories.length) % categories.length;
    setActive(n);
    tabRefs.current[n]?.focus();
    tabRefs.current[n]?.scrollIntoView({ block: "nearest", inline: "center", behavior: reduce ? "auto" : "smooth" });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => select(active + 1),
      ArrowLeft: () => select(active - 1),
      Home: () => select(0),
      End: () => select(categories.length - 1),
    };
    if (keys[e.key]) {
      e.preventDefault();
      keys[e.key]();
    }
  };

  const fade = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
      };

  return (
    <div className="mt-16 md:mt-24">
      {/* Tabs — horizontally scrollable on small screens */}
      <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
        <div role="tablist" aria-label="Menu categories" className="flex w-max min-w-full border-b border-cream/15">
          {categories.map((c, i) => {
            const selected = i === active;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                type="button"
                id={`${uid}-tab-${c.id}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={onKeyDown}
                className={`label relative flex min-h-14 shrink-0 items-center gap-3 px-4 transition-colors first:pl-0 md:px-7 ${
                  selected ? "text-cream" : "text-cream/60 hover:text-cream/85"
                }`}
              >
                <span className="tabular-nums text-ember-bright/80">0{i + 1}</span>
                <span className="text-[0.85rem]">{c.label}</span>
                {selected && (
                  <motion.span
                    layoutId={`${uid}-underline`}
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-ember first:left-0"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${current.id}`}
        tabIndex={0}
        className="mt-10 md:mt-14"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            {...fade}
            transition={{ duration: reduce ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-10 md:grid-cols-12 md:gap-12"
          >
            {/* Feature */}
            <figure className="md:col-span-5">
              <div className="group relative aspect-[4/5] overflow-hidden lg:aspect-[5/5]" style={{ backgroundColor: current.featureImage.tone }}>
                <Image
                  src={current.featureImage.src}
                  alt={current.featureImage.alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-(--ease-smoke) group-hover:scale-[1.04]"
                  style={current.featureImage.focus ? { objectPosition: current.featureImage.focus } : undefined}
                />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/10 to-transparent" />
                <span className="label absolute right-3 top-3 bg-ink px-1.5 py-1 text-[0.58rem] text-cream/90 backdrop-blur-sm">
                  Illustrative
                </span>
                <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="label text-ember-bright">Feature</p>
                  <p className="display mt-2 text-5xl md:text-6xl">{current.feature.title}</p>
                  <p className="mt-3 max-w-xs text-cream/80">{current.feature.caption}</p>
                </figcaption>
              </div>
            </figure>

            {/* List */}
            <div className="md:col-span-7 md:pl-4 lg:pl-10">
              <div className="flex items-baseline justify-between gap-6 border-b border-cream/15 pb-5">
                <h3 className="display text-4xl md:text-5xl">{current.label}</h3>
                <p className="label hidden text-cream/60 sm:block">{current.items.length} items</p>
              </div>
              <p className="mt-5 max-w-md text-cream/65">{current.intro}</p>
              <ul className="mt-6">
                {current.items.map((item) => (
                  <li
                    key={item.name}
                    className="group flex items-baseline gap-4 border-b border-cream/10 py-4 transition-colors hover:border-cream/30"
                  >
                    <div className="min-w-0">
                      <p className="text-xl font-medium text-cream transition-colors group-hover:text-ember-bright md:text-2xl">
                        {item.name}
                      </p>
                      {item.note && <p className="mt-1 text-sm text-cream/55">{item.note}</p>}
                    </div>
                    <span aria-hidden className="mb-1.5 flex-1 border-b border-dotted border-cream/20" />
                    <div className="flex shrink-0 items-center gap-2">
                      {item.tags?.map((t) => (
                        <span key={t} className="label border border-cream/20 px-2 py-1 text-[0.6rem] text-cream/60">
                          {t}
                        </span>
                      ))}
                      {item.price && <span className="label text-base text-cream">{item.price}</span>}
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-cream/60">
                Items and availability vary day to day.
                {current.items.some((i) => i.tags?.includes("popular")) &&
                  " “Popular” reflects public listings, not a house ranking."}
              </p>
              {active < categories.length - 1 && (
                <button
                  type="button"
                  onClick={() => select(active + 1)}
                  className="label group mt-10 inline-flex min-h-11 items-center gap-3 text-cream/70 transition-colors hover:text-cream"
                >
                  Next: {categories[active + 1].label}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
