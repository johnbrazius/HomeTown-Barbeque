"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Layered depth for the hero. The photograph (back), atmosphere (middle)
 * and type (front) move at different rates on scroll and, with a fine
 * pointer, nudge in opposite directions. Movement is small on purpose:
 * text stays put enough to read at all times.
 *
 * The first render is static (identical on server and client); motion is
 * attached after mount and only when the user has not asked for reduced motion.
 */
export function HeroDepth({
  back,
  middle,
  front,
}: {
  back: ReactNode;
  middle: ReactNode;
  front: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [enhanced, setEnhanced] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const backY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const backScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const frontY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const frontOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 40, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 40, damping: 18, mass: 0.6 });
  const backX = useTransform(sx, (v) => v * -16);
  const backPY = useTransform(sy, (v) => v * -10);
  const frontX = useTransform(sx, (v) => v * 6);

  useEffect(() => {
    if (reduce) return;
    // Enable after mount so server and first client render match.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnhanced(true);
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, px, py]);

  const on = enhanced && !reduce;

  return (
    <div ref={ref} className="absolute inset-0">
      <motion.div
        className="absolute -inset-[3%] z-0 scale-[1.04]"
        style={on ? { y: backY, scale: backScale } : undefined}
      >
        <motion.div className="absolute inset-0" style={on ? { x: backX, y: backPY } : undefined}>
          {back}
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 z-1">{middle}</div>
      <motion.div
        className="absolute inset-0 z-3"
        style={on ? { y: frontY, x: frontX, opacity: frontOpacity } : undefined}
      >
        {front}
      </motion.div>
    </div>
  );
}
