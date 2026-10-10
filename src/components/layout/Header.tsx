"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Menu as MenuIcon, X, Phone, MapPin } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { business, nav } from "@/content/site";
import { Wordmark } from "@/components/ui/Wordmark";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Escape to close, simple focus trap, and scroll lock while open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = drawerRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;
      const focusables = [toggleRef.current, ...drawerRef.current.querySelectorAll<HTMLElement>("a, button")].filter(
        Boolean,
      ) as HTMLElement[];
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && close(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-(--ease-smoke) ${
          solid
            ? "border-b border-cream/10 bg-ink/88 backdrop-blur-md"
            : "border-b border-transparent bg-linear-to-b from-ink/70 to-transparent"
        }`}
      >
        <a
          href="#main"
          className="label sr-only z-60 bg-cream px-4 py-3 text-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
        >
          Skip to content
        </a>
        <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" className="relative z-10 text-cream" aria-label={`${business.name} — back to top`}>
            <Wordmark />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="label relative py-2 text-cream/80 transition-colors hover:text-cream after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-ember after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${business.phoneE164}`}
              data-track="phone_click"
              data-track-location="header"
              className="hidden size-11 items-center justify-center border border-cream/20 text-cream transition-colors hover:border-cream sm:flex"
              aria-label={`Call ${business.name} at ${business.phoneDisplay}`}
            >
              <Phone aria-hidden className="size-4" />
            </a>
            <a
              href="#visit"
              className="label hidden min-h-11 items-center gap-2 bg-ember-deep px-4 text-cream transition-colors hover:bg-ember-deeper sm:inline-flex"
            >
              <MapPin aria-hidden className="size-4" />
              Visit Red Hook
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="relative z-10 flex size-11 items-center justify-center border border-cream/20 text-cream lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => (open ? close() : setOpen(true))}
            >
              {open ? <X aria-hidden className="size-5" /> : <MenuIcon aria-hidden className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Outside <header>: its backdrop-filter would otherwise become the
          containing block for this fixed-position drawer and clip it. */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={drawerRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="grain fixed inset-x-0 top-18 bottom-0 z-45 overflow-y-auto bg-ink lg:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile" className="relative z-2 flex min-h-full flex-col px-5 pb-8 pt-6 sm:px-8">
              <ul className="border-t border-cream/10">
                {nav.map((item, i) => (
                  <li key={item.href} className="border-b border-cream/10">
                    <a
                      href={item.href}
                      onClick={() => close(false)}
                      className="flex items-baseline justify-between py-5 text-cream"
                    >
                      <span className="display text-5xl">{item.label}</span>
                      <span className="label text-smoke">0{i + 1}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-auto grid gap-3 pt-10">
                <p className="label text-smoke">{business.streetShort}, Brooklyn</p>
                <a
                  href={`tel:${business.phoneE164}`}
                  data-track="phone_click"
                  data-track-location="mobile_nav"
                  className="label flex min-h-12 items-center justify-between border border-cream/30 px-5 text-cream"
                >
                  Call {business.phoneDisplay}
                  <Phone aria-hidden className="size-4" />
                </a>
                <a
                  href={business.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="directions_click"
                  data-track-location="mobile_nav"
                  className="label flex min-h-12 items-center justify-between bg-ember-deep px-5 text-cream"
                >
                  Get directions
                  <MapPin aria-hidden className="size-4" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
