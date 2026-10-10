"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Delegated click tracking for any element with `data-track`. */
export function AnalyticsListener() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const event = el.dataset.track;
      if (!event) return;
      const location = el.dataset.trackLocation;
      track(event, location ? { location } : undefined);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
