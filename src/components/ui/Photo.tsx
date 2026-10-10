import { SafeImage as Image } from "@/components/ui/SafeImage";
import type { ResolvedImage } from "@/lib/images";

type Props = {
  image: ResolvedImage;
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** Load eagerly with high fetch priority (above-the-fold only) */
  eager?: boolean;
  /** Show the small "illustrative" tag — on by default for honesty */
  tag?: boolean;
  tagPosition?: "bl" | "br" | "tr";
};

/**
 * Fills its (positioned) parent. The parent reserves the space, so there is
 * no layout shift; the image's average tone shows while it loads or if it
 * fails.
 */
export function Photo({
  image,
  sizes,
  className = "",
  imgClassName = "",
  eager,
  tag = true,
  tagPosition = "bl",
}: Props) {
  const pos = { bl: "bottom-2 left-2", br: "bottom-2 right-2", tr: "top-2 right-2" }[tagPosition];
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ backgroundColor: image.tone }}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className={`object-cover ${imgClassName}`}
        style={image.focus ? { objectPosition: image.focus } : undefined}
      />
      {tag && (
        <span
          className={`label pointer-events-none absolute ${pos} z-2 bg-ink px-1.5 py-1 text-[0.58rem] tracking-[0.18em] text-cream/90 backdrop-blur-sm`}
        >
          Illustrative
        </span>
      )}
    </div>
  );
}
