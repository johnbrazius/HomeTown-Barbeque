"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { Menu as MenuIcon, X, Phone, MapPin, ChevronDown, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { business, nav, navGroups, legalNav } from "@/content/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { SocialLinks } from "@/components/ui/SocialIcons";

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const moreBtnRef = useRef<HTMLButtonElement>(null);

  // Pages without a full-bleed hero get a solid header from the start
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Desktop "More" panel: Escape and outside click close it
  useEffect(() => {
    if (!moreOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMoreOpen(false);
        moreBtnRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!moreRef.current?.contains(e.target as Node) && !moreBtnRef.current?.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [moreOpen]);

  // Mobile drawer: Escape, focus trap and scroll lock
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();

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

  const solid = scrolled || open || moreOpen || !overHero;
  const linkCls =
    "label relative py-2 transition-colors hover:text-cream after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-ember after:transition-transform after:duration-300 hover:after:scale-x-100";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-(--ease-smoke) ${
          solid
            ? "border-b border-cream/10 bg-ink/92 backdrop-blur-md"
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
          <Link href="/" className="relative z-10 text-cream" aria-label={`${business.name} — home`}>
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`${linkCls} ${active ? "text-cream after:scale-x-100" : "text-cream/75 after:scale-x-0"}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <button
                  ref={moreBtnRef}
                  type="button"
                  aria-expanded={moreOpen}
                  aria-controls="more-panel"
                  onClick={() => setMoreOpen((v) => !v)}
                  className={`label flex items-center gap-1.5 py-2 transition-colors hover:text-cream ${moreOpen ? "text-cream" : "text-cream/75"}`}
                >
                  More
                  <ChevronDown
                    aria-hidden
                    className={`size-3.5 transition-transform duration-300 ${moreOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </li>
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
            <Link
              href="/visit"
              className="label hidden min-h-11 items-center gap-2 bg-ember-deep px-4 text-cream transition-colors hover:bg-ember-deeper sm:inline-flex"
            >
              <MapPin aria-hidden className="size-4" />
              Visit Red Hook
            </Link>
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

      {/* Desktop mega panel — outside <header> so backdrop-filter can't clip it */}
      <AnimatePresence>
        {moreOpen && (
          <motion.div
            ref={moreRef}
            id="more-panel"
            className="fixed inset-x-0 top-18 z-45 hidden border-b border-cream/10 bg-ink lg:block"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-10 px-12 py-12">
              {navGroups.map((g) => (
                <div key={g.title} className="col-span-3">
                  <p className="label text-ember-bright">{g.title}</p>
                  <ul className="mt-5 space-y-5">
                    {g.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="group block">
                          <span className="display text-2xl text-cream transition-colors group-hover:text-ember-bright">
                            {item.label}
                          </span>
                          {item.blurb && <span className="mt-1 block text-sm text-cream/60">{item.blurb}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="col-span-3 flex flex-col justify-between border-l border-cream/10 pl-10">
                <div>
                  <p className="label text-cream/60">Red Hook</p>
                  <p className="display mt-4 text-3xl leading-none">
                    {business.street}
                    <br />
                    Brooklyn, NY
                  </p>
                  <a
                    href={`tel:${business.phoneE164}`}
                    data-track="phone_click"
                    data-track-location="more_panel"
                    className="mt-4 inline-block text-cream/80 underline decoration-ember underline-offset-4"
                  >
                    {business.phoneDisplay}
                  </a>
                </div>
                <a
                  href={business.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="directions_click"
                  data-track-location="more_panel"
                  className="label mt-8 inline-flex items-center gap-2 text-cream/70 hover:text-cream"
                >
                  Get directions <ArrowUpRight aria-hidden className="size-3.5" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <SocialLinks className="mt-6" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer — outside <header> for the same reason */}
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
                    <Link
                      href={item.href}
                      onClick={() => close(false)}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className="flex items-baseline justify-between py-4 text-cream"
                    >
                      <span className="display text-5xl">{item.label}</span>
                      <span className="label text-smoke">0{i + 1}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
                {navGroups.map((g) => (
                  <div key={g.title}>
                    <p className="label text-ember-bright">{g.title}</p>
                    <ul className="mt-3 space-y-2">
                      {g.items
                        .filter((i) => !nav.some((n) => n.href === i.href))
                        .map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={() => close(false)}
                              className="block py-1 text-lg text-cream/85"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
                <div>
                  <p className="label text-ember-bright">Site</p>
                  <ul className="mt-3 space-y-2">
                    {legalNav.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} onClick={() => close(false)} className="block py-1 text-lg text-cream/85">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-auto grid gap-3 pt-10">
                <SocialLinks className="mb-2" />
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
