"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * next/image that quietly hides itself if it fails to load, so the frame's
 * tone colour shows instead of a broken-image icon and stray alt text.
 * Images are never hidden by default, so no-JS visitors still see them.
 */
export function SafeImage({ className = "", alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      {...props}
      alt={alt}
      onError={() => setFailed(true)}
      className={`${className} ${failed ? "invisible" : ""}`}
    />
  );
}
