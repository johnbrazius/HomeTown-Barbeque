"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, Phone, Navigation } from "lucide-react";
import { business } from "@/content/site";

/**
 * Phone-only bottom bar with the three things people come for: the menu,
 * a call, directions. Appears once the hero is scrolled past.
 */
export function MobileActionBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const item = "label flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-[0.62rem]";

  return (
    <nav
      aria-label="Quick actions"
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-ink/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-transform duration-500 ease-(--ease-smoke) md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      inert={!show}
    >
      <div className="flex divide-x divide-cream/10">
        <Link href="/menu" className={`${item} text-cream`} data-track="menu_cta_click" data-track-location="mobile_bar">
          <BookOpen aria-hidden className="size-4" />
          Menu
        </Link>
        <a
          href={`tel:${business.phoneE164}`}
          className={`${item} text-cream`}
          data-track="phone_click"
          data-track-location="mobile_bar"
        >
          <Phone aria-hidden className="size-4" />
          Call
        </a>
        <a
          href={business.directions}
          target="_blank"
          rel="noopener noreferrer"
          className={`${item} bg-ember-deep text-cream`}
          data-track="directions_click"
          data-track-location="mobile_bar"
        >
          <Navigation aria-hidden className="size-4" />
          Directions
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </nav>
  );
}
