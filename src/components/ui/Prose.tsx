import type { ReactNode } from "react";

/** Long-form text column for policy-style pages. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="on-cream bg-cream text-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-ink/80 [&_a]:text-ember-ink [&_a]:underline [&_a]:underline-offset-4 [&_h2]:font-display [&_h2]:font-extrabold [&_h2]:uppercase [&_h2]:leading-[0.9] [&_h2]:pt-8 [&_h2]:text-4xl [&_h2]:text-ink md:[&_h2]:text-5xl [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </div>
  );
}
