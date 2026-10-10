import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** seconds */
  delay?: number;
  /** "rise" fades up; "mask" wipes in with a clip-path (use on image frames) */
  variant?: "rise" | "mask";
  as?: "div" | "li";
};

/**
 * Scroll reveal shared by every section, so motion stays consistent.
 * Pure markup — RevealObserver flips `data-shown` when the element enters
 * the viewport. Without JavaScript, or with reduced motion, content is simply
 * visible (see globals.css).
 */
export function Reveal({ children, className, delay = 0, variant = "rise", as: Tag = "div" }: Props) {
  return (
    <Tag
      data-reveal={variant}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
