import Link from "next/link";
import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg";

const sizes: Record<Size, { mark: number; text: string; gap: string }> = {
  sm: { mark: 28, text: "text-[13px]", gap: "gap-2" },
  md: { mark: 34, text: "text-[15px]", gap: "gap-2.5" },
  lg: { mark: 44, text: "text-[19px]", gap: "gap-3" },
};

export function Logo({
  href = "#top",
  size = "md",
  markOnly = false,
  className,
}: {
  href?: string;
  size?: Size;
  markOnly?: boolean;
  className?: string;
}) {
  const s = sizes[size];
  const mark = (
    <span
      className="relative inline-flex items-center justify-center rounded-[22%] bg-[var(--bg)] border border-[var(--border)]"
      style={{ width: s.mark, height: s.mark }}
      aria-hidden
    >
      <svg
        width={s.mark * 0.62}
        height={s.mark * 0.48}
        viewBox="0 0 32 24"
        fill="none"
      >
        <path
          d="M3 22 L11 3 L19 22"
          stroke="var(--text)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M6.5 16 L15.5 16" stroke="var(--text)" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M22 3 L22 22 M22 13 L30 3 M22 13 L30 22"
          stroke="var(--text)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span
        className="absolute rounded-[1px] bg-[var(--accent)]"
        style={{
          top: s.mark * 0.14,
          right: s.mark * 0.14,
          width: Math.max(3, s.mark * 0.1),
          height: Math.max(3, s.mark * 0.1),
        }}
      />
    </span>
  );

  if (markOnly) {
    return (
      <Link
        href={href}
        aria-label="AK Systems — на главную"
        className={cn("inline-flex", className)}
      >
        {mark}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn("inline-flex items-center", s.gap, className)}
      aria-label="AK Systems — на главную"
    >
      {mark}
      <span className="inline-flex flex-col leading-[1.05]">
        <span className={cn("font-semibold tracking-tight text-[var(--text)]", s.text)}>
          AK Systems
        </span>
        <span className="mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-dim)] -mt-0.5">
          engineering
        </span>
      </span>
    </Link>
  );
}
