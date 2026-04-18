"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  value: string;
  duration?: number;
  className?: string;
};

/**
 * Renders a string like "−50 … 80%", "×2–3", "100%", "4 мес"
 * and animates every numeric run from 0 to its target once in view.
 */
export function Counter({ value, duration = 1400, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const [text, setText] = useState(value);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setText(value);
      return;
    }

    // Split value into chunks: digit runs and non-digit separators
    const parts = value.match(/(\d+)|(\D+)/g) ?? [value];
    const targets = parts.map((p) => (/^\d+$/.test(p) ? parseInt(p, 10) : null));

    let raf = 0;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = ease(t);
      const rendered = parts
        .map((p, i) => {
          const tgt = targets[i];
          if (tgt === null) return p;
          const current = Math.round(eased * tgt);
          return String(current).padStart(p.length, p.startsWith("0") ? "0" : "");
        })
        .join("");
      setText(rendered);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
