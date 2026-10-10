import Image from "next/image";

/**
 * The Hometown Bar-B-Que logo (supplied artwork, /public/brand). The logo
 * belongs to the restaurant — confirm permission before commercial use and
 * ask for a vector (SVG) version for the sharpest result.
 */
export function Wordmark({ className = "", size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  const px = size === "lg" ? 120 : 52;
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src="/brand/hometown-logo.png"
        alt="Hometown Bar-B-Que"
        width={px}
        height={px}
        preload={size === "sm"}
        className="shrink-0 rounded-full shadow-[0_0_0_2px_rgba(247,242,232,0.25)]"
      />
      {size === "sm" && (
        <span className="hidden flex-col leading-none sm:flex">
          <span className="display text-[1.25rem] tracking-[0.02em]">Hometown</span>
          <span className="label mt-1 text-[0.55rem] tracking-[0.36em] opacity-70">Red Hook · Brooklyn</span>
        </span>
      )}
    </span>
  );
}
