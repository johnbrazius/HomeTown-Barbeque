"use client";

import { useEffect } from "react";

/** One IntersectionObserver for every [data-reveal] element on the page. */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => (el.dataset.shown = ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.shown = "";
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    // Elements already on screen at load reveal immediately
    els.forEach((el) => io.observe(el));
    root.dataset.reveal = "ready";
    return () => io.disconnect();
  }, []);
  return null;
}
