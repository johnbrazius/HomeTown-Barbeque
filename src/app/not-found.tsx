import type { Metadata } from "next";
import { business } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-svh flex-col bg-ink px-5 pt-18 sm:px-8 lg:px-12">
      <div className="relative z-2 mx-auto my-auto w-full max-w-[1440px] py-20">
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
          <ButtonLink href="/menu" variant="outline">
            See the menu
          </ButtonLink>
          <ButtonLink href={business.officialMenu} external variant="outline" track="official_menu_click" trackLocation="404">
            Official menu
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
