import Link from "next/link";
import { business, conceptNotice, legalNav, navGroups } from "@/content/site";
import { recognition } from "@/content/story";
import { Wordmark } from "@/components/ui/Wordmark";

export function Footer() {
  return (
    <footer className="grain relative bg-ink">
      <div className="relative z-2 mx-auto max-w-[1440px] px-5 pb-28 pt-20 sm:px-8 md:pb-10 md:pt-28 lg:px-12">
        <p aria-hidden className="display text-[clamp(4rem,17vw,16rem)] leading-[0.8] text-cream/[0.08]">
          Hometown
        </p>

        <div className="mt-14 grid gap-12 border-t border-cream/15 pt-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Wordmark className="text-cream" />
            <p className="mt-6 max-w-xs text-cream/60">Pit-smoked barbecue on Van Brunt Street, Red Hook, Brooklyn.</p>
            <address className="mt-6 space-y-1 not-italic text-cream/85">
              <p>{business.street}</p>
              <p>
                {business.locality}, {business.region} {business.postalCode}
              </p>
              <p className="pt-2">
                <a
                  href={`tel:${business.phoneE164}`}
                  data-track="phone_click"
                  data-track-location="footer"
                  className="underline decoration-cream/30 underline-offset-4 hover:decoration-ember"
                >
                  {business.phoneDisplay}
                </a>
              </p>
            </address>
            <a
              href={recognition.href}
              target="_blank"
              rel="noopener noreferrer"
              className="label mt-8 inline-flex border border-cream/20 px-3 py-2 text-cream/80 hover:border-cream/50"
            >
              {recognition.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          {navGroups.map((g) => (
            <nav key={g.title} aria-label={`${g.title} links`} className="lg:col-span-2">
              <h2 className="label text-cream/60">{g.title}</h2>
              <ul className="mt-4 space-y-2">
                {g.items.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="text-cream/85 hover:text-ember-bright">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <h2 className="label text-cream/60">Official</h2>
            <ul className="mt-4 space-y-2">
              {[
                { label: "hometownbbq.com", href: business.officialSite, track: "official_site_click" },
                { label: "Red Hook menu", href: business.officialMenu, track: "official_menu_click" },
                { label: "Hours & locations", href: business.officialLocations, track: "official_site_click" },
                { label: "Directions", href: business.directions, track: "directions_click" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track={l.track}
                    data-track-location="footer"
                    className="text-cream/85 hover:text-ember-bright"
                  >
                    {l.label} <span aria-hidden>↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/10 pt-6 text-xs leading-relaxed text-cream/60 md:flex-row md:items-start md:justify-between">
          <p className="max-w-3xl">{conceptNotice}</p>
          <ul className="flex shrink-0 gap-5">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline decoration-cream/30 underline-offset-4 hover:text-cream">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
