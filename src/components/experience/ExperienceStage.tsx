"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { Chapter } from "@/content/experience";
import type { VenueImage } from "@/lib/images";
import { SafeImage } from "@/components/ui/SafeImage";

const ExperienceScene = dynamic(() => import("./ExperienceScene"), { ssr: false });

export type StageChapter = Chapter & { photo: VenueImage };

/** Same-origin, resized texture URL via the Next image optimizer (no CORS issues). */
const textureUrl = (src: string) => `/_next/image?url=${encodeURIComponent(src)}&w=1920&q=75`;

function canUse3D() {
  if (!window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)").matches) return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conn?.saveData) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * A tall section with a sticky, full-screen stage. Scrolling through it moves
 * between chapters. Every visitor gets crossfading photographs and chapter
 * text; capable desktops additionally get the WebGL walk-through on top,
 * which fades in once its textures have loaded. Nothing hijacks the scroll.
 */
export function ExperienceStage({ chapters }: { chapters: StageChapter[] }) {
  const n = chapters.length;
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const barRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [use3D, setUse3D] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    if (!canUse3D()) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => setUse3D(true), { timeout: 1500 });
    else window.setTimeout(() => setUse3D(true), 800);
  }, []);

  // Scroll → progress (ref, no re-render) and active chapter (state, only on change)
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      progress.current = p;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      const idx = Math.min(n - 1, Math.floor(p * (n - 1) + 0.5));
      setActive((prev) => (prev === idx ? prev : idx));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [n]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const el = sectionRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const top = el.getBoundingClientRect().top + window.scrollY + (total * i) / (n - 1);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    },
    [n],
  );

  const onReady = useCallback(() => setReady(true), []);
  const onError = useCallback(() => setUse3D(false), []);
  // Stable array so the scene doesn't reload textures on every render
  const scenePhotos = useMemo(
    () => chapters.map((c) => ({ url: textureUrl(c.photo.src), aspect: c.photo.width / c.photo.height })),
    [chapters],
  );
  const show3D = use3D && ready;

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Step inside Hometown"
      className="relative bg-ink"
      style={{ height: `${n * 100}svh` }}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Photo layer — everyone */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${show3D ? "opacity-0" : "opacity-100"}`}
          aria-hidden={show3D}
        >
          {chapters.map((c, i) => (
            <div
              key={c.slot}
              className={`absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-(--ease-smoke) motion-reduce:transition-none ${
                i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
              }`}
              style={{ backgroundColor: c.photo.tone }}
            >
              <SafeImage
                src={c.photo.src}
                alt={i === active ? c.photo.alt : ""}
                fill
                sizes="100vw"
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* WebGL walk-through — capable desktops only */}
        {use3D && (
          <div className={`absolute inset-0 transition-opacity duration-[1500ms] ${show3D ? "opacity-100" : "opacity-0"}`}>
            <ExperienceScene
              photos={scenePhotos}
              progress={progress}
              active={inView}
              onReady={onReady}
              onError={onError}
            />
          </div>
        )}

        {/* Legibility + grain */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-ink/20 md:bg-linear-to-r md:from-ink/90 md:via-ink/45 md:to-ink/5" />
        <div aria-hidden className="grain pointer-events-none absolute inset-0" />

        {/* Chapter text */}
        <div className="absolute inset-0 z-3 mx-auto flex max-w-[1440px] items-end px-5 pb-24 pt-28 sm:px-8 md:pb-28 lg:px-12">
          <div className="relative w-full max-w-5xl">
            {chapters.map((c, i) => {
              const on = i === active;
              const Title = i === 0 ? "h1" : "h2";
              return (
                <article
                  key={c.slot}
                  onFocus={() => !on && goTo(i)}
                  className={`${i === 0 ? "relative" : "absolute inset-x-0 bottom-0"} transition-[opacity,transform] duration-700 ease-(--ease-smoke) motion-reduce:transition-none ${
                    on ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
                  }`}
                >
                  <p className="label flex items-center gap-3 text-cream/85">
                    <span aria-hidden className="h-px w-8 bg-ember" />
                    {c.eyebrow}
                  </p>
                  <Title className="display mt-5 text-[clamp(3.2rem,10vw,9rem)]">
                    {c.title.map((line, li) => (
                      <span key={line} className={`block ${li === 1 ? "text-ember-bright" : ""}`}>
                        {line}
                      </span>
                    ))}
                  </Title>
                  <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/85 md:text-xl">{c.body}</p>
                  {c.links && (
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      {c.links.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          tabIndex={on ? 0 : -1}
                          data-track={l.href === "/menu" ? "menu_cta_click" : undefined}
                          data-track-location="experience"
                          className={`label group inline-flex min-h-12 items-center justify-between gap-4 px-5 py-3.5 transition-colors ${
                            l.primary
                              ? "border border-ember-deep bg-ember-deep text-cream hover:bg-ember-deeper"
                              : "border border-cream/40 text-cream hover:bg-cream hover:text-ink"
                          }`}
                        >
                          {l.label}
                          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        {/* Chapter index */}
        <nav aria-label="Experience chapters" className="absolute right-5 top-1/2 z-3 hidden -translate-y-1/2 md:block lg:right-12">
          <ol className="space-y-3">
            {chapters.map((c, i) => (
              <li key={c.slot}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === active ? "step" : undefined}
                  className="group flex min-h-8 items-center justify-end gap-3"
                >
                  <span
                    className={`label text-[0.65rem] transition-opacity ${i === active ? "text-cream opacity-100" : "text-cream/70 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`}
                  >
                    {c.eyebrow.split("·")[1]?.trim() ?? "Hometown"}
                  </span>
                  <span
                    className={`block h-px transition-all duration-500 ${i === active ? "w-10 bg-ember" : "w-5 bg-cream/40 group-hover:bg-cream"}`}
                  />
                  <span className="sr-only">Go to chapter {i + 1}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* Progress + hint */}
        <div className="absolute inset-x-0 bottom-0 z-3">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 pb-6 sm:px-8 lg:px-12">
            <p className="label tabular-nums text-cream/70">
              0{active + 1} / 0{n}
            </p>
            <p
              className={`label flex items-center gap-2 text-cream/70 transition-opacity ${active === 0 ? "opacity-100" : "opacity-0"}`}
              aria-hidden
            >
              Scroll to step inside <ArrowDown className="size-3.5 motion-safe:animate-bounce" />
            </p>
          </div>
          <span aria-hidden className="block h-0.5 bg-cream/10">
            <span ref={barRef} className="block h-full origin-left scale-x-0 bg-ember" />
          </span>
        </div>
      </div>
    </section>
  );
}
