import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "cream" | "bark";
  id?: string;
  as?: "h2" | "h3";
};

/** Numbered label + display heading + optional intro, used across pages. */
export function SectionHeading({ index, eyebrow, title, intro, tone = "dark", id, as: H = "h2" }: Props) {
  const accent = tone === "cream" ? "text-ember-ink" : tone === "bark" ? "text-ember-glow" : "text-ember-bright";
  const body = tone === "cream" ? "text-ink/75" : "text-cream/70";
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
      <Reveal className={intro ? "lg:col-span-7" : "lg:col-span-12"}>
        <p className={`label flex items-center gap-3 ${accent}`}>
          {index && <span>{index}</span>}
          <span aria-hidden className="h-px w-10 bg-ember" />
          <span>{eyebrow}</span>
        </p>
        <H id={id} className="display mt-6 text-[clamp(2.8rem,7vw,6.5rem)]">
          {title}
        </H>
      </Reveal>
      {intro && (
        <Reveal delay={0.1} className={`max-w-md text-lg leading-relaxed lg:col-span-4 lg:col-start-9 lg:pb-3 ${body}`}>
          {intro}
        </Reveal>
      )}
    </div>
  );
}

/** Italic serif accent word used inside display headings. */
export function Accent({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "cream" }) {
  return (
    <span
      className={`font-serif text-[0.92em] font-normal normal-case italic tracking-normal ${
        tone === "cream" ? "text-ember" : "text-ember-bright"
      }`}
    >
      {children}
    </span>
  );
}
