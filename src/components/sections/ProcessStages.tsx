"use client";

import { SafeImage as Image } from "@/components/ui/SafeImage";
import { useEffect, useRef, useState } from "react";
import type { ResolvedImage } from "@/lib/images";

export type Stage = { title: string; body: string; image: ResolvedImage };

/**
 * Desktop: a sticky image column that crossfades as each stage scrolls
 * through the middle of the viewport. Normal scrolling — nothing is hijacked.
 * Mobile: each stage carries its own image inline.
 */
export function ProcessStages({ stages }: { stages: Stage[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-14 sm:px-8 md:pb-36 md:pt-20 lg:grid lg:grid-cols-12 lg:gap-10 lg:px-12">
      {/* Sticky visual (desktop) */}
      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-24 aspect-[4/5] max-h-[calc(100svh-8rem)] w-full overflow-hidden bg-bark">
          {stages.map((s, i) => (
            <div
              key={s.title}
              aria-hidden={i !== active}
              className={`absolute inset-0 transition-[opacity,transform] duration-1000 ease-(--ease-smoke) motion-reduce:transition-none ${
                i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              }`}
            >
              <Image
                src={s.image.src}
                alt={i === active ? s.image.alt : ""}
                fill
                sizes="45vw"
                className="object-cover"
                style={s.image.focus ? { objectPosition: s.image.focus } : undefined}
              />
            </div>
          ))}
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
            <p className="display text-[7rem] leading-none text-cream/90 tabular-nums" aria-hidden>
              0{active + 1}
            </p>
            <div className="flex flex-col items-end gap-2">
              <span className="label bg-ink px-1.5 py-1 text-[0.58rem] text-cream/90 backdrop-blur-sm">Illustrative</span>
              <div className="flex gap-1.5" aria-hidden>
                {stages.map((s, i) => (
                  <span
                    key={s.title}
                    className={`h-0.5 w-8 transition-colors duration-500 ${i <= active ? "bg-ember" : "bg-cream/25"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stages */}
      <ol className="lg:col-span-5 lg:col-start-8">
        {stages.map((s, i) => (
          <li
            key={s.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className="border-t border-cream/15 py-10 lg:flex lg:min-h-[58svh] lg:flex-col lg:justify-center lg:py-16"
          >
            <div className="relative mb-8 aspect-[16/10] overflow-hidden bg-bark lg:hidden">
              <Image
                src={s.image.src}
                alt={s.image.alt}
                fill
                sizes="100vw"
                className="object-cover"
                style={s.image.focus ? { objectPosition: s.image.focus } : undefined}
              />
              <span className="label absolute bottom-2 left-2 bg-ink px-1.5 py-1 text-[0.58rem] text-cream/90">
                Illustrative
              </span>
            </div>
            <p
              className={`label transition-colors duration-500 ${i === active ? "text-ember-bright" : "text-cream/60"}`}
            >
              Stage 0{i + 1}
            </p>
            <h3
              className={`display mt-4 text-6xl transition-colors duration-500 md:text-7xl ${
                i === active ? "text-cream" : "lg:text-cream/35"
              }`}
            >
              {s.title}
            </h3>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/70">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
