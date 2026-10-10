/**
 * Analytics integration point.
 *
 * Disabled unless NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set. Plausible is cookieless,
 * which keeps the consent story simple; if you switch to a cookie-based tool
 * (e.g. GA4) add a consent banner first.
 *
 * Elements opt in with data attributes, so links can stay server components:
 *   <a data-track="directions_click" data-track-location="visit">…</a>
 */

export const analyticsDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "";
export const analyticsEnabled = analyticsDomain.length > 0;

export type TrackEvent =
  | "menu_cta_click"
  | "directions_click"
  | "phone_click"
  | "catering_email_click"
  | "social_click";

type Plausible = (event: string, options?: { props?: Record<string, string> }) => void;

export function track(event: TrackEvent | string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const w = window as Window & { plausible?: Plausible };
  if (analyticsEnabled && typeof w.plausible === "function") {
    w.plausible(event, props ? { props } : undefined);
  }
  if (process.env.NODE_ENV === "development") {
    console.debug("[track]", event, props ?? {});
  }
}
