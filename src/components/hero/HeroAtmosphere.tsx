"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function canUseWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Decides whether the WebGL atmosphere loads at all. It is skipped on small
 * screens, touch-only devices, reduced-motion, Save-Data, and when WebGL is
 * unavailable — the photographic hero stands on its own in every case.
 * The bundle is fetched after the page is idle so it never competes with
 * the hero image, and rendering pauses whenever the hero is off-screen.
 */
export function HeroAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (!mq.matches || conn?.saveData || !canUseWebGL()) return;

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let id: number;
    if (w.requestIdleCallback) {
      id = w.requestIdleCallback(() => setEnabled(true), { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    id = window.setTimeout(() => setEnabled(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [enabled]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 transition-opacity duration-[2000ms] ${enabled ? "opacity-100" : "opacity-0"}`}
    >
      {enabled && <HeroScene active={visible} />}
    </div>
  );
}
