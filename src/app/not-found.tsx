import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/content/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="grain relative flex min-h-svh flex-col bg-ink px-5 py-8 sm:px-8 lg:px-12">
      <Link href="/" className="relative z-2 text-cream" aria-label={`${business.name} — home`}>
        <Wordmark />
      </Link>
      <div className="relative z-2 my-auto max-w-4xl py-20">
        <p className="label text-ember-bright">Error 404</p>
        <h1 className="display mt-6 text-[clamp(4rem,14vw,11rem)]">
          All sold
          <br />
          out<span className="text-ember-bright">.</span>
        </h1>
        <p className="mt-8 max-w-md text-lg text-cream/70">
          This page isn’t on the menu. Head back to the pit, or check the official menu for today’s lineup.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Back to the homepage</ButtonLink>
          <ButtonLink href={business.officialMenu} external variant="outline" track="official_menu_click" trackLocation="404">
            Official menu
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
