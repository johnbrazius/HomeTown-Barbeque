"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { notice } from "@/content/notice";

const subscribe = () => () => {};

/** True until the end of the expiry day in New York. */
function isLive(expires: string) {
  const end = new Date(`${expires}T23:59:59-05:00`).getTime();
  return Number.isFinite(end) && Date.now() <= end;
}

/**
 * Expiring site-wide notice. Checked in the visitor's browser, so it vanishes
 * on time even if nobody rebuilds the site.
 */
export function AnnouncementBar() {
  // Server render and first client render show nothing; the browser decides.
  const live = useSyncExternalStore(
    subscribe,
    () => (notice ? isLive(notice.expires) : false),
    () => false,
  );
  if (!notice || !live) return null;

  return (
    <div role="region" aria-label="Announcement" className="fixed inset-x-0 top-18 z-40 bg-ember-deep text-cream">
      <p className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-4 gap-y-1 px-5 py-2.5 text-center text-sm sm:px-8 lg:px-12">
        <span>{notice.message}</span>
        {notice.link && (
          <Link href={notice.link.href} className="label underline underline-offset-4">
            {notice.link.label}
          </Link>
        )}
      </p>
    </div>
  );
}
