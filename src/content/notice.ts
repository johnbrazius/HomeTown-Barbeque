/**
 * Site-wide announcement (holiday hours, a temporary closure, a special).
 *
 * Every notice MUST have an expiry date. After it passes, the bar disappears
 * on its own — no forgotten "temporary" pages left online for years.
 * Set `notice` to null when there's nothing to announce.
 */
export type Notice = {
  message: string;
  link?: { label: string; href: string };
  /** ISO date (YYYY-MM-DD). The notice stops showing at the end of this day, New York time. */
  expires: string;
};

export const notice: Notice | null = null;

// Example:
// export const notice: Notice | null = {
//   message: "Closed Thanksgiving Day. Back Friday at noon.",
//   link: { label: "Hours", href: "/visit" },
//   expires: "2026-11-26",
// };
