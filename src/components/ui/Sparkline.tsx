"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Props = {
  points: number[];
  trend?: "up" | "down" | "flat";
  className?: string;
  width?: number;
  height?: number;
};

export function Sparkline({
  points,
  trend = "up",
  className,
  width = 220,
  height = 64,
}: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  if (points.length < 2) return null;

  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const stepX = width / (points.length - 1);
  const pad = 4;

  const coords = points.map((p, i) => {
    const x = i * stepX;
    const y = pad + (1 - (p - min) / span) * (height - pad * 2);
    return [x, y] as const;
  });

  const d = coords
    .map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
    .join(" ");

  const area = `${d} L ${width} ${height} L 0 ${height} Z`;

  const color =
    trend === "up"
      ? "var(--accent-hover)"
      : trend === "down"
        ? "var(--price)"
        : "var(--text-muted)";

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill="url(#spark-fill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={
          reduce
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: inView ? 1 : 0, opacity: inView ? 1 : 0.4 }
        }
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      {inView && (
        <motion.circle
          cx={coords[coords.length - 1][0]}
          cy={coords[coords.length - 1][1]}
          r={2.5}
          fill={color}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 1.2 }}
        />
      )}
    </svg>
  );
}
