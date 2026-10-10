"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One IntersectionObserver for every [data-reveal] element on the page.
 * Re-runs on client-side navigation so new pages reveal too.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])"));
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
    els.forEach((el) => io.observe(el));

    // Fast jumps (End key, anchor links, flick scrolls) can skip past an
    // element without an intersection callback; reveal anything already above
    // the bottom of the viewport once scrolling settles.
    let t: number | undefined;
    const sweep = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])").forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) {
            el.dataset.shown = "";
            io.unobserve(el);
          }
        });
      }, 120);
    };
    window.addEventListener("scroll", sweep, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", sweep);
      window.clearTimeout(t);
    };
  }, [pathname]);

  return null;
}
