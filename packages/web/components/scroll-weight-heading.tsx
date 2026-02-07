"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * Headline that animates font-weight 400 → 700 when scrolled into view.
 * Respects prefers-reduced-motion (no animation).
 */
export function ScrollWeightHeading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const Component = motion[Tag] as typeof motion.h2;

  return (
    <Component
      ref={ref}
      className={className}
      initial={{ fontWeight: 400 }}
      animate={{
        fontWeight: reducedMotion || !inView ? 400 : 700,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </Component>
  );
}
