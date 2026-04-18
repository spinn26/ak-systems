"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export type AuroraVariant =
  | "hero"
  | "soft"
  | "bottom"
  | "right"
  | "left"
  | "corners"
  | "center"
  | "split"
  | "sweep"
  | "drift";

type Blob = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  w: string;
  h: string;
  c: string;
  d: number; // duration seconds
  blur?: number;
  amp?: number; // motion amplitude multiplier
};

const indigo = (a: number) => `rgba(79, 70, 229, ${a})`;
const indigoLight = (a: number) => `rgba(99, 102, 241, ${a})`;
const indigoSoft = (a: number) => `rgba(129, 140, 248, ${a})`;

const VARIANTS: Record<AuroraVariant, Blob[]> = {
  hero: [
    {
      top: "-20%",
      right: "-10%",
      w: "60%",
      h: "70%",
      c: indigo(0.28),
      d: 22,
    },
    {
      top: "30%",
      left: "-15%",
      w: "55%",
      h: "60%",
      c: "rgba(16, 185, 129, 0.08)",
      d: 28,
    },
    {
      bottom: "-20%",
      right: "30%",
      w: "40%",
      h: "45%",
      c: indigoLight(0.18),
      d: 26,
    },
  ],
  soft: [
    {
      top: "10%",
      left: "10%",
      w: "50%",
      h: "60%",
      c: indigo(0.12),
      d: 32,
    },
    {
      top: "0%",
      right: "-10%",
      w: "45%",
      h: "50%",
      c: indigoLight(0.08),
      d: 38,
    },
  ],
  bottom: [
    {
      bottom: "-30%",
      left: "-5%",
      w: "55%",
      h: "55%",
      c: indigo(0.18),
      d: 30,
    },
    {
      bottom: "-20%",
      right: "-10%",
      w: "45%",
      h: "50%",
      c: indigoLight(0.10),
      d: 34,
    },
  ],
  right: [
    {
      top: "-15%",
      right: "-20%",
      w: "55%",
      h: "75%",
      c: indigo(0.16),
      d: 28,
    },
    {
      bottom: "-25%",
      right: "10%",
      w: "35%",
      h: "45%",
      c: indigoLight(0.08),
      d: 36,
    },
  ],
  left: [
    {
      top: "-15%",
      left: "-20%",
      w: "55%",
      h: "75%",
      c: indigo(0.16),
      d: 28,
    },
    {
      bottom: "-25%",
      left: "10%",
      w: "35%",
      h: "45%",
      c: indigoLight(0.08),
      d: 36,
    },
  ],
  corners: [
    {
      top: "-25%",
      left: "-10%",
      w: "45%",
      h: "55%",
      c: indigo(0.12),
      d: 34,
    },
    {
      bottom: "-25%",
      right: "-10%",
      w: "45%",
      h: "55%",
      c: indigoLight(0.10),
      d: 30,
    },
  ],
  center: [
    {
      top: "10%",
      left: "25%",
      w: "50%",
      h: "70%",
      c: indigo(0.14),
      d: 30,
      amp: 0.6,
    },
    {
      top: "20%",
      left: "40%",
      w: "30%",
      h: "40%",
      c: indigoSoft(0.08),
      d: 24,
      amp: 0.8,
    },
  ],
  split: [
    {
      top: "0%",
      left: "-10%",
      w: "40%",
      h: "80%",
      c: indigo(0.14),
      d: 30,
    },
    {
      top: "10%",
      right: "-10%",
      w: "40%",
      h: "80%",
      c: indigoLight(0.12),
      d: 34,
    },
  ],
  sweep: [
    {
      top: "0%",
      left: "0%",
      w: "35%",
      h: "70%",
      c: indigo(0.10),
      d: 40,
      amp: 0.5,
    },
    {
      top: "10%",
      left: "35%",
      w: "35%",
      h: "60%",
      c: indigoLight(0.12),
      d: 32,
      amp: 0.7,
    },
    {
      top: "0%",
      right: "0%",
      w: "35%",
      h: "70%",
      c: indigo(0.10),
      d: 44,
      amp: 0.5,
    },
  ],
  drift: [
    {
      top: "-10%",
      left: "20%",
      w: "60%",
      h: "60%",
      c: indigo(0.13),
      d: 44,
      amp: 1.3,
    },
    {
      bottom: "-10%",
      right: "20%",
      w: "45%",
      h: "45%",
      c: indigoLight(0.09),
      d: 50,
      amp: 1.3,
    },
  ],
};

export function AmbientAurora({
  variant = "soft",
  className = "",
}: {
  variant?: AuroraVariant;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px 0px 200px 0px" });
  const blobs = VARIANTS[variant];
  const animate = !reduce && inView;

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {blobs.map((b, i) => {
        const amp = b.amp ?? 1;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: b.top,
              bottom: b.bottom,
              left: b.left,
              right: b.right,
              width: b.w,
              height: b.h,
              background: `radial-gradient(circle, ${b.c} 0%, transparent 65%)`,
              filter: `blur(${b.blur ?? 60}px)`,
              willChange: animate ? "transform" : "auto",
            }}
            animate={
              animate
                ? {
                    x: [`0%`, `${6 * amp}%`, `${-4 * amp}%`, `0%`],
                    y: [`0%`, `${-5 * amp}%`, `${4 * amp}%`, `0%`],
                    scale: [1, 1 + 0.08 * amp, 1 - 0.04 * amp, 1],
                  }
                : undefined
            }
            transition={{
              duration: b.d,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        );
      })}
      {/* subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
