import { social } from "@/content/site";

/** Simple brand glyphs (lucide no longer ships brand icons). Decorative: pair with a text label. */
export function InstagramIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3Z" />
    </svg>
  );
}

/** Row of social links with visible labels for screen readers. */
export function SocialLinks({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "cream" }) {
  const cls =
    tone === "dark"
      ? "border-cream/25 text-cream hover:border-cream hover:bg-cream hover:text-ink"
      : "border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream";
  return (
    <ul className={`flex gap-2 ${className}`}>
      {social.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            data-track="social_click"
            data-track-location={s.label.toLowerCase()}
            aria-label={`${s.label} — ${s.handle} (opens in a new tab)`}
            className={`flex size-11 items-center justify-center rounded-full border transition-colors ${cls}`}
          >
            {s.label === "Instagram" ? <InstagramIcon /> : <FacebookIcon />}
          </a>
        </li>
      ))}
    </ul>
  );
}
