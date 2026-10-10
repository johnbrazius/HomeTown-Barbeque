import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "ember" | "outline" | "ink" | "ghost";

const styles: Record<Variant, string> = {
  ember:
    "bg-ember-deep text-cream hover:bg-ember-deeper border border-ember-deep hover:border-ember-deeper",
  outline: "border border-cream/40 text-cream hover:border-cream hover:bg-cream hover:text-ink",
  ink: "bg-ink text-cream border border-ink hover:bg-bark hover:border-bark",
  ghost: "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-cream",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  track?: string;
  trackLocation?: string;
  className?: string;
  "aria-label"?: string;
};

/**
 * The one CTA style used across the site. Renders a real anchor — every
 * button on this site goes somewhere.
 */
export function ButtonLink({
  href,
  children,
  variant = "ember",
  external,
  track,
  trackLocation,
  className = "",
  ...rest
}: Props) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      data-track={track}
      data-track-location={trackLocation}
      className={`label group inline-flex min-h-12 items-center justify-between gap-4 px-5 py-3.5 transition-colors duration-300 ease-(--ease-smoke) ${styles[variant]} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      <Icon
        aria-hidden
        className={`size-4 shrink-0 transition-transform duration-300 ease-(--ease-smoke) ${
          external
            ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            : "group-hover:translate-x-1"
        }`}
      />
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
