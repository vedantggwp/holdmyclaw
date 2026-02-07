"use client";

import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * Number that counts up from 0 to target when scrolled into view.
 * Displayed as zero-padded (01, 02, 03). Respects prefers-reduced-motion.
 */
export function StepNumber({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  return (
    <span ref={ref} className={className}>
      {reducedMotion || !inView ? (
        String(value).padStart(2, "0")
      ) : (
        <CountUp to={value} />
      )}
    </span>
  );
}

function CountUp({ to }: { to: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 600;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(Math.round(to * progress));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [to]);

  return <>{String(display).padStart(2, "0")}</>;
}
