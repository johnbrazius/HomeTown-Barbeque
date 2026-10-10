"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { business, fullAddress } from "@/content/site";

/**
 * Click-to-load map. Google's embed is ~1 MB of third-party script and sets
 * cookies, so nothing is requested until the visitor asks for it.
 * The external directions link works without loading anything.
 */
export function MapFacade() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-cream/15 bg-ink md:aspect-auto md:h-full md:min-h-[420px]">
      {loaded ? (
        <iframe
          title={`Map showing ${business.name}, ${fullAddress}`}
          src={business.mapEmbed}
          className="absolute inset-0 h-full w-full border-0 grayscale-[0.4] invert-[0.9] hue-rotate-180"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          {/* Abstract street grid — decorative, not a real map */}
          <svg aria-hidden className="absolute inset-0 h-full w-full text-cream/10" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
                <path d="M40 0H0V40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="400" height="300" fill="url(#grid)" />
            <path d="M-20 250 C 80 230, 120 300, 260 260 S 420 210, 430 230 L 430 320 L -20 320Z" fill="currentColor" opacity="0.6" />
          </svg>
          <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
            <span className="absolute inset-0 -m-3 animate-ping rounded-full bg-ember/30 motion-reduce:animate-none" aria-hidden />
            <span className="relative flex size-12 items-center justify-center rounded-full bg-ember text-cream">
              <MapPin aria-hidden className="size-5" />
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-linear-to-t from-ink via-ink/80 to-transparent p-5 pt-16 sm:flex-row sm:items-end sm:justify-between">
            <p className="label text-cream/70">
              {business.streetShort}
              <br />
              Red Hook, Brooklyn
            </p>
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="label min-h-11 border border-cream/30 px-4 text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink"
            >
              Load interactive map
            </button>
          </div>
        </>
      )}
    </div>
  );
}
